"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";

type Location = {
  id: number;
  name: string;
};

type Props = {
  onChange?: (id: string) => void;
  locationId?: string;
};





export const LocationSelect = ({ locationId, onChange }: Props) => {
  const [data, setData] = React.useState<Location[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    try {
      
      const sampleData = [
              { id: 1, name: 'Vườn ling lang', code: 'VL001', imageUrl: 'https://example.com/images/linglang.jpg' },
              { id: 2, name: 'Vườn oải hương', code: 'VO002', imageUrl: 'https://example.com/images/oaihuong.jpg' },
              { id: 3, name: 'Vườn hoa hồng', code: 'VH003', imageUrl: 'https://example.com/images/hoahong.jpg' },
              { id: 4, name: 'Vườn cúc', code: 'VC004', imageUrl: 'https://example.com/images/cuc.jpg' },
              { id: 5, name: 'Vườn tulip', code: 'VT005', imageUrl: 'https://example.com/images/tulip.jpg' },
              { id: 6, name: 'Vườn hướng dương', code: 'VHD006', imageUrl: 'https://example.com/images/huongduong.jpg' },
              { id: 7, name: 'Vườn sen', code: 'VS007', imageUrl: 'https://example.com/images/sen.jpg' },
              { id: 8, name: 'Vườn phong lan', code: 'VPL008', imageUrl: 'https://example.com/images/phonglan.jpg' },
          ];
      setData(sampleData);
      if (!locationId && sampleData.length > 0) {
      onChange?.(sampleData[0].id.toString());
    }
    } catch (error) {
      console.error("Failed to fetch locations:", error);
    } finally {
      setLoading(false);
    }
  }, [onChange, locationId]);

  if (loading) {
    return (
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Đang tải khu vực ..." />
        </SelectTrigger>
      </Select>
    );
  }

  return (
    

    <Select value={locationId} onValueChange={onChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Chọn khu vực" />
      </SelectTrigger>
      <SelectContent>
        
        <SelectGroup>
          <SelectLabel>Khu vực</SelectLabel>
          {data.map((item) => (
            <SelectItem key={item.id} value={item.id.toString()}>
              {item.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
