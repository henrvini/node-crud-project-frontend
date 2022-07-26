import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../components/index.css";

import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import Nav from "../../components/nav/Nav";
import Main from "../../components/main/Main";
import Footer from "../../components/footer/Footer";
import api from "../../services/api";
import AllInboxIcon from "@mui/icons-material/AllInbox";
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
  icon: <AllInboxIcon />,
  title: "Modules",
};

function CourseModulesDetails() {
  const [courseModules, setCourseModules] = useState([]);
  const { course_id } = useParams();

  useEffect(() => {
    async function loadCourseModules() {
      const res = await api.get(`/courseModules/${course_id}`);

      setCourseModules(res.data);
    }
    loadCourseModules();
    // eslint-disable-next-line
  }, []);

  function handleRegister() {
    window.location.href = `/courseModules/${course_id}/register`;
  }

  function redirectUpdate(module_id) {
    window.location.href = `/courseModules/${course_id}/${module_id}`;
  }

  function redirectDetails(module_id) {
    window.location.href = `/contents/${module_id}`;
  }

  async function handleDelete(id) {
    confirmAlert({
      title: "Attention!",
      message: "Are you sure you want to delete the course?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            let result = await api.delete(`/courseModules/${id}`);
            if (result.status === 200) {
              window.location.href = `/courseModules/${course_id}`;
            } else {
              alert("Could not delete the course!");
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
                <TableCell align="left">Created at</TableCell>
                <TableCell align="center">Options</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {courseModules.map((row) => (
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
                      color="primary"
                      onClick={() => redirectDetails(row.id)}
                    >
                      Details
                    </Button>
                    &nbsp;
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

export default CourseModulesDetails;
