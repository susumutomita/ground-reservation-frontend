import { useState, useEffect } from "react";
import axios from "axios";
import NotificationSettings from "./NotificationSettings";
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
import { format } from "date-fns";

interface FieldAvailability {
  id: string;
  date: string;
  time: string;
  field: string;
  available: boolean;
}

const Dashboard = () => {
  const [data, setData] = useState<FieldAvailability[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date(),
  );
  const [selectedField, setSelectedField] = useState<string | undefined>(
    undefined,
  );

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

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        野球場の空き状況ダッシュボード
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <Card>
          <CardHeader>
            <CardTitle>日付選択</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>フィルター</CardTitle>
          </CardHeader>
          <CardContent>
            <Select onValueChange={setSelectedField} value={selectedField}>
              <SelectTrigger className="w-full">
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
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${item.available ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
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
};

export default Dashboard;
