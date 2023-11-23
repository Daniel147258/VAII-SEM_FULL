import React from 'react';
import './FiltreSideBar.css'

const FiltreSideBar = () => {
  return (
    <div className="sidebar">
      <h4>Filtrovanie</h4>

      {/* Filter podľa kategórie */}
      <div>
        <h5>Kategória</h5>
        {/* Pridajte ďalšie kategórie podľa potreby */}
        <label>
          <input type="checkbox" value="Zeny" />
          Ženy
        </label>
        <label>
          <input type="checkbox" value="Muzi" />
          Muži
        </label>
        <label>
          <input type="checkbox" value="Deti" />
          Deti
        </label>
      </div>

      {/* Filter podľa ceny */}
      <div>
        <h5>Cena</h5>
        {/* Pridajte ďalšie filtre podľa potreby */}
        <label>
          <input type="radio" name="cena" value="levnejsi" />
          Lacnejšie
        </label>
        <label>
          <input type="radio" name="cena" value="drahsi" />
          Drahšie
        </label>
      </div>
    </div>
  );
};

export default FiltreSideBar;