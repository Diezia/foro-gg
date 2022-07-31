import './styles/App.scss';
import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from './components/ui/Home';
import { Game } from './components/ui/Game';
import { Post } from './components/ui/Post';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="games">
            <Route path="gameId">
            <Route index element={<Game />} />
              <Route path="post">
                <Route path="postId" element={<Post />} />
              </Route>
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
