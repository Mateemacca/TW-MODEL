"use client";

import React from "react";
import { MdKeyboardDoubleArrowDown } from "react-icons/md";

import "./home.css";
import { Card, CardBody, Image } from "@nextui-org/react";
import Link from "next/link";
import { useAuth } from "./context/AuthContext.jsx";
import LoadingOverlay from "./components/LoadingOverlay";

const HomePage = () => {
  const { loading } = useAuth();
  return (
    <>
      {loading ? (
        <LoadingOverlay />
      ) : (
        <>
          <div className="relative h-screen w-screen overflow-x-hidden top-[-65px]">
            <video
              className="absolute top-0 left-0 w-full h-full object-cover z-0 filter grayscale"
              src="/messiloop.mp4"
              autoPlay
              muted
              loop
            />
            <div className="text-white text-4xl z-10 absolute bottom-24 left-24 leading-loose  tracking-widest typewriter">
              <h1 className="line1">VISUALIZING</h1>
              <h1 className="line2">YOUR</h1>
              <h1 className="line3">SUCCESS</h1>
            </div>
            <Link
              href="/#section2"
              className="text-white absolute bottom-24 right-24 icon-container cursor-pointer button-container glow"
            >
              <MdKeyboardDoubleArrowDown size={64} className="animated-icon" />
            </Link>
          </div>

          <div
            className="flex justify-center items-center z-10 text-white bg-white text-center w-screen h-screen "
            id="section2"
          >
            {/*   <h1 className="text-4xl font-bold">Home Page</h1>*/}
            <Card className="w-[95%] h-[85%] p-0">
              <div className="flex items-center my-auto justify-center w-fit">
                <Image src="./laptop.png" width={900} className="my-auto" />
                <div className="flex flex-col items-start max-w-[33%]">
                  <h1 className="text-start text-4xl font-bold">
                    A New generation
                  </h1>
                  <p className="text-start text-2xl">
                    Ofrecemos a los clubes una solucion de analisis de datos
                    rapida, efectiva y altamente interactiva.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </>
      )}
    </>
  );
};

export default HomePage;
