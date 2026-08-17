import React, { useMemo, useState } from "react";
import opportunitiesData from "./opportunitiesData";
import "./Opportunities.css";

const Opportunities = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const totalJobs = opportunitiesData.reduce(
    (total, category) => total + category.jobs.length,
    0
  );

  const filteredCategories = useMemo(() => {
    const search = searchTerm.toLowerCase().trim();

    return opportunitiesData
      .map((category) => {
        const categoryMatches = category.name
          .toLowerCase()
          .includes(search);

        const matchingJobs = category.jobs.filter((job) =>
          job.toLowerCase().includes(search)
        );

        return {
          ...category,
          jobs: categoryMatches ? category.jobs : matchingJobs,
        };
      })
      .filter((category) => {
        const matchesCategory =
          selectedCategory === "All" ||
          category.name === selectedCategory;

        const matchesSearch = search
          ? category.name.toLowerCase().includes(search) ||
            category.jobs.length > 0
          : true;

        return matchesCategory && matchesSearch;
      });
  }, [searchTerm, selectedCategory]);

  const handleViewJobs = (job) => {
    console.log("Selected opportunity:", job);

    // Later you can navigate to:
    // /jobs?category=IT%20%26%20Technology&job=Software%20Developer
  };

  return (
    <section className="opportunities-section" id="opportunities">
      <div className="opportunities-container">

        {/* Header */}
        <div className="opportunities-header">
          <div>
            <span className="opportunities-label">
              OPPORTUNITIES FOR EVERYONE
            </span>

            <h2>
              Find the right
              <span> opportunity </span>
              for you.
            </h2>

            <p>
              Explore jobs and career opportunities across every industry,
              skill level and profession.
            </p>
          </div>

          <div className="opportunity-stats">
            <div className="stat-box">
              <strong>{opportunitiesData.length}+</strong>
              <span>Industries</span>
            </div>

            <div className="stat-box">
              <strong>{totalJobs}+</strong>
              <span>Job Roles</span>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="opportunities-search">
          <div className="search-icon">🔍</div>

          <input
            type="text"
            placeholder="Search jobs, skills or industries..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {searchTerm && (
            <button
              className="clear-search"
              onClick={() => setSearchTerm("")}
            >
              ✕
            </button>
          )}
        </div>

        {/* Category Filter */}
        <div className="category-filter">
          <button
            className={selectedCategory === "All" ? "active" : ""}
            onClick={() => setSelectedCategory("All")}
          >
            All Opportunities
          </button>

          {opportunitiesData.map((category) => (
            <button
              key={category.id}
              className={
                selectedCategory === category.name ? "active" : ""
              }
              onClick={() => setSelectedCategory(category.name)}
            >
              {category.icon} {category.name}
            </button>
          ))}
        </div>

        {/* Categories */}
        <div className="opportunities-grid">
          {filteredCategories.map((category) => (
            <div className="opportunity-card" key={category.id}>

              <div className="opportunity-card-top">
                <div className="opportunity-icon">
                  {category.icon}
                </div>

                <div className="job-count">
                  {category.jobs.length} Jobs
                </div>
              </div>

              <h3>{category.name}</h3>

              <p className="category-description">
                {category.description}
              </p>

              <div className="job-list">
                {category.jobs.map((job, index) => (
                  <button
                    className="job-tag"
                    key={index}
                    onClick={() => handleViewJobs(job)}
                  >
                    <span>{job}</span>
                    <span className="job-arrow">→</span>
                  </button>
                ))}
              </div>

              <button
                className="view-category-btn"
                onClick={() => {
                  setSelectedCategory(category.name);
                  setSearchTerm("");
                }}
              >
                Explore {category.name}
                <span>→</span>
              </button>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredCategories.length === 0 && (
          <div className="no-results">
            <div>🔎</div>

            <h3>No opportunities found</h3>

            <p>
              Try searching for another job, skill or industry.
            </p>

            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("All");
              }}
            >
              Show All Opportunities
            </button>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="opportunity-cta">
          <div>
            <span>DON'T KNOW WHAT JOB IS RIGHT FOR YOU?</span>

            <h3>
              Tell us your skills. We'll find opportunities for you.
            </h3>

            <p>
              Whether you're a student, fresher, skilled worker or
              experienced professional, discover opportunities that match
              what you can do.
            </p>
          </div>

          <button className="find-opportunity-btn">
            Find Opportunities For Me
            <span>→</span>
          </button>
        </div>

      </div>
    </section>
  );
};

export default Opportunities;
