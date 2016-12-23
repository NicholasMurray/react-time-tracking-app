import React from 'react';
import ReactDOM from 'react-dom';
import EditableTimer from './EditableTimer';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<EditableTimer />, div);
});

it('should handle an edit click', () => {
  const wrapper = mount(
    <EditableTimer />
  );
  const edit = wrapper.find('span.edit');
  edit.simulate('click');
  expect(
    wrapper.state().editFormOpen
  ).toBe(true);
});

it('should handle a form close click', () => {
  
  const onFormSubmit = sinon.spy();
  const wrapper = mount(
    <EditableTimer onFormSubmit={onFormSubmit} />
  );
  const edit = wrapper.find('span.edit');

  // Open form first and verify that the form is now open
  edit.simulate('click');
  expect(
    wrapper.state().editFormOpen
  ).toBe(true);

  // Click close and verify that the form is now closed
  const button = wrapper.find('button').at(1);
  const titleInput = wrapper.find('input').first();
  const projectInput = wrapper.find('input').at(1);
  titleInput.simulate('change', {target: {value: 'title changed'}});
  projectInput.simulate('change', {target: {value: 'title project'}});
  button.simulate('click');
  expect(
    wrapper.state().editFormOpen
  ).toBe(false);
});

it('should handle a form submit click', () => {
  
  const onFormSubmit = sinon.spy();
  const wrapper = mount(
    <EditableTimer onFormSubmit={onFormSubmit} />
  );
  const edit = wrapper.find('span.edit');

  // Open form first and verify that the form is now open
  edit.simulate('click');
  expect(
    wrapper.state().editFormOpen
  ).toBe(true);

  // Click submit and verify that the form is now closed
  const button = wrapper.find('button').first();
  const titleInput = wrapper.find('input').first();
  const projectInput = wrapper.find('input').at(1);
  titleInput.simulate('change', {target: {value: 'title changed'}});
  projectInput.simulate('change', {target: {value: 'title project'}});
  button.simulate('click');
  expect(
    wrapper.state().editFormOpen
  ).toBe(false);
  expect(
    onFormSubmit.calledOnce
  ).toBe(true);
});
