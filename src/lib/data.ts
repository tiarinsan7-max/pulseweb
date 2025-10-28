import type { Brand, Program } from "./types";

const brands: Brand[] = [
  { id: '1', name: 'INFINIX', createdAt: new Date('2023-01-15') },
  { id: '2', name: 'IPHONE', createdAt: new Date('2023-02-20') },
  { id: '3', name: 'ITEL', createdAt: new Date('2023-03-10') },
];

const programs: Program[] = [
  {
    id: "PROG001",
    brandId: '1', // INFINIX
    typeProgram: 'Sell Out',
    description: 'Q1 2024 Sell Out Campaign for new model.',
    periodStart: new Date('2024-01-01'),
    periodEnd: new Date('2024-03-31'),
    target: 50000,
    achievement: 45000,
    reward: 0.5, // 50 cents per unit
    programStatus: 'Active',
    paymentStatus: 'Unpaid',
  },
  {
    id: "PROG002",
    brandId: '2', // IPHONE
    typeProgram: 'Cashback',
    description: 'Holiday cashback offer for iPhone 15.',
    periodStart: new Date('2023-12-01'),
    periodEnd: new Date('2023-12-31'),
    target: 10000,
    achievement: 12500,
    reward: 50, // $50 cashback per unit
    programStatus: 'Ended',
    paymentStatus: 'Paid',
  },
  {
    id: "PROG003",
    brandId: '1', // INFINIX
    typeProgram: 'Sell In',
    description: 'Stocking program for retailers for H1 2024.',
    periodStart: new Date('2024-02-01'),
    periodEnd: new Date('2024-06-30'),
    target: 100000,
    achievement: 25000,
    reward: 0.2,
    programStatus: 'Active',
    paymentStatus: 'Unpaid',
  },
  {
    id: "PROG004",
    brandId: '3', // ITEL
    typeProgram: 'Sell Out',
    description: 'Entry-level smartphone campaign.',
    periodStart: new Date('2024-04-01'),
    periodEnd: new Date('2024-06-30'),
    target: 200000,
    achievement: 0,
    reward: 0.1,
    programStatus: 'Pending',
    paymentStatus: 'Unpaid',
  },
  {
    id: "PROG005",
    brandId: '2', // IPHONE
    typeProgram: 'Sell In',
    description: 'Carrier partnership program.',
    periodStart: new Date('2024-05-01'),
    periodEnd: new Date('2024-07-31'),
    target: 25000,
    achievement: 5000,
    reward: 1,
    programStatus: 'Active',
    paymentStatus: 'Partial',
  },
];

// Simulate API latency
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export const getBrands = async (): Promise<Brand[]> => {
  await delay(200);
  return brands;
};

export const getPrograms = async (): Promise<Program[]> => {
  await delay(200);
  return programs;
};

export const getProgramsWithBrand = async () => {
  await delay(300);
  const brandMap = new Map(brands.map(b => [b.id, b.name]));
  return programs.map(p => ({
    ...p,
    brandName: brandMap.get(p.brandId) || 'Unknown Brand'
  }));
};

export const getDashboardStats = async () => {
  await delay(500);
  const statsByBrand = brands.map(brand => {
    const brandPrograms = programs.filter(p => p.brandId === brand.id);
    const totalReward = brandPrograms.reduce((acc, p) => acc + (p.achievement * p.reward), 0);
    return {
      brandName: brand.name,
      totalReward,
    };
  });

  const totalRewards = statsByBrand.reduce((acc, b) => acc + b.totalReward, 0);
  const totalPrograms = programs.length;
  const activePrograms = programs.filter(p => p.programStatus === 'Active').length;

  return { statsByBrand, totalRewards, totalPrograms, activePrograms };
};

export type ProgramWithBrand = Awaited<ReturnType<typeof getProgramsWithBrand>>[0];
