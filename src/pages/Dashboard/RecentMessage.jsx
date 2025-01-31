import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area } from "recharts";
import { useState } from "react";
import Button from "../../Components/buttons/transparentButton";

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";


export default function RecentMessage() {


    const [showCalendar, setShowCalendar] = useState(false);
    const handleDateChange = (date) => {
        console.log("Selected Date:", date);
        setShowCalendar(false); // Hide calendar after date selection
      };
    
      const disableFutureDates = ({ date }) => {
        const today = new Date();
        return date > today;
      };

    const data = [
        { name: "Jan", WhatsApp: 20, Email: 50, SMS: 60 },
        { name: "Feb", WhatsApp: 70, Email: 45, SMS: 18 },
        { name: "Mar", WhatsApp: 80, Email: 48, SMS: 19 },
        { name: "Apr", WhatsApp: 75, Email: 44, SMS: 17 },
        { name: "May", WhatsApp: 85, Email: 49, SMS: 18 },
        { name: "Jun", WhatsApp: 60, Email: 40, SMS: 46 },
        { name: "Jul", WhatsApp: 22, Email: 42, SMS: 15 },
        { name: "Aug", WhatsApp: 78, Email: 47, SMS: 18 },
        { name: "Sep", WhatsApp: 65, Email: 41, SMS: 97 },
        { name: "Oct", WhatsApp: 10, Email: 45, SMS: 19 },
        { name: "Nov", WhatsApp: 73, Email: 43, SMS: 16 },
        { name: "Dec", WhatsApp: 76, Email: 46, SMS: 18 }
      ];


    const [selectedRange, setSelectedRange] = useState("12 months");
    const [selectedFilter, setSelectedFilter] = useState("12 months");
    return (
      <div className="p-6 bg-white rounded-2xl shadow-md w-full border border-[#EAECF0">
        <h2 className="text-lg font-semibold">Recent Message Delivery Performance</h2>
        <p className="text-gray-500 text-sm mb-4">Monitor recent delivery rate across channels for optimal performance</p>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis domain={[10, 100]} />
            <Tooltip />
            {/* <Legend /> */}
            <Area type="monotone" dataKey="WhatsApp" stroke="#9A2444" fill="#9A2444" fillOpacity={0.1}  className="mt-[-50px]"/>
            <Line type="monotone" dataKey="WhatsApp" stroke="#FF4D4D" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="Email" stroke="#CB1E33" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="SMS" stroke="#383268" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
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
  }
  
