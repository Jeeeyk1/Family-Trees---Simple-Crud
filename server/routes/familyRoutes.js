const express = require("express");
const router = express.Router();
const familyMembersController = require("../controllers/familyController");

router.get("/family-members", familyMembersController.getFamilyMembers);
router.get("/family-members/:id", familyMembersController.getFamilyMember);
router.post("/family-members", familyMembersController.createFamilyMember);
router.put("/family-members/:id", familyMembersController.updateFamilyMember);
router.delete(
  "/family-members/:id",
  familyMembersController.deleteFamilyMember
);

module.exports = router;
