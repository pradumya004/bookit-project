// bookit-frontend/src/pages/HomePage.tsx

import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/common/Header";
import ExperienceCard from "../components/experience/ExperienceCard";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { useExperiences } from "../hooks/useExperiences";
import type { ExperienceSummary } from "../types";

const HomePage: React.FC = () => {
  const { experiences, loading, error } = useExperiences();
  const [filteredExperiences, setFilteredExperiences] = useState<
    ExperienceSummary[]
  >([]);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();

  // Check for search query in URL when the page loads
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const search = params.get("search");
    if (search) {
      setSearchQuery(search);
    } else {
      setSearchQuery("");
    }
  }, [location.search]);

  // Filter experiences when search query or experiences change
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredExperiences(experiences);
      return;
    }

    const filtered = experiences.filter(
      (exp) =>
        exp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exp.location.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredExperiences(filtered);
  }, [experiences, searchQuery]);

  // Handle search from header
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Update URL with search query
    const url = new URL(window.location.href);
    if (query) {
      url.searchParams.set("search", query);
    } else {
      url.searchParams.delete("search");
    }
    window.history.pushState({}, "", url);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header showSearchBar={true} onSearch={handleSearch} />

      <main className="container mx-auto px-4 py-6">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <LoadingSpinner size="lg" />
          </div>
        ) : error ? (
          <div className="text-center py-10">
            <p className="text-red-500 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="text-blue-600 underline"
            >
              Retry
            </button>
          </div>
        ) : (
          <div>
            {searchQuery && (
              <div className="mb-4">
                <h2 className="text-lg font-medium">
                  {filteredExperiences.length === 0
                    ? `No results found for "${searchQuery}"`
                    : `Search results for "${searchQuery}"`}
                </h2>
              </div>
            )}

            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-4">
                {searchQuery ? "Matching Experiences" : "Featured Experiences"}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredExperiences.map((experience) => (
                  <ExperienceCard
                    key={experience._id}
                    experience={experience}
                  />
                ))}
              </div>
            </div>

            {filteredExperiences.length === 0 && !loading && (
              <div className="text-center py-10">
                <p className="text-gray-500">
                  {searchQuery
                    ? `No experiences found matching "${searchQuery}". Try a different search term.`
                    : "No experiences found. Check back later!"}
                </p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default HomePage;