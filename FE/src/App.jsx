import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './login/login';
function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Danh sách người dùng</Link>
        <Link to="/add">Thêm người dùng</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/add" element={<AddUser />} />
      </Routes>
    </Router>
  );
}

export default App
