import { getDashboardStats } from "@/lib/data";
import { DashboardClient } from "@/components/dashboard-client";
import { PageHeader } from "@/components/page-header";
import { Suspense } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardPage() {
    return (
        <div className="flex flex-col gap-6">
            <PageHeader
                title="Dashboard"
                description="An overview of your brand and program performance."
            />
            <Suspense fallback={<DashboardSkeleton />}>
                <DashboardData />
            </Suspense>
        </div>
    );
}

async function DashboardData() {
    const { statsByBrand, totalRewards, totalPrograms, activePrograms } = await getDashboardStats();

    return <DashboardClient
        statsByBrand={statsByBrand}
        totalRewards={totalRewards}
        totalPrograms={totalPrograms}
        activePrograms={activePrograms}
    />
}


function DashboardSkeleton() {
    return (
        <div className="flex flex-col gap-6">
            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Rewards</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Skeleton className="h-8 w-1/2" />
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Programs</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Skeleton className="h-8 w-1/4" />
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Programs</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Skeleton className="h-8 w-1/4" />
                    </CardContent>
                </Card>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Total Rewards by Brand</CardTitle>
                </CardHeader>
                <CardContent>
                    <Skeleton className="h-[350px] w-full" />
                </CardContent>
            </Card>
        </div>
    );
}
