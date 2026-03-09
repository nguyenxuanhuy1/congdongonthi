"use client";

import { ArrowRightOutlined } from "@ant-design/icons";

export default function Howtogetkey() {
  return (
    <div>

      <div className="gioithieu-guide">
        <div className="noidunggioithieu">
          Lưu ý: hiện tại hệ thống chưa xử lý được nội dung
          hình ảnh nên các đề thi Toán hoặc đề có hình
          vẽ biểu đồ sơ đồ dễ phát sinh lỗi khi chuyển đổi
          sang bài thi online. Các đề thi chứa hình ảnh minh
          họa công thức hình học bảng biểu phức tạp có thể chưa
          hiển thị chính xác. Nền tảng sẽ hoạt động ổn định và
          hiệu quả hơn với các đề thi chỉ gồm văn bản như tiếng
          anh, lịch sử, ...
        </div>
        <div className="guide">
          <h2>Hướng dẫn</h2>
          <p>1. Chụp ảnh rõ nét, không mờ hoặc rung</p>
          <p>2. Đặt camera thẳng, đủ ánh sáng</p>
          <p>3. Đảm bảo ảnh chứa đầy đủ nội dung đề</p>
          <p>4. Hỗ trợ định dạng JPG, PNG với dung lượng tối đa 1MB</p>
        </div>
      </div>

      <div className="howtogetkey">
        <div className="howtogetkey-content">
          <h1>Hướng dẫn lấy API Key Google AI Studio</h1>

          <ul>
            <li>
              Truy cập Google AI Studio tại{" "}
              <a
                href="https://aistudio.google.com/welcome"
                target="_blank"
                rel="noopener noreferrer"
              >
                GG Studio
              </a>{" "}
              và đăng nhập bằng tài khoản Google của bạn.
            </li>

            <li>
              Kéo xuống dưới phần video giới thiệu và nhấn vào nút
              <strong> Get an API key</strong>.
            </li>

            <li>
              Nhấn <strong>Create API key</strong> ở góc trên bên phải, sau đó thực hiện
              lần lượt:
              <br />
              Default Gemini Project <ArrowRightOutlined /> Create project{" "}
              <ArrowRightOutlined /> Create key.
            </li>

            <li>
              Sao chép API Key trong mục <strong>API key details</strong> và dán vào ô nhập
              key trên website <strong>CỘNG ĐỒNG ÔN THI</strong>.
            </li>
          </ul>

        </div>

        <div className="howtogetkey-video">
          <iframe
            src="https://www.youtube.com/embed/X8cUlIvgflY?si=e-C93856496qmIFH"
            title="Hướng dẫn lấy API Key Google AI Studio"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </div>

      <div className="mucTieuChuyenAnh">
        <h1>Mục tiêu của chuyển ảnh</h1>
        <p>
          Chức năng chuyển ảnh thành đề thi trực tuyến được xây dựng nhằm giúp người học tiết kiệm thời gian và đơn giản hóa quá trình tạo bài thi online. Thay vì phải nhập tay từng câu hỏi, người dùng chỉ cần tải lên ảnh đề thi, hệ thống sẽ tự động nhận dạng nội dung và chuyển đổi thành bài thi trực tuyến hoàn chỉnh. Mục tiêu cốt lõi của tính năng này là nâng cao trải nghiệm học tập, giúp người học tập trung vào luyện đề và cải thiện kiến thức thay vì các thao tác kỹ thuật phức tạp.

          Bên cạnh đó, chức năng chuyển ảnh thành đề thi giúp mở rộng nguồn tài liệu ôn tập từ sách giấy, đề thi truyền thống hoặc tài liệu chia sẻ trên mạng. Người học có thể dễ dàng số hóa đề thi, chỉnh sửa linh hoạt, làm bài trực tiếp trên hệ thống và theo dõi kết quả nhanh chóng. Tính năng này đặc biệt phù hợp với các môn học thiên về nội dung chữ, hỗ trợ học tập mọi lúc mọi nơi.

          Về lâu dài, mục tiêu của chuyển ảnh thành đề thi là góp phần xây dựng một hệ sinh thái học tập trực tuyến hiện đại, thuận tiện và hiệu quả. Thông qua việc chia sẻ đề thi đã tạo, người học có thể kết nối, cùng luyện tập và nâng cao chất lượng ôn thi cho cộng đồng.
        </p>
      </div>

    </div>
  );
}
