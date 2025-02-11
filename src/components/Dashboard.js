import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';

// Existing styled components remain the same until PlanItem
const Container = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #f0f2f5;
`;

const Sidebar = styled.div`
  width: 240px;
  background-color: white;
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #e2e8f0;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  margin-bottom: 2rem;
  img {
    width: 40px;
    height: 40px;
  }
`;

const MainContent = styled.div`
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Greeting = styled.div`
  h1 {
    font-size: 1.5rem;
    color: #2d3748;
    margin-bottom: 0.5rem;
  }
`;

const MoodTracker = styled.div`
  background-color: #fff;
  padding: 1.5rem;
  border-radius: 1rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);

  h2 {
    font-size: 1.2rem;
    color: #2d3748;
    margin-bottom: 1rem;
  }
`;

const EmoticonContainer = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  justify-content: center;
`;

const Emoticon = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  opacity: ${props => props.selected ? 1 : 0.6};
  transform: ${props => props.selected ? 'scale(1.1)' : 'scale(1)'};
  transition: all 0.3s ease;

  span {
    font-size: 2rem;
  }

  p {
    font-size: 0.875rem;
    color: #4a5568;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: #f6ad55;
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #ed8936;
  }
`;

const DayStreak = styled.div`
  background-color: white;
  padding: 1rem;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);

  h2 {
    font-size: 2rem;
    color: #2d3748;
    margin: 0;
  }

  p {
    color: #4a5568;
    margin: 0;
  }

  span {
    font-size: 2rem;
  }
`;

const PlansList = styled.div`
  margin-top: 2rem;
  h2 {
    font-size: 1.2rem;
    color: #2d3748;
    margin-bottom: 1rem;
  }
`;

const PlanItem = styled.div`
  background-color: white;
  padding: 1rem;
  border-radius: 0.5rem;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
  transition: transform 0.2s;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  opacity: ${props => props.completed ? 0.7 : 1};

  &:hover {
    transform: translateX(5px);
  }

  .plan-content {
    flex: 1;
  }

  .plan-title {
    font-weight: 500;
    color: #2d3748;
    text-decoration: ${props => props.completed ? 'line-through' : 'none'};
  }

  .plan-duration {
    font-size: 0.875rem;
    color: #718096;
  }

  .completion-indicator {
    font-size: 1.2rem;
  }
`;

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedMood, setSelectedMood] = useState(null);
  const [streak, setStreak] = useState(0);
  const [completedTasks, setCompletedTasks] = useState([]);

  const moods = [
    { emoji: '😊', text: 'Happy' },
    { emoji: '😌', text: 'Sad' },
    { emoji: '😠', text: 'Angry' },
    { emoji: '😔', text: 'Relaxed' },
    { emoji: '😃', text: 'Excited' },
    { emoji: '😐', text: 'Neutral' }
  ];


  const plans = [
    { icon: '🧘‍♀️', text: 'Meditation', duration: '20 min' },
    { icon: '📝', text: 'Journaling', duration: 'Write about your day' },
    { icon: '🏃‍♂️', text: 'Exercise', duration: '30 min' },
    { icon: '🎵', text: 'Music', duration: '15 min' },
    { icon: '🙏', text: 'Gratitude Reflection', duration: 'List 3 things you\'re grateful for' },
    { icon: '📱', text: 'Digital Detox', duration: '30 min' }
  ];

  useEffect(() => {
    if (completedTasks.length === plans.length && plans.length > 0) {
      setStreak(prevStreak => prevStreak + 1);
    }
  }, [completedTasks, plans.length]);

  const toggleTask = (index) => {
    setCompletedTasks(prev => {
      if (prev.includes(index)) {
        return prev.filter(i => i !== index);
      } else {
        return [...prev, index];
      }
    });
  };

  const handleLogout = () => {
    navigate('/');
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <Container>

      <MainContent>
        <Header>
          <Greeting>
            <h1>Hello, Lily!</h1>
            <p>How are you feeling right now?</p>
          </Greeting>
          <DayStreak>
            <div>
              <h2>{streak}</h2>
              <p>Day Streak</p>
            </div>
            <span>🔥</span>
          </DayStreak>
        </Header>

        <MoodTracker>
          <EmoticonContainer>
            {moods.map((mood, index) => (
              <Emoticon
                key={index}
                selected={selectedMood === index}
                onClick={() => setSelectedMood(index)}
              >
                <span>{mood.emoji}</span>
                <p>{mood.text}</p>
              </Emoticon>
            ))}
          </EmoticonContainer>
          <SubmitButton>Submit</SubmitButton>
        </MoodTracker>

        <PlansList>
          <h2>Your plans for today ({completedTasks.length}/{plans.length})</h2>
          {plans.map((plan, index) => (
            <PlanItem
              key={index}
              completed={completedTasks.includes(index)}
              onClick={() => toggleTask(index)}
            >
              <span>{plan.icon}</span>
              <div className="plan-content">
                <div className="plan-title">{plan.text}</div>
                <div className="plan-duration">{plan.duration}</div>
              </div>
              <span className="completion-indicator">
                {completedTasks.includes(index) ? '✅' : '⭕'}
              </span>
            </PlanItem>
          ))}
        </PlansList>
      </MainContent>
    </Container>
  );
};

export default Dashboard;