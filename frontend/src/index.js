import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // Global styles
import App from './App'; // Main App Component
import { BrowserRouter as Router } from 'react-router-dom'; // React Router
import { AuthProvider } from './context/AuthContext'; // AuthContext for managing user state

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider> {/* Auth context to manage user authentication */}
      <Router> {/* Routing for different pages */}
        <App /> {/* Main App Component */}
      </Router>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root') // This will render the app in the root div of index.html
);
