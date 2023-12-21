import Link from "next/link";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";

import { formatDate } from "../_app";
import { useRef } from "react";

export async function getStaticProps(context) {
  const { id } = context.params;
  const { API_URL } = process.env;
  const season = await (await fetch(`${API_URL}/seasons/${id}`)).json();

  return {
    props: { season }
  };
}

export async function getStaticPaths() {
  const { API_URL } = process.env;
  const seasons = await (await fetch(`${API_URL}/seasons`)).json();

  return {
    paths: seasons.map(({ season_id: id }) => ({ params: { id } })),
    fallback: false
  };
}

const Games = ({ games }) => {
  const progress = { O: 0, V: 0, H: 0, T: 0, TM: 0, PM: 0, P: 0, LP: null };

  const updateProgress = game => {
    console.log(game, JSON.stringify(progress.current));
    if (game.pel_score > game.opp_score) {
      progress.V++;
      progress.P += 2;
    } else if (game.pel_score === game.opp_score) {
      progress.T++;
      progress.P += 1;
    } else progress.H++;

    progress.TM += game.pel_score;
    progress.PM += game.opp_score;

    progress.O++;
  };

  return (
    <>
      <h2>Ottelut</h2>
      <Table>
        <thead>
          <tr>
            <th>Pvm</th>
            <th>Ottelu</th>
            <th>Tulos</th>
            <th>Yleisö</th>
            {["O", "V", "T", "H", "TM", "PM", "PTS"].map(attr => (
              <th key={attr}>{attr}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {games.map(game => {
            updateProgress(game);
            return (
              <tr key={game.id}>
                <td>
                  <Link href={`/games/${game.id}`}>{formatDate(game.gamedate)}</Link>
                </td>
                <td>{game.matchup}</td>
                <td>{game.score}</td>
                <td>{game.attendance}</td>
                {["O", "V", "T", "H", "TM", "PM", "P"].map(attr => (
                  <td key={attr}>{progress[attr]}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

const Season = ({ season }) => {
  const { games } = season;
  return (
    <Row>
      <Col md={12}>
        <Games games={games} />
      </Col>
    </Row>
  );
};
export default Season;
