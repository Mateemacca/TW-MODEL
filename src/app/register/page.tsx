"use client";

import React, { useEffect } from "react";
import { Button, Input } from "@nextui-org/react";
import toast from "react-hot-toast";

export default function Register() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <form
        className="w-full max-w-md p-4 border-gray-300 rounded-lg shadow-md bg-[#18181b] space-y-4"
        autoComplete="off"
      >
        <h1 className="text-2xl font-bold">Register</h1>
        <Input
          size={"md"}
          type="text"
          label="Name"
          placeholder="Enter your name"
        />

        <Input
          size={"md"}
          type="email"
          label="Email"
          placeholder="Enter your email"
        />
      </form>
    </div>
  );
}
