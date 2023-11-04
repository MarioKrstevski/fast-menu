export default function SimpleMenuFilter({
  filters,
  selectedFilter,
  updateSelectedFilter,
}) {
  return (
    <div className="bg-white flex w-[651px] flex">
      {filters.map((filterName) => {
        const selected = selectedFilter === filterName;
        return (
          <div
            key={filterName}
            onClick={() => updateSelectedFilter(filterName)}
            className={`text-neutral-800 text-center text-sm leading-6 self-stretch whitespace-nowrap bg-white w-[163px] max-w-full px-16 py-5 rounded-lg max-md:px-5  ${
              selected ? "bg-blue-500 text-white" : ""
            }`}
          >
            {filterName}
          </div>
        );
      })}
    </div>
  );
}
