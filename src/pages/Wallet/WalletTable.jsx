import { useState } from "react";
import Button from "../../Components/buttons/transparentButton";
import { Icons } from "../../assets/assets";

const WalletTable = () => {
  const [walletData] = useState([
    {
      Date: "2024-10-10 12:30 PM",
      Description: "Wallet Top-Up",
      Amount: "+50 Credits",
      Status: "Successful",
    },
    {
      Date: "2024-10-10 12:30 PM",
      Description: "SMS Campaign Deduction",
      Amount: "-30 Credits",
      Status: "Successful",
    },
    {
      Date: "2024-10-10 01:00 PM",
      Description: "Monthly Subscription Fee",
      Amount: "-10 Credits",
      Status: "Successful",
    },
    {
      Date: "2024-10-10 03:30 PM",
      Description: "Wallet Top-Up",
      Amount: "+100 Credits",
      Status: "Processing",
    },
    {
      Date: "2024-10-10 05:00 PM",
      Description: "Email Campaign Deduction",
      Amount: "-50 Credits",
      Status: "Failed",
    },
    {
      Date: "2024-10-10 05:00 PM",
      Description: "Monthly Subscription Fee",
      Amount: "+50 Credits",
      Status: "Successful",
    },
  ]);

  const [showAll, setShowAll] = useState(false);

  const getStatusClass = (status) => {
    switch (status) {
      case "Successful":
        return "text-[#027A48] bg-[#ECFDF3]";
      case "Processing":
        return "text-[#B54708] bg-[#FFFAEB]";
      case "Failed":
        return "text-[#B42318] bg-[#FEF3F2]";
      default:
        return "";
    }
  };

  const getAmountClass = (amount) => {
    return amount.startsWith("+") ? "text-[#027A48]" : "text-[#B42318]";
  };

  const displayedData = showAll ? walletData : walletData.slice(0, 5);

  return (
    <div className="w-full rounded-[15px] pb-[40px] pt-[20px] px-[20px] flex flex-col gap-[20px] shadow-md border">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-[#3F3E3E] text-[18px] font-medium">
          Recent Transactions
        </h2>
        <Button
          label={showAll ? "Hide Transactions" : "View All Transactions"}
          onClick={() => setShowAll((prev) => !prev)}
          className="py-2 px-[16px] border border-[#C1BFD0] rounded-[8px] text-[#383268] text-[14px] font-medium hover:bg-[#383268] hover:text-white duration-300"
        />
      </div>

      {/* Table */}
      {walletData.length > 0 ? (
        <div className="overflow-x-scroll w-full scrollbar-hide">
          <table className="w-full text-left whitespace-nowrap border-collapse">
            <thead>
              <tr className="bg-[#F9FAFB] py-3 border-b border-top-radius border-b-[#EAECF0]">
                <th className="py-3 px-5 text-[#919090] text-[13px] font-medium">
                  Date
                </th>
                <th className="py-3 px-5 text-[#919090] text-[13px] font-medium">
                  Description
                </th>
                <th className="py-3 px-5 text-[#919090] text-[13px] font-medium">
                  Amount
                </th>
                <th className="py-3 px-5 text-[#919090] text-[13px] font-medium">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {displayedData.map((transaction, index) => (
                <tr key={index} className="border-b">
                  <td className="py-3 px-5 text-[14px] font-[300] text-[#666666]">
                    {transaction.Date}
                  </td>
                  <td className="py-3 px-5 text-[14px] font-[300] text-[#666666]">
                    {transaction.Description}
                  </td>
                  <td
                    className={`py-3 px-5 text-[14px] font-[300] ${getAmountClass(
                      transaction.Amount
                    )}`}
                  >
                    {transaction.Amount}
                  </td>
                  <td className="py-3 px-5">
                    <Button
                      label={transaction.Status}
                      className={`text-[14px] font-[300] border-none cursor-default w-[125px] ${getStatusClass(
                        transaction.Status
                      )}`}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-[24px] py-[20px]">
          <img
            src={Icons.emptyState}
            alt="No data"
            className="w-14 h-14 mb-4"
          />
          <div className="text-center">
            <p className="text-lg font-medium text-[#3F3E3E]">
              No Available Transaction
            </p>
            <p className="text-[#767676] text-sm">
              {"No transaction found. Start with topping up your wallet "}
            </p>
          </div>
          <Button
            label="Top-up Wallet"
            className="bg-[#383268] text-white rounded-[8px] py-2 px-[18px] hover:bg-[#41397c]"
          />
        </div>
      )}
    </div>
  );
};

export default WalletTable;
