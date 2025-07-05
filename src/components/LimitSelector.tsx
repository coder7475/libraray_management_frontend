import { setLimit, setPage } from "@/global/slices/booksSlice";
import { useAppDispatch, useAppSelector } from "@/hooks";

const LIMIT_OPTIONS = [6, 12, 24, 48, 96];

export default function LimitSelector() {
  const dispatch = useAppDispatch();
  const limit = useAppSelector((s) => s.booksUI.limit);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLimit = Number(e.target.value);
    dispatch(setLimit(newLimit));
    dispatch(setPage(1)); // reset to page 1
  };

  return (
    <div className="flex justify-end items-center gap-2">
      <label htmlFor="limit-select" className="text-sm font-medium">
        Books per page:
      </label>
      <select
        id="limit-select"
        value={limit}
        onChange={handleChange}
        className="border rounded px-2 py-1 text-sm cursor-default"
      >
        {LIMIT_OPTIONS.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
