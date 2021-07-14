import _ from 'lodash';

const initials = label => {
  const words = _.words(label);
  if (words.length === 1 && _.size(label === 1)) {
    return _.toUpper(_.join(_.slice(label, 0, 2), ''));
  }
  return _.toUpper(
    _.join(_.map(_.slice(words, 0, 2), word => _.first(word)), ''),
  );
};

export { initials };
