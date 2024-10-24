import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FieldFilterProps {
  selectedField: string | undefined;
  setSelectedField: (field: string) => void;
  uniqueFields: string[];
}

export const FieldFilter: React.FC<FieldFilterProps> = ({
  selectedField,
  setSelectedField,
  uniqueFields,
}) => (
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
);
