import React from "react";
import ReusablePriorityPage from "../reusablePriorityPage";
import { Priority } from "@/enums/ePriority";

const Urgent = () => {
  return <ReusablePriorityPage priority={Priority.Backlog} />;
};

export default Urgent;