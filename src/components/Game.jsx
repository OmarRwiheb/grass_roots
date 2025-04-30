import React, { useState } from 'react';
import Section from './Section';
import H2 from '../UI/H2';

const Game = () => {
  // State to manage the input value and the displayed hieroglyphs
  const [inputValue, setInputValue] = useState('');
  const [hieroglyphs, setHieroglyphs] = useState([]);

  // Mapping of letters to hieroglyph image URLs
  const alphabet = {
    "a": "heiroglyphics/a.webp",
    "b": "heiroglyphics/b.webp",
    "c": "heiroglyphics/c.webp",
    "d": "heiroglyphics/d.webp",
    "e": "heiroglyphics/e.webp",
    "f": "heiroglyphics/f.webp",
    "g": "heiroglyphics/g.webp",
    "h": "heiroglyphics/h.webp",
    "i": "heiroglyphics/i.webp",
    "j": "heiroglyphics/j.webp",
    "k": "heiroglyphics/k.webp",
    "l": "heiroglyphics/l.webp",
    "m": "heiroglyphics/m.webp",
    "n": "heiroglyphics/n.webp",
    "o": "heiroglyphics/o.webp",
    "p": "heiroglyphics/p.webp",
    "q": "heiroglyphics/q.webp",
    "r": "heiroglyphics/r.webp",
    "s": "heiroglyphics/s.webp",
    "t": "heiroglyphics/t.webp",
    "u": "heiroglyphics/u.webp",
    "v": "heiroglyphics/v.webp",
    "w": "heiroglyphics/w.webp",
    "x": "heiroglyphics/x.webp",
    "y": "heiroglyphics/y.webp",
    "z": "heiroglyphics/z.webp",
    "ch": "heiroglyphics/ch.webp",
    "sh": "heiroglyphics/sh.webp",
  };

  // Handle input changes
  const handleInputChange = (event) => {
    const input = event.target.value;
    let images = [];
    let displayedName = input;

    // Process the input string
    for (let i = 0; i < input.length; i++) {
      let char = input[i].toLowerCase();

      // Check for 'ch' and 'sh' combinations
      if (i + 1 < input.length && input[i + 1].toLowerCase() === 'h') {
        if (char === 'c') {
          char = 'ch';
          i++; // Skip next character since it's part of the 'ch' combination
        } else if (char === 's') {
          char = 'sh';
          i++; // Skip next character since it's part of the 'sh' combination
        }
      }

      // Skip spaces
      if (char === ' ') continue;

      // Get the corresponding hieroglyph image URL
      const imageUrl = alphabet[char];
      if (imageUrl) {
        images.push(imageUrl);
      }
    }

    // Update the state
    setInputValue(displayedName);
    setHieroglyphs(images);
  };

  return (
    <>
      {/* <img src="egyptianMuesum3.png" className='absolute right-0  opacity-25 filter: grayscale-100  -z-10 ' alt="" /> */}
      <Section classes="max-w-[90%] lg:w-3/4">
        <div className="relative w-full flex flex-col items-center justify-center text-center">
          <H2>See Your Name <span className='text-[#ffc000]'>in Hieroglyphic</span></H2>
          <label htmlFor="singleField" className="heiro-label mb-10">
            Insert your name:
          </label>
          <input
            type="text"
            id="singleField"
            name="singleField"
            value={inputValue}
            onChange={handleInputChange}
            className='p-[20px] rounded-[25px] mx-[10px] w-[90%] lg:w-1/2 border-2 border-[#ffc000]'
          />
          <div id="hieroglyphs-display" className="flex flex-row flex-wrap justify-center gap-4 mt-4">
            {hieroglyphs.map((image, index) => (
              <img key={index} src={image} alt={`Hieroglyph ${index}`} className='w-16 lg:w-32' />
            ))}
            {/* <img src="logo_horizontal.png" className='w-2/3' alt="" /> */}

          </div>
          <div className='flex w-full justify-center items-center mt-10'><img src="logo_horizontal.png" className='w-72 translate-y-2' alt="" /></div>
          {/* <p id="name-display" className='text-4xl mt-10 text-[#ffc000] font-bold'>{inputValue}</p> */}
        </div>
      </Section>
    </>
  );
};

export default Game;
