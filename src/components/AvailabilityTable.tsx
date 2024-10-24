import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FieldAvailability } from "@/types";

interface AvailabilityTableProps {
  data: FieldAvailability[];
}

export const AvailabilityTable: React.FC<AvailabilityTableProps> = ({
  data,
}) => (
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
);
