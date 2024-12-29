"use client";
import { useState, useEffect } from 'react';
export default function CurrentDate() {
  const [date, setDate] = useState({ day: '', month: '', year: '' });

  useEffect(() => {
    const updateDate = () => {
      const today = new Date();

      // Format the date (day, month, year) in Hebrew
      const formattedDate = new Intl.DateTimeFormat('he-IL', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }).format(today);

      // Split the formatted date into day, month, and year
      const [day, month, year] = formattedDate.split(' ');

      setDate({ day, month, year }); // Store day, month, and year separately
    };

    updateDate(); // Set the initial date
    const interval = setInterval(updateDate, 86400000); // Update once a day

    return () => clearInterval(interval); // Clean up when the component is unmounted
  }, []);

  return (
    <div className='Date'>
      <p>
        <span className="Date-number-fig">{date.day}</span>
        <br></br> 
        <span >{date.month} </span> 
        <span >{date.year}</span>
      </p>
    </div>
  );
}