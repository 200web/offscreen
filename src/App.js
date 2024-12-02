import React from "react";
import appStyles from "./scss/app.module.scss";
import HomePage from "./pages/HomePage";
import { Routes, Route, useLocation } from "react-router-dom";
import ContactPage from "./pages/ContactPage";
import ProjectPage from "./pages/ProjectPage";
import PersonPage from "./pages/PersonPage";
import NotFound from "./pages/NotFound";

function App() {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={appStyles.layout}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Contact" element={<ContactPage />} />
        <Route path="/project/:id" element={<ProjectPage />} />
        <Route path="/team/:id" element={<PersonPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
