import React,{useState,useEffect} from 'react'
import Button from './components/Button';
const Pagination = () => {
    const [employees,setEmployees] = useState([]);
    const [page,setPage] = useState(1);
    const fetchWithPagination = async() => {
        const res = await fetch(`http://localhost:4000/employees?page=${page}&limit=5`);
        const data = await res.json();
        if(res.status===200){
            setEmployees([...employees,...data]);
        }
    }
    useEffect(()=>{
        fetchWithPagination()
    },[page])
  return (
    <div className='flex flex-col items-center gap-4 mt-10'>
        {employees.map((employee)=>(<div className="w-[90%] flex flex-col lg:flex-row gap-4 p-2 rounded bg-yellow-400 h-max">
            <div className="w-full bg-gray-900 rounded">
            <p className='p-2'>{employee?.full_name}</p>
            <p className='p-2'>{employee?.job_title}</p>
            <p className='p-2'>{employee?.phone}</p>
            <p className='p-2'>{employee?.email}</p>
            <p className='p-2'>{employee?.address}</p>
            <p className='p-2'>{employee?.city}</p>
            <p className='p-2'>{employee?.state}</p>
            </div>
            <div className="w-full bg-gray-900 rounded">
            <p className='p-2'>{employee?.Contacts[0]?.importance}</p>
            <p className='p-2'>{employee?.Contacts[0]?.name}</p>
            <p className='p-2'>{employee?.Contacts[0]?.contact_phone}</p>
            <p className='p-2'>{employee?.Contacts[0]?.relationship}</p>
            </div>
            <div className="w-full bg-gray-900 rounded">
            <p className='p-2'>{employee?.Contacts[1]?.importance}</p>
            <p className='p-2'>{employee?.Contacts[1]?.name}</p>
            <p className='p-2'>{employee?.Contacts[1]?.contact_phone}</p>
            <p className='p-2'>{employee?.Contacts[1]?.relationship}</p>
            </div>
        </div>))}
        <div className='mb-10 mt-6' onClick={()=>setPage(prev=>prev+1)}><Button>Next</Button></div>
    </div>
  )
}

export default Pagination