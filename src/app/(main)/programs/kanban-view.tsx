"use client";

import type { ProgramWithBrand } from "@/lib/data";
import type { ProgramStatus } from "@/lib/types";
import ProgramCard from "./program-card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

type KanbanViewProps = {
  programs: ProgramWithBrand[];
  onEdit: (program: ProgramWithBrand) => void;
};

const statuses: ProgramStatus[] = ["Pending", "Active", "Ended"];

export default function KanbanView({ programs, onEdit }: KanbanViewProps) {
  const programsByStatus = statuses.reduce((acc, status) => {
    acc[status] = programs.filter((p) => p.programStatus === status);
    return acc;
  }, {} as Record<ProgramStatus, ProgramWithBrand[]>);

  return (
    <ScrollArea className="w-full whitespace-nowrap">
      <div className="flex gap-6 pb-4">
        {statuses.map((status) => (
          <div key={status} className="w-[320px] shrink-0">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold font-headline text-lg">{status}</h3>
              <span className="text-sm font-medium bg-muted text-muted-foreground h-6 w-6 flex items-center justify-center rounded-full">
                {programsByStatus[status].length}
              </span>
            </div>
            <div className="flex flex-col gap-4 h-full">
              {programsByStatus[status].length > 0 ? (
                programsByStatus[status].map((program) => (
                  <ProgramCard key={program.id} program={program} onEdit={onEdit} />
                ))
              ) : (
                <div className="border-2 border-dashed rounded-lg h-24 flex items-center justify-center text-sm text-muted-foreground">
                    No programs in this stage.
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
