import Image from "next/image";
import Link from "next/link";
import Notfound from "./Assets/notfound.png";
import ButtonCustom from "./Components/Custom/button";

export default function NotFound() {
  return (
    <div
      style={{
        height: "80vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        gap: "20px"
      }}
    >
      <Image
        src={Notfound}
        alt="Not Found"
        width={400}
        priority
      />

      <Link href="/" style={{ textDecoration: "none" }}>
        <ButtonCustom>
          Quay lại trang chủ
        </ButtonCustom>
      </Link>
    </div>
  );
}
