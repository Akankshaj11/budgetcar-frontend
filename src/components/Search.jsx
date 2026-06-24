import { FaSearch } from "react-icons/fa";

const brands = [
  "Any Brand",
  "Maruti Suzuki",
  "Hyundai",
  "Tata",
  "Mahindra",
  "Toyota",
  "Honda",
  "Kia",
  "Volkswagen",
  "Skoda",
  "Renault",
  "Ford",
  "MG",
  "Nissan",
  "Jeep",
  "BMW",
  "Mercedes-Benz",
  "Audi",
];

const budgets = [
  "Any Budget",
  "Below ₹3 Lakh",
  "₹3 - ₹5 Lakh",
  "₹5 - ₹8 Lakh",
  "₹8 - ₹12 Lakh",
  "₹12 - ₹20 Lakh",
  "Above ₹20 Lakh",
];

const fuelTypes = [
  "Any Fuel Type",
  "Petrol",
  "Diesel",
  "CNG",
  "Electric",
  "Hybrid",
];

const transmissions = [
  "Any Transmission",
  "Manual",
  "Automatic",
  "AMT",
  "CVT",
  "DCT",
];

const bodyTypes = [
  "Any Body Type",
  "Hatchback",
  "Sedan",
  "SUV",
  "Compact SUV",
  "MUV",
  "Coupe",
  "Convertible",
];

const Search = () => {
  return (
    <section className="relative bg-white px-6 pt-6 pb-10">
      <div className="max-w-7xl mx-auto bg-[#f5f5f5] rounded-3xl shadow-2xl border border-gray-200 p-8 md:p-10">

        {/* Heading */}

        <div className="flex items-center gap-4 mb-10">
          <div className="w-12 h-12 rounded-xl bg-white shadow flex items-center justify-center">
            <FaSearch className="text-gray-700 text-lg" />
          </div>

          <h2 className="text-3xl font-bold text-gray-900">
            Find Your Perfect Car
          </h2>
        </div>

        {/* Filters */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">

          {/* Brand */}

          <div>
            <label className="block text-xs font-semibold tracking-wider uppercase text-gray-500 mb-2">
              Brand
            </label>

            <select className="w-full rounded-2xl border border-gray-300 bg-white px-5 py-4 outline-none focus:border-black transition">
              {brands.map((brand) => (
                <option key={brand}>{brand}</option>
              ))}
            </select>
          </div>

          {/* Budget */}

          <div>
            <label className="block text-xs font-semibold tracking-wider uppercase text-gray-500 mb-2">
              Budget
            </label>

            <select className="w-full rounded-2xl border border-gray-300 bg-white px-5 py-4 outline-none focus:border-black transition">
              {budgets.map((budget) => (
                <option key={budget}>{budget}</option>
              ))}
            </select>
          </div>

          {/* Fuel */}

          <div>
            <label className="block text-xs font-semibold tracking-wider uppercase text-gray-500 mb-2">
              Fuel Type
            </label>

            <select className="w-full rounded-2xl border border-gray-300 bg-white px-5 py-4 outline-none focus:border-black transition">
              {fuelTypes.map((fuel) => (
                <option key={fuel}>{fuel}</option>
              ))}
            </select>
          </div>

          {/* Transmission */}

          <div>
            <label className="block text-xs font-semibold tracking-wider uppercase text-gray-500 mb-2">
              Transmission
            </label>

            <select className="w-full rounded-2xl border border-gray-300 bg-white px-5 py-4 outline-none focus:border-black transition">
              {transmissions.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </div>

          {/* Body Type */}

          <div>
            <label className="block text-xs font-semibold tracking-wider uppercase text-gray-500 mb-2">
              Body Type
            </label>

            <select className="w-full rounded-2xl border border-gray-300 bg-white px-5 py-4 outline-none focus:border-black transition">
              {bodyTypes.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </div>

        </div>

        {/* Button */}

        <div className="mt-8">
          <button className="flex items-center gap-3 rounded-2xl bg-[#1f1f1f] px-8 py-4 text-white font-semibold shadow-lg hover:bg-black transition-all duration-300 hover:scale-[1.02]">
            <FaSearch />
            Search Cars
          </button>
        </div>

      </div>
    </section>
  );
};

export default Search;