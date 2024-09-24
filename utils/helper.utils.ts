import { format } from "date-fns";

export const formatDate = (date: number | null) => {
  if (!date) {
    return null;
  }
  return format(new Date(date * 1000), "PPpp");
};
