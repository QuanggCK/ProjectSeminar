import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import CourseView from './components/CourseView';

function App() {
  const [user, setUser] = useState(null);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="/dashboard" /> : <Login onLogin={setUser} />}
        />
        <Route
          path="/dashboard"
          element={user ? <Dashboard user={user} onLogout={() => setUser(null)} /> : <Navigate to="/" />}
        />
        <Route
          path="/course/:lang"
          element={user ? <CourseView /> : <Navigate to="/" />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
