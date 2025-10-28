"use client";

import { useState } from "react";
import type { Brand } from "@/lib/types";
import type { ProgramWithBrand } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { List, PlusCircle, Kanban } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import TableView from "./table-view";
import KanbanView from "./kanban-view";
import ProgramForm from "./program-form";
import { useToast } from "@/hooks/use-toast";
import type { Program } from "@/lib/types";


type ProgramsClientProps = {
  programs: ProgramWithBrand[];
  brands: Brand[];
};

export default function ProgramsClient({
  programs: initialPrograms,
  brands,
}: ProgramsClientProps) {
  const [programs, setPrograms] = useState(initialPrograms);
  const [view, setView] = useState<"table" | "kanban">("table");
  const [brandFilter, setBrandFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<ProgramWithBrand | null>(null);
  const { toast } = useToast();

  const filteredPrograms = programs
    .filter((program) =>
      brandFilter === "all" ? true : program.brandId === brandFilter
    )
    .filter((program) =>
      program.typeProgram.toLowerCase().includes(search.toLowerCase())
    );

  const handleAddNew = () => {
    setSelectedProgram(null);
    setIsFormOpen(true);
  };
  
  const handleEdit = (program: ProgramWithBrand) => {
    setSelectedProgram(program);
    setIsFormOpen(true);
  };

  const handleDelete = (programId: string) => {
    setPrograms(programs.filter(p => p.id !== programId));
    toast({
        title: "Program Deleted",
        description: "The program has been successfully deleted.",
    });
  }

  const handleFormSubmit = (programData: Program) => {
    const brandName = brands.find(b => b.id === programData.brandId)?.name || "Unknown";
    const programWithBrand = { ...programData, brandName };

    if (selectedProgram) {
      setPrograms(programs.map(p => p.id === programData.id ? programWithBrand : p));
      toast({ title: "Program Updated", description: `Program ${programData.id} has been updated.` });
    } else {
      setPrograms([...programs, programWithBrand]);
      toast({ title: "Program Created", description: `Program ${programData.id} has been created.` });
    }
  };


  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Input
              placeholder="Search program type..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-48"
            />
            <Select value={brandFilter} onValueChange={setBrandFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by brand" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Brands</SelectItem>
                {brands.map((brand) => (
                  <SelectItem key={brand.id} value={brand.id}>
                    {brand.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center rounded-md bg-muted p-1">
                <Button variant={view === 'table' ? 'secondary' : 'ghost'} size="sm" onClick={() => setView("table")} className="h-8 px-3">
                    <List className="h-4 w-4"/>
                </Button>
                <Button variant={view === 'kanban' ? 'secondary' : 'ghost'} size="sm" onClick={() => setView("kanban")} className="h-8 px-3">
                    <Kanban className="h-4 w-4"/>
                </Button>
            </div>
            <Button onClick={handleAddNew}>
              <PlusCircle className="mr-2 h-4 w-4" /> Add Program
            </Button>
          </div>
        </div>
      </div>
      
      <div className="flex-grow">
        {view === "table" ? (
          <TableView programs={filteredPrograms} onEdit={handleEdit} onDelete={handleDelete} />
        ) : (
          <KanbanView programs={filteredPrograms} onEdit={handleEdit} />
        )}
      </div>

      <ProgramForm
        isOpen={isFormOpen}
        setIsOpen={setIsFormOpen}
        program={selectedProgram}
        brands={brands}
        onSubmit={handleFormSubmit}
      />
    </>
  );
}
