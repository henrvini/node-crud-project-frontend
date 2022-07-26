import React, { useEffect, useState } from "react";
import "../../components/index.css";

import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import Nav from "../../components/nav/Nav";
import Main from "../../components/main/Main";
import Footer from "../../components/footer/Footer";
import api from "../../services/api";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";

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
  title: "List Contents",
};

function AllContents() {
  const [allContents, setAllContents] = useState([]);

  useEffect(() => {
    async function loadAllContents() {
      const res = await api.get("/allContents");

      setAllContents(res.data);
    }
    loadAllContents();
    // eslint-disable-next-line
  }, []);

  async function redirectUpdate(content_id) {
    const courseModule = await api.get(`/contents/details/${content_id}`);
    if (courseModule.status === 200) {
      const module_id = courseModule.data.module_id;
      window.location.href = `/contents/${module_id}/${content_id}`;
    } else {
      alert("ERROR");
    }
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
              window.location.href = `/contents`;
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
          <Table sx={{ mindWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell align="left">Title</TableCell>
                <TableCell align="left">Description</TableCell>
                <TableCell align="left">Created at</TableCell>
                <TableCell align="center">Options</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allContents.map((row) => (
                <TableRow key={row.id}>
                  <TableCell align="left">{row.title}</TableCell>
                  <TableCell align="left">{row.description}</TableCell>
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
      </Main>
      <Footer />
    </>
  );
}

export default AllContents;
