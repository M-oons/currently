import { BrowserRouter, Route, Routes } from "react-router-dom";
import TitleBar from "./components/TitleBar/TitleBar";
import Edit from "./pages/Edit/Edit";
import Home from "./pages/Home/Home";
import ActivityProvider from "./providers/ActivityProvider";
import "./App.css";

const App = () => {
    return (
        <div id="app">
            <ActivityProvider>
                <TitleBar />
                <div id="main">
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/edit/:page" element={<Edit />} />
                        </Routes>
                    </BrowserRouter>
                </div>
            </ActivityProvider>
        </div>
    );
};

export default App;
