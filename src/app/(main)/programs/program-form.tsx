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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { Brand, Program, ProgramStatus, PaymentStatus, ProgramType } from "@/lib/types";
import { useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ScrollArea } from "@/components/ui/scroll-area";

const programSchema = z.object({
  brandId: z.string().min(1, "Brand is required."),
  typeProgram: z.enum(["Sell In", "Sell Out", "Cashback"]),
  description: z.string().min(10, "Description must be at least 10 characters."),
  periodStart: z.date(),
  periodEnd: z.date(),
  target: z.coerce.number().min(0, "Target must be a positive number."),
  achievement: z.coerce.number().min(0, "Achievement must be a positive number."),
  reward: z.coerce.number().min(0, "Reward must be a positive number."),
  programStatus: z.enum(["Active", "Pending", "Ended"]),
  paymentStatus: z.enum(["Paid", "Unpaid", "Partial"]),
}).refine(data => data.periodEnd >= data.periodStart, {
    message: "End date cannot be before start date.",
    path: ["periodEnd"],
});


type ProgramFormProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  program: Program | null;
  brands: Brand[];
  onSubmit: (program: Program) => void;
};

export default function ProgramForm({ isOpen, setIsOpen, program, brands, onSubmit }: ProgramFormProps) {
  const form = useForm<z.infer<typeof programSchema>>({
    resolver: zodResolver(programSchema),
    defaultValues: {
        description: "",
        target: 0,
        achievement: 0,
        reward: 0,
    },
  });

  useEffect(() => {
    if (isOpen) {
        form.reset(
            program
            ? {
                ...program,
                periodStart: new Date(program.periodStart),
                periodEnd: new Date(program.periodEnd),
                }
            : {
                brandId: undefined,
                typeProgram: undefined,
                description: "",
                periodStart: undefined,
                periodEnd: undefined,
                target: 0,
                achievement: 0,
                reward: 0,
                programStatus: "Pending",
                paymentStatus: "Unpaid",
                }
        );
    }
  }, [program, isOpen, form]);

  const handleSubmit = (values: z.infer<typeof programSchema>) => {
    const newProgramData: Program = {
      id: program ? program.id : `PROG${new Date().getTime().toString().slice(-4)}`,
      ...values,
    };
    onSubmit(newProgramData);
    setIsOpen(false);
  };

  const programTypes: ProgramType[] = ["Sell In", "Sell Out", "Cashback"];
  const programStatuses: ProgramStatus[] = ["Active", "Pending", "Ended"];
  const paymentStatuses: PaymentStatus[] = ["Paid", "Unpaid", "Partial"];

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="sm:max-w-2xl w-full flex flex-col">
        <SheetHeader>
          <SheetTitle>{program ? "Edit Program" : "Create New Program"}</SheetTitle>
          <SheetDescription>
            {program ? `Editing program ID: ${program.id}` : "Fill in the details to create a new program."}
          </SheetDescription>
        </SheetHeader>
        <ScrollArea className="flex-grow pr-6">
            <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 py-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField control={form.control} name="brandId" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Brand</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl><SelectTrigger><SelectValue placeholder="Select a brand" /></SelectTrigger></FormControl>
                                <SelectContent>{brands.map(b => <SelectItem key={b.id} value={b.id}>{b.name}</SelectItem>)}</SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="typeProgram" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Program Type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl><SelectTrigger><SelectValue placeholder="Select a type" /></SelectTrigger></FormControl>
                                <SelectContent>{programTypes.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )} />
                </div>

                <FormField control={form.control} name="description" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Program Description</FormLabel>
                        <FormControl><Textarea placeholder="Describe the program objectives and mechanics..." {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )} />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField control={form.control} name="periodStart" render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Period Start</FormLabel>
                            <Popover><PopoverTrigger asChild>
                                <FormControl><Button variant={"outline"} className={cn("pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>
                                    {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button></FormControl>
                            </PopoverTrigger><PopoverContent className="w-auto p-0" align="start">
                                <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                            </PopoverContent></Popover>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="periodEnd" render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Period End</FormLabel>
                            <Popover><PopoverTrigger asChild>
                                <FormControl><Button variant={"outline"} className={cn("pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>
                                    {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button></FormControl>
                            </PopoverTrigger><PopoverContent className="w-auto p-0" align="start">
                                <Calendar mode="single" selected={field.value} onSelect={field.onChange} disabled={(date) => date < form.getValues("periodStart")} initialFocus />
                            </PopoverContent></Popover>
                             <FormMessage />
                        </FormItem>
                    )} />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <FormField control={form.control} name="target" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Program Target</FormLabel>
                            <FormControl><Input type="number" placeholder="e.g., 50000" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="achievement" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Achievement</FormLabel>
                            <FormControl><Input type="number" placeholder="e.g., 45000" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                     <FormField control={form.control} name="reward" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Reward</FormLabel>
                            <FormControl><Input type="number" placeholder="Value or %" {...field} /></FormControl>
                             <FormDescription className="text-xs">Value per achievement unit.</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField control={form.control} name="programStatus" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Program Status</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                                <SelectContent>{programStatuses.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="paymentStatus" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Payment Status</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                                <SelectContent>{paymentStatuses.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )} />
                </div>
            </form>
            </Form>
        </ScrollArea>
        <SheetFooter className="pt-6 pr-6">
            <SheetClose asChild>
                <Button type="button" variant="outline">Cancel</Button>
            </SheetClose>
            <Button onClick={form.handleSubmit(handleSubmit)}>
                {program ? "Save Changes" : "Create Program"}
            </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
