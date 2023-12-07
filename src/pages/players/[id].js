const Player = () => "Pelaaja";

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
