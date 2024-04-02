import React from "react";
import { Spinner } from "@nextui-org/react";
export default function LoadingOverlay() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 9999,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backdropFilter: "blur(5px)",
      }}
    >
      <div>
        <Spinner color="white" size="lg" />.
      </div>{" "}
    </div>
  );
}
