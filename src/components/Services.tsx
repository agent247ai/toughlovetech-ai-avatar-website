"use client";

import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  RectangleEllipsis, 
  MousePointerClick, 
  CircleUserRound, 
  Diamond,
  CreditCard,
  SquareTerminal,
  Sparkles
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  useCases: string[];
  ctaText: string;
  isRecommended?: boolean;
  features?: string[];
  onClick: () => void;
}

interface ContactFormData {
  name: string;
  email: string;
  company: string;
  message: string;
}

const ServiceCard = ({ 
  icon, 
  title, 
  description, 
  useCases, 
  ctaText, 
  isRecommended, 
  features,
  onClick 
}: ServiceCardProps) => {
  return (
    <motion.div
      className={`relative bg-card rounded-2xl p-8 cursor-pointer transition-all duration-300 group hover:shadow-2xl border-2 ${
        isRecommended 
          ? 'border-primary/30 shadow-xl shadow-primary/20 bg-gradient-to-br from-card to-surface-1' 
          : 'hover:shadow-xl hover:shadow-primary/10 border-border/50 hover:border-primary/30'
      }`}
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      tabIndex={0}
      role="button"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
    >
      {isRecommended && (
        <Badge className="absolute -top-3 left-8 bg-gradient-to-r from-primary to-secondary text-white px-4 py-1 font-bold shadow-lg">
          🌟 Recommended
        </Badge>
      )}
      
      <div className="flex items-center gap-4 mb-6">
        <div className={`p-3 rounded-xl transition-all duration-300 ${
          isRecommended ? 'bg-gradient-to-br from-primary/20 to-secondary/20 text-primary' : 'bg-secondary/15 text-secondary group-hover:bg-primary/15 group-hover:text-primary'
        }`}>
          {icon}
        </div>
        <h3 className="text-2xl font-bold text-foreground font-heading">{title}</h3>
      </div>
      
      <p className="text-muted-foreground mb-6 text-lg leading-relaxed">{description}</p>
      
      <ul className="space-y-3 mb-8">
        {useCases.map((useCase, index) => (
          <li key={index} className="text-sm text-muted-foreground flex items-start gap-3">
            <div className={`w-1.5 h-1.5 rounded-full mt-2 ${isRecommended ? 'bg-primary' : 'bg-secondary group-hover:bg-primary'}`} />
            <span className="font-medium">{useCase}</span>
          </li>
        ))}
      </ul>
      
      {features && (
        <div className="mb-6 p-4 bg-gradient-to-r from-surface-1 to-surface-2 rounded-xl border border-primary/10">
          <h4 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" />
            Key Features:
          </h4>
          <ul className="space-y-2">
            {features.map((feature, index) => (
              <li key={index} className="text-xs text-muted-foreground flex items-start gap-2 font-medium">
                <span className="text-primary mt-0.5 font-bold">✓</span>
                {feature}
              </li>
            ))}
          </ul>
        </div>
      )}
      
      <Button 
        variant={isRecommended ? "default" : "secondary"}
        className={`w-full font-semibold py-3 rounded-xl transition-all duration-300 ${
          isRecommended 
            ? 'bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white hover:shadow-lg hover:shadow-primary/25' 
            : 'group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-secondary group-hover:text-white hover:shadow-lg border-2 border-primary/20'
        }`}
      >
        {ctaText}
      </Button>
    </motion.div>
  );
};

const Services = () => {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [showContactForm, setShowContactForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [contactForm, setContactForm] = useState<ContactFormData>({
    name: '',
    email: '',
    company: '',
    message: ''
  });

  const services = [
    {
      id: 'static',
      icon: <RectangleEllipsis className="w-6 h-6" />,
      title: 'Static Avatars',
      description: 'Professional AI-generated avatars for consistent brand messaging.',
      useCases: [
        'Training videos and tutorials',
        'Product demonstrations',
        'Corporate announcements',
        'Marketing content'
      ],
      ctaText: 'View Sample Video'
    },
    {
      id: 'motion',
      icon: <MousePointerClick className="w-6 h-6" />,
      title: 'Motion Avatars',
      description: 'Dynamic avatars with natural gestures and expressions.',
      useCases: [
        'Presentation hosting',
        'Webinar content',
        'Educational series',
        'Customer onboarding'
      ],
      ctaText: 'View Sample Video'
    },
    {
      id: 'interactive',
      icon: <CircleUserRound className="w-6 h-6" />,
      title: 'Interactive Avatars',
      description: 'Real-time conversational avatars that engage with your audience.',
      useCases: [
        'Customer support',
        'Sales consultations',
        'Interactive training',
        'Lead qualification'
      ],
      ctaText: 'Try Interactive Demo',
      isRecommended: true,
      features: [
        'Live Q&A Sessions',
        'LMS/CRM Integration',
        'Branching Dialogues & Quizzes',
        'Session Analytics'
      ]
    }
  ];

  const handleServiceClick = (serviceId: string) => {
    setSelectedService(serviceId);
  };

  const handleCloseDialog = () => {
    setSelectedService(null);
    setShowContactForm(false);
  };

  const handleContactSales = () => {
    setShowContactForm(true);
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success('Contact request sent! We\'ll get back to you within 24 hours.');
    setIsLoading(false);
    setShowContactForm(false);
    setSelectedService(null);
    setContactForm({ name: '', email: '', company: '', message: '' });
  };

  const handleRequestInfo = () => {
    toast.success('Information package sent to your email!');
  };

  const selectedServiceData = services.find(s => s.id === selectedService);

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Avatar Solutions
            </span>
          </div>
          <h2 className="text-5xl font-bold text-foreground mb-6 font-heading">
            Choose Your Avatar Solution
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            From static presentations to interactive conversations, we have the perfect avatar solution for your needs.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <ServiceCard
                icon={service.icon}
                title={service.title}
                description={service.description}
                useCases={service.useCases}
                ctaText={service.ctaText}
                isRecommended={service.isRecommended}
                features={service.features}
                onClick={() => handleServiceClick(service.id)}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Service Details Dialog */}
      <Dialog open={!!selectedService && !showContactForm} onOpenChange={handleCloseDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-card border-border">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3 text-2xl text-foreground">
              {selectedServiceData?.icon}
              {selectedServiceData?.title}
              {selectedServiceData?.isRecommended && (
                <Badge className="bg-gradient-to-r from-primary to-secondary text-white">⭐ Recommended</Badge>
              )}
            </DialogTitle>
            <DialogDescription className="text-lg text-muted-foreground">
              {selectedServiceData?.description}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-8">
            {/* Sample Video Section */}
            <div className="bg-surface-1 rounded-xl p-1 border-2 border-primary/20">
              <div className="text-center mb-4 p-4">
                <h4 className="font-bold text-foreground mb-2 text-lg">Sample Video</h4>
                <p className="text-muted-foreground">See our {selectedServiceData?.title.toLowerCase()} in action</p>
              </div>
              
              {/* Video Embeds */}
              <div className="rounded-lg overflow-hidden bg-black">
                {selectedServiceData?.id === 'static' && (
                  <iframe 
                    width="100%" 
                    height="400" 
                    src="https://www.youtube.com/embed/lXIPehAU1-I" 
                    title="Static Avatar Sample" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    referrerPolicy="strict-origin-when-cross-origin" 
                    allowFullScreen
                    className="w-full"
                  />
                )}
                
                {selectedServiceData?.id === 'motion' && (
                  <div className="flex justify-center">
                    <iframe 
                      width="400" 
                      height="600" 
                      src="https://www.youtube.com/embed/zWPeSKssULo" 
                      title="Motion Avatar Sample" 
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                      referrerPolicy="strict-origin-when-cross-origin" 
                      allowFullScreen
                    />
                  </div>
                )}
                
                {selectedServiceData?.id === 'interactive' && (
                  <div className="p-8 text-center bg-gradient-to-br from-primary/10 to-secondary/10">
                    <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
                      <SquareTerminal className="w-10 h-10 text-white" />
                    </div>
                    <p className="text-muted-foreground mb-6 text-lg">Interactive avatar is embedded in the hero section</p>
                    <p className="text-sm text-muted-foreground">Scroll to the top of the page to try our interactive avatar demo</p>
                  </div>
                )}
              </div>
            </div>

            {/* Use Cases */}
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-bold text-foreground mb-4 text-lg flex items-center gap-2">
                  <Diamond className="w-5 h-5 text-primary" />
                  Perfect for:
                </h4>
                <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg p-4 border border-primary/10">
                  <ul className="space-y-3">
                    {selectedServiceData?.useCases.map((useCase, index) => (
                      <li key={index} className="flex items-start gap-3 text-muted-foreground">
                        <Diamond className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                        <span className="font-medium">{useCase}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Interactive Features */}
              {selectedServiceData?.features && (
                <div>
                  <h4 className="font-bold text-foreground mb-4 text-lg flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-primary" />
                    Advanced Features:
                  </h4>
                  <div className="bg-gradient-to-r from-secondary/5 to-primary/5 rounded-lg p-4 border border-secondary/10">
                    <div className="space-y-3">
                      {selectedServiceData.features.map((feature, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <CreditCard className="w-4 h-4 text-secondary mt-1 flex-shrink-0" />
                          <span className="text-muted-foreground font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Integration Checklist for Interactive */}
            {selectedServiceData?.id === 'interactive' && (
              <div className="bg-gradient-to-r from-surface-2 to-surface-1 rounded-xl p-6 border-2 border-primary/10">
                <h4 className="font-bold text-foreground mb-4 flex items-center gap-2">
                  <span className="text-2xl">🚀</span> Integration Checklist:
                </h4>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center gap-3">
                    <span className="text-success font-bold">✓</span>
                    <span className="text-muted-foreground font-medium">API endpoints setup</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-success font-bold">✓</span>
                    <span className="text-muted-foreground font-medium">Webhook configuration</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-success font-bold">✓</span>
                    <span className="text-muted-foreground font-medium">Authentication setup</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-success font-bold">✓</span>
                    <span className="text-muted-foreground font-medium">Analytics dashboard access</span>
                  </li>
                </ul>
              </div>
            )}

            {/* CTAs */}
            <div className="flex gap-4 pt-6 border-t border-border/30">
              <Button 
                className="flex-1 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-semibold py-3 rounded-xl transition-all duration-300"
                onClick={() => toast.success('Avatar setup process initiated!')}
              >
                Start One-Time Avatar Setup
              </Button>
              {selectedServiceData?.id === 'interactive' ? (
                <Button 
                  variant="outline" 
                  className="flex-1 border-2 border-primary/30 hover:bg-primary/10 text-foreground font-semibold py-3 rounded-xl transition-all duration-300"
                  onClick={handleContactSales}
                >
                  Contact Sales
                </Button>
              ) : (
                <Button 
                  variant="outline" 
                  className="flex-1 border-2 border-primary/30 hover:bg-primary/10 text-foreground font-semibold py-3 rounded-xl transition-all duration-300"
                  onClick={handleRequestInfo}
                >
                  Request Info
                </Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Contact Form Dialog */}
      <Dialog open={showContactForm} onOpenChange={() => setShowContactForm(false)}>
        <DialogContent className="max-w-md bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-foreground">Contact Sales</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Get in touch with our team for enterprise pricing and custom solutions.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleContactSubmit} className="space-y-4">
            <div>
              <Input
                placeholder="Full Name"
                value={contactForm.name}
                onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                className="bg-surface-1 border-border text-foreground"
                required
              />
            </div>
            <div>
              <Input
                type="email"
                placeholder="Email Address"
                value={contactForm.email}
                onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                className="bg-surface-1 border-border text-foreground"
                required
              />
            </div>
            <div>
              <Input
                placeholder="Company Name"
                value={contactForm.company}
                onChange={(e) => setContactForm(prev => ({ ...prev, company: e.target.value }))}
                className="bg-surface-1 border-border text-foreground"
                required
              />
            </div>
            <div>
              <Textarea
                placeholder="Tell us about your project..."
                value={contactForm.message}
                onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                rows={4}
                className="bg-surface-1 border-border text-foreground"
              />
            </div>
            <div className="flex gap-3">
              <Button 
                type="submit" 
                disabled={isLoading} 
                className="flex-1 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white"
              >
                {isLoading ? 'Sending...' : 'Send Message'}
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setShowContactForm(false)}
                className="border-2 border-primary/30 text-foreground hover:bg-primary/10"
              >
                Cancel
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Services;