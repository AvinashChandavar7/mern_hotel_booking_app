export type PriceFilterProps = {
  selectedPrice?: number;
  onChange: (value?: number) => void;
}


const PriceFilter = (
  { selectedPrice, onChange }: PriceFilterProps
) => {

  const priceRange = [1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 100000];
  return (
    <div>
      <h4 className="mb-2 font-semibold text-md">Max Price</h4>

      <select value={selectedPrice}
        className="w-full p-2 border rounded-md outline-none"
        onChange={
          (event) => onChange(
            event.target.value
              ? parseInt(event.target.value)
              : undefined
          )
        }
      >

        <option value="" className="p-2">Select Max Price</option>
        {
          priceRange.map(
            (price) => (
              <option value={price} key={price} className="p-2">
                {price}
              </option>
            )
          )
        }

      </select>
    </div>
  )
}

export default PriceFilter