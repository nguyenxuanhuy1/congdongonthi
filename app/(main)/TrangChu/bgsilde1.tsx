"use client";

import { useRouter } from "next/navigation";
import ButtonCustom from "../../Components/Custom/button";

export default function BgSilde1() {
  const router = useRouter();

  return (
    <div className="home-BgSilde1">
      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <div className="blob blob-3" />
      <div className="dots-grid" />
      <div className="ray ray-1" />
      <div className="ray ray-2" />
      <div className="ray ray-3" />

      {/* Cột trái — nội dung chính */}
      <div className="home-content">
        <div className="hero-badge">
          <span className="badge-dot" />
          Nền tảng học tập thông minh
        </div>

        <h1 className="title">
          Cộng đồng ôn thi —{" "}
          <span className="title-gradient">
            học thông minh, thi hiệu quả
          </span>
        </h1>

        <p className="desc">
          Số hóa đề thi giấy thành trải nghiệm thi online — nhanh chóng,
          cá nhân hóa và hiệu quả hơn bao giờ hết.
        </p>

        <div className="actions">
          <ButtonCustom onClick={() => router.push("/tao-de-thi")}>
            Tạo đề ngay
          </ButtonCustom>
          <ButtonCustom
            className="btn-secondary"
            onClick={() => router.push("/tong-hop-de-thi")}
          >
            Làm đề ngay
          </ButtonCustom>
        </div>

        <div className="stats-row">
          <div className="stat-item">
            <span className="stat-number">12,000+</span>
            <span className="stat-label">Đề thi đã tạo</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">98%</span>
            <span className="stat-label">Hài lòng</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">50,000+</span>
            <span className="stat-label">Học sinh</span>
          </div>
        </div>
      </div>

      {/* Cột phải — pills */}
      <div className="pills-col" aria-hidden="true">
        <div className="pill pill-1">
          <span className="pill-dot blue" />
          Tạo đề thi nhanh
        </div>
        <div className="pill pill-2">
          <span className="pill-dot purple" />
          Phân tích kết quả
        </div>
        <div className="pill pill-3">
          <span className="pill-dot green" />
          Ngân hàng đề thi
        </div>
      </div>
    </div>
  );
}