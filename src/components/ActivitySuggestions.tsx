import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Activity {
  title: string;
  emoji: string;
  description: string;
  difficulty: "easy" | "medium" | "fun";
}

interface ActivitySuggestionsProps {
  emotion: string;
  visible: boolean;
}

const ActivitySuggestions = ({ emotion, visible }: ActivitySuggestionsProps) => {
  const getActivitiesByEmotion = (emotionType: string): Activity[] => {
    const activities: Record<string, Activity[]> = {
      POSITIVE: [
        {
          title: "Dance Party",
          emoji: "💃",
          description: "Put on your favorite song and dance like nobody's watching!",
          difficulty: "fun"
        },
        {
          title: "Share Your Joy",
          emoji: "📞",
          description: "Call a friend or family member to share your happiness!",
          difficulty: "easy"
        },
        {
          title: "Creative Art Time",
          emoji: "🎨",
          description: "Draw, paint, or create something colorful and bright!",
          difficulty: "medium"
        },
        {
          title: "Gratitude List",
          emoji: "📝",
          description: "Write down 3 things that made you smile today!",
          difficulty: "easy"
        }
      ],
      NEGATIVE: [
        {
          title: "Cozy Corner Time",
          emoji: "🧸",
          description: "Snuggle with a blanket, pillow, or favorite stuffed animal.",
          difficulty: "easy"
        },
        {
          title: "Deep Breathing",
          emoji: "🫁",
          description: "Take 5 slow, deep breaths. Imagine blowing up a big balloon!",
          difficulty: "easy"
        },
        {
          title: "Talk it Out",
          emoji: "💬",
          description: "Share your feelings with someone you trust and care about.",
          difficulty: "medium"
        },
        {
          title: "Gentle Movement",
          emoji: "🚶",
          description: "Take a slow walk outside or do some gentle stretches.",
          difficulty: "medium"
        }
      ],
      NEUTRAL: [
        {
          title: "Try Something New",
          emoji: "🎲",
          description: "Learn a new word, try a new game, or explore a new place!",
          difficulty: "medium"
        },
        {
          title: "Help Someone",
          emoji: "🤝",
          description: "Do something kind for a family member, friend, or pet!",
          difficulty: "easy"
        },
        {
          title: "Nature Adventure",
          emoji: "🌳",
          description: "Go outside and look for interesting bugs, leaves, or clouds!",
          difficulty: "fun"
        },
        {
          title: "Read Together",
          emoji: "📚",
          description: "Pick a fun book and read with someone special!",
          difficulty: "easy"
        }
      ]
    };
    
    return activities[emotion] || activities["NEUTRAL"];
  };

  const getDifficultyColor = (difficulty: Activity["difficulty"]) => {
    const colors = {
      easy: "bg-emotions-calm text-white",
      medium: "bg-accent text-white",
      fun: "bg-emotions-happy text-white"
    };
    return colors[difficulty];
  };

  const getDifficultyLabel = (difficulty: Activity["difficulty"]) => {
    const labels = {
      easy: "Super Easy!",
      medium: "Let's Try!",
      fun: "So Fun!"
    };
    return labels[difficulty];
  };

  const activities = getActivitiesByEmotion(emotion);

  if (!visible) return null;

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-2xl font-bold font-kid text-foreground mb-2">
          Fun Activities for You! 🎯
        </h3>
        <p className="text-muted-foreground font-kid">
          Here are some awesome things you can do right now!
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {activities.map((activity, index) => (
          <Card
            key={index}
            className="p-4 bg-gradient-card shadow-card border-2 border-primary/10 hover:border-primary/30 transition-all duration-300 hover:scale-105"
          >
            <div className="space-y-3">
              {/* Activity Header */}
              <div className="flex items-center gap-3">
                <div className="text-3xl" role="img" aria-label={activity.title}>
                  {activity.emoji}
                </div>
                <div className="flex-1">
                  <h4 className="font-bold font-kid text-foreground">
                    {activity.title}
                  </h4>
                  <div className={`inline-block px-2 py-1 rounded-full text-xs font-kid font-bold ${getDifficultyColor(activity.difficulty)}`}>
                    {getDifficultyLabel(activity.difficulty)}
                  </div>
                </div>
              </div>

              {/* Activity Description */}
              <p className="text-sm font-kid text-muted-foreground leading-relaxed">
                {activity.description}
              </p>

              {/* Try Button */}
              <Button
                variant="outline"
                size="sm"
                className="w-full bg-card/50 hover:bg-primary hover:text-primary-foreground"
              >
                <span className="mr-2">✨</span>
                I want to try this!
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Encouraging Footer */}
      <div className="text-center mt-6">
        <Card className="p-4 bg-primary/5 border-primary/20">
          <p className="text-sm font-kid text-muted-foreground">
            💡 <strong>Remember:</strong> It's okay to try something different if these don't feel right today. 
            You know yourself best! 🌟
          </p>
        </Card>
      </div>
    </div>
  );
};

export default ActivitySuggestions;