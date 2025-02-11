import React, { useState } from 'react';
import styled from 'styled-components';
import { useAnalytics } from '../context/AnalyticsContext';

const Container = styled.div`
  padding: 2rem;
  background-color: #f0f2f5;
  min-height: 100vh;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  color: #2d3748;
  margin-bottom: 1.5rem;
`;

const InsightsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const CircularProgress = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  text-align: center;

  h3 {
    font-size: 0.875rem;
    color: #4a5568;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .progress-ring {
    position: relative;
    width: 120px;
    height: 120px;
    margin: 0 auto;
  }

  .percentage {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 1.5rem;
    font-weight: bold;
    color: #2d3748;
  }
`;

const PeriodSelect = styled.select`
  border: none;
  background: transparent;
  color: #4a5568;
  font-size: 0.875rem;
  cursor: pointer;
  outline: none;
`;

const PerformanceSection = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

const FilterRow = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const Select = styled.select`
  padding: 0.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 5px;
  background: white;
  color: #4a5568;
  outline: none;
  cursor: pointer;

  &:focus {
    border-color: #f6ad55;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const StatCard = styled.div`
  background: #f7fafc;
  padding: 1.5rem;
  border-radius: 8px;
  
  h3 {
    font-size: 0.875rem;
    color: #4a5568;
    margin-bottom: 0.5rem;
  }
  
  .value {
    font-size: 1.5rem;
    color: #2d3748;
    font-weight: bold;
  }
`;

const ProgressCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 1px solid #e2e8f0;

  &:last-child {
    border-bottom: none;
  }

  .label {
    color: #4a5568;
  }

  .value {
    font-weight: bold;
    color: #2d3748;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .trend-up {
    color: #48bb78;
  }

  .trend-down {
    color: #f56565;
  }
`;

const Analytics = () => {
  const { analyticsData } = useAnalytics();
  const [timeframe, setTimeframe] = useState('All-time');
  const [topic, setTopic] = useState('All');

  const renderCircularProgress = (percentage, title, period, color) => (
    <CircularProgress>
      <h3>
        {title}
        <PeriodSelect value={period} onChange={() => {}}>
          <option value="Weekly">Weekly</option>
          <option value="Monthly">Monthly</option>
          <option value="Yearly">Yearly</option>
        </PeriodSelect>
      </h3>
      <div className="progress-ring">
        <svg width="120" height="120" viewBox="0 0 120 120">
          <circle
            cx="60"
            cy="60"
            r="54"
            fill="none"
            stroke="#e2e8f0"
            strokeWidth="12"
          />
          <circle
            cx="60"
            cy="60"
            r="54"
            fill="none"
            stroke={color}
            strokeWidth="12"
            strokeDasharray={`${percentage * 3.39} 339.292`}
            transform="rotate(-90 60 60)"
          />
        </svg>
        <div className="percentage">{percentage}%</div>
      </div>
    </CircularProgress>
  );

  return (
    <Container>
      <Title>Reports</Title>
      
      <section>
        <h2 style={{ marginBottom: '1rem', color: '#4a5568' }}>Insights</h2>
        <InsightsGrid>
          {renderCircularProgress(analyticsData.meditation.percentage, 'MEDITATION', analyticsData.meditation.period, '#ff6b6b')}
          {renderCircularProgress(analyticsData.exercise.percentage, 'EXERCISE', analyticsData.exercise.period, '#51cf66')}
          {renderCircularProgress(analyticsData.digitalDetox.percentage, 'DIGITAL DETOX', analyticsData.digitalDetox.period, '#ffd43b')}
          {renderCircularProgress(100, 'MOOD TRACKER', analyticsData.moodTracker.period, '#845ef7')}
        </InsightsGrid>
      </section>

      <PerformanceSection>
        <h2 style={{ marginBottom: '1rem', color: '#4a5568' }}>Overall Performance</h2>
        
        <FilterRow>
          <Select value={timeframe} onChange={(e) => setTimeframe(e.target.value)}>
            <option value="All-time">Timeframe: All-time</option>
            <option value="Weekly">Weekly</option>
            <option value="Monthly">Monthly</option>
          </Select>
          
          <Select value={topic} onChange={(e) => setTopic(e.target.value)}>
            <option value="All">Topic: All</option>
            <option value="Meditation">Meditation</option>
            <option value="Exercise">Exercise</option>
          </Select>
        </FilterRow>

        <StatsGrid>
          <StatCard>
            <h3>Challenge Completed</h3>
            <div className="value">{analyticsData.overallPerformance.challengesCompleted}</div>
          </StatCard>
          <StatCard>
            <h3>Webinars attended</h3>
            <div className="value">{analyticsData.overallPerformance.webinarsAttended}</div>
          </StatCard>
          <StatCard>
            <h3>Av. Session Length</h3>
            <div className="value">{analyticsData.overallPerformance.avgSessionLength}</div>
          </StatCard>
          <StatCard>
            <h3>Reward Points</h3>
            <div className="value">{analyticsData.overallPerformance.rewardPoints}</div>
          </StatCard>
        </StatsGrid>

        <div>
          <ProgressCard>
            <span className="label">Journal</span>
            <span className="value">
              {analyticsData.overallPerformance.journal.percentage}%
              <span className="trend-up">↑</span>
            </span>
          </ProgressCard>
          <ProgressCard>
            <span className="label">Relaxation Music</span>
            <span className="value">
              {analyticsData.overallPerformance.relaxationMusic.percentage}%
              <span className="trend-up">↑</span>
            </span>
          </ProgressCard>
          <ProgressCard>
            <span className="label">Relaxation Games</span>
            <span className="value">
              +{analyticsData.overallPerformance.relaxationGames.percentage}%
              <span className="trend-up">↑</span>
            </span>
          </ProgressCard>
        </div>
      </PerformanceSection>
    </Container>
  );
};

export default Analytics;