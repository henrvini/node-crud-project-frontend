import React, { useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";

import Main from "../../components/main/Main";
import Nav from "../../components/nav/Nav";
import Footer from "../../components/footer/Footer";
import { Button, Grid, TextField } from "@mui/material";
import AllInboxIcon from "@mui/icons-material/AllInbox";

const headerProps = {
  icon: <AllInboxIcon />,
  title: "Module Register",
};

function CourseModuleRegister() {
  const [user_id, setUser_id] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { course_id } = useParams();

  async function handleSubmit() {
    const data = {
      course_id,
      user_id,
      title,
      description,
    };

    if (
      course_id !== "" &&
      user_id !== "" &&
      title !== "" &&
      description !== ""
    ) {
      const res = await api.post("/courseModules/register", data);

      if (res.status === 200) {
        window.location.href = `/courseModules/${course_id}`;
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
                id="title"
                name="title"
                label="Title"
                value={title}
                fullWidth
                variant="standard"
                onChange={(e) => setTitle(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="description"
                name="description"
                label="Description"
                value={description}
                fullWidth
                variant="standard"
                onChange={(e) => setDescription(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="user_id"
                name="user_id"
                label="User ID"
                value={user_id}
                fullWidth
                variant="standard"
                onChange={(e) => setUser_id(e.target.value)}
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

export default CourseModuleRegister;
