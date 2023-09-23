import { format as fnsFormat, addMinutes } from "date-fns";

export function format(date: Date, format: string) {
  return fnsFormat(addMinutes(date, date.getTimezoneOffset()), format);
}
