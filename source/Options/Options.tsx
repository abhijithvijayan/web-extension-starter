import React from 'react';

import './styles.scss';

const Options: React.FC = () => {
  return (
    <div>
      <form>
        <p>
          <label htmlFor="name">Name</label>
          <br />
          <input
            type="text"
            id="name"
            name="name"
            spellCheck="false"
            autoComplete="off"
            required
          />
        </p>
        <p>
          <label htmlFor="logging">
            <input type="checkbox" name="logging" /> Show the features enabled
            on each page in the console
          </label>
        </p>
      </form>
    </div>
  );
};

export default Options;
