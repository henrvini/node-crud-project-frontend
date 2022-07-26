import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../components/index.css";

import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import Nav from "../../components/nav/Nav";
import Main from "../../components/main/Main";
import Footer from "../../components/footer/Footer";
import api from "../../services/api";
import RecommendIcon from "@mui/icons-material/Recommend";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import AddIcon from "@mui/icons-material/Add";

import {
  Paper,
  TableCell,
  TableHead,
  TableRow,
  Table,
  TableContainer,
  TableBody,
  Button,
} from "@mui/material";

const headerProps = {
  icon: <ContentPasteIcon />,
  title: "Contents",
};

function Contents() {
  const [contents, setContents] = useState([]);
  const { module_id } = useParams();

  useEffect(() => {
    async function loadContents() {
      const res = await api.get(`/contents/${module_id}`);

      setContents(res.data);
    }
    loadContents();
    // eslint-disable-next-line
  }, []);

  function handleRegister() {
    window.location.href = `/contents/${module_id}/register`;
  }

  function redirectUpdate(content_id) {
    window.location.href = `/contents/${module_id}/${content_id}`;
  }

  async function handleSubmitStatus(data) {
    let newStatus = data.status;
    newStatus === false ? (newStatus = true) : (newStatus = false);

    const newData = {
      id: data.id,
      title: data.title,
      content: data.content,
      status: newStatus,
    };

    const res = await api.put("/contents/status", newData);

    res.status === 200
      ? (window.location.href = `/contents/${module_id}`)
      : alert("Failed");
  }

  async function handleDelete(content_id) {
    confirmAlert({
      title: "Attention!",
      message: "Are you sure you want to delete the content?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            let result = await api.delete(`/contents/${content_id}`);
            if (result.status === 200) {
              window.location.href = `/contents/${module_id}`;
            } else {
              alert("Could not delete the content!");
            }
          },
        },
        {
          label: "No",
          onClick: () => {
            /* */
          },
        },
      ],
    });
  }

  return (
    <>
      <Nav />
      <Main {...headerProps}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell align="left">Title</TableCell>
                <TableCell align="left">Description</TableCell>
                <TableCell align="left">Status</TableCell>
                <TableCell align="left">Created at</TableCell>
                <TableCell align="center">Options</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {contents.map((row) => (
                <TableRow key={row.id}>
                  <TableCell align="left">{row.title}</TableCell>
                  <TableCell align="left">{row.content}</TableCell>
                  {row.status ? (
                    <TableCell align="left">
                      <RecommendIcon onClick={() => handleSubmitStatus(row)} />
                    </TableCell>
                  ) : (
                    <TableCell align="left">
                      <HighlightOffIcon
                        onClick={() => handleSubmitStatus(row)}
                      />
                    </TableCell>
                  )}
                  <TableCell align="left">
                    {new Date(row.createdAt).toLocaleString("pt-br")}
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      className="button"
                      variant="contained"
                      color="warning"
                      onClick={() => redirectUpdate(row.id)}
                    >
                      Update
                    </Button>
                    &nbsp;
                    <Button
                      className="button"
                      variant="contained"
                      color="error"
                      onClick={() => handleDelete(row.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Button
          style={{ marginTop: 10, marginLeft: 10 }}
          variant="contained"
          color="primary"
          onClick={() => handleRegister()}
        >
          <AddIcon />
          Register
        </Button>
      </Main>
      <Footer />
    </>
  );
}

export default Contents;
