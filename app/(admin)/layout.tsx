"use client";

import React, { useState, useEffect } from "react";
import { Layout, Menu, theme } from "antd";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import Logo from "@/public/favicon.png";
import { adminMenuItems } from "./menu";
import { notFound } from "next/navigation";
const { Header, Content, Sider } = Layout;

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const [collapsed, setCollapsed] = useState(false);
  const [siderWidth, setSiderWidth] = useState(240);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    const role = localStorage.getItem("user_role");
    if (role !== "admin") {
      notFound();
    }
  }, [router]);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();

    const startX = e.clientX;
    const startWidth = siderWidth;

    const onMouseMove = (moveEvent: MouseEvent) => {
      const newWidth = startWidth + (moveEvent.clientX - startX);
      if (newWidth >= 180 && newWidth <= 420) {
        setSiderWidth(newWidth);
      }
    };

    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  return (
    <Layout className="admin-layout">
      <Sider
        className="admin-sider"
        width={collapsed ? 80 : siderWidth}
        collapsedWidth={80}
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
      >
        <div className="admin-logo">
          <Image src={Logo} alt="logo" />
        </div>

        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[pathname]}
          items={adminMenuItems}
          onClick={({ key }) => router.push(key)}
        />

        {!collapsed && (
          <div
            className="resize-handle"
            onMouseDown={handleMouseDown}
          />
        )}
      </Sider>

      <Layout>
        <Header className="admin-header">
          Người nắm quyền sinh sát
        </Header>

        <Content className="admin-content-wrapper">
          <div className="admin-content-box">
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
