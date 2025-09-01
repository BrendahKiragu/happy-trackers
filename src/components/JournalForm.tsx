import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";

interface JournalFormProps {
  onSubmit: (entry: string) => void;
  isAnalyzing: boolean;
}

const JournalForm = ({ onSubmit, isAnalyzing }: JournalFormProps) => {
  const [entry, setEntry] = useState("");
  const [charCount, setCharCount] = useState(0);
  const maxChars = 500;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (entry.trim() && entry.length >= 10) {
      onSubmit(entry);
    }
  };

  const handleChange = (value: string) => {
    if (value.length <= maxChars) {
      setEntry(value);
      setCharCount(value.length);
    }
  };

  const getEncouragingMessage = () => {
    if (charCount === 0) return "Tell me how you're feeling today! 😊";
    if (charCount < 10) return "Keep going! A few more words would be great! ✨";
    if (charCount < 50) return "Awesome start! Tell me more! 🌟";
    return "Perfect! You're doing great! 💚";
  };

  return (
    <Card className="p-6 bg-gradient-card shadow-card border-2 border-primary/20">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="text-3xl">📖</div>
          <h2 className="text-2xl font-bold font-kid text-foreground">
            How are you feeling today?
          </h2>
          <p className="text-muted-foreground font-kid">
            Write about anything that happened or how you feel right now!
          </p>
        </div>

        {/* Journal Entry Area */}
        <div className="space-y-4">
          <div className="relative">
            <Textarea
              value={entry}
              onChange={(e) => handleChange(e.target.value)}
              placeholder="Today I feel... 🤔
Maybe because... 💭
Something fun that happened... 🎉"
              className="min-h-32 text-base font-kid resize-none border-2 border-primary/30 focus:border-primary rounded-xl p-4 bg-background/50"
              disabled={isAnalyzing}
            />
            
            {/* Character Count */}
            <div className="absolute bottom-3 right-3 text-xs text-muted-foreground bg-background/80 px-2 py-1 rounded-full">
              {charCount}/{maxChars}
            </div>
          </div>

          {/* Encouraging Message */}
          <div className="text-center">
            <p className="text-sm font-kid text-primary font-medium">
              {getEncouragingMessage()}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            type="submit"
            variant="hero"
            size="lg"
            disabled={entry.length < 10 || isAnalyzing}
            className="flex-1"
          >
            {isAnalyzing ? (
              <>
                <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                Analyzing your feelings...
              </>
            ) : (
              <>
                <span className="text-xl mr-2">🤖</span>
                Analyze My Feelings
              </>
            )}
          </Button>
          
          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={() => {
              setEntry("");
              setCharCount(0);
            }}
            disabled={isAnalyzing || entry.length === 0}
          >
            <span className="text-lg mr-2">🗑️</span>
            Clear
          </Button>
        </div>

        {/* Helpful Tips */}
        <div className="bg-muted/50 rounded-xl p-4 space-y-2">
          <h3 className="font-bold text-sm font-kid text-foreground">💡 Writing Tips:</h3>
          <ul className="text-xs font-kid text-muted-foreground space-y-1">
            <li>• How did you sleep? 😴</li>
            <li>• What made you happy today? 😄</li>
            <li>• Did anything worry you? 😟</li>
            <li>• What are you excited about? 🎉</li>
          </ul>
        </div>
      </form>
    </Card>
  );
};

export default JournalForm;