import React, { useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";

import Main from "../../components/main/Main";
import Nav from "../../components/nav/Nav";
import Footer from "../../components/footer/Footer";
import { Button, Grid, TextField } from "@mui/material";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";

const headerProps = {
  icon: <ContentPasteIcon />,
  title: "Content Register",
};

function ContentRegister() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { module_id } = useParams();
  const status = false;

  async function handleSubmit() {
    const data = {
      module_id,
      title,
      content,
      status,
    };

    if (module_id !== "" && title !== "" && content !== "") {
      const res = await api.post("/contents/register", data);

      if (res.status === 200) {
        window.location.href = `/contents/${module_id}`;
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
                id="content"
                name="content"
                label="Content"
                value={content}
                fullWidth
                variant="standard"
                onChange={(e) => setContent(e.target.value)}
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

export default ContentRegister;
