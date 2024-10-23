import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";

export const DateSelector: React.FC = () => (
  <Card>
    <CardHeader>
      <CardTitle>日付選択</CardTitle>
    </CardHeader>
    <CardContent>
      <Calendar />
    </CardContent>
  </Card>
);
