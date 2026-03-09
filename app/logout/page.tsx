"use client";

import { useEffect } from "react";
import { Spin } from "antd";

export default function LogoutPage() {

  useEffect(() => {

    document.cookie = [
      "access_token=",
      "path=/",
      "max-age=0",
      "samesite=lax",
    ].join("; ");


    document.cookie = [
      "refresh_token=",
      "path=/",
      "max-age=0",
      "samesite=lax",
    ].join("; ");
    window.location.href = "/";
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Spin size="large" />
    </div>
  );
}
