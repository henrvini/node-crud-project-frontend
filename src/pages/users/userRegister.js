import React, { useState } from "react";
import api from "../../services/api";

import Main from "../../components/main/Main";
import Nav from "../../components/nav/Nav";
import Footer from "../../components/footer/Footer";
import { Button, Grid, TextField } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

const headerProps = {
  icon: <PersonIcon />,
  title: "User Register",
};

function UserRegister() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const status = true;

  async function handleSubmit() {
    const data = {
      name,
      email,
      status,
    };

    if (name !== "" && email !== "" && status !== "") {
      const res = await api.post("/users/register", data);

      if (res.status === 200) {
        window.location.href = "/users";
      } else {
        alert("Failed");
      }
    } else {
      alert("Insuficient information");
    }
  }

  return (
    <>
      <Nav />
      <Main {...headerProps}>
        <div style={{ padding: 10 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="name"
                name="name"
                label="Name"
                value={name}
                fullWidth
                variant="standard"
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="email"
                name="email"
                label="Email"
                value={email}
                fullWidth
                variant="standard"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
          </Grid>
          <hr />
          <div className="row">
            <Button variant="contained" color="success" onClick={handleSubmit}>
              Register
            </Button>
          </div>
        </div>
      </Main>
      <Footer />
    </>
  );
}

export default UserRegister;
