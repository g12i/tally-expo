import collector from ".";
import {
  RESET_NEVER,
  RESET_DAILY,
  RESET_WEEKLY,
  RESET_MONTHLY,
  RESET_YEARLY,
} from "../../reducers/counters";

describe("collector", () => {
  describe("resetFrequency=RESET_NEVER", () => {
    it("should sum all the transitions", () => {
      const result = collector(
        [
          {
            date: new Date(2018, 1, 1, 0, 0, 0, 0).getTime(),
            transition: 1,
          },
          {
            date: new Date(2018, 1, 2, 1, 0, 0, 0).getTime(),
            transition: 1,
          },
          {
            date: new Date(2018, 1, 3, 1, 0, 0, 0).getTime(),
            transition: -1,
          },
          {
            date: new Date(2018, 1, 3, 2, 0, 0, 0).getTime(),
            transition: 1,
          },
          {
            date: new Date(2018, 1, 3, 3, 0, 0, 0).getTime(),
            transition: 1,
          },
        ],
        RESET_NEVER
      );
      expect(result).toBe(3);
    });
  });
  describe("resetFrequency=RESET_DAILY", () => {
    it("should sum done in the same day", () => {
      const result = collector(
        [
          {
            date: new Date(2018, 1, 1, 0, 0, 0, 0).getTime(),
            transition: 1,
          },
          {
            date: new Date(2018, 1, 2, 1, 0, 0, 0).getTime(),
            transition: 1,
          },
          {
            date: new Date(2018, 1, 3, 1, 0, 0, 0).getTime(),
            transition: -1,
          },
          {
            date: new Date(2018, 1, 3, 2, 0, 0, 0).getTime(),
            transition: 1,
          },
          {
            date: new Date(2018, 1, 3, 3, 0, 0, 0).getTime(),
            transition: 1,
          },
        ],
        RESET_DAILY,
        new Date(2018, 1, 3, 4, 0, 0, 0)
      );
      expect(result).toBe(1);
    });
  });
  describe("resetFrequency=RESET_WEEKLY", () => {
    it("should sum done in the same week", () => {
      const result = collector(
        [
          {
            date: new Date(2018, 1, 1, 0, 0, 0, 0).getTime(),
            transition: 1,
          },
          {
            date: new Date(2018, 1, 2, 1, 0, 0, 0).getTime(),
            transition: 1,
          },
          {
            date: new Date(2018, 1, 15, 1, 0, 0, 0).getTime(),
            transition: -1,
          },
          {
            date: new Date(2018, 1, 27, 2, 0, 0, 0).getTime(),
            transition: 1,
          },
          {
            date: new Date(2018, 1, 28, 3, 0, 0, 0).getTime(),
            transition: 1,
          },
        ],
        RESET_WEEKLY,
        new Date(2018, 1, 29, 3, 3, 0, 0)
      );
      expect(result).toBe(2);
    });
  });
  describe("resetFrequency=RESET_MONTHLY", () => {
    it("should sum done in the same month", () => {
      const result = collector(
        [
          {
            date: new Date(2018, 1, 1, 0, 0, 0, 0).getTime(),
            transition: 1,
          },
          {
            date: new Date(2018, 1, 2, 1, 0, 0, 0).getTime(),
            transition: 1,
          },
          {
            date: new Date(2018, 1, 15, 1, 0, 0, 0).getTime(),
            transition: -1,
          },
          {
            date: new Date(2018, 2, 27, 2, 0, 0, 0).getTime(),
            transition: 1,
          },
          {
            date: new Date(2018, 3, 28, 3, 0, 0, 0).getTime(),
            transition: 1,
          },
        ],
        RESET_MONTHLY,
        new Date(2018, 1, 29, 3, 3, 0, 0)
      );
      expect(result).toBe(1);
    });
  });
  describe("resetFrequency=RESET_YEARLY", () => {
    it("should sum done in the same year", () => {
      const result = collector(
        [
          {
            date: new Date(2018, 1, 1, 0, 0, 0, 0).getTime(),
            transition: 1,
          },
          {
            date: new Date(2018, 1, 2, 1, 0, 0, 0).getTime(),
            transition: 1,
          },
          {
            date: new Date(2018, 1, 15, 1, 0, 0, 0).getTime(),
            transition: 1,
          },
          {
            date: new Date(2018, 2, 27, 2, 0, 0, 0).getTime(),
            transition: 1,
          },
          {
            date: new Date(2019, 3, 28, 3, 0, 0, 0).getTime(),
            transition: 1,
          },
        ],
        RESET_YEARLY,
        new Date(2018, 1, 29, 3, 3, 0, 0)
      );
      expect(result).toBe(4);
    });
  });
});
