import React from 'react';
import { useFAQ } from '../hooks/useFAQ';
import FAQSection from '../components/faq/FAQSection';

export default function FAQ() {
  const { data: faqCategories, isLoading } = useFAQ();

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse max-w-3xl mx-auto">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
          {[1, 2, 3].map(section => (
            <div key={section} className="mb-8">
              <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
              {[1, 2].map(item => (
                <div key={item} className="mb-4">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-primary mb-8 text-center">
          Frequently Asked Questions
        </h1>

        <FAQSection
          title="Pattern Questions"
          questions={faqCategories.patterns}
        />
        <FAQSection
          title="Ordering & Downloads"
          questions={faqCategories.ordering}
        />
        <FAQSection
          title="Support"
          questions={faqCategories.support}
        />

        <div className="mt-12 p-6 bg-gray-50 rounded-lg text-center">
          <p className="text-gray-600 mb-4">
            Still have questions? We're here to help!
          </p>
          <a
            href="/contact"
            className="inline-block px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
}