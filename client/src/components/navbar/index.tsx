import React from "react";
import { Menu, Moon, Search, Settings, Sun } from "lucide-react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsDarkMode, setIsSidebarCollapsed } from "@/state";

type Props = {};

const Navbar = (props: Props) => {
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed,
  );

  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  return (
    <div className="flex justify-between items-center bg-white dark:bg-black px-4 py-3">
      {/* Search */}
      <div className="flex items-center gap-8">
        {!isSidebarCollapsed ? null : (
          <button
            onClick={() => dispatch(setIsSidebarCollapsed(!isSidebarCollapsed))}
          >
            <Menu className="w-8 h-8 dark:text-white" />
          </button>
        )}
        <div className="relative flex w-[200px] h-min">
          <Search className="top-1/2 left-[4px] absolute mr-2 w-5 h-5 dark:text-white transform -translate-y-1/2 cursor-pointer" />
          <input
            className="bg-gray-100 dark:bg-gray-700 p-2 pl-8 focus:border-transparent border-none rounded w-full dark:text-white focus:outline-none dark:placeholder-white placeholder-gray-500"
            type="search"
            placeholder="Search..."
          />
        </div>
      </div>
      {/* Icons */}
      <div className="flex items-center">
        <button
          onClick={() => dispatch(setIsDarkMode(!isDarkMode))}
          className={
            isDarkMode
              ? `rounded p-2 dark:hover:bg-gray-700`
              : `rounded p-2 hover:bg-gray-100`
          }
        >
          {isDarkMode ? (
            <Sun className="w-6 h-6 dark:text-white cursor-pointer" />
          ) : (
            <Moon className="w-6 h-6 dark:text-white cursor-pointer" />
          )}
        </button>
        <Link
          href="/settings"
          className={
            isDarkMode
              ? `h-min w-min rounded p-2 dark:hover:bg-gray-700`
              : `h-min w-min rounded p-2 hover:bg-gray-100`
          }
        >
          <Settings className="w-6 h-6 dark:text-white cursor-pointer" />
        </Link>
        <div className="md:inline-block hidden bg-gray-200 mr-2 ml-2 w-[0.1rem] min-h-[2em]"></div>
      </div>
    </div>
  );
};

export default Navbar;
