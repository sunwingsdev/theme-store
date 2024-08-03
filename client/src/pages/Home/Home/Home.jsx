import Banner from "../../../components/Home/Banner/Banner";
import PopularCourse from "../../../components/Home/PopularCourse/PopularCourse";
import Products from "../../../components/Home/Products/Products";
import Videos from "../../../components/Home/videos/Videos";

const Home = () => {
  return (
    <div className="">
      <Banner />
      <PopularCourse />
      <Products />
      <Videos />
    </div>
  );
};

export default Home;
