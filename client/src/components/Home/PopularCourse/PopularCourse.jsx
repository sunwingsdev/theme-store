import CourseTab from "../CourseTab/CourseTab";

const PopularCourse = () => {
  return (
    <div className="container mx-auto mt-[124px]">
      <div>
        <h2 className="text-[#1f1e1e] text-[44px] text-center font-bold">
          জনপ্রিয় কোর্সগুলো
        </h2>
        <p className="text-[#605f62] text-center w-2/3 mx-auto pt-5 pb-1">
          আমরা আমাদের কোর্সগুলিকে সবচেয়ে চাহিদাপূর্ণ পেশাদার দক্ষতার সাথে
          ডিজাইন করেছি। প্রোগ্রামের মাধ্যমে অর্জিত জ্ঞান, অভিজ্ঞতা এবং দক্ষতা
          বিশ্ব বাজারে আপনার কাঙ্খিত চাকরি নিশ্চিত করবে। নিচের তালিকা থেকে আপনি
          যেকোনো সময় যেকোনো অনলাইন বা অফলাইন কোর্সে ভর্তি হতে পারেন।
        </p>
      </div>
      <CourseTab />
    </div>
  );
};

export default PopularCourse;
