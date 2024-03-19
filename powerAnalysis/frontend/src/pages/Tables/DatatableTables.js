import React, { useState, useEffect } from "react";
import axios from "axios";
import "./datatables.scss";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { Card, CardBody, Col, Row } from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";

const axiosInstance = axios.create();

const DatatableTables = () => {
  const [data, setData] = useState([]);
  const [showForm, setShowForm] = useState(false); // State to manage form visibility
  const [isVisible, SetVisible] = useState(true);
  const [editedRowId, setEditedRowId] = useState(null);
  const [selectedRecord, setSelectedRecord] = useState({
    units: "",
    comments: ""
  }); // State to store selected record for editing
  const [currentPage, setCurrentPage] = useState(0);
  const [perPage, setPerPage] = useState(10);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    console.log("Fetching data...");
    try {
      const response = await axiosInstance.get("http://localhost:4444/get-data");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const Delete = (data) => {
    console.log(data._id);
    axiosInstance
      .delete("http://localhost:4444/delete-data/" + data._id)
      .then((res) => {
        fetchData();
        alert("Successfully Deleted");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  let formStyle = {
    display: showForm ? "block" : "none"
  };

  let tabledata = {
    display: isVisible ? "block" : "none"
  };

  const Update = (id) => {
    setEditedRowId(id);
    SetVisible(false);
    setShowForm(true);
    setSelectedRecord(data.find((record) => record._id === id));
  };

  const find_curr_prev = (array, currentIndex) => {
    const currentRecord = array[currentIndex];
    let previousRecord = { units: 0 };
    if (currentIndex > 0) {
      previousRecord = array[currentIndex - 1];
    }
    return { currentRecord, previousRecord };
  };

  const renderTable = () => {
    const tableRows = data.map((record, index) => {
      const { currentRecord, previousRecord } = find_curr_prev(data, index);
      const isEditing = editedRowId === record._id;
      let previousUnits = "";
      let unitDifference = "";

      if (previousRecord) {
        previousUnits = previousRecord.units;
        unitDifference = Math.ceil((record.units - previousUnits) * 1000);
      }

      return (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{record.date}</td>
          <td style={tabledata}>{record.units}</td>
          <td style={formStyle}>
            {/* Render input field only for the edited row */}
            {isEditing ? (
              <input
                type="Number"
                defaultValue={record.units}
                // Add onChange handler to update edited value
              />
            ) : (
              record.units
            )}
          </td>

          <td>{unitDifference}</td>
          <td>{unitDifference * 12}</td>
          <td>{record.comments}</td>
          <td>
            <div className="col-xl-3 col-lg-4 col-sm-6">
              <div className="d-flex">
                <span className="me-2">
                  <Link to="#" onClick={() => Update(record._id)}>
                    <i className="bx bx-pencil"></i>
                  </Link>
                </span>
                <span>
                  <Link to="#" onClick={() => Delete(record)}>
                    <i className="bx bx-trash-alt"></i>
                  </Link>
                </span>
              </div>
            </div>
          </td>
        </tr>
      );
    });

    // Calculate total number of pages
    const totalPages = Math.ceil(data.length / perPage);

    // Calculate start and end index for the current page
    const startIndex = currentPage * perPage;
    const endIndex = Math.min(startIndex + perPage, data.length);

    // Slice the data for the current page
    const paginatedData = tableRows.slice(startIndex, endIndex);

    return (
      <div className="table-responsive">
        <Row className="mt-3">
          <Col>
            <select
              value={perPage}
              onChange={(e) => setPerPage(parseInt(e.target.value))}
            >
              <option value="10">10</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </Col>
        </Row>
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th style={{ color: "blue", fontWeight: "bold" }}>S.No</th>
              <th style={{ color: "blue", fontWeight: "bold" }}>Date</th>
              <th style={{ color: "blue", fontWeight: "bold" }}>Readings</th>
              <th style={{ color: "blue", fontWeight: "bold" }}>Units</th>
              <th style={{ color: "blue", fontWeight: "bold" }}>Amount</th>
              <th style={{ color: "blue", fontWeight: "bold" }}>Comments</th>
              <th style={{ color: "blue", fontWeight: "bold" }}>Actions</th>
            </tr>
          </thead>
          <tbody>{paginatedData}</tbody>
        </table>

        {/* Pagination */}
        <div>
          <button
            onClick={() =>
              setCurrentPage((prevPage) => Math.max(prevPage - 1, 0))
            }
            disabled={currentPage === 0}
          >
            Previous
          </button>
          <span>{currentPage + 1}</span> of <span>{totalPages}</span>
          <button
            onClick={() =>
              setCurrentPage((prevPage) =>
                Math.min(prevPage + 1, totalPages - 1)
              )
            }
            disabled={currentPage === totalPages - 1}
          >
            Next
          </button>
        </div>
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
              <CardBody>{renderTable()}</CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
};

export default DatatableTables;
