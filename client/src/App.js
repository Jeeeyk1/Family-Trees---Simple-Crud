import AddFamilyMember from "./components/AddFamilyMember";
import Add from "./components/AddFamilyMember";
import DeleteFamilyMember from "./components/DeleteFamilyMember";
import Display from "./components/Display";
import FamilyMembers from "./components/FamilyMembers";
import Header from "./components/Header";

function App() {
  return (
    <div>
      <FamilyMembers />
      <br />
      <h1>Add and Delete Family Member</h1>
      <DeleteFamilyMember />
    </div>
  );
}

export default App;
