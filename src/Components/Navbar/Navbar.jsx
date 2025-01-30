import { useLocation } from "react-router-dom";
import { Icons, SideBarIcons } from "../../assets/assets";

const Navbar = () => {
  const wallet = [
    {
      balance: 0,
      currency: "$",
    },
  ];

  const location = useLocation();
  const routesMap = {
    "/campaigns": [SideBarIcons.homeIconActive, "Campaigns"],
    "/contacts": [SideBarIcons.homeIconActive, "Contacts"],
    "/templates": [SideBarIcons.homeIconActive, "Templates"],
    "/settings": [SideBarIcons.homeIconActive, "Settings"],
  };
  const breadcrumb = routesMap[location.pathname] || [
    SideBarIcons.homeIconActive,
  ];

  return (
    <div className="flex justify-between px-[31px] py-[19px] border-b border-b-[#F1F1F1] items-center">
      <div className="flex items-center gap-2">
        {/* Home Icon */}
        <img src={SideBarIcons.homeIconActive} alt="Home" />
        <img src={Icons.arrowRight} alt="Arrow Right" />
        {breadcrumb.length > 1 && (
          <>
            <span className="text-[#A3A3A3] text-[14px] font-medium">{breadcrumb[1]}</span>
          </>
        )}
      </div>
      <div className="bg-[#F1F1F1] flex items-center py-[7px] px-2 gap-2 rounded-[6px] cursor-pointer">
        <img src={Icons.emptyWallet} alt="wallet" />

        {wallet.map((item, index) => (
          <p key={index} className="text-[14px] font-medium">
            {item.currency} {item.balance.toFixed(2)}
          </p>
        ))}
        <img src={Icons.addWallet} alt="deposit" />
      </div>
    </div>
  );
};

export default Navbar;
