import React, { useReducer } from "react";
import BookingForm from "./BookingForm";
import { useNavigate } from "react-router-dom";

const seededRandom = function (seed) {
    var m = 2**35 - 31;
    var a = 185852;
    var s = seed % m;
    return function () {
        return (s = s * a % m) / m;
    };
}

const fetchAPI = function(date) {
    let result = [];
    let random = seededRandom(date.getDate());

    for(let i = 17; i <= 23; i++) {
        if(random() < 0.5) {
            result.push(i + ':00');
        }
        if(random() < 0.5) {
            result.push(i + ':30');
        }
    }
    return result;
};

const submitAPI = function(formData) {
    return true;
};

const submitForm = function(data, navigate) {
    if (submitAPI(data)) {
        navigate("/confirmation");
    }
};
// Initialize times (static for now)
const initializeTimes = (date) => {
    const dateObject = (date instanceof Date) ? date : new Date();
    return fetchAPI(dateObject);
  };

const updateTimes = (state, action) => {
    switch (action.type) {
      case 'update': 
        // For now, return the same times regardless of the date
        return initializeTimes(action.payload);
      default:
        return state;
    }
  };

function BookingPage() {
    const [availableTimes, dispatch] = useReducer(updateTimes, [],initializeTimes);
    const navigate = useNavigate();
    return (
        <div>
            <BookingForm availableTimes={availableTimes} dispatch={dispatch} submitForm={(data) => submitForm(data, navigate)}/>
        </div>
    );
}

export default BookingPage;
export { initializeTimes, updateTimes };