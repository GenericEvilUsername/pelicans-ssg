import Link from "next/link";

const Teams = ({ teams }) => {
  return (
    <ul>
      {teams.map(team => (
        <li key={team.team_id}>
          <Link href={`/teams/${team.team_id}`}>{team.name}</Link>
        </li>
      ))}
    </ul>
  );
};

export async function getStaticProps() {
  const { API_URL } = process.env;
  const teams = await fetch(`${API_URL}/teams`).then(res => res.json());

  return { props: { teams } };
}

export default Teams;
