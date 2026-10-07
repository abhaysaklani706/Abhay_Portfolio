import Link from "next/link";

import { FOOTER_DATA } from "@/constants";

export const Footer = () => {
  return (
    <div className="w-full h-full bg-transparent text-gray-200 shadow-lg p-[15px]">
      <div className="w-full flex flex-col items-center justify-center m-auto">
        <div className="w-full h-full grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-4 place-items-center mb-6">
          {FOOTER_DATA.map((column) => (
            <div
              key={column.title}
              className="w-full sm:w-auto sm:min-w-[160px] h-auto flex flex-col items-center justify-start"
            >
              <h3 className="font-bold text-[16px]">{column.title}</h3>
              {column.data.map(({ icon: Icon, name, link }) => (
                <Link
                  key={`${column.title}-${name}`}
                  href={link}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex flex-row items-center my-2 sm:my-[15px]"
                >
                  {Icon && <Icon />}
                  <span className="text-[15px] ml-[6px]">{name}</span>
                </Link>
              ))}
            </div>
          ))}
        </div>

        <div className="mb-[20px] text-[13px] sm:text-[15px] text-center px-4">
          &copy; Abhay Saklani {new Date().getFullYear()}. All rights reserved.
        </div>
      </div>
    </div>
  );
};
