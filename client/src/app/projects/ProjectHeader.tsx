import Header from "@/components/header";
import {
  Clock,
  Filter,
  Grid3X3,
  List,
  PlusSquare,
  Share2,
  Table,
} from "lucide-react";
import React, { useState } from "react";
import ModalNewProject from "../projects/modalNewProject";

type Props = {
  activeTab: string;
  setActiveTab: (tabName: string) => void;
};

const ProjectHeader = ({ activeTab, setActiveTab }: Props) => {
  const [isModalNewProjectOpen, setIsModalNewProjectOpen] = useState(false);
  return (
    <div className="px-4 xl:px-6">
      <ModalNewProject
        isOpen={isModalNewProjectOpen}
        onClose={() => setIsModalNewProjectOpen(false)}

      />
      <div className="pt-6 lg:pt-8 pb-6 lg:pb-4">
        <Header
          name="NxtGen WebWorks Development"
          buttonComponent={
            <button
              className="flex items-center bg-blue-primary hover:bg-blue-600 px-3 py-2 rounded-md text-white"
              onClick={() => setIsModalNewProjectOpen(true)}
            >
              <PlusSquare className="mr-2 w-5 h-5" />
              New Project
            </button>
          }
        />
      </div>

      {/* TABS */}
      <div className="flex flex-wrap-reverse md:items-center gap-2 border-gray-200 border-y dark:border-stroke-dark pt-2 pb-[8px]">
        <div className="flex flex-1 items-center gap-2 md:gap-4">
          <TabButton
            name="Board"
            icon={<Grid3X3 className="w-5 h-5" />}
            setActiveTab={setActiveTab}
            activeTab={activeTab}
          />
          <TabButton
            name="List"
            icon={<List className="w-5 h-5" />}
            setActiveTab={setActiveTab}
            activeTab={activeTab}
          />
          <TabButton
            name="Timeline"
            icon={<Clock className="w-5 h-5" />}
            setActiveTab={setActiveTab}
            activeTab={activeTab}
          />
          <TabButton
            name="Table"
            icon={<Table className="w-5 h-5" />}
            setActiveTab={setActiveTab}
            activeTab={activeTab}
          />
        </div>
        <div className="flex items-center gap-2">
          <button className="text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 dark:text-neutral-500">
            <Filter className="w-5 h-5" />
          </button>
          <button className="text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 dark:text-neutral-500">
            <Share2 className="w-5 h-5" />
          </button>
          <div className="relative">
            <input
              type="text"
              placeholder="Search Task"
              className="dark:border-dark-secondary dark:bg-dark-secondary py-1 pl-10 border rounded-md dark:text-white focus:outline-none"
            />
            <Grid3X3 className="top-2 left-3 absolute w-4 h-4 text-gray400 dark:text-neutral-500" />
          </div>
        </div>
      </div>
    </div>
  );
};

type TabButtonProps = {
  name: string;
  icon: React.ReactNode;
  setActiveTab: (tabName: string) => void;
  activeTab: string;
};

const TabButton = ({ name, icon, setActiveTab, activeTab }: TabButtonProps) => {
  const isActive = activeTab === name;
  return (
    <button
      className={`relative flex items-center gap-2 px-1 py-2 text-gray-500 after:absolute after:-bottom-[9px] after:left-0 after:h-[1px] after:w-full hover:text-blue-600 dark:text-neutral-500 dark:hover:text-white sm:px-2 lg:px-4 ${isActive ? "text-blue-600 after:bg-blue-600 dark:text-white" : ""}`}
      onClick={() => setActiveTab(name)}
    >
      {icon}
      {name}
    </button>
  );
};

export default ProjectHeader;
