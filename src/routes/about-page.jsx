import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Img from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";

export default function AboutPage() {
  const style = {
    background: 'url(./photos-big/tur506_turkish_moon.webp) no-repeat center center',
    backgroundSize: 'cover',
    backgroundAttachment: 'fixed',
  }
  return (
    <div style={style} className="cover-container d-flex w-100 h-100 p-4 mx-auto flex-column justify-content-center">
      <Container style={{ "maxWidth": "700px" }}>
        <Card className="p-3">
          <Card.Body>
            <Row>
              <Col xs={12} sm={8}>
                <Card.Title>Tim</Card.Title>
                  Tim became inspired to take a year off after visiting Thailand, where he met backpackers from around the globe who told fantastic stories about their gap year adventures. The idea lingered in his head long after he returned home and realized he just couldn’t get by on a couple weeks of vacation a year. So when the small tech company he worked for went bankrupt, he decided to pack his bags and explore.
                <Card.Text>
              </Card.Text>
              </Col>
              <Col xs={12} sm={4}>
                <Img fluid src="/photos/tim.jpg" />
              </Col>
            </Row>
          </Card.Body>
        </Card>
        <Card className="p-3 mt-5">
          <Card.Body>
            <Row>
              <Col xs={12} sm={4}>
                <Img fluid src="/photos/michelle.jpg" />
              </Col>
              <Col xs={12} sm={8}>
                <Card.Title>Michelle</Card.Title>
                <Card.Body>
                  Driven by a thirst for adventure and a deep-seated desire to explore the world, Michelle took a leap of faith and set off on a transformative journey that would last for over a year. She stored away her belongings, sold her car, and packed her bags with a mix of nervousness and excitement. Read about her adventures with Tim and they explored ancient temples, lounged on tropical beaches, hiked through lush rainforests, climbed to Everest Base Camp, learned Thai massage, and ate amazing food everywhere they went.
                </Card.Body>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}
