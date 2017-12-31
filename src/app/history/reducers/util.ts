import { Period } from '../../photo/models/period';

export function getLastMonthPeriod() {
  const lastMonthDate = new Date(
    new Date().getFullYear(),
    new Date().getMonth() - 1,
    1,
  );
  return {
    month: lastMonthDate.getMonth(),
    year: lastMonthDate.getFullYear(),
  };
}

export function getPeriodKey(period: Period) {
  return `${period.year}-${period.month}`;
}
