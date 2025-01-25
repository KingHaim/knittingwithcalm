import { useQuery } from '@tanstack/react-query';

const faqCategories = {
  patterns: [
    {
      question: "What format are the patterns in?",
      answer: "All patterns are provided in PDF format with clear instructions, photos, and charts where applicable. They can be viewed on any device or printed."
    },
    {
      question: "How do I know which skill level is right for me?",
      answer: "Beginner patterns use basic stitches, Intermediate patterns include more complex techniques, and Advanced patterns feature intricate designs and specialized techniques."
    }
  ],
  ordering: [
    {
      question: "How do I download my patterns after purchase?",
      answer: "After purchase, you'll receive an email with download links. Your patterns are also available in your account's pattern library."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept credit/debit cards and PayPal for all purchases."
    }
  ],
  support: [
    {
      question: "What if I need help with a pattern?",
      answer: "We offer pattern support via email and our community forum. Each pattern also includes links to relevant video tutorials."
    },
    {
      question: "Can I get a refund?",
      answer: "Due to the digital nature of our patterns, we don't offer refunds. Please read the pattern description carefully before purchasing."
    }
  ]
};

const fetchFAQ = async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return faqCategories;
};

export function useFAQ() {
  return useQuery({
    queryKey: ['faq'],
    queryFn: fetchFAQ
  });
}