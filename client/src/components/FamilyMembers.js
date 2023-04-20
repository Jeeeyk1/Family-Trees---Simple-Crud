import React, { useState, useEffect } from "react";
import axios, { Axios } from "axios";

const FamilyMembers = () => {
  const [familyMembers, setFamilyMembers] = useState([]);
  const fam = [
    { id: 1, name: "Jake", age: 21, gender: "male", relationship: "sibling" },
  ];
  useEffect(() => {
    axios.get("http://localhost:3002/family-members").then((res) => {
      console.log(res.data.data);
      setFamilyMembers(res.data.data);
    });
    console.log("family " + familyMembers);
  }, []);
  const deleteHandler = (e) => {
    console.log("deleteing " + e);
    axios
      .delete(`http://localhost:3002/family-members/${e}`)
      .then((response) => {
        setFamilyMembers(familyMembers.filter((fam) => fam.id !== e));
      });
  };
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
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {familyMembers.map((fam) => (
            <tr>
              {" "}
              <td>{fam.name}</td>
              <td>{fam.age}</td>
              <td>{fam.gender}</td>
              <td>{fam.relationship}</td>
              <td>
                <button onClick={() => deleteHandler(fam.id)}>X</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FamilyMembers;
