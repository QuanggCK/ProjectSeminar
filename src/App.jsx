import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import CoursePage from "./pages/CoursePage";
import LessonPage from "./pages/LessonPage";
import VisualizationPage from "./pages/VisualizationPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>

<Route path="/" element={<VisualizationPage />} />
        <Route path="/course/:lang" element={<CoursePage />} />

        <Route path="/lesson/:lang/:id" element={<LessonPage />} />

        <Route path="/visualization/:name" element={<VisualizationPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;