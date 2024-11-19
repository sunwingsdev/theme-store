import { Tab } from "@headlessui/react";
import CourseCard from "../PopularCourse/CourseCard";
import { useGetAllCourseQuery } from "../../../redux/features/allApis/coursesApi/coursesApi";
import Loader from "../../shared/Loader";

// function classNames(...classes) {
//   return classes.filter(Boolean).join(" ");
// }

export default function CourseTab() {
  const { data: courseList, isLoading } = useGetAllCourseQuery();

  if (isLoading) return <Loader />;

  return (
    <div className="w-full px-2 py-16 sm:px-0">
      <Tab.Group>
        <Tab.List className="flex rounded-xl p-1 text-black flex-row items-center justify-center gap-3"></Tab.List>
        {
          <Tab.Panels className="mt-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 container mx-auto gap-10 md:gap-6 py-10">
            {courseList &&
              courseList?.map((course) => (
                <CourseCard key={course?._id} course={course} />
              ))}
          </Tab.Panels>
        }
      </Tab.Group>
    </div>
  );
}
