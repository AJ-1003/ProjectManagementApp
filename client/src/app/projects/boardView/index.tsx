import { Task as TaskType } from "@/interfaces/iTask";
import { useGetTasksQuery, useUpdateTaskStatusMutation } from "@/state/api";
import { formatDate } from "@/app/helpers/dateHelper";
import {
  EllipsisVertical,
  MessageSquareMore,
  Plus
} from "lucide-react";
import Image from "next/image";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

type Props = {
  id: string;
  setIsModalNewTaskOpen: (isOpen: boolean) => void;
};

const taskStatus = ["To Do", "Work In Progress", "Under Review", "Completed"];

const BoardView = ({ id, setIsModalNewTaskOpen }: Props) => {
  const {
    data: tasks,
    isLoading,
    error,
  } = useGetTasksQuery({ projectId: Number(id) });
  const [updateTaskStatus] = useUpdateTaskStatusMutation();

  const moveTask = (taskId: number, toStatus: string) => {
    updateTaskStatus({ taskId, status: toStatus });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred when fetching tasks...</div>;

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="gap-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 p-4">
        {taskStatus.map((status) => (
          <TaskColumn
            key={status}
            status={status}
            tasks={tasks || []}
            moveTask={moveTask}
            setIsModalNewTaskOpen={setIsModalNewTaskOpen}
          ></TaskColumn>
        ))}
      </div>
    </DndProvider>
  );
};

type TaskColumnProps = {
  status: string;
  tasks: TaskType[];
  moveTask: (taskId: number, toStatus: string) => void;
  setIsModalNewTaskOpen: (isOpen: boolean) => void;
};

const TaskColumn = ({
  status,
  tasks,
  moveTask,
  setIsModalNewTaskOpen,
}: TaskColumnProps) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: (item: { id: number }) => moveTask(item.id, status),
    collect: (monitor: any) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const tasksCount = tasks.filter((task) => task.status === status).length;

  const statusColor: any = {
    "To Do": "#2563EB",
    "Work In Progress": "#059669",
    "Under Review": "#D97706",
    Completed: "#000000",
  };

  return (
    <div
      ref={(instance) => {
        drop(instance);
      }}
      className={`sl:py-4 rounded-lg py-2 xl:px-2 ${isOver ? "bg-blue-100 dark:bg-neutral-950" : ""}`}
    >
      <div className="flex mb-3 w-full">
        <div
          className={`w-2 !bg-[${statusColor[status]}] rounded-s-lg`}
          style={{ backgroundColor: statusColor[status] }}
        />
        <div className="flex justify-between items-center bg-white dark:bg-dark-secondary px-5 py-4 rounded-e-lg w-full">
          <h3 className="flex items-center font-semibold text-lg dark:text-white">
            {status}
            <span
              className="inline-block bg-gray-200 dark:bg-dark-tertiary ml-2 p-1 rounded-full text-center text-sm leading-none"
              style={{ width: "1.5rem", height: "1.5rem" }}
            >
              {tasksCount}
            </span>
          </h3>
          <div className="flex items-center gap-1">
            <button className="flex justify-center items-center w-6 h-6 dark:text-neutral-500">
              <EllipsisVertical size={26} />
            </button>
            <button
              className="flex justify-center items-center bg-gray-200 dark:bg-dark-tertiary rounded w-6 h-6 dark:text-white"
              onClick={() => setIsModalNewTaskOpen(true)}
            >
              <Plus size={16} />
            </button>
          </div>
        </div>
      </div>
      {tasks
        .filter((task) => task.status === status)
        .map((task) => (
          <Task key={task.id} task={task} />
        ))}
    </div>
  );
};

type TaskProps = {
  task: TaskType;
};

const Task = ({ task }: TaskProps) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { id: task.id },
    collect: (monitor: any) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const taskTagsSplit = task.tags ? task.tags.split(",") : [];

  const formattedStartDate = formatDate(task.startDate);
  const formattedDueDate = formatDate(task.dueDate);

  const numberOfComments = (task.comments && task.comments.length) || 0;

  const PriorityTag = ({ priority }: { priority: TaskType["priority"] }) => (
    <div
      className={`rounded-full px-2 py-1 text-xs font-semibold ${
        priority === "Urgent"
          ? "bg-red-200 text-red-700"
          : priority === "High"
            ? "bg-yellow-200 text-yellow-700"
            : priority === "Medium"
              ? "bg-green-200 text-green-700"
              : priority === "Low"
                ? "bg-blue-200 text-blue-700"
                : "bg-gray-200 text-gray-700"
      }`}
    >
      {priority}
    </div>
  );

  return (
    <div
      ref={(instance) => {
        drag(instance);
      }}
      className={`mb-4 rounded-md bg-white shadow dark:bg-dark-secondary ${isDragging ? "opacity-50" : "opacity-100"}`}
    >
      {task.attachments && task.attachments.length > 0 && (
        <Image
          src={`https://aj-pm-s3-images.s3.us-east-1.amazonaws.com/${task.attachments[0].fileURL}`}
          alt={task.attachments[0].fileName}
          width={400}
          height={200}
          className="rounded-t-md w-full h-auto"
        />
      )}
      <div className="p-4 md:p-6">
        <div className="flex justify-between items-start">
          <div className="flex flex-wrap flex-1 items-center gap-2">
            {task.priority && <PriorityTag priority={task.priority} />}
            <div className="flex gap-2">
              {taskTagsSplit.map((tag) => (
                <div
                  key={tag}
                  className="bg-blue-100 px-2 py-1 rounded-full text-xs"
                >
                  {tag}
                </div>
              ))}
            </div>
          </div>
          <button className="flex flex-shrink-0 justify-center items-center w-4 h-6 dark:text-neutral-500">
            <EllipsisVertical size={26} />
          </button>
        </div>

        <div className="flex justify-between my-3">
          <h4 className="font-bold text-md dark:text-white">{task.title}</h4>
          {typeof task.points === "number" && (
            <div className="font-semibold text-xs dark:text-white">
              {task.points} pts
            </div>
          )}
        </div>
        <div className="text-gray-500 text-xs dark:text-neutral-500">
          {formattedStartDate && <span>{formattedStartDate} - </span>}
          {formattedDueDate && <span>{formattedDueDate}</span>}
        </div>
        <p className="text-gray-600 text-sm dark:text-neutral-500">
          {task.description}
        </p>
        <div className="border-gray-200 dark:border-stroke-dark mt-4 border-t" />

        {/* USERS */}
        <div className="flex justify-between items-center mt-3">
          <div className="flex -space-x-[6px] overflow-hidden">
            {task.assignee && (
              <Image
                key={task.assignedUserId}
                src={`https://aj-pm-s3-images.s3.us-east-1.amazonaws.com/${task.assignee.profilePictureUrl!}`}
                alt={task.assignee.username}
                width={30}
                height={30}
                className="border-2 border-white dark:border-dark-secondary rounded-full w-8 h-8 object-cover"
              />
            )}
            {task.author && (
              <Image
                key={task.assignedUserId}
                src={`https://aj-pm-s3-images.s3.us-east-1.amazonaws.com/${task.author.profilePictureUrl!}`}
                alt={task.author.username}
                width={30}
                height={30}
                className="border-2 border-white dark:border-dark-secondary rounded-full w-8 h-8 object-cover"
              />
            )}
          </div>
          <div className="flex items-center text-gray-500 dark:text-neutral-500">
            <MessageSquareMore size={20} />
            <span className="ml-1 text-sm dark:text-neutral-400">
              {numberOfComments}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardView;
