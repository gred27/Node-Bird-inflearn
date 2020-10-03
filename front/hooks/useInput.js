import { useState, useCallback } from 'react';

// custom Hook 사용하면
const useInput = (initValue = null) => {
  const [value, setter] = useState(initValue);
  const handler = useCallback(e => {
    setter(e.target.value);
  });
  return [value, handler, setter];
};

export default useInput;
