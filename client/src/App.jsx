import { Routes, Route } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { AgentNameSelect } from './pages/agent/AgentNameSelect';
import { SiteSelect } from './pages/agent/SiteSelect';
import { VisitForm } from './pages/agent/SiteForm';
import { ManagerDashboard } from './pages/manager/Dashboard';

export default function App() {
return (
<Routes>
<Route path="/" element={<LoginPage />} />
<Route path="/agent/name" element={<AgentNameSelect />} />
<Route path="/agent/site" element={<SiteSelect />} />
<Route path="/agent/form" element={<VisitForm />} />
<Route path="/manager/dashboard" element={<ManagerDashboard />} />
</Routes>
);
}