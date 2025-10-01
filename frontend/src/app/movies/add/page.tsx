"use client";
import React, { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { FormInput } from "@/components/form/FormInput";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FormSelect } from "@/components/form/FormSelect";
import { FormTextarea } from "@/components/form/FormTextarea";
import { Permission } from "@/app/Permission";
import { addMovie, editMovie, getMovieById } from "@/api/movie/movie.service";
import { useRouter, useSearchParams } from "next/navigation";
import { Spinner } from "@/components/common/Spinner";

const options = [
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

const formSchema = z.object({
  title: z
    .string()
    .min(2, "Title must be at least 2 characters")
    .max(50, "Title must be at most 50 characters")
    .trim(),
  description: z
    .string()
    .min(2, "Description too short")
    .max(500, "Description too long")
    .trim(),
  genre: z.string().min(1, "Select at least one genre"),
  released_year: z
    .string()
    .regex(/^\d{4}$/, "Year must be in YYYY format")
    .refine(
      (val) => {
        const year = Number(val);
        const currentYear = new Date().getFullYear();
        return year >= 1900 && year <= currentYear; // you can adjust min year
      },
      { message: "Enter a valid year between 1900 and the current year" }
    ),
  duration: z
    .string()
    .regex(
      /^\d{1,2}hr ?(\d{1,2}min)?$/,
      "Duration must be in format like XhrYmin or Xhr Ymin"
    ),
  poster_url: z.url(),
  cast: z.array(z.string().min(2).max(30)),
  director: z.string().min(2, "Director name too short").max(30, "Too long"),
});

const Page = () => {
  const movieId = useSearchParams().get("movieId");
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      genre: "",
      released_year: "",
      duration: "",
      poster_url: "",
      cast: [],
      director: "",
    },
  });

  const {
    data: movie,
    isLoading,
    isError: movieError,
  } = useQuery({
    queryKey: ["movie", movieId],
    queryFn: () => getMovieById(movieId as string),
    enabled: !!movieId,
    select: (data) => data.movie || {},
  });
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: async (data: z.infer<typeof formSchema>) => {
      if (movieId) {
        return await editMovie(data, movieId);
      } else {
        return await addMovie(data);
      }
    },
    onSuccess: (data: any) => {
      router.push("/");
      toast.success(data.message || "Movie added successfully");
    },
    onError: (error: any) => {
      toast.error(error.message || "Something went wrong");
    },
  });

  useEffect(() => {
    if (movie && !isLoading && movieId) {
      form.reset({
        ...movie,
      });
    }
  }, [movie, movieId]);

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    // console.log("submitted data", data);
    mutate(data);
    form.reset();
  };

  // const convertCastStringToArray = (castString: string | string[]) => {
  //   const normalizeCast = (cast: string | string[]) => {
  //     if (Array.isArray(cast)) {
  //       return cast.map((c) => c.trim()).filter((c) => c !== "");
  //     }

  //     if (typeof cast === "string") {
  //       return cast
  //         .split(",")
  //         .map((c) => c.trim())
  //         .filter((c) => c !== "");
  //     }

  //     return [];
  //   };
  //   form.setValue("cast", normalizeCast(castString));
  // };
  const convertCastStringToArray = (castString: string): string[] => {
    // Your implementation here
    const castArray = castString.split(",").map((cast) => cast.trim());
    return castArray.filter((cast) => cast !== "");
  };
  if (isLoading) {
    return (
      <div className="p-4 mx-auto container w-full flex flex-col gap-8 justify-center h-[calc(100vh-200px)] items-center">
        <Spinner />
      </div>
    );
  }

  return (
    <Permission allowedRoles={["admin", "super-admin"]}>
      <div className="p-4 mx-auto container w-full flex flex-col gap-8">
        {/* page title */}
        <h1 className="text-2xl font-bold">
          {movieId ? "Edit Movie" : "Add Movie"}
        </h1>
        <Card>
          <CardHeader>
            <CardTitle>{movieId ? "Edit Movie" : "Add New Movie"}</CardTitle>
            <CardDescription>
              Fill in the details to add a new movie to the library
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              {/* {JSON.stringify(form.formState.errors)} */}
              <form
                className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <FormInput name="title" label="Title" placeholder="Title" />

                <FormSelect
                  name="genre"
                  label="Genre"
                  placeholder="Select Genre"
                  options={options}
                />
                <FormInput
                  name="released_year"
                  label="Release Year"
                  placeholder="Release Year"
                />

                <FormInput
                  name="duration"
                  label="Duration"
                  placeholder="Duration"
                />
                <FormInput
                  name="director"
                  label="Director"
                  placeholder="Director"
                />
                <FormInput
                  name="cast"
                  label="Cast"
                  placeholder="Cast"
                  onBlur={(e) => convertCastStringToArray(e.target.value)}
                  onChange={(e) =>
                    form.setValue(
                      "cast",
                      convertCastStringToArray(e.target.value)
                    )
                  }
                />
                <FormInput
                  name="poster_url"
                  label="Poster URL"
                  placeholder="Poster URL"
                  className="md:col-span-2"
                />
                <FormTextarea
                  name="description"
                  label="Description"
                  placeholder="Description"
                  className="md:col-span-2"
                />
                <div className="flex justify-start gap-4">
                  <Button type="submit" disabled={isPending}>
                    {isPending ? "Submitting..." : "Submit"}
                  </Button>
                  <Button
                    type="reset"
                    variant="outline"
                    onClick={() => router.back()}
                  >
                    cancel
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </Permission>
  );
};

export default Page;
