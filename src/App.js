import {BrowserRouter, HashRouter, Route, Routes} from "react-router-dom";
import './App.css';
import {Row} from "react-bootstrap";
import React, {createContext, useEffect, useMemo, useState} from "react";
import NavigationBar from "./NavigationBar";
import LoginView from "./presentation/login/LoginView";
import HomeView from "./presentation/home/HomeView";
import {UserConfig} from "./presentation/UserConfig";
import CustomersView from "./presentation/home/CustomersView";

export const UserContext = createContext()

function App() {

    const [userConfig, setUserConfig] = useState(new UserConfig());

    return (
        <UserContext.Provider value={[userConfig, setUserConfig]}>
            <HashRouter>
                <div className="app">
                    <Row>
                        <NavigationBar/>
                        <Routes>
                            <Route path="/" element={<LoginView/>}/>
                            <Route path="/home" element={<HomeView/>}/>
                            <Route path="/customers" element={<CustomersView/>}/>
                        </Routes>
                    </Row>
                </div>
            </HashRouter>
        </UserContext.Provider>
    )
}

export default App;
