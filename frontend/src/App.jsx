import { Exp } from "./components/Exp";
import "./css/page.css";
import { Loader } from "@react-three/drei";

export default function Home() {
  return (
    <>
      <Loader />
      <Exp />
    </>
  );
}
