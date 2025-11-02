
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { Layout } from './components/layout/Layout';
import { Login } from './components/auth/Login';
import { TestPage } from './components/TestPage';
import { Dashboard } from './components/dashboard/Dashboard';
import { Employees } from './components/pages/Employees';
import { Departments } from './components/pages/Departments';
import { Metrics } from './components/pages/Metrics';
import { Alerts } from './components/pages/Alerts';
import { Goals } from './components/pages/Goals';
import { Reports } from './components/pages/Reports';
import { SettingsPage } from './components/pages/Settings';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App" data-theme="zzz">
          <Routes>
            {/* Test route */}
            <Route path="/test" element={<TestPage />} />
            
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            
            {/* Protected routes */}
            <Route path="/" element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }>
              <Route index element={<Dashboard />} />
              <Route path="employees" element={<Employees />} />
              <Route path="departments" element={<Departments />} />
              <Route path="metrics" element={<Metrics />} />
              <Route path="alerts" element={<Alerts />} />
              <Route path="goals" element={<Goals />} />
              <Route path="reports" element={<Reports />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>
            
            {/* Redirect any other route to dashboard */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
