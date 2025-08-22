// //calendar daal do , dates pr filter kren , ki itne din me kitni hui visit total , doosra , agentwise kitni visit hui , 
// //percentage dikha dega , visited and purchased ka , aur ye agentwise filter ho


// // ManagerDashboard.jsx
// import React, { useState, useMemo , useEffect } from "react";
// import { motion } from "framer-motion";
// import axios from 'axios'

// import {
//   ResponsiveContainer,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   PieChart,
//   Pie,
//   Cell,
//   Legend,
// } from "recharts";

// export function ManagerDashboard() {
//   // date defaults: last 30 days range
//   const today = new Date();
//   const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
//   const formatDateForInput = (d) => d.toISOString().slice(0, 10);

//   const [startDate, setStartDate] = useState(formatDateForInput(thirtyDaysAgo));
//   const [endDate, setEndDate] = useState(formatDateForInput(today));
//   const [agentFilter, setAgentFilter] = useState("All");
//   const [entries, setEntries] = useState([]);
//   const [loading, setLoading] = useState(true);
  
//   // Dummy entries (Date format YYYY-MM-DD). Replace with real API later.
//   // const dummyEntries = [
//   //   { Date: "2025-07-20", SiteID: "c1", address: "MG Road", agent: "Agent A", visitType: "site", purchased: false },
//   //   { Date: "2025-07-22", SiteID: "c2", address: "Station Road", agent: "Agent B", visitType: "showroom", purchased: true },
//   //   { Date: "2025-07-25", SiteID: "c3", address: "Park Lane", agent: "Agent A", visitType: "site", purchased: false },
//   //   { Date: "2025-08-01", SiteID: "c2", address: "Station Road", agent: "Agent C", visitType: "site", purchased: true },
//   //   { Date: "2025-08-05", SiteID: "c4", address: "Green Ave", agent: "Agent B", visitType: "site", purchased: false },
//   //   { Date: "2025-08-08", SiteID: "c1", address: "MG Road", agent: "Agent A", visitType: "showroom", purchased: true },
//   //   { Date: "2025-08-10", SiteID: "c5", address: "Lake View", agent: "Agent C", visitType: "site", purchased: false },
//   //   // add more dummy rows as wanted
//   // ];
//   useEffect(() => {
//     const fetchDashboard = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/dashboard", {
//           params: { start: startDate, end: endDate },
//         });
//         setEntries(response.data.entries || []);
//       } catch (error) {
//         console.error("Error fetching dashboard data:", error);
//       }
//     };
//     fetchDashboard();
//   }, [startDate, endDate]);
//   // const agents = useMemo(() => ["All", ...Array.from(new Set(dummyEntries.map(e => e.agent)))], []);

//   // // filter by date and agent
//   // const filtered = useMemo(() => {
//   //   const s = new Date(startDate);
//   //   const e = new Date(endDate);
//   //   return dummyEntries.filter(entry => {
//   //     const d = new Date(entry.Date);
//   //     if (d < s || d > e) return false;
//   //     if (agentFilter !== "All" && entry.agent !== agentFilter) return false;
//   //     return true;
//   //   });
//   // }, [startDate, endDate, agentFilter]);

//     const agents = useMemo(() => ["All", ...Array.from(new Set(entries.map(e => e.Agent)))], [entries]);

//   const filtered = useMemo(() => {
//     const s = new Date(startDate);
//     const e = new Date(endDate);
//     return entries.filter(entry => {
//       const d = new Date(entry.Date);
//       if (d < s || d > e) return false;
//       if (agentFilter !== "All" && entry.Agent !== agentFilter) return false;
//       return true;
//     });
//   }, [entries, startDate, endDate, agentFilter]);


//   // stats
//   const total = filtered.length;
//   const showroom = filtered.filter(f => f.visitType === "showroom").length;
//   const siteVisits = filtered.filter(f => f.visitType === "site").length;
//   const purchasedCount = filtered.filter(f => f.purchased).length;
//   const conversion = total === 0 ? 0 : ((purchasedCount / total) * 100).toFixed(1);

//   // bar chart data per agent
//   const agentAgg = useMemo(() => {
//     const map = {};
//     filtered.forEach(row => {
//       if (!map[row.agent]) map[row.agent] = { Visited: 0, Purchased: 0, name: row.agent };
//       map[row.agent].Visited += 1;
//       if (row.purchased) map[row.agent].Purchased += 1;
//     });
//     return Object.values(map);
//   }, [filtered]);

//   // pie chart data (visited share)
//   const pieData = agentAgg.map(a => ({ name: a.name, value: a.Visited }));

//   const COLORS = ["#6366f1", "#ec4899", "#f59e0b", "#10b981", "#06b6d4"];

//   return (
//     <div className="min-h-screen bg-gradient-to-tr from-indigo-100 via-white to-pink-100 p-6">
//       <h1 className="text-3xl font-bold text-gray-800 mb-6">Manager Dashboard</h1>

//       {/* Filters */}
//       <motion.div className="bg-white rounded-2xl shadow-md p-4 mb-6 flex flex-col md:flex-row gap-4 items-start">
//         <div className="flex flex-col">
//           <label className="text-sm font-medium mb-1">Start</label>
//           <input
//             type="date"
//             className="border rounded px-3 py-2"
//             value={startDate}
//             onChange={(e) => setStartDate(e.target.value)}
//           />
//         </div>

//         <div className="flex flex-col">
//           <label className="text-sm font-medium mb-1">End</label>
//           <input
//             type="date"
//             className="border rounded px-3 py-2"
//             value={endDate}
//             onChange={(e) => setEndDate(e.target.value)}
//           />
//         </div>

//         <div className="flex flex-col">
//           <label className="text-sm font-medium mb-1">Agent</label>
//           <select value={agentFilter} onChange={(e) => setAgentFilter(e.target.value)} className="border rounded px-3 py-2">
//             {agents.map(a => <option key={a} value={a}>{a}</option>)}
//           </select>
//         </div>

//         <div className="ml-auto flex gap-2 items-center">
//           <div className="bg-white p-3 rounded shadow text-center">
//             <div className="text-sm text-gray-500">Total</div>
//             <div className="text-xl font-bold">{total}</div>
//           </div>
//           <div className="bg-white p-3 rounded shadow text-center">
//             <div className="text-sm text-gray-500">Purchased</div>
//             <div className="text-xl font-bold">{purchasedCount}</div>
//           </div>
//           <div className="bg-white p-3 rounded shadow text-center">
//             <div className="text-sm text-gray-500">Conversion</div>
//             <div className="text-xl font-bold">{conversion}%</div>
//           </div>
//         </div>
//       </motion.div>

//       {/* Charts */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
//         <div className="bg-white rounded-2xl p-4 shadow">
//           <h3 className="mb-3 font-semibold">Agent Performance (Visited vs Purchased)</h3>
//           <div style={{ width: "100%", height: 300 }}>
//             <ResponsiveContainer>
//               <BarChart data={agentAgg.length ? agentAgg : [{ name: "No data", Visited: 0, Purchased: 0 }]}>
//                 <XAxis dataKey="name" />
//                 <YAxis />
//                 <Tooltip />
//                 <Bar dataKey="Visited" fill="#6366f1" />
//                 <Bar dataKey="Purchased" fill="#ec4899" />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         <div className="bg-white rounded-2xl p-4 shadow">
//           <h3 className="mb-3 font-semibold">Visited Share by Agent</h3>
//           <div style={{ width: "100%", height: 300 }}>
//             <ResponsiveContainer>
//               <PieChart>
//                 <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label>
//                   {pieData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
//                 </Pie>
//                 <Tooltip />
//                 <Legend />
//               </PieChart>
//             </ResponsiveContainer>
//           </div>
//         </div>
//       </div>

//       {/* Table of filtered entries */}
//       <div className="bg-white rounded-2xl p-4 shadow">
//         <h3 className="mb-3 font-semibold">Entries</h3>
//         <div className="overflow-auto">
//           <table className="min-w-full text-sm">
//             <thead>
//               <tr className="text-left">
//                 <th className="py-2 px-3">Date</th>
//                 <th className="py-2 px-3">SiteID</th>
//                 <th className="py-2 px-3">Agent</th>
//                 <th className="py-2 px-3">Address</th>
//                 <th className="py-2 px-3">Type</th>
//                 <th className="py-2 px-3">Purchased</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filtered.map((r, i) => (
//                 <tr key={i} className="border-t">
//                   <td className="py-2 px-3">{r.Date}</td>
//                   <td className="py-2 px-3">{r.SiteID}</td>
//                   <td className="py-2 px-3">{r.agent}</td>
//                   <td className="py-2 px-3">{r.address}</td>
//                   <td className="py-2 px-3">{r.visitType}</td>
//                   <td className="py-2 px-3">{r.purchased ? "Yes" : "No"}</td>
//                 </tr>
//               ))}
//               {filtered.length === 0 && (
//                 <tr>
//                   <td colSpan={6} className="p-4 text-center text-gray-500">No entries for this range / filter</td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

export function ManagerDashboard() {
  const today = new Date();
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  const formatDateForInput = (d) => d.toISOString().slice(0, 10);

  const [startDate, setStartDate] = useState(formatDateForInput(thirtyDaysAgo));
  const [endDate, setEndDate] = useState(formatDateForInput(today));
  const [agentFilter, setAgentFilter] = useState("All");
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  const COLORS = ["#6366f1", "#ec4899", "#f59e0b", "#10b981", "#06b6d4"];

  // Fetch data from backend
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const res = await fetch(
          `http://localhost:5000/api/dashboard?start=${startDate}&end=${endDate}`
        );
        const data = await res.json();
        // Backend already filters to latest per Address
        setEntries(data.entries || []);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [startDate, endDate]);

  const agents = useMemo(
    () => ["All", ...Array.from(new Set(entries.map((e) => e.Agent)))],
    [entries]
  );

  // Filter by agent
  const filtered = useMemo(() => {
    return entries.filter((entry) => {
      if (agentFilter !== "All" && entry.Agent !== agentFilter) return false;
      return true;
    });
  }, [entries, agentFilter]);

  // Stats
  const total = filtered.length;
  const showroom = filtered.filter(
    (f) => f.Visited && f.Visited.toLowerCase() === "yes"
  ).length;
  const purchasedCount = filtered.filter(
    (f) => f.Purchased && f.Purchased.toLowerCase() === "yes"
  ).length;
  const conversion =
    showroom === 0 ? 0 : ((purchasedCount / showroom) * 100).toFixed(1);

  // Agent-wise aggregation
  // const agentAgg = useMemo(() => {
  //   const map = {};
  //   filtered.forEach((row) => {
  //     if (!map[row.Agent]) map[row.Agent] = { Visited: 0, Purchased: 0, name: row.Agent };
  //     if (row.Visited && row.Visited.toLowerCase() === "yes") map[row.Agent].Visited++;
  //     if (row.Purchased && row.Purchased.toLowerCase() === "yes") map[row.Agent].Purchased++;
  //   });
  //   return Object.values(map);
  // }, [filtered]);
  // Agent-wise aggregation
const agentAgg = useMemo(() => {
  const map = {};
  const siteTracker = {}; // agent → set of unique addresses

  filtered.forEach((row) => {
    if (!map[row.Agent]) {
      map[row.Agent] = { Approached: 0, Visited: 0, Purchased: 0, name: row.Agent };
      siteTracker[row.Agent] = new Set();
    }

    // Track unique addresses approached
    if (row.Address && !siteTracker[row.Agent].has(row.Address)) {
      siteTracker[row.Agent].add(row.Address);
      map[row.Agent].Approached++;
    }

    // Visited count
    if (row.Visited && row.Visited.toLowerCase() === "yes") {
      map[row.Agent].Visited++;
    }

    // Purchased count
    if (row.Purchased && row.Purchased.toLowerCase() === "yes") {
      map[row.Agent].Purchased++;
    }
  });

  return Object.values(map);
}, [filtered]);


  // Pie chart data
  const pieData = agentAgg.map((a) => ({ name: a.name, value: a.Visited }));

  return (
    <div className="min-h-screen bg-gradient-to-tr from-indigo-100 via-white to-pink-100 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Manager Dashboard</h1>

      {/* Filters */}
      <motion.div className="bg-white rounded-2xl shadow-md p-4 mb-6 flex flex-col md:flex-row gap-4 items-start">
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">Start</label>
          <input
            type="date"
            className="border rounded px-3 py-2"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">End</label>
          <input
            type="date"
            className="border rounded px-3 py-2"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">Agent</label>
          <select
            value={agentFilter}
            onChange={(e) => setAgentFilter(e.target.value)}
            className="border rounded px-3 py-2"
          >
            {agents.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
        </div>

        <div className="ml-auto flex gap-2 items-center">
          <div className="bg-white p-3 rounded shadow text-center">
            <div className="text-sm text-gray-500">Total</div>
            <div className="text-xl font-bold">{total}</div>
          </div>
          <div className="bg-white p-3 rounded shadow text-center">
            <div className="text-sm text-gray-500">Showroom Visits</div>
            <div className="text-xl font-bold">{showroom}</div>
          </div>
          <div className="bg-white p-3 rounded shadow text-center">
            <div className="text-sm text-gray-500">Purchased</div>
            <div className="text-xl font-bold">{purchasedCount}</div>
          </div>
          <div className="bg-white p-3 rounded shadow text-center">
            <div className="text-sm text-gray-500">Conversion</div>
            <div className="text-xl font-bold">{conversion}%</div>
          </div>
        </div>
      </motion.div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-2xl p-4 shadow">
          <h3 className="mb-3 font-semibold">Agent Performance (Visited vs Purchased)</h3>
          <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
              <BarChart
                data={agentAgg.length ? agentAgg : [{ name: "No data", Visited: 0, Purchased: 0 }]}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="Approached" fill="#06b6d4" />
                <Bar dataKey="Visited" fill="#6366f1" />
                <Bar dataKey="Purchased" fill="#ec4899" />
                
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow">
          <h3 className="mb-3 font-semibold">Visited Share by Agent</h3>
          <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  label
                >
                  {pieData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl p-4 shadow">
        <h3 className="mb-3 font-semibold">Entries</h3>
        {loading ? (
          <div className="p-4 text-center text-gray-500">Loading...</div>
        ) : (
          <div className="overflow-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left">
                  <th className="py-2 px-3">Date</th>
                  <th className="py-2 px-3">SiteID</th>
                  <th className="py-2 px-3">Agent</th>
                  <th className="py-2 px-3">Address</th>
                  <th className="py-2 px-3">Visited</th>
                  <th className="py-2 px-3">Purchased</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((r, i) => (
                  <tr key={i} className="border-t">
                    <td className="py-2 px-3">{r.Date}</td>
                    <td className="py-2 px-3">{r.SiteID}</td>
                    <td className="py-2 px-3">{r.Agent}</td>
                    <td className="py-2 px-3">{r.Address}</td>
                    <td className="py-2 px-3">{r.Visited}</td>
                    <td className="py-2 px-3">{r.Purchased}</td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={6} className="p-4 text-center text-gray-500">
                      No entries for this range / filter
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
