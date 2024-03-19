import React, { useState } from "react"
import axios from "axios";

import {
  Card,
  CardBody,
  Col,
  Row,
  CardTitle,
  Label,
  Input,
  Form,
} from "reactstrap"

import Breadcrumbs from "../../components/Common/Breadcrumb"

const baseUrl = process.env.REACT_APP_DATABASEURL;
const axiosInstance = axios.create();
const CostAnalysis = () => {
  const selectedDate = new Date();
  const date = selectedDate.getDate();
  const month = selectedDate.getMonth() + 1; // Month is zero-based, so add 1
  const year = selectedDate.getFullYear();
  const Hours = selectedDate.getHours();
  const Minutes = selectedDate.getMinutes();
  const Seconds = selectedDate.getSeconds();
  const Time = `${Hours}:${Minutes}:${Seconds}`
  const formattedDate = `${date}/${month}/${year}`;
  const [customchk, setcustomchk] = useState(true)
  const [toggleSwitch, settoggleSwitch] = useState(true)
  const [formData, setFormData] = useState({
    date:formattedDate,
    time:Time,
    units:'',
    comments:''
  })
  const handleSubmit=(e)=>{
    e.preventDefault();
    console.log('Form Data:',formData);
   
    axiosInstance.post(baseUrl+'cost-entry', formData)
      .then((res)=>{
        window.location.href = "/tables-datatable";
        console.log("Succesfull");
      })

   
    .catch((err)=>{
      console.log(err);
    })
  }
  return (
    <React.Fragment className="p-100 m-100">
      <div className="page-content">
        <Breadcrumbs title="Form" breadcrumbItem="Form Elements" />
      </div>

      <div className="container ">
        <Card style={{height:"1000", padding:"100px"}}>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            <b><h3 align="center">Enter Readings</h3></b>
           
       
            <div className="form-group">
              <label>Enter Readings:</label>
              <input
                type="Number"
                className="form-control form-control-sm"
                name="units"
                placeholder="Enter readings"
                value={formData.units}
                onChange={(e) => setFormData({...formData, units:e.target.value})}
                required
              />
            </div>
            <br />
            <div className="form-group">
              <label>Comments:</label>
              <input 
                type="text"
                className="form-control form-control-sm"
                name="comments"
                value={formData.comments}
                placeholder="enter comments"
                onChange={(e) => setFormData({...formData, comments:e.target.value})}
                required
              />
            </div>
            <br />
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
      </Card>
    </div>
    </ React.Fragment>
  )
}

export default CostAnalysis
