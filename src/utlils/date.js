import { format, parseISO } from "date-fns";

export function convertToLocalTimeFormat(isoTime) {
  const date = parseISO(isoTime);
  const formattedLocal = format(date, "MM-dd-yyyy hh:mm a");
  return formattedLocal;
}
