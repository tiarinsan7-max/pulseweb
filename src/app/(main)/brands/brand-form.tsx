"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { Brand } from "@/lib/types";
import { useEffect } from "react";

const brandSchema = z.object({
  name: z.string().min(2, "Brand name must be at least 2 characters."),
});

type BrandFormProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  brand: Brand | null;
  onSubmit: (brand: Brand) => void;
};

export default function BrandForm({ isOpen, setIsOpen, brand, onSubmit }: BrandFormProps) {
  const form = useForm<z.infer<typeof brandSchema>>({
    resolver: zodResolver(brandSchema),
    defaultValues: {
      name: "",
    },
  });

  useEffect(() => {
    if (brand) {
      form.reset({ name: brand.name });
    } else {
      form.reset({ name: "" });
    }
  }, [brand, isOpen, form]);

  const handleSubmit = (values: z.infer<typeof brandSchema>) => {
    const newBrandData: Brand = {
      id: brand ? brand.id : new Date().getTime().toString(),
      createdAt: brand ? brand.createdAt : new Date(),
      ...values,
    };
    onSubmit(newBrandData);
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{brand ? "Edit Brand" : "Add New Brand"}</SheetTitle>
          <SheetDescription>
            {brand ? "Update the details of this brand." : "Enter the details for the new brand."}
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8 py-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brand Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., INFINIX" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <SheetFooter>
                <SheetClose asChild>
                    <Button type="button" variant="outline">
                    Cancel
                    </Button>
                </SheetClose>
                <Button type="submit">
                    {brand ? "Save Changes" : "Create Brand"}
                </Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
