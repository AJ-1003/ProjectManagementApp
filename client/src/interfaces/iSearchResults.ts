
import { Project } from "./iProject";
import { Task } from "./iTask";
import { User } from "./iUser";

export interface SearchResults {
    tasks?: Task[];
    projects?: Project[];
    users?: User[];
}