import { formatDate } from "@/app/helpers/dateHelper";
import Header from "@/components/header";
import TaskCard from "@/components/taskCard";
import { Task } from "@/interfaces/iTask";
import { useGetTasksQuery } from "@/state/api";
import { PlusSquare } from "lucide-react";
import React from "react";

type Props = {
  id: string;
  setIsModalNewTaskOpen: (isOpen: boolean) => void;
};

const ListView = ({ id, setIsModalNewTaskOpen }: Props) => {
  const {
    data: tasks,
    isLoading,
    error,
  } = useGetTasksQuery({ projectId: Number(id) });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred when fetching tasks...</div>;

  return (
    <div className="px-4 xl:px-6 pb-8">
      <div className="pt-5">
        <Header
          name="List"
          buttonComponent={
            <button
              className="flex items-center bg-blue-primary hover:bg-blue-600 px-3 py-2 rounded text-white"
              onClick={() => setIsModalNewTaskOpen(true)}
            >
              <PlusSquare className="mr-2 w-5 h-5" /> New Task
            </button>
          }
          isSmallText
        />
      </div>
      <div className="gap-4 lg:gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {tasks?.map((task: Task) => <TaskCard key={task.id} task={task} />)}
      </div>
    </div>
  );
};

export default ListView;
