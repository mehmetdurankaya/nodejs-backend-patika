import "./App.css";
import { Routes, Route } from "react-router";
import Events from "./pages/Events";
import EventDetail from "./pages/EventDetail";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route index element={<Events />} />
        <Route path="eventDetail/:id" element={<EventDetail />} />
      </Routes>
    </div>
  );
}

export default App;
