import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #f0f2f5;
  padding: 2rem;
`;

const Card = styled.div`
  background: white;
  border-radius: 10px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 1.5rem;
  color: #2d3748;
  margin-bottom: 1.5rem;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const StatCard = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  
  h3 {
    color: #4a5568;
    font-size: 0.875rem;
    margin-bottom: 0.5rem;
  }
  
  p {
    color: #2d3748;
    font-size: 1.5rem;
    font-weight: bold;
  }
`;

const Analytics = () => {
  const stats = [
    { title: 'Mood Score', value: '8.5/10' },
    { title: 'Tasks Completed', value: '85%' },
    { title: 'Streak', value: '12 days' },
    { title: 'Journal Entries', value: '24' }
  ];

  return (
    <Container>
      <div style={{ width: '100%' }}>
        <Title>Analytics Dashboard</Title>
        
        <StatsGrid>
          {stats.map((stat, index) => (
            <StatCard key={index}>
              <h3>{stat.title}</h3>
              <p>{stat.value}</p>
            </StatCard>
          ))}
        </StatsGrid>

        <Card>
          <h2 style={{ marginBottom: '1rem', color: '#2d3748' }}>Mood Trends</h2>
          {/* Add chart component here */}
          <div style={{ height: '300px', background: '#f7fafc', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            Chart Placeholder
          </div>
        </Card>

        <Card>
          <h2 style={{ marginBottom: '1rem', color: '#2d3748' }}>Activity Log</h2>
          {/* Add activity log component here */}
          <div style={{ background: '#f7fafc', borderRadius: '8px', padding: '1rem' }}>
            <p>• Completed meditation - 20 minutes ago</p>
            <p>• Logged mood as "Happy" - 2 hours ago</p>
            <p>• Finished daily journal - 5 hours ago</p>
          </div>
        </Card>
      </div>
    </Container>
  );
};

export default Analytics;