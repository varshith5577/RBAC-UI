import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  Form,
  Input,
  Checkbox,
  notification,
  Row,
  Col,
} from "antd";
import { getRoles, addRole, updateRole, deleteRole } from "../services/api"; // API functions
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons"; // Import icons

const RoleManagement = () => {
  const [roles, setRoles] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [roleToEdit, setRoleToEdit] = useState(null);
  const [newRole, setNewRole] = useState({ roleName: "", permissions: [] });

  useEffect(() => {
    const fetchData = async () => {
      const fetchedRoles = await getRoles();
      setRoles(fetchedRoles);
    };
    fetchData();
  }, []);

  const permissions = ["Read", "Write", "Delete"];

  const openNotification = (type, message) => {
    notification[type]({
      message: message,
    });
  };

  const handleAddRole = async () => {
    try {
      await addRole(newRole);
      const updatedRoles = await getRoles();
      setRoles(updatedRoles);
      setIsModalVisible(false);
      setNewRole({ roleName: "", permissions: [] });
      openNotification("success", "Role added successfully!");
    } catch (error) {
      console.error("Error adding role:", error);
      openNotification("error", "Error adding role.");
    }
  };

  const handleEditRole = async () => {
    try {
      await updateRole(roleToEdit.id, newRole);
      const updatedRoles = await getRoles();
      setRoles(updatedRoles);
      setIsModalVisible(false);
      setNewRole({ roleName: "", permissions: [] });
      setIsEditing(false);
      openNotification("success", "Role updated successfully!");
    } catch (error) {
      console.error("Error editing role:", error);
      openNotification("error", "Error editing role.");
    }
  };

  const handleDelete = (id) => {
    deleteRole(id).then(() => {
      setRoles(roles.filter((role) => role.id !== id));
      openNotification("success", "Role deleted successfully!");
    });
  };

  const handlePermissionChange = (checkedValues) => {
    setNewRole({ ...newRole, permissions: checkedValues });
  };

  const handleOpenEditModal = (role) => {
    setRoleToEdit(role);
    setNewRole({ roleName: role.roleName, permissions: role.permissions });
    setIsEditing(true);
    setIsModalVisible(true);
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
              setNewRole({
                roleName: "",
                permissions: [],
              }); // Reset new role
              setIsModalVisible(true);
            }}
            icon={<PlusOutlined style={{ fontSize: "20px" }} />}
          />
        </Col>
      </Row>

      {/* Display Roles in a responsive grid */}
      <Row gutter={[16, 16]} style={{ marginTop: "16px" }}>
        {roles.map((role) => (
          <Col xs={24} sm={12} md={8} lg={6} key={role.id}>
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
                  {role.roleName}
                </h4>
                <p style={{ fontSize: "14px", marginBottom: "4px" }}>
                  Permissions: {role.permissions.join(", ")}
                </p>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Button
                  onClick={() => handleOpenEditModal(role)}
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
                  onClick={() => handleDelete(role.id)}
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

      {/* Modal for Adding/Editing Roles */}
      <Modal
        title={isEditing ? "Edit Role" : "Add Role"}
        visible={isModalVisible}
        onOk={isEditing ? handleEditRole : handleAddRole}
        onCancel={() => setIsModalVisible(false)}
        okText={isEditing ? "Update" : "Add"}
        cancelText="Cancel"
        destroyOnClose
        width="100%"
        style={{ maxWidth: "500px" }} // Max width for modal
      >
        <Form layout="vertical">
          <Form.Item label="Role Name">
            <Input
              value={newRole.roleName}
              onChange={(e) =>
                setNewRole({ ...newRole, roleName: e.target.value })
              }
              placeholder="Enter role name"
            />
          </Form.Item>
          <Form.Item label="Permissions">
            <Checkbox.Group
              options={permissions}
              value={newRole.permissions}
              onChange={handlePermissionChange}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default RoleManagement;
