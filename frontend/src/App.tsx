import { Routes, Route } from "react-router-dom";
import EventPage from "./pages/Event";

function App() {
  return (
    <Routes>
      <Route path="/webapp" element={<EventPage />} />
    </Routes>
  );
}

export default App;
