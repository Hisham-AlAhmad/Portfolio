import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Home from "../components/Home";
import { ThemeProvider } from "../components/Hooks/ThemeProvider";
import About from "../components/About/About";

function AppRoutes() {
  return (
    <ThemeProvider>
      <Routes>
        {/* User side routes */}
        <Route element={<Layout />} >
          <Route path="/" element={<Home />} />
          <Route path="about" element={<About />} />
        </Route>
      </Routes>
    </ThemeProvider>

  );
}

export default AppRoutes;