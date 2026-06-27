export const BUSINESS = {
  name: "BudgetCarHub",
  legalName: "BudgetCarHub",
  tagline: "Pune's Trusted Second-Hand Car Dealership",
  description:
    "Buy and sell certified pre-owned cars in Pune. Browse inspected used cars from Suzuki, Hyundai, Honda, Tata & more. Book a test drive at BudgetCarHub, Viman Nagar.",
  phone: "+919922801959",
  email: "budgetcar.hub.pune01@gmail.com",
  address: {
    street: "Sr.No 30, Pune Nagar Rd, near Ramwadi Bus Stop, opp. Canara Bank, Sakore Nagar, Viman Nagar",
    city: "Pune",
    region: "Maharashtra",
    postalCode: "411014",
    country: "IN",
  },
  geo: { latitude: 18.5568421, longitude: 73.9078475 },
  instagram: "https://www.instagram.com/budgetcarhub",
  founded: "2012",
};

export const DEFAULT_OG_IMAGE = "/budgetcarlogo.png";

export const PAGE_SEO = {
  home: {
    title: "Used Cars in Pune | Buy & Sell Second-Hand Cars",
    description:
      "BudgetCarHub – Pune's trusted used car dealer since 2012. Browse 200-point certified pre-owned cars, hot deals, easy finance & test drives in Viman Nagar.",
    keywords:
      "used cars pune, second hand cars pune, pre owned cars pune, buy used car pune, sell car pune, budget car hub, viman nagar car dealer, certified used cars",
  },
  allCars: {
    title: "Browse All Used Cars in Pune",
    description:
      "Explore our full inventory of certified second-hand cars in Pune. Filter by brand, budget, fuel type, transmission & body type at BudgetCarHub.",
    keywords:
      "used cars inventory pune, second hand car listing, pre owned cars for sale pune, buy used car online pune",
  },
  allDeals: {
    title: "Discount Deals on Used Cars in Pune",
    description:
      "Save big on certified pre-owned cars in Pune. Browse exclusive discount deals and limited-time offers at BudgetCarHub, Viman Nagar.",
    keywords:
      "used car deals pune, discount second hand cars, pre owned car offers pune, car sale pune",
  },
  privacy: {
    title: "Privacy Policy",
    description:
      "Read BudgetCarHub's privacy policy. Learn how we collect, use and protect your personal information when you buy or sell used cars in Pune.",
  },
  terms: {
    title: "Terms of Use",
    description:
      "BudgetCarHub terms of use. Understand the rules and conditions for using our used car marketplace and services in Pune.",
  },
};

export const getSiteUrl = () =>
  import.meta.env.VITE_SITE_URL?.replace(/\/$/, "") ||
  (typeof window !== "undefined" ? window.location.origin : "https://budgetcarhub.in");

export const buildTitle = (title) =>
  title.includes("BudgetCarHub") ? title : `${title} | BudgetCarHub Pune`;

export const getOpeningHoursSpec = () => [
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    opens: "10:00",
    closes: "20:00",
  },
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: "Sunday",
    opens: "10:00",
    closes: "18:00",
  },
];

export const getBusinessJsonLd = (siteUrl) => ({
  "@type": "AutoDealer",
  "@id": `${siteUrl}/#business`,
  name: BUSINESS.name,
  alternateName: "Budget Car Hub",
  url: siteUrl,
  logo: `${siteUrl}/budgetcarlogo.png`,
  image: `${siteUrl}/budgetcarlogo.png`,
  description: BUSINESS.description,
  telephone: BUSINESS.phone,
  email: BUSINESS.email,
  foundingDate: BUSINESS.founded,
  priceRange: "₹₹",
  address: {
    "@type": "PostalAddress",
    streetAddress: BUSINESS.address.street,
    addressLocality: BUSINESS.address.city,
    addressRegion: BUSINESS.address.region,
    postalCode: BUSINESS.address.postalCode,
    addressCountry: BUSINESS.address.country,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: BUSINESS.geo.latitude,
    longitude: BUSINESS.geo.longitude,
  },
  openingHoursSpecification: getOpeningHoursSpec(),
  areaServed: {
    "@type": "City",
    name: "Pune",
    containedInPlace: { "@type": "State", name: "Maharashtra" },
  },
  sameAs: [BUSINESS.instagram],
});

export const getWebsiteJsonLd = (siteUrl) => ({
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  url: siteUrl,
  name: BUSINESS.name,
  description: BUSINESS.description,
  publisher: { "@id": `${siteUrl}/#business` },
  inLanguage: "en-IN",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${siteUrl}/all-cars?brand={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
});

export const getHomeJsonLd = (siteUrl) => ({
  "@context": "https://schema.org",
  "@graph": [getBusinessJsonLd(siteUrl), getWebsiteJsonLd(siteUrl)],
});

export const getBreadcrumbJsonLd = (items) => ({
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});

export const getCarJsonLd = (car, siteUrl) => {
  const price =
    typeof car.price === "number"
      ? car.price
      : parseInt(String(car.price || "").replace(/\D/g, ""), 10) || undefined;
  const kms = parseInt(String(car.kms || "").replace(/\D/g, ""), 10) || undefined;
  const carUrl = `${siteUrl}/car/${car.id}`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      getBreadcrumbJsonLd([
        { name: "Home", url: siteUrl },
        { name: "All Cars", url: `${siteUrl}/all-cars` },
        { name: car.name, url: carUrl },
      ]),
      {
        "@type": "Car",
        name: car.name,
        url: carUrl,
        brand: { "@type": "Brand", name: car.brand },
        model: car.model,
        vehicleModelDate: car.year,
        fuelType: car.fuel,
        vehicleTransmission: car.transmission,
        color: car.colorName,
        bodyType: car.bodyType,
        image: car.image,
        description:
          car.description ||
          `${car.name} – ${car.year} certified pre-owned ${car.brand} for sale in Pune at BudgetCarHub.`,
        ...(kms && {
          mileageFromOdometer: {
            "@type": "QuantitativeValue",
            value: kms,
            unitCode: "KMT",
          },
        }),
        ...(price && {
          offers: {
            "@type": "Offer",
            price,
            priceCurrency: "INR",
            availability: "https://schema.org/InStock",
            itemCondition: "https://schema.org/UsedCondition",
            seller: { "@id": `${siteUrl}/#business` },
            url: carUrl,
          },
        }),
      },
    ],
  };
};

export const getCarPageMeta = (car) => {
  const price =
    typeof car.price === "number"
      ? car.price
      : parseInt(String(car.price || "").replace(/\D/g, ""), 10);
  const priceText = price ? `₹${price.toLocaleString("en-IN")}` : "";
  const title = `${car.name}${car.year ? ` ${car.year}` : ""} – Used Car in Pune`;
  const description = [
    `Buy ${car.name}${car.year ? ` (${car.year})` : ""} in Pune.`,
    car.kms && `${car.kms} driven.`,
    car.fuel && `${car.fuel}.`,
    car.transmission && `${car.transmission}.`,
    priceText && `Price: ${priceText}.`,
    "200-point certified. Book a test drive at BudgetCarHub, Viman Nagar.",
  ]
    .filter(Boolean)
    .join(" ");

  return { title, description, ogImage: car.image || DEFAULT_OG_IMAGE };
};
