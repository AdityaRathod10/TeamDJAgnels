'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mic, MicOff } from 'lucide-react';

declare global {
  interface Window {
    webkitSpeechRecognition: any;
  }
}

// Define voice commands and their corresponding routes
const VOICE_COMMANDS = {
  'search': ['/search', ['search', 'such', 'surge', 'searching']],
  'markets': ['/markets', ['market', 'markets', 'find market', 'find markets', 'marketplace']],
  'register': ['/vendors/register', ['register', 'register vendor', 'vendor register', 'registration']],
  'dashboard': ['/vendor/dashboard', ['dashboard', 'dash board', 'vendor dashboard']],
  'ratings': ['/vendor/ratings', ['rating', 'ratings', 'vendor rating', 'vendor ratings', 'rate']],
  'sustainability': ['/vendor/sustainability', ['sustainability', 'sustainable', 'vendor sustainability']],
  'inventory': ['/vendor/inventory', ['inventory', 'vendor inventory', 'stock', 'items']],
  'home': ['/', ['home', 'go home', 'main', 'main page']],
  'back': ['back', ['back', 'go back', 'return']],
  'bookings': ['/bookings', ['booking', 'bookings', 'my booking', 'my bookings', 'book']],
  'wishlist': ['/wishlist', ['wishlist', 'wish list', 'my wishlist', 'favorites']]
} as const;

type CommandKey = keyof typeof VOICE_COMMANDS;

function findBestMatch(input: string): [CommandKey, string] | null {
  input = input.toLowerCase().trim();
  
  // Remove common filler words
  input = input.replace(/please|can you|could you|go to|take me to|show|show me|open|navigate to/g, '').trim();
  
  // First try exact matches
  for (const [key, [route, alternatives]] of Object.entries(VOICE_COMMANDS)) {
    if (alternatives.includes(input)) {
      return [key as CommandKey, route];
    }
  }
  
  // Then try partial matches
  for (const [key, [route, alternatives]] of Object.entries(VOICE_COMMANDS)) {
    for (const alt of alternatives) {
      if (input.includes(alt) || alt.includes(input)) {
        return [key as CommandKey, route];
      }
    }
  }
  
  // Try matching individual words
  const inputWords = input.split(' ');
  for (const [key, [route, alternatives]] of Object.entries(VOICE_COMMANDS)) {
    for (const alt of alternatives) {
      const altWords = alt.split(' ');
      if (inputWords.some(word => altWords.some(altWord => 
        altWord.includes(word) || word.includes(altWord)
      ))) {
        return [key as CommandKey, route];
      }
    }
  }
  
  return null;
}

export default function VoiceCommand() {
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);
  const [lastCommand, setLastCommand] = useState<string>('');
  const [confidence, setConfidence] = useState<number>(0);
  const router = useRouter();

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = 'en-US';
      recognitionInstance.maxAlternatives = 5;

      recognitionInstance.onresult = (event: any) => {
        const results = Array.from(event.results).map((result: any) => ({
          transcript: result[0].transcript.toLowerCase(),
          confidence: result[0].confidence
        }));
        
        // Sort by confidence
        results.sort((a, b) => b.confidence - a.confidence);
        
        let matched = false;
        for (const result of results) {
          console.log('Trying transcript:', result.transcript, 'Confidence:', result.confidence);
          setConfidence(result.confidence);
          
          const match = findBestMatch(result.transcript);
          if (match) {
            const [command, route] = match;
            setLastCommand(`Recognized: "${result.transcript}" (${(result.confidence * 100).toFixed(1)}% confident)`);
            
            if (route === 'back') {
              router.back();
            } else {
              router.push(route);
            }
            matched = true;
            break;
          }
        }
        
        if (!matched) {
          setLastCommand(`Not recognized: "${results[0].transcript}"`);
        }
      };

      recognitionInstance.onend = () => {
        setIsListening(false);
      };

      recognitionInstance.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        setLastCommand(`Error: ${event.error}`);
      };

      setRecognition(recognitionInstance);
    }
  }, [router]);

  // Separate effect for keyboard listener to avoid recreation
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      // Check for Ctrl+M (or Cmd+M on Mac)
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'm') {
        event.preventDefault(); // Prevent default browser behavior
        toggleListening();
      }
    }

    // Add listener to document for global keyboard shortcuts
    document.addEventListener('keydown', handleKeyDown);

    // Cleanup
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [recognition]); // Only re-run if recognition changes

  const toggleListening = () => {
    if (!recognition) {
      console.error('Speech recognition not initialized');
      setLastCommand('Error: Speech recognition not available');
      return;
    }

    if (isListening) {
      recognition.stop();
    } else {
      try {
        recognition.start();
        setIsListening(true);
        setLastCommand('');
        setConfidence(0);
      } catch (err) {
        console.error('Error starting speech recognition:', err);
        setLastCommand('Error starting voice recognition');
      }
    }
  };

  return (
    <div className="fixed bottom-24 right-24 z-50">
      <div className="absolute bottom-full mb-4 right-0 w-72">
        {isListening && (
          <div className="bg-black bg-opacity-90 text-white p-4 rounded-lg shadow-lg text-sm">
            <div className="mb-2 font-medium flex items-center justify-between">
              <span>Listening... (Ctrl+M to toggle)</span>
              {confidence > 0 && (
                <span className="text-xs opacity-75">
                  Confidence: {(confidence * 100).toFixed(1)}%
                </span>
              )}
            </div>
            <div className="text-xs opacity-75">
              Try saying:
              <ul className="mt-1 space-y-1 list-disc list-inside">
                <li>"search for vegetables"</li>
                <li>"show me markets"</li>
                <li>"open dashboard"</li>
                <li>"go to ratings"</li>
                <li>"show inventory"</li>
                <li>"my bookings"</li>
                <li>"open wishlist"</li>
                <li>"go back"</li>
              </ul>
            </div>
          </div>
        )}
        {!isListening && lastCommand && (
          <div className="bg-black bg-opacity-90 text-white p-3 rounded-lg shadow-lg text-sm mb-2">
            {lastCommand}
          </div>
        )}
      </div>
      <button
        onClick={toggleListening}
        className={`p-4 rounded-full shadow-lg transition-all duration-300 ${
          isListening 
            ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
            : 'bg-green-500 hover:bg-green-600'
        }`}
        title="Press Ctrl+M or click to activate voice commands"
      >
        {isListening ? (
          <MicOff className="h-6 w-6 text-white" />
        ) : (
          <Mic className="h-6 w-6 text-white" />
        )}
      </button>
    </div>
  );
}
