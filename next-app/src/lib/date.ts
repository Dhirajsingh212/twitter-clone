import { formatDistanceToNow } from "date-fns";
import { format } from "date-fns";

export function formatDateString(dateString: Date | string): string {
  const date = new Date(dateString);
  return format(date, "MMMM yyyy");
}

export function formatDateToHrsAgo(dateString: Date | string): string {
  const givenDate = new Date(dateString);
  return formatDistanceToNow(givenDate, { addSuffix: true });
}
