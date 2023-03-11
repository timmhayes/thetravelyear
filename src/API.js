import countries from './data/countries.json';
import monthList from './data/months.json';
import {timeBetweenDates, titleCase} from "./utils/index";
let ttydataCache = null;

const ttydata = async () => {
  if (ttydataCache) return ttydataCache;
  const json = await import("./data/tty-data.json")
  ttydataCache = {
    locations: json.locations,
    stories: flattenStoryData(json)  
  }
  return ttydataCache;
}

const flattenStoryData = (ttydata) => {

  return ttydata.stories.map(story => {
    story.text = story.text.replace(/\n/g, '<br />');
    const location = ttydata.locations.find(location => location.locationPK === story.loc_ID);
    let {day, month} = timeBetweenDates(new Date(2000, 5, 6), story.date);
    day = day >= 0 ? `Day ${day}` : `T${day} Days`;
    story = {...story, ...location, day, month: month + 1};
    return story;
  });
}

export async function getStories(query) {
  return ttydata.stories;
}

const countryList = countries.reduce((acc, region) => {
  return acc.concat(region.countries);
}, [])

const getNavData = async (type, list, currentIndex, parentNavigation) => {
  let getID;
  let getTitle = (index) => list[index]
  if (type === 'months') {
    getID = (index) => index;
  } else if (type === 'countries') {
    getID = (index) => list[index];
  } else if (type === 'story') {
    getTitle = (index) => list[index].day;
    getID = (index) => list[index].id;
  }
  const getItem = (index) => {
    let rootPath = ''
    if (parentNavigation) {
      if (parentNavigation === 'months') {
        rootPath = `/months/${list[index].month}`;
      } else if (parentNavigation === 'countries') {
        rootPath = `/countries/${list[index].country}`;
      }
    }
    return {
      text: getTitle(index),
      link: `${rootPath}/${type}/${getID(index)}`
    }
  }
  return {
    current: getItem(currentIndex),
    prev: currentIndex > 0 ? getItem(currentIndex - 1) : null,
    prevgroup: currentIndex > 3 ? getItem(currentIndex - 3) : null,
    next: currentIndex < list.length - 1 ? getItem(currentIndex + 1) : null,
    nextgroup: currentIndex < list.length - 3 ? getItem(currentIndex + 3) : null,
    last: currentIndex !== list.length ? getItem(list.length - 1) : null,
    first: currentIndex !== 0 ? getItem(0) : null,
  }
}

export async function getAllStories() {
  const stories = (await ttydata()).stories;
  return {stories}
}

export async function getStoriesByCountry(country) {
  const data = {next: null, prev: null, stories: []};
  if (!country) return data;
  country = country !== 'USA' ? titleCase(country) : country;
  const countryIndex = countryList.findIndex(c => c === country);
  data.stories = (await ttydata()).stories.filter(story => story.country === country);
  data.nav = await getNavData('countries', countryList, countryIndex);
  return data;
}

export async function getStoriesByMonth(month) {
  if (!month) return;
  month = parseInt(month);
  const data = {
    stories: (await ttydata()).stories.filter(story => story.month === month),
    nav: await getNavData('months', monthList, month)
  }
  return data;
}

export function getMappingCoordinates(stories) {
  // get unique stories filtering on story.locationPK
  const uniqueCoordinates = stories.filter((story, index, self) =>
    index === self.findIndex((t) => (
      t.locationPK === story.locationPK
    ))
  );
  return uniqueCoordinates;
}

export async function getStory(id, parentNavigation = 'months') {
  id = parseInt(id);
  const stories = (await ttydata()).stories
  const story = stories.find(story => story.id === id);
  const storyIndex = stories.findIndex(story => story.id === id);
  let nav = await getNavData('story', stories, storyIndex, parentNavigation);
  return story ? {story, nav} : null;
}
