import React from "react";
import { useNavigate } from "react-router-dom";

const brands = [
  { name: "Suzuki", logo: "/logos/suzuki.svg" },
  { name: "Hyundai", logo: "/logos/hyundai.svg" },
  { name: "Tata Motors", logo: "/logos/tata.svg" },
  { name: "Honda", logo: "/logos/honda.svg" },
  { name: "Toyota", logo: "/logos/toyota.svg" },
  { name: "Mahindra", logo: "/logos/mahindra.svg" },
  { name: "Kia", logo: "/logos/kia.svg" },
  { name: "Volkswagen", logo: "/logos/volkswagen.svg" },
  { name: "Ford", logo: "/logos/ford.svg" },
  { name: "Renault", logo: "/logos/renault.svg" },
  { name: "MG Motor", logo: "/logos/mg.svg" },
  { name: "Skoda", logo: "/logos/skoda.svg" },
  { name: "Audi", logo: "/logos/audi.svg" },
  { name: "Mercedes-Benz", logo: "/logos/mercedes.svg" },
  { name: "BMW", logo: "/logos/bmw.svg" },
  { name: "Jaguar", logo: "/logos/jaguar.svg" },
];

const BrowseBrands = () => {
  const navigate = useNavigate();

  const handleBrandClick = (name) => {
    let cleanName = name;
    if (name === "Tata Motors") cleanName = "Tata";
    if (name === "MG Motor") cleanName = "MG";
    navigate(`/all-cars?brand=${encodeURIComponent(cleanName)}`);
  };

  return (
    <section className="bg-white py-24">

      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}

        <div className="text-center mb-16">

          <p className="uppercase tracking-[4px] text-sm font-semibold text-gray-500">
            Browse By Brand
          </p>

          <h2 className="mt-3 text-3xl md:text-5xl font-extrabold text-[#1a1a1a]">
            Second Hand Cars of Your Favourite Brand
          </h2>

          <p className="mt-3 text-md text-gray-500">
            Choose your preferred brand and explore certified pre-owned
            options available in Pune.
          </p>

        </div>

        {/* Brand Grid */}

        <div className="flex flex-wrap justify-center gap-6">

          {brands.map((brand) => (

            <div
              key={brand.name}
              onClick={() => handleBrandClick(brand.name)}
              className="w-[calc(50%-12px)] md:w-[calc(33.33%-16px)] lg:w-[calc(16.66%-20px)] group cursor-pointer rounded-3xl border border-gray-200 bg-[#fafafa] p-5 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl flex flex-col justify-between"
            >

              <div className="flex items-center justify-center h-15 rounded-2xl bg-white border border-gray-200 shadow-sm overflow-hidden">

                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="h-9 max-w-full object-contain transition duration-300 group-hover:scale-110 grayscale contrast-150"
                />

              </div>

              <h3 className="mt-5 text-center text-sm font-semibold text-gray-800">
                {brand.name}
              </h3>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
};

export default BrowseBrands;