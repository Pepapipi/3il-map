import "./App.css";
import MapPage from "./MapPage";
import FormPage from "./formPage";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';



function App() {

  return (
    <Router>
      <div>
        
        <Routes>
          <Route path="/" element={<MapPage />} />
          <Route path="/form" element={<FormPage />} />
        </Routes>
      </div>
    </Router>
  );
    
}

export default App;
