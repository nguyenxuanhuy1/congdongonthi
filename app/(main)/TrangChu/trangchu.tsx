"use client";

import { useRouter } from "next/navigation";

import UploadBox from "../../Components/Custom/upload";

export default function TrangChu() {
  const router = useRouter();
  const handleFiles = (files: File[]) => {
    const urls = files.map((file) => URL.createObjectURL(file));
    sessionStorage.setItem("examImages", JSON.stringify(urls));
    router.push("/tao-de-thi");
  };

  return (
    <div className="trangchu">
      <h1>Chuyển ảnh thành đề thi trực tuyến</h1>

      <div className="content">
        <div className="uploadFile">
          <UploadBox onFilesChange={handleFiles} />
        </div>

        <div className="guide">

          <p>
            Chức năng chuyển ảnh thành đề thi của <strong style={{fontWeight:'600'}}>Cộng đồng ôn thi </strong>
            giúp người học tải ảnh đề giấy, sách giáo khoa hoặc tài
            liệu ôn tập và tự động chuyển đổi thành bài thi online hoàn chỉnh.
            Hệ thống nhận dạng nội dung thông minh, tạo câu hỏi trắc nghiệm rõ
            ràng và sử dụng. Người dùng có thể chia sẻ đề thi
            trực tuyến và làm bài ngay, giúp tiết kiệm thời gian, tăng hiệu quả
            luyện thi và trải nghiệm học tập hiện đại
          </p>

        </div>
      </div>
    </div>

  );
}
