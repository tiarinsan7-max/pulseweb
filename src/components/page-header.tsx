import type { ReactNode } from 'react';
import { Separator } from './ui/separator';
import { cn } from '@/lib/utils';

type PageHeaderProps = {
  title: string;
  description?: string;
  children?: ReactNode;
  className?: string;
};

export function PageHeader({ title, description, children, className }: PageHeaderProps) {
  return (
    <div className={cn("flex flex-col gap-4", className)}>
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div className='flex flex-col gap-1'>
                <h1 className="text-2xl font-bold tracking-tight font-headline md:text-3xl">
                    {title}
                </h1>
                {description && (
                    <p className="text-muted-foreground">{description}</p>
                )}
            </div>
            {children && <div className="flex items-center gap-2">{children}</div>}
        </div>
        <Separator />
    </div>
  );
}
