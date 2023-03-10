import {useLoaderData } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import BreadcrumbGroup from '../components/BreadcrumbGroup';
import StoryCard from "../components/StoryCard";
import StoryPagination from "../components/StoryPagination";
import MapView from "../components/MapView";
import { getStoriesByCountry, getStoriesByMonth } from "../API";
import {titleCase} from '../utils';

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
  let crumbs;
  if (data.country) {
    crumbs = [{text: 'Countries', href: '/countries'}, {text: titleCase(data.country)}]
  } else if (data.month) {
    crumbs = [{text: 'Months', href: '/months'}, {text: data.month}]
  }

  return (
    <Container id="stories" className="pt-4">
      <h1>Stories From {data.nav.current.text}</h1>
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
