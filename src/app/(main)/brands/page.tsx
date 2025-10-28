import { PageHeader } from "@/components/page-header";
import { getBrands } from "@/lib/data";
import BrandsClient from "./brands-client";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function BrandsPage() {
    return (
        <div className="flex flex-col gap-6">
            <Suspense fallback={<Skeleton className="h-14 w-full" />}>
                <BrandsData />
            </Suspense>
        </div>
    );
}

async function BrandsData() {
    const brands = await getBrands();
    const programsByBrand = new Map<string, number>(); // This would come from a real DB query
    
    return (
        <>
            <PageHeader
                title="Brands"
                description={`Manage the ${brands.length} brands in your portfolio.`}
            />
            <BrandsClient brands={brands} programsByBrand={programsByBrand} />
        </>
    );
}
