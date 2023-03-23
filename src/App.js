import { useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

function App() {
  const navigate = useNavigate();
  const user = localStorage.getItem('USER');
  const location = useLocation();

  useEffect(() => {
    if (!location.pathname.includes('/login') && !user) {
      navigate("/login");
    }
  }, [location.pathname])
  return (
    <Outlet />
  );
}

export default App;
