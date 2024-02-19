
export type StarRatingFilterProps = {
  selectedStars: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const StarRatingFilter = (
  { selectedStars, onChange }: StarRatingFilterProps
) => {

  return (
    <>
      <h4 className="mb-2 font-semibold text-md">Property Rating</h4>
      <div className="grid grid-cols-3 gap-1 pb-5 border-b border-blue-300 sm:grid-cols-5 lg:grid-cols-1">
        {["5", "4", "3", "2", "1"].map((star) => (
          <label className="flex flex-row items-center space-x-1" key={star}>
            <input
              type="checkbox"
              className="rounded"
              value={star}
              checked={selectedStars.includes(star)}
              onChange={onChange}
            />
            <span>{star} Stars</span>
          </label>
        ))}
      </div>
    </>
  )
}

export default StarRatingFilter;