const express = require("express");
const router = express.Router();
const familyMembersController = require("../controllers/familyController");

// Define your routes
router.get("/family-members", familyMembersController.findAll);
router.post("/family-members", familyMembersController.AddFamilyMember);
router.put("/family-members/:id", familyMembersController.updateFamilyMember);
router.delete(
  "/family-members/:id",
  familyMembersController.deleteFamilyMember
);

module.exports = router;
