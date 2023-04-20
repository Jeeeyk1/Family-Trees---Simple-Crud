import React, { useState, useEffect } from "react";
import axios from "axios";

const FamilyMembers = () => {
  const [familyMembers, setFamilyMembers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3002/family-members")
      .then((response) => setFamilyMembers(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <h1>Family Members</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Relationship</th>
          </tr>
        </thead>
        <tbody>
          {familyMembers.map((member) => (
            <tr key={member.id}>
              <td>{member.name}</td>
              <td>{member.age}</td>
              <td>{member.gender}</td>
              <td>{member.relationship}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FamilyMembers;
