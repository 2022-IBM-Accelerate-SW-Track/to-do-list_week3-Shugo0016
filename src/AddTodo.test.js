import { red } from '@mui/material/colors';
import { render, screen, fireEvent} from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import App from './App';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});




 test('test that App component doesn\'t render dupicate Task', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});
  const dueDate = "05/30/2023";
  const task = "History Test";
  fireEvent.change(inputTask, { target: { value: task}});
  fireEvent.change(inputDate, { target: { value: dueDate}});
  fireEvent.click(element);
  fireEvent.change(inputTask, { target: { value: task}});
  fireEvent.change(inputDate, { target: { value: dueDate}});
  fireEvent.click(element);
  const check = screen.getByText(/History Test/i);
  expect(check).toBeInTheDocument();
 });

 test('test that App component doesn\'t add a task without task name', () => {
  render(<App />);
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});
  const dueDate = "05/30/2023";
  fireEvent.change(inputDate, { target: { value: dueDate}});
  fireEvent.click(element);
  const check = screen.queryByText('History Test');
  expect(check).toBeNull();

 });

 test('test that App component doesn\'t add a task without due date', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const element = screen.getByRole('button', {name: /Add/i});
  const task = "History Test";
  fireEvent.change(inputTask, { target: { value: task}});
  fireEvent.click(element);
  const check = screen.queryByText('History Test');
  expect(check).toBeNull();
 });


 test('test that App component can be deleted thru checkbox', () => {
  render(<App />);
  
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});
  const dueDate = "05/30/2023";
  const task = "History Test";
  fireEvent.change(inputTask, { target: { value: task}});
  fireEvent.change(inputDate, { target: { value: dueDate}});
  fireEvent.click(element);
  const deleteFromList = screen.getByRole('checkbox');
  fireEvent.click(deleteFromList);
  const check = screen.queryByText('Hockey');
  expect(check).toBeNull();

 });


 test('test that App component renders different colors for past due events', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});
  const dueDate = "05/30/2021";
  const task = "History Test";
  fireEvent.change(inputTask, { target: { value: task}});
  fireEvent.change(inputDate, { target: { value: dueDate}});
  fireEvent.click(element);
  const historyCheck = screen.getByTestId(/History Test/i).style.background;
  expect(historyCheck).toMatch("red");
 });
