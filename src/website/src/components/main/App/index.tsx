import "../../../styles/styles.scss";
import React from "react";
import { Navbar } from "../../ui/header/Navbar";
import { AppRouter } from "../../../router/AppRouter";

export default function App() {
	return (
		<>
			<Navbar />
			<AppRouter />
		</>
	);
}
