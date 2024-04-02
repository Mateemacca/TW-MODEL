import React from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  User,
} from "@nextui-org/react";
import TaskDropdown from "../components/TaskDropdown";
import { format } from "date-fns";
import { FaTrashCan } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";

function TaskCard({ task }) {
  return (
    <Card className="max-w-md relative ">
      {/* Botón en la esquina superior derecha */}
      {/* <Button
        color="danger"
        size="sm"
        className="absolute top-4 right-4 z-20"
        isIconOnly
      >
        <FaTrashCan color="#18181b" size={16} />
      </Button>
      <Button
        color="primary"
        size="sm"
        className="absolute top-4 right-14 z-20"
        isIconOnly
      >
        <FaEdit color="black" size={16} />
      </Button> */}
      {/* Contenido de la tarjeta */}
      <CardHeader className="flex justify-between">
        <User
          name={task.user.username}
          description={task.user.email}
          avatarProps={{
            src: "https://avatarfiles.alphacoders.com/199/199805.jpg",
          }}
        />
        <TaskDropdown task={task} />
      </CardHeader>
      <Divider />
      <CardBody>
        <h1 className="text-2xl font-bold">{task.title}</h1>
        <p className="text-lg">{task.description}</p>
      </CardBody>
      <Divider />
      <CardFooter>
        <p className="text-default-500">
          {format(new Date(task.updatedAt), "dd/MM/yyyy HH:mm")}
        </p>
      </CardFooter>
    </Card>
  );
}

export default TaskCard;
