import React, { useEffect, useState } from "react";
import "./developers.css";

const Developers = () => {
  const [developers, setDevelopers] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchDesignation, setSearchDesignation] = useState("");
  const [searchSkills, setSearchSkills] = useState([]);
  const [filteredDevelopers, setFilteredDevelopers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://raw.githubusercontent.com/dixitsoham7/dixitsoham7.github.io/main/index.json"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data from the API");
        }
        const data = await response.json();
        setDevelopers(data.employees || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    filterDevelopers();
  }, [developers, searchName, searchDesignation, searchSkills]);

  const filterDevelopers = () => {
    const filteredDevelopers = developers.filter((developer) => {
      const nameMatch =
        !searchName ||
        (developer.name &&
          developer.name.toLowerCase().includes(searchName.toLowerCase()));
      const designationMatch =
        !searchDesignation ||
        (developer.designation &&
          developer.designation
            .toLowerCase()
            .includes(searchDesignation.toLowerCase()));
      const skillsMatch =
        searchSkills.length === 0 ||
        (developer.skills &&
          searchSkills.some((skill) => developer.skills.includes(skill)));
      return nameMatch && designationMatch && skillsMatch;
    });
    setFilteredDevelopers(filteredDevelopers);
  };

  const handleEnterKey = (event) => {
    if (event.key === "Enter") {
      event.stopPropagation();
      filterDevelopers();
    }
  };

  const handleSkillChange = (event) => {
    const { value, checked } = event.target;
    setSearchSkills((prevSkills) => {
      if (checked) {
        return [...prevSkills, value];
      } else {
        return prevSkills.filter((skill) => skill !== value);
      }
    });
  };

  return (
    <div className="container">
      <h1>Developers</h1>

      <div className="input">
        <input
          type="text"
          placeholder="Search by name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          onKeyDown={handleEnterKey}
        />
      </div>

      <div className="input">
        <input
          type="text"
          placeholder="Search by designation"
          value={searchDesignation}
          onChange={(e) => setSearchDesignation(e.target.value)}
          onKeyDown={handleEnterKey}
        />
      </div>

      <div className="input">
        <h4>Skills:</h4>
        <div className="checkboxes">
          <label>
            <input
              type="checkbox"
              value="SQL"
              checked={searchSkills.includes("SQL")}
              onChange={handleSkillChange}
            />
            SQL
          </label>
          <label>
            <input
              type="checkbox"
              value="JavaScript"
              checked={searchSkills.includes("JavaScript")}
              onChange={handleSkillChange}
            />
            Javascript
          </label>
          <label>
            <input
              type="checkbox"
              value="Python"
              checked={searchSkills.includes("Python")}
              onChange={handleSkillChange}
            />
            Python
          </label>
          <label>
            <input
              type="checkbox"
              value="HTML"
              checked={searchSkills.includes("HTML")}
              onChange={handleSkillChange}
            />
            HTML
          </label>
          <label>
            <input
              type="checkbox"
              value="CSS"
              checked={searchSkills.includes("CSS")}
              onChange={handleSkillChange}
            />
            CSS
          </label>
          <label>
            <input
              type="checkbox"
              value="Photoshop"
              checked={searchSkills.includes("Photoshop")}
              onChange={handleSkillChange}
            />
            Photoshop
          </label>
          <label>
            <input
              type="checkbox"
              value="Manual Testing"
              checked={searchSkills.includes("Manual Testing")}
              onChange={handleSkillChange}
            />
            Manual Testing
          </label>
          <label>
            <input
              type="checkbox"
              value="Java"
              checked={searchSkills.includes("Java")}
              onChange={handleSkillChange}
            />
            Java
          </label>
        </div>
      </div>

      {filteredDevelopers.length > 0 ? (
        <div className="developer-list">
          {filteredDevelopers.map((developer) => (
            <div key={developer.id} className="developer">
              <h3>{developer.name}</h3>
              <p>Designation: {developer.designation}</p>
              <p>Skills: {developer.skills.join(", ")}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No developers found.</p>
      )}
    </div>
  );
};

export default Developers;
