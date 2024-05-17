import Link from "next/link";
import { Table } from "react-bootstrap";
import { formatDate } from "../_app";

const Players = ({ players }) => (
  <>
    <h1>Pelaajat</h1>
    <Table>
      <thead>
        <tr>
          {[
            "Pelaaja",
            "Syntymäaika",
            "Kansallisuus",
            "Kaudet",
            "O",
            "M",
            "S",
            "P",
            "JM",
            "1. kausi",
            "Viim. kausi"
          ].map(th => (
            <th key={th}>{th}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {players.map(player => (
          <tr key={player.pid}>
            <td>
              <Link href={`players/${player.pid}`}>
                {player.lastname} {player.firstname}
              </Link>
            </td>
            <td>{formatDate(player.date_of_birth)}</td>
            <td>{player.nationality}</td>
            {["seasons", "games", "goals", "assists", "points", "pim", "first", "last"].map(td => (
              <td key={td}>{player.totals[td]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  </>
);

export async function getStaticProps() {
  const { API_URL } = process.env,
    players = await (await fetch(`${API_URL}/players`)).json();

  return {
    props: { players }
  };
}

export default Players;
