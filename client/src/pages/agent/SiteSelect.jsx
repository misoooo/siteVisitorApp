
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';
import { CheckCircle } from 'lucide-react';

export function SiteSelect() {
  const navigate = useNavigate();

  const siteList = [
    { name: 'Alpha Tower', address: '123 Alpha Street', area: 'North Zone', subArea: 'Sector A', name1: 'Annie', phone1: '987134', role1: 'Architect', name2: 'Ammy', phone2: '978675', role2: 'Supervisor', sqyd: '245' },
    { name: 'Beta Plaza', address: '456 Beta Avenue', area: 'East Zone', subArea: 'Sector B' },
    { name: 'Gamma House', address: '789 Gamma Lane', area: 'South Zone', subArea: 'Sector C' },
  ];


  //c0 se start , krte hain 

  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState('');
  const [dropdownVisible, setDropdownVisible] = useState(true);

  const filteredSites = siteList.filter((site) =>
    site.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (siteName) => {
    setSelected(siteName);
    setSearch(siteName);
    setDropdownVisible(false);
  };

  const handleNotFound = () => {
    setSelected('notfound');
    localStorage.setItem('site', JSON.stringify({ new: true }));
    toast.success('New site entry');
    setTimeout(() => navigate('/agent/form'), 800);
  };

  const handleSubmit = () => {
    if (!selected) {
      toast.error('Please select a site');
      return;
    }

    const siteData = siteList.find((s) => s.name === selected);
    localStorage.setItem('site', JSON.stringify(siteData));
    toast.success(`${selected} selected`);
    setTimeout(() => navigate('/agent/form'), 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 px-4">
      <Toaster position="top-center" />
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">Select Site</h2>

        <div className="relative">
          <input
            type="text"
            className="w-full border rounded p-2 pr-10 focus:outline-none focus:ring-2 focus:ring-purple-400 mb-2"
            placeholder="Search for site..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setSelected('');
              setDropdownVisible(true);
            }}
          />

          {selected && selected !== 'notfound' && (
            <motion.div
              className="absolute right-3 top-3 text-green-500"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <CheckCircle size={24} />
            </motion.div>
          )}
        </div>

        <AnimatePresence>
          {dropdownVisible && (
            <motion.ul
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="border rounded max-h-48 overflow-y-auto bg-white shadow-sm"
            >
              {filteredSites.map((site) => (
                <li
                  key={site.name}
                  className="px-4 py-2 hover:bg-purple-100 cursor-pointer transition"
                  onClick={() => handleSelect(site.name)}
                >
                  {site.name} - <span className="text-gray-500 text-sm">{site.address}</span>
                </li>
              ))}

              <li
                className="px-4 py-2 hover:bg-red-100 cursor-pointer text-red-600"
                onClick={handleNotFound}
              >
                Site not listed? Add manually
              </li>
            </motion.ul>
          )}
        </AnimatePresence>

        <button
          className="w-full bg-purple-600 text-white py-2 mt-6 rounded hover:bg-purple-700 transition"
          onClick={handleSubmit}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
