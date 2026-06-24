import {
  FaCarSide,
  FaUsers,
  FaShieldAlt,
  FaStar,
} from "react-icons/fa";

const stats = [
  {
    icon: <FaCarSide />,
    value: "2,400+",
    label: "Cars Sold",
  },
  {
    icon: <FaUsers />,
    value: "1,900+",
    label: "Happy Customers",
  },
  {
    icon: <FaShieldAlt />,
    value: "12+",
    label: "Years in Pune",
  },
  {
    icon: <FaStar />,
    value: "98%",
    label: "5-Star Reviews",
  },
];

const About = () => {
  return (
    // <section className="bg-[#f7f7f7] py-20">
    <section className="bg-[#f7f7f7] py-20 min-h-65 flex items-center">

      <div className="max-w-7xl mx-auto px-6">

        {/* <div className="grid grid-cols-2 lg:grid-cols-4"> */}
        <div className="grid grid-cols-2 lg:grid-cols-4 items-center h-full">

          {stats.map((item, index) => (
            <div
              key={index}
              className={`flex flex-col items-center text-center px-8 ${
                index !== stats.length - 1
                  ? "lg:border-r border-gray-300"
                  : ""
              }`}
            >
              {/* Icon */}

              <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-700 text-xl mb-5">
                {item.icon}
              </div>

              {/* Value */}

              <h2 className="text-4xl font-extrabold text-[#1a1a1a]">
                {item.value}
              </h2>

              {/* Label */}

              <p className="mt-2 text-gray-500 text-lg">
                {item.label}
              </p>
            </div>
          ))}

        </div>

      </div>

    </section>
  );
};

export default About;