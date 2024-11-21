import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  Form,
  Input,
  Select,
  notification,
  Row,
  Col,
} from "antd";
import { getUsers, addUser, deleteUser, updateUser } from "../services/api"; // API functions
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons"; // Import icons
import { Option } from "antd/lib/mentions";
import validator from "validator";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    role: "",
    status: "active", // Default status is 'active'
  });
  const [emailError, setEmailError] = useState("");
  const [usernameError, setUsernameError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      const fetchedUsers = await getUsers();
      setUsers(fetchedUsers);
    };
    fetchUsers();
  }, []);

  const openNotification = (type, message) => {
    notification[type]({
      message: message,
    });
  };

  const validateUserInput = () => {
    // Validate email
    if (!validator.isEmail(newUser.email)) {
      setEmailError("Please enter a valid email.");
      return false;
    }
    setEmailError("");

    // Validate username with regex (at least 5 characters, 1 uppercase letter, 1 number)
    const usernameRegex = /^(?=.*[A-Z])(?=.*\d).{5,}$/;
    if (!usernameRegex.test(newUser.username)) {
      setUsernameError(
        "Username must be at least 5 characters long, contain at least one uppercase letter and one number."
      );
      return false;
    }
    setUsernameError("");

    return true;
  };

  const handleAddUser = async () => {
    if (!validateUserInput()) return;

    try {
      await addUser(newUser);
      const updatedUsers = await getUsers();
      setUsers(updatedUsers);
      setIsModalVisible(false);
      setNewUser({ username: "", email: "", role: "", status: "active" });
      openNotification("success", "User added successfully!");
    } catch (error) {
      console.error("Error adding user:", error);
      openNotification("error", "Error adding user.");
    }
  };

  const handleEditUser = () => {
    if (!validateUserInput()) return;

    const updatedUser = { ...userToEdit, ...newUser };
    updateUser(userToEdit.id, newUser)
      .then(() => {
        const updatedUsers = users.map((user) =>
          user.id === updatedUser.id ? updatedUser : user
        );
        setUsers(updatedUsers);
        openNotification("success", "User updated successfully!");
      })
      .catch((error) => {
        console.error("Error updating user:", error);
        openNotification("error", "Error updating user.");
      });

    setIsModalVisible(false);
    setNewUser({ username: "", email: "", role: "", status: "active" });
    setIsEditing(false);
  };

  const handleDelete = (id) => {
    deleteUser(id).then(() => {
      setUsers(users.filter((user) => user.id !== id));
      openNotification("success", "User deleted successfully!");
    });
  };

  const handleOpenEditModal = (user) => {
    setUserToEdit(user);
    setNewUser({
      username: user.username,
      email: user.email,
      role: user.role,
      status: user.status === "active" ? "active" : "inactive", // Convert to string status
    });
    setIsEditing(true);
    setIsModalVisible(true);
  };

  const handleFieldChange = (field, value) => {
    setNewUser({ ...newUser, [field]: value });
  };

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "100%",
        height: "100vh",
        overflowY: "auto",
      }}
    >
      {/* Full screen, no card border */}
      <Row
        gutter={[16, 16]}
        justify="space-between"
        style={{ marginBottom: 16 }}
      >
        <Col xs={24} sm={24} md={6}>
          <Button
            style={{
              borderRadius: 8,
              backgroundColor: "#1890ff", // Blue background for the + icon button
              color: "white", // White icon
              fontWeight: "bold",
              padding: "8px 12px", // Small size
              fontSize: "16px",
              width: "auto", // Adjust width to content
              border: "none", // No border around the button
            }}
            type="primary"
            onClick={() => {
              setIsEditing(false); // Ensure that the form resets to "Add"
              setNewUser({
                username: "",
                email: "",
                role: "",
                status: "active",
              }); // Reset new user
              setIsModalVisible(true);
            }}
            icon={<PlusOutlined style={{ fontSize: "20px" }} />}
          />
        </Col>
      </Row>

      {/* Display Users in a responsive grid */}
      <Row gutter={[16, 16]} style={{ marginTop: "16px" }}>
        {users.map((user) => (
          <Col xs={24} sm={12} md={8} lg={6} key={user.id}>
            <div
              style={{
                backgroundColor: "#f9f9f9",
                padding: "16px",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "100%",
              }}
            >
              <div style={{ marginBottom: "12px" }}>
                <h4 style={{ fontSize: "16px", marginBottom: "8px" }}>
                  {user.username}
                </h4>
                <p style={{ fontSize: "14px", marginBottom: "4px" }}>
                  Email: {user.email}
                </p>
                <p style={{ fontSize: "14px", marginBottom: "4px" }}>
                  Role: {user.role}
                </p>
                <p style={{ fontSize: "14px" }}>
                  Status: {user.status === "active" ? "Active" : "Inactive"}
                </p>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Button
                  onClick={() => handleOpenEditModal(user)}
                  icon={
                    <EditOutlined
                      style={{ color: "#1890ff", fontSize: "18px" }}
                    />
                  }
                  size="small"
                  style={{
                    border: "none",
                    padding: 0,
                  }}
                />
                <Button
                  danger
                  onClick={() => handleDelete(user.id)}
                  icon={
                    <DeleteOutlined
                      style={{ color: "#ff4d4f", fontSize: "18px" }}
                    />
                  }
                  size="small"
                  style={{
                    border: "none",
                    padding: 0,
                  }}
                />
              </div>
            </div>
          </Col>
        ))}
      </Row>

      {/* Modal for Adding/Editing Users */}
      <Modal
        title={isEditing ? "Edit User" : "Add User"}
        visible={isModalVisible}
        onOk={isEditing ? handleEditUser : handleAddUser}
        onCancel={() => setIsModalVisible(false)}
        okText={isEditing ? "Update" : "Add"}
        cancelText="Cancel"
        destroyOnClose
        width="100%"
        style={{ maxWidth: "500px" }} // Max width for modal
      >
        <Form layout="vertical">
          <Form.Item
            label="Username"
            validateStatus={usernameError ? "error" : ""}
            help={usernameError}
          >
            <Input
              value={newUser.username}
              onChange={(e) => handleFieldChange("username", e.target.value)}
              placeholder="Enter username"
            />
          </Form.Item>
          <Form.Item
            label="Email"
            validateStatus={emailError ? "error" : ""}
            help={emailError}
          >
            <Input
              value={newUser.email}
              onChange={(e) => handleFieldChange("email", e.target.value)}
              placeholder="Enter email"
            />
          </Form.Item>
          <Form.Item label="Role">
            <Select
              value={newUser.role}
              onChange={(value) => handleFieldChange("role", value)}
              placeholder="Select role"
            >
              <Option value="admin">Admin</Option>
              <Option value="user">User</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Status">
            <Select
              value={newUser.status}
              onChange={(value) => handleFieldChange("status", value)}
            >
              <Option value="active">Active</Option>
              <Option value="inactive">Inactive</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserManagement;
