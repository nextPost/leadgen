import { clsx, type ClassValue } from 'clsx'
import { customAlphabet } from 'nanoid'
import { twMerge } from 'tailwind-merge'
import { antelopeEndpoint } from '@/lib/constants/config'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const nanoid = customAlphabet(
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
  7
) // 7-character random string

export async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  const res = await fetch(input, { credentials: 'include', ...init })

  if (!res.ok) {
    const json = await res.json()
    if (json.error) {
      const error = new Error(json.error) as Error & {
        status: number
      }
      error.status = res.status
      throw error
    } else {
      throw new Error('An unexpected error occurred')
    }
  }

  return res.json()
}

export function formatDate(input: string | number | Date): string {
  const date = new Date(input)
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })
}

export const formatNumber = (value: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(value)

export const runAsyncFnWithoutBlocking = (
  fn: (...args: any) => Promise<any>
) => {
  fn()
}

export const sleep = (ms: number) =>
  new Promise(resolve => setTimeout(resolve, ms))

export const getStringFromBuffer = (buffer: ArrayBuffer) =>
  Array.from(new Uint8Array(buffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')

export enum ResultCode {
  InvalidCredentials = 'INVALID_CREDENTIALS',
  InvalidSubmission = 'INVALID_SUBMISSION',
  UserAlreadyExists = 'USER_ALREADY_EXISTS',
  UnknownError = 'UNKNOWN_ERROR',
  UserCreated = 'USER_CREATED',
  UserLoggedIn = 'USER_LOGGED_IN'
}

export const getMessageFromCode = (resultCode: string) => {
  switch (resultCode) {
    case ResultCode.InvalidCredentials:
      return 'Invalid credentials!'
    case ResultCode.InvalidSubmission:
      return 'Invalid submission, please try again!'
    case ResultCode.UserAlreadyExists:
      return 'User already exists, please log in!'
    case ResultCode.UserCreated:
      return 'User created, welcome!'
    case ResultCode.UnknownError:
      return 'Something went wrong, please try again!'
    case ResultCode.UserLoggedIn:
      return 'Logged in!'
  }
}

export const getMetaDataOnClient = async (brand: string | string[]) => {
  try {
    const response = await fetcher(
      `${antelopeEndpoint}/chatbots/intro?origin=leadgen&shortcode=${brand}`
    )

    const preloadRes = await fetcher(
      `${antelopeEndpoint}/chatbots/preloads?origin=leadgen&shortcode=${brand}`
    )

    const { urls } = preloadRes || {}

    if (urls && Array.isArray(urls)) {
      Promise.allSettled(urls.map(url => fetcher(url)))
        .then(backgroundResults => {
          console.log(
            'Background fetch results:',
            JSON.stringify(backgroundResults)
          )
          // Optionally handle or log the results
        })
        .catch(err => console.log('Background fetch error:', err))
        .finally(() => console.log('Background fetch complete'))
    }

    const { data } = response
    console.log('getMetaDataOnClient', { response })
    return {
      title: data.header,
      desc: data.texts,
      footer: data.footer,
      continuationText: data.continuationText,
      children: data.children,
      logo: data.children[0].url.image.replace("\\'", "'")
    }
  } catch (err) {
    return null
  }
}

//  excute async api call and recall on error 3 times
export const safeCall = async (
  fn: (...args: any) => Promise<any>,
  retryCount = 3
) => {
  let count = 0
  while (count < retryCount) {
    try {
      return await fn()
    } catch (err) {
      count++
    }
  }
  return null
}
