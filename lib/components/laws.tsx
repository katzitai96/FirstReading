/* eslint-disable react/no-unescaped-entities */
'use client';
import React, { useEffect, useState } from 'react';

// Define the structure of the law data
type Law = {
  EventName: string;
};

type LawData = {
  CurrentCommitteeEvents: Law[];
};

const LawCount = () => {
  const [lawData, setLawData] = useState<LawData | null>(null); // Store law data
  const [showLawDetails, setShowLawDetails] = useState(false); // State to toggle visibility of law details

  useEffect(() => {
    // Fetch the data from the mock JSON file
    fetch('/mock_data_laws.json')
      .then((response) => response.json())
      .then((data) => {
        setLawData(data);
      });
  }, []);

  if (!lawData) {
    return <div>Loading...</div>;
  }

  // Helper function to count occurrences of "הצעת חוק"
  const countOccurrences = (text: string, phrase: string) => {
    const regex = new RegExp(phrase, 'g');
    const matches = text.match(regex);
    return matches ? matches.length : 0;
  };

  // Remove HTML tags and links, adding space between text after links
  const removeHtmlTags = (text: string) => {
    const cleanedText = text.replace(/<a[^>]*>(.*?)<\/a>/g, '$1' + ' - '); // Remove <a> tags and keep text inside, add - after it
    return cleanedText.replace(/<[^>]+>/g, ''); // Remove all other HTML tags
  };

  // Filter events where "הצעת חוק" appears
  const filteredEvents = lawData.CurrentCommitteeEvents.filter((event) => {
    const text = removeHtmlTags(event.EventName); // Remove HTML tags
    return countOccurrences(text, 'הצעת חוק') > 0;
  });

  // Calculate the total count of "הצעת חוק"
  const totalCount = filteredEvents.length;

  const toggleLawDetails = () => {
    setShowLawDetails(!showLawDetails); // Toggle visibility of law details
  };

  return (
    <div dir="rtl">
      <p onClick={toggleLawDetails} style={{ cursor: 'pointer' }}>
        {totalCount} הצעות חוק
      </p>
      {showLawDetails && (
        <div>
          {filteredEvents.map((event, index) => (
            <div key={index}>
              {/* Render cleaned text without links and with spaces between link and following text */}
              <p>{removeHtmlTags(event.EventName)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LawCount;