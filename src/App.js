import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SurveyPage from "./pages/SurveyPage";
import ThankYouPage from "./pages/ThankYouPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SurveyPage />} />
        <Route path="/thank-you" element={<ThankYouPage />} />
      </Routes>
    </Router>
  );
}

export default App;
