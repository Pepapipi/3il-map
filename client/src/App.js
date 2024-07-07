import "./App.css";
import MapPage from "./MapPage";
import Entete from "./entete";
import FormPage from "./formPage";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginForm from "./loginForm";


function App() {

  return (
    <Router>
      <div>
        <Entete />
        <Routes>
          <Route path="/" element={<MapPage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/form" element={<FormPage />} />
          <Route path="/form/:id" element={<FormPage />} />
        </Routes>
      </div>
    </Router>
  );
    
}

export default App;
