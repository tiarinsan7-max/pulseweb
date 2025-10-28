import { PageHeader } from "@/components/page-header";
import { getBrands, getProgramsWithBrand } from "@/lib/data";
import ProgramsClient from "./programs-client";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export default function ProgramsPage() {
    return (
        <div className="flex flex-col gap-6 h-full">
            <Suspense fallback={<ProgramsPageSkeleton />}>
                <ProgramsData />
            </Suspense>
        </div>
    );
}

async function ProgramsData() {
    const programs = await getProgramsWithBrand();
    const brands = await getBrands();
    
    return (
        <>
            <PageHeader
                title="Programs"
                description={`View and manage ${programs.length} programs across all brands.`}
            />
            <ProgramsClient programs={programs} brands={brands} />
        </>
    );
}


function ProgramsPageSkeleton() {
    return (
        <>
            <PageHeader title="Programs" description="Loading programs..." />
            <div className="flex items-center justify-between gap-2">
                <Skeleton className="h-10 w-64" />
                <div className="flex items-center gap-2">
                    <Skeleton className="h-10 w-24" />
                    <Skeleton className="h-10 w-32" />
                </div>
            </div>
            <Card>
                <CardContent className="p-6">
                    <Skeleton className="h-96 w-full" />
                </CardContent>
            </Card>
        </>
    )
}
