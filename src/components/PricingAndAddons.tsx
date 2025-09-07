"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { 
  CircleDollarSign, 
  CreditCard, 
  Video, 
  SquareUser, 
  Presentation, 
  NotebookTabs,
  CircleUserRound,
  Component,
  FlipVertical,
  Play,
  Sparkles
} from "lucide-react";

interface ContactFormData {
  name: string;
  email: string;
  company: string;
  requirements: string;
}

export default function PricingAndAddons() {
  const [activeTab, setActiveTab] = useState("one-time");
  const [flippedCard, setFlippedCard] = useState<string | null>(null);
  const [showContactDialog, setShowContactDialog] = useState(false);
  const [contactForm, setContactForm] = useState<ContactFormData>({
    name: "",
    email: "",
    company: "",
    requirements: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCardFlip = (cardId: string) => {
    setFlippedCard(flippedCard === cardId ? null : cardId);
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast.success("Contact request sent! We'll get back to you within 24 hours.");
    setShowContactDialog(false);
    setContactForm({ name: "", email: "", company: "", requirements: "" });
    setIsSubmitting(false);
  };

  const handleBuyClick = (product: string) => {
    toast.success(`Added ${product} to cart! Redirecting to checkout...`);
  };

  return (
    <section className="py-16 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Pricing Plans
            </span>
          </div>
          <h2 className="text-5xl font-bold text-foreground mb-6 font-heading">
            Choose Your Plan
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Transparent pricing with no hidden fees. Start with our one-time avatar setup, then choose the plan that fits your needs.
          </p>
        </motion.div>

        {/* One-Time Setup Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <Card className="border-2 border-primary/30 bg-gradient-to-r from-card via-surface-1 to-card relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-secondary/10" />
            <CardContent className="p-8 relative">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20">
                      <CircleUserRound className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-heading font-bold text-foreground">One-Time Avatar Setup</h2>
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-bold text-primary">$299</span>
                        <span className="text-sm text-muted-foreground">(Required first step)</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-lg font-medium">
                    Creates your reusable Digital Twin — the foundation for all video services
                  </p>
                </div>
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-bold px-10 py-4 rounded-xl hover:scale-105 hover:shadow-xl hover:shadow-primary/25 transition-all duration-300"
                  onClick={() => handleBuyClick("Avatar Setup")}
                >
                  <CircleUserRound className="w-5 h-5 mr-2" />
                  Start Setup
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Tabbed Pricing Interface */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-card border-2 border-primary/20 rounded-xl p-2 mb-8 shadow-lg">
              <TabsTrigger 
                value="one-time" 
                className="flex items-center gap-2 rounded-lg font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-white"
              >
                <Video className="w-4 h-4" />
                One-Time Videos
              </TabsTrigger>
              <TabsTrigger 
                value="monthly" 
                className="flex items-center gap-2 rounded-lg font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-white"
              >
                <NotebookTabs className="w-4 h-4" />
                Monthly Subscriptions
              </TabsTrigger>
              <TabsTrigger 
                value="interactive" 
                className="flex items-center gap-2 rounded-lg font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-white"
              >
                <Component className="w-4 h-4" />
                Interactive Avatars
              </TabsTrigger>
            </TabsList>

            <AnimatePresence mode="wait">
              <TabsContent value="one-time" className="mt-8">
                <motion.div
                  key="one-time"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="grid md:grid-cols-2 gap-8"
                >
                  {/* Static Avatar Video Card */}
                  <div className="relative h-full">
                    <motion.div
                      className="h-full cursor-pointer"
                      style={{ transformStyle: "preserve-3d" }}
                      animate={{ rotateY: flippedCard === "static-video" ? 180 : 0 }}
                      transition={{ duration: 0.6 }}
                      onClick={() => handleCardFlip("static-video")}
                    >
                      <Card className="absolute inset-0 backface-hidden border-2 border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-2xl bg-gradient-to-b from-card to-surface-1">
                        <CardHeader className="pb-4">
                          <CardTitle className="flex items-center justify-between text-2xl text-foreground">
                            <div className="flex items-center gap-3">
                              <div className="p-2 rounded-lg bg-gradient-to-r from-primary/20 to-secondary/20">
                                <Video className="w-5 h-5 text-primary" />
                              </div>
                              Static Avatar Video
                            </div>
                            <FlipVertical className="w-5 h-5 text-muted-foreground" />
                          </CardTitle>
                          <div className="flex items-baseline gap-2">
                            <div className="text-4xl font-bold text-primary">$599</div>
                            <div className="text-sm text-muted-foreground">per video</div>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg p-4 border border-primary/10">
                            <p className="text-sm font-medium text-muted-foreground mb-3">Perfect for:</p>
                            <ul className="space-y-2 text-sm">
                              <li className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                                <span className="text-foreground">Professional presentations</span>
                              </li>
                              <li className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                                <span className="text-foreground">Marketing announcements</span>
                              </li>
                              <li className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                                <span className="text-foreground">Training content</span>
                              </li>
                              <li className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                                <span className="text-foreground">Social media videos</span>
                              </li>
                            </ul>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground font-medium">Delivery Time:</span>
                            <span className="text-primary font-bold">48 hours</span>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button 
                            className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-semibold py-3 rounded-xl hover:shadow-lg transition-all duration-300" 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleBuyClick("Static Avatar Video");
                            }}
                          >
                            <Play className="w-4 h-4 mr-2" />
                            Order Now
                          </Button>
                        </CardFooter>
                      </Card>
                      
                      <Card className="absolute inset-0 backface-hidden border-2 border-primary/20 bg-gradient-to-b from-card to-surface-1" style={{ transform: "rotateY(180deg)" }}>
                        <CardHeader>
                          <CardTitle className="text-xl text-foreground">What's Included</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-3">
                            <h4 className="font-bold text-foreground flex items-center gap-2">
                              <Sparkles className="w-4 h-4 text-primary" />
                              Professional Features:
                            </h4>
                            <ul className="space-y-2 text-sm">
                              <li className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                                <span className="text-foreground">HD 1080p quality output</span>
                              </li>
                              <li className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                                <span className="text-foreground">Script optimization (up to 5 minutes)</span>
                              </li>
                              <li className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                                <span className="text-foreground">Professional lighting setup</span>
                              </li>
                              <li className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                                <span className="text-foreground">Multiple format exports</span>
                              </li>
                              <li className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                                <span className="text-foreground">Full commercial rights</span>
                              </li>
                            </ul>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button 
                            className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-semibold py-3 rounded-xl" 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleBuyClick("Static Avatar Video");
                            }}
                          >
                            <CreditCard className="w-4 h-4 mr-2" />
                            Purchase Now
                          </Button>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  </div>

                  {/* Motion Avatar Video Card */}
                  <div className="relative h-full">
                    <motion.div
                      className="h-full cursor-pointer"
                      style={{ transformStyle: "preserve-3d" }}
                      animate={{ rotateY: flippedCard === "motion-video" ? 180 : 0 }}
                      transition={{ duration: 0.6 }}
                      onClick={() => handleCardFlip("motion-video")}
                    >
                      <Card className="absolute inset-0 backface-hidden border-2 border-secondary/30 hover:border-secondary/50 transition-all duration-300 hover:shadow-2xl bg-gradient-to-b from-card to-surface-1 relative">
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                          <span className="bg-gradient-to-r from-secondary to-primary text-white px-4 py-1 rounded-full text-xs font-bold shadow-lg">
                            ⭐ PREMIUM
                          </span>
                        </div>
                        <CardHeader className="pb-4">
                          <CardTitle className="flex items-center justify-between text-2xl text-foreground">
                            <div className="flex items-center gap-3">
                              <div className="p-2 rounded-lg bg-gradient-to-r from-secondary/20 to-primary/20">
                                <SquareUser className="w-5 h-5 text-secondary" />
                              </div>
                              Motion Avatar Video
                            </div>
                            <FlipVertical className="w-5 h-5 text-muted-foreground" />
                          </CardTitle>
                          <div className="flex items-baseline gap-2">
                            <div className="text-4xl font-bold text-secondary">$799</div>
                            <div className="text-sm text-muted-foreground">per video</div>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="bg-gradient-to-r from-secondary/5 to-primary/5 rounded-lg p-4 border border-secondary/10">
                            <p className="text-sm font-medium text-muted-foreground mb-3">Advanced Features:</p>
                            <ul className="space-y-2 text-sm">
                              <li className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-secondary rounded-full" />
                                <span className="text-foreground">Dynamic hand gestures</span>
                              </li>
                              <li className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-secondary rounded-full" />
                                <span className="text-foreground">Natural body movements</span>
                              </li>
                              <li className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-secondary rounded-full" />
                                <span className="text-foreground">Interactive presentations</span>
                              </li>
                              <li className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-secondary rounded-full" />
                                <span className="text-foreground">Premium animations</span>
                              </li>
                            </ul>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground font-medium">Delivery Time:</span>
                            <span className="text-secondary font-bold">72 hours</span>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button 
                            className="w-full bg-gradient-to-r from-secondary to-primary hover:from-secondary/90 hover:to-primary/90 text-white font-semibold py-3 rounded-xl hover:shadow-lg transition-all duration-300" 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleBuyClick("Motion Avatar Video");
                            }}
                          >
                            <Play className="w-4 h-4 mr-2" />
                            Order Premium
                          </Button>
                        </CardFooter>
                      </Card>
                      
                      <Card className="absolute inset-0 backface-hidden border-2 border-secondary/20 bg-gradient-to-b from-card to-surface-1" style={{ transform: "rotateY(180deg)" }}>
                        <CardHeader>
                          <CardTitle className="text-xl text-foreground">Premium Package</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-3">
                            <h4 className="font-bold text-foreground flex items-center gap-2">
                              <Sparkles className="w-4 h-4 text-secondary" />
                              Enhanced Capabilities:
                            </h4>
                            <ul className="space-y-2 text-sm">
                              <li className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-secondary rounded-full" />
                                <span className="text-foreground">4K ultra-high definition</span>
                              </li>
                              <li className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-secondary rounded-full" />
                                <span className="text-foreground">Advanced facial expressions</span>
                              </li>
                              <li className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-secondary rounded-full" />
                                <span className="text-foreground">Dynamic scene transitions</span>
                              </li>
                              <li className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-secondary rounded-full" />
                                <span className="text-foreground">Custom brand integration</span>
                              </li>
                              <li className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-secondary rounded-full" />
                                <span className="text-foreground">Priority support</span>
                              </li>
                            </ul>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button 
                            className="w-full bg-gradient-to-r from-secondary to-primary hover:from-secondary/90 hover:to-primary/90 text-white font-semibold py-3 rounded-xl" 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleBuyClick("Motion Avatar Video");
                            }}
                          >
                            <CreditCard className="w-4 h-4 mr-2" />
                            Purchase Premium
                          </Button>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  </div>
                </motion.div>
              </TabsContent>

              <TabsContent value="monthly" className="mt-8">
                <motion.div
                  key="monthly"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="grid md:grid-cols-2 gap-8"
                >
                  {/* Static Plan Card */}
                  <Card className="border-2 border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-2xl bg-gradient-to-b from-card to-surface-1">
                    <CardHeader className="pb-4">
                      <CardTitle className="text-2xl text-foreground flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-gradient-to-r from-primary/20 to-secondary/20">
                          <Video className="w-5 h-5 text-primary" />
                        </div>
                        Static Plan
                      </CardTitle>
                      <div className="flex items-baseline gap-2">
                        <div className="text-4xl font-bold text-primary">$799</div>
                        <div className="text-xl font-normal text-muted-foreground">/month</div>
                      </div>
                      <CardDescription className="text-lg font-medium">
                        4 static avatar videos monthly
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg p-4 border border-primary/10">
                        <ul className="space-y-3 text-sm">
                          <li className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                            <span className="text-foreground font-medium">4 static avatar videos monthly</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                            <span className="text-foreground font-medium">Priority queue processing</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                            <span className="text-foreground font-medium">Advanced editing included</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                            <span className="text-foreground font-medium">Brand customization</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                            <span className="text-foreground font-medium">Analytics dashboard</span>
                          </li>
                        </ul>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-semibold py-3 rounded-xl hover:shadow-lg transition-all duration-300" 
                        size="lg"
                        onClick={() => handleBuyClick("Static Plan Subscription")}
                      >
                        <NotebookTabs className="w-4 h-4 mr-2" />
                        Subscribe Now
                      </Button>
                    </CardFooter>
                  </Card>

                  {/* Motion Plan Card */}
                  <Card className="border-2 border-secondary/30 hover:border-secondary/50 transition-all duration-300 relative hover:shadow-2xl bg-gradient-to-b from-card to-surface-1">
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-gradient-to-r from-secondary to-primary text-white px-4 py-1 rounded-full text-xs font-bold shadow-lg">
                        ⭐ MOST POPULAR
                      </span>
                    </div>
                    <CardHeader className="pb-4">
                      <CardTitle className="text-2xl text-foreground flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-gradient-to-r from-secondary/20 to-primary/20">
                          <SquareUser className="w-5 h-5 text-secondary" />
                        </div>
                        Motion Plan
                      </CardTitle>
                      <div className="flex items-baseline gap-2">
                        <div className="text-4xl font-bold text-secondary">$999</div>
                        <div className="text-xl font-normal text-muted-foreground">/month</div>
                      </div>
                      <CardDescription className="text-lg font-medium">
                        4 motion avatar videos monthly
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="bg-gradient-to-r from-secondary/5 to-primary/5 rounded-lg p-4 border border-secondary/10">
                        <ul className="space-y-3 text-sm">
                          <li className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-secondary rounded-full" />
                            <span className="text-foreground font-medium">4 motion avatar videos monthly</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-secondary rounded-full" />
                            <span className="text-foreground font-medium">Dedicated account manager</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-secondary rounded-full" />
                            <span className="text-foreground font-medium">Premium editing & effects</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-secondary rounded-full" />
                            <span className="text-foreground font-medium">Full brand integration</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-secondary rounded-full" />
                            <span className="text-foreground font-medium">Advanced analytics & insights</span>
                          </li>
                        </ul>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        className="w-full bg-gradient-to-r from-secondary to-primary hover:from-secondary/90 hover:to-primary/90 text-white font-semibold py-3 rounded-xl hover:shadow-lg transition-all duration-300" 
                        size="lg"
                        onClick={() => handleBuyClick("Motion Plan Subscription")}
                      >
                        <Sparkles className="w-4 h-4 mr-2" />
                        Subscribe Premium
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              </TabsContent>

              <TabsContent value="interactive" className="mt-8">
                <motion.div
                  key="interactive"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="max-w-4xl mx-auto"
                >
                  <Card className="border-2 border-primary/30 bg-gradient-to-br from-card via-surface-1 to-card shadow-2xl relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5" />
                    <CardHeader className="text-center pb-8 relative">
                      <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center shadow-lg">
                        <Presentation className="w-10 h-10 text-primary" />
                      </div>
                      <CardTitle className="text-3xl font-heading text-foreground">Interactive Avatars</CardTitle>
                      <CardDescription className="text-xl mt-4 text-muted-foreground">
                        Enterprise-grade conversational solutions with custom pricing
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-8 relative">
                      <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                          <h4 className="font-bold text-lg flex items-center gap-2 text-foreground">
                            <span className="text-2xl">🚀</span> Enterprise Features:
                          </h4>
                          <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg p-4 border border-primary/10">
                            <ul className="space-y-3 text-sm">
                              <li className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                                <span className="text-foreground font-medium">Real-time conversation AI</span>
                              </li>
                              <li className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                                <span className="text-foreground font-medium">Custom API integrations</span>
                              </li>
                              <li className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                                <span className="text-foreground font-medium">Multi-language support</span>
                              </li>
                              <li className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                                <span className="text-foreground font-medium">Advanced AI responses</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <h4 className="font-bold text-lg flex items-center gap-2 text-foreground">
                            <span className="text-2xl">⚙️</span> Technical Capabilities:
                          </h4>
                          <div className="bg-gradient-to-r from-secondary/5 to-primary/5 rounded-lg p-4 border border-secondary/10">
                            <ul className="space-y-3 text-sm">
                              <li className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-secondary rounded-full" />
                                <span className="text-foreground font-medium">Custom development included</span>
                              </li>
                              <li className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-secondary rounded-full" />
                                <span className="text-foreground font-medium">Dedicated technical support</span>
                              </li>
                              <li className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-secondary rounded-full" />
                                <span className="text-foreground font-medium">Scalable cloud infrastructure</span>
                              </li>
                              <li className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-secondary rounded-full" />
                                <span className="text-foreground font-medium">White-label solutions</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="text-center pt-6 bg-gradient-to-r from-surface-1 to-surface-2 rounded-xl p-6 border border-primary/10">
                        <div className="flex items-center justify-center gap-2 mb-4">
                          <CircleDollarSign className="w-6 h-6 text-primary" />
                          <h3 className="text-lg font-bold text-foreground">Custom Pricing</h3>
                        </div>
                        <p className="text-muted-foreground mb-6 text-lg">
                          Pricing varies based on complexity, usage volume, and integration requirements.
                          Our team will work with you to create a tailored solution.
                        </p>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-8 relative">
                      <Button 
                        className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-bold py-4 rounded-xl hover:scale-105 hover:shadow-xl hover:shadow-primary/25 transition-all duration-300" 
                        size="lg"
                        onClick={() => setShowContactDialog(true)}
                      >
                        <CircleDollarSign className="w-5 h-5 mr-2" />
                        Contact Sales for Custom Quote
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              </TabsContent>
            </AnimatePresence>
          </Tabs>
        </motion.div>

        {/* Contact Dialog */}
        <Dialog open={showContactDialog} onOpenChange={setShowContactDialog}>
          <DialogContent className="sm:max-w-md bg-card border-border">
            <DialogHeader>
              <DialogTitle className="text-foreground">Request Interactive Avatar Quote</DialogTitle>
              <DialogDescription className="text-muted-foreground">
                Tell us about your requirements and we'll create a custom proposal.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-foreground">Name</Label>
                <Input
                  id="name"
                  value={contactForm.name}
                  onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                  className="bg-surface-1 border-border text-foreground"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={contactForm.email}
                  onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                  className="bg-surface-1 border-border text-foreground"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company" className="text-foreground">Company</Label>
                <Input
                  id="company"
                  value={contactForm.company}
                  onChange={(e) => setContactForm(prev => ({ ...prev, company: e.target.value }))}
                  className="bg-surface-1 border-border text-foreground"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="requirements" className="text-foreground">Integration Requirements</Label>
                <Textarea
                  id="requirements"
                  value={contactForm.requirements}
                  onChange={(e) => setContactForm(prev => ({ ...prev, requirements: e.target.value }))}
                  placeholder="Describe your use case, expected volume, and technical requirements..."
                  className="bg-surface-1 border-border text-foreground"
                  required
                />
              </div>
              <DialogFooter>
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white"
                >
                  {isSubmitting ? "Sending..." : "Send Request"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}