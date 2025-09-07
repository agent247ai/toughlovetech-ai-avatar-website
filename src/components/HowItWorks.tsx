"use client";

import { motion } from "motion/react";
import { Video, Upload, Wand2, Rocket, CheckCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface StepProps {
  number: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  details: string[];
  isLast?: boolean;
}

const Step = ({ number, icon, title, description, details, isLast }: StepProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: number * 0.1 }}
      className="relative group"
    >
      {/* Connecting Line */}
      {!isLast && (
        <div className="hidden lg:block absolute top-16 left-1/2 w-full h-0.5 bg-gradient-to-r from-primary via-secondary to-primary transform translate-x-4 z-0">
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: (number * 0.1) + 0.3 }}
            className="h-full bg-gradient-to-r from-primary to-secondary origin-left"
          />
        </div>
      )}

      {/* Step Card */}
      <div className="relative bg-gradient-to-b from-card to-surface-1 rounded-2xl p-8 border-2 border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 group-hover:scale-105">
        {/* Step Number */}
        <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center shadow-lg">
          <span className="text-white font-bold text-lg">{number}</span>
        </div>

        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="p-4 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/30">
            {icon}
          </div>
        </div>

        {/* Content */}
        <div className="text-center space-y-4">
          <h3 className="text-2xl font-bold text-foreground font-heading">{title}</h3>
          <p className="text-lg text-muted-foreground leading-relaxed">{description}</p>
          
          {/* Details List */}
          <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl p-4 border border-primary/10">
            <ul className="space-y-2 text-sm">
              {details.map((detail, index) => (
                <li key={index} className="flex items-center gap-2 text-muted-foreground">
                  <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="font-medium">{detail}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function HowItWorks() {
  const steps = [
    {
      number: 1,
      icon: <Video className="w-10 h-10 text-primary" />,
      title: "Record Your Footage",
      description: "Follow our simple guide to record a 2-3 minute video using any camera or smartphone.",
      details: [
        "No fancy equipment needed",
        "Simple lighting setup guide included",
        "Multiple takes allowed",
        "Quality tips provided"
      ]
    },
    {
      number: 2,
      icon: <Upload className="w-10 h-10 text-primary" />,
      title: "Submit Securely",
      description: "Upload your video to our secure platform with enterprise-grade encryption.",
      details: [
        "Bank-level security",
        "Progress tracking",
        "Automatic backup",
        "GDPR compliant"
      ]
    },
    {
      number: 3,
      icon: <Wand2 className="w-10 h-10 text-primary" />,
      title: "We Build Your Twin",
      description: "Our advanced AI analyzes and captures your unique voice, expressions, and mannerisms.",
      details: [
        "Voice cloning technology",
        "Facial expression mapping",
        "Gesture recognition",
        "Quality assurance testing"
      ]
    },
    {
      number: 4,
      icon: <Rocket className="w-10 h-10 text-primary" />,
      title: "Deploy Your Avatar",
      description: "Receive your production-ready AI avatar with full commercial rights and integration support.",
      details: [
        "Multiple format exports",
        "API access included",
        "Integration documentation",
        "Lifetime commercial license"
      ]
    }
  ];

  const handleStartSetup = () => {
    const pricingSection = document.getElementById("pricing");
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="py-16 bg-gradient-to-b from-surface-1 to-background">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Simple Process
            </span>
          </div>
          <h2 className="text-5xl font-bold text-foreground mb-6 font-heading">
            How It Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Get your AI avatar up and running in just four simple steps. From recording to deployment, we handle the complexity.
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 max-w-7xl mx-auto mb-16">
          {steps.map((step, index) => (
            <Step
              key={step.number}
              number={step.number}
              icon={step.icon}
              title={step.title}
              description={step.description}
              details={step.details}
              isLast={index === steps.length - 1}
            />
          ))}
        </div>

        {/* Timeline Visual for Mobile */}
        <div className="lg:hidden max-w-md mx-auto mb-16">
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary to-secondary"></div>
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative flex items-center mb-8"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold shadow-lg z-10">
                  {step.number}
                </div>
                <div className="ml-6 bg-gradient-to-b from-card to-surface-1 rounded-xl p-4 border-2 border-primary/20 flex-1">
                  <h4 className="font-bold text-foreground mb-1">{step.title}</h4>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-card via-surface-1 to-card rounded-2xl p-8 border-2 border-primary/20 max-w-2xl mx-auto shadow-2xl">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Rocket className="w-6 h-6 text-primary" />
              <h3 className="text-2xl font-bold text-foreground font-heading">Ready to Get Started?</h3>
            </div>
            <p className="text-muted-foreground mb-6 text-lg">
              Join hundreds of businesses already using AI avatars to transform their customer engagement.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={handleStartSetup}
                className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-bold px-8 py-3 rounded-xl hover:scale-105 hover:shadow-xl hover:shadow-primary/25 transition-all duration-300"
              >
                <Rocket className="w-4 h-4 mr-2" />
                Start Avatar Setup - $299
              </Button>
              <Button 
                variant="outline" 
                className="border-2 border-primary/30 hover:bg-primary/10 text-foreground font-semibold px-8 py-3 rounded-xl transition-all duration-300"
                onClick={() => {
                  const servicesSection = document.getElementById("services");
                  if (servicesSection) {
                    servicesSection.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                View Sample Videos
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 grid md:grid-cols-3 gap-8 max-w-4xl mx-auto"
        >
          <div className="text-center p-6 bg-gradient-to-b from-surface-1 to-surface-2 rounded-xl border border-primary/10">
            <div className="text-3xl font-bold text-primary mb-2">48-72h</div>
            <div className="text-sm text-muted-foreground font-medium">Average Delivery Time</div>
          </div>
          <div className="text-center p-6 bg-gradient-to-b from-surface-1 to-surface-2 rounded-xl border border-secondary/10">
            <div className="text-3xl font-bold text-secondary mb-2">99.9%</div>
            <div className="text-sm text-muted-foreground font-medium">Accuracy Rate</div>
          </div>
          <div className="text-center p-6 bg-gradient-to-b from-surface-1 to-surface-2 rounded-xl border border-primary/10">
            <div className="text-3xl font-bold text-primary mb-2">500+</div>
            <div className="text-sm text-muted-foreground font-medium">Avatars Created</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}