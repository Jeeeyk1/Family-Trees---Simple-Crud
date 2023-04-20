import React, { useState, useEffect } from "react";
import axios from "axios";

function DeleteFamilyMember() {
  const [familyMembers, setFamilyMembers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    relationship: "",
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:3002/family-members", formData)
      .then((response) => {
        setFamilyMembers([...familyMembers, response.data]);
        setFormData({
          name: "",
          age: "",
          gender: "",
          relationship: "",
        });
      });
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3002/family-members/${id}`).then(() => {
      setFamilyMembers(familyMembers.filter((member) => member.id !== id));
    });
  };
  const handleUpdate = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:8000/family-tree/${id}`,
        formData
      );
      console.log(response.data);
      setFormData({ name: "", age: "", gender: "", relationship: "" });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
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
        <input
          type="text"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
        />
        <br />
        <label>Relationship:</label>
        <input
          type="text"
          name="relationship"
          value={formData.relationship}
          onChange={handleChange}
        />
        <br />
        <button type="submit">Add Family Member</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Relationship</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {familyMembers.map((member) => (
            <tr key={member.id}>
              <td>{member.name}</td>
              <td>{member.age}</td>
              <td>{member.gender}</td>
              <td>{member.relationship}</td>
              <td>
                <button onClick={() => handleDelete(member.id)}>Delete</button>
              </td>
              <td>
                <button onClick={() => handleUpdate(member.id)}>Update</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DeleteFamilyMember;
