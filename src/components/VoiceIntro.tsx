'use client';

import { useEffect, useState } from 'react';

const WELCOME_TEXT = `Welcome to QuickVeggie! Your one-stop solution for fresh vegetables. 
We connect you directly with local vendors, offering the freshest produce at the best prices. 
Browse through our wide selection, compare prices, and get doorstep delivery.`;

export default function VoiceIntro() {
  const [synth, setSynth] = useState<SpeechSynthesis | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);

  useEffect(() => {
    // Initialize speech synthesis
    if (typeof window !== 'undefined') {
      setSynth(window.speechSynthesis);
    }

    const handleKeyPress = (event: KeyboardEvent) => {
      // Only play if it hasn't been played before
      if (!hasPlayed && 
          event.code === 'Space' && 
          !(event.target instanceof HTMLInputElement) && 
          !(event.target instanceof HTMLTextAreaElement)) {
        event.preventDefault();
        playWelcomeMessage();
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      // Cancel any ongoing speech when component unmounts
      if (synth) {
        synth.cancel();
      }
    };
  }, [synth, hasPlayed]);

  const playWelcomeMessage = () => {
    if (!synth || isPlaying) return;

    // Cancel any ongoing speech
    synth.cancel();

    const utterance = new SpeechSynthesisUtterance(WELCOME_TEXT);
    
    // Configure voice settings
    utterance.rate = 0.9; // Slightly slower than default
    utterance.pitch = 1;
    utterance.volume = 1;

    // Try to use a female voice if available
    const voices = synth.getVoices();
    const femaleVoice = voices.find(voice => 
      voice.name.includes('female') || voice.name.includes('Samantha')
    );
    if (femaleVoice) {
      utterance.voice = femaleVoice;
    }

    // Add event handlers
    utterance.onstart = () => {
      setIsPlaying(true);
      // Show visual indicator that audio is playing
      const indicator = document.createElement('div');
      indicator.id = 'voice-indicator';
      indicator.innerHTML = `
        <div class="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-full 
                    shadow-lg flex items-center space-x-2 z-50 animate-pulse">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                  d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 010-7.072m12.728 2.828l-2.829 2.828"/>
          </svg>
          <span>Playing Introduction...</span>
        </div>
      `;
      document.body.appendChild(indicator);
    };

    utterance.onend = () => {
      setIsPlaying(false);
      setHasPlayed(true);
      // Remove visual indicator with fade-out animation
      const indicator = document.getElementById('voice-indicator');
      if (indicator) {
        indicator.style.transition = 'opacity 0.5s ease-out';
        indicator.style.opacity = '0';
        setTimeout(() => {
          indicator.remove();
        }, 500);
      }
    };

    // Play the speech
    synth.speak(utterance);
  };

  // Return null as this is a utility component
  return null;
}
