import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";

import Main from "../../components/main/Main";
import Nav from "../../components/nav/Nav";
import Footer from "../../components/footer/Footer";
import { Button, Grid, TextField } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

const headerProps = {
  icon: <PersonIcon />,
  title: "User Update",
};

function UserUpdate() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [updated_at, setUpdated_at] = useState("");

  const { user_id } = useParams();

  useEffect(() => {
    async function getUser() {
      const res = await api.get(`/users/${user_id}`);

      setName(res.data.name);
      setEmail(res.data.email);
      setUpdated_at(new Date());
    }
    getUser();
    // eslint-disable-next-line
  }, []);

  async function handleSubmit() {
    const data = {
      name,
      email,
      updated_at,
      user_id,
    };

    if (name !== "" && email !== "" && updated_at !== "") {
      const res = await api.put("/users", data);

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
              Update
            </Button>
          </div>
        </div>
      </Main>
      <Footer />
    </>
  );
}

export default UserUpdate;
