import { gql } from "@apollo/client";

export const GET_ALL = gql`
  query GetAll {
    allSeries {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }

    movies {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`;

export const GET_ALL_SERIES = gql`
  query GetAllSeries {
    allSeries {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`;

export const GET_MOVIES = gql`
  query GetMovies {
    movies {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`;

export const GET_MOVIE = gql`
  query GetMovieById($id: ID!) {
    movie(movieId: $id) {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`;

export const ADD_MOVIE = gql`
  mutation AddMovie($movieInput: newMovie) {
    addMovie(movie: $movieInput) {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`;

export const DELETE_MOVIE = gql`
  mutation DeleteMovie($id: ID!) {
    deleteMovie(movieId: $id) {
      message
    }
  }
`;

export const EDIT_MOVIE = gql`
  mutation EditMovie($id: ID!, $movieInput: newMovie) {
    editMovie(movieId: $id, movie: $movieInput) {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`;

export const GET_MY_LIST = gql`
  query {
    myList @client {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`;
