import React, { useState, useEffect } from "react";
import axios from "axios";

const UpdateFamilyMember = () => {
  const [familyMembers, setFamilyMembers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    relationship: "",
  });
  const [editingMemberId, setEditingMemberId] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3002/family-members")
      .then((response) => setFamilyMembers(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:3002/family-members", formData)
      .then((response) => {
        setFamilyMembers([...familyMembers, response.data]);
        setFormData({ name: "", age: "", gender: "", relationship: "" });
      })
      .catch((error) => console.error(error));
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3002/family-members/${id}`)
      .then(() => {
        setFamilyMembers(familyMembers.filter((member) => member.id !== id));
      })
      .catch((error) => console.error(error));
  };

  const handleEdit = (member) => {
    setFormData({
      name: member.name,
      age: member.age,
      gender: member.gender,
      relationship: member.relationship,
    });
    setEditingMemberId(member.id);
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    axios
      .put(`http://localhost:3002/family-members/${editingMemberId}`, formData)
      .then((response) => {
        setFamilyMembers(
          familyMembers.map((member) =>
            member.id === editingMemberId ? response.data : member
          )
        );
        setFormData({ name: "", age: "", gender: "", relationship: "" });
        setEditingMemberId(null);
      })
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <h1>Family Members</h1>
      <form onSubmit={editingMemberId ? handleUpdate : handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <br />
        <label>Age:</label>
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
        />
        <br />
        <label>Gender:</label>
        <select name="gender" value={formData.gender} onChange={handleChange}>
          <option value="">--Please select a gender--</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <br />
        <label>Relationship:</label>
        <input
          type="text"
          name="relationship"
          value={formData.relationship}
          onChange={handleChange}
        />
        <br />
        <button type="submit">{editingMemberId ? "Update" : "Add"}</button>
      </form>
    </div>
  );
};
export default UpdateFamilyMember;
