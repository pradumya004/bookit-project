// bookit-frontend/src/components/common/Header.tsx

import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";

interface HeaderProps {
  showSearchBar?: boolean;
  title?: string;
  showBackButton?: boolean;
  onBackClick?: () => void;
  onSearch?: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({
  showSearchBar = true,
  showBackButton = false,
  onBackClick,
  onSearch,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  // Handle search function
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const handleSearchSubmit = () => {
    if (onSearch) {
      onSearch(searchQuery);
    } else if (location.pathname !== "/") {
      // If not on home page, navigate to home with search query
      navigate(`/?search=${encodeURIComponent(searchQuery)}`);
    } else {
      // Refresh the page with search query
      window.location.href = `/?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <header className="p-4 bg-white">
      {/* Header content */}
      <div className="flex items-center justify-between">
        {showBackButton && (
          <button
            onClick={onBackClick}
            className="flex items-center text-black mr-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            <span className="ml-1">
              {location.pathname.includes("/details") ? "Details" : "Checkout"}
            </span>
          </button>
        )}

        <Link to="/" className="flex items-center">
          <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white text-xs">
            HD
          </div>
          <span className="ml-1 text-sm font-medium">
            highway
            <br />
            delite
          </span>
        </Link>

        {showSearchBar ? (
          <div className="flex-grow mx-4">
            <SearchBar
              value={searchQuery}
              onChange={handleSearchChange}
              onSubmit={handleSearchSubmit}
            />
          </div>
        ) : (
          <div className="flex-grow"></div>
        )}

        {showSearchBar && (
          <button
            className="bg-yellow-400 text-black px-4 py-2 rounded-md text-sm font-medium"
            onClick={handleSearchSubmit}
          >
            Search
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
