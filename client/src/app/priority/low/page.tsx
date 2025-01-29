import React from "react";
import ReusablePriorityPage from "../reusablePriorityPage";
import { Priority } from "@/enums/ePriority";

const Low = () => {
  return <ReusablePriorityPage priority={Priority.Low} />;
};

export default Low;