import 'github-markdown-css';
import ReactMarkdown from 'react-markdown';

const QuestionsAnswers = ({ items, theme }: { items: any[]; theme: string }) => {
  var delve = require('delve')

  return (
    <dl className="w-full md:w-2/3 mt-12 md:mt-0">
      {items &&
        items.map((item, index) => (
          <div key={`faq-${index}`}>
            <dt className={`mb-4 text-${theme}-text`}>
              <h3 className="text-xl font-semibold">
                {delve(item, 'question')}
              </h3>
            </dt>
            <dd className={`markdown-body mb-16 text-${theme}-text`}>
              <ReactMarkdown>
                {delve(item, 'answer')}
              </ReactMarkdown>
            </dd>
          </div>
        ))}
    </dl>
  );
};

QuestionsAnswers.defaultProps = {};

export default QuestionsAnswers;
