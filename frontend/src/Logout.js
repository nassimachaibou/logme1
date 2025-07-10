import { useEffect } from 'react';

function Logout() {
  useEffect(() => {
    // Clear tokens
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');

    // Wait 1.5 seconds before redirecting
    const timeout = setTimeout(() => {
      window.location.href = '/';
    }, 1500);

    return () => clearTimeout(timeout);
  }, []);

  return <p>Logging out...</p>;
}

export default Logout;
