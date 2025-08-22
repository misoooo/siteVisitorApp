
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';
import { UserCircle2, PlusCircle } from 'lucide-react';

export function AgentNameSelect() {
  //const [agents] = useState(['Alice', 'Bob' , 'Cera' , 'Dan']);
   const [agents, setAgents] = useState([]);
  const [selected, setSelected] = useState('');
  const [newAgent, setNewAgent] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
  axios.get("http://localhost:5000/api/agents")
    .then(res => {
      setAgents(res.data);
    })
    .catch(err => {
      console.error("Error fetching agents:", err);
    });
}, []);

  const handleSubmit = () => {
    if (!selected || (selected === 'notfound' && newAgent.trim() === '')) {
      toast.error('Please select or enter a name');
      return;
    }

    const agentName = selected === 'notfound' ? newAgent.trim() : selected;
    localStorage.setItem('agent', agentName);
    toast.success(`Welcome ${agentName}!`);

    // setTimeout(() => {
      navigate('/agent/site');
    // }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 px-4">
      <Toaster position="top-center" />
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">Select Your Name</h2>

        <div className="grid grid-cols-2 gap-4 mb-6">
          {agents.length > 0 ? agents.map((name) => (
            <motion.div
              key={name}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center space-x-3 p-3 rounded-xl border shadow-sm cursor-pointer transition-all hover:shadow-md ${
                selected === name ? 'bg-purple-100 border-purple-500' : 'bg-white'
              }`}
              onClick={() => setSelected(name)}
            >
              <UserCircle2 size={36} className="text-purple-500" />
              <span className="font-medium text-gray-700">{name}</span>
            </motion.div>
          )): <p className="text-gray-500 col-span-2">No agents found</p>}

          <motion.div
            whileTap={{ scale: 0.95 }}
            className={`flex items-center space-x-3 p-3 rounded-xl border-2 border-dashed cursor-pointer transition-all hover:shadow-md ${
              selected === 'notfound' ? 'bg-red-100 border-red-500' : 'bg-white'
            }`}
            onClick={() => setSelected('notfound')}
          >
            <PlusCircle size={36} className="text-red-500" />
            <span className="text-red-600 font-medium">Name not listed</span>
          </motion.div>
        </div>

        <AnimatePresence>
          {selected === 'notfound' && (
            <motion.input
              key="new-agent-input"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="w-full p-2 border rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-red-400"
              placeholder="Enter your name"
              value={newAgent}
              onChange={(e) => setNewAgent(e.target.value)}
            />
          )}
        </AnimatePresence>

        <button
          className="w-full bg-purple-600 text-white py-2 rounded-xl hover:bg-purple-700 transition"
          onClick={handleSubmit}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
