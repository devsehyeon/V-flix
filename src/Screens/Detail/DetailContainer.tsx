import React from "react";
import DetailPresenter from "./DetailPresenter";
import { moviesApi, tvApi } from "API";
import { RouteComponentProps } from "react-router-dom";

interface IProps extends RouteComponentProps<IParams> {}

interface IParams {
  id: string;
}

interface IState {
  result: Result | null;
  videos: Array<any> | null;
  loading: boolean;
  error: string | null;
  isMovie: boolean;
}

export interface Result {
  original_title: string;
  original_name: string;
  backdrop_path: string;
  poster_path: string;
  release_date: string;
  first_air_date: string;
  runtime: number;
  episode_run_time: Array<number>;
  genres: Array<Genres>;
  overview: string;
}

interface Genres {
  name: string;
}

export default class extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    const {
      location: { pathname }
    } = props;
    this.state = {
      result: null,
      videos: null,
      loading: true,
      error: null,
      isMovie: pathname.includes("/movie/")
    };
  }

  async componentDidMount() {
    const {
      match: {
        params: { id }
      },
      history: { push }
    } = this.props;
    const { isMovie } = this.state;
    const parsedId = parseInt(id);

    if (isNaN(parsedId)) {
      return push("/");
    }

    let result = null;
    let videos = null;
    try {
      if (isMovie) {
        const request = await moviesApi.movieDetail(parsedId);
        result = request.data;
        videos = request.data.videos.results;
      } else {
        const request = await tvApi.showDetail(parsedId);
        result = request.data;
        videos = request.data.videos.results;
      }
    } catch {
      this.setState({
        error: "Can't find anything."
      });
    } finally {
      this.setState({
        loading: false,
        result,
        videos
      });
    }
  }

  render() {
    const { result, videos, loading, error } = this.state;
    return (
      <DetailPresenter
        result={result}
        videos={videos}
        loading={loading}
        error={error}
      />
    );
  }
}
