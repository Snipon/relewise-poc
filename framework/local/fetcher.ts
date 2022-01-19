import { Fetcher } from '@commerce/utils/types'

export const fetcher: Fetcher = async () => {
  const config = {
    apiEndpoint: process.env.NEXT_PUBLIC_API_URL,
    apiKey: process.env.NEXT_PUBLIC_RELEWISE_API_KEY
  }
  console.log(config)
  console.log('FETCHER')
  const res = await fetch('./data.json')
  if (res.ok) {
    const { data } = await res.json()
    return data
  }
  throw res
}
