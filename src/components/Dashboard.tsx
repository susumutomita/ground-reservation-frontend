"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { NotificationSettings } from "@/components/NotificationSettings";
import { useSession } from "next-auth/react";
import { useDifyChatbot } from "@/hooks/useDifyChatbot";
import { useFieldData } from "@/hooks/useFieldData";
import { useNotificationSettings } from "@/hooks/useNotificationSettings";
import { DateSelector } from "@/components/DateSelector";
import { FieldFilter } from "@/components/FieldFilter";
import { AvailabilityTable } from "@/components/AvailabilityTable";

export default function Dashboard() {
  const { data: session } = useSession();
  const [selectedDate] = useState<Date | undefined>(new Date());
  const [selectedField, setSelectedField] = useState<string | undefined>(undefined);

  const { data, fetchData } = useFieldData(selectedDate, selectedField);
  const { saveNotificationSettings } = useNotificationSettings();
  useDifyChatbot();

  const uniqueFields = Array.from(new Set(data.map((item) => item.field)));

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold">野球場の空き状況ダッシュボード</h1>
      <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        <DateSelector />
        <Card>
          <CardHeader>
            <CardTitle>フィルターと通知設定</CardTitle>
          </CardHeader>
          <CardContent>
            <FieldFilter
              selectedField={selectedField}
              setSelectedField={setSelectedField}
              uniqueFields={uniqueFields}
            />
            {session && (
              <NotificationSettings onSave={saveNotificationSettings} />
            )}
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>グラウンドの空き状況</CardTitle>
        </CardHeader>
        <CardContent>
          <AvailabilityTable data={data} />
        </CardContent>
      </Card>
      <div className="mt-4 flex justify-end">
        <Button onClick={fetchData}>データを更新</Button>
      </div>
    </div>
  );
}
