import { Table } from "react-bootstrap";
import { formatDate } from "../_app";
import Link from "next/link";

const Player = ({ player }) => {
  const { lastname, firstname, date_of_birth, pos, season_stats } = player;

  return (
    <>
      <h1>
        {firstname} {lastname}
      </h1>
      <h2>
        Syntymäaika: {formatDate(date_of_birth) || "-"} | Pelipaikka: {pos}
      </h2>
      <h3>Kausitilastot</h3>
      <Table>
        <thead>
          <tr>
            <th>Kausi</th>
            <th>Joukkue</th>
            <th>Sarjataso</th>
            {["O", "M", "S", "P", "+", "-", "+/-", "JM", "VM", "YV", "AV", "L", "LP%"].map(th => (
              <th key={th}>{th}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {season_stats.map(s => (
            <tr key={s.id}>
              <td>
                <Link href={`/seasons/${s.season_id}`}>{s.season_id}</Link>
              </td>
              <td>{s.teamname}</td>
              <td>{s.serie_name}</td>
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
              ].map(attr => (
                <td key={attr}>{s[attr] === null ? "-" : s[attr]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export async function getStaticPaths() {
  const { API_URL } = process.env;
  const players = await (await fetch(`${API_URL}/players`)).json();

  return {
    paths: players.map(({ pid: id }) => ({ params: { id: id.toString() } })),
    fallback: false
  };
}

export async function getStaticProps(context) {
  const { API_URL } = process.env,
    { id } = context.params;
  const player = await (await fetch(`${API_URL}/players/${id}`)).json();

  return {
    props: { player }
  };
}

export default Player;
