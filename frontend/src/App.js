import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; // AuthContext for managing user state
import Navbar from './components/Navbar'; // Navbar Component
import Footer from './components/Footer'; // Footer Component

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import TestPage from './pages/TestPage';
import Results from './pages/Results';
import AdminPanel from './pages/AdminPanel';
import Payments from './pages/Payments';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar /> {/* Navbar to be displayed on every page */}
          
          <main>
            <Switch>
              {/* Routing for different pages */}
              <Route path="/" exact component={Home} />
              <Route path="/login" exact component={Login} />
              <Route path="/register" exact component={Register} />
              <Route path="/dashboard" exact component={Dashboard} />
              <Route path="/test/:testId" exact component={TestPage} />
              <Route path="/results" exact component={Results} />
              <Route path="/admin" exact component={AdminPanel} />
              <Route path="/payments" exact component={Payments} />
            </Switch>
          </main>

          <Footer /> {/* Footer to be displayed on every page */}
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
import React from "react";
import UploadVocabulary from "./components/UploadVocabulary";

function App() {
  return (
    <div>
      <h1>Admin Panel</h1>
      <UploadVocabulary />
    </div>
  );
}

export default App;
import React from "react";
import DailyVocabulary from "./components/DailyVocabulary";

function App() {
  return (
    <div>
      <h1>Student Portal</h1>
      <DailyVocabulary />
    </div>
  );
}

export default App;
import React from "react";
import DailyVocabulary from "./components/DailyVocabulary";

function App() {
  return (
    <div>
      <h1>Student Portal</h1>
      <DailyVocabulary />
    </div>
  );
}

export default App;
import React from "react";
import DailyEditorial from "./components/DailyEditorial";

function App() {
  return (
    <div>
      <h1>Student Portal</h1>
      <DailyEditorial />
    </div>
  );
}

export default App;
import React from "react";
import DailyMathsQuestions from "./components/DailyMathsQuestions";

function App() {
  return (
    <div>
      <h1>Student Portal</h1>
      <DailyMathsQuestions />
    </div>
  );
}

export default App;
import React from "react";
import TypingTest from "./components/TypingTest";
import TypingResults from "./components/TypingResults";

function App() {
  return (
    <div>
      <h1>Typing Test</h1>
      <TypingTest />
      <TypingResults />
    </div>
  );
}

export default App;
import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DailyVocabulary from "./pages/DailyVocabulary";
import LoginPage from "./pages/LoginPage";
import { useAuth } from "./context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/daily-vocabulary" element={<PrivateRoute><DailyVocabulary /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
