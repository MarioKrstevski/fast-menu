import { useSelector } from "react-redux";

export default function MenuDescription(props) {
  const gs = useSelector((store) => store.globalSettings);
  if (!gs.menuDescription) {
    return;
  }
  return (
    <div class="markup-content text-center py-12">
      <div>
        <p>{gs.menuDescription}</p>
      </div>
    </div>
  );
}
