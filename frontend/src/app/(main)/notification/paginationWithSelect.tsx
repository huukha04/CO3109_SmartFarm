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

function getVisiblePagesWithDots(current: number, total: number) {
  const pages: (number | string)[] = [];

  // Trang đầu luôn hiện
  pages.push(1);

  // Nếu current > 2 thì chèn ...
  if (current > 2) pages.push("...");

  // Trang hiện tại
  if (current !== 1 && current !== total) pages.push(current);

  // Trang kế tiếp (nếu không phải trang cuối)
  if (current + 1 < total) pages.push(current + 1);

  // Nếu cách trang cuối > 1 thì chèn ...
  if (current + 1 < total - 1) pages.push("...");

  // Trang cuối luôn hiện (nếu total > 1)
  if (total > 1) pages.push(total);

  return pages;
}




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
    <div className="flex flex-col md:flex-row md:justify-center md:items-center gap-4 mt-6 w-full">
      
      <Pagination className="flex-wrap justify-center w-full md:w-auto">
        <PaginationPrevious
          onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
          className={currentPage === 1 ? "opacity-50 pointer-events-none" : ""}
        />

        <PaginationContent>
          {getVisiblePagesWithDots(currentPage, totalPages).map((i, idx) =>
            typeof i === "number" ? (
              <PaginationItem key={idx}>
                <PaginationLink
                  onClick={() => setCurrentPage(i)}
                  className={currentPage === i ? "bg-blue-500 text-white" : ""}
                >
                  {i}
                </PaginationLink>
              </PaginationItem>
            ) : (
              <span key={idx} className="px-2 select-none text-gray-400 dark:text-gray-500">
                {i}
              </span>
            )
          )}
        </PaginationContent>

        <PaginationNext
          onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
          className={currentPage === totalPages ? "opacity-50 pointer-events-none" : ""}
        />
      </Pagination>

      {/* Select số lượng hiển thị */}
        <div className="w-full md:w-32 md:mx-auto">
          <Select
            value={itemsPerPage.toString()}
            onValueChange={(val) => {
              setItemsPerPage(Number(val));
              setCurrentPage(1);
            }}
          >
            <SelectTrigger className="w-30">
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

    </div>
  );
}
