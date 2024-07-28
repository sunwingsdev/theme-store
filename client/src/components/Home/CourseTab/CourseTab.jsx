import { Tab } from "@headlessui/react";
import CourseCard from "../PopularCourse/CourseCard";
import { useGetAllCourseQuery } from "../../../redux/features/allApis/coursesApi/coursesApi";

// function classNames(...classes) {
//   return classes.filter(Boolean).join(" ");
// }

export default function CourseTab() {
  const { data } = useGetAllCourseQuery();

  // const tabList = [
  //   { name: "all-course", label: "All Course" },
  //   { name: "graphic-multimedia", label: "Graphic & Multimedia" },
  //   { name: "web-software", label: "Web & Software" },
  //   { name: "digital-marketing", label: "Digital & Marketing" },
  // ];

  return (
    <div className="w-full px-2 py-16 sm:px-0">
      <Tab.Group>
        <Tab.List className="flex rounded-xl p-1 text-black flex-row items-center justify-center gap-3">
          {/* {tabList &&
            tabList?.map((tab, i) => (
              <Tab
                // onClick={() => handleSelect(tab.category)} // Make sure to pass the category to handleSelect
                className={`px-6 py-1 font-semibold capitalize border-b-2 border-transparent hover:border-red-600 hover:text-red-600`}
                key={i} // Use tab._id as key
              >
                {tab.label}
              </Tab>
            ))} */}
          {/* {Object.keys(categories).map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                classNames(
                  "w-full rounded-lg py-2.5 text-sm font-medium leading-5",
                  "ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                  selected
                    ? "bg-white text-blue-700 shadow"
                    : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                )
              }
            >
              {category}
            </Tab>
          ))} */}
        </Tab.List>
        {
          <Tab.Panels className="mt-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 container mx-auto gap-10 md:gap-6 py-10">
            {data &&
              data?.map((course) => (
                <CourseCard key={course?._id} course={course} />
              ))}
            {/* {Object.values(categories).map((posts, idx) => (
            <Tab.Panel
              key={idx}
              className={classNames(
                "rounded-xl bg-white p-3",
                "ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
              )}
            >
              <ul>
                {posts.map((post) => (
                  <li
                    key={post.id}
                    className="relative rounded-md p-3 hover:bg-gray-100"
                  >
                    <h3 className="text-sm font-medium leading-5">
                      {post.title}
                    </h3>

                    <ul className="mt-1 flex space-x-1 text-xs font-normal leading-4 text-gray-500">
                      <li>{post.date}</li>
                      <li>&middot;</li>
                      <li>{post.commentCount} comments</li>
                      <li>&middot;</li>
                      <li>{post.shareCount} shares</li>
                    </ul>

                    <a
                      href="#"
                      className={classNames(
                        "absolute inset-0 rounded-md",
                        "ring-blue-400 focus:z-10 focus:outline-none focus:ring-2"
                      )}
                    />
                  </li>
                ))}
              </ul>
            </Tab.Panel>
          ))} */}
          </Tab.Panels>
        }
      </Tab.Group>
    </div>
  );
}
