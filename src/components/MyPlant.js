import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/MyPlant.css';

const GROWTH_STAGES = {
  SEED: {
    name: 'Seed',
    image: '/assets/plant-stages/seed.svg',
    minCredits: 0,
    description: 'A tiny seed full of potential'
  },
  SPROUT: {
    name: 'Sprout',
    image: '/assets/plant-stages/sprout.svg',
    minCredits: 100,
    description: 'Your plant has sprouted! Keep nurturing it'
  },
  SAPLING: {
    name: 'Sapling',
    image: '/assets/plant-stages/sapling.svg',
    minCredits: 300,
    description: 'Growing stronger each day'
  },
  YOUNG_TREE: {
    name: 'Young Tree',
    image: '/assets/plant-stages/young-tree.svg',
    minCredits: 600,
    description: 'Reaching new heights'
  },
  MATURE_TREE: {
    name: 'Mature Tree',
    image: '/assets/plant-stages/mature-tree.svg',
    minCredits: 1000,
    description: 'A majestic tree, symbol of your growth'
  }
};

const MyPlant = () => {
  const navigate = useNavigate();
  const [plantName, setPlantName] = useState('');
  const [isNaming, setIsNaming] = useState(true);
  const [credits, setCredits] = useState(0);
  const [currentStage, setCurrentStage] = useState(GROWTH_STAGES.SEED);

  useEffect(() => {
    // Load plant data from localStorage
    const savedPlant = localStorage.getItem('myPlant');
    if (savedPlant) {
      const { name, credits } = JSON.parse(savedPlant);
      setPlantName(name);
      setCredits(credits);
      setIsNaming(false);
    }
  }, []);

  useEffect(() => {
    // Update growth stage based on credits
    const newStage = Object.values(GROWTH_STAGES).reverse().find(
      stage => credits >= stage.minCredits
    );
    setCurrentStage(newStage);
  }, [credits]);

  const handleNameSubmit = (e) => {
    e.preventDefault();
    if (plantName.trim()) {
      localStorage.setItem('myPlant', JSON.stringify({ name: plantName, credits: 0 }));
      setIsNaming(false);
      navigate('/my-plant', { replace: true });
    }
  };

  const getProgressToNextStage = () => {
    const stages = Object.values(GROWTH_STAGES);
    const currentIndex = stages.findIndex(stage => stage.name === currentStage.name);
    const nextStage = stages[currentIndex + 1];
    
    if (!nextStage) return 100;

    const creditsToNext = nextStage.minCredits - currentStage.minCredits;
    const currentProgress = credits - currentStage.minCredits;
    return Math.min((currentProgress / creditsToNext) * 100, 100);
  };

  if (isNaming) {
    return (
      <div className="my-plant">
        <div className="plant-naming">
          <h2>Welcome to Your Plant Journey</h2>
          <p>Every great journey begins with a single seed. What would you like to name your plant?</p>
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
      </div>
    );
  }

  return (
    <div className="my-plant">
      <div className="plant-container">
        <div className="plant-info">
          <h2>{plantName}</h2>
          <p className="stage-name">{currentStage.name}</p>
          <div className="credits">
            <span>{credits} Credits</span>
          </div>
        </div>

        <div className="plant-visual">
          <img src={currentStage.image} alt={`${plantName} as a ${currentStage.name.toLowerCase()}`} />
        </div>

        <div className="growth-progress">
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ width: `${getProgressToNextStage()}%` }}
            />
          </div>
          <p className="progress-text">{currentStage.description}</p>
          <p className="progress-text">Progress to next stage: {Math.round(getProgressToNextStage())}%</p>
        </div>

        <div className="plant-tips">
          <h3>How to earn more credits:</h3>
          <ul>
            <li>Complete daily check-ins (+10 credits)</li>
            <li>Journal your thoughts (+20 credits)</li>
            <li>Complete challenges (+50 credits)</li>
            <li>Participate in community activities (+30 credits)</li>
            <li>Achieve wellness goals (+100 credits)</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MyPlant;
