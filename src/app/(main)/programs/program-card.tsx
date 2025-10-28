"use client";

import type { ProgramWithBrand } from "@/lib/data";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

type ProgramCardProps = {
  program: ProgramWithBrand;
  onEdit: (program: ProgramWithBrand) => void;
};

export default function ProgramCard({ program, onEdit }: ProgramCardProps) {
  const achievementPercentage = program.target > 0 ? (program.achievement / program.target) * 100 : 0;
  const estimatedReward = program.achievement * program.reward;
  const formatDate = (date: Date) => new Intl.DateTimeFormat('en-US', {month: 'short', day: 'numeric'}).format(date);

  return (
    <Card className="whitespace-normal" onClick={() => onEdit(program)} role="button">
      <CardHeader>
        <div className="flex justify-between items-start">
            <CardTitle className="text-base">{program.typeProgram}</CardTitle>
            <Badge variant="outline">{program.brandName}</Badge>
        </div>
        <CardDescription>{program.id}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-2">
            {program.description}
        </p>
        <div>
            <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-medium">Achievement</span>
                <span className="text-xs font-medium">{achievementPercentage.toFixed(0)}%</span>
            </div>
            <Progress value={achievementPercentage} className="h-2" />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center text-sm">
        <div className="font-semibold text-primary">
            {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(estimatedReward)}
        </div>
        <div className="text-muted-foreground">
            Ends {formatDate(program.periodEnd)}
        </div>
      </CardFooter>
    </Card>
  );
}
