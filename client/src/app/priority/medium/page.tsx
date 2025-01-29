import React from "react";
import ReusablePriorityPage from "../reusablePriorityPage";
import { Priority } from "@/enums/ePriority";

const Medium = () => {
  return <ReusablePriorityPage priority={Priority.Medium} />;
};

export default Medium;