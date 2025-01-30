// import React, { useState } from "react";
// import { Line } from "react-chartjs-2";
// import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Legend, Tooltip } from "chart.js";

// ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Legend, Tooltip);

// const MessageDeliveryChart = () => {
//   const [timeRange, setTimeRange] = useState("12 months");

//   // Dummy Data (Replace with API data later)
//   const dataSets = {
//     "12 months": {
//       labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
//       datasets: [
//         {
//           label: "WhatsApp",
//           data: [50, 60, 55, 70, 65, 60, 75, 80, 85, 90, 88, 92],
//           borderColor: "#D91E36",
//           backgroundColor: "rgba(217, 30, 54, 0.2)",
//           fill: true,
//         },
//         {
//           label: "Email",
//           data: [40, 45, 50, 55, 60, 65, 62, 68, 72, 75, 78, 80],
//           borderColor: "#FF4560",
//           backgroundColor: "rgba(255, 69, 96, 0.2)",
//           fill: true,
//         },
//         {
//           label: "SMS",
//           data: [10, 15, 18, 20, 22, 25, 28, 30, 32, 35, 37, 40],
//           borderColor: "#405CF5",
//           backgroundColor: "rgba(64, 92, 245, 0.2)",
//           fill: true,
//         },
//       ],
//     },
//     "30 days": {
//       labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
//       datasets: [
//         {
//           label: "WhatsApp",
//           data: [60, 62, 70, 75],
//           borderColor: "#D91E36",
//           backgroundColor: "rgba(217, 30, 54, 0.2)",
//           fill: true,
//         },
//         {
//           label: "Email",
//           data: [50, 55, 58, 60],
//           borderColor: "#FF4560",
//           backgroundColor: "rgba(255, 69, 96, 0.2)",
//           fill: true,
//         },
//         {
//           label: "SMS",
//           data: [20, 22, 25, 28],
//           borderColor: "#405CF5",
//           backgroundColor: "rgba(64, 92, 245, 0.2)",
//           fill: true,
//         },
//       ],
//     },
//   };

//   const chartData = dataSets[timeRange] || { labels: [], datasets: [] };

//   return (
//     <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-4xl mx-auto">
//       <h3 className="text-lg font-semibold text-gray-800">Recent Message Delivery Performance</h3>
//       <p className="text-sm text-gray-500">Monitor recent delivery rates across channels for optimal performance.</p>
      
//       {chartData.datasets.length > 0 ? (
//         <Line data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
//       ) : (
//         <div className="h-40 flex items-center justify-center text-gray-400">No activity yet</div>
//       )}

//       <div className="flex gap-2 mt-4">
//         {["12 months", "30 days", "7 days", "Custom"].map((range) => (
//           <button
//             key={range}
//             onClick={() => setTimeRange(range)}
//             className={`px-4 py-2 text-sm rounded-md ${
//               timeRange === range ? "bg-blue-600 text-white" : "bg-gray-200"
//             }`}
//           >
//             {range}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default MessageDeliveryChart;