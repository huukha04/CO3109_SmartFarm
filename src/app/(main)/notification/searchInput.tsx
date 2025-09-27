"use client";

import { Dispatch, SetStateAction } from "react";
import { Input } from "@/components/ui/input";
import { LucideSearch } from "lucide-react";

interface SearchInputProps {
  value: string;
  onChange: Dispatch<SetStateAction<string>>;
  placeholder?: string;
}

export default function SearchInput({
  value,
  onChange,
  placeholder = "Tìm kiếm thông báo...",
}: SearchInputProps) {
  return (
      <div className="relative flex-1">
        <LucideSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="pl-9"
        />
    </div>
  );
}
