import { Link } from "react-router-dom";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import MapView from "./MapView";
import PhotoGallery from "./PhotoGallery";
import { getMappingCoordinates } from "../API";
import "./Story.scss";

export default function Story({story}) {
  const author = story.auth === 't' ? 'Tim' : (story.auth === 'm' ? 'Michelle' : 'Michelle & Tim');
  return (
    <div className="story">
      <Row className="story-block">
        <Col xs={12} sm={5} md={4} className="story-map">
          <MapView locations={getMappingCoordinates([story])}/>
        </Col>
        <Col xs={12} sm={7} md={8} className="story-content">
          <h2>Post from {author}:</h2>
          <div className="story-text mb-4" dangerouslySetInnerHTML={{__html: story.text}} />
          <PhotoGallery photos={story.photos}/>
          <h2 className="mt-4">Related</h2>
          <ul>
            <li>Other stories from <Link to={`/countries/${story.country}`}>{story.country}</Link></li>
            <li>Other stories from <Link to={`/months/${story.month}`}>Month {story.month}</Link></li>
          </ul>
        </Col>
      </Row>
    </div>
  );
}