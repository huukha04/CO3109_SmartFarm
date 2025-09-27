import { Calendar as CalendarIcon } from "lucide-react"; // import icon
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";
import { Label } from "@/components/ui/label";

export function DateRangePicker({
  value,
  onChange,
}: {
  value?: DateRange;
  onChange: (val: DateRange | undefined) => void;
}) {
  const today = new Date();
  const defaultValue: DateRange = value || { from: today, to: today };

  return (
    <Popover>
    <div className="flex flex-col">
      <Label className="text-sm font-medium mb-1">
        Chọn khoảng thời gian:
      </Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            className="w-52 flex items-center justify-start gap-2 bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
          >
            <CalendarIcon className="h-4 w-4 text-white" />
            {defaultValue.from && defaultValue.to
              ? `${format(defaultValue.from, "dd/MM/yyyy")} - ${format(defaultValue.to, "dd/MM/yyyy")}`
              : "Chọn ngày"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="range"
            selected={defaultValue}
            onSelect={onChange}
            className="rounded-md border"
          />
        </PopoverContent>
      </Popover>
    </div>

    <PopoverContent className="w-auto p-0">
      <Calendar
        mode="range"
        selected={defaultValue}
          onSelect={onChange}
          className="rounded-md border"
        />
      </PopoverContent>
    </Popover>
  );
}
