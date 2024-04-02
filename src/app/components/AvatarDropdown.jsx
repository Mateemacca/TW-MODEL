import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
  User,
} from "@nextui-org/react";

import { useAuth } from "../context/AuthContext";
import Link from "next/link";
function AvatarDropdown({ user }) {
  const { logout } = useAuth();
  return (
    <div>
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Avatar
            isBordered
            as="button"
            className="transition-transform"
            src="https://avatarfiles.alphacoders.com/199/199805.jpg"
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="Profile Actions" variant="flat">
          <DropdownItem key="profile" className="h-14 gap-2">
            <p className="font-semibold">Signed in as</p>
            <p className="font-semibold text-default-500">{user.email}</p>
          </DropdownItem>

          <DropdownItem key="help_and_feedback">
            <div style={{ width: "100%" }}>
              <Link href="/tasks" style={{ display: "block", width: "100%" }}>
                My tasks
              </Link>
            </div>
          </DropdownItem>
          <DropdownItem
            key="logout"
            onClick={() => {
              logout();
            }}
            color="danger"
          >
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}

export default AvatarDropdown;
