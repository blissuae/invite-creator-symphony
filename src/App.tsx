
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import AnimationStyles from "./pages/AnimationStyles";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/animation-styles" element={<AnimationStyles />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
