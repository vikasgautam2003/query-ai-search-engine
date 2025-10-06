




import React from 'react';
import { QuickSources } from './QuickSources';
import { ImageGallery } from './ImageGallery';
import { RelatedQuestions } from './RelatedQuestions';
import { Query } from '@vercel/postgres';

export const AnswerTabView = ({ answer, sources, images, relatedQuestions, onNewSearch, query }) => {

  const formatAnswer = (text) => {
    let html = text.replace(/\[(\d+)\]/g, (match, number) => {
      const source = sources[number - 1];
      return source
        ? `<a href="${source.link}" target="_blank" class="text-blue-400 font-semibold hover:underline">[${number}]</a>`
        : match;
    });
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold">$1</strong>');
    return { __html: html.replace(/\n/g, '<br />') };
  };

  return (
    <div className="space-y-8">
      {/* Sources */}
      <QuickSources sources={sources} />

      {/* Image Gallery */}
      <ImageGallery images={images} />

      {/* Answer Text */}
      <div className="bg-gray-900 p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-white mb-4">{query}
        </h2>
        <div
          className="text-gray-300 leading-relaxed space-y-4 prose prose-invert max-w-none text-xl"
          dangerouslySetInnerHTML={formatAnswer(answer)}
        />

      </div>

      <RelatedQuestions questions={relatedQuestions} onQuestionClick={onNewSearch} />
    </div>
  );
};



