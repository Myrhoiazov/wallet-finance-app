import { useState } from 'react';

export const useToggle = () => {
  const [isShowSelect, setisShowSelect] = useState(false);

  const show = () => setisShowSelect(true);
  const hide = () => setisShowSelect(false);
  const toggleHook = () => setisShowSelect(isShowSelect => !isShowSelect);

  return {
    isShowSelect,
    show,
    hide,
    toggleHook,
  };
};
