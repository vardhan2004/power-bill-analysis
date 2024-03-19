import React, { useState, useEffect } from "react";
import { Row, Col, Card, CardBody } from "reactstrap";
import axios from "axios";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import "./datatables.scss";

const axiosInstance = axios.create();

const YearReport = () => {
  const [data, setData] = useState([]);
  const [selectedYear, setSelectedYear] = useState('');
  const [years, setYears] = useState([]);
  const [totalUnits, setTotalUnits] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    console.log('Fetching data...');
    axiosInstance.get("http://localhost:4444/get-data")
      .then((res) => {
        setData(res.data);
        const uniqueYears = [...new Set(res.data.map(item => item.year))];
        setYears(uniqueYears);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleYearChange = (year) => {
    setSelectedYear(year);
    const filteredData = data.filter(record => record.year === parseInt(year));
    const units = filteredData.reduce((total, record) => total + record.units, 0);
    setTotalUnits(units);
  };

  const renderTable = () => {
    const filteredData = data.filter(record => record.year === parseInt(selectedYear));
    return (
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Readings</th>
              <th>TotalCost</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((record, index) => (
              <tr key={index}>
                <td>{record.date}</td>
                <td>{record.time}</td>
                <td>{record.units}</td>
                <td>{Math.ceil(record.units*12)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>Total Units: {Math.ceil(totalUnits)}</div>
        <div>Total Cost: {Math.ceil(totalUnits*12)}</div>
      </div>
    );
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Breadcrumbs title="Tables" breadcrumbItem="Data Tables" />
        <Row>
          <Col className="col-12">
            <Card>
              <CardBody>
                <div className="filter-section">
                  <select className="form-select mt-3 w-25" value={selectedYear} onChange={(e) => handleYearChange(e.target.value)}>
                    <option value="">Select Year</option>
                    {years.map((year, index) => (
                      <option key={index} value={year}>{year}</option>
                    ))}
                  </select>
                </div>
                {selectedYear && renderTable()}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
};

export default YearReport;
