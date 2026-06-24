import React from "react";

const brands = [
  { name: "Maruti Suzuki", logo: "/brands/maruti.png" },
  { name: "Hyundai", logo: "/brands/hyundai.png" },
  { name: "Tata Motors", logo: "/brands/tata.png" },
  { name: "Honda", logo: "/brands/honda.png" },
  { name: "Toyota", logo: "/brands/toyota.png" },
  { name: "Mahindra", logo: "/brands/mahindra.png" },
  { name: "Kia", logo: "/brands/kia.png" },
  { name: "Volkswagen", logo: "/brands/volkswagen.png" },
  { name: "Ford", logo: "/brands/ford.png" },
  { name: "Renault", logo: "/brands/renault.png" },
  { name: "MG Motor", logo: "/brands/mg.png" },
  { name: "Skoda", logo: "/brands/skoda.png" },
];

const BrowseBrands = () => {
  return (
    <section className="bg-white py-24">

      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}

        <div className="text-center mb-16">

          <p className="uppercase tracking-[4px] text-sm font-semibold text-gray-500">
            Browse By Brand
          </p>

          <h2 className="mt-3 text-5xl font-extrabold text-[#1a1a1a]">
            Second Hand Cars of Your Favourite Brand
          </h2>

          <p className="mt-3 text-md text-gray-500">
            Choose your preferred brand and explore certified pre-owned
            options available in Pune.
          </p>

        </div>

        {/* Brand Grid */}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">

          {brands.map((brand) => (

            <div
              key={brand.name}
              className="group cursor-pointer rounded-3xl border border-gray-200 bg-[#fafafa] p-5 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >

              <div className="flex items-center justify-center h-15 rounded-2xl bg-white border border-gray-200 shadow-sm">

                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="h-10 object-contain transition duration-300 group-hover:scale-110"
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