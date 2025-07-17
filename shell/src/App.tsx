import React, { Suspense, useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from "./components/Sidebar";
import Login from "./pages/Login";

const SupportTicketsApp = React.lazy(() => import('support_tickets/App'));

type Screen = {
  name: string;
  path: string;
};

export default function App() {
  const [screens, setScreens] = useState<Screen[]>([]);
  const [isLoggedIn, setLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    setLoggedIn(true);
    axios.get(`${import.meta.env.VITE_API_URL}/api/me/screens`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then(res => setScreens(res.data.screens));
  }, []);

  if (!isLoggedIn) return <Login onLogin={() => window.location.reload()} />;

  return (
    <BrowserRouter>
      <Sidebar screens={screens} />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {screens.some(screen => screen.name === 'SupportTicketsApp') && (
            <Route path="/support" element={<SupportTicketsApp />} />
          )}
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
