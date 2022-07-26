import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/home";

import Users from "./pages/users/index";
import UserRegister from "./pages/users/userRegister";
import UserUpdate from "./pages/users/userUpdate";

import Courses from "./pages/courses/index";
import CourseRegister from "./pages/courses/courseRegister";
import CourseUpdate from "./pages/courses/courseUpdate";

import CourseModules from "./pages/courseModules/index";
import AllCourseModules from "./pages/courseModules/allCourseModules";
import CourseModuleUpdate from "./pages/courseModules/courseModuleUpdate";
import CourseModuleRegister from "./pages/courseModules/courseModuleRegister";

import Contents from "./pages/contents/index";
import AllContents from "./pages/contents/allContents";
import ContentUpdate from "./pages/contents/contentUpdate";
import ContentRegister from "./pages/contents/contentRegister";

function AppRoutes() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />

          {/* USERS ROUTES */}
          <Route path="/users" element={<Users />} />
          <Route path="/users/register" element={<UserRegister />} />
          <Route path="/users/update/:user_id" element={<UserUpdate />} />

          {/* COURSES ROUTES */}
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/register" element={<CourseRegister />} />
          <Route path="/courses/update/:course_id" element={<CourseUpdate />} />

          {/* MODULES ROUTES */}
          <Route path="/allCourseModules" element={<AllCourseModules />} />
          <Route path="/courseModules/:course_id" element={<CourseModules />} />
          <Route
            path="/courseModules/:course_id/register"
            element={<CourseModuleRegister />}
          />
          <Route
            path="/courseModules/:course_id/:module_id"
            element={<CourseModuleUpdate />}
          />

          {/* CONTENTS ROUTES */}
          <Route path="/allContents" element={<AllContents />} />
          <Route path="/contents/:module_id" element={<Contents />} />
          <Route
            path="/contents/:module_id/register"
            element={<ContentRegister />}
          />
          <Route
            path="/contents/:module_id/:content_id"
            element={<ContentUpdate />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default AppRoutes;
