import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#403532] text-white py-12 px-4">
      <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center">
        <div className="mb-8 lg:mb-0">
          <h2 className="text-3xl font-semibold">
            Sunwings <br /> Training Centre
          </h2>
          <p className="mt-2">A short description of the company.</p>
        </div>
        <nav className="flex flex-wrap justify-center lg:justify-end space-x-4">
          <Link to="/" className="hover:text-gray-400">
            Home
          </Link>
          <Link to="/about-us" className="hover:text-gray-400">
            About
          </Link>
          {/* <Link to="/success-story" className="hover:text-gray-400">
            Success story
          </Link> */}
          <Link to="/contact" className="hover:text-gray-400">
            Contact
          </Link>
        </nav>
        <div className="mt-8 lg:mt-0">
          <h3 className="text-lg font-semibold mb-2">
            Subscribe to Our Newsletter
          </h3>
          <div className="flex flex-col lg:flex-row">
            <input
              type="email"
              placeholder="Your email address"
              className="bg-gray-800 text-white border border-gray-700 py-2 px-4 rounded-md lg:mb-0 mb-2 lg:mr-2"
            />
            <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md">
              Subscribe
            </button>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-700 mt-8 pt-8">
        <div className="container mx-auto text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Sunwings Training Centre. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
