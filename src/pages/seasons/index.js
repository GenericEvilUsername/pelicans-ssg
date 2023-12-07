import Link from "next/link";

const Seasons = ({ seasons }) => {
  return (
    <ul>
      {seasons.map(season => (
        <ul>
          <Link href={`/seasons/${season.season_id}`}>
            {season.season_id} {season.teamname}
          </Link>
        </ul>
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
