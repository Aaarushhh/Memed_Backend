export interface Milestone {
  views: number;
  payout: number;
}

export const getHighestMilestonePayout = (
  views: number,
  milestones: Milestone[]
): number => {
  let highest = 0;

  for (const milestone of milestones) {
    if (views >= milestone.views && milestone.payout > highest) {
      highest = milestone.payout;
    }
  }

  return highest;
};

export const applyBudgetCap = (
  currentPayout: number,
  targetPayout: number,
  budgetSpent: number,
  totalBudget: number
): { newPayout: number; budgetIncrease: number } => {
  if (targetPayout <= currentPayout) {
    return { newPayout: currentPayout, budgetIncrease: 0 };
  }

  const remainingBudget = Math.max(0, totalBudget - budgetSpent);
  const increase = targetPayout - currentPayout;
  const budgetIncrease = Math.min(increase, remainingBudget);

  return {
    newPayout: currentPayout + budgetIncrease,
    budgetIncrease,
  };
};
