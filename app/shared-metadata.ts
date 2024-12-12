import { cache } from 'react'
import { fetcher } from '@/lib/utils'
import { antelopeEndpoint } from '@/lib/constants/config'

export const openGraphImage = {
  images: ['/thumbnail.png']
}

export const getMetadata = cache(async (brand: string) => {
  try {
    const res = await fetcher(
      `${antelopeEndpoint}/chatbots/intro?origin=leadgen&shortcode=${brand}`
    )

    // const preloadRes = await fetcher(
    //   `${antelopeEndpoint}/chatbots/preloads?origin=leadgen&shortcode=${brand}`
    // )

    // const { urls } = preloadRes || {}

    // if (urls && Array.isArray(urls)) {
    //   Promise.allSettled(urls.map(url => fetcher(url)))
    //     .then(backgroundResults => {
    //       console.log(
    //         'Background fetch results:',
    //         JSON.stringify(backgroundResults)
    //       )
    //       // Optionally handle or log the results
    //     })
    //     .catch(err => console.log('Background fetch error:', err))
    //     .finally(() => console.log('Background fetch complete'))
    // }

    return res.data
  } catch (err) {
    console.log('error------>', err)
    return null
  }
})
