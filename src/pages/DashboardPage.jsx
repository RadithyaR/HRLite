import { lazy } from "react";

const Dashboard = lazy(() => import("@/features/dashboard/components/index"));

export const dashboardRoutes = [
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
];
