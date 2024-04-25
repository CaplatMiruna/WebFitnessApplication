import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import User from './User';
import Home from './Home';
import Result from './Result';
import NavBar from './NavBar';

function App() {
  return (
    <Router>
      
      <div><NavBar/>
        <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/user" element={<User />} />
          <Route path="/result" element={<Result />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
