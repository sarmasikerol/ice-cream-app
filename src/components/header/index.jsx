import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className=" flex justify-between items-center fs-5">
      <div className="flex gap-[18px] items-center">
        <img
          className="size-[45px] lg:size-[55px] 2xl:size-[78px]"
          src="/logo.svg"
          alt="logo"
        />
        <h2 className="font-black max-sm:hidden">
          Drop
          <br /> Cream
        </h2>
      </div>

      <nav className="flex items-center gap-[10px] sm:gap-[20px] lg:gap-[30px] 2xl:gap-[50px]">
        <Link to="/">Anasayfa</Link>
        <Link to="/">Hakkımızda</Link>
        <Link to="/">Yakındakiler</Link>
        <Link to="/">
          <img src="/search.svg" alt="" />
        </Link>
      </nav>

      <button>
        <img
          className="size-[24px] 2xl:size-[30px]"
          src="group.svg"
          alt="group"
        />
      </button>
    </header>
  );
};

export default Header;
