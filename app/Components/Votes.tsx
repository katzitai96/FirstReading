"use client";
import React, { useEffect, useState } from "react";

type Vote = {
  VoteId: number;
  VoteProtocolNo: number;
  VoteDate: string;
  VoteDateStr: string;
  VoteTimeStr: string;
  VoteType: string;
  ItemTitle: string;
  VoteDateLongStr: string;
  KnessetId: number;
  SessionId: number;
};

type VoteData = {
  Table: Vote[];
};

const VoteCount = () => {
  const [voteData, setVoteData] = useState<VoteData | null>(null);
  const [showItemTitles, setShowItemTitles] = useState(false);

  useEffect(() => {
    fetch("/mock_data_votes.json")
      .then((response) => response.json())
      .then((data) => {
        setVoteData(data);
      });
  }, []);

  if (!voteData) {
    return <div>Loading...</div>;
  }

  const toggleItemTitles = () => {
    setShowItemTitles(!showItemTitles);
  };

  return (
    <>
      <div className="Component" onClick={toggleItemTitles} id="Schedule">
        <header className="Component-header">
          <h1>הצבעות</h1>
          {/* <a href="#">
            <img src="Share-icon.png" alt="Share icon" />
          </a> */}
        </header>
        <main className="Component-main">
          <section className="Schedule-section" id="Comeeties">
            <div>
              <h1
                className="number-fig"
                id="schedule-vote-number"
                style={{ cursor: "pointer" }}
              >
                {voteData.Table.length}
              </h1>
            </div>
            <h4>הצבעות</h4>
          </section>

          {/* {showItemTitles && ( */}
          <section className="Schedule-section" id="Comeeties">
            <ul>
              {voteData.Table.map((vote) => (
                <li key={vote.VoteId}>{vote.ItemTitle}</li>
              ))}
            </ul>
          </section>
          {/* )} */}
        </main>
        <footer className="Component-footer">
          <div>
            <a href="#" className="expand-component">
              <p>לרשימה המלאה</p>
              {/* <img src="Schedule-arrow.png" alt="arrow" /> */}
            </a>
          </div>
        </footer>
      </div>
    </>
  );
};

export default VoteCount;
