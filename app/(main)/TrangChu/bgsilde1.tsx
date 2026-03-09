"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import ButtonCustom from "../../Components/Custom/button";
import Hoctap from "../../Assets/hoctap.png";

export default function BgSilde1() {
  const router = useRouter();

  return (
    <div className="home-BgSilde1">
      <div className="home-content">
        <h1 className="title">Cộng đồng ôn thi - học thông minh, thi hiệu quả</h1>
        <p className="desc">
          Số hóa đề thi giấy thành trải nghiệm thi online
        </p>

        <div className="actions">
          <ButtonCustom onClick={() => router.push("/tao-de-thi")}>
            Tạo đề ngay
          </ButtonCustom>
          <ButtonCustom className="lamdengay" onClick={() => router.push("/tong-hop-de-thi")}>
            Làm đề ngay
          </ButtonCustom>
        </div>
      </div>

      <div className="imgMainseo">
        <Image
          src={Hoctap}
          alt="Học tập online"
          priority
        />
      </div>
    </div>
  );
}
