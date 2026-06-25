import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
    FaCalendarAlt,
    FaGasPump,
    FaRoad,
    FaCog,
} from "react-icons/fa";
import useCars from "../hooks/useCars";
import NavbarSearch from "../components/NavbarSearch";

const AllCars = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchQuery, setSearchQuery] = React.useState("");
    const { cars, loading } = useCars();

    // Filter categories arrays
    const brands = [
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

    const fuelTypes = [
        "Petrol",
        "Diesel",
        "CNG",
        "Electric",
        "Hybrid",
    ];

    const bodyTypes = [
        "Hatchback",
        "Sedan",
        "SUV",
        "Compact SUV",
        "MUV",
        "Coupe",
        "Convertible",
    ];

    const transmissions = [
        "Manual",
        "Automatic",
        "AMT",
        "CVT",
        "DCT",
    ];

    const years = [
        "2024 & above",
        "2022 & above",
        "2020 & above",
        "2018 & above",
        "2016 & above",
    ];

    const owners = [
        "2nd Owner",
        "3rd Owner",
    ];

    const colors = [
        { name: "White", className: "bg-white border-gray-200" },
        { name: "Black", className: "bg-black" },
        { name: "Silver", className: "bg-gray-300" },
        { name: "Grey", className: "bg-gray-500" },
        { name: "Red", className: "bg-red-600" },
        { name: "Blue", className: "bg-blue-600" },
        { name: "Green", className: "bg-green-600" },
        { name: "Yellow", className: "bg-yellow-400" },
        { name: "Orange", className: "bg-orange-500" },
        { name: "Brown", className: "bg-amber-700" },
    ];

    // Filter states
    const [maxPrice, setMaxPrice] = React.useState(7000000);
    const [selectedBrands, setSelectedBrands] = React.useState([]);
    const [brandSearchQuery, setBrandSearchQuery] = React.useState("");
    const [selectedYearLimit, setSelectedYearLimit] = React.useState(null);
    const [selectedFuelTypes, setSelectedFuelTypes] = React.useState([]);
    const [selectedBodyTypes, setSelectedBodyTypes] = React.useState([]);
    const [selectedTransmissions, setSelectedTransmissions] = React.useState([]);
    const [selectedOwner, setSelectedOwner] = React.useState(null);
    const [selectedColor, setSelectedColor] = React.useState(null);
    const [sortBy, setSortBy] = React.useState("Newest First");

    // Initialize states from URL parameters
    React.useEffect(() => {
        const brandParam = searchParams.get("brand");
        const budgetParam = searchParams.get("budget");
        const fuelParam = searchParams.get("fuel");
        const transParam = searchParams.get("transmission");
        const bodyParam = searchParams.get("bodyType");

        if (brandParam) {
            setSelectedBrands([brandParam]);
        } else {
            setSelectedBrands([]);
        }

        if (budgetParam) {
            if (budgetParam.includes("Below ₹3 Lakh") || budgetParam.toLowerCase().includes("3 lakh") || budgetParam.includes("300000")) setMaxPrice(300000);
            else if (budgetParam.includes("₹3 - ₹5 Lakh") || budgetParam.toLowerCase().includes("3 - 5") || budgetParam.includes("500000")) setMaxPrice(500000);
            else if (budgetParam.includes("₹5 - ₹8 Lakh") || budgetParam.toLowerCase().includes("5 - 8") || budgetParam.includes("800000")) setMaxPrice(800000);
            else if (budgetParam.includes("₹8 - ₹12 Lakh") || budgetParam.toLowerCase().includes("8 - 12") || budgetParam.includes("1200000")) setMaxPrice(1200000);
            else if (budgetParam.includes("₹12 - ₹20 Lakh") || budgetParam.toLowerCase().includes("12 - 20") || budgetParam.includes("2000000")) setMaxPrice(2000000);
            else if (budgetParam.includes("Above ₹20 Lakh") || budgetParam.toLowerCase().includes("above 20") || budgetParam.includes("7000000")) setMaxPrice(7000000);
        } else {
            setMaxPrice(7000000);
        }

        if (fuelParam) {
            setSelectedFuelTypes([fuelParam]);
        } else {
            setSelectedFuelTypes([]);
        }

        if (transParam) {
            setSelectedTransmissions([transParam]);
        } else {
            setSelectedTransmissions([]);
        }

        if (bodyParam) {
            setSelectedBodyTypes([bodyParam]);
        } else {
            setSelectedBodyTypes([]);
        }
    }, [searchParams]);

    // Handlers
    const toggleBrand = (brand) => {
        setSelectedBrands(prev =>
            prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
        );
    };

    const toggleFuelType = (fuel) => {
        setSelectedFuelTypes(prev =>
            prev.includes(fuel) ? prev.filter(f => f !== fuel) : [...prev, fuel]
        );
    };

    const toggleBodyType = (body) => {
        setSelectedBodyTypes(prev =>
            prev.includes(body) ? prev.filter(b => b !== body) : [...prev, body]
        );
    };

    const toggleTransmission = (trans) => {
        setSelectedTransmissions(prev =>
            prev.includes(trans) ? prev.filter(t => t !== trans) : [...prev, trans]
        );
    };

    const handleReset = () => {
        setMaxPrice(7000000);
        setSelectedBrands([]);
        setBrandSearchQuery("");
        setSelectedYearLimit(null);
        setSelectedFuelTypes([]);
        setSelectedBodyTypes([]);
        setSelectedTransmissions([]);
        setSelectedOwner(null);
        setSelectedColor(null);
        setSortBy("Newest First");
        setSearchQuery("");
        setSearchParams({});
    };

    const handleApply = () => {
        const newParams = new URLSearchParams();
        if (selectedBrands.length > 0) newParams.set("brand", selectedBrands[0]);

        if (maxPrice < 7000000) {
            if (maxPrice === 300000) newParams.set("budget", "Below ₹3 Lakh");
            else if (maxPrice === 500000) newParams.set("budget", "₹3 - ₹5 Lakh");
            else if (maxPrice === 800000) newParams.set("budget", "₹5 - ₹8 Lakh");
            else if (maxPrice === 1200000) newParams.set("budget", "₹8 - ₹12 Lakh");
            else if (maxPrice === 2000000) newParams.set("budget", "₹12 - ₹20 Lakh");
            else newParams.set("budget", `${maxPrice}`);
        }
        if (selectedFuelTypes.length > 0) newParams.set("fuel", selectedFuelTypes[0]);
        if (selectedTransmissions.length > 0) newParams.set("transmission", selectedTransmissions[0]);
        if (selectedBodyTypes.length > 0) newParams.set("bodyType", selectedBodyTypes[0]);

        setSearchParams(newParams);
    };

    // Helper functions for parsing properties
    // const parsePriceNumeric = (priceStr) => {
    //     return parseInt(priceStr.replace(/[^\d]/g, ""), 10);
    // };

    const parsePriceNumeric = (price) => Number(price);

    const parseKmsNumeric = (kmsStr) => {
        return parseInt(kmsStr.replace(/[^\d]/g, ""), 10);
    };

    // Filtered cars computation
    const filteredCars = React.useMemo(() => {
        return cars.filter(car => {
            // Search Query from navbar
            if (searchQuery) {
                const query = searchQuery.toLowerCase();
                const matchesSearch =
                    car.name.toLowerCase().includes(query) ||
                    (car.brand && car.brand.toLowerCase().includes(query)) ||
                    car.fuel.toLowerCase().includes(query) ||
                    car.transmission.toLowerCase().includes(query) ||
                    (car.bodyType && car.bodyType.toLowerCase().includes(query));
                if (!matchesSearch) return false;
            }

            // Price range
            const price = parsePriceNumeric(car.price);
            if (price > maxPrice) return false;

            // Brand
            if (selectedBrands.length > 0) {
                if (!car.brand || !selectedBrands.includes(car.brand)) {
                    return false;
                }
            }

            // Year Limit
            if (selectedYearLimit) {
                const carYear = parseInt(car.year, 10);
                if (carYear < selectedYearLimit) return false;
            }

            // Fuel Type
            if (selectedFuelTypes.length > 0) {
                if (!selectedFuelTypes.includes(car.fuel)) {
                    return false;
                }
            }

            // Body Type
            if (selectedBodyTypes.length > 0) {
                if (!car.bodyType || !selectedBodyTypes.includes(car.bodyType)) {
                    return false;
                }
            }

            // Transmission
            if (selectedTransmissions.length > 0) {
                if (!selectedTransmissions.includes(car.transmission)) {
                    return false;
                }
            }

            // Owner
            if (selectedOwner) {
                if (!car.owner || car.owner !== selectedOwner) {
                    return false;
                }
            }

            // Color
            if (selectedColor) {
                if (!car.colorName || car.colorName !== selectedColor) {
                    return false;
                }
            }

            return true;
        }).sort((a, b) => {
            if (sortBy === "Price: Low to High") {
                return parsePriceNumeric(a.price) - parsePriceNumeric(b.price);
            }
            if (sortBy === "Price: High to Low") {
                return parsePriceNumeric(b.price) - parsePriceNumeric(a.price);
            }
            if (sortBy === "Year: Newest") {
                return parseInt(b.year, 10) - parseInt(a.year, 10);
            }
            if (sortBy === "KMs Driven") {
                return parseKmsNumeric(a.kms) - parseKmsNumeric(b.kms);
            }
            // "Newest First" (default sort by date desc or string ID desc)
            const dateA = a.createdAt?.seconds || 0;
            const dateB = b.createdAt?.seconds || 0;
            if (dateA && dateB) return dateB - dateA;
            return String(b.id).localeCompare(String(a.id));
        });
    }, [searchQuery, maxPrice, selectedBrands, selectedYearLimit, selectedFuelTypes, selectedBodyTypes, selectedTransmissions, selectedOwner, selectedColor, sortBy]);

    return (
        <>
            <NavbarSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <section className="bg-[#f6f7fb] min-h-screen py-8 text-gray-900">
                <div className="max-w-7xl mx-auto px-6">

                    {/* Header Navigation & Title */}
                    <div className="mb-8">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                            <div>
                                <p className="text-xs font-bold uppercase tracking-wider text-gray-500">
                                    Browse Cars
                                </p>
                                <h1 className="mt-1 text-3xl font-extrabold text-gray-900 tracking-tight">
                                    Available Inventory
                                </h1>
                                <p className="mt-1 text-sm text-gray-500 max-w-xl">
                                    Explore our certified pre-owned cars with transparent pricing.
                                </p>
                            </div>

                            {/* Top Bar Stats & Sort */}
                            <div className="flex items-center gap-4 self-start md:self-end">
                                <p className="text-sm text-gray-500 font-medium whitespace-nowrap">
                                    {filteredCars.length} Cars Found
                                </p>
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 outline-none hover:bg-gray-50 transition shadow-sm cursor-pointer"
                                >
                                    <option>Newest First</option>
                                    <option>Price: Low to High</option>
                                    <option>Price: High to Low</option>
                                    <option>Year: Newest</option>
                                    <option>KMs Driven</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Main Layout Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

                        {/* ================= LEFT FILTERS SIDEBAR ================= */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                                <h2 className="mb-4 text-lg font-bold text-gray-900">
                                    Filters
                                </h2>

                                <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-1">
                                    {/* Price Range */}
                                    <div>
                                        <div className="mb-2 flex items-center justify-between">
                                            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">
                                                Price Range
                                            </h3>
                                            <span className="text-xs font-bold text-gray-800 bg-gray-150 px-2 py-0.5 rounded-md">
                                                {maxPrice === 7000000 ? "Any Price" : `Up to ₹${maxPrice.toLocaleString("en-IN")}`}
                                            </span>
                                        </div>
                                        <input
                                            type="range"
                                            min="50000"
                                            max="7000000"
                                            step="50000"
                                            value={maxPrice}
                                            onChange={(e) => setMaxPrice(parseInt(e.target.value, 10))}
                                            className="w-full cursor-pointer accent-gray-600"
                                        />
                                        <div className="mt-1.5 flex justify-between text-xs font-semibold text-gray-500">
                                            <span>₹50,000</span>
                                            <span>₹70,00,000</span>
                                        </div>
                                    </div>

                                    <hr className="border-gray-100" />

                                    {/* Brands */}
                                    <div>
                                        <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-gray-400">
                                            Brands
                                        </h3>
                                        <input
                                            type="text"
                                            value={brandSearchQuery}
                                            onChange={(e) => setBrandSearchQuery(e.target.value)}
                                            placeholder="Search Brand..."
                                            className="mb-3 w-full rounded-lg border border-gray-200 px-3 py-1.5 text-xs text-gray-800 placeholder-gray-400 outline-none focus:border-gray-400 transition"
                                        />
                                        <div className="space-y-2 max-h-40 overflow-y-auto text-xs font-medium text-gray-700 scrollbar-thin">
                                            {brands
                                                .filter(b => b.toLowerCase().includes(brandSearchQuery.toLowerCase()))
                                                .map((brand) => (
                                                    <label key={brand} className="flex items-center gap-2.5 cursor-pointer hover:text-gray-955 transition">
                                                        <input
                                                            type="checkbox"
                                                            checked={selectedBrands.includes(brand)}
                                                            onChange={() => toggleBrand(brand)}
                                                            className="rounded-sm border-gray-300 text-gray-600 focus:ring-gray-400 cursor-pointer"
                                                        />
                                                        <span>{brand}</span>
                                                    </label>
                                                ))}
                                        </div>
                                    </div>

                                    <hr className="border-gray-100" />

                                    {/* Year */}
                                    <div>
                                        <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-gray-400">
                                            Year
                                        </h3>
                                        <div className="space-y-2 text-xs font-medium text-gray-700">
                                            {years.map((yearStr) => {
                                                const yearVal = parseInt(yearStr, 10);
                                                return (
                                                    <label key={yearStr} className="flex items-center gap-2.5 cursor-pointer hover:text-gray-950 transition">
                                                        <input
                                                            type="radio"
                                                            name="year"
                                                            checked={selectedYearLimit === yearVal}
                                                            onChange={() => setSelectedYearLimit(yearVal)}
                                                            className="border-gray-300 text-gray-600 focus:ring-gray-400 cursor-pointer"
                                                        />
                                                        <span>{yearStr}</span>
                                                    </label>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    <hr className="border-gray-100" />

                                    {/* Fuel Type */}
                                    <div>
                                        <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-gray-400">
                                            Fuel Type
                                        </h3>
                                        <div className="space-y-2 text-xs font-medium text-gray-700">
                                            {fuelTypes.map((fuel) => (
                                                <label key={fuel} className="flex items-center gap-2.5 cursor-pointer hover:text-gray-955 transition">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedFuelTypes.includes(fuel)}
                                                        onChange={() => toggleFuelType(fuel)}
                                                        className="rounded-sm border-gray-300 text-gray-600 focus:ring-gray-400 cursor-pointer"
                                                    />
                                                    <span>{fuel}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    <hr className="border-gray-100" />

                                    {/* Body Type */}
                                    <div>
                                        <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-gray-400">
                                            Body Type
                                        </h3>
                                        <div className="space-y-2 text-xs font-medium text-gray-700">
                                            {bodyTypes.map((body) => (
                                                <label key={body} className="flex items-center gap-2.5 cursor-pointer hover:text-gray-955 transition">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedBodyTypes.includes(body)}
                                                        onChange={() => toggleBodyType(body)}
                                                        className="rounded-sm border-gray-300 text-gray-600 focus:ring-gray-400 cursor-pointer"
                                                    />
                                                    <span>{body}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    <hr className="border-gray-100" />

                                    {/* Transmission */}
                                    <div>
                                        <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-gray-400">
                                            Transmission
                                        </h3>
                                        <div className="space-y-2 text-xs font-medium text-gray-700">
                                            {transmissions.map((item) => (
                                                <label key={item} className="flex items-center gap-2.5 cursor-pointer hover:text-gray-955 transition">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedTransmissions.includes(item)}
                                                        onChange={() => toggleTransmission(item)}
                                                        className="rounded-sm border-gray-300 text-gray-600 focus:ring-gray-400 cursor-pointer"
                                                    />
                                                    <span>{item}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    <hr className="border-gray-100" />

                                    {/* Owner */}
                                    <div>
                                        <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-gray-400">
                                            Owner
                                        </h3>
                                        <div className="space-y-2 text-xs font-medium text-gray-700">
                                            {owners.map((owner) => (
                                                <label key={owner} className="flex items-center gap-2.5 cursor-pointer hover:text-gray-955 transition">
                                                    <input
                                                        type="radio"
                                                        name="owner"
                                                        checked={selectedOwner === owner}
                                                        onChange={() => setSelectedOwner(owner)}
                                                        className="border-gray-305 bg-white text-gray-600 focus:ring-gray-400 cursor-pointer"
                                                    />
                                                    <span>{owner}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    <hr className="border-gray-100" />

                                    {/* Color */}
                                    <div>
                                        <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-gray-400">
                                            Color
                                        </h3>
                                        <div className="flex flex-wrap gap-2.5">
                                            {colors.map((color) => (
                                                <button
                                                    key={color.name}
                                                    title={color.name}
                                                    onClick={() => setSelectedColor(selectedColor === color.name ? null : color.name)}
                                                    className={`h-6 w-6 rounded-full border shadow-sm cursor-pointer hover:scale-110 transition ${color.className} ${selectedColor === color.name ? "ring-2 ring-gray-900 ring-offset-2 scale-110" : "border-gray-200"}`}
                                                ></button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Reset / Apply Buttons */}
                                <div className="mt-5 flex gap-3 pt-3 border-t border-gray-100">
                                    <button
                                        onClick={handleReset}
                                        className="flex-1 rounded-xl border border-gray-200 py-2.5 text-xs font-bold text-gray-650 hover:bg-gray-50 transition cursor-pointer"
                                    >
                                        Reset
                                    </button>
                                    <button
                                        onClick={handleApply}
                                        className="flex-1 rounded-xl bg-gray-900 py-2.5 text-xs font-bold text-white hover:bg-gray-800 transition shadow-sm cursor-pointer"
                                    >
                                        Apply
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* ================= RIGHT CARS GRID ================= */}
                        <div className="lg:col-span-3">
                            {filteredCars.length === 0 ? (
                                <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center shadow-xs">
                                    <div className="text-4xl mb-4">🔍</div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-1">No Cars Found</h3>
                                    <p className="text-sm text-gray-500 mb-6 max-w-sm mx-auto">We couldn't find any cars matching your current filters. Try resetting the filters or broadening your search query.</p>
                                    <button
                                        onClick={handleReset}
                                        className="px-5 py-2.5 rounded-xl bg-gray-900 text-xs font-bold text-white hover:bg-gray-800 transition cursor-pointer shadow-sm"
                                    >
                                        Clear All Filters
                                    </button>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                                    {filteredCars.map((car) => (
                                        <div
                                            key={car.id}
                                            className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg flex flex-col justify-between"
                                        >
                                            {/* Image Section */}
                                            <div className="relative overflow-hidden h-36 bg-gray-100 shrink-0">
                                                <img
                                                    src={car.image}
                                                    alt={car.name}
                                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                />
                                                <span
                                                    className="absolute left-3 top-3 rounded-md bg-gray-900/80 backdrop-blur-xs px-2.5 py-0.5 text-[9px] font-bold text-white shadow-sm uppercase tracking-wider"
                                                >
                                                    {car.badge}
                                                </span>
                                            </div>

                                            {/* Content Section */}
                                            <div className="p-4 flex flex-col justify-between grow">
                                                <div>
                                                    <h3 className="truncate text-base font-bold text-gray-900 leading-snug">
                                                        {car.name}
                                                    </h3>
                                                    <p className="mt-1 text-lg font-extrabold text-gray-950">
                                                        ₹{Number(car.price).toLocaleString("en-IN")}
                                                    </p>

                                                    {/* Specs Pill Grid */}
                                                    <div className="mt-3.5 grid grid-cols-2 gap-2 text-[11px] font-medium text-gray-600">
                                                        <div className="flex items-center gap-1.5 rounded-lg bg-gray-50 px-2.5 py-1.5">
                                                            <FaCalendarAlt className="text-gray-400" />
                                                            <span>{car.year}</span>
                                                        </div>
                                                        <div className="flex items-center gap-1.5 rounded-lg bg-gray-50 px-2.5 py-1.5">
                                                            <FaRoad className="text-gray-400" />
                                                            <span>{car.kms}</span>
                                                        </div>
                                                        <div className="flex items-center gap-1.5 rounded-lg bg-gray-50 px-2.5 py-1.5">
                                                            <FaGasPump className="text-gray-400" />
                                                            <span>{car.fuel}</span>
                                                        </div>
                                                        <div className="flex items-center gap-1.5 rounded-lg bg-gray-50 px-2.5 py-1.5">
                                                            <FaCog className="text-gray-400" />
                                                            <span>{car.transmission}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* View Details Button */}
                                                <button
                                                    onClick={() => navigate(`/car/${car.id}`)}
                                                    className="mt-4 w-full rounded-xl bg-gray-900 py-2.5 text-xs font-semibold text-white transition-all duration-300 hover:bg-gray-800 hover:shadow-lg hover:shadow-gray-800/10 cursor-pointer"
                                                >
                                                    View Details
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                    </div>
                </div>
            </section>
        </>
    );
};

export default AllCars;