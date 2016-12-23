import React from 'react';
import ReactDOM from 'react-dom';
import Timer from './Timer';
import TimerActionButton from './TimerActionButton';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';

const testProps = {
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
    <Timer {...testProps} />
  );
  expect(
    wrapper.contains('Test Title')
  ).toBe(true)
});

it('should have a project', () => {
  const wrapper = shallow(
    <Timer {...testProps} />
  );
  expect(
    wrapper.contains('Test Project')
  ).toBe(true)
});

it('should have a time elapsed displayed in timer format', () => {
  const wrapper = shallow(
    <Timer {...testProps} />
  );
  expect(
    wrapper.contains('02:29:46')
  ).toBe(true)
});

it('should handle an edit click', () => {
  const onEditClick = sinon.spy();
  const wrapper = shallow(
    <Timer {...testProps} onEditClick={onEditClick} />
  );
  const edit = wrapper.find('span.edit');
  edit.simulate('click');
  expect(
    onEditClick.calledOnce
  ).toBe(true);
});

it('should handle a trash can click', () => {
  const onTrashClick = sinon.spy();
  const wrapper = shallow(
    <Timer {...testProps} onTrashClick={onTrashClick} />
  );
  const trash = wrapper.find('span.trash');
  trash.simulate('click');
  expect(
    onTrashClick.calledOnce
  ).toBe(true);
});

it('should handle a start click', () => {
  const onStartClick = sinon.spy();
  const wrapper = mount(
    <Timer {...testProps} runningSince={null} onStartClick={onStartClick} />
  );
  const start = wrapper.find('.green');
  start.simulate('click');
  expect(
    onStartClick.calledOnce
  ).toBe(true);
  wrapper.unmount();
});

it('should handle a stop click', () => {
  const onStopClick = sinon.spy();
  const onStartClick = sinon.spy();
  const wrapper = mount(
    <Timer runningSince={1234} onStartClick={onStartClick} onStopClick={onStopClick} />
  );
  const stop = wrapper.find('.red');
  stop.simulate('click');
  expect(
    onStopClick.calledOnce
  ).toBe(true);
  wrapper.unmount();
});

