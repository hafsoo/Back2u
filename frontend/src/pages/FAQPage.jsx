import React, { useState } from 'react';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import styles from '../styles/styles';

const FAQPage = () => {
  return (
    <div>
      <Header activeHeading={6} />
      <Faq />
      <Footer />
    </div>
  );
};

const Faq = () => {
  const [activeTab, setActiveTab] = useState(0);

  const toggleTab = (tab) => {
    setActiveTab(activeTab === tab ? 0 : tab);
  };

  const faqs = [
    {
      question: "How do I report a lost or found item?",
      answer:
        "Log in to your Back2U account and use the 'Report Lost/Found Item' form. Provide the item details, upload an image, and choose the appropriate category. Once submitted, your report will be added to the system for matching.",
    },
    {
      question: "How does the AI-based matching work?",
      answer:
        "Back2U uses AI image recognition to compare uploaded images of lost and found items. The system suggests potential matches automatically, improving the chance of returning items to their rightful owners.",
    },
    {
      question: "Can I communicate with the finder or owner directly?",
      answer:
        "Yes, Back2U provides a secure in-app chat system. Once a potential match is found, you can message the other user to verify ownership without sharing personal contact details.",
    },
    {
      question: "How do I claim a found item?",
      answer:
        "When you see a potential match, click 'Claim Item'. You may be asked verification questions to confirm ownership. Administrators review and approve claims to ensure items are safely returned.",
    },
    {
      question: "Will I get notifications about matches or claims?",
      answer:
        "Yes, the platform sends real-time in-app notifications and optional email alerts to keep you informed about potential matches, claim status, and administrative actions.",
    },
    {
      question: "Is my data secure on Back2U?",
      answer:
        "Back2U ensures user privacy and secure communication. Personal information is protected, and all interactions between finders and owners occur through the platform without exposing sensitive data.",
    },
    {
      question: "Can administrators manage reports?",
      answer:
        "Yes, administrators can monitor all reports, verify claims, and manage inappropriate content. This ensures that the system remains trustworthy and organized for the university community.",
    },
  ];

  return (
    <div className={`${styles.section} my-8`}>
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h2>
      <div className="mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b border-gray-200 pb-4">
            <button
              className="flex items-center justify-between w-full"
              onClick={() => toggleTab(index + 1)}
            >
              <span className="text-lg font-medium text-gray-900">{faq.question}</span>
              <span
                className={`transform transition-transform duration-300 ${
                  activeTab === index + 1 ? 'rotate-90' : 'rotate-0'
                }`}
              >
                <svg
                  className="h-6 w-6 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </span>
            </button>
            {activeTab === index + 1 && (
              <div className="mt-4">
                <p className="text-base text-gray-500">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQPage;
