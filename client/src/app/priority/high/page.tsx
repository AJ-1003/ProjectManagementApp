import React from "react";
import ReusablePriorityPage from "../reusablePriorityPage";
import { Priority } from "@/enums/ePriority";

const High = () => {
  return <ReusablePriorityPage priority={Priority.High} />;
};

export default High;