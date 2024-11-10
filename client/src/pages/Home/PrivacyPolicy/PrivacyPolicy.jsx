import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto">
      <div className="">
        <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
        <p className="mb-4">
          Welcome to Rabbit Code! We are committed to protecting your privacy
          and ensuring that your personal information is handled in a safe and
          responsible manner. This Privacy Policy explains how we collect, use,
          disclose, and safeguard your information when you visit our website{" "}
          <Link className="text-blue-500 underline" to="/">
            Rabbit Code
          </Link>{" "}
          and purchase products from us.
        </p>

        <h2 className="text-2xl font-semibold mb-2">Information We Collect</h2>
        <h3 className="text-xl font-semibold mb-2">Personal Information</h3>
        <ul className="list-disc list-inside mb-4">
          <li>
            Contact Information: Name, email address, phone number, and mailing
            address.
          </li>
          <li>
            Payment Information: Credit card details and billing information
            (processed securely by our payment processors).
          </li>
          <li>
            Account Information: Username, password, and other details you
            provide when creating an account.
          </li>
          <li>
            Order History: Information about your past orders and preferences.
          </li>
        </ul>

        <h3 className="text-xl font-semibold mb-2">Non-Personal Information</h3>
        <ul className="list-disc list-inside mb-4">
          <li>
            Browsing Data: IP address, browser type, operating system, and
            referring website.
          </li>
          <li>
            Usage Data: Pages visited, time spent on pages, and other usage
            statistics.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mb-2">
          How We Use Your Information
        </h2>
        <ul className="list-disc list-inside mb-4">
          <li>
            To Process Transactions: To fulfill and manage your orders and
            provide customer support.
          </li>
          <li>
            To Improve Our Website: To analyze usage patterns and enhance your
            browsing experience.
          </li>
          <li>
            To Communicate with You: To send order confirmations, updates, and
            promotional offers (you can opt-out of marketing communications at
            any time).
          </li>
          <li>
            To Comply with Legal Obligations: To meet legal and regulatory
            requirements.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mb-2">
          Sharing Your Information
        </h2>
        <p className="mb-4">
          We do not sell, trade, or otherwise transfer your personal information
          to outside parties except in the following circumstances:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>
            With Service Providers: We may share your information with
            third-party service providers who assist us in operating our
            website, processing payments, and delivering products.
          </li>
          <li>
            For Legal Reasons: We may disclose your information if required to
            do so by law or in response to legal requests.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mb-2">
          Cookies and Tracking Technologies
        </h2>
        <p className="mb-4">
          Our website uses cookies and similar tracking technologies to enhance
          your experience. Cookies are small files placed on your device that
          help us understand your preferences and improve our website
          functionality.
        </p>
        <p className="mb-4">
          You can manage your cookie preferences through your browser settings.
          However, disabling cookies may affect your ability to use certain
          features of our website.
        </p>

        <h2 className="text-2xl font-semibold mb-2">Data Security</h2>
        <p className="mb-4">
          We implement reasonable security measures to protect your personal
          information from unauthorized access, use, or disclosure. However, no
          method of transmission over the internet or electronic storage is
          completely secure, and we cannot guarantee absolute security.
        </p>

        <h2 className="text-2xl font-semibold mb-2">Your Rights</h2>
        <ul className="list-disc list-inside mb-4">
          <li>
            Access Your Information: Request a copy of the personal information
            we hold about you.
          </li>
          <li>
            Correct or Update Your Information: Request corrections or updates
            to your personal information.
          </li>
          <li>
            Delete Your Information: Request the deletion of your personal
            information, subject to legal and contractual restrictions.
          </li>
          <li>
            Opt-Out: Opt-out of receiving marketing communications from us.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mb-2">
          Changes to This Privacy Policy
        </h2>
        <p className="mb-4">
          We may update this Privacy Policy from time to time. Any changes will
          be posted on this page with an updated effective date. We encourage
          you to review this Privacy Policy periodically to stay informed about
          how we are protecting your information.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
