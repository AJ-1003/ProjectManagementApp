import { Priority } from "@/enums/ePriority";
import { Status } from "@/enums/eStatus";
import { User } from "./iUser";
import { Attachment } from "./iAttachment";

export interface Task {
    id: number;
    title: string;
    description?: string;
    status?: Status;
    priority?: Priority;
    tags?: string;
    startDate?: string;
    dueDate?: string;
    points?: number;
    projectId: number;
    authorUserId?: number;
    assignedUserId?: number;

    author?: User;
    assignee?: User;
    comments?: Comment[];
    attachments?: Attachment[];
}