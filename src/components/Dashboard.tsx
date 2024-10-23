"use client";
import React, { useState } from "react";
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
import { FieldAvailability } from "@/types";
import { useDifyChatbot } from "@/hooks/useDifyChatbot";
import { useFieldData } from "@/hooks/useFieldData";

export default function Dashboard() {
  const { data: session } = useSession();
  const [selectedDate] = useState<Date | undefined>(new Date());
  const [selectedField, setSelectedField] = useState<string | undefined>(
    undefined
  );

  const { data, fetchData } = useFieldData(selectedDate, selectedField);
  useDifyChatbot();

  const uniqueFields = Array.from(new Set(data.map((item) => item.field)));

  const handleNotificationSave = async (
    type: "email" | "webhook",
    value: string
  ) => {
    if (session?.user) {
      try {
        const response = await fetch("/api/save-notification-settings", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: session.user.email, type, value }),
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
    } else {
      console.error("セッションまたはユーザー情報が未定義です。");
      alert("ユーザー情報が取得できませんでした。再度ログインしてください。");
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
            <CardTitle>日付選択</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar />
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
                <SelectItem value="all">全てのグラウンド</SelectItem>
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
      <style jsx global>{`
        #dify-chatbot-bubble-button {
          background-color: #1c64f2 !important;
        }
        #dify-chatbot-bubble-window {
          width: 24rem !important;
          height: 40rem !important;
        }
      `}</style>
    </div>
  );
}
