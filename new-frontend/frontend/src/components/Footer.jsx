import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__left">
          <a href="/home#platform-info">About</a>
          <a href="mailto:iot-platform@example.com">Contact</a>
        </div>

        <div className="footer__right">
          © 2026 IoT Dashboard
        </div>
      </div>
    </footer>
  );
};

export default Footer;
