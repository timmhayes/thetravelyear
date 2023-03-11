import { useRouteError } from "react-router-dom";
import Header from "../components/Header";
import ErrorMessage from "../components/ErrorMessage";
import Footer from "../components/Footer";

export default function ErrorPage() {
  const error = useRouteError();
  return (
    <>
      <Header />
      <ErrorMessage props={{
        message: 'Sorry, an unexpected error has occurred.',
        additionalInfo: error.statusText || error.message,
        link: {text: 'Home Page', href: '/'}
      }}/>
      <Footer />
    </>
  );
}