import Link from "next/link";

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

const Season = ({ season }) => {
  const { games } = season;
  return (
    <>
      <Games games={games} />
    </>
  );
};
export default Season;
