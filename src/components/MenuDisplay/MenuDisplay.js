import MenuDescription from "./MenuDescription";
import MenuHeader from "./MenuHeader";
import MenuHero from "./MenuHero";
import MenuItems from "./MenuItems";

export default function MenuDisplay(props) {
  return (
    <div className="w-full bg-slate-200 h-full overflow-auto">
      <MenuHeader />
      <MenuHero />
      <MenuDescription />
      <MenuItems />
    </div>
  );
}
