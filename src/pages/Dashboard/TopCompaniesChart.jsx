import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import Button from "../../Components/buttons/transparentButton";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const TopCompaniesChart = () => {
  const [chartData, setChartData] = useState({});

  const data = chartData.labels
    ? chartData
    : {
        labels: [
          "Campaign 1",
          "Campaign 2",
          "Campaign 3",
          "Campaign 4",
          "Campaign 5",
          "Campaign 6",
          "Campaign 7",
          "Campaign 8",
          "Campaign 9",
        ],
        datasets: [
          {
            label: "Click-through rate", // Blue dataset moved down
            backgroundColor: "#383268",
            data: [30, 35, 32, 40, 45, 38, 42, 44, 48],
            borderRadius: { topLeft: 0, topRight: 0 }, // Flat top since it's below
          },
          {
            label: "Open rate", // Red dataset moved up
            backgroundColor: "#9A2444",
            data: [60, 70, 65, 75, 80, 68, 72, 74, 78],
            borderRadius: { topLeft: 10, topRight: 10 }, // Rounded top
          },
        ],
      };

      const options = {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
            align: "end", // Align legends to the left (optional)
            labels: {
              usePointStyle: true, // Use circular dots instead of rectangles
              pointStyle: "circle", // Ensure the shape is a circle
              font: {
                size: 13, 
              },
              padding: 20, // Add space between legend items
              boxWidth: 8, // Adjust the width of the legend dot
              boxHeight: 8, // Adjust the height of the legend dot
              color: "#667085", // Change the text color
            },
          },
        },
        scales: {
          x: {
            stacked: true,
            grid: { display: false },
            ticks: { color: "#767676" },
          },
          y: {
            stacked: true,
            grid: { color: "#E5E5E5" },
            ticks: { color: "#767676", stepSize: 10 },
          },
        },
      };
  return (
    <div className="p-4 bg-white rounded-lg shadow-md border border-[#EAECF0]">
      <h2 className="text-[18px] font-medium text-[#484848]">Top Campaigns</h2>
      <p className="text-sm font-normal mt-[6px] text-[#767676]">
        Your top-performing campaigns with engagement insights and key stats.
      </p>
      <div className="mt-[20px] pt-[12px] ">
        {/* <p className="text-[12px] font-medium text-[#919191] rotate-[-90deg]">Enagagement Metrics</p> */}
        <Bar data={data} options={options} />
      </div>
      <div className="flex justify-end mt-4">
        <Button
          label="View Reports"
          className="py-[10px] px-[16px] text-[#344054] rounded-[8px] border border-[#D0D5DD] hover:bg-[#eeeff0] text-[13px]"
        />
      </div>
    </div>
  );
};

export default TopCompaniesChart;
