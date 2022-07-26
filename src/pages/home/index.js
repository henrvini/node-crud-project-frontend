import React from "react";

import Nav from "../../components/nav/Nav";
import Main from "../../components/main/Main";
import Footer from "../../components/footer/Footer";

import HomeIcon from "@mui/icons-material/Home";

const headerProps = {
  icon: <HomeIcon />,
  title: "Home",
  subtitle: "Welcome",
};

function Home() {
  return (
    <>
      <Nav />
      <Main {...headerProps}></Main>
      <Footer />
    </>
  );
}

export default Home;
