export type Brand = {
  id: string;
  name: string;
  createdAt: Date;
};

export type ProgramStatus = "Active" | "Pending" | "Ended";
export type PaymentStatus = "Paid" | "Unpaid" | "Partial";
export type ProgramType = "Sell In" | "Sell Out" | "Cashback";

export type Program = {
  id: string;
  brandId: string;
  typeProgram: ProgramType;
  description: string;
  periodStart: Date;
  periodEnd: Date;
  target: number;
  achievement: number;
  reward: number; // For simplicity, reward is a multiplier
  programStatus: ProgramStatus;
  paymentStatus: PaymentStatus;
};
