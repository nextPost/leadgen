import Image from 'next/image'
import { useWindowSize } from 'usehooks-ts'
import { ArrowTopRightIcon, InfoCircledIcon } from '@radix-ui/react-icons'
import { PrimaryTooltip } from '@/components/ui/tooltip'
import { useEffect, useState } from 'react'
import { IBasicElement } from '@/components/content-template'
import { Carousel } from '@/components/ui/carousel'
import { Button } from '@/components/ui/button'

export type Urgency = 'critical' | 'suggested' | 'consider'
export interface IExplainer extends IBasicElement {
  display: 'element'
  type: 'explainer'
  urgency: Urgency
  texts: string[]
  detail: {
    texts: string[]
  }
  link: {
    caption: string
    target: string
  }
  className?: string
  isInView?: boolean
}

export function Explainer({
  icon,
  title,
  urgency,
  texts,
  detail,
  link,
  tooltip,
  className,
  isInView = true
}: IExplainer) {
  const { width: windowWidth } = useWindowSize()

  return (
    <div
      className={`p-3 md:p-5 flex flex-col justify-between bg-[#293D45] rounded-lg w-[230px] md:w-[412px] h-full ${className}`}
    >
      <div className="flex flex-col gap-2 md:gap-3">
        <div className="flex gap-3 h-[48px] md:h-[64px]">
          <div className="flex items-center">
            <div className="w-8 h-7 md:!h-10 md:!w-10 p-1 md:p-2 bg-[#35474F] rounded-sm flex items-center justify-center">
              <img
                src={`/image-icons/${urgency}.png`}
                style={{
                  height: windowWidth < 768 ? '16px' : '24px',
                  width: windowWidth < 768 ? '16px' : '24px'
                }}
                alt="urgency"
              />
            </div>
          </div>
          <div className='flex items-center'>
            <h3 className="text-sm md:text-2xl font-semibold">{title}</h3>
          </div>
        </div>

        <div
          className="text-xs md:text-base h-[80px] md:h-[96px]"
          dangerouslySetInnerHTML={{ __html: texts[0] }}
        ></div>
        <div>
          <div
            className="text-xs md:text-base h-[24px] md:h-[40px]"
            dangerouslySetInnerHTML={{ __html: texts[1] }}
          ></div>
          <div className="text-xs md:text-base my-2 p-2 md:p-4 rounded-md bg-[#3D5057] text-center h-[80px] md:h-[112px] flex items-center">
            {detail.texts[0]}
          </div>
        </div>

        <Button
          variant={isInView ? 'default' : 'ghost'}
          size={'lg'}
          className="border-white border-solid border-[1px] border-opacity-20 h-8 md:h-[60px] text-base md:text-lg"
          style={{
            backgroundColor: !isInView
              ? ''
              : urgency === 'critical'
                ? '#ea3f3f'
                : urgency === 'suggested'
                  ? '#ffa34e'
                  : '#24ae8d'
          }}
          onClick={() => window.open(link.target)}
        >
          <div className="mr-1">{link.caption}</div>
          <ArrowTopRightIcon fontSize={windowWidth < 768 ? '12px' : '18px'} />
        </Button>
      </div>
    </div>
  )
}
