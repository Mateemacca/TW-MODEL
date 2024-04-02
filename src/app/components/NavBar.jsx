"use client";
import React from "react";
import Link from "next/link";
import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
  NavbarContent,
  NavbarItem,
  Button,
  Spinner,
  Avatar,
} from "@nextui-org/react";
import { TWLogo } from "./TWLogo";
import LoginModal from "./LoginModal";
import { useAuth } from "../context/AuthContext";
import AvatarDropdown from "./AvatarDropdown";
import LoadingOverlay from "./LoadingOverlay";

export default function NavBar() {
  const { user, loading, isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const menuItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];

  return (
    <Navbar
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      isBlurred={true}
    >
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
      </NavbarContent>

      <NavbarBrand className="flex sm:justify-start justify-center">
        <Link
          color="foreground"
          className="flex justify-center items-center"
          href={"/"}
        >
          <TWLogo />
        </Link>
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" className="font-semibold" href="/analytics">
            Analytics
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/tasks" color="foreground" className="font-semibold">
            Tasks
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" className="font-semibold" href="#">
            Integrations
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className=" " justify="end">
        <NavbarItem className="">
          {/* {loading ? (
            <Spinner size="sm" color="white" />
          ) : isAuthenticated ? (
            <Link href={"/profile"}>{user.email}</Link>
          ) : (
            <LoginModal />
          )} */}
          {isAuthenticated ? (
            <div className="flex flex-row items-center gap-4">
              {/* <Link href={"/profile"} className="text-white">
                {user.username}
              </Link> */}
              <AvatarDropdown user={user} />
              {/* <Button
                onClick={() => {
                  logout();
                }}
                color="danger"
              >
                Logout
              </Button> */}
            </div>
          ) : (
            <LoginModal />
          )}
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem className="w-fit" key={`${item}-${index}`}>
            <Link
              className="w-full"
              color={
                index === 2
                  ? "warning"
                  : index === menuItems.length - 1
                  ? "danger"
                  : "foreground"
              }
              href="#"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
