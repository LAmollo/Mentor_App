import React from 'react';

const MentorCard = ({ mentor }) => {
  return (
    <div>
      <h3>{mentor.name}</h3>
      <p>Industry: {mentor.industry}</p>
      <p>Email: {mentor.email}</p>
    </div>
  );
};

export default MentorCard;
