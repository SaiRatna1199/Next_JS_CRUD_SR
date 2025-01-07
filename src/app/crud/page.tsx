'use client'
import { Button, Checkbox, Col, DatePicker, Input, Modal, Row, Table } from "antd";
import { useEffect, useState } from "react";
import axios from 'axios';


export type empData = {
    id: number,
    name: string,
    age: number,
    isActive: number
}
export type Employee = {
    id: number;
    name: string;
    department: string;
    position: string;
    dateOfJoining: string;
  }

export default function Crud() {
    
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const [name, setName] = useState<string>("")
    const [age, setAge] = useState<number>(0)
    const [isActive, setIsActive] = useState<number>(0)
    
    const [editId, setEditId] = useState("")
    const [editName, setEditName] = useState<string>("")
    const [editAge, setEditAge] = useState<number>(0)
    const [editIsActive, setEditIsActive] = useState<number>(0)

    const [firstName, setFirstName] = useState<string>("")
    const [lastName, setLastName] = useState<string>("")
    const [department, setDepartment] = useState<string>("")
    const [joiningDate, setJoiningDate] = useState<string>("")
    const [id, setId] = useState<number>(0)
    const [salary, setSalary] = useState<string>("")
    const [empDetails, setEmpdetails] = useState<any[]>([])

    const fetchUSERDetails = async () => {
        try {
            const res = await fetch(`/api/crud`);
            if (!res.ok) {
                throw new Error('Failed to fetch PINames');
            }
            const data = await res.json();
            if (Array.isArray(data)) {
                setEmpdetails(data);
            }
            else {
                throw new Error('Fetched data is not a Array');
            }
        } catch (error) {
            console.error("Fetching data error:", error);
        }
    }


    const handleUpdate = async (data: any) => {

        console.log("Getting Data",data);
        setFirstName(data.FirstName)
        setLastName(data.LastName)
        setAge(data.Age)
        setDepartment(data.Department)
        setSalary(data.Salary)
        setId(data.EmployeeID)
    }

    const handleCancel = async () => {

        console.log("Getting to cancel Data");
        setFirstName('')
        setLastName('')
        setAge(0)
        setDepartment('')
        setSalary('')
        setId(0)
    }


    const handleSubmit = async () => {
        
        const url = '/api/crud';
        try {
 
            const data = {
                EmployeeID: id,
                FirstName: firstName,
                LastName: lastName,
                Age: age,
                Department: department,
                Salary: salary,
            }
 
            const res = await fetch('/api/crud', {
                method: id==0?'POST':'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
            });
 
 
            const response = await res.json();
            if (res.ok) {
                console.log(response);
                // window.location.reload();
                await fetchUSERDetails();
                await handleCancel();
                setId(0);
            } else {
                // message.error(response.message)
            }
 
        } catch (error) {
            console.error('Error during submit:', error);
        }
    };
 
    const handleDelete = async (id: any) => {
        
        try {
            const data = {
                EmployeeID: id
            }
 
            const res = await fetch('/api/crud', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
            });
 
 
            const response = await res.json();
            if (res.ok) {
                console.log(response);
                // window.location.reload();
                await fetchUSERDetails();
            } else {
                // message.error(response.message)
            }
 
        } catch (error) {
            console.error('Error during submit:', error);
        }
    };
    
    const [data, setData] = useState <Employee[]>([]);

    const ageChange = (e: any) => {
        setAge (e.target.value)
    }
    
    const empdata = [
        {
            id: 1,
            name: "Teja",
            age: 24,
            isActive: 1
        },
        {
            id: 2,
            name: "Vidya",
            age: 31,
            isActive: 0
        },
        {
            id: 3,
            name: "Reva",
            age: 21,
            isActive: 1
        },
        {
            id: 4,
            name: "Abhishek",
            age: 31,
            isActive: 0
        }
    ]
  
    
    useEffect(()=>{
        fetchUSERDetails();
    }, [])
    

    const columns = [
        {
          title: "Employee ID",
          dataIndex: "EmployeeID",
          key: "EmployeeID",
        },
        {
          title: "First Name",
          dataIndex: "FirstName",
          key: "FirstName",
        },
        {
            title: "Last Name",
            dataIndex: "LastName",
            key: "LastName",
          },
          {
            title: "Age",
            dataIndex: "Age",
            key: "Age",
          },
        {
          title: "Department",
          dataIndex: "Department",
          key: "Department",
        },
        {
            title: "Salary",
            dataIndex: "Salary",
            key: "Salary",
          },
          {
            title: "actions",
            dataIndex: "actions",
            key: "actions",
            render: (text: string, record: any) => (<span>
                <Row>
                <Button
            className="Actionbuttons"
            onClick={() => handleUpdate(record)}
          >
            <span className="iconbutton">
            Edit
            </span>
          </Button>
          <div style={{margin:"5px"}}></div>
          <Button
            className="Actionbuttons"
            onClick={() => handleDelete(record.EmployeeID)}
          >
           
            <span className="iconbutton">
            Delete
            </span>
          </Button>
          </Row>
                </span>)
          },
      ];

    return(
       <div style={{margin:"30px", border:"20px", color: "black"}}>
         <div style={{margin:"10px"}}>
            <h1>{id==0 ? 'Create New Record' : `Update Employee ${id} Record`}</h1>
             <Row>
             <Col>
                <Col>First Name</Col>
                 <Col><Input type="text" className="form-control" placeholder="Enter First Name" style={{paddingRight:"2px"}}
                 value ={firstName} onChange = {(e)=> setFirstName(e.target.value)}/>
                 </Col> 
                 </Col>
                 <div style={{margin:"5px"}}></div>

                <Col>
                <Col>Last Name</Col>
                 <Col><Input type="text" className="form-control" placeholder="Enter Last Name" style={{paddingRight:"10px", paddingLeft:"10px"}}
                 value ={lastName} onChange = {(e)=> setLastName(e.target.value)}/>
                 </Col>
                 </Col>
                 <div style={{margin:"5px"}}></div>

                <Col>
                <Col>Age</Col>
                 <Col><Input type="text" className="form-control" placeholder="Enter Age" 
                 value={age} onChange = {ageChange}/>
                 </Col>
                 </Col>
                 <div style={{margin:"5px"}}></div>
                 
                 <Col>
                 <Col>Department</Col>
                 <Col><Input type="text" className="form-control" placeholder="Enter Department"
                 value ={department} onChange = {(e)=> setDepartment(e.target.value)}/>
                 </Col>
                 </Col>
                 <div style={{margin:"5px"}}></div>

                <Col>
                 <Col>Salary</Col>
                 <Col><Input type="text" className="form-control" placeholder="Enter Salary"
                 value ={salary} onChange = {(e)=> setSalary(e.target.value)}/>
                 </Col>
                 </Col>
                 <div style={{margin:"5px"}}></div>
                 
                 <Col>
                 <Col></Col>
                <Row>
                  <Button className="btn btn-primary" onClick={handleSubmit}>{id==0?'Submit':'Update'}     </Button>
                  <div style={{margin:"5px"}}></div>
                 {id!=0 && <Button className="btn btn-primary" onClick={handleCancel}> Cancel </Button>}
                 </Row>
                 </Col>
             </Row>
         </div>
         <Table columns={columns} dataSource={empDetails} pagination= {false}/>


     
       </div>
     )
}
