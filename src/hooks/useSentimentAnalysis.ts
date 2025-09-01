import { useState } from 'react';
import { pipeline } from '@huggingface/transformers';

interface EmotionResult {
  label: string;
  score: number;
  emoji: string;
  color: string;
  description: string;
}

interface JournalEntry {
  id: string;
  content: string;
  emotion: EmotionResult;
  timestamp: Date;
}

const useSentimentAnalysis = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [entries, setEntries] = useState<JournalEntry[]>([]);

  // Load entries from localStorage on mount
  const loadEntries = () => {
    try {
      const saved = localStorage.getItem('jielewe-entries');
      if (saved) {
        const parsedEntries = JSON.parse(saved).map((entry: any) => ({
          ...entry,
          timestamp: new Date(entry.timestamp)
        }));
        setEntries(parsedEntries);
      }
    } catch (error) {
      console.error('Error loading entries:', error);
    }
  };

  // Save entries to localStorage
  const saveEntries = (newEntries: JournalEntry[]) => {
    try {
      localStorage.setItem('jielewe-entries', JSON.stringify(newEntries));
      setEntries(newEntries);
    } catch (error) {
      console.error('Error saving entries:', error);
    }
  };

  // Map sentiment analysis results to kid-friendly emotions
  const mapToEmotion = (result: any): EmotionResult => {
    const label = result.label.toLowerCase();
    const score = result.score;

    // Map different sentiment labels to our emotion system
    if (label.includes('positive') || label === 'label_1' || score > 0.6) {
      return {
        label: 'POSITIVE',
        score,
        emoji: '😊',
        color: 'text-emotions-happy',
        description: 'Happy and positive! You seem to be having a great time!'
      };
    } else if (label.includes('negative') || label === 'label_0' || score < 0.4) {
      return {
        label: 'NEGATIVE',
        score: 1 - score, // Flip score for negative emotions
        emoji: '😢',
        color: 'text-emotions-sad',
        description: 'A bit sad or worried. That\'s okay - everyone has these feelings sometimes!'
      };
    } else {
      return {
        label: 'NEUTRAL',
        score,
        emoji: '😌',
        color: 'text-emotions-calm',
        description: 'Calm and balanced. You seem peaceful and content today!'
      };
    }
  };

  const analyzeSentiment = async (text: string): Promise<EmotionResult | null> => {
    if (!text.trim()) return null;

    setIsLoading(true);
    console.log('Starting sentiment analysis for:', text);
    
    try {
      console.log('Initializing AI model...');
      // Use a lighter, more reliable model
      const classifier = await pipeline('sentiment-analysis', 'Xenova/distilbert-base-uncased-finetuned-sst-2-english', {
        device: 'wasm',
        dtype: 'q8'
      });
      
      console.log('AI model loaded, analyzing text...');
      // Analyze the text
      const result = await classifier(text);
      console.log('Analysis result:', result);
      
      // Get the first result (highest confidence)
      const topResult = Array.isArray(result) ? result[0] : result;
      
      // Map to our emotion system
      const emotion = mapToEmotion(topResult);
      console.log('Mapped emotion:', emotion);
      
      return emotion;
    } catch (error) {
      console.error('Error analyzing sentiment:', error);
      console.log('Falling back to keyword analysis');
      
      // Fallback: simple keyword-based analysis for demo
      return analyzeFallback(text);
    } finally {
      setIsLoading(false);
    }
  };

  // Simple fallback analysis if AI fails
  const analyzeFallback = (text: string): EmotionResult => {
    const lowerText = text.toLowerCase();
    
    const positiveWords = ['happy', 'good', 'great', 'awesome', 'fun', 'love', 'excited', 'amazing', 'wonderful', 'fantastic'];
    const negativeWords = ['sad', 'bad', 'angry', 'upset', 'worried', 'scared', 'hurt', 'lonely', 'frustrated', 'disappointed'];
    
    const positiveCount = positiveWords.filter(word => lowerText.includes(word)).length;
    const negativeCount = negativeWords.filter(word => lowerText.includes(word)).length;
    
    if (positiveCount > negativeCount) {
      return {
        label: 'POSITIVE',
        score: Math.min(0.8, 0.5 + (positiveCount * 0.1)),
        emoji: '😊',
        color: 'text-emotions-happy',
        description: 'Happy and positive! You seem to be having a great time!'
      };
    } else if (negativeCount > positiveCount) {
      return {
        label: 'NEGATIVE',
        score: Math.min(0.8, 0.5 + (negativeCount * 0.1)),
        emoji: '😢',
        color: 'text-emotions-sad',
        description: 'A bit sad or worried. That\'s okay - everyone has these feelings sometimes!'
      };
    } else {
      return {
        label: 'NEUTRAL',
        score: 0.6,
        emoji: '😌',
        color: 'text-emotions-calm',
        description: 'Calm and balanced. You seem peaceful and content today!'
      };
    }
  };

  const saveEntry = (content: string, emotion: EmotionResult) => {
    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      content,
      emotion,
      timestamp: new Date()
    };

    const updatedEntries = [newEntry, ...entries].slice(0, 50); // Keep last 50 entries
    saveEntries(updatedEntries);
  };

  return {
    analyzeSentiment,
    saveEntry,
    loadEntries,
    entries,
    isLoading
  };
};

export default useSentimentAnalysis;