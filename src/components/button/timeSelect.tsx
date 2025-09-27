"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";

type Props = {
  onChange?: (value: string) => void;
  time?: string;
};

const options = [
  { value: 3, name: "3 ngày" },
  { value: 5, name: "5 ngày" },
  { value: 7, name: "7 ngày" },
  { value: 15, name: "15 ngày" },
  { value: 30, name: "30 ngày" },
];

export const TimeSelect = ({ time, onChange }: Props) => {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    onChange?.(options[0].value.toString());
    setLoading(false);
  }, [onChange]);

  if (loading) {
    return (
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Đang tải..." />
        </SelectTrigger>
      </Select>
    );
  }

  return (
    <Select value={time} onValueChange={onChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Chọn thời gian" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {options.map((item) => (
            <SelectItem key={item.value} value={item.value.toString()}>
              {item.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
