import { format } from "date-fns";
import { formatDate } from "../_app";
import { Table } from "react-bootstrap";
import Link from "next/link";
import Player from "../players/[id]";

const Game = ({ game }) => {
  const { matchup, score, gamedate, goals, attendance, season_id, game_logs = [] } = game;

  return (
    <>
      <h1>{matchup}</h1>
      <h2>
        {score} | {formatDate(gamedate)} | Kausi:{" "}
        <Link href={`/seasons/${season_id}`}>{season_id}</Link> | Yleisö: {attendance || "-"}
      </h2>
      <h3>Maalit</h3>
      <Table>
        <thead>
          <tr>
            <th>Aika</th>

            <th>Maalintekijä (syöttäjät)</th>
            <th />
            <th>Tilanne</th>
          </tr>
        </thead>
        <tbody>
          {goals.map(goal => (
            <tr key={goal.id}>
              <td>{goal.game_time}</td>
              <td>
                {goal.scorer_lastname} {goal.scorer_firstname}
                {(!goal.asst1_lastname && !goal.asst2_lastname) || (
                  <>
                    <br />(
                    {[
                      `${goal.asst1_lastname || ""} ${goal.asst1_firstname || ""}`,
                      `${goal.asst2_lastname || ""} ${goal.asst2_firstname || ""}`
                    ]
                      .filter(n => n.trim())
                      .join(", ")}
                    )
                  </>
                )}
              </td>
              <td>{goal.goal_types}</td>
              <td>{goal.home_goal + " - " + goal.away_goal}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <h3>Pelaajatilastot</h3>
      {game_logs.length === 0 ? (
        "Ei saatavilla"
      ) : (
        <Table>
          <thead>
            <tr>
              {[
                "#",
                "Pelaaja",
                "M",
                "S",
                "P",
                "+",
                "-",
                "+/-",
                "JM",
                "VM",
                "YV",
                "AV",
                "LA",
                "LP"
              ].map(th => (
                <th key={th}>{th}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {game_logs.map(log => (
              <tr key={log.id}>
                <td>{log.jerseynro}</td>
                <td>
                  {log.player.lastname} {log.player.firstname}
                </td>
                {["ma", "sy", "pi", "pl", "mi", "pm", "ra", "vm", "yv", "av", "la", "lp"].map(
                  attr => (
                    <td key={attr}>{log[attr]}</td>
                  )
                )}
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

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
