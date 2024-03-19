import React, { useState, useEffect } from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';
import ReactApexChart from "react-apexcharts";
import axios from 'axios';
import Breadcrumbs from '../../components/Common/Breadcrumb';
import SalesReport from './SalesReport';
import EmailSent from './EmailSent';

const axiosInstance = axios.create();
const series = [70];
const options = {
    plotOptions: {
        radialBar: {
            offsetY: -12,
            hollow: {
                margin: 5,
                size: '60%',
                background: 'rgba(59, 93, 231, .25)',
            },
            dataLabels: {
                name: {
                    show: false,
                },
                value: {
                    show: true,
                    fontSize: '12px',
                    offsetY: 5,
                },
                style: {
                    colors: ['#fff']
                }
            }
        },
    },
    colors: ['#3b5de7'],
};

const series1 = [81];
const options1 = {
    plotOptions: {
        radialBar: {
            offsetY: -12,
            hollow: {
                margin: 5,
                size: '60%',
                background: 'rgba(69, 203, 133, .25)',
            },
            dataLabels: {
                name: {
                    show: false,
                },
                value: {
                    show: true,
                    fontSize: '12px',
                    offsetY: 5,
                },
                style: {
                    colors: ['#fff']
                }
            }
        },
    },
    colors: ['#45CB85'],
};

const Dashboard2 = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        axiosInstance.get("http://localhost:4444/get-data")
            .then((res) => {
                setData(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const len = data.length;
    let current_Units = 0;
    let previous_Units = 0;

    if (len > 1) {
        const find_curr_prev = (array, currentIndex) => {
            const currentRecord = array[currentIndex];
            const previousRecord = array[currentIndex - 1];
            return { currentRecord, previousRecord };
        };

        const cur = find_curr_prev(data, len - 1);
        const bef = find_curr_prev(data, len - 2);
        const a_cur = cur.currentRecord;
        const a_prev = cur.previousRecord;
        const b_cur = bef.currentRecord;
        const b_prev = bef.previousRecord;

        current_Units = (a_cur.units - a_prev.units) * 1000;
        previous_Units = (b_cur.units - b_prev.units) * 1000;
    }

    return (
        <React.Fragment>
            <div className="page-content">
                <Breadcrumbs title="Dashboard" breadcrumbItem="Dashboard" />
                <Row>
                    <Col lg={12}>
                        <Row>
                            <Col md={6}>
                                <Card>
                                    <CardBody>
                                        <Row>
                                            <Col xs={8}>
                                                <div>
                                                    <p className="text-muted fw-medium mt-1 mb-2">Previous Day</p>
                                                    <h4>{Math.ceil(previous_Units)} Units</h4>
                                                </div>
                                            </Col>
                                            <div className="col-4">
                                                <div>
                                                    <ReactApexChart
                                                        options={options}
                                                        series={series}
                                                        type="radialBar"
                                                        height="120"
                                                    />
                                                </div>
                                            </div>
                                        </Row>
                                        <p className="mb-0"><span className="badge badge-soft-success me-2"> 0.8% <i
                                            className="mdi mdi-arrow-up"></i> </span> From previous period</p>
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col md={6}>
                                <Card>
                                    <CardBody>
                                        <Row>
                                            <Col xs={8}>
                                                <div>
                                                    <p className="text-muted fw-medium mt-1 mb-2">Current Day</p>
                                                    <h4>{Math.ceil(current_Units)} Units</h4>
                                                </div>
                                            </Col>
                                            <Col xs={4}>
                                                <div>
                                                    <ReactApexChart
                                                        options={options1}
                                                        series={series1}
                                                        type="radialBar"
                                                        height="120"
                                                    />
                                                </div>
                                            </Col>
                                        </Row>
                                        <p className="mb-0"><span className="badge badge-soft-success me-2"> 0.6% <i
                                            className="mdi mdi-arrow-up"></i> </span> From previous period</p>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                        <SalesReport />
                    </Col>
                    <EmailSent />
                </Row>
            </div>
        </React.Fragment>
    );
}
export default Dashboard2;