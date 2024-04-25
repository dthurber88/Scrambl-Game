import "./App.css";
import Scrambl from "./components/Scrambl";

if (!localStorage.getItem("sevenSeconds")) {
  localStorage.setItem("sevenSeconds", 0);
}
if (!localStorage.getItem("sixSeconds")) {
  localStorage.setItem("sixSeconds", 0);
}
if (!localStorage.getItem("sixSeconds")) {
  localStorage.setItem("sixSeconds", 0);
}
if (!localStorage.getItem("fiveSeconds")) {
  localStorage.setItem("fiveSeconds", 0);
}
if (!localStorage.getItem("fourSeconds")) {
  localStorage.setItem("fourSeconds", 0);
}
if (!localStorage.getItem("threeSeconds")) {
  localStorage.setItem("threeSeconds", 0);
}
if (!localStorage.getItem("twoSeconds")) {
  localStorage.setItem("twoSeconds", 0);
}
if (!localStorage.getItem("oneSeconds")) {
  localStorage.setItem("oneSeconds", 0);
}
if (!localStorage.getItem("zeroSeconds")) {
  localStorage.setItem("zeroSeconds", 0);
}

function App() {
  return <Scrambl />;
}

export default App;
