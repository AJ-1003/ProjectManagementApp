import { useAppSelector } from "@/app/redux";
import { useGetTasksQuery } from "@/state/api";
import React, { useMemo, useState } from "react";
import { DisplayOption, Gantt, ViewMode } from "gantt-task-react";
import "gantt-task-react/dist/index.css";
import { PlusSquare } from "lucide-react";

type Props = {
  id: string;
  setIsModalNewTaskOpen: (isOpen: boolean) => void;
};

type TaskTypeItems = "task" | "milestone" | "project";

const TimelineView = ({ id, setIsModalNewTaskOpen }: Props) => {
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  const {
    data: tasks,
    isLoading,
    error,
  } = useGetTasksQuery({ projectId: Number(id) });

  const [displayOptions, setDisplayOptions] = useState<DisplayOption>({
    viewMode: ViewMode.Month,
    locale: "en-US",
  });

  const ganttTasks = useMemo(() => {
    return (
      tasks?.map((task) => ({
        start: new Date(task.startDate as string),
        end: new Date(task.dueDate as string),
        name: task.title,
        id: `Task-${task.id}`,
        type: "task" as TaskTypeItems,
        progress: task.points ? (task.points / 10) * 100 : 0,
        isDisabled: false,
      })) || []
    );
  }, [tasks]);

  const handleViewModeChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setDisplayOptions((prev) => ({
      ...prev,
      viewMode: event.target.value as ViewMode,
    }));
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred when fetching tasks...</div>;

  return (
    <div className="px-4 xl:px6">
      <div className="flex flex-wrap justify-between items-center gap-2 py-5">
        <h1 className="font-bold text-lg dark:text-white me-2">
          Project Task Timeline
        </h1>
        <div className="inline-block relative w-64">
          <select
            className="block border-gray-400 hover:border-gray-500 dark:border-dark-secondary bg-white dark:bg-dark-secondary shadow focus:shadow-outline px-4 py-2 pr-8 border rounded w-full dark:text-white leading-tight appearance-none focus:outline-none"
            value={displayOptions.viewMode}
            onChange={handleViewModeChange}
          >
            <option value={ViewMode.Day}>Day</option>
            <option value={ViewMode.Week}>Week</option>
            <option value={ViewMode.Month}>Month</option>
          </select>
        </div>
      </div>

      <div className="bg-white dark:bg-dark-secondary shadow rounded-md dark:text-white overflow-hidden">
        <div className="timeline">
          <Gantt
            tasks={ganttTasks}
            {...displayOptions}
            columnWidth={displayOptions.viewMode === ViewMode.Month ? 150 : 100}
            listCellWidth="100px"
            barBackgroundColor={isDarkMode ? "#101214" : "#aeb8c2"}
            barBackgroundSelectedColor={isDarkMode ? "#000" : "#9ba1a6"}
          />
        </div>
        <div className="px-4 pt-1 pb-5">
          <button
            className="flex items-center bg-blue-primary hover:bg-blue-600 px-3 py-2 rounded text-white"
            onClick={() => setIsModalNewTaskOpen(true)}
          >
            <PlusSquare className="mr-2 w-5 h-5" /> New Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimelineView;
