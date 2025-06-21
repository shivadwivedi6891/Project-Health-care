import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="container footer-container">
        <p>&copy; {currentYear} Health Record System</p>
      </div>
    </footer>
  );
};

export default Footer;