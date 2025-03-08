import { useEffect, useRef, useState, useMemo } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Icons } from "@/assets/assets";
import GroupsContactsTable from "./GroupsContactsTable";
// import CreateContactModal from "./CreateContactModal";
import { useRecipients } from "@/redux/UseRecipient";


import Button from "@/Components/buttons/transparentButton";
import ManuallyAddContact from "./ManuallyAddContact";

const FolderDetailModal = ({
  open,
  onClose,
  folder,
  setOpenCreateFormModal,
  openCreateFormModal,
  setGroups,
  closeParentModal
}) => {
  const [openManuallAddContact, setOpenManuallyAddContact] = useState(false);
  const [contacts, setContacts] = useState(folder.contacts || []);
  const { recipients, setRecipients } = useRecipients();


  const modalRef = useRef(null);
  const createContactModalRef = useRef(null); // Ref for CreateContactModal
  const createFormModalRef = useRef(null);
  null;
  const isMobile = useMediaQuery("(max-width: 768px)");
  const dragRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target) &&
        (!openManuallAddContact ||
          (createContactModalRef.current &&
            !createContactModalRef.current.contains(event.target)))
      ) {
        onClose();
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, onClose, openManuallAddContact]);

  const handleDragStart = (e) => {
    if (!isMobile) return;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    dragRef.current = { startY: clientY };
  };

  const handleDragMove = (e) => {
    if (!dragRef.current || !isMobile || !modalRef.current) return;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const delta = clientY - dragRef.current.startY;

    if (delta > 100) {
      onClose();
      dragRef.current = null;
    } else {
      modalRef.current.style.transform = `translateY(${Math.max(0, delta)}px)`;
    }
  };

  const handleDragEnd = () => {
    if (!modalRef.current || !isMobile) return;
    modalRef.current.style.transform = "";
    dragRef.current = null;
  };

  const addNewContact = (newContact) => {
    setContacts((prevContacts) => [
      ...prevContacts,
      { ...newContact, id: prevContacts.length + 1 }, // Ensure unique ID
    ]);
    setOpenManuallyAddContact(false);
  };

  const handleAddRecipient = () => {
    setRecipients((prevRecipients) => [
      ...prevRecipients,
      ...contacts,
    ]); 
    onClose(); 
    closeParentModal()
  };

  const columns = useMemo(() => [
    {
      Header: "First Name",
      accessor: "firstName",
    },
    {
      Header: "Last Name",
      accessor: "lastName",
    },
    {
      Header: "Email Address",
      accessor: "email",
    },
    {
      Header: "Phone Number",
      accessor: "phone",
    },
  ]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#C7C7C74D] backdrop-blur-[8.1px]">
      <div
        ref={modalRef}
        className={`fixed bg-white overflow-y-scroll hide-scrollBar ${
          isMobile
            ? "inset-x-0 bottom-0 rounded-t-[40px] p-3"
            : "top-4 bottom-4 right-3 w-[1000px] rounded-[30px] p-[22px]"
        }`}
        onTouchStart={handleDragStart}
        onMouseDown={handleDragStart}
        onTouchMove={handleDragMove}
        onMouseMove={handleDragMove}
        onTouchEnd={handleDragEnd}
        onMouseUp={handleDragEnd}
      >
        {isMobile && (
          <div className="w-[81px] h-2 bg-gray-300 rounded-full mx-auto mt-4" />
        )}
        <div className="flex  flex-col justify-between h-full max-md:h-full w-full gap-y-[30px] pb-[22px]">
          <div className="flex flex-col gap-y-6">
            <div className="flex items-center justify-between max-md:flex-wrap gap-y-4">
              <div>
                <h2 className="text-[18px] font-medium text-[#1A1A1A]">
                  {folder?.name || "No Folder Selected"}
                </h2>
                <p className="text-[#767676] text-[14px] font-normal">
                  Explore and add from your uploaded lists to build this group.
                </p>
              </div>
              <div className="flex items-center gap-2 px-[10px] rounded-[8px] border border-[#D0D5DD] w-[351px] h-[47px] max-sm:full">
                <img
                  src={Icons.searchIcon}
                  alt="search"
                  className="w-[20px] h-[20px]"
                />
                <input
                  type="text"
                  placeholder="Search by name, email"
                  className="p-1 outline-none w-full h-full"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col h-full justify-between gap-3">
            <GroupsContactsTable
              columns={columns}
              data={contacts}
              isOpenCreateContactModal={() => setOpenManuallyAddContact(true)}
            />

            <div className="self-end align-end flex items-center gap-3 pb-[22px]">
              <Button
                label="Cancel"
                onClick={onClose}
                className="text-[#383268] text-[14px] font-normal border border-[#C1BFD0] rounded-[8px] 
           hover:bg-[#383268] hover:text-white transition-all duration-300"
              />

              <Button
                label="Add to Recipients"
                className="rounded-[8px] bg-[#383268] text-white"
                disabled={contacts.length === 0}
                onClick={ handleAddRecipient}
              />
            </div>
          </div>
        </div>
      </div>

      {openManuallAddContact && (
        <ManuallyAddContact
          onSubmit={addNewContact}
          isOpenModal={openManuallAddContact}
          onClose={() => setOpenManuallyAddContact(false)}
          group={folder?.name}
          contacts={contacts}
        />
      )}
    </div>
  );
};

export default FolderDetailModal;
