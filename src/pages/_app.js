import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/globals.css";
import format from "date-fns/format";

export const formatDate = date => {
  try {
    const time = Date.parse(date);
    return format(time, "dd.MM.yyyy");
  } catch (err) {
    return date;
  }
};

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
