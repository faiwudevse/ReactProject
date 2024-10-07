import { useState } from "react";
import './BookingForm.css'

const DateErrorMessage = () => {
    return (
        <p className="FieldError">Please select another date</p>
    );
};

const GuestErrorMessage = () => {
    return (
        <p className="FieldError">Please select the number between 1 and 10</p>
    );
}

const BookingForm =({availableTimes, dispatch, submitForm}) => {
    const today = new Date().toISOString().split('T')[0];
    const [date, setDate]= useState(today);

    const [time, setTime] = useState(availableTimes[0]);
    const [guests, setGuests]= useState(1);
    const [occasion, setOccasion] = useState("Birthday");
    const [error, setError] = useState(false);
    const [guestError, setGuestError] = useState(false);

    const validateForm = () => {

        if (!compareDates(date)) {
            return false;
        }

        if(!time) {
            return false;
        }
        if (!guestRange(guests)){
            return false;
        }

        return true; 
    };

    const guestRange = (guest) => {
        if (guest < 1 || guest > 10){
            return false;
        }
        return true;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            const formData = {
                date,
                time,
                guests,
                occasion
            };
            submitForm(formData);
        };
    }
    // add date comprison function, return true select date is greater or equal today; return false select date is past date today
    const compareDates = (d1) =>{
        const date1 = new Date(d1).toISOString().split('T')[0];
        
        const today = new Date().toISOString().split('T')[0];

        if (date1 < today) return false;

        return true;
        
    }

    const handleDateChange = (e) => {
        const selectedDate = e.target.value;

        // Dispatch the action to update times based on the new date
        dispatch({ type: 'update', payload: selectedDate });
        if (!compareDates(selectedDate)){
            setError(true)
        } else{
            setError(false)
        }
        setDate(selectedDate);
      };
    
      const handleGuestChange = (e) => {
        let selectedGuest = e.target.value;
        if (guestRange(selectedGuest)){
            setGuestError(false);
        } else {
            setGuestError(true);
            selectedGuest = 1;
        }
        setGuests(selectedGuest);
      }

    return (
    <form onSubmit={handleSubmit}>
        <h2>Book Now</h2>

        {/* todo add the error message in date when user select the old date */}

        <div>
            <label htmlFor="res-date">Choose date</label>
            <input type="date" id="res-date" value={date} onChange={handleDateChange} aria-invalid={error} aria-describedby={error ? "date-error" : undefined}/>
            {error? <DateErrorMessage/>: null }
        </div>

        <br/>

        <div>
            <label htmlFor="res-time">Choose time</label>
            <select id="res-time" value={time} onChange={(e)=> setTime(e.target.value)}>
                {availableTimes.map((time, index) => (
                    <option key={index} value={time}>{time}</option>
            ))}
            </select>
        </div>

        <br/>

        <div>
            <label htmlFor="guests">Number of guests</label>
            <input type="number" placeholder="1" min="1" max="10" id="guests" value={guests} onChange={handleGuestChange} aria-invalid={guestError} aria-describedby={guestError ? "date-error" : undefined}/>
            {guestError? <GuestErrorMessage/>: null }
        </div>

        <br/>

        <div>
            <label htmlFor="occasion">Occasion</label>
            <select id="occasion" value={occasion} onChange={(e) =>setOccasion(e.target.value)}>
                <option value="Birthday">Birthday</option>
                <option value="Anniversary">Anniversary</option>
            </select>
        </div>

        <br/>

        <button type="submit" disabled={!validateForm()} >
            Book
        </button>

    </form>
    );
}

export default BookingForm;