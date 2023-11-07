import { Link } from "react-router-dom";

export default function Landing(props) {
  return (
    <div>
      Landing works
      <nav>
        <Link to={"login"}> Login </Link>
        <Link to={"signup"}> SignUp </Link>
      </nav>
    </div>
  );
}
