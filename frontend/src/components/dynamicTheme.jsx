
import React, { useState, useEffect, useRef } from 'react';
import Anime from 'animejs';
import  './dynamicTheme.css';

const Theme = () => {
    const [themeTitle, setThemeTitle] = useState('Upload your excel file');
    const [dynamicPhrase, setDynamicPhrase] = useState('and see the magic happen!');
    const [wordList, setWordList] = useState(['and see the magic happen!', 'and analyse your data', 'and visualize your data', 'and share your insights']);
    const wordIndexRef = useRef(0);
    const typingIntervalRef = useRef(null);
    const currentWordRef = useRef('');
  
    useEffect(() => {
      const startTyping = () => {
        const word = wordList[wordIndexRef.current];
        currentWordRef.current = '';
        typingIntervalRef.current = setInterval(() => {
          currentWordRef.current += word[currentWordRef.current.length];
          setDynamicPhrase(currentWordRef.current);
          if (currentWordRef.current === word) {
            clearInterval(typingIntervalRef.current);
            typingIntervalRef.current = null;
            wordIndexRef.current = (wordIndexRef.current + 1) % wordList.length;
            setTimeout(startTyping, 1000); // Delay before next word
          }
        }, 50); // Adjust typing speed
      };
  
      startTyping();
  
      return () => clearInterval(typingIntervalRef.current);
    }, [wordList]);
  

 return (
   <div className="App">
     <h1>   
        {themeTitle}
       <div className='dynamicPhrase'>{dynamicPhrase}</div>
     </h1>
   </div>
 );
}

export default Theme;