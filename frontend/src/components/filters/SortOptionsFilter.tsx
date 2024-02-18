
export type SortOptionsFilterProps = {
  sortOption?: string;
  onChange: (event?: React.ChangeEvent<HTMLSelectElement>) => void;
}


const SortOptionsFilter = (
  { sortOption, onChange }: SortOptionsFilterProps
) => {

  const priceRange = [
    { id: 1, value: "starRating", label: "Star Rating" },
    { id: 2, value: "pricePerNightAsc", label: "Price Per Night (low to high)" },
    { id: 3, value: "pricePerNightDesc", label: "Price Per Night (high to low)" }
  ];
  return (
    <div>

      <select value={sortOption}
        className="w-full p-2 border rounded-md outline-none"
        onChange={onChange}
      >

        <option value="" className="p-2">Sort By</option>
        {
          priceRange.map(
            ({ id, value, label }) => (
              <option value={value} key={id} className="p-2">
                {label}
              </option>
            )
          )
        }

      </select>
    </div>
  )
}

export default SortOptionsFilter