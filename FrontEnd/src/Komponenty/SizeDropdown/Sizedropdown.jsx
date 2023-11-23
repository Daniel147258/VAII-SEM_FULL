import React, { useState } from 'react';
import './SizeDropdown.css'
const SizeDropdown = ({ sizes, selectedSize, handleSizeClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSizeSelect = (size) => {
    handleSizeClick(size);
    toggleDropdown();
  };

  return (
    <div className='col-md-8'>
    <div className={`size-dropdown ${isOpen ? 'open' : ''}`}>
      <div className='container-fluid'>
      <button className= "size-button" onClick={toggleDropdown}>
        {selectedSize || 'Veľkosť'} <span className="arrow">&#9660;</span>
      </button>
      </div>
      {isOpen && (
        <ul className='size-options'>
          {sizes.map((size, index) => (
            <li className='aleNo'>
              <button
                    key={index}
                    onClick={() => handleSizeSelect(size)}
                    className={`tlacitko ${selectedSize === size ? 'selected' : ''}`}
                  >
                    {size}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
    </div> 
  );
};

export default SizeDropdown;
