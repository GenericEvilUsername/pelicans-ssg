import Link from "next/link";
import { Table } from "react-bootstrap";

const Teams = ({ teams }) => {
  return (
    <Table>
      <thead>
        <tr>
          <th>Joukkue</th>
          {["O", "V", "T", "H", "TM", "PM", "VP%"].map(th => (
            <th key={th}>{th}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {teams
          .filter(team => team.id !== 999)
          .map(team => (
            <tr key={team.team_id}>
              <td>
                <Link href={`/teams/${team.team_id}`}>{team.name}</Link>
              </td>
              <td>{team.tied + team.lost + team.won}</td>
              {["won", "tied", "lost", "goals", "against"].map((td, index) => (
                <td key={index}>{team[td]}</td>
              ))}
              <td>
                {(
                  ((team.won * 2 + team.tied) / ((team.tied + team.lost + team.won) * 2)) *
                  100
                ).toFixed(1)}
              </td>
            </tr>
          ))}
      </tbody>
    </Table>
  );
};

export async function getStaticProps() {
  const { API_URL } = process.env;
  const teams = await fetch(`${API_URL}/teams`).then(res => res.json());

  return { props: { teams } };
}

export default Teams;
