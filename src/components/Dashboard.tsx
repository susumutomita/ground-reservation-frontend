import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { NotificationSettings } from "@/components/NotificationSettings";
import { useSession } from "next-auth/react";
import { format } from "date-fns";

interface FieldAvailability {
  id: string;
  date: string;
  time: string;
  field: string;
  available: boolean;
}

export default function Dashboard() {
  const { data: session } = useSession();
  const [data, setData] = useState<FieldAvailability[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const [selectedField, setSelectedField] = useState<string | undefined>(
    undefined
  );
  const [monitoredDates, setMonitoredDates] = useState<Date[]>([]);

  useEffect(() => {
    fetchData();
  }, [selectedDate, selectedField]);

  const fetchData = async () => {
    const queryParams = new URLSearchParams();
    if (selectedDate) {
      queryParams.append("date", format(selectedDate, "yyyy-MM-dd"));
    }
    if (selectedField) {
      queryParams.append("field", selectedField);
    }

    try {
      const response = await fetch(`/api/data?${queryParams.toString()}`);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const fetchedData = await response.json();
      setData(fetchedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const uniqueFields = Array.from(new Set(data.map((item) => item.field)));

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
      if (!monitoredDates.some((d) => d.getTime() === date.getTime())) {
        setMonitoredDates([...monitoredDates, date]);
      }
    }
  };

  const handleNotificationSave = async (
    type: "email" | "webhook",
    value: string
  ) => {
    if (session) {
      try {
        const response = await fetch("/api/save-notification-settings", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: session.user.id, type, value }),
        });
        if (response.ok) {
          alert("通知設定が保存されました");
        } else {
          throw new Error("Failed to save notification settings");
        }
      } catch (error) {
        console.error("Error saving notification settings:", error);
        alert("通知設定の保存に失敗しました");
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold">
        野球場の空き状況ダッシュボード
      </h1>
      <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>日付選択（監視する日付をクリック）</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="multiple"
              selected={monitoredDates}
              onSelect={handleDateSelect}
              className="rounded-md border"
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>フィルターと通知設定</CardTitle>
          </CardHeader>
          <CardContent>
            <Select onValueChange={setSelectedField} value={selectedField}>
              <SelectTrigger className="mb-4 w-full">
                <SelectValue placeholder="グラウンドを選択" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={undefined}>全てのグラウンド</SelectItem>
                {uniqueFields.map((field) => (
                  <SelectItem key={field} value={field}>
                    {field}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {session && (
              <NotificationSettings onSave={handleNotificationSave} />
            )}
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>グラウンドの空き状況</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>日付</TableHead>
                <TableHead>時間</TableHead>
                <TableHead>グラウンド</TableHead>
                <TableHead>空き状況</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.date}</TableCell>
                  <TableCell>{item.time}</TableCell>
                  <TableCell>{item.field}</TableCell>
                  <TableCell>
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-semibold ${
                        item.available
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {item.available ? "空きあり" : "空きなし"}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <div className="mt-4 flex justify-end">
        <Button onClick={fetchData}>データを更新</Button>
      </div>
    </div>
  );
}
