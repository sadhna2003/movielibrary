import React from "react";
import { Input } from "../ui/input";
import { Search } from "lucide-react";
import { Button } from "../ui/button";

const options = [
  {
    label: "All",
    value: "",
  },
  {
    label: "Action",
    value: "action",
  },
  {
    label: "Comedy",
    value: "comedy",
  },
  {
    label: "Drama",
    value: "drama",
  },
  {
    label: "Horror",
    value: "horror",
  },
  {
    label: "Romance",
    value: "romance",
  },
  {
    label: "Thriller",
    value: "thriller",
  },
  {
    label: "Sci-Fi",
    value: "sci-fi",
  },
];

export const MovieFilter = ({
  searchQuery,
  onSearchChange,
  genre,
  onGenreChange,
}: {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  genre: string;
  onGenreChange: (genre: string) => void;
}) => {
  return (
    <div className="flex flex-col gap-6 items-center justify-center w-full p-6">
      <div className="flex-1 w-full mx-4 md:max-w-md md:mx-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search movies..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {options.map((option, index) => {
          return (
            <Button key={index} variant={genre === option.value ? "default" : "outline"} type="button" onClick={() => onGenreChange(option.value)}>
              {option.label}
            </Button>
          );
        })}
      </div>
    </div>
  );
};
