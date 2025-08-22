// export function ManagerDashboard() {
//   return (
//     <div className="p-8">
//       <h2 className="text-2xl font-bold mb-4">Manager Dashboard</h2>
//       <iframe
//         title="Power BI Report"
//         width="100%"
//         height="600"
//         src="https://app.powerbi.com/view?r=your-embed-url"
//         frameBorder="0"
//         allowFullScreen={true}
//       />
//     </div>
//   );
// }


//this is manager ka landing page : Reports , compare location 
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, BarChart2 } from "lucide-react";

export  function ManagerHome() {
  const navigate = useNavigate();

  const cards = [
    {
      title: "Compare Locations",
      description: "Visualize and match sites on the map from Excel data.",
      icon: <MapPin className="w-10 h-10 text-purple-600" />,
      onClick: () => navigate("manager/CompareLocation"),
    },
    {
      title: "Reports & Filters",
      description: "View and filter site visit reports by agent, date, or status.",
      icon: <BarChart2 className="w-10 h-10 text-blue-600" />,
      onClick: () => navigate("/manager/AgentStats"),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-tr from-indigo-100 via-white to-pink-100 flex flex-col items-center justify-center px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-10">Manager Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl w-full">
        {cards.map((card, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="bg-white rounded-2xl shadow-md p-6 cursor-pointer border hover:border-purple-300 transition"
            onClick={card.onClick}
          >
            <div className="flex items-center space-x-4 mb-4">
              {card.icon}
              <h2 className="text-xl font-semibold">{card.title}</h2>
            </div>
            <p className="text-gray-600">{card.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
