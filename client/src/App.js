import { BrowserRouter, Routes, Route, } from "react-router-dom";
import Instructions from "./components/instructions/Instructions";
import About from "./components/About/About";
import HeatMap from "./components/HeatMap";
import Main from "./components/generatereport/Main";
import mixpanel from "mixpanel-browser";
import { recordVisit } from "./components/generatereport/helpers/helperFunctions";
import { DrawingProvider } from "./components/generatereport/contexts/Mapcontext";
const key = process.env.REACT_APP_MIXPANEL_KEY
mixpanel.init(key)
function App() {
  recordVisit()
  return (
    <>
      <BrowserRouter>
        <DrawingProvider>
          <Routes>
            <Route path="/" element={<Main />}></Route>
            <Route path="/instructions" element={<Instructions />}></Route>
            <Route path="/about" element={<About />}></Route>
            <Route path="/heatmap" element={<HeatMap />}></Route>
          </Routes>
        </DrawingProvider>
      </BrowserRouter>
    </>

  );
}

export default App;
