import React, { useEffect, useState } from "react";
import "./developers.css";

const Developers = () => {
  const [developers, setDevelopers] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchDesignation, setSearchDesignation] = useState("");
  const [searchSkills, setSearchSkills] = useState("");

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

  const filterDevelopers = () => {
    const filteredDevelopers = developers.filter((developer) => {
      const nameMatch =
        developer.name &&
        developer.name.toLowerCase().includes(searchName.toLowerCase());
      const designationMatch =
        developer.designation &&
        developer.designation
          .toLowerCase()
          .includes(searchDesignation.toLowerCase());
      const skillsMatch =
        developer.skills &&
        developer.skills.some((skill) =>
          skill.toLowerCase().includes(searchSkills.toLowerCase())
        );
      return nameMatch || designationMatch || skillsMatch;
    });
    setFilteredDevelopers(filteredDevelopers);
  };

  const handleEnterKey = (event) => {
    if (event.key === "Enter") {
      event.stopPropagation();
      filterDevelopers();
    }
  };

  const [filteredDevelopers, setFilteredDevelopers] = useState([]);

  useEffect(() => {
    filterDevelopers();
  }, [developers, searchName, searchDesignation, searchSkills]);

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
        <input
          type="text"
          placeholder="Search by skills"
          value={searchSkills}
          onChange={(e) => setSearchSkills(e.target.value)}
          onKeyDown={handleEnterKey}
        />
      </div>

      {filteredDevelopers.length > 0 ? (
        <div className="developer-list">
          {filteredDevelopers.map((developer) => (
            <div className="developer" key={developer.id}>
              <h2>{developer.name}</h2>
              <p>Designation: {developer.designation || "Not specified"}</p>
              <p>Skills: {developer.skills.join(", ")}</p>

              {developer.projects && (
                <div className="project-list">
                  <h3>Projects</h3>
                  {developer.projects.map((project, index) => (
                    <div className="project" key={index}>
                      <h4>{project.name}</h4>
                      <p>
                        Description: {project.description || "Not specified"}
                      </p>

                      {project.team.length > 0 && (
                        <div className="team">
                          <h5>Team</h5>
                          {project.team.map((teamMember, index) => (
                            <div className="team-member" key={index}>
                              <p>Name: {teamMember.name || "Not specified"}</p>
                              <p>Role: {teamMember.role}</p>
                            </div>
                          ))}
                        </div>
                      )}

                      {project.tasks && project.tasks.length > 0 && (
                        <div>
                          <h5>Tasks</h5>
                          {project.tasks.map((task, index) => (
                            <div key={index}>
                              <p>ID: {task.id}</p>
                              <p>Name: {task.name || "Not specified"}</p>
                              <p>Status: {task.status || "Not specified"}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
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
