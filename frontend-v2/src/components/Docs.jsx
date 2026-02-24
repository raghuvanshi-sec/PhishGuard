import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, AlertTriangle, ShieldCheck, Zap, Info } from 'lucide-react';

const Docs = () => {
  const sections = [
    {
      id: 'phishing',
      title: 'What is Phishing?',
      icon: <AlertTriangle className="w-5 h-5 text-red-500" />,
      content: 'Phishing is a cybercrime in which a target is contacted by email, telephone or text message by someone posing as a legitimate institution to lure individuals into providing sensitive data such as personally identifiable information, banking and credit card details, and passwords.',
      borderColor: 'border-red-500/20',
      bgColor: 'bg-red-500/5',
    },
    {
      id: 'typosquatting',
      title: 'What is Typosquatting?',
      icon: <Zap className="w-5 h-5 text-amber-500" />,
      content: 'Typosquatting targets users who incorrectly type an Internet address into their web browser (e.g., "Gooogle.com" instead of "Google.com"). PhishGuard uses advanced string similarity algorithms to detect these domains.',
      borderColor: 'border-amber-500/20',
      bgColor: 'bg-amber-500/5',
    },
    {
      id: 'spoofing',
      title: 'Email Spoofing',
      icon: <ShieldCheck className="w-5 h-5 text-primary" />,
      content: 'Email spoofing is the creation of email messages with a forged sender address. We compare the "From" header against the "Return-Path" to detect these mismatches automatically.',
      borderColor: 'border-primary/20',
      bgColor: 'bg-primary/5',
    },
    {
      id: 'social',
      title: 'Social Engineering',
      icon: <Info className="w-5 h-5 text-primary" />,
      content: 'Attackers use psychological manipulation to trick users into making security mistakes. Common tactics include Urgency ("Act now!"), Fear ("Account suspended!"), and Greed ("You won!").',
      borderColor: 'border-primary/20',
      bgColor: 'bg-primary/5',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="flex items-center gap-4 mb-12">
        <div className="p-3 bg-primary/10 rounded-2xl">
          <BookOpen className="w-8 h-8 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Security Knowledge Base</h1>
          <p className="text-textSecondary">Understanding modern cyber threats and perimeter defense.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sections.map((section, idx) => (
          <motion.div
            key={section.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className={`p-6 rounded-2xl border ${section.borderColor} ${section.bgColor} group hover:scale-[1.02] transition-all`}
          >
            <div className="flex items-center gap-3 mb-4">
              {section.icon}
              <h3 className="text-lg font-bold group-hover:text-white transition-colors">{section.title}</h3>
            </div>
            <p className="text-sm text-textSecondary leading-relaxed">{section.content}</p>
          </motion.div>
        ))}
      </div>

      <div className="mt-12 p-8 glass rounded-2xl border border-white/5 text-center">
        <h4 className="text-lg font-bold mb-2">Need Enterprise Support?</h4>
        <p className="text-sm text-textSecondary mb-6">Our security experts are available 24/7 to help you secure your digital workspace.</p>
        <button className="px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-xl font-bold transition-all shadow-soft active:scale-95">
          Contact Security Ops
        </button>
      </div>
    </div>
  );
};

export default Docs;
