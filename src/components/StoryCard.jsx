import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import LinkContainer from 'react-router-bootstrap/LinkContainer'
import {stripHTMLtags} from "../utils/index";
import "./StoryCard.scss";

export default function StoryCard({storyData}) {
  const hlPhoto = storyData.photos.length > 0 ? storyData.photos[0] : null;
  const cardImg = hlPhoto
    ? <Card.Img className="story-card-img" variant="top" alt=""
        style={hlPhoto.objectPosition ? {objectPosition: hlPhoto.objectPosition} : {}}
        src={`/photos-big/${hlPhoto.photoID}.webp`}/>
    : <Card.Img className="story-card-img" variant="top" alt={`Map of ${storyData.city}, ${storyData.country}`} src={`/maps/map_${storyData.locationPK}.png`}/>;
  return (
    <Card className="story-card">
      {cardImg}
      <Card.Body>
        <Card.Title>
          <h2 className="h4">{storyData.day}: {storyData.location}</h2>
        </Card.Title> 
        <Card.Subtitle className="mb-2 text-muted">
          {storyData.city}, <Link to={`/countries/${storyData.country}`}>{storyData.country}</Link>
        </Card.Subtitle>
        <Card.Text className="story-card-text">
          {stripHTMLtags(storyData.text.substring(0, 200))}
        </Card.Text>
        <LinkContainer to={`story/${storyData.id}`}>
          <Button variant="secondary">Read more</Button>
        </LinkContainer>
      </Card.Body>
    </Card>
  );
}