import React, { useEffect, useState } from "react";
import "../../components/index.css";

import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import Nav from "../../components/nav/Nav";
import Main from "../../components/main/Main";
import Footer from "../../components/footer/Footer";
import api from "../../services/api";
import SchoolIcon from "@mui/icons-material/School";
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
  icon: <SchoolIcon />,
  title: "Courses",
};

function CoursesDetails() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    async function loadCourses() {
      const res = await api.get("/courses");

      setCourses(res.data);
    }
    loadCourses();
  }, []);

  function redirectUpdate(id) {
    window.location.href = `/courses/update/${id}`;
  }

  function redirectDetails(id) {
    window.location.href = `/courseModules/${id}`;
  }

  async function handleDelete(id) {
    confirmAlert({
      title: "Attention!",
      message: "Are you sure you want to delete the course?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            let result = await api.delete(`courses/${id}`);
            if (result.status === 200) {
              window.location.href = "/courses";
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
                <TableCell align="left">Unique Code</TableCell>
                <TableCell align="left">Created at</TableCell>
                <TableCell align="center">Options</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {courses.map((row) => (
                <TableRow key={row.id}>
                  <TableCell align="left">{row.title}</TableCell>
                  <TableCell align="left">{row.description}</TableCell>
                  <TableCell align="left">{row.unique_code}</TableCell>
                  <TableCell align="left">
                    {new Date(row.createdAt).toLocaleString("pt-br")}
                  </TableCell>

                  <TableCell align="center" className="buttons">
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
          href="/courses/register"
        >
          <AddIcon />
          Register
        </Button>
      </Main>
      <Footer />
    </>
  );
}

export default CoursesDetails;
