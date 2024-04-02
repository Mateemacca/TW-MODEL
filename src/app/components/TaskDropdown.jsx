import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  cn,
} from "@nextui-org/react";
import { FaEdit, FaRegCopy } from "react-icons/fa";
import { FaEllipsisVertical } from "react-icons/fa6";
import { FaTrashCan } from "react-icons/fa6";
import { useTasks } from "../context/TasksContext";
import { toast } from "react-hot-toast";
import Link from "next/link";

function TaskDropdown({ task }) {
  const copyLinkToClipboard = () => {
    const link = `http://localhost:3000/tasks/${task._id}`;
    navigator.clipboard
      .writeText(link)
      .then(() => {
        toast.success("Link copied to clipboard");
      })
      .catch((error) => {
        console.error("Error copying to clipboard:", error);
        toast.error("Failed to copy link");
      });
  };
  const { deleteTask } = useTasks();
  const iconClasses =
    "text-xl text-default-500 pointer-events-none flex-shrink-0";
  return (
    <Dropdown backdrop="opaque" placement="bottom-end">
      <DropdownTrigger className="">
        <Button variant="flat" isIconOnly className=" z-20">
          <FaEllipsisVertical color="white" />
        </Button>
      </DropdownTrigger>
      <DropdownMenu variant="faded" aria-label="Dropdown menu with icons">
        <DropdownItem
          key="copy"
          onClick={copyLinkToClipboard}
          startContent={<FaRegCopy className={iconClasses} />}
        >
          Copy link
        </DropdownItem>
        <DropdownItem
          href={`/tasks/${task._id}`}
          key="edit"
          startContent={<FaEdit className={iconClasses} />}
        >
          {/* <Link href={`/tasks/${task._id}`}> */}
          Edit task
          {/* </Link> */}
        </DropdownItem>
        <DropdownItem
          key="delete"
          className="text-danger"
          color="danger"
          onClick={() => {
            deleteTask(task._id);
          }}
          startContent={
            <FaTrashCan className={cn(iconClasses, "text-danger")} />
          }
        >
          Delete task
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}

export default TaskDropdown;
