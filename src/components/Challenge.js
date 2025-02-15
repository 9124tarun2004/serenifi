import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #f0f2f5;
  padding: 2rem;
`;

const ChallengeCard = styled.div`
  background: white;
  border-radius: 10px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
  }
`;

const Title = styled.h1`
  font-size: 1.5rem;
  color: #2d3748;
  margin-bottom: 1.5rem;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background-color: #edf2f7;
  border-radius: 4px;
  margin-top: 1rem;
`;

const Progress = styled.div`
  width: ${props => props.progress}%;
  height: 100%;
  background-color: #007bff;
  border-radius: 4px;
  transition: width 0.3s ease;
`;

const Challenge = () => {
  const [challenges] = useState([
    {
      title: '7 Days of Meditation',
      description: 'Meditate for at least 10 minutes every day',
      progress: 70,
      reward: '50 points'
    },
    {
      title: 'Gratitude Journal',
      description: 'Write 3 things you are grateful for each day',
      progress: 40,
      reward: '30 points'
    },
    {
      title: 'Mood Tracking Streak',
      description: 'Track your mood for 5 consecutive days',
      progress: 100,
      reward: '45 points'
    }
  ]);

  return (
    <Container>
      <div style={{ width: '100%' }}>
        <Title>Daily Challenges</Title>
        
        {challenges.map((challenge, index) => (
          <ChallengeCard key={index}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h2 style={{ color: '#2d3748', marginBottom: '0.5rem' }}>{challenge.title}</h2>
                <p style={{ color: '#4a5568' }}>{challenge.description}</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ 
                  background: '#007bff', 
                  color: 'white', 
                  padding: '0.5rem 1rem', 
                  borderRadius: '20px',
                  fontSize: '0.875rem' 
                }}>
                  {challenge.reward}
                </span>
              </div>
            </div>
            <ProgressBar>
              <Progress progress={challenge.progress} />
            </ProgressBar>
            <div style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: '#4a5568' }}>
              {challenge.progress}% Complete
            </div>
          </ChallengeCard>
        ))}
      </div>
    </Container>
  );
};

export default Challenge;