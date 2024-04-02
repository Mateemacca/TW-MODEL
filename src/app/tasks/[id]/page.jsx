"use client";
import { Button, Card, Input, Spinner, Textarea } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import { useTasks } from "@/app/context/TasksContext";
import { FaArrowLeft } from "react-icons/fa";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";

function EditTaskPage() {
  const { register, handleSubmit, setValue } = useForm();
  const { createTask, getTask, isLoading, updateTask } = useTasks();
  const [taskData, setTaskData] = useState({});
  console.log(isLoading);
  const params = useParams();
  useEffect(() => {
    async function loadTask() {
      if (params.id) {
        const task = await getTask(params.id);
        setTaskData(task);
      }
    }
    loadTask();
  }, [params.id]);

  const router = useRouter();
  const onSubmit = handleSubmit((data) => {
    updateTask(params.id, data);
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
              Edit Task
            </h1>
            {isLoading ? (
              <Spinner
                color="white"
                size="lg"
                className="w-full h-full my-auto mx-auto"
              />
            ) : (
              <>
                <Input
                  label="Title"
                  placeholder="Enter your title"
                  className="w-full my-4"
                  defaultValue={taskData.title}
                  isRequired
                  {...register("title")}
                />
                <Textarea
                  label="Description"
                  placeholder="Enter your description"
                  className="w-full my-4"
                  isRequired
                  defaultValue={taskData.description}
                  {...register("description")}
                />

                <Button className="flex mr-0" type="submit">
                  Save
                </Button>
              </>
            )}
          </form>
        </Card>
      </div>
    </>
  );
}

export default EditTaskPage;
