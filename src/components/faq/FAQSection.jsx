import React from 'react';
import FAQAccordion from './FAQAccordion';

export default function FAQSection({ title, questions }) {
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-primary mb-4">{title}</h2>
      <div className="space-y-2">
        {questions.map((faq, index) => (
          <FAQAccordion
            key={index}
            question={faq.question}
            answer={faq.answer}
          />
        ))}
      </div>
    </section>
  );
}