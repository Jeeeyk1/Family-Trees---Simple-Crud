import React, { useState, useEffect } from "react";
import axios, { Axios } from "axios";

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

  useEffect(() => {
    axios.get("http://localhost:3002/family-members").then((res) => {
      console.log(res.data.data);
      setFamilyMembers(res.data.data);
    });
    console.log("family " + familyMembers);
  }, []);
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
  const [editingId, setEditingId] = useState(null);
  const handleEdit = (id) => {
    setEditingId(id);
  };
  const handleSave = (id) => {
    const updatedFamilyMember = familyMembers.find((fam) => fam.id === id);
    axios
      .put(`http://localhost:3002/family-members/${id}`, updatedFamilyMember)
      .then((response) => {
        // Update the state with the updated family member data
        const updatedFamilyMembers = familyMembers.map((fam) => {
          if (fam.id === id) {
            return response.data;
          } else {
            return fam;
          }
        });
        setFamilyMembers(updatedFamilyMembers);
        setEditingId(null);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleInputChange = (id, field, value) => {
    // Update the corresponding family member object in the state
    const updatedFamilyMembers = familyMembers.map((fam) => {
      if (fam.id === id) {
        return {
          ...fam,
          [field]: value,
        };
      } else {
        return fam;
      }
    });
    setFamilyMembers(updatedFamilyMembers);
  };
  const handleCancel = () => {
    setEditingId(null);
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
              <td>
                {editingId === member.id ? (
                  <input
                    type="text"
                    value={member.name}
                    onChange={(e) =>
                      handleInputChange(member.id, "name", e.target.value)
                    }
                  />
                ) : (
                  member.name
                )}
              </td>

              <td>
                {editingId === member.id ? (
                  <input
                    type="text"
                    value={member.age}
                    onChange={(e) =>
                      handleInputChange(member.id, "age", e.target.value)
                    }
                  />
                ) : (
                  member.age
                )}
              </td>

              <td>
                {editingId === member.id ? (
                  <input
                    type="text"
                    value={member.gender}
                    onChange={(e) =>
                      handleInputChange(member.id, "gender", e.target.value)
                    }
                  />
                ) : (
                  member.gender
                )}
              </td>

              <td>
                {editingId === member.id ? (
                  <input
                    type="text"
                    value={member.relationship}
                    onChange={(e) =>
                      handleInputChange(
                        member.id,
                        "relationship",
                        e.target.value
                      )
                    }
                  />
                ) : (
                  member.relationship
                )}
              </td>

              {editingId !== member.id ? (
                <tr>
                  <td>
                    <button onClick={() => handleDelete(member.id)}>
                      Delete
                    </button>
                  </td>
                  <td>
                    <button onClick={() => handleEdit(member.id)}>
                      Update
                    </button>
                  </td>{" "}
                </tr>
              ) : (
                <tr>
                  <td>
                    <button onClick={() => handleCancel(member.id)}>
                      Cancel
                    </button>
                  </td>
                  <td>
                    <button onClick={() => handleSave(member.id)}>
                      Confirm
                    </button>
                  </td>{" "}
                </tr>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DeleteFamilyMember;
