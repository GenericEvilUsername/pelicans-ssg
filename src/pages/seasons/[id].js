import Link from "next/link";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";

import { formatDate } from "../_app";
import { useEffect, useMemo, useRef, useState } from "react";
import { Form } from "react-bootstrap";

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
            <th>#</th>
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
                <td>{game.orderno}</td>
                <td>
                  <Link href={`/games/${game.id}`}>{formatDate(game.gamedate)}</Link>
                </td>
                <td>{game.matchup}</td>
                <td>
                  {game.score} {!game.overtime || "JA"}
                </td>
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

const Tables = ({ tables }) => {
  return (
    <Table>
      <thead>
        <tr>
          <th></th>
          {["O", "V", "T", "H", "TM", "PM", "PTS", "LP"].map(th => (
            <th key={th}>{th}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tables.map(table => (
          <tr key={table.team_id} className={table.team_id === 999 ? "own" : ""}>
            <td>{table.name}</td>
            <td>{table.games}</td>
            <td>{table.won}</td>
            <td>{table.ties}</td>
            <td>{table.lost}</td>
            <td>{table.gf}</td>
            <td>{table.ga}</td>
            <td>{table.pts}</td>
            <td>{table.bonus_points || "-"}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

const Stats = ({ stats, games, game_logs }) => {
  const [start_filter, setStartFilter] = useState(null),
    [end_filter, setEndFilter] = useState(null);

  const filtered_stats = useMemo(() => {
    if (start_filter === null && end_filter === null) return stats;
    else {
      const logs = game_logs.filter(
        l => l.orderno >= (start_filter || 0) && l.orderno <= (end_filter || 100)
      );
      const filtered_stats = logs.reduce((filtered, l) => {
        const stats = (filtered[l.player_id] ??= {
          gp: 0,
          goals: 0,
          assists: 0,
          points: 0,
          plus: 0,
          minus: 0,
          pm_diff: 0,
          pim: 0,
          gwg: 0,
          ppg: 0,
          shg: 0,
          shots: 0,
          jersey_numbers: "",
          player: l.player
        });

        stats.gp++;
        stats.goals += l.ma;
        stats.assists += l.sy;
        stats.points += l.pi;
        stats.plus += l.pl;
        stats.minus += l.mi;
        stats.pm_diff += l.pm;
        stats.pim += l.ra;
        stats.gwg += l.vm;
        stats.ppg += l.yv;
        stats.shg += l.av;
        stats.shots += l.la;

        const numbers = stats.jersey_numbers.split(" ");
        if (!numbers.includes((l.jerseynro || "").toString())) {
          numbers.push(l.jerseynro);
          stats.jersey_numbers = numbers.join(" ");
        }

        return filtered;
      }, {});

      return Object.values(filtered_stats).sort((a, b) => {
        if (a.points > b.points) return -1;
        return a.points < b.points ? 1 : 0;
      });
    }
  }, [stats, start_filter, end_filter]);
  return (
    <>
      <Form.Group>
        <Form.Label>Alku</Form.Label>
        <Form.Control
          as="select"
          value={start_filter || ""}
          onChange={e => setStartFilter(parseInt(e.target.value) || null)}
        >
          <option value="" />
          {games.map(g => (
            <option key={g.id} value={g.orderno}>
              {g.orderno} / {g.gamedate} {g.matchup}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label>Loppu</Form.Label>
        <Form.Control
          as="select"
          value={end_filter || ""}
          onChange={e => setEndFilter(parseInt(e.target.value) || null)}
        >
          <option value="" />
          {games.map(g => (
            <option key={g.id} value={g.orderno}>
              {g.orderno} / {g.gamedate} {g.matchup}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
      <Table>
        <thead>
          <tr>
            {[
              "#",
              "Pelaaja",
              "O",
              "M",
              "S",
              "P",
              "+",
              "-",
              "+/-",
              "JM",
              "VM",
              "YV",
              "AV",
              "L",
              "LP"
            ].map(th => (
              <th key={th}>{th}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filtered_stats.map(stat => (
            <tr key={stat.player_id}>
              <td>{stat.jersey_numbers}</td>
              <td>
                <Link href={`/players/${stat.player_id}`}>
                  {stat.player.lastname} {stat.player.firstname}
                </Link>
              </td>
              {[
                "gp",
                "goals",
                "assists",
                "points",
                "plus",
                "minus",
                "pm_diff",
                "pim",
                "gwg",
                "ppg",
                "shg",
                "shots"
              ].map(td => (
                <td key={td}>{stat[td]}</td>
              ))}
              <td>{stat.shots != 0 ? (100 * (stat.goals / stat.shots)).toFixed(2) : "-"}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

const Season = ({ season }) => {
  const { games, tables, season_stats: stats, game_logs } = season;
  return (
    <>
      <Row>
        <Col md={12}>
          <Tables tables={tables} />
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <Games games={games} />
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <Stats stats={stats} games={games} game_logs={game_logs} />
        </Col>
      </Row>
    </>
  );
};
export default Season;
