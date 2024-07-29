import { Tab } from "@headlessui/react";
import CourseCard from "../PopularCourse/CourseCard";
import { useGetAllCourseQuery } from "../../../redux/features/allApis/coursesApi/coursesApi";

export default function CourseTab() {
  const { data } = useGetAllCourseQuery();

  console.log(data);

  return (
    <div className="w-full px-2 sm:px-0">
      <Tab.Group>
        <Tab.List className="flex rounded-xl p-1 text-black flex-row items-center justify-center gap-3"></Tab.List>
        {
          <Tab.Panels className="mt-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 container mx-auto gap-10 md:gap-6 py-10">
            {data &&
              data?.map((course) => (
                <CourseCard key={course?._id} course={course} />
              ))}
          </Tab.Panels>
        }
      </Tab.Group>
    </div>
  );
}
