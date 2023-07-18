import "./App.css";
import { useState } from "react";

import NewUser from "./components/NewUser";
import Alluser from "./components/AllUsers";

const button = {
  padding: "10px 15px",
  backgroundColor: "	#008080",
  color: "white",

  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  position: "absolute",
  top: "75vh",
  right: "48vw",
};

const App = () => {
  const [allUser, setAllusers] = useState(true);

  return (
    <div>
      {allUser ? <Alluser /> : <NewUser />}
      <button style={button} onClick={() => setAllusers(!allUser)}>
        {allUser ? "Create User" : "All Users"}
      </button>
    </div>
  );
};

export default App;
