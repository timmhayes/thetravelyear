import { useRouteError, Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function ErrorPage() {
  const error = useRouteError();

  const styles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%'
  }

  return (
    <>
      <Header />
      <Container id="error-page" style={styles}>
        <div>

        <h1>Oh My!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>{error.statusText || error.message}</i>
        </p>
        <p>Please return to the <Link to="/">Home Page</Link>.</p>
        </div>
      </Container>
      <Footer />
    </>
  );
}