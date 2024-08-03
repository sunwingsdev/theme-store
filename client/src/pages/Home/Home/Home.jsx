import Banner from "../../../components/Home/Banner/Banner";
import PopularCourse from "../../../components/Home/PopularCourse/PopularCourse";
import ProductCard from "../../../components/Home/productCard/ProductCard";
import Videos from "../../../components/Home/videos/Videos";

const Home = () => {
  return (
    <div className="">
      <Banner />
      <PopularCourse />
      <ProductCard />
      <Videos />
    </div>
  );
};

export default Home;
