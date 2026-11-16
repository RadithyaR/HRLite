import React, { lazy } from "react";

const EmployeeList = lazy(() => import("@/features/employee/components/index"));
const EmployeeDetail = lazy(
  () => import("@/features/employee/components/EmployeeDetail"),
);

export const employeeRoutes = [
  {
    path: "/employee",
    element: <EmployeeList />,
  },
  {
    path: "/employee/:id",
    element: <EmployeeDetail />,
  },
];
