import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, 
  Code2, 
  Zap, 
  Shield, 
  Database, 
  Workflow,
  ArrowRight,
  CheckCircle2 
} from "lucide-react";
import CodeEditor from "./CodeEditor";

export default function CapabilitiesSection() {
  const capabilities = [
    {
      icon: Brain,
      title: "Neural Code Generation",
      description: "Advanced AI generates high-quality code from natural language descriptions",
      features: ["Multi-language support", "Context-aware suggestions", "Best practices integration"]
    },
    {
      icon: Code2,
      title: "Intelligent Debugging",
      description: "AI-powered debugging identifies and fixes issues before they become problems",
      features: ["Error prediction", "Performance optimization", "Security vulnerability detection"]
    },
    {
      icon: Zap,
      title: "Instant Optimization",
      description: "Real-time code optimization for performance, readability, and maintainability",
      features: ["Code refactoring", "Performance analysis", "Memory optimization"]
    },
    {
      icon: Shield,
      title: "Security Analysis",
      description: "Comprehensive security scanning and vulnerability assessment",
      features: ["OWASP compliance", "Dependency scanning", "Security recommendations"]
    },
    {
      icon: Database,
      title: "Smart Architecture",
      description: "AI-driven architectural decisions and design pattern recommendations",
      features: ["Design patterns", "Database optimization", "API design"]
    },
    {
      icon: Workflow,
      title: "Workflow Automation",
      description: "Automate repetitive coding tasks and development workflows",
      features: ["CI/CD integration", "Testing automation", "Documentation generation"]
    }
  ];

  const languages = [
    "JavaScript", "TypeScript", "Python", "Java", "C++", "Go", 
    "Rust", "PHP", "Ruby", "Swift", "Kotlin", "C#"
  ];

  return (
    <section id="capabilities" className="py-20 relative">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
            AI Capabilities
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-futuristic font-bold mb-6">
            Superhuman <span className="text-primary">Coding Powers</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our AI agent combines cutting-edge neural networks with deep programming knowledge 
            to transform how you write, debug, and optimize code.
          </p>
        </div>

        {/* Live Demo */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-center mb-8">
            Try it <span className="text-primary">Live</span>
          </h3>
          <CodeEditor />
        </div>

        {/* Capabilities Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {capabilities.map((capability, index) => (
            <Card key={index} className="hover-elevate group transition-all duration-300">
              <CardHeader>
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <capability.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{capability.title}</CardTitle>
                </div>
                <p className="text-muted-foreground text-sm">
                  {capability.description}
                </p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {capability.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Supported Languages */}
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-8">
            Supports <span className="text-primary">All Major Languages</span>
          </h3>
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {languages.map((language, index) => (
              <Badge 
                key={index} 
                variant="outline" 
                className="border-primary/30 hover:bg-primary/10 transition-colors"
                data-testid={`badge-language-${language.toLowerCase()}`}
              >
                {language}
              </Badge>
            ))}
          </div>
          
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-primary to-accent hover:shadow-xl hover:shadow-primary/25"
            data-testid="button-explore-capabilities"
          >
            Integrated with All Capabilities -
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
}