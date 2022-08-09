import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../components/ui/pages/HomePage";
import { GamePage } from "../components/ui/pages/GamePage";
import { PostPage } from "../components/ui/pages/PostPage";

export function AppRouter() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/">
					<Route index element={<HomePage />} />
					<Route path="games">
						<Route path=":gameId">
							<Route index element={<GamePage />} />
							<Route path="post">
								<Route path="postId" element={<PostPage />} />
							</Route>
						</Route>
					</Route>
				</Route>
			</Routes>
		</BrowserRouter>
	);
}
