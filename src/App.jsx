import './App.css';
import Footer from './components/footer.jsx';
import Navbar from './components/navbar.jsx';
import Home from './pages/Home.jsx';
import JoinRoom from './pages/JoinRoom.jsx';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from './pages/SignUp.jsx';
import Login from './pages/Login.jsx';
import Features from './pages/Features.jsx';
import Logout from './pages/Logout.jsx';
function App() {
  return (

    <BrowserRouter>
   
      <Navbar />
      <Routes >
        <Route path="/" element={<Home />} />
        <Route path="/room" element={<JoinRoom />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/features" element={<Features />} />
        <Route path="/features/chat" element={<Features />} />
        <Route path="/features/editor" element={<Features />} />
        <Route path="/features/runner" element={<Features />} />
        <Route path="/features/collaborators" element={<Features />} />
        <Route path="/features/setting" element={<Features />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
      <Footer />
   
          </BrowserRouter>
  );
}

export default App;
