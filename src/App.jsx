import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/DashBoard';
import { ToastContainer } from 'react-toastify';
import { RBACProvider } from './context/RBACContext';

const App = () => {
  
console.log(RBACProvider); // If this logs `undefined`, the import failed
  return (
    <RBACProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <header className="bg-black text-white p-4">
            <h1 className="text-center text-xl font-bold">RBAC System</h1>
            <ToastContainer
        position="top-center" // Positioning to top-center
        autoClose={3000} // Auto close after 3 seconds
        hideProgressBar={true} // Hide progress bar
        newestOnTop={false} // Toasts show in the order they are triggered
        closeOnClick={true} // Toast closes when clicked
        rtl={false} // Right to left support
        pauseOnFocusLoss={false} // Do not pause on focus loss
        draggable={false} // Disable dragging
        pauseOnHover={false} // Do not pause when hovering
        theme="dark" // You can use 'light' or 'dark'
      />
          </header>
          <main className="p-6">
            <Routes>
              <Route path="/" element={<Dashboard />} />
            </Routes>
          </main>
        </div>
      </Router>
    </RBACProvider>
  );
};

export default App;
