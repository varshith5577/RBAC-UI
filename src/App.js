import React from "react";
import { Layout, Menu } from "antd";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useLocation,
} from "react-router-dom";
import UserManagement from "./components/UserManagement";
import RoleManagement from "./components/RoleManagement";
import HomePage from "./components/HomePage";

const { Header, Content } = Layout;

const App = () => {
  // Get current location (route)
  const location = useLocation();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Header Section */}
      <Header>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[location.pathname]} // Dynamically set the active menu item
        >
          <Menu.Item key="/">
            <Link to="/">Home</Link> {/* Link to HomePage */}
          </Menu.Item>
          <Menu.Item key="/users">
            <Link to="/users">User Management</Link>
          </Menu.Item>
          <Menu.Item key="/roles">
            <Link to="/roles">Role Management</Link>
          </Menu.Item>
        </Menu>
      </Header>

      {/* Main Content Section */}
      <Content style={{ padding: "50px" }}>
        <Routes>
          <Route path="/" element={<HomePage />} /> {/* HomePage route */}
          <Route path="/users" element={<UserManagement />} />
          <Route path="/roles" element={<RoleManagement />} />
        </Routes>
      </Content>
    </Layout>
  );
};

export default App;
