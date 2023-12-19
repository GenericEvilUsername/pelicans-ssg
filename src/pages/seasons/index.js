import Link from "next/link";

const Seasons = ({ seasons }) => {
  return (
    <ul>
      {seasons.map(season => (
        <li key={season.season_id}>
          <Link href={`/seasons/${season.season_id}`}>
            {season.season_id} {season.teamname}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export async function getStaticProps() {
  const { API_URL } = process.env;
  const seasons = await (await fetch(`${API_URL}/seasons`)).json();

  return { props: { seasons } };
}

export default Seasons;
