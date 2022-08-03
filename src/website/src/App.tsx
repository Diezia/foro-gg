import './styles/App.scss';
import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import HomePage from './components/ui/HomePage';
import { GamePage } from './components/ui/GamePage';
import { PostPage } from './components/ui/PostPage';
import { Navbar } from './components/ui/Navbar';

function App() {
  return (
    <>
    <Navbar />
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<HomePage />} />
          <Route path="games">
            <Route path="gameId">
            <Route index element={<GamePage />} />
              <Route path="post">
                <Route path="postId" element={<PostPage />} />
              </Route>
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
