import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";

function AppRoutes() {
  return (
            <Routes>
              {/* User side routes */}
              <Route element={<Layout />} >
                <Route path="/" element={<div>Home Page bla bla blaaaaaa</div>} />
              </Route>
            </Routes>

  );
}

export default AppRoutes;