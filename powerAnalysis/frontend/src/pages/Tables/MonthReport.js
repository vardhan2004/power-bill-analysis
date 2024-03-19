// import React, { useState, useEffect } from 'react';
// import { Row, Col, Card, CardBody } from 'reactstrap';
// import axios from 'axios';
// import Breadcrumbs from '../../components/Common/Breadcrumb';
// import './datatables.scss';

// const axiosInstance = axios.create();

// const MonthReport = () => {
//   const [data, setData] = useState([]);
//   const [selectedYear, setSelectedYear] = useState('');
//   const [selectedMonth, setSelectedMonth] = useState('');
//   const [years, setYears] = useState([]);
//   const [months, setMonths] = useState([]);
//   const [perPage, setPerPage] = useState(10);
//   const [currentPage, setCurrentPage] = useState(0);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = () => {
//     axiosInstance
//       .get("http://localhost:1234/get-data")
//       .then((res) => {
//         setData(res.data);
//         const uniqueYears = [...new Set(res.data.map(item => item.year))];
//         setYears(uniqueYears);
//         const uniqueMonths = [...new Set(res.data.map(item => item.month))];
//         setMonths(uniqueMonths);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   const handleYearChange = (year) => {
//     setSelectedYear(year);
//     setSelectedMonth('');
//   };

//   const handleMonthChange = (month) => {
//     setSelectedMonth(month);
//   };

//   const handlePerPageChange = (value) => {
//     setPerPage(value);
//     setCurrentPage(0);
//   };

//   const handlePageChange = (increment) => {
//     setCurrentPage(currentPage + increment);
//   };

//   const filteredData = data.filter(record => {
//     if (selectedYear && selectedMonth) {
//       return record.year === parseInt(selectedYear) && record.month === parseInt(selectedMonth);
//     }
//     return true; // Return all records if no year or month is selected
//   });

//   const pageCount = Math.ceil(filteredData.length / perPage);
//   const offset = currentPage * perPage;

//   const paginatedData = filteredData.slice(offset, offset + perPage);

//   const tableRows = paginatedData.map((record, index) => {
//     const prevRecord = paginatedData[index - 1];
//     let unitDifference = '';
//     let cost = '';
//     if (prevRecord) {
//       unitDifference = record.units - prevRecord.units;
//       cost = unitDifference * 15;
//     }
//     return (
//       <tr key={index}>
//         <td>{record.date}</td>
//         <td>{record.time}</td>
//         <td>{record.units}</td>
//         <td>{unitDifference}</td>
//         <td>{cost}</td>
//       </tr>
//     );
//   });

//   return (
//     <React.Fragment>
//       <div className="page-content">
//         <Breadcrumbs title="Tables" breadcrumbItem="Data Tables" />
//         <Row>
//           <Col className="col-12">
//             <Card>
//               <CardBody>
//                 <div className="filter-section">
//                   <select className="form-select mt-3 w-25 " value={selectedYear} onChange={(e) => handleYearChange(e.target.value)}>
//                     <option value="">Select Year</option>
//                     {years.map((year, index) => (
//                       <option key={index} value={year}>{year}</option>
//                     ))}
//                   </select>
//                   <select className="form-select mt-3 w-25 float-right" value={selectedMonth} onChange={(e) => handleMonthChange(e.target.value)}>
//                     <option value="">Select Month</option>
//                     {months.map((month, index) => (
//                       <option key={index} value={month}>{month}</option>
//                     ))}
//                   </select><br />
//                   <select value={perPage} onChange={(e) => handlePerPageChange(parseInt(e.target.value))}>
//                     <option value="10">10</option>
//                     <option value="20">20</option>
//                     <option value="50">50</option>
//                   </select>
//                 </div>
//                 <div className="table-responsive">
//                   <table className="table table-striped table-bordered">
//                     <thead>
//                       <tr>
//                         <th>Date</th>
//                         <th>Time</th>
//                         <th>Readings</th>
//                         <th>Units Difference</th>
//                         <th>Cost</th>
//                       </tr>
//                     </thead>
//                     <tbody>{tableRows}</tbody>
//                   </table>
//                 </div>
//                 <div className="pagination">
//                   <button disabled={currentPage === 0} onClick={() => handlePageChange(-1)}>Previous</button>
//                   <span>{currentPage + 1} of {pageCount}</span>
//                   <button disabled={currentPage === pageCount - 1} onClick={() => handlePageChange(1)}>Next</button>
//                 </div>
//               </CardBody>
//             </Card>
//           </Col>
//         </Row>
//       </div>
//     </React.Fragment>
//   );
// };

// export default MonthReport;

import React, { useState, useEffect } from 'react';
import { Row, Col, Card, CardBody } from 'reactstrap';
import axios from 'axios';
import Breadcrumbs from '../../components/Common/Breadcrumb';
import './datatables.scss';

const axiosInstance = axios.create();

const MonthReport = () => {
  const [data, setData] = useState([]);
  const [monthTotals, setMonthTotals] = useState([]);
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axiosInstance
      .get("http://localhost:4444/get-data")
      .then((res) => {
        setData(res.data);
        calculateMonthTotals(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const calculateMonthTotals = (data) => {
    const monthData = {};
    data.forEach(item => {
      const monthKey = `${item.year}-${item.month}`;
      if (!monthData[monthKey]) {
        monthData[monthKey] = {
          year: item.year,
          month: item.month,
          totalUnits: item.units,
          totalCost: item.units * 15
        };
      } else {
        monthData[monthKey].totalUnits += item.units;
        monthData[monthKey].totalCost += item.units * 15;
      }
    });

    const monthTotals = Object.values(monthData);
    setMonthTotals(monthTotals);
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
    // Filter data based on selected year and month
    const filteredData = data.filter(item => item.year === parseInt(event.target.value, 10) && (selectedMonth === '' || item.month === parseInt(selectedMonth, 10)));
    calculateMonthTotals(filteredData);
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
    // Filter data based on selected year and month
    const filteredData = data.filter(item => item.year === parseInt(selectedYear, 10) && (event.target.value === '' || item.month === parseInt(event.target.value, 10)));
    calculateMonthTotals(filteredData);
  };

  const handlePerPageChange = (event) => {
    setPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0); // Reset current page when changing the number of items per page
  };

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];

  // Calculate total number of pages
  const totalPages = Math.ceil(monthTotals.length / perPage);

  // Calculate start and end indexes of current page
  const startIndex = currentPage * perPage;
  const endIndex = Math.min(startIndex + perPage, monthTotals.length);

  // Slice the data for the current page
  const currentData = monthTotals.slice(startIndex, endIndex).map((record, index) => (
    <tr key={index}>
      <td>{record.year}</td>
      <td>{months[record.month - 1]}</td>
      <td>{record.totalUnits}</td>
      <td>{Math.ceil(record.totalCost)}</td>
    </tr>
  ));

  return (
    <React.Fragment>
      <div className="page-content">
        <Breadcrumbs title="Tables" breadcrumbItem="Data Tables" />
        <Row>
          <Col className="col-12">
            <Card>
              <CardBody>
                <div className="table-responsive">
                  <div className="filter-section">
                    <label htmlFor="year">Select Year:</label>
                    <select className="form-select mt-3 w-25" id="year" onChange={handleYearChange} value={selectedYear}>
                      <option value="">All</option>
                      {/* Assuming years are available in data */}
                      {Array.from(new Set(data.map(item => item.year))).map(year => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                    <label htmlFor="month">Select Month:</label>
                    <select className="form-select mt-3 w-25" id="month" onChange={handleMonthChange} value={selectedMonth}>
                      <option value="">All</option>
                      {/* Displaying months */}
                      {months.map((month, index) => (
                        <option key={index + 1} value={index + 1}>{month}</option>
                      ))}
                    </select><br />
                    <label htmlFor="perPage">Records Per Page:</label>
                    <select id="perPage" onChange={handlePerPageChange} value={perPage}>
                      <option value="10">10</option>
                      <option value="50">50</option>
                      <option value="100">100</option>
                    </select>
                  </div>
                  <table className="table table-striped table-bordered">
                    <thead>
                      <tr>
                        <th>Year</th>
                        <th>Month</th>
                        <th>Total Units</th>
                        <th>Total Cost</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentData}
                    </tbody>
                  </table>
                  {/* Pagination */}
                  <nav>
                    <ul className="pagination">
                      <li className={`page-item ${currentPage === 0 ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
                      </li>
                      {Array.from({ length: totalPages }, (_, i) => (
                        <li key={i} className={`page-item ${currentPage === i ? 'active' : ''}`}>
                          <button className="page-link" onClick={() => setCurrentPage(i)}>{i + 1}</button>
                        </li>
                      ))}
                      <li className={`page-item ${currentPage === totalPages - 1 ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
                      </li>
                    </ul>
                  </nav>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
};

export default MonthReport;