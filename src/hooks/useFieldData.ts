import { useState, useCallback, useEffect } from "react";
import { format } from "date-fns";
import { FieldAvailability } from "../types";

export const useFieldData = (
  selectedDate: Date | undefined,
  selectedField: string | undefined
) => {
  const [data, setData] = useState<FieldAvailability[]>([]);

  const fetchData = useCallback(async () => {
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
  }, [selectedDate, selectedField]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, fetchData };
};
