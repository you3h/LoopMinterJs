import React, { useCallback, useEffect, useRef, useState } from 'react';
import { RgbaColorPicker } from 'react-colorful';

const useClickOutside = (ref, handler) => {
  useEffect(() => {
    let startedInside = false;
    let startedWhenMounted = false;

    const listener = (event) => {
      // Do nothing if `mousedown` or `touchstart` started inside ref element
      if (startedInside || !startedWhenMounted) return;
      // Do nothing if clicking ref's element or descendent elements
      if (!ref.current || ref.current.contains(event.target)) return;

      handler(event);
    };

    const validateEventStart = (event) => {
      startedWhenMounted = ref.current;
      startedInside = ref.current && ref.current.contains(event.target);
    };

    document.addEventListener("mousedown", validateEventStart);
    document.addEventListener("touchstart", validateEventStart);
    document.addEventListener("click", listener);

    return () => {
      document.removeEventListener("mousedown", validateEventStart);
      document.removeEventListener("touchstart", validateEventStart);
      document.removeEventListener("click", listener);
    };
  }, [ref, handler]);
};

const PopoverColorPicker = ({ color, onChange }) => {
  const popover = useRef();
  const [isOpen, toggle] = useState(false);

  const close = useCallback(() => toggle(false), []);
  useClickOutside(popover, close);

  const parsedRGBA = color ? Object.keys(color).map(data => color[data]) : '0,0,0,0'

  return (
    <div className='picker'>
      <div
        className='swatch'
        style={{ backgroundColor: `rgba(${parsedRGBA})` }}
        onClick={() => toggle(true)}
      />

      {isOpen && (
        <div className='popover' ref={popover}>
          <RgbaColorPicker color={color} onChange={onChange} />
        </div>
      )}
    </div>
  );
};

export default PopoverColorPicker
