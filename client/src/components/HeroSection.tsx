import { Button } from "@/components/ui/button";
import { ArrowRight, Code, Cpu, Zap } from "lucide-react";
import FloatingParticles from "./FloatingParticles";
import aiVizImage from "@assets/generated_images/Cyberpunk_AI_brain_visualization_aaff438d.png";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <FloatingParticles />
      
      {/* Background Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <Cpu className="h-4 w-4 text-primary" />
              <span className="text-sm text-primary font-mono">Neural Network Powered</span>
            </div>
            
            <h1 className="text-5xl lg:text-6xl xl:text-7xl font-futuristic font-bold leading-tight">
              <span className="text-primary">AI Coding</span><br />
              <span className="text-foreground">Agent</span><br />
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Reimagined
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-lg leading-relaxed">
              Experience the future of software development with our advanced AI coding agent. 
              Generate, optimize, and debug code at the speed of thought.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-primary to-accent hover:shadow-xl hover:shadow-primary/25 font-semibold"
                data-testid="button-try-agent"
              >
                <Zap className="h-5 w-5 mr-2" />
                Agent by Sam
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="border-primary/50 hover:bg-primary/10"
                data-testid="button-view"
              >
                <Code className="h-5 w-5 mr-2" />
                Built with AI Assistance
              </Button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">99.9%</div>
                <div className="text-sm text-muted-foreground">Accuracy</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">10x</div>
                <div className="text-sm text-muted-foreground">Faster</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">24/7</div>
                <div className="text-sm text-muted-foreground">Available</div>
              </div>
            </div>
          </div>
          
          {/* Right Content - 3D Visualization */}
          <div className="relative">
            <div className="floating-animation">
              <img 
                src={aiVizImage} 
                alt="AI Neural Network Visualization" 
                className="w-full h-auto rounded-lg shadow-2xl shadow-primary/20"
                data-testid="img-ai-visualization"
              />
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-primary to-accent rounded-full opacity-20 floating-animation" style={{ animationDelay: '0.5s' }} />
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-accent to-primary rounded-full opacity-30 floating-animation" style={{ animationDelay: '1s' }} />
            
            {/* Geometric Shapes */}
            <div className="absolute top-10 left-10 w-6 h-6 border-2 border-primary rotate-45 floating-animation" style={{ animationDelay: '1.5s' }} />
            <div className="absolute bottom-20 right-10 w-8 h-8 border-2 border-accent rounded-full floating-animation" style={{ animationDelay: '2s' }} />
          </div>
        </div>
      </div>
      
      {/* Glitch Effect Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="glitch-overlay" />
      </div>
    </section>
  );
}