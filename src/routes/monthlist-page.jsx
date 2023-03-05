import LinkContainer from 'react-router-bootstrap/LinkContainer'
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Container from 'react-bootstrap/Container';
import PhotoLinkGroup from '../components/PhotoLinkGroup';
import months from '../data/months.json';

export default function MonthListPage() {

  return (
    <Container className="pt-4">
      <h1>Months</h1>
      <Breadcrumb>
        <LinkContainer to="/"><Breadcrumb.Item>Home</Breadcrumb.Item></LinkContainer>
        <Breadcrumb.Item active>Months</Breadcrumb.Item>
      </Breadcrumb>
      <PhotoLinkGroup links={months.map((month, index) => ({
        src: `/thumbnails/month_${index}.webp`,
        title: month,
        href: `/months/${index}`}
      ))}/>
    </Container>
  );
}
