import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';

const PointsContext = createContext();

export const POINT_ACTIONS = {
  JOURNAL_ENTRY: 50,          // Points for creating a journal entry
  DAILY_CHECKIN: 20,         // Points for daily check-in
  CHALLENGE_COMPLETE: 100,    // Points for completing a challenge
  COMMUNITY_POST: 30,        // Points for making a community post
  COMMUNITY_COMMENT: 10,     // Points for commenting
  MEDITATION_COMPLETE: 40,   // Points for completing meditation
  MOOD_TRACK: 15,           // Points for tracking mood
  WEEKLY_STREAK: 150,       // Bonus points for weekly streak
  PLANT_NAMING: 50,         // Initial points for naming plant
  GAME_COMPLETE: 25,        // Points for completing a mental health game
  MUSIC_SESSION: 20,        // Points for completing a music therapy session
  WEBINAR_ATTEND: 75,       // Points for attending a webinar
};

export const PointsProvider = ({ children }) => {
  const [points, setPoints] = useState(
    parseInt(localStorage.getItem('plantPoints')) || 0
  );
  const [pointHistory, setPointHistory] = useState(
    JSON.parse(localStorage.getItem('pointHistory')) || []
  );

  useEffect(() => {
    localStorage.setItem('plantPoints', points);
  }, [points]);

  useEffect(() => {
    localStorage.setItem('pointHistory', JSON.stringify(pointHistory));
  }, [pointHistory]);

  const addPoints = (amount, action) => {
    setPoints(prevPoints => prevPoints + amount);
    setPointHistory(prev => [
      ...prev,
      {
        action,
        points: amount,
        timestamp: new Date().toISOString()
      }
    ]);
  };

  const getPointHistory = () => {
    return pointHistory;
  };

  const getDailyPoints = () => {
    const today = new Date().toDateString();
    return pointHistory
      .filter(entry => new Date(entry.timestamp).toDateString() === today)
      .reduce((sum, entry) => sum + entry.points, 0);
  };

  const getWeeklyStreak = useCallback(() => {
    const now = new Date();
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    
    const dailyActivity = new Set();
    pointHistory.forEach(entry => {
      const date = new Date(entry.timestamp).toDateString();
      if (new Date(entry.timestamp) >= oneWeekAgo) {
        dailyActivity.add(date);
      }
    });

    return dailyActivity.size;
  }, [pointHistory]);

  // Check and award weekly streak bonus
  useEffect(() => {
    const streak = getWeeklyStreak();
    if (streak === 7) {
      addPoints(POINT_ACTIONS.WEEKLY_STREAK, 'Weekly Streak Bonus');
    }
  }, [getWeeklyStreak]);

  return (
    <PointsContext.Provider value={{
      points,
      addPoints,
      getPointHistory,
      getDailyPoints,
      getWeeklyStreak
    }}>
      {children}
    </PointsContext.Provider>
  );
};

export const usePoints = () => {
  const context = useContext(PointsContext);
  if (!context) {
    throw new Error('usePoints must be used within a PointsProvider');
  }
  return context;
};
