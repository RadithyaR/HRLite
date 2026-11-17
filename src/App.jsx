import { BrowserRouter, Navigate, useRoutes } from "react-router-dom";
import { employeeRoutes } from "./pages/EmployeePage";
import MainLayout from "./components/layout/MainLayout";
import { Toaster } from "@/components/ui/sonner";
import { dashboardRoutes } from "./pages/DashboardPage";

const routes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/employee" replace />,
      },
      ...employeeRoutes,
      ...dashboardRoutes,
    ],
  },
];

function AppRoutes() {
  return useRoutes(routes);
}
function App() {
  return (
    <BrowserRouter>
      <AppRoutes />

      <Toaster position="top-right" richColors closeButton />
    </BrowserRouter>
  );
}

export default App;
