import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";

import Main from "../../components/main/Main";
import Nav from "../../components/nav/Nav";
import Footer from "../../components/footer/Footer";
import { Button, Grid, TextField } from "@mui/material";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";

const headerProps = {
  icon: <ContentPasteIcon />,
  title: "Content Update",
};

function ContentUpdate() {
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState(false);
  const { module_id, content_id } = useParams();

  useEffect(() => {
    async function getModule() {
      const res = await api.get(`/contents/details/${content_id}`);

      setId(res.data.id);
      setTitle(res.data.title);
      setContent(res.data.content);
      setStatus(res.data.status);
    }
    getModule();
    // eslint-disable-next-line
  }, []);

  async function handleSubmit() {
    const data = {
      id,
      title,
      content,
      status,
      content_id,
    };

    if (title !== "" && content !== "") {
      const res = await api.put("/contents", data);

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
              Update
            </Button>
          </div>
        </div>
      </Main>
      <Footer />
    </>
  );
}

export default ContentUpdate;
