import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { RBACProvider } from './context/RBACContext';
import Dashboard from './pages/Dashboard';

const App = () => {
  return (
    <RBACProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <header className="bg-black text-white p-4">
            <h1 className="text-center text-xl font-bold">RBAC System</h1>
            <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={true} 
        newestOnTop={false} 
        closeOnClick={true} 
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        theme="dark"
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
