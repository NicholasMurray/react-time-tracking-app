import React from 'react';
import ReactDOM from 'react-dom';
import Timer from './Timer';
import { shallow } from 'enzyme';

const props = {
                title: 'Test Title', 
                project: 'Test Project',
                elapsed: '8986300'
              }

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Timer />, div);
});

it('should have a title', () => {
  const wrapper = shallow(
    <Timer {...props} />
  );
  expect(
    wrapper.contains('Test Title')
  ).toBe(true)
});

it('should have a project', () => {
  const wrapper = shallow(
    <Timer {...props} />
  );
  expect(
    wrapper.contains('Test Project')
  ).toBe(true)
});

it('should have a time elapsed displayed in timer format', () => {
  const wrapper = shallow(
    <Timer {...props} />
  );
  expect(
    wrapper.contains('02:29:46')
  ).toBe(true)
});
