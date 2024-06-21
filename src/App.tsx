import { useCallback, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TitleBar from "./components/TitleBar/TitleBar";
import Home from "./pages/Home/Home";
import "./App.css";

const App = () => {
    const [active, setActive] = useState<boolean>(false);

    const startActivity = async () => {
        const isActive = await window.api.startActivity();
        setActive(isActive);
    };

    const stopActivity = async () => {
        const isActive = await window.api.stopActivity();
        setActive(isActive);
    };

    const toggleActivity = useCallback(async (value: boolean) => {
        if (value)
            await startActivity();
        else
            await stopActivity();
    }, []);

    return (
        <div id="app">
            <TitleBar
                active={active}
            />
            <div id="main">
                <BrowserRouter>
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <Home
                                    onActivityToggle={toggleActivity}
                                />
                            }
                        />
                    </Routes>
                </BrowserRouter>
            </div>
        </div>
    );
};

export default App;
