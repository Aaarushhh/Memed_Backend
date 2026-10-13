import {
  applyBudgetCap,
  getHighestMilestonePayout,
} from "../payout";

const milestones = [
  { views: 10000, payout: 500 },
  { views: 50000, payout: 2000 },
  { views: 100000, payout: 5000 },
];

describe("getHighestMilestonePayout", () => {
  it("returns 0 when no milestone is crossed", () => {
    expect(getHighestMilestonePayout(9999, milestones)).toBe(0);
  });

  it("returns the highest milestone crossed in one update", () => {
    expect(getHighestMilestonePayout(100000, milestones)).toBe(5000);
  });

  it("returns the matching intermediate milestone", () => {
    expect(getHighestMilestonePayout(50000, milestones)).toBe(2000);
  });
});

describe("applyBudgetCap", () => {
  it("does not increase payout when target is already reached", () => {
    expect(applyBudgetCap(2000, 2000, 2000, 10000)).toEqual({
      newPayout: 2000,
      budgetIncrease: 0,
    });
  });

  it("does not double-pay on repeated updates", () => {
    expect(applyBudgetCap(5000, 5000, 5000, 10000)).toEqual({
      newPayout: 5000,
      budgetIncrease: 0,
    });
  });

  it("caps payout increase to remaining budget", () => {
    expect(applyBudgetCap(0, 5000, 8000, 10000)).toEqual({
      newPayout: 2000,
      budgetIncrease: 2000,
    });
  });

  it("pays full target when budget is enough", () => {
    expect(applyBudgetCap(500, 2000, 500, 10000)).toEqual({
      newPayout: 2000,
      budgetIncrease: 1500,
    });
  });

  it("pays nothing when budget is exhausted", () => {
    expect(applyBudgetCap(2000, 5000, 10000, 10000)).toEqual({
      newPayout: 2000,
      budgetIncrease: 0,
    });
  });
});
