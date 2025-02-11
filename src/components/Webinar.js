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

const WebinarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const WebinarCard = styled.div`
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const WebinarImage = styled.div`
  height: 160px;
  background-color: #edf2f7;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
`;

const WebinarContent = styled.div`
  padding: 1.5rem;
`;

const Tag = styled.span`
  background: ${props => props.background || '#f6ad55'};
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  margin-right: 0.5rem;
`;

const RegisterButton = styled.button`
  width: 100%;
  background: #f6ad55;
  color: white;
  border: none;
  padding: 0.75rem;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 1rem;
  transition: background-color 0.2s;

  &:hover {
    background: #ed8936;
  }

  &:disabled {
    background: #cbd5e0;
    cursor: not-allowed;
  }
`;

const Webinar = () => {
  const webinars = [
    {
      title: 'Mindfulness Basics',
      description: 'Learn the fundamentals of mindfulness meditation',
      date: '2024-02-15',
      time: '10:00 AM',
      duration: '1 hour',
      speaker: 'Dr. Sarah Johnson',
      icon: '🧘‍♀️',
      tags: ['Beginner', 'Meditation'],
      status: 'upcoming'
    },
    {
      title: 'Stress Management',
      description: 'Effective techniques for managing daily stress',
      date: '2024-02-18',
      time: '2:00 PM',
      duration: '1.5 hours',
      speaker: 'Dr. Michael Chen',
      icon: '🌟',
      tags: ['Wellness', 'Mental Health'],
      status: 'upcoming'
    },
    {
      title: 'Sleep Improvement',
      description: 'Tips and tricks for better sleep quality',
      date: '2024-02-20',
      time: '8:00 PM',
      duration: '1 hour',
      speaker: 'Dr. Emma Williams',
      icon: '😴',
      tags: ['Health', 'Sleep'],
      status: 'upcoming'
    }
  ];

  return (
    <Container>
      <div style={{ width: '100%' }}>
        <Title>Wellness Webinars</Title>

        <WebinarGrid>
          {webinars.map((webinar, index) => (
            <WebinarCard key={index}>
              <WebinarImage>
                {webinar.icon}
              </WebinarImage>
              <WebinarContent>
                <div style={{ marginBottom: '0.5rem' }}>
                  {webinar.tags.map((tag, tagIndex) => (
                    <Tag 
                      key={tagIndex}
                      background={tagIndex % 2 === 0 ? '#f6ad55' : '#4299e1'}
                    >
                      {tag}
                    </Tag>
                  ))}
                </div>
                
                <h2 style={{ color: '#2d3748', marginBottom: '0.5rem' }}>{webinar.title}</h2>
                <p style={{ color: '#4a5568', fontSize: '0.875rem', marginBottom: '1rem' }}>
                  {webinar.description}
                </p>

                <div style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: '0.5rem',
                  color: '#4a5568',
                  fontSize: '0.875rem',
                  marginBottom: '1rem'
                }}>
                  <p>🗓️ {webinar.date} at {webinar.time}</p>
                  <p>⏱️ Duration: {webinar.duration}</p>
                  <p>👤 Speaker: {webinar.speaker}</p>
                </div>

                <RegisterButton>
                  Register Now
                </RegisterButton>
              </WebinarContent>
            </WebinarCard>
          ))}
        </WebinarGrid>
      </div>
    </Container>
  );
};

export default Webinar;