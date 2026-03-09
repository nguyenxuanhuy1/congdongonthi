"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Drawer, Spin } from "antd";
import {
  DownOutlined,
  LogoutOutlined,
  MenuOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { menuList } from "./menu";
import ButtonCustom from "../../Custom/button";
import { getUserInfo } from "./../../../lib/auth";
import DropdownCustom from "../../Custom/dropdown";

type UserUI = {
  username: string;
  avatar: string;
};

type Props = {
  isMobile?: boolean;
  isDesktop?: boolean;
};

export default function MenuClient({
  isMobile = false,
  isDesktop = false,
}: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const domain = process.env.NEXT_PUBLIC_DB_URL;

  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<UserUI | null>(null);
  const [loading, setLoading] = useState(true);

  const isLogin = !!user;

  useEffect(() => {
    let isMounted = true;

    const fetchUser = async () => {
      try {
        const data = await getUserInfo();
        if (isMounted) setUser(data);
      } catch {
        if (isMounted) setUser(null);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchUser();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleLogout = () => {
    router.push("/logout");
  };

  const renderMenu = (onClick?: () => void) => (
    <ul>
      {menuList.map((item) => {
        const isActive =
          pathname === item.path ||
          (item.path !== "/" && pathname.startsWith(item.path));

        return (
          <li
            key={item.path}
            className={isActive ? "active" : ""}
            onClick={onClick}
          >
            <Link href={item.path}>{item.name}</Link>
          </li>
        );
      })}
    </ul>
  );

  /* ================= DESKTOP ================= */

  if (isDesktop) {
    if (loading) {
      return (
        <div style={{ width: 40, display: "flex", justifyContent: "center" }}>
          <Spin size="small" />
        </div>
      );
    }

    if (isLogin && user) {
      return (
        <DropdownCustom
          placement="bottomRight"
          trigger={
            <span className="avatar-wrapper-header">
              <img
                src={user.avatar}
                alt="avatar"
                className="avatar-img"
              />
              <span className="avatar-down">
                <DownOutlined />
              </span>
            </span>
          }
          items={[
            {
              key: "profile",
              label: "Trang cá nhân",
              icon: <UserOutlined />,
              onClick: () => router.push("/trang-ca-nhan"),
            },
            {
              key: "logout",
              label: "Đăng xuất",
              icon: <LogoutOutlined />,
              danger: true,
              onClick: handleLogout,
            },
          ]}
        />
      );
    }

    return (
      <Link
        href={domain + `/oauth2/authorization/google`}
        style={{ textDecoration: "none" }}
      >
        <ButtonCustom className="login-btn">Đăng nhập</ButtonCustom>
      </Link>
    );
  }

  /* ================= MOBILE ================= */

  if (!isMobile) {
    return <>{renderMenu()}</>;
  }

  return (
    <>
      <MenuOutlined className="bars" onClick={() => setOpen(true)} />

      <Drawer
        placement="left"
        open={open}
        onClose={() => setOpen(false)}
        width="80%"
        title="Menu"
      >
        <div className="drawer-menu">
          {renderMenu(() => setOpen(false))}

          {loading ? (
            <div style={{ marginTop: 20, textAlign: "center" }}>
              <Spin />
            </div>
          ) : isLogin && user ? (
            <>
              <div
                className="nameUser"
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: 16,
                  flexDirection: "column",
                }}
              >
                <Link href="/trang-ca-nhan">
                  <img
                    src={user.avatar}
                    alt="avatar"
                    width={50}
                    height={50}
                    style={{ borderRadius: "50%" }}
                  />
                </Link>

                <Link
                  href="/trang-ca-nhan"
                  style={{
                    fontSize: "20px",
                    color: "#0958d9",
                    textDecoration: "underline",
                  }}
                >
                  {user.username}
                </Link>
              </div>

              <ButtonCustom
                onClick={handleLogout}
                style={{ marginTop: 12 }}
                className="btn-logout"
              >
                <LogoutOutlined /> Đăng xuất
              </ButtonCustom>
            </>
          ) : (
            <Link
              href={domain + `/oauth2/authorization/google`}
              style={{ textDecoration: "none" }}
            >
              <ButtonCustom className="login-btn">
                Đăng nhập
              </ButtonCustom>
            </Link>
          )}
        </div>
      </Drawer>
    </>
  );
}