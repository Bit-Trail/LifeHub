"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  CheckCircle,
  Target,
  BookOpen,
  BarChart3,
  Sparkles,
  ArrowRight,
  Play,
  Users,
  Clock,
  Award,
} from "lucide-react";

export default function LifeHubLanding() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -50]);
  const y2 = useTransform(scrollY, [0, 300], [0, -100]);

  useEffect(() => {
    const handleMouseMove = (e: { clientX: any; clientY: any }) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const features = [
    {
      icon: CheckCircle,
      title: "Smart Tasks",
      desc: "AI-powered task management",
    },
    {
      icon: Target,
      title: "Goal Tracking",
      desc: "Achieve your dreams systematically",
    },
    { icon: BookOpen, title: "Daily Journals", desc: "Reflect and grow daily" },
    {
      icon: BarChart3,
      title: "Analytics",
      desc: "Track your progress visually",
    },
  ];

  const stats = [
    { icon: Users, value: "50K+", label: "Active Users" },
    { icon: Clock, value: "2M+", label: "Tasks Completed" },
    { icon: Award, value: "98%", label: "Success Rate" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden relative">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div
          className="absolute w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"
          style={{
            left: `${mousePosition.x * 0.02}px`,
            top: `${mousePosition.y * 0.02}px`,
          }}
        />
        <div
          className="absolute w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"
          style={{
            right: `${mousePosition.x * 0.01}px`,
            bottom: `${mousePosition.y * 0.01}px`,
          }}
        />
        <div className="absolute w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-2000 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
      </div>

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="relative z-50 p-6"
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <motion.div
            className="text-2xl font-bold text-white"
            whileHover={{ scale: 1.05 }}
          >
            <Sparkles className="inline mr-2 text-purple-400" />
            LifeHub
          </motion.div>
          <div className="flex gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 text-white border border-purple-400 rounded-full hover:bg-purple-400/20 transition-all duration-300"
            >
              Login
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
            >
              Get Started
            </motion.button>
          </div>
        </div>
      </motion.nav>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Content */}
          <motion.div style={{ y: y1 }} className="space-y-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/20 backdrop-blur-sm border border-purple-500/30 rounded-full text-purple-300 text-sm mb-6"
              >
                <Sparkles className="w-4 h-4" />
                Transform Your Life Today
              </motion.div>

              <h1 className="text-6xl lg:text-7xl font-black text-white leading-tight">
                Master Your
                <motion.span
                  className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 block"
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  Life Journey
                </motion.span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-xl text-gray-300 leading-relaxed max-w-lg"
            >
              The ultimate productivity platform that combines task management,
              habit tracking, goal setting, and personal analytics in one
              beautiful, intelligent experience.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(168, 85, 247, 0.4)",
                }}
                whileTap={{ scale: 0.95 }}
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
                className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl font-semibold shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 flex items-center gap-3"
              >
                <Play className="w-5 h-5" />
                Start Your Journey
                <motion.div
                  animate={{ x: isHovered ? 5 : 0 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.div>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-2xl font-semibold hover:bg-white/20 transition-all duration-300"
              >
                Watch Demo
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex flex-wrap gap-6 pt-8"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-4 py-3 rounded-xl border border-white/20"
                >
                  <div className="p-2 bg-purple-500/20 rounded-lg">
                    <stat.icon className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Dashboard Preview */}
          <motion.div style={{ y: y2 }} className="relative">
            <DashboardPreview />
          </motion.div>
        </div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-32 text-center"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            Everything You Need to
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              {" "}
              Succeed
            </span>
          </h2>
          <p className="text-gray-400 text-lg mb-12 max-w-2xl mx-auto">
            Powerful features designed to help you build better habits, achieve
            your goals, and live your best life.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -10 }}
                viewport={{ once: true }}
                className="group p-6 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl hover:bg-white/20 transition-all duration-300 cursor-pointer"
              >
                <div className="p-3 bg-purple-500/20 rounded-xl w-fit mx-auto mb-4 group-hover:bg-purple-500/30 transition-colors">
                  <feature.icon className="w-8 h-8 text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-400">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function DashboardPreview() {
  const [activeCard, setActiveCard] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const cards = [
    {
      title: "Today's Focus",
      content: "Complete project presentation",
      color: "from-purple-600 to-purple-800",
      progress: 75,
    },
    {
      title: "Habit Streak",
      content: "Morning workout - 12 days",
      color: "from-pink-600 to-pink-800",
      progress: 85,
    },
    {
      title: "Weekly Goal",
      content: "Read 3 books this month",
      color: "from-blue-600 to-blue-800",
      progress: 60,
    },
  ];

  return (
    <div className="relative">
      {/* Main Dashboard Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="relative z-10 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-white">Dashboard</h3>
          <div className="flex gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
        </div>

        <div className="space-y-4">
          {cards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              className={`p-4 rounded-2xl bg-gradient-to-r ${card.color} ${
                activeCard === index
                  ? "scale-105 shadow-lg"
                  : "scale-100 opacity-70"
              } transition-all duration-500 cursor-pointer`}
              onClick={() => setActiveCard(index)}
            >
              <h4 className="text-white font-semibold mb-2">{card.title}</h4>
              <p className="text-white/80 text-sm mb-3">{card.content}</p>
              <div className="w-full bg-white/20 rounded-full h-2">
                <motion.div
                  className="h-2 bg-white rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${card.progress}%` }}
                  transition={{ delay: 1 + index * 0.1, duration: 1 }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Floating Analytics */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="absolute -top-4 -right-4 bg-gradient-to-r from-purple-500 to-pink-500 p-4 rounded-2xl shadow-xl"
        >
          <BarChart3 className="w-6 h-6 text-white" />
        </motion.div>
      </motion.div>

      {/* Floating Cards */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute -top-8 -left-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 shadow-xl"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
            <CheckCircle className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-white font-semibold">Task Complete!</div>
            <div className="text-gray-400 text-sm">+50 XP earned</div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.3, duration: 0.8 }}
        className="absolute -bottom-8 -right-8 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 shadow-xl"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
            <Target className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-white font-semibold">Goal Progress</div>
            <div className="text-gray-400 text-sm">67% this week</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
