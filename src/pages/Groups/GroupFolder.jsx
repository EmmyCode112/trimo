import { Icons } from "../../assets/assets";
import "./Groups.css";

const GroupFolder = ({
  groupName,
  totalContact,
  toggleSelection,
  selectedFolders,
  groupId,
}) => {
  const isSelected = selectedFolders.includes(groupId);
  return (
    <div className="flex folder-con flex-col gap-2 w-full sm:w-1/2 lg:w-1/4 cursor-pointer">
      <div className="relative folder-img-con w-full h-auto sm:w-[184px] sm:h-[115px]">
        <img
          src={Icons.FolderIcon}
          alt="folder"
          className="w-full h-full relative"
        />
        <img
          src={isSelected ? Icons.checkboxActive : Icons.checkbox}
          onClick={() => toggleSelection(groupId)}
          alt="checkbox"
          className="absolute top-[12px] left-[10px] cursor-pointer"
        />
      </div>
      <p className="text-[#484848] text-[16px] font-normal ">
        {groupName}
      </p>
      <div className="flex items-center gap-x-1 mt-1">
        <img src={Icons.contacts2Users} alt="users" />
        <p className="text-[#767676] text-sm font-normal">{totalContact}</p>
      </div>
    </div>
  );
};
export default GroupFolder;
