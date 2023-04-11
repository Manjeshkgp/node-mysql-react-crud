import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import bodyParser from "body-parser"
import mysql from "mysql"

dotenv.config();

const app = express();
const db = mysql.createConnection({
    host:process.env.MYSQL_HOST,
    user:process.env.MYSQL_USER,
    password:process.env.MYSQL_PASSWORD,
    database:process.env.MYSQL_DATABASE
});

app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.route("/").get((req,res)=>res.json({message:"Hello"}));

// create employee with contact 
app.route("/employees").post((req,res)=>{
    const {fullName,email,jobTitle,phone,address,city,state} = req.body;

    const values = [fullName,email,jobTitle,phone,city,state,address];
    const isNullUndefined = values.some(variable => variable === null || variable === undefined);
    
    if(isNullUndefined){
        return res.status(409).json("All Fields Are Necessary");
    }
    db.beginTransaction(function(err){
        if (err) { throw err; }
    
        db.query(`INSERT INTO employee(full_name,email,job_title) VALUES ('${fullName}','${email}','${jobTitle}')`, function(err, result){
            if(err){
                db.rollback(function() {
                   return res.status(405).json(err.message);
                });
            }else{
                const lastEmployeeId = result.insertId; // Get the last inserted ID
                db.query(`INSERT INTO employee_contacts(phone,address,city,state,employee_id) VALUES ('${phone}','${address}','${city}','${state}',${lastEmployeeId});`, function(err,data){
                    if(err){
                        db.rollback(function() {
                            return res.status(405).json(err.message);
                        });
                    }else{
                        db.commit(function(err) {
                            if (err) { 
                                db.rollback(function() {
                                    throw err;
                                });
                            }else{
                                console.log(null,data);
                                res.status(200).json("Employee and Contact Added Successfully");
                            }
                        });
                    }
                });
            }
        });
    });
})

// get list of employee with Contacts with pagination
app.route("/employees").get((req,res)=>{
    const limit = Number(req.query.limit) || 10;
    const page = Number(req.query.page) || 1;
    const offset = (page-1)*limit; // offset is same as skip in MongoDB
    const q = `SELECT a.*,CONCAT("[",GROUP_CONCAT( JSON_OBJECT("contact_id",b.contact_id,"phone",b.phone,"city",b.city,"state",b.state,"address",b.address) ),"]") as Contacts from employee a LEFT JOIN employee_contacts b on a.employee_id=b.employee_id GROUP BY a.employee_id LIMIT ${limit} OFFSET ${offset}`;
    db.query(q,(err,data)=>{
        if(err)return res.status(405).json(err.message);
        if(!data)return res.status(505).json("No Data Found");
        res.status(200).json(data)
    })
})

// get single employee with Contacts
app.route("/employees/:id").get((req,res)=>{
    const employee_id = req.params.id;
    const q = `SELECT a.*,CONCAT("[",GROUP_CONCAT( JSON_OBJECT("contact_id",b.contact_id,"phone",b.phone,"city",b.city,"state",b.state,"address",b.address) ),"]") as Contacts from employee a LEFT JOIN employee_contacts b on a.employee_id=b.employee_id WHERE a.employee_id=${employee_id} GROUP BY a.employee_id`
    db.query(q,(err,data)=>{
        if(err)return res.status(405).json(err.message);
        if(!data)return res.status(505).json("No Data Found");
        res.status(200).json(data)
    })
})

// update an employee
app.route("/employees/:id").patch((req,res)=>{
    const employee_id = req.params.id;
    const {fullName,email,jobTitle} = req.body;
    const values = [fullName,email,jobTitle];
    const isNullUndefined = values.some(variable=>variable===null||variable===undefined);
    if(isNullUndefined){
        return res.status(409).json("All Fields are Necessary")
    }
    const q = `UPDATE employee SET full_name = ?, email = ?, job_title = ? WHERE employee_id = ?`
    db.query(q,[...values,employee_id],(err,result)=>{
        if(err)return res.status(405).json(err.message);
        res.status(200).json("Update Done Successfully")
    })
})

// delete an employee
app.route("/employees/:id").delete((req,res)=>{
    const employee_id = req.params.id;
    db.beginTransaction(function(err){
        if(err){
            return res.status(405).json(err.message);
        }else
        {db.query(`DELETE FROM employee_contacts WHERE employee_id=${employee_id}`,(err,result)=>{
            if(err){
                db.rollback(function(err){
                    return res.status(405).json(err.message);
                })
                console.log(result)
            }else
           { db.query(`DELETE FROM employee WHERE employee_id=${employee_id} LIMIT 1`,(err,result)=>{
                if(err){
                    db.rollback(function(err){
                        return res.status(405).json(err.message);
                    })
                    console.log(result)
                }else
                {db.commit(function(err) {
                    if (err) { 
                        db.rollback(function() {
                            throw err;
                        });
                    }else
                    {console.log(null,result);
                    res.status(200).json("Employee and Contact Deleted Successfully");}
                });}
            })}
        })}
    })
})

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on http://localhost:${process.env.PORT}`)
})