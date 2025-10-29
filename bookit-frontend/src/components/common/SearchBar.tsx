// bookit-frontend/src/components/common/SearchBar.tsx

import React from 'react';

interface SearchBarProps {
  value: string;
  placeholder?: string;
  onChange: (query: string) => void;
  onSubmit: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  placeholder = 'Search experiences',
  onChange,
  onSubmit,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-2 rounded-md bg-gray-100 border-none focus:outline-none focus:ring-2 focus:ring-gray-200"
      />
    </form>
  );
};

export default SearchBar;