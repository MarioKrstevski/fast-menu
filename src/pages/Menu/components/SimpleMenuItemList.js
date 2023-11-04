export default function SimpleMenuItemList({ items }) {
  return (
    <div className="shadow-sm bg-white flex w-[651px] flex-col pl-12 pr-12 max-md:px-5">
      <div className="flex flex-col self-start border w-full">
        {items.map((item) => (
          <div
            key={item.ID}
            className="text-zinc-800 text-base leading-6 whitespace-nowrap flex justify-between my-1 px-8 py-4"
          >
            <div className="flex flex-col">
              <span>{item.Name}</span>
              <span className="text-sm text-blue-600">
                {item.Description}
              </span>
            </div>
            <span> {item.Price + item.Currency}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
