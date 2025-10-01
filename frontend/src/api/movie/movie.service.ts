import { apiFetch } from "../api-fetch";
import { API_PATHS } from "@/api/constant";
import { getToken } from "../utils";
import {
  MovieByIdResponseDTO,
  MovieEditResponseDTO,
  MovieListResponseDTO,
  MoviePostResponseDTO,
} from "./movie.schema.dto";

export const addMovie = async (data: any): Promise<MoviePostResponseDTO> => {
  const token = getToken();
  const response: MoviePostResponseDTO = await apiFetch(API_PATHS.ADD_MOVIE, {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return response;
};

export const getMovies = async (): Promise<MovieListResponseDTO> => {
  const response = (await apiFetch(
    API_PATHS.GET_MOVIES
  )) as MovieListResponseDTO;
  return response;
};
export const getMovieById = async (
  id: string
): Promise<MovieByIdResponseDTO> => {
  const response: MovieByIdResponseDTO = await apiFetch(
    `${API_PATHS.GET_MOVIE_BY_ID}${id}`,
    {
      method: "GET",
    }
  );
  return response;
};

export const editMovie = async (
  data: any,
  id: string
): Promise<MovieEditResponseDTO> => {
  const token = getToken();
  const response: MovieEditResponseDTO = await apiFetch(
    `${API_PATHS.UPDATE_MOVIE}${id}`,
    {
      method: "PUT",
      headers: {
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }
  );
  return response;
};

export const deleteMovie = async (id: string) => {
  const token = getToken();
  const response = await apiFetch(`${API_PATHS.DELETE_MOVIE}${id}`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  return response;
};
