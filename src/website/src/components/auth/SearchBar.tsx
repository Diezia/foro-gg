import React, { useState, useEffect, ChangeEvent } from "react";

import { useLocation } from "react-router-dom";

const SearchBar = () => {
	const [value, setValue] = useState("");
	const location = useLocation();
	const pathname = location.pathname;

	useEffect(() => {
		setValue("");
	}, [pathname]);


	const handleSearchClick = () => {
		setValue("");
	};

	return (
		<div className="search">
		
			<button type="submit" className="searchButton" onClick={handleSearchClick}></button>
		</div>
	);
};

export default SearchBar;
