import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #f0f2f5;
  padding: 2rem;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  color: #2d3748;
  margin-bottom: 1.5rem;
`;

const PointsCard = styled.div`
  background: white;
  border-radius: 10px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const RewardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
`;

const RewardCard = styled.div`
  background: white;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const RedeemButton = styled.button`
  background: ${props => props.disabled ? '#cbd5e0' : '#f6ad55'};
  color: white;
  border: none;
  padding: 0.75rem;
  border-radius: 5px;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: background-color 0.2s;

  &:hover {
    background: ${props => props.disabled ? '#cbd5e0' : '#ed8936'};
  }
`;

const Rewards = () => {
  const userPoints = 150;
  
  const rewards = [
    {
      title: 'Premium Meditation Pack',
      description: 'Unlock 30 premium meditation sessions',
      points: 100,
      icon: '🧘‍♀️'
    },
    {
      title: 'Custom Theme',
      description: 'Unlock a custom app theme',
      points: 200,
      icon: '🎨'
    },
    {
      title: 'Virtual Plant',
      description: 'Get a special virtual plant for your garden',
      points: 150,
      icon: '🌱'
    },
    {
      title: 'Achievement Badge',
      description: 'Exclusive profile badge',
      points: 75,
      icon: '🏆'
    }
  ];

  return (
    <Container>
      <div style={{ width: '100%' }}>
        <Title>Rewards</Title>

        <PointsCard>
          <span style={{ fontSize: '2rem' }}>🏅</span>
          <div>
            <h2 style={{ color: '#2d3748', marginBottom: '0.25rem' }}>{userPoints} Points</h2>
            <p style={{ color: '#4a5568', fontSize: '0.875rem' }}>Keep completing tasks to earn more!</p>
          </div>
        </PointsCard>

        <RewardsGrid>
          {rewards.map((reward, index) => (
            <RewardCard key={index}>
              <span style={{ fontSize: '2rem' }}>{reward.icon}</span>
              <div>
                <h3 style={{ color: '#2d3748', marginBottom: '0.5rem' }}>{reward.title}</h3>
                <p style={{ color: '#4a5568', fontSize: '0.875rem' }}>{reward.description}</p>
              </div>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center'
              }}>
                <span style={{ color: '#4a5568', fontSize: '0.875rem' }}>
                  {reward.points} points
                </span>
                <RedeemButton disabled={userPoints < reward.points}>
                  {userPoints >= reward.points ? 'Redeem' : 'Not enough points'}
                </RedeemButton>
              </div>
            </RewardCard>
          ))}
        </RewardsGrid>
      </div>
    </Container>
  );
};

export default Rewards;