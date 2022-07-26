import React, { useEffect, useState } from "react";

import Nav from "../../components/nav/Nav";
import Main from "../../components/main/Main";
import Footer from "../../components/footer/Footer";
import api from "../../services/api";

import PersonIcon from "@mui/icons-material/Person";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

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
import { confirmAlert } from "react-confirm-alert";

const headerProps = {
  icon: <PersonIcon />,
  title: "Users",
};

function UsersDetails() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function loadUsers() {
      const res = await api.get("/users");
      setUsers(res.data);
    }
    loadUsers();
  }, []);

  async function handleDelete(id) {
    confirmAlert({
      title: "Attention!",
      message: "Are you sure you want to delete the course?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            let result = await api.delete(`users/${id}`);
            if (result.status === 200) {
              window.location.href = "/users";
            } else {
              alert("Could not delete the user!");
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

  function redirectUpdate(id) {
    window.location.href = `/users/update/${id}`;
  }

  return (
    <>
      <Nav />
      <Main {...headerProps}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell align="left">Name</TableCell>
                <TableCell align="left">E-mail</TableCell>
                <TableCell align="left">Created at</TableCell>
                <TableCell align="center">Options</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((row) => (
                <TableRow key={row.id}>
                  <TableCell align="left">{row.name}</TableCell>
                  <TableCell align="left">{row.email}</TableCell>
                  <TableCell align="left">
                    {new Date(row.createdAt).toLocaleString("pt-br")}
                  </TableCell>

                  <TableCell align="center">
                    <Button
                      variant="contained"
                      color="warning"
                      onClick={() => redirectUpdate(row.id)}
                    >
                      Update
                    </Button>
                    &nbsp;
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => {
                        handleDelete(row.id);
                      }}
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
          href="/users/register"
        >
          <PersonAddIcon />
          Register
        </Button>
      </Main>
      <Footer />
    </>
  );
}

export default UsersDetails;
