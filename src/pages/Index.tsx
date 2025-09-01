import React, { useState, useEffect } from "react";
import HeroSection from "@/components/HeroSection";
import JournalForm from "@/components/JournalForm";
import EmotionDisplay from "@/components/EmotionDisplay";
import ActivitySuggestions from "@/components/ActivitySuggestions";
import useSentimentAnalysis from "@/hooks/useSentimentAnalysis";
import { toast } from "@/hooks/use-toast";

type AppState = 'hero' | 'journal' | 'result';

interface EmotionResult {
  label: string;
  score: number;
  emoji: string;
  color: string;
  description: string;
}

const Index = () => {
  const [currentState, setCurrentState] = useState<AppState>('hero');
  const [currentEntry, setCurrentEntry] = useState('');
  const [currentEmotion, setCurrentEmotion] = useState<EmotionResult | null>(null);
  const [showActivities, setShowActivities] = useState(false);

  const { analyzeSentiment, saveEntry, loadEntries, isLoading } = useSentimentAnalysis();

  // Load saved entries on component mount
  useEffect(() => {
    loadEntries();
  }, []);

  const handleStartJournal = () => {
    setCurrentState('journal');
  };

  const handleSubmitEntry = async (entry: string) => {
    setCurrentEntry(entry);
    
    try {
      const emotion = await analyzeSentiment(entry);
      
      if (emotion) {
        setCurrentEmotion(emotion);
        setCurrentState('result');
        
        toast({
          title: "Feelings analyzed! 🤖",
          description: "I've analyzed your emotions. Check out what I found!",
        });
      } else {
        throw new Error('No emotion detected');
      }
    } catch (error) {
      console.error('Analysis error:', error);
      
      toast({
        title: "Oops! Something went wrong 😅",
        description: "I'm having trouble understanding your feelings right now. Try again in a moment!",
        variant: "destructive"
      });
    }
  };

  const handleSaveEntry = () => {
    if (currentEmotion && currentEntry) {
      saveEntry(currentEntry, currentEmotion);
      setShowActivities(true);
      
      toast({
        title: "Entry saved! 💾",
        description: "Your feelings have been safely stored. Here are some fun activities for you!",
      });
    }
  };

  const handleNewEntry = () => {
    setCurrentState('journal');
    setCurrentEntry('');
    setCurrentEmotion(null);
    setShowActivities(false);
  };

  const handleBackToHome = () => {
    setCurrentState('hero');
    setCurrentEntry('');
    setCurrentEmotion(null);
    setShowActivities(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Bar */}
      <nav className="bg-card/80 backdrop-blur-sm shadow-soft border-b border-primary/20 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <button
              onClick={handleBackToHome}
              className="flex items-center gap-2 hover:scale-105 transition-transform"
            >
              <span className="text-2xl">🤖</span>
              <span className="text-xl font-bold font-kid text-primary">JIELEWE</span>
            </button>
            
            <div className="text-sm font-kid text-muted-foreground">
              Your AI Emotion Helper 💚
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {currentState === 'hero' && (
          <HeroSection onStartJournal={handleStartJournal} />
        )}

        {currentState === 'journal' && (
          <div className="max-w-2xl mx-auto">
            <JournalForm
              onSubmit={handleSubmitEntry}
              isAnalyzing={isLoading}
            />
          </div>
        )}

        {currentState === 'result' && currentEmotion && (
          <div className="max-w-3xl mx-auto space-y-8">
            <EmotionDisplay
              emotion={currentEmotion}
              onSaveEntry={handleSaveEntry}
              onNewEntry={handleNewEntry}
            />
            
            <ActivitySuggestions
              emotion={currentEmotion.label}
              visible={showActivities}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-card/50 border-t border-primary/20 mt-16">
        <div className="container mx-auto px-4 py-8 text-center">
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-2">
              <span className="text-lg">🌟</span>
              <span className="font-kid font-bold text-primary">JIELEWE</span>
              <span className="text-lg">🌟</span>
            </div>
            
            <p className="text-sm font-kid text-muted-foreground">
              Helping kids understand their emotions with AI • Safe & Private • Made with 💚
            </p>
            
            <div className="flex justify-center items-center gap-4 text-xs text-muted-foreground">
              <span>🎯 SDG 3: Good Health & Well-being</span>
              <span>•</span>
              <span>🤖 Powered by Hugging Face AI</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;