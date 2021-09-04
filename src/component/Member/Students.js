import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment'
import classes from './Students.module.css'
const Students = () => {
  const [students, setStudents] = useState([]);
/*commet*/
  useEffect(() => {
    axios.get("http://localhost:8080/getStudents").
      then(res => {
        setStudents(res.data.result);
      }).catch(error => {
        alert(error)
      })
  }, [])

  const deleteStudentHandler = (student) => {
    axios.post("http://localhost:8080/deleteStudent", student).
      then(res => {

      }).catch(error => {
        alert(error)
      })
  }

  return (
    <div className="container mt-5">
      <table className="table table-striped table-hover table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>MembershipType</th>
            <th>RegistrationDate</th>
            <th colSpan="2">Action</th>

          </tr>
        </thead>
        <tbody>
          {
            students.map((student) => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.password}</td>
                <td>{student.membershipType}</td>
                <td>{moment(student.date).format("MMM Do YY")}</td>
                <td><button className="btn btn-danger" onClick={() => deleteStudentHandler(student)}>Delete</button></td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}
export default Students;