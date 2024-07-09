import React from "react";
import { Link } from 'react-router-dom';

export const Sorter = ({ sort, sortBy, onClick, children }) => {

    let sortDirection = "selected-none";

    if (sort.toLowerCase().replace(/-/g, "") === sortBy.toLowerCase()) {
        sortDirection = sort.startsWith("-") ? "selected-desc" : "selected-asc";
    }

    const handleClick = () => {
        onClick(sort.startsWith("-") ? sortBy : "-" + sortBy);
    }

    return (
        <Link className={sortDirection} onClick={handleClick}>
            {children}
        </Link>
    );
}

export default Sorter;