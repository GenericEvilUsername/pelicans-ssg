import Link from "next/link";

export async function getStaticProps(context) {
  const { id } = context.params;
  const { API_URL } = process.env;
  const team = await (await fetch(`${API_URL}/teams/${id}`)).json();

  return {
    props: { team }
  };
}

export async function getStaticPaths() {
  const { API_URL } = process.env;
  const teams = await (await fetch(`${API_URL}/teams`)).json();

  return {
    paths: teams.map(({ team_id: id }) => ({ params: { id: id.toString() } })),
    fallback: false
  };
}

const Games = ({ games }) => {
  return (
    <ul>
      {games.map(game => (
        <li key={game.id}>
          <Link href={`/games/${game.id}`}>
            {game.gamedate} {game.matchup} {game.score}
          </Link>
        </li>
      ))}
    </ul>
  );
};

const Team = ({ team }) => {
  const { games, name } = team;
  return (
    <>
      <h1>{name}</h1>
      <Games games={games} />
    </>
  );
};
export default Team;
