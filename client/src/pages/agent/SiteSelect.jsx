
// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import toast, { Toaster } from 'react-hot-toast';
// import { CheckCircle } from 'lucide-react';

// export function SiteSelect() {
//   const navigate = useNavigate();

//   const siteList = [
//     { name: 'C1', address: '123 Alpha Street', area: 'North Zone', subArea: 'Sector A', name1: 'Annie', phone1: '987134', role1: 'Architect', name2: 'Ammy', phone2: '978675', role2: 'Supervisor', sqyd: '245' },
//     { name: 'C2', address: '456 Beta Avenue', area: 'East Zone', subArea: 'Sector B' },
//     { name: 'C3', address: '789 Gamma Lane', area: 'South Zone', subArea: 'Sector C' },
//   ];


//   const [search, setSearch] = useState('');
//   const [selected, setSelected] = useState('');
//   const [dropdownVisible, setDropdownVisible] = useState(true);

//   const filteredSites = siteList.filter((site) =>
//     site.name.toLowerCase().includes(search.toLowerCase())
//   );

//   const handleSelect = (siteName) => {
//     setSelected(siteName);
//     setSearch(siteName);
//     setDropdownVisible(false);
//   };

//   const handleNotFound = () => {
//     setSelected('notfound');
//     localStorage.setItem('site', JSON.stringify({ new: true }));
//     toast.success('New site entry');
//     // setTimeout(() => 
//       navigate('/agent/form')
//     // , 800);
//   };

//   const handleSubmit = () => {
//     if (!selected) {
//       toast.error('Please select a site');
//       return;
//     }

//     const siteData = siteList.find((s) => s.name === selected);
//     localStorage.setItem('site', JSON.stringify(siteData));
//     toast.success(`${selected} selected`);
//     setTimeout(() => navigate('/agent/form'), 800);
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 px-4">
//       <Toaster position="top-center" />
//       <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
//         <h2 className="text-2xl font-semibold mb-6 text-center">Select Site</h2>

//         <div className="relative">
//           <input
//             type="text"
//             className="w-full border rounded p-2 pr-10 focus:outline-none focus:ring-2 focus:ring-purple-400 mb-2"
//             placeholder="Search for site..."
//             value={search}
//             onChange={(e) => {
//               setSearch(e.target.value);
//               setSelected('');
//               setDropdownVisible(true);
//             }}
//           />

//           {selected && selected !== 'notfound' && (
//             <motion.div
//               className="absolute right-3 top-3 text-green-500"
//               initial={{ scale: 0 }}
//               animate={{ scale: 1 }}
//               transition={{ type: 'spring', stiffness: 300 }}
//             >
//               <CheckCircle size={24} />
//             </motion.div>
//           )}
//         </div>

//         <AnimatePresence>
//           {dropdownVisible && (
//             <motion.ul
//               initial={{ opacity: 0, y: -10 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0 }}
//               className="border rounded max-h-48 overflow-y-auto bg-white shadow-sm"
//             >
//               {filteredSites.map((site) => (
//                 <li
//                   key={site.name}
//                   className="px-4 py-2 hover:bg-purple-100 cursor-pointer transition"
//                   onClick={() => handleSelect(site.name)}
//                 >
//                   {site.name} - <span className="text-gray-500 text-sm">{site.address}</span>
//                 </li>
//               ))}

//               <li
//                 className="px-4 py-2 hover:bg-red-100 cursor-pointer text-red-600"
//                 onClick={handleNotFound}
//               >
//                 Site not listed? Add manually
//               </li>
//             </motion.ul>
//           )}
//         </AnimatePresence>

//         <button
//           className="w-full bg-purple-600 text-white py-2 mt-6 rounded hover:bg-purple-700 transition"
//           onClick={handleSubmit}
//         >
//           Continue
//         </button>
//       </div>
//     </div>
//   );
// }


// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import toast, { Toaster } from 'react-hot-toast';
// import { CheckCircle } from 'lucide-react';

// export function SiteSelect() {
//   const navigate = useNavigate();

//   const [siteList, setSiteList] = useState([]);
//   const [search, setSearch] = useState('');
//   const [selected, setSelected] = useState('');
//   const [dropdownVisible, setDropdownVisible] = useState(true);

//   // 🔄 Fetch site list from Google Sheets (Apps Script URL)
//   useEffect(() => {
//     const fetchSites = async () => {
//       try {
//         const res = await fetch("https://script.google.com/macros/s/AKfycbxXDDgGotuOE9AVc3i9KD4_bSyDhnE0LYwYTZ-dvYs_2dsFPoZ0l2YN8KZkm0e5SF-r/exec");
//         const data = await res.json();
//         setSiteList(data); // Expects array of site objects with name, address, etc.
//       } catch (err) {
//         toast.error('Failed to load sites');
//         console.error('Fetch error:', err);
//       }
//     };
//     fetchSites();
//   }, []);

//   const filteredSites = siteList.filter((site) =>
//     site.name.toLowerCase().includes(search.toLowerCase())
//   );

//   const handleSelect = (site) => {
//     setSelected(site.name);
//     setSearch(site.name);
//     localStorage.setItem('site', JSON.stringify(site)); // Save full data
//     setDropdownVisible(false);
//   };

//   const handleNotFound = () => {
//     setSelected('notfound');
//     localStorage.setItem('site', JSON.stringify({ new: true }));
//     toast.success('New site entry');
//     navigate('/agent/form');
//   };

//   const handleSubmit = () => {
//     if (!selected || selected === 'notfound') {
//       toast.error('Please select a site');
//       return;
//     }

//     toast.success(`${selected} selected`);
//     setTimeout(() => navigate('/agent/form'), 800);
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 px-4">
//       <Toaster position="top-center" />
//       <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
//         <h2 className="text-2xl font-semibold mb-6 text-center">Select Site</h2>

//         <div className="relative">
//           <input
//             type="text"
//             className="w-full border rounded p-2 pr-10 focus:outline-none focus:ring-2 focus:ring-purple-400 mb-2"
//             placeholder="Search for site..."
//             value={search}
//             onChange={(e) => {
//               setSearch(e.target.value);
//               setSelected('');
//               setDropdownVisible(true);
//             }}
//           />

//           {selected && selected !== 'notfound' && (
//             <motion.div
//               className="absolute right-3 top-3 text-green-500"
//               initial={{ scale: 0 }}
//               animate={{ scale: 1 }}
//               transition={{ type: 'spring', stiffness: 300 }}
//             >
//               <CheckCircle size={24} />
//             </motion.div>
//           )}
//         </div>

//         <AnimatePresence>
//           {dropdownVisible && (
//             <motion.ul
//               initial={{ opacity: 0, y: -10 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0 }}
//               className="border rounded max-h-48 overflow-y-auto bg-white shadow-sm"
//             >
//               {filteredSites.map((site) => (
//                 <li
//                   key={site.name}
//                   className="px-4 py-2 hover:bg-purple-100 cursor-pointer transition"
//                   onClick={() => handleSelect(site)}
//                 >
//                   {site.name} - <span className="text-gray-500 text-sm">{site.address}</span>
//                 </li>
//               ))}

//               <li
//                 className="px-4 py-2 hover:bg-red-100 cursor-pointer text-red-600"
//                 onClick={handleNotFound}
//               >
//                 Site not listed? Add manually
//               </li>
//             </motion.ul>
//           )}
//         </AnimatePresence>

//         <button
//           className="w-full bg-purple-600 text-white py-2 mt-6 rounded hover:bg-purple-700 transition"
//           onClick={handleSubmit}
//         >
//           Continue
//         </button>
//       </div>
//     </div>
//   );
// }



// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import toast, { Toaster } from 'react-hot-toast';
// import { CheckCircle } from 'lucide-react';
// import axios from 'axios';

// export function SiteSelect() {
//   const navigate = useNavigate();

//   const [search, setSearch] = useState('');
//   const [selected, setSelected] = useState('');
//   const [dropdownVisible, setDropdownVisible] = useState(true);
//   const [siteList, setSiteList] = useState([]);

//   // useEffect(() => {
//   //   async function fetchSites() {
//   //     try {
//   //       // mode : no-cors,
//   //       const res = await axios.get("https://script.google.com/macros/s/AKfycbxXDDgGotuOE9AVc3i9KD4_bSyDhnE0LYwYTZ-dvYs_2dsFPoZ0l2YN8KZkm0e5SF-r/exec"); 
//   //       // 🔁 Replace with your Apps Script URL
//   //       setSiteList(res.data);
//   //     } catch (err) {
//   //       toast.error("Failed to fetch sites");
//   //       console.error(err);
//   //     }
//   //   }
//   //   fetchSites();
//   // }, []);
// //   useEffect(() => {
// //   async function fetchSites() {
// //     try {
// //        await fetch("https://script.google.com/macros/s/AKfycbxXDDgGotuOE9AVc3i9KD4_bSyDhnE0LYwYTZ-dvYs_2dsFPoZ0l2YN8KZkm0e5SF-r/exec"
    
// //       //,{
// //       //   method : 'GET',
// //       //   mode : 'no-cors'}
// //        ); // replace with your actual script URL
// //       const data = await response.json();
// //       setSiteList(data);
// //     } catch (error) {
// //       toast.error("Failed to fetch site list");
// //       console.error("Fetch error:", error);
// //     }
// //   }
// //   fetchSites();
// // }, []);

// useEffect(() => {
//     async function fetchSites() {
//       try {
//         const res = await axios.get('http://localhost:5000/api/sites');
//         setSiteList(res.data);
//       } catch (err) {
//         toast.error('Failed to fetch sites');
//         console.error(err);
//       }
//     }
//     fetchSites();
//   }, []);


//   // const filteredSites = siteList.filter((site) =>
//   //   site.siteID.toLowerCase().includes(search.toLowerCase())
//   // );
//   const filteredSites = siteList.filter((site) =>
//   `${site.SiteID} - ${site.address}`.toLowerCase().includes(search.toLowerCase())
// );


//   const handleSelect = (siteID) => {
//     setSelected(siteID);
//     setSearch(siteID);
//     setDropdownVisible(false);
//   };

//   const handleNotFound = () => {
//     setSelected('notfound');
//     localStorage.setItem('site', JSON.stringify({ new: true }));
//     toast.success('New site entry');
//     navigate('/agent/form');
//   };

//   // const handleSubmit = () => {
//   //   if (!selected) {
//   //     toast.error('Please select a site');
//   //     return;
//   //   }

//   //   const siteData = siteList.find((s) => s.SiteID === selected);
//   //   if (siteData) {
//   //     localStorage.setItem('site', JSON.stringify(siteData));
//   //   }
//   //   toast.success(`${selected} selected`);
//   //   setTimeout(() => navigate('/agent/form'), 800);
//   // };
// //   const handleSubmit = () => {
// //   if (!selected) {
// //     toast.error('Please select a site');
// //     return;
// //   }

// //   const siteData = siteList.find((s) => s.SiteID === selected);
// //   if (siteData) {
// //     localStorage.setItem('site', JSON.stringify({ ...siteData, new: false }));
// //   }
// //   toast.success(`${selected} selected`);
// //   setTimeout(() => navigate('/agent/form'), 800);
// // };

// const handleSubmit = () => {
//   if (!selected) {
//     // Generate new SiteID (e.g., c0, c1, ...)
//     const freshSites = siteList.filter(
//       (s) => s.revisit === "Fresh" && s.SiteID?.startsWith("c")
//     );

//     const ids = freshSites
//       .map((s) => parseInt(s.SiteID.replace("c", "")))
//       .filter((n) => !isNaN(n));

//     const nextID = ids.length ? Math.max(...ids) + 1 : 0;
//     const newSiteID = `c${nextID}`;

//     localStorage.setItem("site", JSON.stringify({ new: true, SiteID: newSiteID }));
//     toast.success(`New site created: ${newSiteID}`);
//     navigate("/agent/form");
//     return;
//   }

//   // Use selected existing site
//   const siteData = siteList.find((s) => s.SiteID === selected);
//   if (siteData) {
//     localStorage.setItem("site", JSON.stringify({ ...siteData, new: false }));
//     toast.success(`${selected} selected`);
//     navigate("/agent/form");
//   }
// };



//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 px-4">
//       <Toaster position="top-center" />
//       <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
//         <h2 className="text-2xl font-semibold mb-6 text-center">Select Site</h2>

//         <div className="relative">
//           <input
//             type="text"
//             className="w-full border rounded p-2 pr-10 focus:outline-none focus:ring-2 focus:ring-purple-400 mb-2"
//             placeholder="Search by SiteID..."
//             value={search}
//             onChange={(e) => {
//               setSearch(e.target.value);
//               setSelected('');
//               setDropdownVisible(true);
//             }}
//           />

//           {selected && selected !== 'notfound' && (
//             <motion.div
//               className="absolute right-3 top-3 text-green-500"
//               initial={{ scale: 0 }}
//               animate={{ scale: 1 }}
//               transition={{ type: 'spring', stiffness: 300 }}
//             >
//               <CheckCircle size={24} />
//             </motion.div>
//           )}
//         </div>

//         <AnimatePresence>
//           {dropdownVisible && (
//             <motion.ul
//               initial={{ opacity: 0, y: -10 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0 }}
//               className="border rounded max-h-48 overflow-y-auto bg-white shadow-sm"
//             >
//               {filteredSites.map((site) => (
//                 <li
//                   key={site.siteID}
//                   className="px-4 py-2 hover:bg-purple-100 cursor-pointer transition"
//                   onClick={() => handleSelect(site.siteID)}
//                 >
//                   {site.siteID} - <span className="text-gray-500 text-sm">{site.address}</span>
//                 </li>
//               ))}

//               <li
//                 className="px-4 py-2 hover:bg-red-100 cursor-pointer text-red-600"
//                 onClick={handleNotFound}
//               >
//                 Site not listed? Add manually
//               </li>
//             </motion.ul>
//           )}
//         </AnimatePresence>

//         <button
//           className="w-full bg-purple-600 text-white py-2 mt-6 rounded hover:bg-purple-700 transition"
//           onClick={handleSubmit}
//         >
//           Continue
//         </button>
//       </div>
//     </div>
//   );
// }

// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from "axios";

// export  function SiteSelect() {
//   const [sites, setSites] = useState([]);
//   const [selectedSite, setSelectedSite] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchSites = async () => {
//       try {
//         const res = await axios.get('http://localhost:5000/api/sites');
//         //const data = await res.json();
//         //console.log('Fetched sites:', data);
//         setSites(res.data);
//       } catch (err) {
//         console.error('Failed to fetch sites:', err);
//       }
//     };

//     fetchSites();
//   }, []);

//   const filteredSites = sites.filter(site => {
//     const label = `${site.siteId} - ${site.address}`.toLowerCase();
//     return label.includes(searchTerm.toLowerCase());
//   });

//   // const handleContinue = () => {
//   //   if (!selectedSite) return;
//   //   const [siteId] = selectedSite.split(' - ');
//   //   navigate('/agent/form', { state: { selectedSiteId: siteId } });
//   // };
//   const handleContinue = async () => {
//   if (!selectedSite) return;
//   const [siteId] = selectedSite.split(' - ');

//   try {
//     const res = await axios.get(`http://localhost:5000/api/sites/${siteId}/latest`);
//     const latestEntry = res.data || {};
//     localStorage.setItem("site", JSON.stringify({ ...latestEntry, new: false }));
//     navigate('/agent/form', { state: { selectedSiteId: siteId } });
//   } catch (err) {
//     console.error("Failed to fetch latest site entry:", err);
//     alert("Failed to get site info");
//   }
// };


//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-pink-100 px-4">
//       <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
//         <h2 className="text-xl font-semibold text-center mb-4">Select Site</h2>

//         <input
//           type="text"
//           placeholder="Search by SiteID..."
//           className="w-full p-2 mb-4 border rounded-md"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />

//         <div className="max-h-64 overflow-y-auto border rounded-md mb-4">
//           {filteredSites.length > 0 ? (
//             filteredSites.map(site => {
//               const label = `${site.siteId} - ${site.address}`;
//               return (
//                 <div
//                   key={label}
//                   onClick={() => setSelectedSite(label)}
//                   className={`p-2 cursor-pointer hover:bg-purple-100 ${
//                     selectedSite === label ? 'bg-purple-200' : ''
//                   }`}
//                 >
//                   {label}
//                 </div>
//               );
//             })
//           ) : (
//             <div className="p-2 text-gray-500">No sites found.</div>
//           )}
//         </div>

//         <button
//           onClick={handleContinue}
//           className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-md disabled:opacity-50"
//           disabled={!selectedSite}
//         >
//           Continue
//         </button>
//       </div>
//     </div>
//   );
// }


// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from "axios";
// import { CheckCircle } from 'lucide-react';

// export function SiteSelect() {
//   const [sites, setSites] = useState([]);
//   const [selectedSite, setSelectedSite] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchSites = async () => {
//       try {
//         const res = await axios.get('http://localhost:5000/api/sites');
//         setSites(res.data);
//       } catch (err) {
//         console.error('Failed to fetch sites:', err);
//       }
//     };
//     fetchSites();
//   }, []);

//   const filteredSites = sites.filter(site => {
//     const label = `${site.siteId} - ${site.address}`.toLowerCase();
//     return label.includes(searchTerm.toLowerCase());
//   });

//   const handleContinue = async () => {
//     if (!selectedSite) return;

//     if (selectedSite === "__manual") {
//       localStorage.setItem("site", JSON.stringify({ new: true }));
//       navigate('/agent/form');
//       return;
//     }

//     const [siteId] = selectedSite.split(' - ');
//     try {
//       const res = await axios.get(`http://localhost:5000/api/sites/${siteId}/latest`);
//       const latestEntry = res.data || {};
//       delete latestEntry.Date;
//       delete latestEntry.Latitude;
//       delete latestEntry.Longitude;

//       localStorage.setItem("site", JSON.stringify({ ...latestEntry, new: false }));
//       navigate('/agent/form');
//     } catch (err) {
//       console.error("Failed to fetch latest site entry:", err);
//       alert("Failed to get site info");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-pink-100 px-4">
//       <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
//         <h2 className="text-xl font-semibold text-center mb-4">Select Site</h2>

//         <input
//           type="text"
//           placeholder="Search by SiteID..."
//           className="w-full p-2 mb-4 border rounded-md"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />

//         {selectedSite && selectedSite !== "__manual" && (
//           <div className="flex items-center justify-between bg-green-100 text-green-800 p-2 rounded-md mb-2">
//             <span className="truncate">{selectedSite}</span>
//             <CheckCircle className="w-5 h-5 text-green-600" />
//           </div>
//         )}

//         <div className="max-h-64 overflow-y-auto border rounded-md mb-4">
//           {filteredSites.length > 0 ? (
//             filteredSites.map(site => {
//               const label = `${site.siteId} - ${site.address}`;
//               return (
//                 <div
//                   key={label}
//                   onClick={() => setSelectedSite(label)}
//                   className={`p-2 cursor-pointer hover:bg-purple-100 ${
//                     selectedSite === label ? 'bg-purple-200' : ''
//                   }`}
//                 >
//                   {label}
//                 </div>
//               );
//             })
//           ) : (
//             <div className="p-2 text-gray-500">No sites found.</div>
//           )}

//           {/* Manual Entry Option */}
//           <div
//             key="__manual"
//             onClick={() => setSelectedSite("__manual")}
//             className={`p-2 cursor-pointer hover:bg-yellow-100 font-semibold text-indigo-600 ${
//               selectedSite === "__manual" ? 'bg-yellow-200' : ''
//             }`}
//           >
//             ➕ Site not found? Add manually
//           </div>
//         </div>

//         <button
//           onClick={handleContinue}
//           className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-md disabled:opacity-50"
//           disabled={!selectedSite}
//         >
//           Continue
//         </button>
//       </div>
//     </div>
//   );
// }


import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';
import { CheckCircle } from 'lucide-react';
import axios from 'axios';

export function SiteSelect() {
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState('');
  const [dropdownVisible, setDropdownVisible] = useState(true);
  const [siteList, setSiteList] = useState([]);

  useEffect(() => {
    async function fetchSites() {
      try {
        const res = await axios.get('http://localhost:5000/api/sites');
        setSiteList(res.data);
      } catch (err) {
        toast.error('Failed to fetch sites');
        console.error(err);
      }
    }
    fetchSites();
  }, []);

  const filteredSites = siteList.filter((site) =>
    `${site.siteId} - ${site.address}`.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (siteId) => {
    setSelected(siteId);
    setSearch(siteId);
    setDropdownVisible(false);
  };

  const handleNotFound = () => {
    const freshSites = siteList.filter(
      (s) => s.revisit === "Fresh" && s.siteId?.startsWith("c")
    );
    const ids = freshSites
      .map((s) => parseInt(s.siteId.replace("c", "")))
      .filter((n) => !isNaN(n));

    const nextID = ids.length ? Math.max(...ids) + 1 : 0;
    const newSiteId = `c${nextID}`;

    localStorage.setItem("site", JSON.stringify({ new: true, siteId: newSiteId }));
    toast.success(`New site created: ${newSiteId}`);
    navigate("/agent/form");
  };

  const handleSubmit = async () => {
    if (!selected) {
      toast.error('Please select a site');
      return;
    }

    try {
      const res = await axios.get(`http://localhost:5000/api/sites/${selected}/latest`);
      const latestEntry = res.data || {};
      localStorage.setItem("site", JSON.stringify({ ...latestEntry, new: false }));
      toast.success(`${selected} selected`);
      navigate('/agent/form');
    } catch (err) {
      toast.error("Failed to get site info, redirecting to empty form");
      localStorage.setItem("site", JSON.stringify({ siteId: selected, new: true }));
      navigate('/agent/form');
    }
  };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 px-4">
//       <Toaster position="top-center" />
//       <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
//         <h2 className="text-2xl font-semibold mb-6 text-center">Select Site</h2>

//         <div className="relative">
//           <input
//             type="text"
//             className="w-full border rounded p-2 pr-10 focus:outline-none focus:ring-2 focus:ring-purple-400 mb-2"
//             placeholder="Search by SiteID..."
//             value={search}
//             onChange={(e) => {
//               setSearch(e.target.value);
//               setSelected('');
//               setDropdownVisible(true);
//             }}
//           />

//           {selected && selected !== 'notfound' && (
//             <motion.div
//               className="absolute right-3 top-3 text-green-500"
//               initial={{ scale: 0 }}
//               animate={{ scale: 1 }}
//               transition={{ type: 'spring', stiffness: 300 }}
//             >
//               <CheckCircle size={24} />
//             </motion.div>
//           )}
//         </div>

//         <AnimatePresence>
//           {dropdownVisible && (
//             <motion.ul
//               initial={{ opacity: 0, y: -10 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0 }}
//               className="border rounded max-h-48 overflow-y-auto bg-white shadow-sm"
//             >
//               {filteredSites.map((site) => (
//                 <li
//                   key={site.siteId}
//                   className="px-4 py-2 hover:bg-purple-100 cursor-pointer transition"
//                   onClick={() => handleSelect(site.siteId)}
//                 >
//                   {site.siteId} - <span className="text-gray-500 text-sm">{site.address}</span>
//                 </li>
//               ))}

//               <li
//                 className="px-4 py-2 hover:bg-red-100 cursor-pointer text-red-600"
//                 onClick={handleNotFound}
//               >
//                 Site not listed? Add manually
//               </li>
//             </motion.ul>
//           )}
//         </AnimatePresence>

//         <button
//           className="w-full bg-purple-600 text-white py-2 mt-6 rounded hover:bg-purple-700 transition"
//           onClick={handleSubmit}
//         >
//           Continue
//         </button>
//       </div>
//     </div>
//   );
// }

return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 px-4">
    <Toaster position="top-center" />
    <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
      <h2 className="text-2xl font-semibold mb-6 text-center">Select Site</h2>

      <div className="relative">
        <input
          type="text"
          className="w-full border rounded p-2 pr-10 focus:outline-none focus:ring-2 focus:ring-purple-400 mb-2"
          placeholder="Search by SiteID..."
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
                key={site.siteId}
                className="px-4 py-2 hover:bg-purple-100 cursor-pointer transition"
                onClick={() => handleSelect(site.siteId)}
              >
                {site.siteId} - <span className="text-gray-500 text-sm">{site.address}</span>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>

      {/* <button
        className="w-full bg-purple-600 text-white py-2 mt-6 rounded hover:bg-purple-700 transition"
        onClick={handleSubmit}
      >
        Continue
      </button>

      <div className="text-center mt-4">
        <button
          className="text-sm text-purple-700 hover:underline"
          onClick={handleNotFound}
        >
          Site not listed? Add manually
        </button>
      </div> */}
      <div className="flex flex-col gap-3 mt-6">
  <button
    className="w-full bg-purple-600 text-white py-2 rounded-lg font-medium hover:bg-purple-700 transition"
    onClick={handleSubmit}
  >
    Continue
  </button>

  <div className="relative">
    <div className="absolute inset-0 flex items-center">
      <div className="w-full border-t border-gray-300" />
    </div>
    <div className="relative flex justify-center text-sm">
      <span className="bg-white px-2 text-gray-500">or</span>
    </div>
  </div>

  <button
    className="w-full border border-purple-600 text-purple-700 font-medium py-2 rounded-lg hover:bg-purple-50 transition"
    onClick={handleNotFound}
  >
    Add Site Manually
  </button>
</div>

    </div>
  </div>
);
}
