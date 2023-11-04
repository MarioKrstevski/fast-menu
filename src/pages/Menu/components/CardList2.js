import Card from "./Card";

export default function CardList2({ items }) {
  return (
    <div>
      <div className="flex flex-wrap">
        {items.map((item) => (
          <Card item={item} key={item.ID} />
        ))}
      </div>
    </div>
  );
}
