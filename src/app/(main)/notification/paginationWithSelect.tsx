"use client"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function PaginationWithSelect({
  currentPage,
  setCurrentPage,
  totalPages,
  itemsPerPage,
  setItemsPerPage,
}: {
  currentPage: number;
  setCurrentPage: (val: number) => void;
  totalPages: number;
  itemsPerPage: number;
  setItemsPerPage: (val: number) => void;
}) {
  return (
    <div className="flex justify-center mt-6 gap-4 items-center">
      <Pagination>
        <PaginationPrevious
          onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
          className={currentPage === 1 ? "opacity-50 pointer-events-none" : ""}
        />

        <PaginationContent>
          {Array.from({ length: totalPages }, (_, i) => (
            <PaginationItem key={i}>
              <PaginationLink
                onClick={() => setCurrentPage(i + 1)}
                className={currentPage === i + 1 ? "bg-blue-500 text-white" : ""}
              >
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
        </PaginationContent>

        <PaginationNext
          onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
          className={currentPage === totalPages ? "opacity-50 pointer-events-none" : ""}
        />
      </Pagination>

      {/* Select số lượng hiển thị */}
      <Select
        value={itemsPerPage.toString()}
        onValueChange={(val) => {
          setItemsPerPage(Number(val));
          setCurrentPage(1);
        }}
      >
        <SelectTrigger className="w-32">
          <SelectValue placeholder="Hiển thị" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="3">3 / trang</SelectItem>
            <SelectItem value="5">5 / trang</SelectItem>
            <SelectItem value="10">10 / trang</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
