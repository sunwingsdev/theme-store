import moment from "moment";

const AdmissionDetails = ({ rowData }) => {
  const { name, phone, profession, location, createdAt, course, schedule } =
    rowData;
  return (
    <div className="container max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="">
        <ul className="space-y-4">
          <li className="flex items-center">
            <span className="text-lg font-semibold text-gray-700 w-32">
              Name :
            </span>
            <span className="text-xl text-gray-900">{name}</span>
          </li>
          <li className="flex items-center">
            <span className="text-lg font-semibold text-gray-700 w-32">
              Phone :
            </span>
            <span className="text-xl text-gray-900">{phone}</span>
          </li>
          <li className="flex items-center">
            <span className="text-lg font-semibold text-gray-700 w-32">
              Profession :
            </span>
            <span className="text-xl text-gray-900">{profession}</span>
          </li>
          <li className="flex items-center">
            <span className="text-lg font-semibold text-gray-700 w-32">
              Location :
            </span>
            <span className="text-xl text-gray-900">{location}</span>
          </li>
          <li className="flex items-center">
            <span className="text-lg font-semibold text-gray-700 w-32">
              Time :
            </span>
            <span className="text-xl text-gray-900">
              {moment(createdAt).format("MMMM Do YYYY, h:mm a") || "..."}
            </span>
          </li>
          <li className="flex items-center">
            <span className="text-lg font-semibold text-gray-700 w-32">
              Course :
            </span>
            <span className="text-xl text-gray-900">{course}</span>
          </li>
          <li className="flex items-center">
            <span className="text-lg font-semibold text-gray-700 w-32">
              Schedule :
            </span>
            <span className="text-xl text-gray-900">{schedule}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdmissionDetails;
