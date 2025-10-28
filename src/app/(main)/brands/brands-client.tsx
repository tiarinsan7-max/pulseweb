"use client";

import { useState } from "react";
import type { Brand } from "@/lib/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Download,
  MoreHorizontal,
  PlusCircle,
  Upload,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import BrandForm from "./brand-form";

type BrandsClientProps = {
  brands: Brand[];
  programsByBrand: Map<string, number>;
};

export default function BrandsClient({
  brands: initialBrands,
}: BrandsClientProps) {
  const [brands, setBrands] = useState(initialBrands);
  const [search, setSearch] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const { toast } = useToast();

  const filteredBrands = brands.filter((brand) =>
    brand.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleEdit = (brand: Brand) => {
    setSelectedBrand(brand);
    setIsFormOpen(true);
  };

  const handleAddNew = () => {
    setSelectedBrand(null);
    setIsFormOpen(true);
  };
  
  const handleDelete = (brandId: string) => {
    // In a real app, you'd also check if there are programs associated with the brand
    setBrands(brands.filter(b => b.id !== brandId));
    toast({
        title: "Brand Deleted",
        description: "The brand has been successfully deleted.",
    });
  }

  const handleFormSubmit = (brandData: Brand) => {
    if (selectedBrand) {
      // Update
      setBrands(brands.map(b => b.id === brandData.id ? brandData : b));
      toast({ title: "Brand Updated", description: `${brandData.name} has been updated.` });
    } else {
      // Create
      setBrands([...brands, brandData]);
      toast({ title: "Brand Created", description: `${brandData.name} has been created.` });
    }
  };

  const handleImport = () => {
    toast({ title: "Coming Soon!", description: "CSV import functionality will be available in a future update." });
  }
  
  const handleExport = () => {
    toast({ title: "Coming Soon!", description: "CSV export functionality will be available in a future update." });
  }

  return (
    <>
      <div className="flex items-center justify-between gap-2">
        <Input
          placeholder="Search brands..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleImport}>
            <Upload className="mr-2 h-4 w-4" /> Import
          </Button>
          <Button variant="outline" onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" /> Export
          </Button>
          <Button onClick={handleAddNew}>
            <PlusCircle className="mr-2 h-4 w-4" /> Add Brand
          </Button>
        </div>
      </div>
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">
                    <div className="p-4">Brand</div>
                </TableHead>
                <TableHead>Date Created</TableHead>
                <TableHead className="text-right w-[80px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBrands.length > 0 ? (
                filteredBrands.map((brand) => (
                  <TableRow key={brand.id}>
                    <TableCell className="font-medium">
                        <div className="flex items-center gap-3 p-4">
                            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center font-bold text-secondary-foreground">
                                {brand.name.charAt(0)}
                            </div>
                            {brand.name}
                        </div>
                    </TableCell>
                    <TableCell>
                      {new Intl.DateTimeFormat('en-US').format(brand.createdAt)}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEdit(brand)}>
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDelete(brand.id)} className="text-destructive">
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={3}
                    className="h-24 text-center text-muted-foreground"
                  >
                    No brands found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <BrandForm 
        isOpen={isFormOpen}
        setIsOpen={setIsFormOpen}
        brand={selectedBrand}
        onSubmit={handleFormSubmit}
      />
    </>
  );
}
