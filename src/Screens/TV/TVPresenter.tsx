import React from "react";
import styled from "styled-components";
import Helmet from "react-helmet";
import Section from "Components/Section";
import Loader from "Components/Loader";
import Error from "Components/Error";
import Poster from "Components/Poster";

const Container = styled.div`
  padding: 20px;
`;

interface IProps {
  topRated: Array<TV> | null;
  popular: Array<TV> | null;
  airingToday: Array<TV> | null;
  error: string | null;
  loading: boolean;
}

interface TV {
  id: number;
  original_name: string;
  poster_path: string;
  vote_average: number;
  first_air_date: string;
}

const TVPresenter: React.FunctionComponent<IProps> = ({
  topRated,
  popular,
  airingToday,
  loading,
  error
}) => (
  <>
    <Helmet>
      <title>TV Shows | V-flix</title>
    </Helmet>
    {loading ? (
      <Loader />
    ) : (
      <Container>
        {topRated && topRated.length > 0 && (
          <Section title="Tod Rated Shows">
            {topRated.map(show => (
              <Poster
                key={show.id}
                id={show.id}
                title={show.original_name}
                imageUrl={show.poster_path}
                rating={show.vote_average}
                isMovie={false}
                year={
                  show.first_air_date && show.first_air_date.substring(0, 4)
                }
              />
            ))}
          </Section>
        )}
        {popular && popular.length > 0 && (
          <Section title="Popular Shows">
            {popular.map(show => (
              <Poster
                key={show.id}
                id={show.id}
                title={show.original_name}
                imageUrl={show.poster_path}
                rating={show.vote_average}
                isMovie={false}
                year={
                  show.first_air_date && show.first_air_date.substring(0, 4)
                }
              />
            ))}
          </Section>
        )}
        {airingToday && airingToday.length > 0 && (
          <Section title="Airing Today">
            {airingToday.map(show => (
              <Poster
                key={show.id}
                id={show.id}
                title={show.original_name}
                imageUrl={show.poster_path}
                rating={show.vote_average}
                isMovie={false}
                year={
                  show.first_air_date && show.first_air_date.substring(0, 4)
                }
              />
            ))}
          </Section>
        )}
        {error && <Error color="#e74c3c" text={error} />}
      </Container>
    )}
  </>
);

export default TVPresenter;
