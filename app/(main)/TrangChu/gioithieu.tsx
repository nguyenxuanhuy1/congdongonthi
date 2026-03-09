"use client";

import Image from "next/image";

import AboutMe from "../../Assets/my-seft.png";
import CongDong from "../../Assets/cong-dong.png";
import Exam from "../../Assets/exam.png";
import Share from "../../Assets/share.png";
import MucTieu from "../../Assets/muc-tieu.png";
import Brian from "../../Assets/biran.png";

export default function GioiThieu() {
  return (
    <div>
      <div className="gioiThieu">
        <div className="item">
          <div className="icon">
            <Image src={AboutMe} alt="" width={40} height={40} />
          </div>
          <h3>Về chúng tôi</h3>
          <p>
            Cộng đồng ôn thi có hơn 5 năm kinh nghiệm trong lĩnh vực giáo dục, xây dựng nền tảng ôn thi trực tuyến hiệu quả
          </p>
        </div>

        <div className="item">
          <div className="icon">
            <Image src={CongDong} alt="" width={40} height={40} />
          </div>
          <h3>Cộng đồng người dùng</h3>
          <p>
            Hàng nghìn người học tham gia mỗi ngày, cùng tạo đề thi online, làm bài trực tuyến và chia sẻ kinh nghiệm ôn tập hiệu quả
          </p>
        </div>

        <div className="item">
          <div className="icon">
            <Image src={Brian} alt="" width={40} height={40} />
          </div>
          <h3>Công nghệ thông minh</h3>
          <p>
            Ứng dụng công nghệ nhận dạng, chuyển ảnh đề thi thành bài thi online nhanh, chính xác, thân thiện với người dùng
          </p>
        </div>

        <div className="item">
          <div className="icon">
            <Image src={Exam} alt="" width={34} height={40} />
          </div>
          <h3>Trải nghiệm thi online</h3>
          <p>
            Làm bài thi trực tuyến linh hoạt, không áp lực, giao diện thân thiện, giúp người học thoải mái luyện tập và cải thiện kỹ năng
          </p>
        </div>

        <div className="item">
          <div className="icon">
            <Image src={Share} alt="" width={45} height={40} />
          </div>
          <h3>Chia sẻ & kết nối</h3>
          <p>
            Mỗi đề thi đều có thể chia sẻ công khai hoặc riêng tư, tạo môi trường học tập mở, nơi người học cùng hỗ trợ và phát triển kiến thức
          </p>
        </div>

        <div className="item">
          <div className="icon">
            <Image src={MucTieu} alt="" width={42} height={40} />
          </div>
          <h3>Sứ mệnh & giá trị</h3>
          <p>
            Cộng đồng ôn thi xây dựng hệ sinh thái học tập trực tuyến hiệu quả, giúp người học tự tin hơn trước mỗi kỳ thi
          </p>
        </div>
      </div>

      <div className="mucTieu">
        <h1>Mục tiêu của chúng tôi</h1>
        <p>
          Cộng đồng ôn thi được xây dựng với mục tiêu trở thành nền tảng ôn thi trực tuyến toàn diện, giúp người học tiếp cận việc luyện thi một cách dễ dàng, hiệu quả và tiết kiệm thời gian. Trang web hướng tới việc giải quyết khó khăn phổ biến của người học khi phải ôn tập từ đề giấy, tài liệu rời rạc và thiếu môi trường luyện thi thực tế.

          Thông qua chức năng chuyển ảnh đề thi thành bài thi online, Cộng đồng ôn thi giúp số hóa đề thi nhanh chóng, biến mọi tài liệu học tập thành công cụ luyện tập trực tuyến tiện lợi. Người học có thể làm bài thi online, rèn kỹ năng quản lý thời gian, làm quen áp lực phòng thi và đánh giá năng lực bản thân chính xác hơn.

          Bên cạnh đó, trang web hướng tới xây dựng một cộng đồng học tập mở, nơi người học có thể chia sẻ đề thi, trao đổi kinh nghiệm ôn tập và cùng nhau tiến bộ. Mỗi người không chỉ là người học mà còn có thể trở thành người đóng góp giá trị cho cộng đồng.

          Với định hướng lâu dài, Cộng đồng ôn thi mong muốn tạo ra hệ sinh thái học tập trực tuyến bền vững, hỗ trợ nhiều kỳ thi khác nhau và giúp người học tự tin hơn, chủ động hơn trên hành trình chinh phục tri thức và các kỳ thi quan trọng.
        </p>
      </div>
    </div>
  );
}
