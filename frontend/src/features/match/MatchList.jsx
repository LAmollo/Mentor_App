import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MatchList = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await axios.get('/api/match');
        setMatches(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.response.data);
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  return (
    <div>
      <h1>Matches</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <ul>
          {matches.map((match) => (
            <li key={match.student._id}>
              <h3>{match.student.name}</h3>
              <p>University: {match.student.university}</p>
              <p>Major: {match.student.major}</p>
              <h4>Compatible Mentors:</h4>
              <ul>
                {match.mentors.map((mentor) => (
                  <li key={mentor._id}>
                    <p>{mentor.name}</p>
                    <p>{mentor.company}</p>
                    <p>Expertise: {mentor.expertise.join(', ')}</p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MatchList;
