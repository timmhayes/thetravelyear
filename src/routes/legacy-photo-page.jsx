import {useLoaderData, Link} from "react-router-dom";
import Container from 'react-bootstrap/Container';
import ErrorMessage from '../components/ErrorMessage';
import PhotoGallery from "../components/PhotoGallery";
import {getPhoto} from "../API";

export async function loader({ params }) {
  return await getPhoto(params.id);
}

// this is a stub page to catch legacy URLs from old site and redirect to new content
export default function LegacyPhotoPage() {
  const storyWithPhoto = useLoaderData();

  if (!storyWithPhoto) {
    return <ErrorMessage props={{
      message: 'Sorry, that photo does not exist.',
      link: {text:'List of Countries', href:'/countries'}}
    }/>
  }
  else {
    return (
      <Container className="pt-4">
        <h1>Photos</h1> 
        <PhotoGallery photos={storyWithPhoto.photos} title={`${storyWithPhoto.city}, ${storyWithPhoto.country}`} />
        <div>
          Read the related story from <Link to={`/months/${storyWithPhoto.month}/story/${storyWithPhoto.id}`}>{storyWithPhoto.day}</Link> or
          other stories about <Link to={`/countries/${storyWithPhoto.country}`}>{storyWithPhoto.country}</Link>.
        </div>
      </Container>
    );
  }
}
