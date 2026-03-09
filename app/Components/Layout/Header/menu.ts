export interface MenuItem {
  name: string;
  path: string;
}

export const menuList: MenuItem[] = [
  {
    name: "Trang chủ",
    path: "/",
  },
  {
    name: "Tổng hợp đề thi hot nhất",
    path: "/tong-hop-de-thi",
  },
  {
    name: "Tạo đề thi",
    path: "/tao-de-thi",
  }
];
