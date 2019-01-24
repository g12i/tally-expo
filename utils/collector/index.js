import isSameDay from "date-fns/is_same_day";
import isSameWeek from "date-fns/is_same_iso_week";
import isSameMonth from "date-fns/is_same_month";
import isSameYear from "date-fns/is_same_year";
import curry from "lodash/curry";
import identity from "lodash/identity";
import { RESET_DAILY, RESET_MONTHLY, RESET_WEEKLY, RESET_YEARLY } from "../../reducers/counters";

const _isSameDay = curry(isSameDay);
const _isSameWeek = curry(isSameWeek);
const _isSameMonth = curry(isSameMonth);
const _isSameYear = curry(isSameYear);

const getFilter = (resetFrequency, now) => {
  switch (resetFrequency) {
    case RESET_DAILY:
      return _isSameDay(now);
    case RESET_WEEKLY:
      return _isSameWeek(now);
    case RESET_MONTHLY:
      return _isSameMonth(now);
    case RESET_YEARLY:
      return _isSameYear(now);
    default:
      return identity;
  }
};

const collector = (transitions, resetFrequency, now = new Date()) => {
  const filter = getFilter(resetFrequency, now);
  return transitions
    .filter(({ date }) => filter(date))
    .reduce((acc, { transition }) => acc + transition, 0);
};

export default collector;
