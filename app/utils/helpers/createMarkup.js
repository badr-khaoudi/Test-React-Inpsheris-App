import DOMPurify from 'dompurify';
import Autolinker from 'autolinker';
import { toArray } from 'react-emoji-render';

const parseEmojis = value => {
  const emojisArray = toArray(value);
  const newValue = emojisArray.reduce((previous, current) => {
    if (typeof current === 'string') {
      return previous + current;
    }
    return previous + current.props.children;
  }, '');

  return newValue;
};

const domPurify = text => DOMPurify.sanitize(text);

const createMarkup = parseText => ({
  __html: Autolinker.link(parseEmojis(domPurify(parseText))),
});

const createShortText = (text, length) =>
  `${domPurify(`${text.substring(0, length)}...`)}`;

export { createMarkup, createShortText };
