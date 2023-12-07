import React from "react";
import logo from "../../assets/images/blackLog.png";
import { Link } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

function Navbar() {
  return (
    <div className="p-2 bg-[#DAB830] flex justify-between font  ">
      <div>
        <Link to="/">
          <ArrowLeftIcon className="w-12 my-auto text-gray-600" />
        </Link>
      </div>
      <div className="font-[Geo] text-3xl my-auto">
              myna
      </div>
      <div className="font-[Geo] text-3xl my-auto">
        <Link to="/">
          <img className="w-14" src={logo} />
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
