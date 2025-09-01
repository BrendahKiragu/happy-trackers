import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  onStartJournal: () => void;
}

const HeroSection = ({ onStartJournal }: HeroSectionProps) => {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center px-4 py-12">
      <div className="container max-w-4xl mx-auto text-center">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          {/* Hero Robot Image */}
          <div className="lg:w-1/2 flex justify-center">
            <div className="relative">
              <img 
                src="/lovable-uploads/b7f4506d-bf32-47ad-977d-a2f45e8da66f.png" 
                alt="JIELEWE - Your friendly emotion tracking robot"
                className="w-80 h-80 lg:w-96 lg:h-96 object-contain bounce-gentle drop-shadow-lg"
              />
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-secondary rounded-full flex items-center justify-center pulse-heart">
                <span className="text-2xl">💚</span>
              </div>
            </div>
          </div>

          {/* Hero Content */}
          <div className="lg:w-1/2 space-y-6">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold font-kid text-foreground text-shadow-soft">
                Hi! I'm{" "}
                <span className="text-primary bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                  JIELEWE
                </span>
              </h1>
              <p className="text-xl lg:text-2xl text-muted-foreground font-kid leading-relaxed">
                Your friendly robot buddy who helps you understand your feelings! 
                Let's explore your emotions together! 🌟
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                variant="hero" 
                size="jumbo" 
                onClick={onStartJournal}
                className="shadow-button hover:shadow-xl"
              >
                <span className="text-2xl mr-2">✨</span>
                Start My Journal
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="bg-card/70 backdrop-blur-sm"
              >
                <span className="text-xl mr-2">📊</span>
                See My Moods
              </Button>
            </div>

            {/* Fun Stats */}
            <div className="flex justify-center lg:justify-start gap-6 mt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary font-kid">Safe</div>
                <div className="text-sm text-muted-foreground">& Private</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary font-kid">Fun</div>
                <div className="text-sm text-muted-foreground">& Easy</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent font-kid">Smart</div>
                <div className="text-sm text-muted-foreground">AI Helper</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full blur-xl"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-secondary/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 left-1/3 w-24 h-24 bg-accent/10 rounded-full blur-xl"></div>
      </div>
    </section>
  );
};

export default HeroSection;