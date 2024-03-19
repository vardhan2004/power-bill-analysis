// <<<<<< 2 >>>>>

// import React, { useState, useEffect } from "react";
// import { Card, CardBody, Col } from "reactstrap";
// import ReactApexChart from "react-apexcharts";
// import { Link } from "react-router-dom";
// import axios from "axios";

// const axiosInstance = axios.create();

// const Breadcrumb = () => {
//   const [activeItem, setActiveItem] = useState('Year');
//   const [data, setData] = useState([]);
//   const [selectedMonth, setSelectedMonth] = useState('');
//   const [selectedYear, setSelectedYear] = useState('');
//   const [unitdata, setUnitdata] = useState([]);
//   const [costdata, setCostdata] = useState([]);

//   useEffect(() => {
//     fetchData();
//   }, []); // Fetch data on component mount

//   const fetchData = () => {
//     try {
//       axiosInstance.get("http://localhost:5000/get-data")
//       .then((response) => {
//         setData(response.data);
//       }).catch((err) => {
//         console.log(err);
//       });  
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };


//   useEffect(() => {
//     updateGraphData();
//   }, [data, selectedMonth, selectedYear]); // Update graph data whenever data or selected month/year changes

  
//   const updateGraphData = () => {
//     if (activeItem === 'Year') {
//       const selectedYearData = data.filter(item => {
//         const parts = item.date.split("/");
//         const year = parts[2];
//         return year == selectedYear;
//       });

//       const newUnitdata = selectedYearData.map(item => item.units);
//       setUnitdata(newUnitdata);
      
//       const newCostdata = newUnitdata.map(unit => unit * 15);
//       setCostdata(newCostdata);
//     } else if (activeItem === 'Month') {
//       const selectedMonthData = data.filter(item => {
//         const parts = item.date.split("/");
//         const month = parts[1];
//         const year = parts[2];
//         return year == selectedYear && month == selectedMonth;
//       });

//       const newUnitdata = selectedMonthData.map(item => item.units);
//       setUnitdata(newUnitdata);

//       const newCostdata = newUnitdata.map(unit => unit * 15);
//       setCostdata(newCostdata);
//     }
//   };

//   const options = {
//     chart: {
//       stacked: !1,
//       toolbar: {
//         show: !1
//       }
//     },
//     stroke: {
//       width: [0, 2, 2], curve: 'smooth', dashArray: [0, 0, 4]
//     },
//     plotOptions: {
//       bar: {
//         columnWidth: '20%', endingShape: 'rounded'
//       }
//     },
//     fill: {
//       opacity: [0.85, 0.25, 1],
//       gradient: {
//         inverseColors: !1, shade: 'light', type: "vertical", opacityFrom: 0.85, opacityTo: 0.55, stops: [0, 100, 100, 100]
//       }
//     },
//     xaxis: {
//       categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
//     },
//     colors: ['#036bfc', '#32a840'],
//     markers: {
//       size: 0
//     },
//   };

//   return (
//     <React.Fragment>
//       <Col lg={12}>
//         <Card className="mt-4">
//           <CardBody>
//             <div className="float-end">
//               <ul className="nav nav-pills">
//                 <li className="nav-item">
//                   <Link
//                     className={`nav-link ${activeItem === 'Month' ? 'active' : ''}`}
//                     to="#"
//                     onClick={() => setActiveItem('Month')}
//                   >
//                     Month
//                   </Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link
//                     className={`nav-link ${activeItem === 'Year' ? 'active' : ''}`}
//                     to="#"
//                     onClick={() => setActiveItem('Year')}
//                   >
//                     Year
//                   </Link>
//                 </li>
//               </ul>
//             </div>
//             <h4 className="card-title mb-5">Cost Analysis</h4>
            
//             {activeItem === 'Month' && (
//               <div>
//                 <select
//                   className="form-select w-25"
//                   value={selectedMonth}
//                   onChange={(e) => setSelectedMonth(e.target.value)}
//                 >
//                   <option value="">Select Month</option>
//                   {Array.from({ length: 12 }, (_, i) => (
//                     <option key={i} value={i + 1}>{new Date(2000, i).toLocaleString('default', { month: 'long' })}</option>
//                   ))}
//                 </select>
//                 <select
//                   className="form-select mt-3 w-25"
//                   value={selectedYear}
//                   onChange={(e) => setSelectedYear(e.target.value)}
//                 >
//                   <option value="">Select Year</option>
//                   {Array.from({ length: 10 }, (_, i) => (
//                     <option key={i} value={new Date().getFullYear() - i}>{new Date().getFullYear() - i}</option>
//                   ))}
//                 </select>
//               </div>
//             )}
//             {activeItem === 'Year' && (
//               <div>
//                 <select
//                   className="form-select mt-3 w-25"
//                   value={selectedYear}
//                   onChange={(e) => setSelectedYear(e.target.value)}
//                 >
//                   <option value="">Select Year</option>
//                   {Array.from({ length: 10 }, (_, i) => (
//                     <option key={i} value={new Date().getFullYear() - i}>{new Date().getFullYear() - i}</option>
//                   ))}
//                 </select>
//               </div>
//             )}
//             <ReactApexChart
//               options={options}
//               series={[
//                 { name: 'Units Consumed', type: 'column', data: unitdata },
//                 { name: 'Cost', type: 'area', data: costdata}
//               ]}
//               type="line"
//               height="275"
//               className="apex-charts"
//             />
//           </CardBody>
//         </Card>
//       </Col>
//     </React.Fragment>
//   );
// };

// export default Breadcrumb;


// <<<< 1 >>>>>
// import React, { useState, useEffect } from "react";
// import { Card, CardBody, Col } from "reactstrap";
// import ReactApexChart from "react-apexcharts";
// import { Link } from "react-router-dom";

// // Generate random data for 31 days
// const monthData = Array.from({ length: 31 }, () => Math.floor(Math.random() * 100));

// // Generate random data for 12 months
// // const yearData = Array.from({ length: 12 }, () => Math.floor(Math.random() * 100));

// const series = [
//   { name: 'Series A', type: 'column', data: monthData }, // Use random data for the "Month" option
//   { name: 'Series B', type: 'area', data: [32, 47, 33, 41, 22, 37, 43, 21, 41, 56, 27, 43] }, // Adjusted data for "Week" option
//   { name: 'Series C', type: 'line', data: [32, 47, 33, 41, 22, 37, 43, 21, 41, 56, 27, 43] } // Adjusted data for "Year" option
// ];

// const Breadcrumb = () => {
//   const [activeItem, setActiveItem] = useState('Year');
//   const [options, setOptions] = useState(getDefaultOptions());

//   useEffect(() => {
//     window.dispatchEvent(new Event('resize'));
//   }, []);

//   useEffect(() => {
//     setOptions(getDefaultOptions());
//   }, [activeItem]);

//   function getDefaultOptions() {
//     if (activeItem === 'Month') {
//       return {
//         chart: {
//           stacked: false,
//           toolbar: {
//             show: false
//           }
//         },
//         stroke: {
//           width: [0, 2, 2], curve: 'smooth', dashArray: [0, 0, 4]
//         },
//         plotOptions: {
//           bar: {
//             columnWidth: '15%', endingShape: 'rounded'
//           }
//         },
//         fill: {
//           opacity: [0.85, 0.25, 1],
//           gradient: {
//             inverseColors: false, shade: 'light', type: "vertical", opacityFrom: 0.85, opacityTo: 0.55, stops: [0, 100, 100, 100]
//           }
//         },
//         xaxis: {
//           categories: Array.from({ length: 31 }, (_, i) => i + 1), // Create an array of 31 days
//         },
//         colors: ['#3b5de7', '#eeb902', '#5fd195'],
//         markers: {
//           size: 0
//         },
//       };
//     } else if (activeItem === 'Year') {
//       return {
//         chart: {
//           stacked: false,
//           toolbar: {
//             show: false
//           }
//         },
//         stroke: {
//           width: [0, 2, 2], curve: 'smooth', dashArray: [0, 0, 4]
//         },
//         plotOptions: {
//           bar: {
//             columnWidth: '15%', endingShape: 'rounded'
//           }
//         },
//         fill: {
//           opacity: [0.85, 0.25, 1],
//           gradient: {
//             inverseColors: false, shade: 'light', type: "vertical", opacityFrom: 0.85, opacityTo: 0.55, stops: [0, 100, 100, 100]
//           }
//         },
//         xaxis: {
//           categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
//         },
//         colors: ['#3b5de7', '#eeb902', '#5fd195'],
//         markers: {
//           size: 0
//         },
//       };
//     } else {
//       return {
//         chart: {
//           stacked: false,
//           toolbar: {
//             show: false
//           }
//         },
//         stroke: {
//           width: [0, 2, 2], curve: 'smooth', dashArray: [0, 0, 4]
//         },
//         plotOptions: {
//           bar: {
//             columnWidth: '15%', endingShape: 'rounded'
//           }
//         },
//         fill: {
//           opacity: [0.85, 0.25, 1],
//           gradient: {
//             inverseColors: false, shade: 'light', type: "vertical", opacityFrom: 0.85, opacityTo: 0.55, stops: [0, 100, 100, 100]
//           }
//         },
//         xaxis: {
//           categories: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
//         },
//         colors: ['#3b5de7', '#eeb902', '#5fd195'],
//         markers: {
//           size: 0
//         },
//       };
//     }
//   }

//   return (
//     <React.Fragment>
//       <Col lg={12}>
//         <Card className="mt-4">
//           <CardBody>
//             <div className="float-end">
//               <ul className="nav nav-pills">
//                 <li className="nav-item">
//                   <Link
//                     className={`nav-link ${activeItem === 'Week' ? 'active' : ''}`}
//                     to="#"
//                     onClick={() => setActiveItem('Week')}
//                   >
//                     Week
//                   </Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link
//                     className={`nav-link ${activeItem === 'Month' ? 'active' : ''}`}
//                     to="#"
//                     onClick={() => setActiveItem('Month')}
//                   >
//                     Month
//                   </Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link
//                     className={`nav-link ${activeItem === 'Year' ? 'active' : ''}`}
//                     to="#"
//                     onClick={() => setActiveItem('Year')}
//                   >
//                     Year
//                   </Link>
//                 </li>
//               </ul>
//             </div>
//             <h4 className="card-title mb-5">Cost Analysis</h4>
//             <ReactApexChart
//               options={options}
//               series={series}
//               type="line"
//               height="275"
//               className="apex-charts"
//             />
//           </CardBody>
//         </Card>
//       </Col>
//     </React.Fragment>
//   );
// };

// export default Breadcrumb;
import React, { useState, useEffect } from "react";
import { Card, CardBody, Col } from "reactstrap";
import ReactApexChart from "react-apexcharts";
import { Link } from "react-router-dom";
import axios from "axios";

const axiosInstance = axios.create();

const Breadcrumb = () => {
  const [activeItem, setActiveItem] = useState('Year');
  const [data, setData] = useState([]);
  const [selectedYear, setSelectedYear] = useState('');
  const [monthlyData, setMonthlyData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []); // Fetch data on component mount

  const fetchData = () => {
    try {
      axiosInstance.get("http://localhost:4444/get-data")
        .then((response) => {
          setData(response.data);
        }).catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    updateMonthlyData();
  }, [data, selectedYear]); // Update monthly data whenever data or selected year changes

  const updateMonthlyData = () => {
    if (activeItem === 'Year' && selectedYear !== '') {
      const monthlyUnitData = Array.from({ length: 12 }, () => 0);
      const monthlyCostData = Array.from({ length: 12 }, () => 0);

      data.forEach((item, i) => {
        const parts = item.date.split("/");
        const year = parseInt(parts[2], 10);

        if (year.toString() === selectedYear) {
          const month = parseInt(parts[1], 10) - 1; // Month indices start from 0
          const units = parseFloat(item.units);

          // Find previous month's units
          let prevMonthUnits = 0;
          if (month > 0) {
            for (let j = i - 1; j >= 0; j--) {
              const prevMonthData = data[j];
              const prevMonthYear = parseInt(prevMonthData.date.split("/")[2], 10);
              const prevMonth = parseInt(prevMonthData.date.split("/")[1], 10) - 1;
              if (prevMonthYear === year && prevMonth === month - 1) {
                prevMonthUnits = parseFloat(prevMonthData.units);
                break;
              }
            }
          }

          const unitDifference = Math.ceil(units - prevMonthUnits);
          const cost = unitDifference * 15;

          monthlyUnitData[month] += unitDifference;
          monthlyCostData[month] += cost;
        }
      });

      setMonthlyData({
        unitData: monthlyUnitData,
        costData: monthlyCostData
      });
    }
  };

  const options = {
    chart: {
      stacked: !1,
      toolbar: {
        show: !1
      }
    },
    stroke: {
      width: [0, 2, 2], curve: 'smooth', dashArray: [0, 0, 4]
    },
    plotOptions: {
      bar: {
        columnWidth: '20%', endingShape: 'rounded'
      }
    },
    fill: {
      opacity: [0.85, 0.25, 1],
      gradient: {
        inverseColors: !1, shade: 'light', type: "vertical", opacityFrom: 0.85, opacityTo: 0.55, stops: [0, 100, 100, 100]
      }
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    },
    colors: ['#036bfc', '#32a840'],
    markers: {
      size: 0
    },
  };

  return (
    <React.Fragment>
      <Col lg={12}>
        <Card className="mt-4">
          <CardBody>
            <div className="float-end">
              <ul className="nav nav-pills">
                <li className="nav-item">
                  <Link
                    className={`nav-link ${activeItem === 'Year' ? 'active' : ''}`}
                    to="#"
                    onClick={() => setActiveItem('Year')}
                  >
                    Year
                  </Link>
                </li>
              </ul>
            </div>
            <h4 className="card-title mb-5">Cost Analysis</h4>

            {activeItem === 'Year' && (
              <div>
                <select
                  className="form-select mt-3 w-25"
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                >
                  <option value="">Select Year</option>
                  {Array.from({ length: 10 }, (_, i) => (
                    <option key={i} value={new Date().getFullYear() - i}>{new Date().getFullYear() - i}</option>
                  ))}
                </select>
              </div>
            )}
            {activeItem === 'Year' && selectedYear !== '' && (
              <ReactApexChart
                options={options}
                series={[
                  { name: 'Units Consumed', type: 'column', data: monthlyData.unitData },
                  { name: 'Cost', type: 'area', data: monthlyData.costData }
                ]}
                type="line"
                height="275"
                className="apex-charts"
              />
            )}
          </CardBody>
        </Card>
      </Col>
    </React.Fragment>
  );
};

export default Breadcrumb;
