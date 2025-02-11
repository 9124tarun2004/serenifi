import React, { createContext, useContext, useState } from 'react';

const AnalyticsContext = createContext();

export const useAnalytics = () => {
  return useContext(AnalyticsContext);
};

export const AnalyticsProvider = ({ children }) => {
  const [analyticsData, setAnalyticsData] = useState({
    meditation: {
      percentage: 25,
      period: 'Weekly'
    },
    exercise: {
      percentage: 79,
      period: 'Weekly'
    },
    digitalDetox: {
      percentage: 52,
      period: 'Weekly'
    },
    moodTracker: {
      data: [
        { label: 'Very Happy', percentage: 40 },
        { label: '25% Stressed', percentage: 25 },
        { label: '15% Relaxed', percentage: 15 },
        { label: '10% Angry', percentage: 10 }
      ],
      period: 'Weekly'
    },
    overallPerformance: {
      challengesCompleted: 27,
      webinarsAttended: 12,
      avgSessionLength: '2m 34s',
      rewardPoints: 40,
      journal: {
        percentage: 64,
        trend: 'up'
      },
      relaxationMusic: {
        percentage: 86,
        trend: 'up'
      },
      relaxationGames: {
        percentage: 34,
        trend: 'up'
      }
    }
  });

  const updateAnalytics = (category, data) => {
    setAnalyticsData(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        ...data
      }
    }));
  };

  return (
    <AnalyticsContext.Provider value={{ analyticsData, updateAnalytics }}>
      {children}
    </AnalyticsContext.Provider>
  );
};
