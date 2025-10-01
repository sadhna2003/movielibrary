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
export interface Rating {
  id: string;
  userId: string;
  movieId: string;
  rating: number;
  createdAt: string;
}

export const mockMovies: Movie[] = [
  {
    id: "1",
    title: "The Dark Knight",
    description:
      "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    genre: "action",
    released_year: "2008",
    duration: "2hr32min",
    director: "Christopher Nolan",
    cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart", "Michael Caine"],
    poster_url:
      "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQkUywIUXDjHSQJIaNHYVs08osgBpF5Ot-xmB_omyEZeeRP9Xug",
    rating: "4.5",
  },
  {
    id: "2",
    title: "Inception",
    description:
      "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    genre: "sci-fi",
    released_year: "2010",
    duration: "2hr28min",
    director: "Christopher Nolan",
    cast: ["Leonardo DiCaprio", "Marion Cotillard", "Tom Hardy", "Ellen Page"],
    poster_url:
      "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQovCe0H45fWwAtV31ajOdXRPTxSsMQgPIQ3lcZX_mAW0jXV3kH",
    rating: "4.6",
  },
  {
    id: "3",
    title: "The Shawshank Redemption",
    description:
      "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    genre: "drama",
    released_year: "1994",
    duration: "2hr22min",
    director: "Frank Darabont",
    cast: ["Tim Robbins", "Morgan Freeman", "Bob Gunton", "William Sadler"],
    poster_url:
      "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRipfEoI8fb4qxidki3e_kp3fr_Kopvoi2yCKcpJGf2ngnKweMR",
    rating: "3.8",
  },
  {
    id: "4",
    title: "The Godfather",
    description:
      "An organized crime dynasty's aging patriarch transfers control of his clandestine empire to his reluctant son.",
    genre: "drama",
    released_year: " 1972",
    duration: "2hr55min",
    director: "Francis Ford Coppola",
    cast: ["Marlon Brando", "Al Pacino", "James Caan", "Diane Keaton"],
    poster_url:
      "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTWmKJlXjXTiE9hkekFBy9WCRMf0eKZx2mrsgenlO-qzr9H7v0A",
    rating: "3.9",
  },
  {
    id: "5",
    title: "Forrest Gump",
    description:
      "The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man.",
    genre: "drama",
    released_year: "1994",
    duration: "2hr26min",
    director: "Robert Zemeckis",
    cast: ["Tom Hanks", "Robin Wright", "Gary Sinise", "Sally Field"],
    poster_url:
      "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcScf5su68o8oOp0D89ESlb3_8RW2ge3ZWIPFv_OBVSObb680o3H",
    rating: "3.8",
  },
  {
    id: "7",
    title: "The Matrix",
    description:
      "A computer programmer is led to fight an underground war against powerful computers who have constructed his entire reality with a system called the Matrix.",
    genre: "sci-fi",
    released_year: "1999",
    duration: "2hr16min",
    director: "The Wachowskis",
    cast: [
      "Keanu Reeves",
      "Laurence Fishburne",
      "Carrie-Anne Moss",
      "Hugo Weaving",
    ],
    poster_url:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5DoFtShSmClflZ0RzBj9JBMweU5IUVBCeEbbLeV2XPlCnTKNi",
    rating: "3.8",
  },
];
