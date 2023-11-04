import SimpleMenuFilter from "./SimpleMenuFilter";
import SimpleMenuItemList from "./SimpleMenuItemList";

export default function SimpleMenu({
  itemsList,
  allSubMenus,
  updateSelectedFilter,
  selectedFilter,
}) {
  if (selectedFilter === "All") {
    updateSelectedFilter(allSubMenus[0]);
  }
  return (
    <div>
      SimpleMenu works
      <SimpleMenuFilter
        filters={allSubMenus}
        selectedFilter={selectedFilter}
        updateSelectedFilter={updateSelectedFilter}
      />
      <SimpleMenuItemList items={itemsList} />
    </div>
  );
}
