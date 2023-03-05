import {Link} from "react-router-dom";
import Container from "react-bootstrap/Container";

export default function LandingPage() {
  const background = {
    background: 'url(./photos-big/tur506_turkish_moon.webp) no-repeat center center #000689',
    backgroundSize: 'cover',
    backgroundAttachment: 'fixed',
    marginBottom: '-1.5rem'
  }
  const box = {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    color: "#ffffff",
    padding: "1rem",
    borderRadius: "1rem",
  }
  return (
    <div style={background} className="cover-container d-flex w-100 h-100 p-4 mx-auto flex-column justify-content-center">
      <Container style={{ "maxWidth": "1000px"}}>
        <div style={box}>
        <h1>Welcome to The Travel Year!</h1>
        <p>This site archives the stories and photos created by Michelle and Tim during a 16-month around-the-world trip taken many years ago before they had kids and settled down. You can read through it sequentially by viewing the trip <Link to="months" className="link-inverse">Month by Month</Link>, go straight to a list of <Link to="countries" className="link-inverse">Countries we Visited</Link></p>
        <p>Thanks for visiting,</p>
        <p>-- Tim and Michelle</p>
        </div>
      </Container>
    </div>
  );
}
