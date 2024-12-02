import React, { useState, useEffect } from "react";
import { Card, Row, Col, Table } from "react-bootstrap";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function Home() {
  // State สำหรับเก็บวันที่และเวลา
  const [currentTime, setCurrentTime] = useState(new Date());

  // ใช้ useEffect เพื่ออัปเดตเวลาทุกวินาที
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
  }, []);

  // Data สำหรับ Pie Chart
  const pieData = {
    labels: ["ซันก่อนสร้าง", "New Instrument", "JIB"],
    datasets: [
      {
        data: [30.3, 37.9, 25],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  const pieOptions = {
    maintainAspectRatio: false,
  };

  return (
    <div className="main-content">
      <h1 style={{marginBottom: "25px"}}>Home</h1>
      {/* Row 1: Current Date, Time, Picked, Waiting for Approval, Report */}
      <Row className="mb-4">

        <Col md={3}>
          <Card className="text-center h-100">
            <Card.Body className="d-flex flex-column align-items-center justify-content-center">
              <Card.Text style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                {currentTime.toLocaleDateString()}
              </Card.Text>
              <Card.Text style={{ fontSize: "1rem", color: "#555" }}>
                {currentTime.toLocaleTimeString()}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="text-center h-100">
            <Card.Body>
              <i className="bi bi-box" style={{ fontSize: "2rem", color: "#1976d2" }}></i>
              <Card.Text style={{ fontWeight: "bold" }}>Picked</Card.Text>
              <Card.Text style={{ fontSize: "1.5rem", color: "#555" }}>1256</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="text-center h-100">
            <Card.Body>
              <i className="bi bi-clock" style={{ fontSize: "2rem", color: "#FF9800" }}></i>
              <Card.Text style={{ fontWeight: "bold" }}>Waiting for Approve</Card.Text>
              <Card.Text style={{ fontSize: "1.5rem", color: "#555" }}>10</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="text-center h-100">
            <Card.Body>
              <i className="bi bi-file-earmark-text" style={{ fontSize: "2rem", color: "#4CAF50" }}></i>
              <Card.Text style={{ fontWeight: "bold" }}>Report</Card.Text>
              <Card.Text style={{ fontSize: "1.5rem", color: "#555" }}>12</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        
      </Row>

      {/* Row 2: The most used products table and Pie Chart */}
      <Row>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title style={{ fontWeight: "bold" }}>The Most Used Products</Card.Title>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Joy-stick</td>
                    <td>Electronics</td>
                    <td>260</td>
                  </tr>
                  <tr>
                    <td>Piano</td>
                    <td>Musical Instruments</td>
                    <td>196</td>
                  </tr>
                  <tr>
                    <td>Keyboard</td>
                    <td>Electronics</td>
                    <td>100</td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title style={{ fontWeight: "bold" }}>Top 3 projects that use the most products</Card.Title>
              <div style={{ height: "250px", width: "100%" }}>
                <Pie data={pieData} options={pieOptions} />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Home;
