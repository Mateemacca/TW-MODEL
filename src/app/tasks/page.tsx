"use client";

import React, { useEffect } from "react";
import { useTasks } from "../context/TasksContext.jsx";

import TaskCard from "../components/TaskCard.jsx";
import { IoMdAdd } from "react-icons/io";
import Link from "next/link.js";
import { useAuth } from "../context/AuthContext.jsx";
import LoadingOverlay from "../components/LoadingOverlay.jsx";

function TasksPage() {
  const { getTasks, tasks } = useTasks();

  useEffect(() => {
    getTasks();
  }, []);

  const { loading } = useAuth();
  if (tasks.length === 0) {
    return (
      <div className="h-[calc(100vh-65px)] w-[100vw] my-auto flex flex-col justify-center items-center">
        {loading ? (
          <LoadingOverlay />
        ) : (
          <>
            <h1 className="text-center text-4xl my-4"> There are no tasks.</h1>
            <Link
              href="/tasks/new"
              className="p-2 bg-zinc-800  flex items-center text-center rounded-xl hover:underline"
              replace={true}
            >
              {/* <Button className="my-2"> */}
              <IoMdAdd />
              Add task here
              {/* </Button> */}
            </Link>
          </>
        )}
      </div>
    );
  }

  return (
    <div>
      {loading ? (
        <LoadingOverlay />
      ) : (
        <section className="md:max-w-[975px] md:mx-auto">
          <div className="">
            <Link
              href="/tasks/new"
              className="p-2 bg-zinc-800  flex items-center text-center rounded-xl hover:underline w-fit my-4  active:scale-95 transition duration-100 ease-in-out"
              replace={true}
            >
              <IoMdAdd />
              Add task here
            </Link>
          </div>
          <div className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 gap-2  my-auto">
            {tasks.map((task: any) => (
              <TaskCard task={task} key={task._id} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default TasksPage;
