import { useState } from "react";

const NewUser = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:4000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    alert(data.message);
    // console.log(data);
    e.target.reset();
  };
  return (
    <>
      <h1 style={styles.h1Style}>New User</h1>
      <div style={styles.container}>
        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              style={styles.input}
            />
          </label>
          <br />
          <label style={styles.label}>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={styles.input}
            />
          </label>
          <br />
          <label style={styles.label}>
            Password:
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              style={styles.input}
            />
          </label>
          <br />
          <button type="submit" style={styles.button}>
            Create User
          </button>
        </form>
      </div>
    </>
  );
};

// CSS

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "50vh",
  },
  h1Style: {
    textAlign: "center",
    marginTop: "80px",
    fontFamily: "Arial, sans-serif",
    color: "	#008080",
  },
  form: {
    border: "1px solid 	#008080",
    padding: "20px",
    borderRadius: "5px",
    backgroundColor: "#AFEEEE",
  },
  label: {
    display: "block",
    marginBottom: "10px",
  },
  input: {
    padding: "8px",
    width: "90%",
    marginBottom: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px 15px",
    backgroundColor: "Cyan",
    border: "1px solid black",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default NewUser;
