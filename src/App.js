import { Provider } from "react-redux";
import "./App.css";
import Login from "./components/LoginSignup/Login";
import Signup from "./components/LoginSignup/Signup";
import MainPage from "./components/MainPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import store from "./store";
import BodyOverlay from "./components/BodyOverlay";
import About from "./components/About/About";
import BusinessView from "./components/BusinessStuff/BusinessView.jsx";
import Favorites from "./components/Favorites/Favorites";
import MyCards from "./components/MyCards/MyCards";
import CreateCard from "./components/MyCards/CardsForms/CreateCard";
import UpdateCard from "./components/MyCards/CardsForms/UpdateCard.jsx";
import SearchComp from "./components/Header/SearchComp/SearchComp.jsx";

function App() {
    return (
        <div className="App">
            <Provider store={store}>
                <BrowserRouter>
                    <BodyOverlay />
                    <Routes>
                        <Route path="/" element={<MainPage />} />
                        <Route path="/Login" element={<Login />} />
                        <Route path="/Signup" element={<Signup />} />
                        <Route path="/About" element={<About />} />
                        <Route path="/Search" element={<SearchComp />} />
                        <Route
                            path="/View/:cardId"
                            element={<BusinessView />}
                        />
                        <Route path="/Favorites" element={<Favorites />} />
                        <Route path="/MyCards" element={<MyCards />} />
                        <Route
                            path="/MyCards/Create"
                            element={<CreateCard />}
                        />
                        <Route
                            path="/MyCards/Edit/:cardId"
                            element={<UpdateCard />}
                        />
                    </Routes>
                </BrowserRouter>
            </Provider>
        </div>
    );
}

export default App;
