"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Play, Navigation } from "lucide-react";
import { toast } from "sonner";

interface FormData {
  name: string;
  company: string;
  email: string;
  role: string;
  preferredTime: string;
  message: string;
}

interface FormErrors {
  [key: string]: string;
}

export default function HeroHeader() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [isAvatarLoaded, setIsAvatarLoaded] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    company: "",
    email: "",
    role: "",
    preferredTime: "",
    message: ""
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [hasScrolled, setHasScrolled] = useState(false);
  
  // Use ref for avatar container to avoid direct DOM manipulation conflicts
  const avatarContainerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100 && !hasScrolled) {
        setHasScrolled(true);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasScrolled]);

  useEffect(() => {
    // Load HeyGen interactive avatar script with proper React integration
    const loadInteractiveAvatar = () => {
      const container = avatarContainerRef.current;
      if (container && !isAvatarLoaded && !iframeRef.current) {
        // Create the iframe using React-friendly approach
        const iframe = document.createElement("iframe");
        iframe.src = "https://labs.heygen.com/guest/streaming-embed?share=eyJxdWFsaXR5IjoiaGlnaCIsImF2YXRhck5hbWUiOiIwYjNmNjRhMDFhMDg0NDdmOTg1MmE5YWFj%0D%0AZTIwZTk0ZiIsInByZXZpZXdJbWciOiJodHRwczovL2ZpbGVzMi5oZXlnZW4uYWkvYXZhdGFyL3Yz%0D%0ALzBiM2Y2NGEwMWEwODQ0N2Y5ODUyYTlhYWNlMjBlOTRmL2Z1bGwvMi4yL3ByZXZpZXdfdGFyZ2V0%0D%0ALndlYnAiLCJuZWVkUmVtb3ZlQmFja2dyb3VuZCI6ZmFsc2UsImtub3dsZWRnZUJhc2VJZCI6ImYz%0D%0ANWI1ODVjYWZlYTQyODhhZDAyMTQwZmM1N2ViYmQyIiwidXNlcm5hbWUiOiI3NzE5NjU3MGRiZjE0%0D%0AYTQ1ODk1YTU1YmE0OTQ3NzM4ZCJ9&inIFrame=1";
        iframe.width = "100%";
        iframe.height = "100%";
        iframe.style.border = "none";
        iframe.style.borderRadius = "12px";
        iframe.style.minHeight = "400px";
        iframe.allowFullscreen = true;
        iframe.allow = "microphone; camera";
        iframe.title = "Interactive Avatar Demo";
        
        // Add loading handler
        iframe.onload = () => {
          setIsAvatarLoaded(true);
        };
        
        // Store iframe reference for cleanup
        iframeRef.current = iframe;
        
        // Append iframe to container
        container.appendChild(iframe);
      }
    };

    // Delay loading to ensure DOM is ready
    timerRef.current = setTimeout(loadInteractiveAvatar, 1000);

    // Cleanup function to prevent memory leaks and DOM conflicts
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      
      if (iframeRef.current && avatarContainerRef.current) {
        try {
          // Safely remove iframe if it exists and is still a child
          if (avatarContainerRef.current.contains(iframeRef.current)) {
            avatarContainerRef.current.removeChild(iframeRef.current);
          }
        } catch (error) {
          // Silently handle removal errors
          console.warn('Avatar iframe cleanup handled gracefully');
        }
        iframeRef.current = null;
      }
    };
  }, []); // Remove isAvatarLoaded from dependencies to prevent loops

  const validateForm = (): boolean => {
    const errors: FormErrors = {};

    if (!formData.name.trim()) {
      errors.name = "Name is required";
    }

    if (!formData.company.trim()) {
      errors.company = "Company is required";
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!formData.role.trim()) {
      errors.role = "Role is required";
    }

    if (!formData.preferredTime) {
      errors.preferredTime = "Preferred time is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsFormSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setIsFormSubmitted(true);
      toast.success("Demo booked successfully! We'll be in touch soon.", {
        duration: 5000
      });

      // Reset form after a delay
      setTimeout(() => {
        setIsBookingModalOpen(false);
        setIsFormSubmitted(false);
        setFormData({
          name: "",
          company: "",
          email: "",
          role: "",
          preferredTime: "",
          message: ""
        });
        setFormErrors({});
      }, 2000);
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsFormSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  const handleSecondaryAction = () => {
    const servicesSection = document.getElementById("services");
    if (servicesSection) {
      scrollToSection("services");
    }
  };

  return (
    <div className="relative min-h-screen bg-background">
      {/* Enhanced Background Gradient Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-gradient-to-bl from-secondary/20 to-primary/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-gradient-to-tr from-primary/10 to-secondary/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Enhanced Navigation */}
      <nav className="relative z-50 bg-background/90 backdrop-blur-xl border-b border-border/50 sticky top-0 shadow-lg shadow-background/10">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo - Now Clickable */}
            <div className="flex items-center">
              <a 
                href="https://tlapartners.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="transition-transform duration-300 hover:scale-105"
              >
                <img 
                  src="https://i.ibb.co.com/cSjfp3tZ/Untitled-design-3-1.png" 
                  alt="ToughLoveTech Logo" 
                  className="h-10 w-auto"
                />
              </a>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => scrollToSection("services")}
                className="text-muted-foreground hover:text-primary transition-all duration-300 font-medium relative group"
                aria-label="Navigate to Services section"
              >
                Services
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary transition-all duration-300 group-hover:w-full"></span>
              </button>
              <button
                onClick={() => scrollToSection("how-it-works")}
                className="text-muted-foreground hover:text-primary transition-all duration-300 font-medium relative group"
                aria-label="Navigate to How It Works section"
              >
                How It Works
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary transition-all duration-300 group-hover:w-full"></span>
              </button>
              <button
                onClick={() => scrollToSection("pricing")}
                className="text-muted-foreground hover:text-primary transition-all duration-300 font-medium relative group"
                aria-label="Navigate to Pricing section"
              >
                Pricing
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary transition-all duration-300 group-hover:w-full"></span>
              </button>
              <a
                href="https://tlapartners.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-all duration-300 font-medium relative group"
                aria-label="About Us"
              >
                About Us
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary transition-all duration-300 group-hover:w-full"></span>
              </a>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-muted-foreground hover:text-primary transition-all duration-300 font-medium relative group"
                aria-label="Navigate to Contact section"
              >
                Contact
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary transition-all duration-300 group-hover:w-full"></span>
              </button>
              <Button
                onClick={() => setIsBookingModalOpen(true)}
                className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-semibold px-8 py-2.5 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/25"
                aria-label="Book a demo"
              >
                Book a Demo
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors duration-200"
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileMenuOpen}
            >
              <Navigation className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-border shadow-xl">
            <div className="container mx-auto px-6 py-6 space-y-4">
              <button
                onClick={() => scrollToSection("services")}
                className="block w-full text-left text-muted-foreground hover:text-foreground transition-colors duration-200 py-3 font-medium"
                aria-label="Navigate to Services section"
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection("how-it-works")}
                className="block w-full text-left text-muted-foreground hover:text-foreground transition-colors duration-200 py-3 font-medium"
                aria-label="Navigate to How It Works section"
              >
                How It Works
              </button>
              <button
                onClick={() => scrollToSection("pricing")}
                className="block w-full text-left text-muted-foreground hover:text-foreground transition-colors duration-200 py-3 font-medium"
                aria-label="Navigate to Pricing section"
              >
                Pricing
              </button>
              <a
                href="https://tlapartners.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-left text-muted-foreground hover:text-foreground transition-colors duration-200 py-3 font-medium"
                aria-label="About Us"
              >
                About Us
              </a>
              <button
                onClick={() => scrollToSection("contact")}
                className="block w-full text-left text-muted-foreground hover:text-foreground transition-colors duration-200 py-3 font-medium"
                aria-label="Navigate to Contact section"
              >
                Contact
              </button>
              <Button
                onClick={() => {
                  setIsBookingModalOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 shadow-lg"
                aria-label="Book a demo"
              >
                Book a Demo
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* Enhanced Hero Section */}
      <div id="book-demo" className="relative z-10 container mx-auto px-6 pt-12 pb-16">
        <div className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center transition-all duration-1000 ${hasScrolled ? 'opacity-100 transform translate-y-0' : 'opacity-90 transform translate-y-4'}`}>
          {/* Left Column - Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-heading font-bold leading-tight">
                <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent animate-pulse">
                  Your Digital Twin,
                </span>
                <br />
                <span className="text-foreground">Ready for Business.</span>
              </h1>
              
              <p className="text-xl sm:text-2xl text-muted-foreground leading-relaxed max-w-lg font-medium">
                Transform your video content with AI-powered interactive avatars that engage customers in real-time conversations and drive measurable results.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 items-start">
              <Button
                onClick={() => setIsBookingModalOpen(true)}
                size="lg"
                className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-bold px-10 py-5 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/30 text-lg"
                aria-label="Book a free demo"
              >
                Book a Free Demo
              </Button>
              
              <button
                onClick={handleSecondaryAction}
                className="text-primary hover:text-primary/80 font-semibold transition-all duration-300 underline decoration-primary/30 hover:decoration-primary/60 underline-offset-4 text-lg group"
                aria-label="See our avatars in action"
              >
                See Our Avatars in Action
                <span className="inline-block transition-transform group-hover:translate-x-1 ml-1">→</span>
              </button>
            </div>
          </div>

          {/* Right Column - Interactive Avatar Demo */}
          <div className="relative">
            <div className="relative bg-surface-1 rounded-3xl overflow-hidden shadow-2xl border-2 border-primary/20 hover:shadow-3xl hover:shadow-primary/20 transition-all duration-500">
              <div className="aspect-video bg-gradient-to-br from-surface-2 to-surface-1 relative group min-h-[400px]">
                {/* Interactive Avatar Container - Using Ref for React-friendly approach */}
                <div 
                  ref={avatarContainerRef}
                  className="w-full h-full bg-gradient-to-br from-primary/5 to-secondary/5 rounded-t-3xl overflow-hidden relative"
                >
                  {/* Loading state - shows until avatar loads */}
                  {!isAvatarLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
                      <div className="text-center space-y-4">
                        <div className="w-20 h-20 mx-auto bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center animate-pulse">
                          <Play className="h-10 w-10 text-white fill-current" />
                        </div>
                        <p className="text-sm font-medium text-muted-foreground">Loading Interactive Avatar...</p>
                        <div className="flex items-center justify-center space-x-1">
                          <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-secondary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="p-6 bg-gradient-to-r from-surface-2/80 to-surface-1/80 backdrop-blur-sm border-t border-primary/10">
                <div className="text-center">
                  <h3 className="text-lg font-bold text-foreground mb-2">Interactive Avatar Demo</h3>
                  <p className="text-sm text-muted-foreground font-medium">Experience real-time conversation with our AI avatar</p>
                </div>
              </div>
            </div>
            
            {/* Floating Enhancement Elements */}
            <div className="absolute -top-4 -right-4 bg-gradient-to-r from-primary to-secondary text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg animate-bounce">
              🎙️ Live Chat
            </div>
            <div className="absolute -bottom-4 -left-4 bg-gradient-to-r from-secondary to-primary text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
              ⚡ Real-time AI
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      <Dialog open={isBookingModalOpen} onOpenChange={setIsBookingModalOpen}>
        <DialogContent className="sm:max-w-md bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-xl font-heading font-semibold text-foreground">
              {isFormSubmitted ? "Demo Booked!" : "Book Your Free Demo"}
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              {isFormSubmitted 
                ? "Thank you! We'll be in touch within 24 hours to schedule your personalized demo."
                : "Tell us about your business and we'll show you how interactive avatars can transform your customer engagement."
              }
            </DialogDescription>
          </DialogHeader>

          {!isFormSubmitted ? (
            <form onSubmit={handleFormSubmit} className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium text-foreground">
                    Name *
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className={`bg-surface-1 border-border text-foreground ${formErrors.name ? 'border-destructive' : ''}`}
                    placeholder="Your full name"
                    disabled={isFormSubmitting}
                    aria-describedby={formErrors.name ? "name-error" : undefined}
                  />
                  {formErrors.name && (
                    <p id="name-error" className="text-xs text-destructive">{formErrors.name}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company" className="text-sm font-medium text-foreground">
                    Company *
                  </Label>
                  <Input
                    id="company"
                    type="text"
                    value={formData.company}
                    onChange={(e) => handleInputChange("company", e.target.value)}
                    className={`bg-surface-1 border-border text-foreground ${formErrors.company ? 'border-destructive' : ''}`}
                    placeholder="Company name"
                    disabled={isFormSubmitting}
                    aria-describedby={formErrors.company ? "company-error" : undefined}
                  />
                  {formErrors.company && (
                    <p id="company-error" className="text-xs text-destructive">{formErrors.company}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-foreground">
                  Email *
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className={`bg-surface-1 border-border text-foreground ${formErrors.email ? 'border-destructive' : ''}`}
                  placeholder="your.email@company.com"
                  disabled={isFormSubmitting}
                  aria-describedby={formErrors.email ? "email-error" : undefined}
                />
                {formErrors.email && (
                  <p id="email-error" className="text-xs text-destructive">{formErrors.email}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="role" className="text-sm font-medium text-foreground">
                    Your Role *
                  </Label>
                  <Input
                    id="role"
                    type="text"
                    value={formData.role}
                    onChange={(e) => handleInputChange("role", e.target.value)}
                    className={`bg-surface-1 border-border text-foreground ${formErrors.role ? 'border-destructive' : ''}`}
                    placeholder="e.g. Marketing Director"
                    disabled={isFormSubmitting}
                    aria-describedby={formErrors.role ? "role-error" : undefined}
                  />
                  {formErrors.role && (
                    <p id="role-error" className="text-xs text-destructive">{formErrors.role}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="preferredTime" className="text-sm font-medium text-foreground">
                    Preferred Time *
                  </Label>
                  <Select
                    value={formData.preferredTime}
                    onValueChange={(value) => handleInputChange("preferredTime", value)}
                    disabled={isFormSubmitting}
                  >
                    <SelectTrigger className={`bg-surface-1 border-border text-foreground ${formErrors.preferredTime ? 'border-destructive' : ''}`}>
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border">
                      <SelectItem value="morning">Morning (9-12 PM)</SelectItem>
                      <SelectItem value="afternoon">Afternoon (12-5 PM)</SelectItem>
                      <SelectItem value="evening">Evening (5-8 PM)</SelectItem>
                      <SelectItem value="flexible">I'm flexible</SelectItem>
                    </SelectContent>
                  </Select>
                  {formErrors.preferredTime && (
                    <p className="text-xs text-destructive">{formErrors.preferredTime}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-sm font-medium text-foreground">
                  Tell us about your needs (optional)
                </Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  className="bg-surface-1 border-border text-foreground min-h-[80px]"
                  placeholder="What would you like to accomplish with interactive avatars?"
                  disabled={isFormSubmitting}
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsBookingModalOpen(false)}
                  disabled={isFormSubmitting}
                  className="flex-1 border-border text-foreground hover:bg-surface-1"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isFormSubmitting}
                  className="flex-1 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white"
                >
                  {isFormSubmitting ? "Booking..." : "Book Demo"}
                </Button>
              </div>
            </form>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-muted-foreground">
                Check your email for confirmation details.
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}