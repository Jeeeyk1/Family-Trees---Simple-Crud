const dbConn = require("../configuration/db");

const tableName = "familymembers";
const findAll = async (req, res) => {
  dbConn.query(`SELECT * FROM ${tableName};`, (err, data) => {
    if (err) {
      req.status(500).json(err);
    } else {
      res.json({ data });
    }
  });
};

const AddFamilyMember = async (req, res) => {
  const { name, age, gender, relationship } = req.body;

  if (name.length <= 2) {
    res.json({ message: "Please enter a valid name" });
  } else {
    dbConn.query(
      `INSERT INTO ${tableName} (name, age, gender, relationship) VALUES ("${name}", ${age}, "${gender}", "${relationship}");`
    );
    res.json({ name, age, gender, relationship });
  }
};
const deleteFamilyMember = async (req, res) => {
  const id = req.params.id;

  if (id == null) {
    res.json({ message: "Please enter a valid name" });
  } else {
    dbConn.query(`DELETE from ${tableName} where id = ${id};`);
    res.json({ message: `ID WITH NO ${id} IS SUCCESSFULLY DELETED` });
  }
};

const updateFamilyMember = async (req, res) => {
  const id = req.params.id;
  const { name, age, gender, relationship } = req.body;
  if (id == null) {
    res.json({ message: "Please enter a valid name" });
  } else {
    dbConn.query(
      `UPDATE ${tableName} SET name = "${name}", age = ${age}, gender = "${gender}", relationship = "${relationship}" where id = ${id};`
    );
    res.json({ message: `ID WITH ${id} IS SUCCESSFULLY UPDATED` });
  }
};

// const create = async (req, res) => {
//   try {
//     const { name, age, gender, relationship } = req.body;
//     const id = await FamilyMember.create(name, age, gender, relationship);
//     res.json({ id });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// const update = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { name, age, gender, relationship } = req.body;
//     const result = await FamilyMember.update(
//       id,
//       name,
//       age,
//       gender,
//       relationship
//     );
//     if (result) {
//       res.status(204).end();
//     } else {
//       res.status(404).json({ message: "Family member not found" });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// const remove = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const result = await FamilyMember.delete(id);
//     if (result) {
//       res.status(204).end();
//     } else {
//       res.status(404).json({ message: "Family member not found" });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal server error" });
//   }

module.exports = {
  findAll,
  AddFamilyMember,
  deleteFamilyMember,
  updateFamilyMember,
  // remove,
};
