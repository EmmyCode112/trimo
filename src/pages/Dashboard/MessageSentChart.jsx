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
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const MessagesSentChart = () => {
  const [selectedFilter, setSelectedFilter] = useState("12 months");
  const [showCalendar, setShowCalendar] = useState(false);
  const [chartData, setChartData] = useState({}); // To hold filtered data for past days

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

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
    setShowCalendar(filter === "+ Custom");

    if (filter === "7 days") {
      setChartData(fakeData.last7Days);
    } else if (filter === "Yesterday") {
      setChartData(fakeData.yesterday);
    }
  };

  const handleDateChange = (date) => {
    console.log("Selected Date:", date);
    setShowCalendar(false); // Hide calendar after date selection
  };

  const disableFutureDates = ({ date }) => {
    const today = new Date();
    return date > today;
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
            label: "SMS",
            backgroundColor: "#383268",
            data: [200, 250, 150, 180, 200, 220, 210, 230, 220, 240, 260, 210],
            stack: "Stack 0",
          },

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
            borderRadius: { topLeft: 10, topRight: 10 },
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
          boxHeight: 8,
          color: "#344054",
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
      <h2 className="text-[18px] font-medium text-[#484848]">
        Messages Sent by Channel
      </h2>
      <p className="text-sm text-[#767676]">
        Analyze message distribution across channels
      </p>
      <div className="mt-[20px] pt-[12px]">
        <Bar data={data} options={options} />
      </div>
      <div className="flex justify-between items-center mt-4">
        <div className="flex space-x-2">
          {["12 months", "30 days", "7 days", "Yesterday", "+ Custom"].map(
            (filter) => (
              <button
                key={filter}
                onClick={() => handleFilterChange(filter)}
                className={`px-[16px] py-[10px] border relative border-[#D0D5DD] text-[14px] text-[#767676] flex ${
                  selectedFilter === filter ? "bg-[#F9FAFB] text-[#1D2939]" : ""
                }`}
              >
                {filter}

                {
                  filter === "+ Custom" ? <><div className="absolute bottom-[-80px] z-[10]">
                  {showCalendar && (
                    <Calendar
                      onChange={handleDateChange}
                      tileDisabled={disableFutureDates}
                      onClickDay={() => setShowCalendar(false)} // Close on day click
                    />
                  )}
                </div></>
                :<></>
                }
              </button>
            )
          )}
        </div>
        <Button
          label="View Reports"
          className="py-[10px] px-[16px] text-[#344054] rounded-[8px] border border-[#D0D5DD] hover:bg-[#eeeff0] text-[13px]"
        />
      </div>
    </div>
  );
};

export default MessagesSentChart;
