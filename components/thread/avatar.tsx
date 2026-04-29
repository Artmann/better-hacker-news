export function Avatar({
  name,
  size = 'md'
}: {
  name: string
  size?: 'md' | 'sm'
}) {
  const letter = name?.[0]?.toUpperCase() ?? '?'
  const sizeClasses =
    size === 'sm'
      ? 'w-7 h-7 text-[12px]'
      : 'w-9 h-9 sm:w-10 sm:h-10 text-[14px] sm:text-[15px]'
  return (
    <div
      className={`${sizeClasses} rounded-full bg-bg-sunk border border-rule-2 inline-flex items-center justify-center font-sans font-semibold text-ink-2 flex-shrink-0`}
    >
      {letter}
    </div>
  )
}
