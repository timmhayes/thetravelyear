import PhotoLink from '../components/PhotoLink';
import "./PhotoLink.scss";

const css = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '1rem',
}

export default function PhotoLinkGroup({links}) {
  return (
    <div className="photo-link-group" style={css}>
      {links.map((link) => (
        <PhotoLink src={link.src} title={link.title} href={link.href} key={link.href}/>
      ))}
    </div>
  );
}