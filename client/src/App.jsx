import { Routes, Route } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { AgentNameSelect } from './pages/agent/AgentNameSelect';
import { SiteSelect } from './pages/agent/SiteSelect';
import { VisitForm } from './pages/agent/SiteForm';
import { ManagerHome } from './pages/manager/Dashboard';
import { ManagerDashboard } from './pages/manager/AgentStats';

export default function App() {
return (
<Routes>
<Route path="/" element={<LoginPage />} />
<Route path="/agent/name" element={<AgentNameSelect />} />
<Route path="/agent/site" element={<SiteSelect />} />
<Route path="/agent/form" element={<VisitForm />} />
<Route path="/manager/dashboard" element={<ManagerHome />} />
<Route path="/manager/AgentStats" element={<ManagerDashboard />}/>
</Routes>
);
}