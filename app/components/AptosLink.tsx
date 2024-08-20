import Image from "next/image";
import AptosIcon from "../svg/aptos.svg";
import { useState } from "react";

const AptosLink = () => {
  const [isHovering, setIsHovering] = useState(false);
  return (
    <div className="fixed left-4 bottom-4 p-2 rounded-xl flex items-center space-x-3">
      <div className="p-[11px] rounded-xl bg-white bg-opacity-40 backdrop-blur-md">
        <div className="flex justify-center space-x-2 items-center">
          <a
            onMouseEnter={() => {
              setIsHovering(true);
            }}
            onMouseLeave={() => {
              setIsHovering(false);
            }}
            href="https://aptos-web3-template.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-[7.5px] transform transition-transform duration-300  hover:-rotate-12 bg-black rounded-[8px]"
          >
            <Image
              src={AptosIcon}
              alt="Aptos"
              height={25}
              className="opacity-60"
            />
          </a>
        </div>
      </div>
      <span
        className={`text-white ${
          isHovering ? "opacity-40 translate-x-0" : "opacity-0 -translate-x-1/3"
        } transition-all duration-300 -z-10`}
      >
        Go to Aptos Template
      </span>
    </div>
  );
};

export default AptosLink;
