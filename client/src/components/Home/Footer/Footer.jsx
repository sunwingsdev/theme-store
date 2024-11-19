import { Link } from "react-router-dom";
import { useGetAllHomeControlsQuery } from "../../../redux/features/allApis/homeControlApi/homeControlApi";
import { useGetControlLogosQuery } from "../../../redux/features/allApis/controlLogoApi/controlLogoApi";
const Footer = () => {
  const { data: controls } = useGetAllHomeControlsQuery();
  const { data: controlLogos } = useGetControlLogosQuery();

  const bannerLogo = controlLogos?.find(
    (logo) => logo.subcategory === "banner-logo"
  );

  const footerSubtitle = controls?.find(
    (control) => control.subcategory === "footer-subtitle"
  );
  return (
    <footer className="bg-[#343434] text-white pt-12 pb-8 px-4">
      <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center gap-6">
        <div className="mb-8 lg:mb-0 w-full md:w-1/3">
          <img className="w-48" src={bannerLogo?.logo} alt="logo" />

          {footerSubtitle?.text ? (
            <p
              className="py-2"
              dangerouslySetInnerHTML={{ __html: footerSubtitle?.text }}
            ></p>
          ) : (
            <p className="py-2">A short description of the company.</p>
          )}
        </div>
        <nav className="flex flex-wrap justify-center lg:justify-end space-x-4 w-full md:w-1/3">
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
          <Link to="/privacy-policy" className="hover:text-gray-400">
            Privacy Policy
          </Link>
        </nav>
        <div className="mt-8 lg:mt-0 w-full md:w-1/3">
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
            &copy; {new Date().getFullYear()} Oracle Technology . All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
