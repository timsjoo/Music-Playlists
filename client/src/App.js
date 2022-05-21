import './App.css';
import AllPlaylists from "./components/AllPlaylists";
import NewPlaylist from "./components/NewPlaylist";
//import OnePlaylist from "./components/OnePlaylist";
//import EditPlaylist from "./components/EditPlaylist";
import LoginReg from "./views/LoginReg";

import { BrowserRouter, Routes, Route} from "react-router-dom";


function App() {
  
  
  return (

    <BrowserRouter>

    <div className="App">


      <Routes>
        <Route element = {<LoginReg />} path= "/" />
        <Route element = {<AllPlaylists />} path= "/home" />
        <Route element = {<NewPlaylist />} path= "/new" />


        

      </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;
