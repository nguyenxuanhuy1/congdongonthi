import MenuClient from "./client";
import ButtonCustom from "../../Custom/button";
import Link from "next/link";
import { cookies } from "next/headers";

export default async function Header() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("access_token");
  const domain = process.env.NEXT_PUBLIC_DB_URL!;

  const isLogin = !!refreshToken;

  return (
    <div className="header-container">
      <div className="logo">
        <MenuClient isMobile />
        <Link href="/">
          <h1>CỘNG ĐỒNG ÔN THI</h1>
        </Link>
      </div>

      <div className="menu">
        <MenuClient />
      </div>

      <div className="login">
        {!isLogin ? (
          <Link
            href={`${domain}/oauth2/authorization/google`}
            style={{ textDecoration: "none" }}
          >
            <ButtonCustom className="login-btn lgmb">
              Đăng nhập
            </ButtonCustom>
          </Link>
        ) : (
          <MenuClient isDesktop />
        )}
      </div>
    </div>
  );
}
