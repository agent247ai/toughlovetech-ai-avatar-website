"use client";

import { motion } from "motion/react";
import { AlertTriangle, ArrowRight, MessageSquare, TrendingUp, Users, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ProblemSolution() {
  const scrollToServices = () => {
    const servicesSection = document.getElementById("services");
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="py-16 bg-gradient-to-b from-background to-surface-1">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-destructive/10 to-primary/10 border border-destructive/20 mb-6">
            <AlertTriangle className="w-4 h-4 text-destructive" />
            <span className="text-sm font-bold text-destructive">
              The Problem with Traditional Video
            </span>
          </div>
          <h2 className="text-5xl font-bold text-foreground mb-6 font-heading">
            Go Beyond Passive Video
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Standard videos talk at your audience. Engagement drops, and the message gets lost.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto items-center">
          {/* Problem Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="bg-gradient-to-br from-destructive/5 to-destructive/10 rounded-2xl p-8 border-2 border-destructive/20">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-xl bg-destructive/20">
                  <AlertTriangle className="w-8 h-8 text-destructive" />
                </div>
                <h3 className="text-2xl font-bold text-foreground font-heading">Traditional Video Problems</h3>
              </div>
              
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-destructive rounded-full mt-2 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-foreground">One-Way Communication</p>
                    <p className="text-muted-foreground text-sm">Viewers can't ask questions or interact</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-destructive rounded-full mt-2 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-foreground">Dropping Engagement</p>
                    <p className="text-muted-foreground text-sm">Attention spans decrease over time</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-destructive rounded-full mt-2 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-foreground">Limited Scalability</p>
                    <p className="text-muted-foreground text-sm">Can't handle personalized experiences</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-destructive rounded-full mt-2 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-foreground">No Real-Time Support</p>
                    <p className="text-muted-foreground text-sm">Unable to assist viewers instantly</p>
                  </div>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Solution Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="bg-gradient-to-br from-primary/5 to-secondary/10 rounded-2xl p-8 border-2 border-primary/20 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5" />
              
              <div className="flex items-center gap-4 mb-6 relative">
                <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20">
                  <Sparkles className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground font-heading">Interactive Avatar Solution</h3>
              </div>
              
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed relative">
                Our AI avatars create two-way conversations. Imagine a spokesperson who can answer questions, 
                a trainer who can quiz employees, or a sales rep who works 24/7. That's the power of an interactive digital twin.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-6 relative">
                <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-4 border border-primary/20">
                  <MessageSquare className="w-6 h-6 text-primary mb-2" />
                  <p className="font-semibold text-foreground text-sm">Real-Time Chat</p>
                  <p className="text-xs text-muted-foreground">Instant responses</p>
                </div>
                <div className="bg-gradient-to-r from-secondary/10 to-primary/10 rounded-lg p-4 border border-secondary/20">
                  <TrendingUp className="w-6 h-6 text-secondary mb-2" />
                  <p className="font-semibold text-foreground text-sm">Higher Engagement</p>
                  <p className="text-xs text-muted-foreground">3x longer sessions</p>
                </div>
                <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-4 border border-primary/20">
                  <Users className="w-6 h-6 text-primary mb-2" />
                  <p className="font-semibold text-foreground text-sm">Scalable Support</p>
                  <p className="text-xs text-muted-foreground">24/7 availability</p>
                </div>
                <div className="bg-gradient-to-r from-secondary/10 to-primary/10 rounded-lg p-4 border border-secondary/20">
                  <ArrowRight className="w-6 h-6 text-secondary mb-2" />
                  <p className="font-semibold text-foreground text-sm">Lead Conversion</p>
                  <p className="text-xs text-muted-foreground">Qualify prospects</p>
                </div>
              </div>

              <Button 
                onClick={scrollToServices}
                className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-bold py-3 rounded-xl hover:scale-105 hover:shadow-xl hover:shadow-primary/25 transition-all duration-300 relative"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Explore Interactive Solutions
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Key Benefits Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 grid md:grid-cols-3 gap-8 max-w-4xl mx-auto"
        >
          <div className="text-center p-6 bg-gradient-to-b from-surface-1 to-surface-2 rounded-xl border border-primary/10">
            <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
            <h4 className="font-bold text-foreground mb-2">Two-Way Interaction</h4>
            <p className="text-sm text-muted-foreground">
              Engage in real conversations, not just one-way presentations
            </p>
          </div>

          <div className="text-center p-6 bg-gradient-to-b from-surface-1 to-surface-2 rounded-xl border border-secondary/10">
            <div className="w-12 h-12 bg-gradient-to-r from-secondary to-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <h4 className="font-bold text-foreground mb-2">Measurable Results</h4>
            <p className="text-sm text-muted-foreground">
              Track engagement, conversions, and customer satisfaction
            </p>
          </div>

          <div className="text-center p-6 bg-gradient-to-b from-surface-1 to-surface-2 rounded-xl border border-primary/10">
            <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h4 className="font-bold text-foreground mb-2">Scale Infinitely</h4>
            <p className="text-sm text-muted-foreground">
              Handle thousands of simultaneous conversations
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}