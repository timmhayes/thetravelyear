import countries from '../data/countries.json';
import Container from 'react-bootstrap/Container';
import BreadcrumbGroup from '../components/BreadcrumbGroup';
import PhotoLinkGroup from '../components/PhotoLinkGroup';

export default function CountryListPage() {

  return (
  <Container className="pt-4">
    <h1>Countries</h1>
    <BreadcrumbGroup crumbs={[{text: 'Countries'}]}/>
    {countries.map((continent) => (
      <div key={continent.name}>
        <h2 className="mt-4">{continent.name}</h2>
        <PhotoLinkGroup links={continent.countries.map((country) => ({
          src: `/thumbnails/${country.toLowerCase().replace(' ', '_')}.webp`,
          title: country,
          href: `/countries/${country}`}
        ))}/>
      </div>
    ))}
    </Container>
  );
}
