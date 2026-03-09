"use client";
import type { MenuProps } from "antd";
import {
  FileTextOutlined,
} from "@ant-design/icons";

export type AdminMenuItem = Required<MenuProps>["items"][number];

export const adminMenuItems: AdminMenuItem[] = [
  {
    key: "/quan-li-de-thi",
    icon: <FileTextOutlined />,
    label: "Quản lý đề thi",
  },
];
