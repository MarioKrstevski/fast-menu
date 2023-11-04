import Filter from "./Filter";
import CardList2 from "./CardList2";

export default function NormalMenu({
  itemsList,
  menu,
  allSubMenus,
  updateSelectedFilter,
  selectedFilter,
}) {
  return (
    <div>
      {menu.length > 0 && (
        <div className="menu-wrapper">
          <Filter
            filters={allSubMenus}
            selectedFilter={selectedFilter}
            updateSelectedFilter={updateSelectedFilter}
          />
        </div>
      )}

      <CardList2 items={itemsList} />
    </div>
  );
}
