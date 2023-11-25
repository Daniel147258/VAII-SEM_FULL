import React, { useState, useEffect } from 'react';

const SkuskaApi = () => {
  const [pohlavi, setPohlavi] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3008/api/pohlavie');
        const data = await response.json();
        setPohlavi(data);
      } catch (error) {
        console.error('Chyba při získávání pohlaví:', error);
      }
    };

    fetchData();
  }, []); 

  return (
    <div>
      <h2>Seznam pohlaví</h2>
      <ul>
        {pohlavi.map((pohlaviItem) => (
          <li>{pohlaviItem.pohlavie}</li>
        ))}
      </ul>
    </div>
  );
};

export default SkuskaApi;
