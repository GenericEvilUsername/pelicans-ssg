import Link from "next/link";

const Players = ({ players }) => (
  <>
    Pelaajat
    <ul>
      {players.map(player => (
        <li key={player.pid}>
          <Link href={`players/${player.pid}`}>
            {player.lastname} {player.firstname}
          </Link>
        </li>
      ))}
    </ul>
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
