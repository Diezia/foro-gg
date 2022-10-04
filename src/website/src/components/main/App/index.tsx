import "../../../styles/styles.scss";
import React, { createContext, useReducer } from "react";
import { AppRouter } from "../../../router/AppRouter";
import { reducer } from "../../../helpers/reducer";

export const Context = React.createContext<any>(null);
export default function App() {
	const [state, dispatch] = useReducer(reducer, {
		token: ''
	})
	return (
		<>
		<Context.Provider value={{state, dispatch}}>
			<AppRouter />
		</Context.Provider>
		</>
	);
}
