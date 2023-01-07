import React from 'react';

import './CustomSelect.scss';

const CustomSelect = ({ options, changeHandler, name }) => {
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
    changeHandler(event.currentTarget.textContent);
  };

  return (
    <div className="mainWrapper" onClick={openToggle}>
      <p>{options[0]}</p>
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
