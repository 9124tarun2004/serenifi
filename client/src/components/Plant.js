import React, { useState } from 'react';
import { usePoints, POINT_ACTIONS } from '../context/PointsContext';
import '../styles/Plant.css';

const Plant = () => {
  const [plantName, setPlantName] = useState(localStorage.getItem('plantName') || '');
  const [showNameInput, setShowNameInput] = useState(!localStorage.getItem('plantName'));
  const { points, addPoints, getDailyPoints, getWeeklyStreak } = usePoints();

  const plantStages = [
    { minPoints: 0, stage: 'seed', emoji: '🌱', description: 'A tiny seed full of potential' },
    { minPoints: 100, stage: 'sprout', emoji: '🌿', description: 'Your plant has sprouted!' },
    { minPoints: 300, stage: 'sapling', emoji: '🌳', description: 'Growing stronger each day' },
    { minPoints: 600, stage: 'young-tree', emoji: '🌲', description: 'A beautiful young tree' },
    { minPoints: 1000, stage: 'mature-tree', emoji: '🌳', description: 'A majestic mature tree' },
  ];

  const getCurrentStage = () => {
    return plantStages.reduce((prev, curr) => {
      return points >= curr.minPoints ? curr : prev;
    });
  };

  const getProgressToNextStage = () => {
    const currentStageIndex = plantStages.findIndex(stage => stage === getCurrentStage());
    const nextStage = plantStages[currentStageIndex + 1];
    
    if (!nextStage) return 100; // Max level reached

    const pointsNeededForNext = nextStage.minPoints - getCurrentStage().minPoints;
    const currentProgress = points - getCurrentStage().minPoints;
    return (currentProgress / pointsNeededForNext) * 100;
  };

  const handleNameSubmit = (e) => {
    e.preventDefault();
    if (plantName.trim()) {
      localStorage.setItem('plantName', plantName);
      setShowNameInput(false);
      // Give initial points for naming the plant
      addPoints(POINT_ACTIONS.PLANT_NAMING, 'Named your plant');
    }
  };

  const currentStage = getCurrentStage();
  const progressPercent = getProgressToNextStage();
  const dailyPoints = getDailyPoints();
  const weeklyStreak = getWeeklyStreak();

  return (
    <div className="plant-container">
      {showNameInput ? (
        <div className="name-input-container">
          <h2>Name Your Plant</h2>
          <p>Every great journey begins with a name. What would you like to call your plant?</p>
          <form onSubmit={handleNameSubmit}>
            <input
              type="text"
              value={plantName}
              onChange={(e) => setPlantName(e.target.value)}
              placeholder="Enter plant name..."
              maxLength={20}
              required
            />
            <button type="submit">Start Growing</button>
          </form>
        </div>
      ) : (
        <div className="plant-status">
          <div className="plant-info">
            <h2>{plantName}'s Growth Journey</h2>
            <div className="points-display">
              <span>{points} Total Points</span>
              <span className="daily-points">Today: +{dailyPoints}</span>
            </div>
          </div>
          
          <div className="plant-visualization">
            <div className="stage-emoji">{currentStage.emoji}</div>
            <div className="stage-name">{currentStage.stage}</div>
            <div className="stage-description">{currentStage.description}</div>
          </div>

          <div className="progress-container">
            <div 
              className="progress-bar" 
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>

          <div className="stage-info">
            <p>Current Stage: {currentStage.stage}</p>
            {plantStages.findIndex(stage => stage === currentStage) < plantStages.length - 1 && (
              <p>Points needed for next stage: {
                plantStages[plantStages.findIndex(stage => stage === currentStage) + 1].minPoints - points
              }</p>
            )}
          </div>

          <div className="streak-info">
            <p>Weekly Streak: {weeklyStreak} days</p>
            <p>Keep your streak going to earn bonus points!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Plant;
