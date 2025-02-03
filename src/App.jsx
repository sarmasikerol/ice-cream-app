import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/header";
import Home from "./pages/home";

const App = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-red-900 text-white py-[30px] xl:py-[80px] px-[5%]">
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
