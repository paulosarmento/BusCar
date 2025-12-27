import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./Ui/card";
interface StatsCardProps {
  title: string;
  value: number | string;
  description?: string;
  icon: ReactNode;
  borderColor: string;
  valueColor?: string;
}

export function StatsCard({
  title,
  value,
  description,
  icon,
  borderColor,
  valueColor = "text-foreground",
}: StatsCardProps) {
  return (
    <Card className={`border-l-4 ${borderColor}`}>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className={`text-3xl font-bold ${valueColor}`}>{value}</p>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
      </CardContent>
    </Card>
  );
}
