import { render, screen, fireEvent} from '@testing-library/react';
import BookingPage from './components/BookingPage';
import {initializeTimes, updateTimes} from './components/BookingPage';
import { MemoryRouter } from 'react-router-dom';

describe("Unit tests",()=>{
  test("test initialTimes", ()=> {
    const result = initializeTimes();
    expect(result.length).toBeGreaterThan(0); 
  });
  
  test("test updateTimes", ()=>{
    const initialState = [];
    const action = { type: 'update', payload: '2024-09-30' }
    const result = updateTimes(initialState, action);
    expect(result.length).toBeGreaterThan(0); 
  });
});

describe('Testing Book form', () =>{
    beforeEach(() =>{
      render(
        <MemoryRouter>
          <BookingPage />
        </MemoryRouter>
      );
    });

    test('should validate date input and show error for the past date', () =>{
        const dateInput = screen.getByLabelText(/Choose date/i);
        fireEvent.change(dateInput, { target: { value: '2020-01-01' } });
        fireEvent.blur(dateInput);
        expect(screen.getByText(/Please select another date/i)).toBeInTheDocument();
    });

    test('should validate date input and show  no error for the future date', () =>{
      const dateInput = screen.getByLabelText(/Choose date/i);
      fireEvent.change(dateInput, { target: { value: '2024-12-09' } });
      fireEvent.blur(dateInput);
      expect(screen.queryByText(/Please select another date/i)).not.toBeInTheDocument();
  });

    test('should allow changing time from available times array and not be null', () => {
      const timeSelect = screen.getByLabelText(/Choose time/i);
      expect(timeSelect).not.toBeEmptyDOMElement(); 
    });

    test('should disable submit button for invalid form', () => {
      const submitButton = screen.getByRole('button', { name: /Book/i });
      // Simulate invalid form by selecting a past date
      const dateInput = screen.getByLabelText(/Choose date/i);
      fireEvent.change(dateInput, { target: { value: '2020-01-01' } });
      expect(submitButton).toBeDisabled();

    });

    test('should enable submit button for invalid form', () => {
      const submitButton = screen.getByRole('button', { name: /Book/i });
      const dateInput = screen.getByLabelText(/Choose date/i);
      const guestsInput = screen.getByLabelText(/Number of guests/i);

      fireEvent.change(dateInput, { target: { value: '2025-01-01' } });
      fireEvent.change(guestsInput, { target: { value: 2 } });
      expect(submitButton).toBeEnabled();

    });

    test('should validate guests input between 1 and 10', () => {
      const guestsInput = screen.getByLabelText(/Number of guests/i);
  
      // Simulate entering a valid number of guests
      fireEvent.change(guestsInput, { target: { value: 5 } });
      expect(guestsInput.value).toBe("5");
  
      // Simulate entering an invalid number of guests (more than 10)
      fireEvent.change(guestsInput, { target: { value: 12 } });
      expect(guestsInput.value).toBe("1");  // Should be allowed, but form should not submit
      expect(screen.getByText(/Please select the number between 1 and 10/i)).toBeInTheDocument();
    });  
});