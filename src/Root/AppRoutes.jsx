import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Home from "../components/Home";

function AppRoutes() {
  return (
    <Routes>
      {/* User side routes */}
      <Route element={<Layout />} >
        <Route path="/" element={<Home />} />
      </Route>
    </Routes>

  );
}

export default AppRoutes;