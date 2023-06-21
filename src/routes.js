import React from "react";

import { Icon } from "@chakra-ui/react";
import {
  MdBarChart,
  MdPerson,
  MdHome,
  MdLogout,
  MdInfo,
} from "react-icons/md";

// Admin Imports
import MainDashboard from "views/admin/default";
import Profile from "views/admin/profile";
import DataTables from "views/admin/dataTables";

// Auth Imports
import SignIn from "views/auth/signIn";
import SignUp from "views/auth/signUp";

const routes = [
  {
    name: "Main Dashboard",
    layout: "/admin",
    path: "/default",
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    component: MainDashboard,
  },
  {
    name: "Thông tin doanh nghiệp",
    layout: "/admin",
    path: "/bussiness-info",
    icon: (
      <Icon
        as={MdInfo}
        width="20px"
        height="20px"
        color="inherit"
      />
    ),
    component: DataTables,
    // secondary: true,
  },
  {
    name: "Thống kê",
    layout: "/admin",
    icon: <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />,
    path: "/statistic",
    component: DataTables,
  },
  {
    name: "Cá nhân",
    layout: "/admin",
    path: "/profile",
    icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
    component: Profile,
  },
  {
    name: "Đăng xuất",
    layout: "/auth",
    path: "/sign-in",
    icon: <Icon as={MdLogout} width="20px" height="20px" color="inherit" />,
    component: SignIn,
  },
  {
    name: "Đăng kí",
    layout: "/auth",
    path: "/sign-up",
    component: SignUp,
    hide: true,
  },
];

export default routes;
