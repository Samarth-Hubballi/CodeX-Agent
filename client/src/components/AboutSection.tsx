import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Github, 
  Linkedin, 
  Mail, 
  MapPin, 
  Calendar,
  Award,
  Briefcase,
  GraduationCap
} from "lucide-react";
import developerAvatar from "@assets/generated_images/Cyberpunk_developer_avatar_e6b7d2d0.png";

export default function AboutSection() {
  const skills = [
    { name: "AI/ML", level: 95, category: "core" },
    { name: "Full Stack Development", level: 90, category: "core" },
    { name: "Neural Networks", level: 85, category: "core" },
    { name: "Cloud Architecture", level: 88, category: "technical" },
    { name: "DevOps", level: 82, category: "technical" },
    { name: "Software Engineering", level: 75, category: "technical" },
    { name: "Cybersecurity", level: 80, category: "technical" },
    { name: "UI/UX Design", level: 85, category: "design" }
  ];

  const achievements = [
    { title: "AI Agents", count: "5+", icon: GraduationCap },
    { title: "Years of Experience", count: "2+", icon: Briefcase },
    { title: "Projects ", count: "15+", icon: Award },
    { title: "Open Source Contributions", count: "50+", icon: Github }
  ];

  const experience = [
    {
      company: "accenture-At Forage",
      role: "Software Engineer",
      period: "October	1st,	2025",
      description: "Completed Accenture Nordics's Software Engineering Job Simulation  on Forage.."
    },
    {
      company: "Tata -At Forage",
      role: "Cybersecurity Analyst",
      period: "May 25th, 2025 ", 
      description: "Completed a job simulation involving identity and access management (IAM) for Tata Consultancy Services, collaborating with a Cybersecurity Consulting team."
    },
    {
      company: "AWS -At Forage",
      role: "Solution Architect",
      period: "Feb 16th 2025",
      description: "Designed and simple and scalable hosting architecture based on Elastic Beanstalk for a client experiencing significant growth and slow response times.."
    }
  ];

  return (
    <section id="about" className="py-20 bg-card/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-accent/10 text-accent border-accent/20">
            About Developer
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-futuristic font-bold mb-6">
            Meet the <span className="text-accent">Neural Architect</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Passionate about pushing the boundaries of AI and software development, 
            creating the future of coding one neural network at a time.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Profile */}
          <div className="space-y-8">
            {/* Profile Card */}
            <Card className="hover-elevate">
              <CardContent className="p-8">
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <div className="relative">
                    <img 
                      src={developerAvatar}
                      alt="Developer Avatar"
                      className="w-32 h-32 rounded-full object-cover border-4 border-primary/20"
                      data-testid="img-developer-avatar"
                    />
                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary/20 to-accent/20" />
                  </div>
                  
                  <div className="text-center sm:text-left flex-1">
                    <h3 className="text-2xl font-bold mb-2">Samarth R H</h3>
                    <p className="text-primary font-mono mb-3">Neural Network Engineer</p>
                    <div className="flex items-center justify-center sm:justify-start gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        Karnataka,India
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        Available
                      </div>
                    </div>
                    
                    <div className="flex justify-center sm:justify-start gap-3">
                      <Button variant="outline" size="icon" data-testid="button-github">
                        <Github className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" data-testid="button-linkedin">
                        <Linkedin className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" data-testid="button-email">
                        <Mail className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <div className="grid grid-cols-2 gap-4">
              {achievements.map((achievement, index) => (
                <Card key={index} className="hover-elevate">
                  <CardContent className="p-6 text-center">
                    <achievement.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                    <div className="text-2xl font-bold text-primary mb-1">
                      {achievement.count}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {achievement.title}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Right Column - Skills & Experience */}
          <div className="space-y-8">
            {/* Skills */}
            <Card className="hover-elevate">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold mb-6">Technical Expertise</h3>
                <div className="space-y-4">
                  {skills.map((skill, index) => (
                    <div key={index}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">{skill.name}</span>
                        <span className="text-xs text-primary">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all duration-1000"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Experience */}
            <Card className="hover-elevate">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold mb-6">Experience</h3>
                <div className="space-y-6">
                  {experience.map((exp, index) => (
                    <div key={index} className="border-l-2 border-primary/20 pl-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">{exp.role}</h4>
                        <Badge variant="outline" className="text-xs">
                          {exp.period}
                        </Badge>
                      </div>
                      <p className="text-primary text-sm mb-2">{exp.company}</p>
                      <p className="text-muted-foreground text-sm">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-accent to-primary hover:shadow-xl hover:shadow-accent/25"
            data-testid="button-collaborate"
          >
            <Mail className="h-5 w-5 mr-2" />
            Let's Collaborate
          </Button>
        </div>
      </div>
    </section>
  );
}