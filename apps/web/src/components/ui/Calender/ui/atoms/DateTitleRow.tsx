const dateStr = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

export default function DateTitleRow() {
  return <>
    {dateStr.map((v, i) => <div key={`date-week-${i}`} className="flex-1 flex justify-center items-center min-w-10 h-10">{v}</div>)}
  </>
}