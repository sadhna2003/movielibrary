import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Calendar,Clock, Star } from "lucide-react";

type Props = {
  title: string;
  description: string;
  genre: string;
  released_year: string;
  duration: string;
  poster_url: string;
  rating: number;
};
export const MovieCard = (data: Props) => {
  return (
    <Card className="!pt-0 h-full">
      <div className="flex justify-center w-full">
        <Image
          src={data.poster_url || "/placeholder.png"}
          alt={data.title || "placeholder"}
          width={200}
          height={300}
          className="object-cover object-center w-full h-56 rounded-t-xl"
        />
      </div>
      <CardContent>
        <CardHeader>
          <CardTitle className="flex justify-between gap-4 w-full">
            <h2 className="leading-tight">{data.title} </h2>
            <Badge variant="secondary">{data.genre}</Badge>
          </CardTitle>
          <CardDescription>{data.description}</CardDescription>
        </CardHeader>
        <div className="flex flex-row justify-start w-full gap-4 items-center px-6 py-4 text-sm text-gray-600">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-2" />
            <span>{data.released_year}</span>
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-2" />
            <span>{data.duration}</span>
          </div>
        </div>
        <div className="flex flex-row justify-start w-full items-center px-6 py-2 text-sm text-gray-600">
          <Star className="w-4 h-4 mr-2 text-amber-500 fill-amber-500" />
          <span>{data.rating || "N/A"}</span>
        </div>
      </CardContent>
    </Card>
  );
};
