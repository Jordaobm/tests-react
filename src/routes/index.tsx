import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { UserContextProvider } from "../context/user";
import { Home } from "../pages/Home/Home";

export function App() {
  return (
    <UserContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/history" element={<Home />} />
        </Routes>
      </Router>
    </UserContextProvider>
  );
}
