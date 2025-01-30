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

  const fakeData = {
    yesterday: {
      labels: ["Yesterday"],
      datasets: [
        {
          label: "WhatsApp",
          backgroundColor: "#9A2444",
          data: [150],
        },
        {
          label: "Email",
          backgroundColor: "#CB1E33",
          data: [80],
        },
        {
          label: "SMS",
          backgroundColor: "#383268",
          data: [50],
        },
      ],
    },
    last7Days: {
      labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"],
      datasets: [
        {
          label: "WhatsApp",
          backgroundColor: "#9A2444",
          data: [100, 120, 110, 130, 140, 150, 160],
        },
        {
          label: "Email",
          backgroundColor: "#CB1E33",
          data: [50, 60, 70, 80, 90, 100, 110],
        },
        {
          label: "SMS",
          backgroundColor: "#383268",
          data: [30, 40, 50, 60, 70, 80, 90],
        },
      ],
    },
  };

  const data = chartData.labels
    ? chartData
    : {
        labels: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        datasets: [
          {
            label: "WhatsApp",
            backgroundColor: "#9A2444",
            data: [600, 800, 500, 600, 650, 750, 700, 720, 710, 780, 820, 650],
            stack: "Stack 0",
          },
          {
            label: "Email",
            backgroundColor: "#CB1E33",
            data: [300, 400, 250, 300, 330, 350, 340, 360, 370, 390, 410, 320],
            stack: "Stack 0",
          },
          {
            label: "SMS",
            backgroundColor: "#383268",
            data: [200, 250, 150, 180, 200, 220, 210, 230, 220, 240, 260, 210],
            stack: "Stack 0",
          },
        ],
      };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        align: "end",
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
          generateLabels: (chart) => {
            const { datasets } = chart.data;
            return datasets.map((dataset) => ({
              text: dataset.label,
              fillStyle: dataset.backgroundColor,
              strokeStyle: dataset.backgroundColor,
              lineWidth: 0,
              pointStyle: "circle",
              fontSize: 15, // Customize font size for legend text
              width: 15, // Specify width for the circle
            }));
          },
        },
      },
    },
    scales: {
      x: { stacked: true },
      y: { stacked: true },
    },
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md border border-[#EAECF0]">
      <h2 className="text-[18px] font-medium text-[#484848]">Top Campaigns</h2>
      <p className="text-sm text-[#767676]">
        Your top-performing campaigns with engagement insights and key stats.
      </p>
      <div className="mt-[20px] pt-[12px]">
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
