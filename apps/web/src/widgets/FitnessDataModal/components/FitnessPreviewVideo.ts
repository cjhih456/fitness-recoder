import { firebaseConfig } from '@shared/lib/firebase/firebase'

interface YoutubeItemObject {
  kind: string
  etag: string
  id: {
    kind: string
    videoId: string
  }
}
interface YoutubeResponse {
  kind: string
  etag: string
  items: YoutubeItemObject[]
}

export default async function FitnessPreviewVideo(exerciseName: string) {
  // TODO: Add youtube api key
  const params = {
    part: 'id',
    q: exerciseName,
    order: 'relevance',
    safeSearch: 'strict',
    videoEmbeddable: 'true',
    type: 'video',
    key: firebaseConfig.apiKey
  }
  const query = new URLSearchParams(params).toString()
  return import.meta.env.DEV ?
    Promise.resolve('wm47Swzn_98') :
    await fetch(`https://www.googleapis.com/youtube/v3/search?${query}`).then(async (result) => {
      const body = JSON.parse(await result.text()) as YoutubeResponse
      if (Array.isArray(body.items) && body.items[0]) {
        return body.items[0].id.videoId
      }
      return undefined
    })
}