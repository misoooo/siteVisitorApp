
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '', role: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = () => {
    // ✅ Hardcoded login validation
    const AgentEmail = 'agent@example.com';
    const AgentPassword = 'abc';

    const ManagerEmail = 'manager@example.com'
    const ManagerPassword = 'abcd';

    if (form.email === AgentEmail && form.password === AgentPassword) {
      if (form.role === 'Agent') {
        localStorage.setItem('agentRole', form.role); // optional if you want role stored
        navigate('/agent/name'); // ✅ Redirect to agent name selection page
      } else {
        toast.error('Please select a role');
      }
    } else if(form.email == ManagerEmail && form.password == ManagerPassword){
      if (form.role === 'Manager') {
        localStorage.setItem('managerRole', form.role); // optional if you want role stored
        navigate('manager/dashboard'); // or wherever managers should go
    }
  }
    else {
      toast.error('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-200 px-4">
      <ToastContainer position="top-center" />
      <div className="w-full max-w-md bg-white shadow-xl rounded-xl p-8">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Login</h1>
          <p className="text-sm text-gray-500 mt-1">Hi, Welcome back 👋</p>
        </div>

        <div className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            onChange={handleChange}
          />

          <div className="rounded-lg border border-gray-300 px-4 py-3">
            <p className="text-sm font-medium text-gray-700 mb-2">Select your Role</p>
            <div className="flex items-center gap-6 justify-center md:justify-start">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="role"
                  value="Agent"
                  className="form-radio text-indigo-600"
                  onChange={handleChange}
                />
                <span className="ml-2 text-sm text-gray-700">Agent</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="role"
                  value="Manager"
                  className="form-radio text-indigo-600"
                  onChange={handleChange}
                />
                <span className="ml-2 text-sm text-gray-700">Manager</span>
              </label>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg text-sm font-semibold transition"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
