import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const SearchBar = () => {
	const [value, setValue] = useState("");
	const location = useLocation();
	const pathname = location.pathname;

	useEffect(() => {
		setValue("");
	}, [pathname]);

	const handleChange = (e: any) => {
		const newValue = e.target.value;
		setValue(newValue);
	};

	const handleSearchClick = () => {
		setValue("");
	};

	return (
		<div className="search">
			<input name="message" type="text" className="searchTerm" id="input_text" value={value} onChange={handleChange} />
			<button type="submit" className="searchButton" onClick={handleSearchClick}>Search</button>
		</div>
	);
};

export default SearchBar;
