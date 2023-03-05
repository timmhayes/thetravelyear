// merge legacy data from db

import {readFile, writeFile} from 'fs/promises'
import {watchFile} from 'fs'

const processDataFile = async () => {
  console.log('Detected change in data files')
  const data = JSON.parse(await readFile('./tty-data-master.json'))
  const photos = JSON.parse(await readFile('./photos.json'))

  data.stories.map(story => {
    story.photos = []
  })
  data.stories = data.stories.sort((a, b) => {
    return new Date(a.date) - new Date(b.date);
  })

  const extractPhotoData = (photo) => {
    const {photoID, title, description, date, objectPosition, highlight} = photo
    return {
      photoID,
      ...(title && {title}),
      ...(description && {desc: description}),
      ...(date && {date}),
      ...(objectPosition && {objectPosition}),
      ...(highlight && {highlight})
    }
  }

  photos.forEach(photo => {

    const matchingDate = data.stories.find(story => story.date == photo.date)
    // if photo should be part of a specific story, add it to the story's photos array
    if (photo.story) {
      const story = data.stories.find(story => story.id == photo.story)
      if (story) story.photos.push(extractPhotoData(photo))
      else console.log(`Story not found in photo ${photo.photoID} for story ${photo.story}`)
    }
    else if (matchingDate) {
      matchingDate.photos.push(extractPhotoData(photo))
    }
    // if photo should be part of a specific location, add it to the first matching story in that location
    else if (photo.locationFK) {
      const story = data.stories.find(story => story.loc_ID == photo.locationFK)
      if (story) story.photos.push(extractPhotoData(photo))
      else console.log(`Story not found in photo ${photo.photoID} for location ${photo.locationFK}`)
    }
  })

  data.stories.forEach(story => {
    const highlightPhoto = story.photos.find(photo => photo.highlight)
    // if story has a highlight photo, move it to the front of the array
    if (highlightPhoto) {
      const index = story.photos.indexOf(highlightPhoto)
      story.photos.splice(index, 1)
      story.photos.unshift(highlightPhoto)
    }
    
  })

  await writeFile('../src/data/tty-data.json', JSON.stringify(data, null, 2))
  console.log('Processed data files')
}

watchFile('./tty-data-master.json', processDataFile);
watchFile('./photos.json', processDataFile);
processDataFile()
console.log('Watching data files')