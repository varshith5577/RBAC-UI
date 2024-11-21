import React from "react";
import { Layout, Button, Row, Col, Card } from "antd";
import { NavLink } from "react-router-dom"; // Import NavLink

const { Content, Footer } = Layout;

const HomePage = () => {
  return (
    <Layout
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      {/* Header Section */}
      <div
        style={{
          textAlign: "center",
          fontSize: "2rem", // Adjusted font size for better responsiveness
          fontWeight: "bold",
          padding: "20px",
          backgroundColor: "#6D55D2",
          color: "#fff",
        }}
      >
        Welcome to the User and Role Management Portal
      </div>

      {/* Main Content */}
      <Content
        style={{
          padding: "50px 20px",
          backgroundColor: "#f0f2f5",
          flex: 1,
        }}
      >
        <Row
          gutter={[32, 32]}
          justify="center"
          style={{ maxWidth: "1200px", margin: "0 auto" }}
        >
          {/* User Management Card */}
          <Col xs={24} sm={12} md={8}>
            <Card
              title="Manage Users"
              bordered={false}
              hoverable
              style={{
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
              }}
              headStyle={{
                fontSize: "20px",
                fontWeight: "bold",
                textAlign: "center",
                backgroundColor: "#0A0F16",
                color: "#fff",
              }}
            >
              <p style={{ textAlign: "center", marginBottom: "20px" }}>
                Manage User accounts and their permissions here.
              </p>
              <NavLink to="/users">
                <Button
                  type="primary"
                  size="large"
                  block
                  style={{
                    borderRadius: "8px",
                    fontWeight: "600", // More emphasis on button text
                  }}
                >
                  User
                </Button>
              </NavLink>
            </Card>
          </Col>

          {/* Role Management Card */}
          <Col xs={24} sm={12} md={8}>
            <Card
              title="Manage Roles"
              bordered={false}
              hoverable
              style={{
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
              }}
              headStyle={{
                fontSize: "20px",
                fontWeight: "bold",
                textAlign: "center",
                backgroundColor: "#0A0F16",
                color: "#fff",
              }}
            >
              <p style={{ textAlign: "center", marginBottom: "20px" }}>
                Create roles to users for better access control.
              </p>
              <NavLink to="/roles">
                <Button
                  type="primary"
                  size="large"
                  block
                  style={{
                    borderRadius: "8px",
                    fontWeight: "600", // More emphasis on button text
                  }}
                >
                  Role
                </Button>
              </NavLink>
            </Card>
          </Col>
        </Row>
      </Content>

      {/* Footer Section */}
      <Footer
        style={{
          textAlign: "center",
          padding: "10px",
          backgroundColor: "#6D55D2",
          color: "#fff",
        }}
      >
        Developed by Varshith Reddy ©2024
      </Footer>
    </Layout>
  );
};

export default HomePage;
