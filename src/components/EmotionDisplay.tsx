import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface EmotionResult {
  label: string;
  score: number;
  emoji: string;
  color: string;
  description: string;
}

interface EmotionDisplayProps {
  emotion: EmotionResult;
  onSaveEntry: () => void;
  onNewEntry: () => void;
}

const EmotionDisplay = ({ emotion, onSaveEntry, onNewEntry }: EmotionDisplayProps) => {
  const getConfidenceMessage = (score: number) => {
    if (score > 0.8) return "I'm very sure about this! 💯";
    if (score > 0.6) return "I'm pretty confident! ✨";
    if (score > 0.4) return "I think this might be it! 🤔";
    return "Let me guess... 🤷‍♂️";
  };

  const getEncouragingMessage = (label: string) => {
    const messages: Record<string, string> = {
      POSITIVE: "You seem happy today! That's wonderful! Keep spreading those good vibes! 🌟",
      NEGATIVE: "It's okay to feel sad sometimes. Remember, feelings come and go like clouds in the sky. You're brave for sharing! 🤗",
      NEUTRAL: "You seem calm and balanced today. That's a great place to be! Sometimes peaceful is perfect! ✨"
    };
    return messages[label] || "Every feeling is important and valid. Thank you for sharing with me! 💚";
  };

  return (
    <Card className="p-6 bg-gradient-card shadow-card border-2 border-primary/20 text-center space-y-6">
      {/* Emotion Icon */}
      <div className="flex justify-center">
        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-white to-primary/10 flex items-center justify-center shadow-soft pulse-heart">
          <span className="text-6xl" role="img" aria-label={emotion.label}>
            {emotion.emoji}
          </span>
        </div>
      </div>

      {/* Main Result */}
      <div className="space-y-4">
        <h2 className="text-3xl font-bold font-kid text-foreground">
          You seem{" "}
          <span className={`${emotion.color} text-shadow-soft`}>
            {emotion.label.toLowerCase()}
          </span>
          !
        </h2>
        
        <p className="text-lg font-kid text-muted-foreground leading-relaxed">
          {emotion.description}
        </p>
      </div>

      {/* Confidence Display */}
      <div className="space-y-3">
        <div className="bg-muted/50 rounded-xl p-4">
          <p className="text-sm font-kid text-muted-foreground mb-2">
            {getConfidenceMessage(emotion.score)}
          </p>
          
          {/* Confidence Bar */}
          <div className="w-full bg-border rounded-full h-3 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-primary-glow rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${Math.round(emotion.score * 100)}%` }}
            ></div>
          </div>
          
          <p className="text-xs text-muted-foreground mt-2">
            Confidence: {Math.round(emotion.score * 100)}%
          </p>
        </div>
      </div>

      {/* Encouraging Message */}
      <div className="bg-primary/10 rounded-xl p-4">
        <p className="text-base font-kid text-foreground leading-relaxed">
          {getEncouragingMessage(emotion.label)}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 pt-4">
        <Button
          variant="hero"
          size="lg"
          onClick={onSaveEntry}
          className="flex-1"
        >
          <span className="text-xl mr-2">💾</span>
          Save This Entry
        </Button>
        
        <Button
          variant="outline"
          size="lg"
          onClick={onNewEntry}
          className="flex-1"
        >
          <span className="text-xl mr-2">✏️</span>
          Write Another
        </Button>
      </div>

      {/* Fun Fact */}
      <div className="text-center mt-6">
        <p className="text-xs font-kid text-muted-foreground">
          🎯 Fun Fact: I use AI to understand feelings, just like how you learn to recognize emotions in friends!
        </p>
      </div>
    </Card>
  );
};

export default EmotionDisplay;