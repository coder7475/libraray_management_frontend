import { useAppDispatch, useAppSelector } from "@/hooks";
import { useNavigate } from "react-router";

import {
  BookOpen,
  BookMarked,
  Atom,
  Landmark,
  User,
  Sparkles,
} from "lucide-react";
import { Card } from "./ui/card";
import { setFilter } from "@/global/slices/booksSlice";

const GENRES = [
  { key: "FICTION", label: "Fiction", Icon: BookOpen },
  { key: "NON_FICTION", label: "Non Fiction", Icon: BookMarked },
  { key: "SCIENCE", label: "Science", Icon: Atom },
  { key: "HISTORY", label: "History", Icon: Landmark },
  { key: "BIOGRAPHY", label: "Biography", Icon: User },
  { key: "FANTASY", label: "Fantasy", Icon: Sparkles },
];

export default function GenreSelector() {
  const dispatch = useAppDispatch();
  const selectedGenre = useAppSelector((s) => s.booksUI.filter);
  const navigate = useNavigate();

  const handleGenreClick = (genre: string) => {
    dispatch(setFilter(genre));
    navigate(`/books?genre=${encodeURIComponent(genre)}`);
  };

  return (
    <section>
      <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-4 text-center text-primary dark:text-primary-300 tracking-tight">
        Books by Genre
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-4 justify-center">
        {GENRES.map(({ key, label, Icon }) => (
          <Card
            key={key}
            role="button"
            tabIndex={0}
            onClick={() => handleGenreClick(key)}
            onKeyPress={(e) => {
              if (e.key === "Enter" || e.key === " ") handleGenreClick(key);
            }}
            className={`
              flex flex-col items-center justify-center
              cursor-pointer p-4 transition-colors rounded-2xl
              border-2
              ${
                selectedGenre === key
                  ? "border-primary bg-primary/10"
                  : "border-muted"
              }
              hover:bg-primary/10 hover:border-primary
            `}
          >
            <Icon className="h-8 w-8 mb-2 text-primary" />
            <span className="text-base font-semibold">{label}</span>
          </Card>
        ))}
      </div>
    </section>
  );
}
