


import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import CarDetailPage from "./pages/CarDetailPage";
import AllCars from "./pages/AllCars";
import AllDeals from "./pages/AllDeals";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/all-cars" element={<AllCars />} />
      <Route path="/all-deals" element={<AllDeals />} />
      <Route path="/car/:id" element={<CarDetailPage />} />
    </Routes>
  );
};

export default App;