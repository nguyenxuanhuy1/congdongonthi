"use client";

import { Dropdown } from "antd";
import type { MenuProps } from "antd";

type DropdownItem = {
  key: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  onClick?: () => void;
  danger?: boolean;
};

type DropdownCustomProps = {
  trigger: React.ReactNode;
  items: DropdownItem[];
  placement?: "bottomLeft" | "bottomRight";
};

export default function DropdownCustom({
  trigger,
  items,
  placement = "bottomRight",
}: DropdownCustomProps) {
  const menuItems: MenuProps["items"] = items.map((item) => ({
    key: item.key,
    label: (
      <span
        className={`dropdown-item ${item.danger ? "danger" : ""}`}
        onClick={item.onClick}
      >
        {item.icon && <span className="icon">{item.icon}</span>}
        {item.label}
      </span>
    ),
  }));

  return (
    <Dropdown
      menu={{ items: menuItems }}
      placement={placement}
      trigger={["click"]}
      overlayClassName="dropdown-custom"
    >
      <span className="dropdown-trigger">{trigger}</span>
    </Dropdown>
  );
}
