import DeleteFamilyMember from "./components/DeleteFamilyMember";

import FamilyMembers from "./components/FamilyMembers";
import Header from "./components/Header";
import UpdateFamilyMember from "./components/UpdateFamilyMember";

function App() {
  return (
    <div>
      <Header />

      <br />
      <h1>Add and Delete Family Member</h1>
      <DeleteFamilyMember />
      <br />
    </div>
  );
}

export default App;
