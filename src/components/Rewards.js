import React, { useState } from 'react';
import styled, { keyframes, css } from 'styled-components';

const shine = keyframes`
  0% { background-position: -100px; }
  40%, 100% { background-position: 140px; }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const rotate = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Container = styled.div`
  padding: 2rem;
  background: linear-gradient(135deg, #f6f8fc 0%, #e9edf7 100%);
  min-height: 100vh;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #2d3748;
  margin-bottom: 1rem;
  position: relative;
  display: inline-block;

  &:after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 60%;
    height: 4px;
    background: linear-gradient(90deg, #f6ad55, #ed8936);
    border-radius: 2px;
  }
`;

const PointsDisplay = styled.div`
  background: white;
  padding: 1.5rem 2rem;
  border-radius: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  display: inline-flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  position: relative;
  overflow: hidden;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: -100px;
    width: 40px;
    height: 100%;
    background: linear-gradient(
      to right,
      transparent 0%,
      rgba(255, 255, 255, 0.8) 50%,
      transparent 100%
    );
    animation: ${css`${shine}`} 3s infinite linear;
  }
`;

const Medal = styled.span`
  font-size: 2.5rem;
  animation: ${css`${float}`} 3s infinite ease-in-out;
`;

const Points = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #2d3748;
`;

const Subtitle = styled.p`
  color: #4a5568;
  font-size: 1rem;
  margin-top: 0.5rem;
`;

const RewardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const RewardCard = styled.div`
  background: white;
  border-radius: 20px;
  padding: 2rem;
  position: relative;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
  }

  ${props => props.locked && `
    &:after {
      content: '🔒';
      position: absolute;
      top: 1rem;
      right: 1rem;
      font-size: 1.5rem;
    }
  `}
`;

const RewardIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1.5rem;
  position: relative;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.locked ? '#f7fafc' : 'linear-gradient(135deg, #ffd1c1 0%, #ffa69e 100%)'};
  border-radius: 50%;
  animation: ${props => props.spinning ? css`${rotate}` : css`${float}`} ${props => props.spinning ? '5s' : '3s'} infinite ${props => props.spinning ? 'linear' : 'ease-in-out'};
`;

const RewardTitle = styled.h3`
  font-size: 1.25rem;
  color: #2d3748;
  margin-bottom: 0.5rem;
`;

const RewardDescription = styled.p`
  color: #4a5568;
  font-size: 0.875rem;
  margin-bottom: 1.5rem;
  flex-grow: 1;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: #edf2f7;
  border-radius: 4px;
  margin: 1rem 0;
  overflow: hidden;
  position: relative;
`;

const Progress = styled.div`
  width: ${props => props.progress}%;
  height: 100%;
  background: linear-gradient(90deg, #f6ad55, #ed8936);
  border-radius: 4px;
  transition: width 0.3s ease;
`;

const PointsRequired = styled.div`
  font-size: 0.875rem;
  color: #718096;
  margin-bottom: 1rem;
`;

const RedeemButton = styled.button`
  background: ${props => props.disabled ? '#cbd5e0' : 'linear-gradient(90deg, #f6ad55, #ed8936)'};
  color: white;
  border: none;
  padding: 0.75rem 2rem;
  border-radius: 9999px;
  font-weight: 500;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: transform 0.2s;
  width: 100%;

  &:hover {
    transform: ${props => props.disabled ? 'none' : 'scale(1.05)'};
  }
`;

const Rewards = () => {
  const [currentPoints] = useState(150);

  const rewards = [
    {
      icon: '🧘‍♀️',
      title: 'Premium Meditation Pack',
      description: 'Unlock 30 premium meditation sessions with expert guidance',
      pointsRequired: 100,
      spinning: false
    },
    {
      icon: '🎨',
      title: 'Custom Theme',
      description: 'Unlock a custom app theme to personalize your experience',
      pointsRequired: 200,
      spinning: true
    },
    {
      icon: '🌱',
      title: 'Virtual Plant',
      description: 'Get a special virtual plant for your garden that grows with your progress',
      pointsRequired: 150,
      spinning: false
    },
    {
      icon: '🏆',
      title: 'Achievement Badge',
      description: 'Exclusive profile badge to showcase your dedication',
      pointsRequired: 75,
      spinning: true
    },
    {
      icon: '🎯',
      title: 'Goal Booster',
      description: 'Unlock advanced goal tracking features and insights',
      pointsRequired: 250,
      spinning: false
    },
    {
      icon: '🌟',
      title: 'Premium Status',
      description: 'Get a special status with unique app features',
      pointsRequired: 300,
      spinning: true
    }
  ];

  const calculateProgress = (pointsRequired) => {
    return Math.min((currentPoints / pointsRequired) * 100, 100);
  };

  return (
    <Container>
      <Header>
        <Title>Rewards Center</Title>
        <PointsDisplay>
          <Medal>🏅</Medal>
          <div>
            <Points>{currentPoints} Points</Points>
            <Subtitle>Keep completing tasks to earn more!</Subtitle>
          </div>
        </PointsDisplay>
      </Header>

      <RewardsGrid>
        {rewards.map((reward, index) => (
          <RewardCard key={index} locked={currentPoints < reward.pointsRequired}>
            <RewardIcon spinning={reward.spinning} locked={currentPoints < reward.pointsRequired}>
              {reward.icon}
            </RewardIcon>
            <RewardTitle>{reward.title}</RewardTitle>
            <RewardDescription>{reward.description}</RewardDescription>
            <PointsRequired>{reward.pointsRequired} points required</PointsRequired>
            <ProgressBar>
              <Progress progress={calculateProgress(reward.pointsRequired)} />
            </ProgressBar>
            <RedeemButton 
              disabled={currentPoints < reward.pointsRequired}
              onClick={() => {
                if (currentPoints >= reward.pointsRequired) {
                  // Handle redemption logic
                  alert(`Redeeming ${reward.title}!`);
                }
              }}
            >
              {currentPoints >= reward.pointsRequired ? 'Redeem' : `Need ${reward.pointsRequired - currentPoints} more points`}
            </RedeemButton>
          </RewardCard>
        ))}
      </RewardsGrid>
    </Container>
  );
};

export default Rewards;