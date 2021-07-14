import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { CommunityThumb, CommunityFeed } from '../Wrapper';

test('CommunityThumb works with background-image', () => {
  const image = 'image.jpg';
  const tree = renderer.create(<CommunityThumb image={image} />).toJSON();
  expect(tree).toMatchSnapshot();
  expect(tree).toHaveStyleRule('background-image', `url(${image})`);
});

test('CommunityThumb works without background-image', () => {
  const image = '';
  const tree = renderer.create(<CommunityThumb image={image} />).toJSON();
  expect(tree).toMatchSnapshot();
  expect(tree).toHaveStyleRule('background-image', 'none');
});

test('CommunityFeed works with background-image', () => {
  const image = 'image.jpg';
  const tree = renderer.create(<CommunityFeed image={image} />).toJSON();
  expect(tree).toMatchSnapshot();
  expect(tree).toHaveStyleRule('color', '#fff');
  expect(tree).toHaveStyleRule('text-shadow', '1px 1px 5px rgba(0,0,0,0.4)');
});

test('CommunityFeed works without background-image', () => {
  const image = '';
  const tree = renderer.create(<CommunityFeed image={image} />).toJSON();
  expect(tree).toMatchSnapshot();
  expect(tree).toHaveStyleRule('color', 'rgba(0,0,0,0.85)');
  expect(tree).toHaveStyleRule('text-shadow', 'none');
});
