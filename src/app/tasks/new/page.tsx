"use client";
import { Button, Card, Input, Textarea } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import React from "react";
import { useTasks } from "@/app/context/TasksContext";
import { FaArrowLeft } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";

function AddTaskPage() {
  const { register, handleSubmit } = useForm();

  const { createTask } = useTasks();

  const router = useRouter();
  const onSubmit = handleSubmit((data) => {
    createTask(data);
    router.push("/tasks");
  });
  return (
    <>
      <Link href={"/tasks"} className="">
        <h1 className="text-white mt-4 ml-4 fixed hover:underline flex items-center">
          <FaArrowLeft className="mr-2" />
          Go back to tasks
        </h1>
      </Link>
      <div className=" w-[100vw] max-w-[100vw] h-[calc(100vh-65px)] flex items-center justify-center overflow-x-hidden">
        <Card className="max-w-md w-full">
          <form
            onSubmit={onSubmit}
            action=""
            className="  w-full mx-auto p-4 flex-col bg-neutral-900 "
          >
            <h1 className="flex justify-start text-start font-bold text-2xl my-4">
              Add Task
            </h1>
            <Input
              label="Title"
              placeholder="Enter your title"
              className="w-full my-4"
              autoFocus
              isRequired
              {...register("title")}
            />
            <Textarea
              label="Description"
              placeholder="Enter your description"
              className="w-full my-4"
              isRequired
              {...register("description")}
            />
            <Button className="flex mr-0" type="submit">
              {" "}
              Save
            </Button>
          </form>
        </Card>
      </div>
    </>
  );
}

export default AddTaskPage;
