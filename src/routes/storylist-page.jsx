import {useLoaderData } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import BreadcrumbGroup from '../components/BreadcrumbGroup';
import StoryCard from "../components/StoryCard";
import StoryPagination from "../components/StoryPagination";
import MapView from "../components/MapView";
import { getStoriesByCountry, getStoriesByMonth } from "../API";

export async function loader({ params }) {
  let data = {...params, stories:[]}
  if (params.country) {
    data = {...data, ...await getStoriesByCountry(params.country)}
  } else if (params.month) {
    data = {...data, ...await getStoriesByMonth(params.month)}
  }
  return data;
}

export default function StoryListPage() {
  const data = useLoaderData();
  let title, crumbs;
  if (data.country) {
    title = `Stories From ${data.country}`;
    crumbs = [{text: 'Countries', href: '/countries'}, {text: data.country}]
  } else if (data.month) {
    title = `Stories From ${data.nav.current.text}`;
    crumbs = [{text: 'Months', href: '/months'}, {text: data.month}]
  }

  return (
    <Container id="stories" className="pt-4">
      <h1>{title}</h1>
      <BreadcrumbGroup crumbs={crumbs}/>
      <MapView locations={data.stories}/>
      <div>
        <Row xs={1} md={2} className="g-4">
          {data.stories.map((story) => (
            <Col key={story.id}>
              <StoryCard storyData={story}></StoryCard>
            </Col>
          ))}
        </Row>
        <StoryPagination nav={data.nav} />
      </div>
    </Container>
  );
}
