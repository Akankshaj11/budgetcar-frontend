import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const [selectedBrand, setSelectedBrand] = useState("Any Brand");
  const [selectedBudget, setSelectedBudget] = useState("Any Budget");
  const [selectedFuel, setSelectedFuel] = useState("Any Fuel Type");
  const [selectedTransmission, setSelectedTransmission] = useState("Any Transmission");
  const [selectedBodyType, setSelectedBodyType] = useState("Any Body Type");

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (selectedBrand && selectedBrand !== "Any Brand") {
      params.append("brand", selectedBrand);
    }
    if (selectedBudget && selectedBudget !== "Any Budget") {
      params.append("budget", selectedBudget);
    }
    if (selectedFuel && selectedFuel !== "Any Fuel Type") {
      params.append("fuel", selectedFuel);
    }
    if (selectedTransmission && selectedTransmission !== "Any Transmission") {
      params.append("transmission", selectedTransmission);
    }
    if (selectedBodyType && selectedBodyType !== "Any Body Type") {
      params.append("bodyType", selectedBodyType);
    }

    navigate(`/all-cars?${params.toString()}`);
  };

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

            <select 
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="w-full rounded-2xl border border-gray-300 bg-white px-5 py-4 outline-none focus:border-black transition cursor-pointer"
            >
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

            <select 
              value={selectedBudget}
              onChange={(e) => setSelectedBudget(e.target.value)}
              className="w-full rounded-2xl border border-gray-300 bg-white px-5 py-4 outline-none focus:border-black transition cursor-pointer"
            >
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

            <select 
              value={selectedFuel}
              onChange={(e) => setSelectedFuel(e.target.value)}
              className="w-full rounded-2xl border border-gray-300 bg-white px-5 py-4 outline-none focus:border-black transition cursor-pointer"
            >
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

            <select 
              value={selectedTransmission}
              onChange={(e) => setSelectedTransmission(e.target.value)}
              className="w-full rounded-2xl border border-gray-300 bg-white px-5 py-4 outline-none focus:border-black transition cursor-pointer"
            >
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

            <select 
              value={selectedBodyType}
              onChange={(e) => setSelectedBodyType(e.target.value)}
              className="w-full rounded-2xl border border-gray-300 bg-white px-5 py-4 outline-none focus:border-black transition cursor-pointer"
            >
              {bodyTypes.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </div>

        </div>

        {/* Button */}

        <div className="mt-8">
          <button 
            onClick={handleSearch}
            className="flex items-center gap-3 rounded-2xl bg-[#1f1f1f] px-8 py-4 text-white font-semibold shadow-lg hover:bg-black transition-all duration-300 hover:scale-[1.02] cursor-pointer"
          >
            <FaSearch />
            Search Cars
          </button>
        </div>

      </div>
    </section>
  );
};

export default Search;