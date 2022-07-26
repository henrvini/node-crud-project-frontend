import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";

import Main from "../../components/main/Main";
import Nav from "../../components/nav/Nav";
import Footer from "../../components/footer/Footer";
import { Button, Grid, TextField } from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";

const headerProps = {
  icon: <SchoolIcon />,
  title: "Course Update",
};

function CourseUpdate() {
  const [id, setId] = useState("");
  const [unique_code, setUnique_code] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [user_id, setUser_id] = useState("");

  const { course_id } = useParams();

  useEffect(() => {
    async function getCourse() {
      const res = await api.get(`/courses/${course_id}`);

      setId(res.data.id);
      setUnique_code(res.data.unique_code);
      setTitle(res.data.title);
      setDescription(res.data.description);
      setUser_id(res.data.user_id);
    }
    getCourse();
    // eslint-disable-next-line
  }, []);

  async function handleSubmit() {
    const data = {
      id,
      unique_code,
      title,
      description,
      user_id,
    };

    if (
      unique_code !== "" &&
      title !== "" &&
      description !== "" &&
      user_id !== ""
    ) {
      const res = await api.put("/courses", data);

      if (res.status === 200) {
        window.location.href = "/courses";
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
                id="unique_code"
                name="unique_code"
                label="Unique Code"
                value={unique_code}
                fullWidth
                variant="standard"
                onChange={(e) => setUnique_code(e.target.value)}
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
              Update
            </Button>
          </div>
        </div>
      </Main>
      <Footer />
    </>
  );
}

export default CourseUpdate;
