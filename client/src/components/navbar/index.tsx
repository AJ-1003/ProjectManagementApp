import React from "react";
import { Menu, Moon, Search, Settings, Sun, User } from "lucide-react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsDarkMode, setIsSidebarCollapsed } from "@/state";
import { useGetAuthUserQuery } from "@/state/api";
import { signOut } from "aws-amplify/auth";
import Image from "next/image";

type Props = {};

const Navbar = (props: Props) => {
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed,
  );

  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  const { data: currentUser } = useGetAuthUserQuery({});
  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  if (!currentUser) return null;
  const currentUserDetails = currentUser.userDetails;

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
            className="bg-gray-100 dark:bg-gray-700 p-2 pl-8 focus:border-transparent border-none rounded w-full dark:text-white placeholder-gray-500 focus:outline-none dark:placeholder-white"
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
        <div className="md:flex justify-between items-center hidden">
          <div className="flex justify-center w-9 h-9 align-center">
            {!!currentUserDetails?.profilePictureUrl ? (
              <Image
                src={`https://aj-pm-s3-images.s3.us-east-1.amazonaws.com/${currentUserDetails.profilePictureUrl!}`}
                alt={currentUserDetails?.username || "User Profile Picture"}
                width={100}
                height={50}
                className="rounded-full h-full object-cover"
              />
            ) : (
              <User className="rounded-full w-6 h-6 dark:text-white cursor-pointer self-center" />
            )}
          </div>
          <span className="mx-3 text-gray-800 dark:text-white">
            {currentUserDetails?.username}
          </span>
          <button
            className="md:block hidden bg-blue-400 hover:bg-blue-500 px-4 py-2 rounded font-bold text-white text-xs"
            onClick={handleSignOut}
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
