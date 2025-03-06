
"use client"

import React from 'react';
import { useState } from 'react';




export default function Motivator() {
    const [message, setMessage] = useState("click me");

const motivations : string[] = [
  "Boost your mood for up to 12 hours! A brisk walk can release endorphins that keep you feeling good.",
  "Improve your sleep tonight! A daytime walk helps regulate your sleep-wake cycle.",
  "Sharpen your focus! Walking increases blood flow to the brain, enhancing cognitive function.",
  "Strengthen your heart! Regular walking reduces your risk of heart disease.",
  "Lower your stress levels! A walk in nature reduces cortisol, the stress hormone.",
  "Increase your energy levels! Walking improves circulation and oxygen flow, fighting fatigue.",
  "Burn extra calories! An hour's walk contributes to weight management.",
  "Improve your balance! Walking strengthens muscles and improves stability.",
  "Enhance your creativity! A walk can spark new ideas and break through mental blocks.",
  "Strengthen your bones! Walking is a weight-bearing exercise that helps prevent osteoporosis.",
  "Reduce joint pain! Walking can lubricate joints and improve mobility.",
  "Lower blood pressure! Regular walks contribute to healthy blood pressure levels.",
  "Improve digestion! Walking helps stimulate your digestive system.",
  "Boost your immune system! Moderate exercise like walking can strengthen your body's defenses.",
  "Increase your vitamin D! Walking outdoors exposes you to sunlight, essential for vitamin D production.",
  "Improve your self-esteem! Achieving your walking goals boosts confidence.",
  "Reduce risk of type 2 diabetes! Walking helps regulate blood sugar levels.",
  "Improve lung capacity! Walking deepens breathing and strengthens respiratory muscles.",
  "Increase your lifespan! Regular physical activity like walking is linked to longevity.",
  "Enhance your social connection! Walking with friends or family strengthens relationships.",
  "Reduce symptoms of depression and anxiety! Walking has been shown to be effective in improving mental health."
]
    
    function refreshMessage() {
        setMessage(motivations[Math.floor(Math.random() * motivations.length)]);
    }
    

  //let textForButton = motivations[Math.floor(Math.random() * motivations.length)];
    
    return (
        <button
    className="text-2xl md:text-3xl font-semibold bg-[#68B0AB] hover:bg-[#4A7C59] text-white w-full justify-start px-4 py-6 h-auto"
    name="whyButton"
    onClick={refreshMessage}
    aria-label="Why button">
            {message}
    </button>
            
    );

}


