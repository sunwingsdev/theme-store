const Heading = ({ title, subtitle }) => {
  return (
    <div className="bg-gray-800 text-white px-4">
      <h2 className="font-semibold text-3xl lg:text-4xl pt-8 lg:pt-16 text-center">
        {title}
      </h2>
      <p className="max-w-[857px] mx-auto py-3 text-center">{subtitle}</p>
      <img
        className="w-24 lg:w-30 mx-auto pb-16"
        src="https://themesbazar.com/wp-content/themes/themesbazar/assets/images/icon-image.png"
        alt=""
      />
    </div>
  );
};

export default Heading;
