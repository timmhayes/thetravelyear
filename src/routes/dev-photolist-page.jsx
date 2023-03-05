import {useLoaderData, Link} from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import {getAllStories} from "../API";

export async function loader() {
  const data = await getAllStories();
  return data;
}

export default function PhotoListPage() {
  const {stories} =  useLoaderData();
  return (
    <Container className="pt-4">
      {stories.map((story) => (
        <div key={story.id}>
          {story.city}, <Link to={`/countries/${story.country}`}>{story.country}</Link>
          <div className='d-flex flex-row flex-wrap'>
            {story.photos.map((photo) => (
              <Card style={{ width: '16rem' }} key={photo.photoID} thumbnail="true">
                <Card.Img variant="top" src={`/photos-big/${photo.photoID}.webp`} />
                <Card.Title>{photo.photoID} {story.loc_ID}</Card.Title>
              </Card>
            ))}
            </div>
        </div>
      ))}
    </Container>
  );
}
