import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";

//nextui
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Checkbox,
  Input,
  Link,
  Spinner,
} from "@nextui-org/react";

// API

// auth
import { useForm } from "react-hook-form";

//icons
import { MailIcon } from "./icons/MailIcon.jsx";
import { LockIcon } from "./icons/LockIcon.jsx";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FiLogIn } from "react-icons/fi";
import { HiPencilAlt } from "react-icons/hi";
import { BsInfoLg } from "react-icons/bs";
import { EyeFilledIcon } from "./icons/EyeFilledIcon.jsx";
import { EyeSlashFilledIcon } from "./icons/EyeSlashFilledIcon.jsx";
import LoadingOverlay from "./LoadingOverlay.jsx";
import { loginRequest } from "@/api/auth.js";

export default function LoginModal() {
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = React.useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit(async (values, error) => {
    setIsLoading(true);
    try {
      await signUp(values);
      console.log(error);
      if (!error) onRegisterClose();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  });
  const onSubmitLogin = handleSubmit(async (user) => {
    setIsLoading(true);
    try {
      const res = await signIn(user);
      console.log(res);
      if (res === true) onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  });

  const toggleVisibility = () => setIsVisible(!isVisible);
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const {
  //   isOpen: loginModalOpen,
  //   onOpen: onLoginOpen,
  //   onClose: onLoginClose,
  // } = useDisclosure();
  const {
    isOpen: registerModalOpen,
    onOpen: onRegisterOpen,
    onClose: onRegisterClose,
  } = useDisclosure();

  const handleRegisterClick = () => {
    onClose();
    onRegisterOpen();
  };

  const handleLoginClick = () => {
    onRegisterClose();
    onOpen();
  };

  const { signUp, isAuthenticated, errors: registerErrors } = useAuth();
  const { signIn, errors: signInErrors } = useAuth();
  useEffect(() => {
    if (isAuthenticated) onRegisterClose();
  }, [isAuthenticated]);
  useEffect(() => {
    if (isAuthenticated) onClose();
  }, [isAuthenticated]);

  return (
    <>
      <div className="flex gap-2">
        <Button
          onClick={onOpen}
          color="default"
          className="font-semibold"
          variant="flat"
        >
          <FiLogIn className="hidden sm:flex" /> <p className="">Log in</p>
        </Button>
        <Button
          onClick={handleRegisterClick}
          color="default"
          className="font-semibold hidden md:flex"
          variant="flat"
        >
          <HiPencilAlt /> Sign Up
        </Button>
      </div>
      {/* Modal de inicio de sesion */}
      <Modal isOpen={isOpen} onClose={onClose} placement="center">
        <ModalContent>
          <form onSubmit={onSubmitLogin}>
            <ModalHeader className="flex flex-col gap-1 text-center">
              Log in
            </ModalHeader>
            {signInErrors.map((error, i) => (
              <div
                className="bg-red-500 p-2 text-white text-center w-[80%] mx-auto rounded-md my-3"
                key={i}
              >
                <span>{error}</span>
              </div>
            ))}
            <ModalBody>
              <Input
                autoFocus
                endContent={
                  <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
                label="Email"
                placeholder="Enter your email"
                variant="bordered"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <p className=" text-red-500 ">Email is required</p>
              )}
              <Input
                autoFocus
                label="Password"
                placeholder="***********"
                variant="bordered"
                size={"md"}
                endContent={
                  <button
                    className="focus:outline-none"
                    type="button"
                    onClick={toggleVisibility}
                  >
                    {isVisible ? (
                      <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    ) : (
                      <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    )}
                  </button>
                }
                type={isVisible ? "text" : "password"}
                className="w-full"
                {...register("password", { required: true })}
              />
              {errors.password && (
                <p className=" text-red-500 ">Password is required</p>
              )}
              <hr className="border-t border-gray-700 my-1 w-1/2 mx-auto" />
              <Button
                color="default"
                type="button"
                variant="flat"
                onClick={handleRegisterClick}
              >
                <HiPencilAlt /> Or register here
              </Button>
              <hr className="border-t border-gray-700 my-1 w-1/2 mx-auto" />
              <div className="flex py-2 px-1 justify-between">
                <Checkbox
                  color="default"
                  classNames={{
                    label: "text-small",
                  }}
                >
                  Remember me
                </Checkbox>
                <Link color="primary" href="#" size="sm">
                  Forgot password?
                </Link>
              </div>
              <p
                className="mx-auto flex items-center text-gray-200 font-semibold rounded bg-[#2f2f34] pr-1"
                color="default"
              >
                <BsInfoLg className="" /> You can login with:{" "}
              </p>
              <div className="flex px-1 gap-4 justify-center">
                <Button size="lg" isIconOnly>
                  <FcGoogle size={32} />
                </Button>
                <Button size="lg" isIconOnly>
                  <FaGithub size={32} />
                </Button>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onPress={onClose}>
                Close
              </Button>
              <Button
                type="submit"
                color="default"
                className="font-semibold"
                variant="flat"
              >
                {isLoading ? <Spinner /> : "Log in"}
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
        {isLoading && <LoadingOverlay />}
      </Modal>

      {/* Modal de registro */}
      <Modal
        isOpen={registerModalOpen}
        onClose={onRegisterClose}
        placement="center"
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1 text-center">
            Register
          </ModalHeader>
          {registerErrors.length > 0 &&
            registerErrors.map((error, i) => (
              <div className=" bg-red-500 p-2 text-white my-1" key={i}>
                <span>{error}</span>
              </div>
            ))}
          <form onSubmit={onSubmit}>
            <ModalBody>
              <Input
                autoFocus
                endContent={
                  <FaUser className="text-2xl text-default-400 pointer-events-none flex-shrink-0 my-auto" />
                }
                label="Username"
                placeholder="Example"
                variant="bordered"
                name="username"
                {...register("username")}
              />
              {errors.username && (
                <p className=" text-red-500 ">Username is required</p>
              )}
              <Input
                autoFocus
                endContent={
                  <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0 my-auto" />
                }
                label="Email"
                placeholder="example@example.com"
                variant="bordered"
                name="email"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <p className=" text-red-500 ">Email is required</p>
              )}
              <Input
                autoFocus
                label="Password"
                placeholder="***********"
                variant="bordered"
                name="password"
                size={"md"}
                endContent={
                  <button
                    className="focus:outline-none"
                    type="button"
                    onClick={toggleVisibility}
                  >
                    {isVisible ? (
                      <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    ) : (
                      <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    )}
                  </button>
                }
                type={isVisible ? "text" : "password"}
                className="w-full"
                {...register("password", { required: true })}
              />
              {errors.password && (
                <p className=" text-red-500 ">Password is required</p>
              )}
              <hr className="border-t border-gray-700 my-1 w-1/2 mx-auto" />
              <Button
                color="default"
                className="font-semibold"
                type="button"
                variant="flat"
                onClick={handleLoginClick}
              >
                <FiLogIn className="mr-1" /> Or login here
              </Button>
              <hr className="border-t border-gray-700 my-1 w-1/2 mx-auto" />
              <div className="flex py-2 px-1 justify-between">
                <Checkbox color="default" classNames={{ label: "text-small" }}>
                  I agree to the terms and conditions
                </Checkbox>
              </div>
              <p
                className="mx-auto flex items-center text-gray-200 font-semibold rounded bg-[#2f2f34] pr-1"
                color="default"
              >
                <BsInfoLg className="" /> You can register with:{" "}
              </p>
              <div className="flex px-1 gap-4 justify-center">
                <Button size="lg" isIconOnly>
                  <FcGoogle size={32} />
                </Button>
                <Button size="lg" isIconOnly>
                  <FaGithub size={32} />
                </Button>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onClick={onClose}>
                Close
              </Button>
              <Button
                color="default"
                className="font-semibold"
                variant="flat"
                type="submit"
              >
                {isLoading ? <Spinner /> : "Register"}
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
        {isLoading && <LoadingOverlay />}
      </Modal>
    </>
  );
}
