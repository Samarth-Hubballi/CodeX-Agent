import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Send, 
  Terminal, 
  CheckCircle2,
  Mail,
  MessageSquare,
  User
} from "lucide-react";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitted(true);
    setIsSubmitting(false);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);

    console.log('Contact form submitted:', formData);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (isSubmitted) {
    return (
      <section id="contact" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <Card className="hover-elevate border-primary/20">
              <CardContent className="p-12">
                <CheckCircle2 className="h-16 w-16 text-primary mx-auto mb-6" />
                <h3 className="text-2xl font-bold mb-4">Message Transmitted!</h3>
                <p className="text-muted-foreground mb-6">
                  Your message has been successfully transmitted through the neural network. 
                  I'll respond within 24 hours.
                </p>
                <div className="flex items-center justify-center gap-2 text-sm text-primary font-mono">
                  <Terminal className="h-4 w-4" />
                  <span>TRANSMISSION_STATUS: SUCCESS</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-20 bg-card/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
            Contact
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-futuristic font-bold mb-6">
            Initialize <span className="text-primary">Connection</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Ready to revolutionize your development workflow? Let's connect and explore 
            how AI can transform your coding experience.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="hover-elevate">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Terminal className="h-5 w-5 text-primary" />
                  Neural Message Interface
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2" htmlFor="name">
                        <User className="h-4 w-4 inline mr-1" />
                        Name
                      </label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="Enter your name"
                        required
                        data-testid="input-contact-name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2" htmlFor="email">
                        <Mail className="h-4 w-4 inline mr-1" />
                        Email
                      </label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="your@email.com"
                        required
                        data-testid="input-contact-email"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2" htmlFor="subject">
                      <MessageSquare className="h-4 w-4 inline mr-1" />
                      Subject
                    </label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => handleInputChange('subject', e.target.value)}
                      placeholder="Project collaboration, AI consulting, etc."
                      data-testid="input-contact-subject"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2" htmlFor="message">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      placeholder="Describe your project, goals, or questions..."
                      rows={6}
                      required
                      data-testid="textarea-contact-message"
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-primary to-accent hover:shadow-xl hover:shadow-primary/25"
                    disabled={isSubmitting}
                    data-testid="button-send-message"
                  >
                    {isSubmitting ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    ) : (
                      <Send className="h-4 w-4 mr-2" />
                    )}
                    {isSubmitting ? 'Transmitting...' : 'Send Message'}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <div className="space-y-8">
              <Card className="hover-elevate">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold mb-6">Direct Neural Links</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Mail className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium">Email</div>
                        <div className="text-muted-foreground">samarthhubli817@gmail.com</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-accent/10">
                        <Terminal className="h-5 w-5 text-accent" />
                      </div>
                      <div>
                        <div className="font-medium">Response Time</div>
                        <div className="text-muted-foreground">Within 24 hours</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover-elevate">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold mb-6">Collaboration Modes</h3>
                  <div className="space-y-3">
                    <Badge variant="outline" className="w-full justify-start p-3 border-primary/30">
                      🚀 AI Consulting
                    </Badge>
                    <Badge variant="outline" className="w-full justify-start p-3 border-primary/30">
                      💻 Custom Development
                    </Badge>
                    <Badge variant="outline" className="w-full justify-start p-3 border-primary/30">
                      🧠 Neural Network Design
                    </Badge>
                    <Badge variant="outline" className="w-full justify-start p-3 border-primary/30">
                      🔧 Code Optimization
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Terminal Status */}
              <Card className="hover-elevate border-primary/20">
                <CardContent className="p-6 font-mono text-sm">
                  <div className="space-y-2">
                    <div className="text-primary">$ system.status --neural-core</div>
                    <div className="text-green-400">✓ ONLINE: Neural networks active</div>
                    <div className="text-green-400">✓ AVAILABLE: Ready for collaboration</div>
                    <div className="text-green-400">✓ RESPONSIVE: 24h response time</div>
                    <div className="text-primary mt-4">$ accepting.connections = true</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}