"use client";

import { Spin } from "antd";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const dynamic = "force-dynamic";

export default function XacThucPage() {
  const router = useRouter();
  const domain = process.env.NEXT_PUBLIC_DB_URL;

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get("accessToken");
    const refreshToken = params.get("refreshToken");

    if (!accessToken || !refreshToken) {
      router.replace(`${domain}/oauth2/authorization/google`);
      return;
    }

    document.cookie = [
      `access_token=${accessToken}`,
      "path=/",
      "max-age=3600",
      "samesite=lax", 
    ].join("; ");

    document.cookie = [
      `refresh_token=${refreshToken}`,
      "path=/",
      "max-age=604800",
      "samesite=lax",
    ].join("; ");

    window.history.replaceState({}, "", "/");
    router.replace("/");
  }, [router, domain]);

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
