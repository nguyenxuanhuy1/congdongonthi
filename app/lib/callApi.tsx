"use client";

const BASE_URL = process.env.NEXT_PUBLIC_DB_URL!;


function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;

  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(name + "="));

  return match ? decodeURIComponent(match.split("=")[1]) : null;
}

function setCookie(name: string, value: string, maxAge: number) {
  document.cookie = [
    `${name}=${encodeURIComponent(value)}`,
    "path=/",
    `max-age=${maxAge}`,
    "samesite=lax",
  ].join("; ");
}

function removeCookie(name: string) {
  document.cookie = [
    `${name}=`,
    "path=/",
    "max-age=0",
    "samesite=lax",
  ].join("; ");
}


async function refreshAccessToken(): Promise<string | null> {
  const refresh_token = getCookie("refresh_token");
  if (!refresh_token) return null;

  const res = await fetch(`${BASE_URL}/api/auth/refresh`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refresh_token }),
  });

  if (res.status === 400 || res.status === 401) {
    removeCookie("access_token");
    removeCookie("refresh_token");
    return null;
  }

  if (!res.ok) {
    throw new Error("Refresh token failed");
  }

  const data = await res.json();

  const newAccessToken = data?.accessToken;
  const newRefreshToken = data?.refreshToken;

  if (!newAccessToken || !newRefreshToken) {
    removeCookie("access_token");
    removeCookie("refresh_token");
    return null;
  }

  setCookie("access_token", newAccessToken, 3600);
  setCookie("refresh_token", newRefreshToken, 3600);

  return newAccessToken;
}

export async function callApi<T>(
  url: string,
  options: RequestInit = {},
  retry = true
): Promise<T> {
  const accessToken = getCookie("access_token");

  if (!accessToken) {
    throw new Error("Bạn cần đăng nhập để tiếp tục!");
  }

  const isFormData = options.body instanceof FormData;

  const headers: Record<string, string> = {
    Authorization: `Bearer ${accessToken}`,
    ...(options.headers as Record<string, string>),
  };

  if (!isFormData) {
    headers["Content-Type"] = "application/json";
  }

  const res = await fetch(`${BASE_URL}${url}`, {
    ...options,
    headers,
  });

  if (res.status === 401 && retry) {
    const newToken = await refreshAccessToken();

    if (!newToken) {
      throw new Error("Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại!");
    }

    return callApi<T>(url, options, false);
  }

  if (!res.ok) {
    throw new Error(await res.text());
  }

  return res.json();
}
