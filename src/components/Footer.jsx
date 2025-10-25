import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer p-10 bg-base-200 text-base-content">
      <div>
        <span className="footer-title">Services</span>
        <a className="link link-hover">Skill Exchange</a>
        <a className="link link-hover">Find Instructors</a>
        <a className="link link-hover">Become a Provider</a>
        <a className="link link-hover">Pricing</a>
      </div>
      <div>
        <span className="footer-title">Company</span>
        <a className="link link-hover">About us</a>
        <a className="link link-hover">Contact</a>
        <a className="link link-hover">Career</a>
        <a className="link link-hover">Press kit</a>
      </div>
      <div>
        <span className="footer-title">Legal</span>
        <a className="link link-hover">Terms of use</a>
        <a className="link link-hover">Privacy policy</a>
        <a className="link link-hover">Cookie policy</a>
      </div>
      <div>
        <span className="footer-title">Follow Us</span>
        <div className="flex gap-4 mt-4 text-xl">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
            <FaFacebookF />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
            <FaTwitter />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500">
            <FaInstagram />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-700">
            <FaLinkedinIn />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
