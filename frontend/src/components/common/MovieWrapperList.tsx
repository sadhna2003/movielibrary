"use client";
import React, { useCallback, useMemo, useState } from "react";
import { MovieCard } from "./MovieCard";
import { mockMovies, Movie } from "@/constant/movie.constant";
import { MovieDetailDialog } from "./MovieDetailDialog";
import { LoginForm } from "./LoginForm";
import { useAuth } from "@/hook/use-auth";
import { deleteMovie, getMovies } from "@/api/movie/movie.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { DeleteDialog } from "./DeleteDialog";
import { MovieFilter } from "./MovieFilter";
import { Spinner } from "./Spinner";

export const MovieWrapperList = () => {
  const { isSignInDialogOpen, setIsSignInDialogOpen } = useAuth();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [deleteId, setDeleteId] = useState("");
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [genre, setGenre] = useState("");

  // callback functions to update state of searchquery as per which filteration is applied
  const handleSearchChange = useCallback(
    (query: string) => {
      setSearchQuery(query);
    },
    [searchQuery]
  );

  const handleGenreChange = useCallback(
    (genre: string) => {
      setGenre(genre);
    },
    [genre]
  );

  const queryClient = useQueryClient();
  const handleSelect = (data: Movie) => {
    setSelectedMovie(data);
    setOpenDialog(true);
  };

  const {
    data: movies,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["movies"],
    queryFn: () => getMovies(),
    select: (data) => data.movies,
  });
  // console.log("movies", movies);

  const filteredMovie = useMemo(() => {
    return movies?.filter((movie: any) => {
      const matchesSearch = movie.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      // if genre is not selected (empty string), match everything
      const matchesGenre =
        !genre || movie.genre.toLowerCase() === genre.toLowerCase();

      return matchesSearch && matchesGenre;
    });
  }, [movies, searchQuery, genre]);

  const {
    mutate: deletemovie,
    isPending,
    isError: movieError,
  } = useMutation({
    mutationFn: (id: string) => deleteMovie(id),
    onSuccess: (data: any) => {
      setOpenDeleteDialog(false);
      queryClient.invalidateQueries({ queryKey: ["movies"] });
      toast.success(data.message || "Movie deleted successfully");
    },
    onError: (error: any) => {
      toast.error(error.message || "Something went wrong");
    },
  });
  return (
    <>
      <section className="w-full mx-auto container p-4">
        <MovieFilter
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          genre={genre}
          onGenreChange={handleGenreChange}
        />
        {isLoading ? (
          <div className="w-full h-full min-h-48 p-6 flex items-center justify-center">
            <Spinner />
          </div>
        ) : !filteredMovie || filteredMovie.length === 0 ? (
          <div className="w-full h-full min-h-48 p-6 flex items-center justify-center">
            <h1 className="text-2xl font-bold">No movies found</h1>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full h-full">
            {filteredMovie.map((movie: any) => (
              <div
                key={movie.id}
                onClick={() => handleSelect(movie)}
                className="hover:cursor-pointer"
              >
                <MovieCard
                  title={movie.title}
                  description={movie.description}
                  genre={movie.genre}
                  released_year={movie.released_year}
                  duration={movie.duration}
                  poster_url={movie.poster_url}
                  rating={movie.rating}
                />
              </div>
            ))}
          </div>
        )}
        {openDialog && selectedMovie && (
          <MovieDetailDialog
            openDialog={openDialog}
            setOpenDialog={setOpenDialog}
            movie={selectedMovie}
            setDeleteId={setDeleteId}
            setOpenDeleteDialog={setOpenDeleteDialog}
          />
        )}

        {deleteId && (
          <DeleteDialog
            openDialog={openDeleteDialog}
            setOpenDialog={setOpenDeleteDialog}
            onContinue={() => deletemovie(deleteId)}
            isLoading={isPending}
          />
        )}
      </section>
      <LoginForm
        openDialog={isSignInDialogOpen}
        setOpenDialog={setIsSignInDialogOpen}
      />
    </>
  );
};
