import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import HomePage from "./pages/home";

function App() {
  return (
    <>
      <div className="bg-gradient-to-b from-gray-800 via-gray-900 to-black h-screen">
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
