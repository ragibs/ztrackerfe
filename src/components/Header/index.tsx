import Image from "next/image";
import React from "react";
import { ModeToggle } from "../ui/modeToggle";

const Header = () => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center">
        <Image alt="logo" src="/logo.png" width={50} height={30} />
        <h2 className="text-xl">/pricetracker</h2>
      </div>
      <ModeToggle />
    </div>
  );
};

export default Header;
