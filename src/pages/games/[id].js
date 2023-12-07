const Game = () => "Ottelu";

export async function getStaticPaths() {
  const { API_URL } = process.env;
  const games = await (await fetch(`${API_URL}/games`)).json();
  const paths = games.map(id => ({ params: { id: id.toString() } }));

  return {
    paths,
    fallback: false
  };
}

export async function getStaticProps(context) {
  const { API_URL } = process.env,
    { id } = context.params;
  const game = await (await fetch(`${API_URL}/games/${id}`)).json();

  return {
    props: { game }
  };
}

export default Game;
