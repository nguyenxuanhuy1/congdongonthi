export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__content">
          <div className="footer__logo-section">
            <div className="footer__logo">
              <span className="footer__brand-name">CỘNG ĐỒNG ÔN THI</span>
            </div>
            <p className="footer__description">
              Nền tảng luyện đề online, cho phép chuyển ảnh đề thành bài thi trực tuyến, dễ dàng chia sẻ và cùng hàng nghìn người luyện tập, nâng cao kỹ năng, sẵn sàng cho kỳ thi quan trọng
            </p>
          </div>

          <div className="footer__explore-section">
            <h3 className="footer__explore-title">KHÁM PHÁ</h3>
            <div className="footer__links">
              <a
                href="https://chiasechuyendi.online"
                target="_blank"
                rel="noopener noreferrer"
                className="footer__link"
              >
                Chia sẻ chuyến đi
              </a>
              <a
                href="https://hoctap.online"
                target="_blank"
                rel="noopener noreferrer"
                className="footer__link"
              >
                Góc Sống Ảo
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="footer__divider"></div>

      <div className="footer__bottom">
        <div className="footer__container">
          <p className="footer__copyright">
            © {new Date().getFullYear()} congdongonthi.com. Tất cả các quyền được bảo lưu.
          </p>
        </div>
      </div>
    </footer>
  );
}