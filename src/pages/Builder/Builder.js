import axios from "axios";
import BuilderStepper from "./components/BuildStepper/BuilderStepper";
import WebsitePreview from "./components/WebsitePreview";

export default function Builder(props) {
  return (
    <div className="flex h-screen overflow-hidden">
      <BuilderStepper />
      <WebsitePreview />
    </div>
  );
}
