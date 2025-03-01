import Image from 'next/image'
import { SocialScoreBar } from './social-score-bar'
import { PrimaryTooltip } from '@/components/ui/tooltip'
import { InfoCircledIcon } from '@radix-ui/react-icons'
import { useWindowSize } from 'usehooks-ts'

interface SocialRatingCardProps {
  icon: string
  title: string
  description: string
  totalRating: number // 0 - 100
  totalRatingInset: string
  industryAverageTotalRating: number
  averageScore: number
  averageScoreInset: string
  industryAverageScore: number
  className?: string
  tooltip: string
  isInView?: boolean
}

export function SocialRatingCard({
  icon,
  title,
  description,
  totalRating,
  totalRatingInset,
  industryAverageTotalRating,
  averageScore,
  averageScoreInset,
  industryAverageScore,
  className,
  tooltip,
  isInView = true
}: SocialRatingCardProps) {
  const { width: windowWidth } = useWindowSize()

  return (
    <div
      className={`p-3 md:p-5 flex flex-col gap-3 md:gap-6 bg-[#1E333B] rounded w-[236px] md:w-[454px] ${className}`}
    >
      <div className="flex justify-between">
        <div className="flex gap-3">
          <div className="size-6 md:size-12">
            <img
              src={icon}
              alt={`/image-icons/${icon}.png`}
              className="rounded-md size-6 md:size-12"
            />
          </div>
          <h2 className="text-sm md:text-lg font-semibold self-center">
            {title}
          </h2>
        </div>
        <PrimaryTooltip description={tooltip} />
      </div>
      <p className="text-sm md:text-base">{description}</p>
      <hr className="border-[#35474F]" />
      <div className="flex flex-col gap-5">
        <SocialScoreBar
          flag={totalRating > industryAverageTotalRating ? 'pros' : 'cons'}
          title="Total Ratings"
          value={totalRating}
          inset={totalRatingInset}
          average={industryAverageTotalRating}
          isInview={isInView}
        />
        <SocialScoreBar
          flag={averageScore > industryAverageScore ? 'pros' : 'cons'}
          title="Average Score"
          value={averageScore}
          inset={averageScoreInset}
          average={industryAverageScore}
          isInview={isInView}
        />
        <div className="flex gap-2 text-[#788589] text-sm md:text-base">
          <p>Industry Avg</p>
          <p>-----</p>
        </div>
      </div>
    </div>
  )
}
