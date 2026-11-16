import { BrowserRouter, Navigate, useRoutes } from "react-router-dom";
import { employeeRoutes } from "./pages/EmployeePage";
import { Children, Suspense } from "react";
import MainLayout from "./components/layout/MainLayout";

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
    ],
  },
];

function AppRoutes() {
  return useRoutes(routes);
}
function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<p>Loading...</p>}>
        <AppRoutes />
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
