import React from 'react';
import ReactDOM from 'react-dom';
import TimerForm from './TimerForm';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';

const testProps = {
                id: 123456,
                title: 'Test Title', 
                project: 'Test Project'
              }

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<TimerForm />, div);
});

it('should have an `input` element', () => {
  const wrapper = shallow(
    <TimerForm />
  );
  expect(
    wrapper.containsMatchingElement(
      <input />
    )
  ).toBe(true);
});

it('should have an input with a value of title if supplied', () => {
  const wrapper = shallow(
    <TimerForm {...testProps} />
  );
  const input = wrapper.find('input').first();
  expect(
    input.props().defaultValue
  ).toEqual('Test Title')
});

it('should have an input with a value of project if supplied', () => {
  const wrapper = shallow(
    <TimerForm {...testProps} />
  );
  const input = wrapper.find('input').at(1);
  expect(
    input.props().defaultValue
  ).toEqual('Test Project')
});

it('should display a button with the text Update if a title supplied', () => {
  const wrapper = shallow(
    <TimerForm {...testProps} />
  );
  const button = wrapper.find('button').first()
  expect(
    button.props().children
  ).toEqual('Update')
});

it('should display a button with the text Create if no title supplied', () => {
  const wrapper = shallow(
    <TimerForm title="" />
  );
  const button = wrapper.find('button').first()
  expect(
    button.props().children
  ).toEqual('Create')
});

it('should display a button with the text Cancel', () => {
  const wrapper = shallow(
    <TimerForm {...testProps} />
  );
  const button = wrapper.find('button').at(1)
  expect(
    button.props().children
  ).toEqual('Cancel')
});

it('should submit', () => {
  const onFormSubmit = sinon.spy();
  const wrapper = mount(
    <TimerForm {...testProps} onFormSubmit={onFormSubmit} />
  );
  const button = wrapper.find('button').first();
  const titleInput = wrapper.find('input').first();
  const projectInput = wrapper.find('input').at(1);
  titleInput.simulate('change', {target: {value: 'title changed'}});
  projectInput.simulate('change', {target: {value: 'title project'}});
  button.simulate('click');
  expect(onFormSubmit.calledOnce).toBe(true);
})
