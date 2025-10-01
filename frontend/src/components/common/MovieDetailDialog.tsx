import React, { useState } from "react";
import { Movie, mockMovies } from "@/constant/movie.constant";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { Badge } from "../ui/badge";
import {
  ArrowBigLeft,
  ArrowBigRight,
  Calendar,
  Clock,
  MoveRight,
  Star,
} from "lucide-react";
import { Button } from "../ui/button";
import { useAuth } from "@/hook/use-auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addRating } from "@/api/rating/rating.service";
import { toast } from "sonner";

type MovieDetailProps = {
  movie: Movie;
  openDialog: boolean;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
  setDeleteId: React.Dispatch<React.SetStateAction<string>>;
  setOpenDeleteDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

export const MovieDetailDialog = ({
  openDialog,
  setOpenDialog,
  movie,
  setDeleteId,
  setOpenDeleteDialog,
}: MovieDetailProps) => {
  //   console.log("movie", movie);
  const { setIsSignInDialogOpen, isAuthenticated, user } = useAuth();
  const queryClient = useQueryClient();
  const [rating, setRating] = useState(0);
  const router = useRouter();
  const handleSignIn = () => {
    setIsSignInDialogOpen(true);
  };

  const handleRating = (value: number) => {
    // console.log("index", value);
    setRating(value);
    if (rating === 1 && value === 1) {
      setRating(0);
    }
  };

  const handleDelete = (id: string) => {
    setOpenDialog(false);
    setDeleteId(id);
    setOpenDeleteDialog(true);
    // deletemovie(id);
  };

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: any) => {
      return await addRating(data);
    },
    onSuccess: (data: any) => {
      setOpenDialog(false);
      queryClient.invalidateQueries({ queryKey: ["movies"] });
      toast.success(data.message || "Rating added successfully");
    },
    onError: (error: any) => {
      toast.error(error.message || "Something went wrong");
    },
  });

  const handleReview = () => {
    const data = {
      movieId: movie.id,
      userId: user?.id,
      rating: rating,
    };
    mutate(data);
  };
  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog} key={movie.id}>
      <DialogContent className="sm:max-w-md lg:max-w-2xl h-10/12 lg:h-auto">
        <DialogHeader>
          <DialogTitle className="sm:text-lg lg:text-2xl">
            {movie.title}
          </DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full overflow-y-scroll lg:overflow-hidden pt-3">
          <div className="flex justify-center w-full">
            <Image
              src={movie.poster_url || "/placeholder.png"}
              alt={movie.title || "placeholder"}
              width={200}
              height={300}
              className="object-center object-cover w-full h-full rounded-xl"
            />
          </div>
          <div className="flex flex-col gap-4 w-full h-full">
            <div className="flex flex-wrap gap-2 w-full text-sm text-gray-600">
              <Badge variant="secondary">{movie.genre}</Badge>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                <span>{movie.released_year}</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                <span>{movie.duration}</span>
              </div>
            </div>
            <div className="flex flex-row justify-start w-full items-center text-base text-gray-600">
              <Star className="w-4 h-4 mr-2 text-amber-500 fill-amber-500" />
              <span>{movie.rating || "N/A"}</span>
            </div>
            <hr />
            <div className="flex flex-col gap-2 w-full">
              <h3 className="text-lg font-semibold">Description</h3>
              <DialogDescription>{movie.description}</DialogDescription>
            </div>
            <div className="flex flex-col gap-2 w-full">
              <h3 className="text-lg font-semibold">Cast</h3>
              <div className="flex flex-wrap gap-2 w-full">
                {movie.cast.map((cast) => {
                  return (
                    <Badge variant="outline" key={cast}>
                      {cast}
                    </Badge>
                  );
                })}
              </div>
            </div>
            <div className="flex flex-col gap-2 w-full">
              <h3 className="text-lg font-semibold">Director</h3>
              <span className="font-normal text-gray-600">
                {movie.director}
              </span>
            </div>
            <hr />
            {/* info to sign in if not for rating and review */}
            {!isAuthenticated ? (
              <div className="flex flex-col gap-2 w-full justify-items-center items-center bg-gray-100 p-4 rounded-xl text-gray-600">
                <p>Please sign in to rate this movie</p>
                <Button type="button" onClick={handleSignIn}>
                  Sign In
                </Button>
              </div>
            ) : (
              <div className="flex flex-col justify-center items-center-safe gap-2 w-full border rounded-xl p-6">
                <h3 className="text-lg font-semibold">Rate this movie</h3>
                <div className="flex gap-2 w-full justify-center items-center text-gray-400">
                  {[1, 2, 3, 4, 5].map((star, index) => {
                    const isFilled = star <= rating;
                    return (
                      <Star
                        key={index}
                        className={[
                          isFilled ? "fill-amber-500 text-amber-500" : "",
                          "w-6 h-6 cursor-pointer hover:scale-125",
                        ].join(" ")}
                        strokeWidth={1}
                        onClick={() => handleRating(index + 1)}
                      />
                    );
                  })}
                </div>
                {rating > 0 && (
                  <Button
                    type="button"
                    className="mt-2 rounded-full w-8 h-8 p-3"
                    variant={"outline"}
                    onClick={handleReview}
                  >
                    <MoveRight className="w-4 h-4" />
                  </Button>
                )}
              </div>
            )}
          </div>
          {isAuthenticated && user?.role === "admin" && (
            <div className="col-span-2 flex flex-row justify-start w-full gap-3 p-2">
              <Link href={`/movies/edit/?movieId=${movie.id}`}>
                <Button className="w-full" variant={"outline"}>
                  Edit
                </Button>
              </Link>
              <Button
                className="w-auto"
                variant={"destructive"}
                onClick={() => handleDelete(movie.id)}
                type="button"
              >
                Delete
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
