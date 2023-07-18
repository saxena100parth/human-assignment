import { useEffect, useState } from "react";

const AllUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    console.log(users);
  }, [users]);

  const fetchUsers = async () => {
    const response = await fetch("http://localhost:4000/users");
    const data = await response.json();
    setUsers(data.users);
    // console.log(data.users);
  };
  return (
    <div>
      <div>
        <h1 style={h1Style}>All Users</h1>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Email</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => (
              <tr key={user._id}>
                <td style={tdStyle}>{user.name}</td>
                <td style={tdStyle}>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

//  CSS styles
const h1Style = {
  textAlign: "center",
  marginTop: "80px",
  fontFamily: "Arial, sans-serif",
  color: "	#008080",
};

const tableStyle = {
  fontFamily: "Arial, sans-serif",
  borderCollapse: "collapse",
  width: "50%",
  marginTop: "40px",
  marginLeft: "25%",
};

const thStyle = {
  backgroundColor: "Cyan",
  padding: "10px",
  textAlign: "left",
};

const tdStyle = {
  border: "1px solid white ",
  backgroundColor: " LightBlue",
  padding: "8px",
  textAlign: "left",
};

export default AllUsers;
