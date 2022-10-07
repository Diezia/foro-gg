import "../../../styles/styles.scss";
import React, { createContext, useReducer, useRef } from "react";
import { AppRouter } from "../../../router/AppRouter";
import { reducer } from "../../../helpers/reducer";

export const Context = React.createContext<any>(null);

export const RefContext = React.createContext<any>(null);

export default function App() {
	const register = useRef<HTMLDialogElement>(null);
	const login = useRef<HTMLDialogElement>(null);

	const [state, dispatch] = useReducer(reducer, {
		token: "",
	});
	return (
		<>
			<Context.Provider value={{ state, dispatch }}>
				<RefContext.Provider value={{ register, login }}>
					<AppRouter />
				</RefContext.Provider>
			</Context.Provider>
		</>
	);
}
