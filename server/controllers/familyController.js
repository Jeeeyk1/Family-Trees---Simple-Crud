const FamilyMember = require("../models/familyModel");

exports.getFamilyMembers = async (req, res) => {
  const familyMembers = await FamilyMember.findAll();
  res.json(familyMembers);
};

exports.getFamilyMember = async (req, res) => {
  const { id } = req.params;
  const familyMember = await FamilyMember.findByPk(id);
  if (!familyMember) {
    return res.status(404).json({ error: "Family member not found" });
  }
  res.json(familyMember);
};

exports.createFamilyMember = async (req, res) => {
  const { name, age, gender, relationship } = req.body;
  const familyMember = await FamilyMember.create({
    name,
    age,
    gender,
    relationship,
  });
  res.json({ message: "Family member created!", id: familyMember.id });
};

exports.updateFamilyMember = async (req, res) => {
  const { id } = req.params;
  const { name, age, gender, relationship } = req.body;
  const familyMember = await FamilyMember.findByPk(id);
  if (!familyMember) {
    return res.status(404).json({ error: "Family member not found" });
  }
  familyMember.name = name;
  familyMember.age = age;
  familyMember.gender = gender;
  familyMember.relationship = relationship;
  await familyMember.save();
  res.json({ message: `Family member with id ${id} updated!` });
};

exports.deleteFamilyMember = async (req, res) => {
  const { id } = req.params;
  const familyMember = await FamilyMember.findByPk(id);
  if (!familyMember) {
    return res.status(404).json({ error: "Family member not found" });
  }
  await familyMember.destroy();
  res.json({ message: `Family member with id ${id} deleted!` });
};
