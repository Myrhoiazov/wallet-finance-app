import React, { useState } from 'react';

import './CustomSelect.scss';

const CustomSelect = ({ options, changeHandler, name }) => {
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const openToggle = () => {
    const selectIcon = document.getElementById('selectIcon' + name);
    const dropOptions = document.getElementById('dropOptions' + name);
    selectIcon.classList.contains('open')
      ? selectIcon.classList.remove('open')
      : selectIcon.classList.add('open');
    dropOptions.classList.contains('open')
      ? dropOptions.classList.remove('open')
      : dropOptions.classList.add('open');
  };

  const optionHandle = event => {
    const option = event.currentTarget.textContent;
    setSelectedOption(option);
    changeHandler(option);
  };

  return (
    <div className="mainWrapper" onClick={openToggle}>
      <p>{selectedOption}</p>
      <span id={'selectIcon' + name} className="icon"></span>
      <div id={'dropOptions' + name} className="dropOptions">
        {options.map(option => (
          <p onClick={optionHandle} key={option}>
            {option}
          </p>
        ))}
      </div>
    </div>
  );
};

export default CustomSelect;