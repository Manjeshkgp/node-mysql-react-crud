import { db } from "../database/mysql.js";

export const getEmployeeList = (req, res) => {
  const limit = Number(req.query.limit) || 10;
  const page = Number(req.query.page) || 1;
  const offset = (page - 1) * limit; // offset is same as skip in MongoDB
  const q = `SELECT a.*,CONCAT("[",GROUP_CONCAT( JSON_OBJECT("contact_id",b.contact_id,"name",b.name,"contact_phone",b.phone,"relationship",b.relationship,"importance",b.importance) ),"]") as Contacts from employee a LEFT JOIN employee_contacts b on a.employee_id=b.employee_id GROUP BY a.employee_id LIMIT ${limit} OFFSET ${offset}`;
  db.query(q, (err, data) => {
    if (err) return res.status(405).json(err.message);
    if (!data) return res.status(505).json("No Data Found");
    res.status(200).json(data);
  });
};

export const addEmployee = (req, res) => {
  const {
    fullName,
    email,
    jobTitle,
    phone,
    address,
    city,
    state,
    contactName1,
    contactPhone1,
    contactRelation1,
    contactName2,
    contactPhone2,
    contactRelation2,
  } = req.body;

  const values = [
    fullName,
    email,
    jobTitle,
    phone,
    city,
    state,
    address,
    contactName1,
    contactPhone1,
    contactRelation1,
    contactName2,
    contactPhone2,
    contactRelation2,
  ];
  const isNullUndefined = values.some(
    (variable) => variable === null || variable === undefined
  );

  if (isNullUndefined) {
    return res.status(409).json("All Fields Are Necessary");
  }
  db.beginTransaction(function (err) {
    if (err) {
      throw err;
    }

    db.query(
      `INSERT INTO employee(full_name,email,job_title,phone,address,city,state) VALUES ('${fullName}','${email}','${jobTitle}','${phone}','${address}','${city}','${state}')`,
      function (err, result) {
        if (err) {
          db.rollback(function () {
            return res.status(405).json(err);
          });
        } else {
          const lastEmployeeId = result.insertId; // Get the last inserted ID
          db.query(
            `INSERT INTO employee_contacts(name,phone,relationship,importance,employee_id) VALUES ('${contactName1}','${contactPhone1}','${contactRelation1}','primary',${lastEmployeeId}),('${contactName2}','${contactPhone2}','${contactRelation2}','secondary',${lastEmployeeId});`,
            function (err, data) {
              if (err) {
                db.rollback(function () {
                  return res.status(405).json(err);
                });
              } else {
                db.commit(function (err) {
                  if (err) {
                    db.rollback(function () {
                      throw err;
                    });
                  } else {
                    // console.log(null, data);
                    res
                      .status(200)
                      .json("Employee and Contact Added Successfully");
                  }
                });
              }
            }
          );
        }
      }
    );
  });
};

export const getEmployee = (req, res) => {
  const employee_id = req.params.id;
  const q = `SELECT a.*,CONCAT("[",GROUP_CONCAT( JSON_OBJECT("contact_id",b.contact_id,"name",b.name,"contact_phone",b.phone,"relationship",b.relationship,"importance",b.importance) ),"]") as Contacts from employee a LEFT JOIN employee_contacts b on a.employee_id=b.employee_id WHERE a.employee_id=${employee_id} GROUP BY a.employee_id`;
  db.query(q, (err, data) => {
    if (err) return res.status(405).json(err.message);
    if (!data) return res.status(505).json("No Data Found");
    res.status(200).json(data);
  });
};

export const updateEmployee = (req, res) => {
  const employee_id = req.params.id;
  const { fullName, email, phone, jobTitle, state, city, address } = req.body;
  const values = [fullName, email, phone, jobTitle, state, city, address];
  const isNullUndefined = values.some(
    (variable) => variable === null || variable === undefined
  );
  if (isNullUndefined) {
    return res.status(409).json("All Fields are Necessary");
  }
  // Check if phone or email already available
  const duplicateCheckQuery = `SELECT employee_id,phone,email FROM employee WHERE (email = ? OR phone = ?)`;
  db.query(duplicateCheckQuery, [email, phone], (err, result) => {
    if (err) {
      return res.status(405).json(err);
    }
    if (result.length > 0 && result[0].employee_id !== employee_id) {
      //   console.log(result);
      return res.status(409).json("Email or phone number already exists");
    }
    const q = `UPDATE employee SET full_name = ?, email = ?, phone = ?, job_title = ?, state = ?, city = ?, address = ? WHERE employee_id = ${employee_id}`;
    db.query(q, values, (err, result) => {
      if (err) return res.status(405).json(err);
      res.status(200).json("Update Done Successfully");
    });
  });
};

export const deleteEmployee = (req, res) => {
  const employee_id = req.params.id;
  db.beginTransaction(function (err) {
    if (err) {
      return res.status(405).json(err.message);
    } else {
      db.query(
        `DELETE FROM employee_contacts WHERE employee_id=${employee_id}`,
        (err, result) => {
          if (err) {
            db.rollback(function (err) {
              return res.status(405).json(err.message);
            });
            // console.log(result);
          } else {
            db.query(
              `DELETE FROM employee WHERE employee_id=${employee_id} LIMIT 1`,
              (err, result) => {
                if (err) {
                  db.rollback(function (err) {
                    return res.status(405).json(err.message);
                  });
                  //   console.log(result);
                } else {
                  db.commit(function (err) {
                    if (err) {
                      db.rollback(function () {
                        throw err;
                      });
                    } else {
                      //   console.log(null, result);
                      res
                        .status(200)
                        .json("Employee and Contact Deleted Successfully");
                    }
                  });
                }
              }
            );
          }
        }
      );
    }
  });
};
