import Figure from 'react-bootstrap/Figure';

export default function PhotoGallery({photos}) {
  return (
    <div className="photo-gallery">
      {photos.length > 0 && <h2>Photos From This Location</h2>}
      {photos.map((photo) => (
        <div key={photo.photoID}>
          <Figure>
            <Figure.Image
              fluid={true}
              rounded={true}
              className="photo-gallery-img"
              alt={photo.desc||""}
              src={`/photos-big/${photo.photoID}.webp`}
            />
            <Figure.Caption className="text-center">
              {photo.desc}
            </Figure.Caption>
          </Figure>
        </div>
      ))}
    </div>
  );
}