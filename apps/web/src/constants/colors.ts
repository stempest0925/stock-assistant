export const STOCK_COLORS = {
  rise: "#F7525F",
  fall: "#3AB57A",
};

type ScoreRangeColorType = { name: string; value: string; min: number; max: number };
export const SCORE_RANGE_COLORS: ScoreRangeColorType[] = [
  { name: "bad", value: "#8c8c8c", min: 0, max: 25 },
  { name: "low", value: "#00ce7a", min: 25, max: 45 },
  { name: "medium", value: "#ffbd3f", min: 45, max: 75 },
  { name: "high", value: "#ff6874", min: 75, max: 100 },
];
