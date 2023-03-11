import {useLoaderData} from "react-router-dom";
import Container from 'react-bootstrap/Container';
import BreadcrumbGroup from '../components/BreadcrumbGroup';
import ErrorMessage from '../components/ErrorMessage';
import Story from "../components/Story";
import StoryPagination from "../components/StoryPagination";
import {getStory} from "../API";

export async function loader({ params }) {
  return {
    ...params,
    storyData: await getStory(params.storyId, params.country ? 'countries' : 'months')
  }
}

export default function StoryPage() {
  const {country, month, storyData} =  useLoaderData();

  if (!storyData) {
    return <ErrorMessage props={{
      message: 'Sorry, that story does not exist.',
      link: {text:'List by Date', href:'/months'}}
    }/>
  }
  else {
    let crumbs, rootpath;
    if (country) {
      rootpath = `/countries/${country}`;
      crumbs = [{text: 'Countries', href: '/countries'}, {text: country, href: rootpath}, {text:storyData.story.city}]
    } else if (month) {
      rootpath = `/months/${month}`;
      crumbs = [{text: 'Months', href: '/months'},  {text: month, href: rootpath}, {text:`${storyData.story.city}, ${storyData.story.country}`}]
    }
    return (
      <Container className="pt-4">
        <h1>{storyData.story.day}: {storyData.story.location}</h1>
        <BreadcrumbGroup crumbs={crumbs}/>
        <Story story={storyData.story} />
        <StoryPagination nav={storyData.nav} rootpath={rootpath} />
      </Container>
    );
  }
}
