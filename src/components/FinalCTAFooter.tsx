"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Rocket, 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Youtube,
  Sparkles,
  ArrowRight
} from "lucide-react";
import { toast } from "sonner";

interface ContactFormData {
  name: string;
  company: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

interface FormErrors {
  [key: string]: string;
}

export default function FinalCTAFooter() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [contactForm, setContactForm] = useState<ContactFormData>({
    name: "",
    company: "",
    email: "",
    phone: "",
    service: "",
    message: ""
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const errors: FormErrors = {};

    if (!contactForm.name.trim()) {
      errors.name = "Name is required";
    }

    if (!contactForm.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactForm.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!contactForm.service) {
      errors.service = "Please select a service";
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
      toast.success("Contact request sent! We'll be in touch within 24 hours.", {
        duration: 5000
      });

      // Reset form after a delay
      setTimeout(() => {
        setIsContactModalOpen(false);
        setIsFormSubmitted(false);
        setContactForm({
          name: "",
          company: "",
          email: "",
          phone: "",
          service: "",
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

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setContactForm(prev => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="bg-gradient-to-b from-background to-surface-1">
      {/* Final CTA Section */}
      <div className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 mb-8">
              <Rocket className="w-4 h-4 text-primary" />
              <span className="text-sm font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Ready to Transform?
              </span>
            </div>
            
            <h2 className="text-5xl font-bold text-foreground mb-6 font-heading">
              Ready to Build Your Digital Twin?
            </h2>
            
            <p className="text-xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed">
              Schedule a free, no-obligation demo with our team. We'll show you how ToughLoveTech can transform 
              your video strategy and help you scale your communications.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button
                onClick={() => setIsContactModalOpen(true)}
                size="lg"
                className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-bold px-10 py-5 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/30 text-lg"
              >
                <Rocket className="w-5 h-5 mr-2" />
                Book a Free Demo
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              
              <Button
                onClick={scrollToTop}
                variant="outline"
                size="lg"
                className="border-2 border-primary/30 hover:bg-primary/10 text-foreground font-semibold px-10 py-5 rounded-xl transition-all duration-300"
              >
                Try Interactive Avatar
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-b from-surface-1 to-surface-2 border-t-2 border-primary/20">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-6">
              <div>
                <a 
                  href="https://tlapartners.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block transition-transform duration-300 hover:scale-105"
                >
                  <img 
                    src="https://i.ibb.co.com/cSjfp3tZ/Untitled-design-3-1.png" 
                    alt="ToughLoveTech Logo" 
                    className="h-12 w-auto"
                  />
                </a>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Transforming businesses with AI-powered interactive avatars that engage, convert, and scale.
              </p>
              <div className="flex space-x-4">
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full flex items-center justify-center text-primary hover:from-primary hover:to-secondary hover:text-white transition-all duration-300 hover:scale-110"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a 
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full flex items-center justify-center text-primary hover:from-primary hover:to-secondary hover:text-white transition-all duration-300 hover:scale-110"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full flex items-center justify-center text-primary hover:from-primary hover:to-secondary hover:text-white transition-all duration-300 hover:scale-110"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a 
                  href="https://youtube.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full flex items-center justify-center text-primary hover:from-primary hover:to-secondary hover:text-white transition-all duration-300 hover:scale-110"
                >
                  <Youtube className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-bold text-foreground mb-6 text-lg">Services</h4>
              <ul className="space-y-3">
                <li>
                  <button 
                    onClick={() => {
                      const servicesSection = document.getElementById("services");
                      if (servicesSection) {
                        servicesSection.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300 font-medium"
                  >
                    Static Avatars
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => {
                      const servicesSection = document.getElementById("services");
                      if (servicesSection) {
                        servicesSection.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300 font-medium"
                  >
                    Motion Avatars
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => {
                      const servicesSection = document.getElementById("services");
                      if (servicesSection) {
                        servicesSection.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300 font-medium"
                  >
                    Interactive Avatars
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => {
                      const pricingSection = document.getElementById("pricing");
                      if (pricingSection) {
                        pricingSection.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300 font-medium"
                  >
                    Avatar Setup
                  </button>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-bold text-foreground mb-6 text-lg">Company</h4>
              <ul className="space-y-3">
                <li>
                  <a 
                    href="https://tlapartners.com/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors duration-300 font-medium"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <button 
                    onClick={() => {
                      const howItWorksSection = document.getElementById("how-it-works");
                      if (howItWorksSection) {
                        howItWorksSection.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300 font-medium"
                  >
                    How It Works
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setIsContactModalOpen(true)}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300 font-medium"
                  >
                    Contact Us
                  </button>
                </li>
                <li>
                  <a 
                    href="https://tlapartners.com/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors duration-300 font-medium"
                  >
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="font-bold text-foreground mb-6 text-lg">Contact Info</h4>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center">
                    <Mail className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-muted-foreground font-medium">hello@toughlovtech.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center">
                    <Phone className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-muted-foreground font-medium">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-muted-foreground font-medium">San Francisco, CA</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-8 border-t border-border/50">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-muted-foreground text-sm">
                © 2024 ToughLoveTech. All rights reserved.
              </p>
              <div className="flex items-center gap-6">
                <a 
                  href="https://tlapartners.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm font-medium"
                >
                  Terms of Service
                </a>
                <a 
                  href="https://tlapartners.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm font-medium"
                >
                  Privacy Policy
                </a>
                <button 
                  onClick={() => setIsContactModalOpen(true)}
                  className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm font-medium"
                >
                  Support
                </button>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Contact Modal */}
      <Dialog open={isContactModalOpen} onOpenChange={setIsContactModalOpen}>
        <DialogContent className="sm:max-w-lg bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-xl font-heading font-semibold text-foreground flex items-center gap-2">
              {isFormSubmitted ? (
                <>
                  <Sparkles className="w-5 h-5 text-primary" />
                  Request Sent!
                </>
              ) : (
                <>
                  <Mail className="w-5 h-5 text-primary" />
                  Get in Touch
                </>
              )}
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              {isFormSubmitted 
                ? "Thank you for your interest! We'll be in touch within 24 hours to discuss your project."
                : "Ready to transform your business with AI avatars? Let's discuss your specific needs and goals."
              }
            </DialogDescription>
          </DialogHeader>

          {!isFormSubmitted ? (
            <form onSubmit={handleFormSubmit} className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contact-name" className="text-sm font-medium text-foreground">
                    Name *
                  </Label>
                  <Input
                    id="contact-name"
                    type="text"
                    value={contactForm.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className={`bg-surface-1 border-border text-foreground ${formErrors.name ? 'border-destructive' : ''}`}
                    placeholder="Your full name"
                    disabled={isFormSubmitting}
                  />
                  {formErrors.name && (
                    <p className="text-xs text-destructive">{formErrors.name}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact-company" className="text-sm font-medium text-foreground">
                    Company
                  </Label>
                  <Input
                    id="contact-company"
                    type="text"
                    value={contactForm.company}
                    onChange={(e) => handleInputChange("company", e.target.value)}
                    className="bg-surface-1 border-border text-foreground"
                    placeholder="Company name"
                    disabled={isFormSubmitting}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contact-email" className="text-sm font-medium text-foreground">
                    Email *
                  </Label>
                  <Input
                    id="contact-email"
                    type="email"
                    value={contactForm.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className={`bg-surface-1 border-border text-foreground ${formErrors.email ? 'border-destructive' : ''}`}
                    placeholder="your.email@company.com"
                    disabled={isFormSubmitting}
                  />
                  {formErrors.email && (
                    <p className="text-xs text-destructive">{formErrors.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact-phone" className="text-sm font-medium text-foreground">
                    Phone
                  </Label>
                  <Input
                    id="contact-phone"
                    type="tel"
                    value={contactForm.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="bg-surface-1 border-border text-foreground"
                    placeholder="+1 (555) 123-4567"
                    disabled={isFormSubmitting}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact-service" className="text-sm font-medium text-foreground">
                  Service Interest *
                </Label>
                <Select
                  value={contactForm.service}
                  onValueChange={(value) => handleInputChange("service", value)}
                  disabled={isFormSubmitting}
                >
                  <SelectTrigger className={`bg-surface-1 border-border text-foreground ${formErrors.service ? 'border-destructive' : ''}`}>
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    <SelectItem value="static">Static Avatars</SelectItem>
                    <SelectItem value="motion">Motion Avatars</SelectItem>
                    <SelectItem value="interactive">Interactive Avatars</SelectItem>
                    <SelectItem value="setup">Avatar Setup</SelectItem>
                    <SelectItem value="consultation">General Consultation</SelectItem>
                  </SelectContent>
                </Select>
                {formErrors.service && (
                  <p className="text-xs text-destructive">{formErrors.service}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact-message" className="text-sm font-medium text-foreground">
                  Project Details
                </Label>
                <Textarea
                  id="contact-message"
                  value={contactForm.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  className="bg-surface-1 border-border text-foreground min-h-[100px]"
                  placeholder="Tell us about your project goals, timeline, and any specific requirements..."
                  disabled={isFormSubmitting}
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsContactModalOpen(false)}
                  disabled={isFormSubmitting}
                  className="flex-1 border-2 border-primary/30 text-foreground hover:bg-primary/10"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isFormSubmitting}
                  className="flex-1 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white"
                >
                  {isFormSubmitting ? "Sending..." : "Send Message"}
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
                We'll review your request and get back to you with a custom proposal.
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}