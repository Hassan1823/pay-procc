import React, { useState } from "react";

const Continents = ({ onChildStateChange, continents }) => {
  const [selectedContinent, setSelectedContinent] = useState(null);
  const [selectedlabel, setSelectedlabel] = useState({});

  const handleSelect = (continent) => {
    if (selectedContinent === continent) {
      setSelectedContinent(null);
    } else {
      setSelectedContinent(continent);
    }
  };

  const handleCountrySelect = (country) => {
    if (
      !selectedlabel[selectedContinent.name] ||
      !selectedlabel[selectedContinent.name].includes(country)
    ) {
      setSelectedlabel((prevSelectedlabel) => ({
        ...prevSelectedlabel,
        [selectedContinent.name]: [
          ...(prevSelectedlabel[selectedContinent.name] || []),
          country,
        ],
      }));
    } else {
      setSelectedlabel((prevSelectedlabel) => ({
        ...prevSelectedlabel,
        [selectedContinent.name]: prevSelectedlabel[
          selectedContinent.name
        ].filter((c) => c !== country),
      }));
    }
    onChildStateChange(selectedlabel);
  };

  return (
    <div className="bg-[#374151] text-white rounded-md" style={{ width: "80%" }}>
      <div className="flex p-3 border border-[#15803D] rounded-lg" style={{ flexWrap: "wrap" }}>
        {continents.map((continent) => (
          <button
            key={continent.name}
            onClick={() => handleSelect(continent)}
            className={`cursor-pointer bg-[#1E2125] text-white p-2 rounded-lg flex justify-center items-center
              ${selectedContinent === continent ? 'bg-gray-700' : ''}
            `}
            style={{
              marginRight: "0.5rem",
              marginBottom: "0.5rem",
              width: "12vw",
            }}
          >
            {continent.name}
              <div className="text-blue-500 ml-1">
                ({(selectedlabel[continent.name] || []).length}/{continent.total})
              </div>
            
          </button>
        ))}
      </div>
      {selectedContinent && (
  <ul className="list-none m-0 p-3 rounded-lg">
    <button
      className="cursor-pointer bg-[#1E2125] w-[10vw] text-white p-2 rounded-lg mt-3"
      onClick={() =>
        setSelectedlabel((prevSelectedlabel) => {
          if (
            prevSelectedlabel[selectedContinent.name] &&
            prevSelectedlabel[selectedContinent.name].length === selectedContinent.label.length
          ) {
            return {
              ...prevSelectedlabel,
              [selectedContinent.name]: [],
            };
          } else {
            return {
              ...prevSelectedlabel,
              [selectedContinent.name]: selectedContinent.label,
            };
          }
        })
      }
    >
      {selectedlabel[selectedContinent.name] &&
      selectedlabel[selectedContinent.name].length === selectedContinent.label.length
        ? "Deselect All"
        : "Select All"}
    </button>
    {selectedContinent.label.map((country) => (
      <li
        key={country}
        onClick={() => handleCountrySelect(country)}
        className={`${
          selectedlabel[selectedContinent.name] &&
          selectedlabel[selectedContinent.name].includes(country)
            ? "text-yellow-500"
            : "text-white"
        } hover:bg-white hover:text-gray-900 cursor-pointer p-1 my-1 rounded`}
      >
        {country}
      </li>
    ))}
  </ul>
)}
    </div>
  );
};

export default Continents;
