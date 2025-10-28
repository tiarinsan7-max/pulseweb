"use client";

import type { ProgramWithBrand } from "@/lib/data";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type TableViewProps = {
  programs: ProgramWithBrand[];
  onEdit: (program: ProgramWithBrand) => void;
  onDelete: (programId: string) => void;
};

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0
    }).format(value);
};

const formatDate = (date: Date) => new Intl.DateTimeFormat('en-US').format(date);

export default function TableView({ programs, onEdit, onDelete }: TableViewProps) {
  
  const calculateTimeGone = (start: Date, end: Date) => {
    const now = new Date();
    if (now < start) return 0;
    if (now > end) return 100;
    const totalDuration = end.getTime() - start.getTime();
    if (totalDuration <= 0) return 100;
    const elapsed = now.getTime() - start.getTime();
    return Math.round((elapsed / totalDuration) * 100);
  };

  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Program</TableHead>
              <TableHead>Brand</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Target / Achievement</TableHead>
              <TableHead>Time Gone</TableHead>
              <TableHead>Est. Reward</TableHead>
              <TableHead className="text-right w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {programs.length > 0 ? (
              programs.map((program) => {
                const achievementPercentage = program.target > 0 ? (program.achievement / program.target) * 100 : 0;
                const timeGonePercentage = calculateTimeGone(program.periodStart, program.periodEnd);
                const estimatedReward = program.achievement * program.reward;

                return (
                  <TableRow key={program.id}>
                    <TableCell className="font-medium">
                        <div className="font-bold">{program.typeProgram}</div>
                        <div className="text-sm text-muted-foreground">{program.id}</div>
                    </TableCell>
                    <TableCell>{program.brandName}</TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1.5">
                        <Badge variant={
                          program.programStatus === 'Active' ? 'secondary' :
                          program.programStatus === 'Ended' ? 'outline' :
                          'default'
                        } className="bg-accent text-accent-foreground capitalize">{program.programStatus}</Badge>
                        <Badge variant={
                          program.paymentStatus === 'Paid' ? 'secondary' :
                          program.paymentStatus === 'Partial' ? 'outline' :
                          'destructive'
                        } className="capitalize">{program.paymentStatus}</Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-2">
                        <Progress value={achievementPercentage} className="h-2" />
                        <div className="text-xs text-muted-foreground">{program.achievement.toLocaleString()} / {program.target.toLocaleString()}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                        <div className="flex flex-col gap-2">
                            <Progress value={timeGonePercentage} className="h-2" />
                            <div className="text-xs text-muted-foreground">{`${formatDate(program.periodStart)} - ${formatDate(program.periodEnd)}`}</div>
                        </div>
                    </TableCell>
                    <TableCell className="font-semibold">{formatCurrency(estimatedReward)}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => onEdit(program)}>
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => onDelete(program.id)} className="text-destructive">
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="h-24 text-center text-muted-foreground"
                >
                  No programs found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
