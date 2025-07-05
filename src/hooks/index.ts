import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/global/store";

// hooks to use books slice
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = <T>(selector: (state: RootState) => T) =>
  useSelector(selector);
