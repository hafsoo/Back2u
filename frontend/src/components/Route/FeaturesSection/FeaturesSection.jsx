import React from "react";
import { motion } from "framer-motion";
import {
  Brain,
  MessageSquareLock,
  Bell,
  ShieldCheck,
  Search,
  Zap,
} from "lucide-react";

const features = [
  {
    id: "ai-matching",
    title: "AI-Powered Matching",
    description:
      "Advanced image recognition automatically matches lost and found items based on visual similarity and metadata.",
    Icon: Brain,
    iconBg: "bg-blue-50",
    iconColorClass: "text-blue-500",
    image: "/images/match.png",
    alt: "AI matching results on a phone screen",
  },
  {
    id: "secure-chat",
    title: "Secure Chat System",
    description:
      "Communicate safely with finders through our encrypted real-time chat to verify ownership and arrange pickup.",
    Icon: MessageSquareLock,
    iconBg: "bg-yellow-50",
    iconColorClass: "text-yellow-500",
    image: "/images/chat.png",
    alt: "Encrypted chat conversation on a mobile device",
  },
  {
    id: "notifications",
    title: "Real-Time Notifications",
    description:
      "Get instant alerts via email and in-app when we find a potential match for your lost item.",
    Icon: Bell,
    iconBg: "bg-green-50",
    iconColorClass: "text-green-500",
    image: "/images/notification.png",
    alt: "Push notification alert on a phone",
  },
  {
    id: "verified-claims",
    title: "Verified Claims",
    description:
      "Multi-step verification ensures items are returned securely to their rightful owners with admin approval.",
    Icon: ShieldCheck,
    iconBg: "bg-teal-50",
    iconColorClass: "text-teal-500",
    image: "/images/claim.jpg",
    alt: "Verified claim badge on an item",
  },
  {
    id: "search-filters",
    title: "Smart Search & Filters",
    description:
      "Easily search through reports using filters like category, location, date, and keywords for quick results.",
    Icon: Search,
    iconBg: "bg-orange-50",
    iconColorClass: "text-orange-500",
    image: "/images/search.avif",
    alt: "Search results with filters applied",
  },
  {
    id: "fast",
    title: "Lightning Fast",
    description:
      "Report items in seconds with our intuitive interface and get AI-powered matches within minutes.",
    Icon: Zap,
    iconBg: "bg-green-50",
    iconColorClass: "text-green-600",
    image: "/images/fast.jpg",
    alt: "A speedometer illustrating fast performance",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 1) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.45 } }),
};

const FeaturesSection = () => {
  return (
    <section  id="features" className="py-12 px-6 bg-gray-50" aria-labelledby="features-heading">
      <div className="max-w-6xl mx-auto text-center mb-10">
        <h2
          id="features-heading"
          className="text-[36px] md:text-[56px] font-extrabold leading-tight text-[#111827]"
        >
          Powerful Features for
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0284c7] to-[#f97316]">
            {" "} Easy Recovery
          </span>
        </h2>
        <p className="text-gray-500 mt-2 max-w-2xl mx-auto">
          Back2U simplifies the lost and found process with AI matching, verified
          claims, and secure communication tools.
        </p>
        <div className="h-1 w-24 mx-auto my-4 rounded-full bg-gradient-to-r from-[#0284c7] to-[#f97316]" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <motion.article
            key={feature.id}
            className="bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300"
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={cardVariants}
            role="article"
            aria-labelledby={`${feature.id}-title`}
          >
            {feature.image && (
              <img
                src={feature.image}
                alt={feature.alt || feature.title}
                className="rounded-lg h-40 w-full object-cover mb-5"
                loading="lazy"
              />
            )}

            <div className="flex items-center mb-3 space-x-3">
              <div
                className={`p-2 rounded-md ${feature.iconBg} inline-flex items-center justify-center`}
                aria-hidden="true"
              >
                <feature.Icon className={`w-6 h-6 ${feature.iconColorClass}`} />
              </div>

              <h3 id={`${feature.id}-title`} className="text-lg font-semibold text-gray-800">
                {feature.title}
              </h3>
            </div>

            <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>

        
          </motion.article>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
