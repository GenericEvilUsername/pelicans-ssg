import Link from "next/link";
import Table from "react-bootstrap/Table";

const Result = ({ result }) => {
  switch (result) {
    case "oop":
      return "Ulkona pudotuspeleistä";
    case "promoted":
      return "Liiganousu";
    case "relegated":
      return "Putoaminen 1. divisioonaan";
    case "relegation_win":
      return "Säilyi liigakarsinnoissa";
    case "lqf":
      return "Puolivälierätappio";
    case "lf":
      return "Finaalitappio";
    case "promotion_loss":
      return "Tappio liigakarsinnoissa";
    case "lsf":
      return "Välierätappio";
    case "relegated_saved":
      return "Tappio liigakarsinnoissa";
    case "cancelled":
      return "Kausi keskeytettiin";
    case "lpr":
      return "Tappio 1. kierroksella";
    default:
      return result;
  }
};

const Seasons = ({ seasons }) => {
  return (
    <Table>
      <thead>
        <tr>
          <th>Kausi</th>
          <th>Nimi</th>
          <th>Sarja</th>
          <th className="numeric">O</th>
          <th className="numeric">V</th>
          <th className="numeric">T</th>
          <th className="numeric">H</th>
          <th className="numeric">LP</th>
          <th className="numeric">TM</th>
          <th className="numeric">PM</th>
          <th className="numeric">P</th>
          <th className="numeric">Sija</th>
          <th>Lopullinen tulos</th>
        </tr>
      </thead>
      <tbody>
        {seasons.map(
          ({
            teamname,
            season_id,
            serie_name,
            games,
            won,
            ties,
            lost,
            bonus_points = "-",
            gf,
            ga,
            pts,
            position,
            result
          }) => (
            <tr key={season_id}>
              <td>
                <Link href={`/seasons/${season_id}`}>{season_id}</Link>
              </td>
              {[teamname, serie_name].map((attr, key) => (
                <td key={key}>{attr}</td>
              ))}
              {[games, won, ties, lost, bonus_points, gf, ga, pts, position].map((attr, key) => (
                <td className="numeric" key={key}>
                  {attr}
                </td>
              ))}
              <td>
                <Result result={result} />
              </td>
            </tr>
          )
        )}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={13} className="legend">
            Selite: O = ottelut, V = voitot varsinaisella peliajalla, T = tasapelit / tasan
            päättyneet ottelut varsinaisen peliajan jälkeen (kaudesta 2001-02 eteenpäin), H =
            tappiot varsinaisella peliajalla, LP = lisäpiste voittolaukaus- / jatkoaikavoitosta
            (kauden 2001-02 jälkeen), TM = tehdyt maalit, PM = päästetyt maalit, P = pisteet, Sija =
            sijoitus runkosarjassa.
          </td>
        </tr>
      </tfoot>
    </Table>
  );
};

export async function getStaticProps() {
  const { API_URL } = process.env;
  const seasons = await (await fetch(`${API_URL}/seasons`)).json();

  return { props: { seasons } };
}

export default Seasons;
