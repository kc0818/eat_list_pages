import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EatListPage from "./pages/EatListPage";
import SurveyPage from "./pages/SurveyPage";

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<EatListPage />} />
        <Route path="/survey" element={<SurveyPage />} />
      </Routes>
    </Router>
  );
}

export default App;
