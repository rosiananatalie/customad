import React, { useState } from 'react';
import { HotKeys } from 'react-hotkeys';

const FormComponent = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleNameShortcut = () => {
    setName('John Doe');
  };

  const handleEmailShortcut = () => {
    setEmail('johndoe@example.com');
  };

  const handlers = {
    A: handleNameShortcut,
    F2: handleEmailShortcut,
  };

  return (
    <HotKeys handlers={handlers}>
      <form>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <br />
        <label>
          Email:
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </HotKeys>
  );
};

export default FormComponent;
