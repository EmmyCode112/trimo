import Button from "../../Components/buttons/transparentButton";
import { Icons } from "../../assets/assets";
import WalletTable from "./WalletTable";
import { useState } from "react";
import "./Wallet.css";

const Wallet = () => {
  const [lowBalance, setLowBalance] = useState(true);

  return (
    <div>
      {lowBalance && (
        <div className="bg-[#FAE9EB] gap-[16px] w-full flex justify-center border-y items-center border-y-[#CB1E33] relative low-balance">
          <p className="text-[#CB1E33]  font-medium text-[15px]">
            🚨 Your balance is getting low! Don’t let your momentum stop—top up
            today.
          </p>
          <img
            src={Icons.croseIcon}
            alt=""
            onClick={() => setLowBalance(false)}
            className="w-[20px] cursor-pointer h-[20px] flex-end absolute right-0"
          />
        </div>
      )}

      <div className="px-[31px] py-[32px]">
        <header>
          <h1 className="text-[#1A1A1A] text-[24px] font-medium">
            Wallet Overview
          </h1>
          <p className="text-[#767676] font-normal text-[15px]">
            Manage your API keys securely for accessing Triimo’s services.
          </p>
        </header>

        <card className="shadow-md border border-[#F1F1F1] rounded-[15px] py-[25px] px-[22px] flex flex-col gap-[10px] w-[508px] mt-[30px] wallet-balance-card">
          <div className="flex justify-between">
            <p className="text-[#767676] text-[14px]">Available Balance</p>
            <button className="bg-[#FAFAFA] text-[14px] py-1 px-[16px] rounded-[7px] text-[#767676]">
              0 units
            </button>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-[#1A1A1A] text-[48px] font-semibold balance">
              N 0.00
            </p>
            <Button
              label="Top-up Wallet"
              className="bg-[#383268] text-white rounded-[8px] py-2 px-[18px] hover:bg-[#41397c] max-sm:py-1 max-sm:px-[12px]"
            />
          </div>
          <ul className="flex gap-[10px] text-[#767676] text-[13px]">
            <li>SMS Credits: 300</li>
            <li>Email Credits: 300</li>
            <li>WhatsApp Credits: 300</li>
          </ul>
        </card>

        <div className="mt-[30px]">
          <WalletTable />
        </div>
      </div>
    </div>
  );
};

export default Wallet;
