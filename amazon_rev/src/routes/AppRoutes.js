import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Test from "../components/home";
import Layout from "../components/Layout";
import NegativeReviews from "../components/NegativeReviews";
import PositiveReviews from "../components/PositiveReviews";
import PopolurPositive from "../components/PopolurPositive";
import PopolurNegative from "../components/PopolurNegative";
import SearchPath from "../components/SearchPath";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Test />} />
          <Route path="NegativeReviews" element={<NegativeReviews />} />
          <Route path="PositiveReviews" element={<PositiveReviews />} />
          <Route path="PopolurPositive" element={<PopolurPositive />} />
          <Route path="PopolurNegative" element={<PopolurNegative />} />
          <Route path="SearchPath" element={<SearchPath />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
