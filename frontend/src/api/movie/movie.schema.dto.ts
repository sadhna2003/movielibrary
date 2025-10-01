export interface Movie {
    id: string;
    title: string;
    description: string;
    genre: string;
    released_year: string;
    duration: string;
    director: string;
    cast: string[];
    poster_url: string;
    rating: string;
}

export interface MovieListResponseDTO {
    movies: Movie[]
}

export interface MoviePostResponseDTO {
    message: string
    movie: Movie
}

export interface MovieEditResponseDTO extends MoviePostResponseDTO {}
export interface MovieByIdResponseDTO extends MoviePostResponseDTO {}
