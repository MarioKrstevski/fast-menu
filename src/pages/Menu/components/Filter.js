import * as React from "react";
function Tab({ label, updateSelectedFilter, selected }) {
  return (
    <div
      onClick={() => updateSelectedFilter(label)}
      className={`text-neutral-500 cursor-pointer text-center text-sm leading-5 tracking-normal self-stretch whitespace-nowrap rounded border border shadow-sm bg-white w-[93px] max-w-full px-2.5 py-3 border-solid ${
        selected ? "bg-blue-500 text-white" : ""
      }`}
    >
      {label}
    </div>
  );
}
export default function Filter(props) {
  const { filters, selectedFilter, updateSelectedFilter } = props;

  return (
    <div className="flex items-start gap-4 px-5 max-md:flex-wrap max-md:justify-center">
      {filters.length > 1 && (
        <Tab
          label={"All"}
          selected={"All" === selectedFilter}
          updateSelectedFilter={updateSelectedFilter}
        />
      )}
      {filters.length > 1 &&
        filters.map((filterName) => (
          <Tab
            label={filterName}
            key={filterName}
            selected={filterName === selectedFilter}
            updateSelectedFilter={updateSelectedFilter}
          />
        ))}
    </div>
  );
}
