import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 2rem;
  background-color: #f0f2f5;
  min-height: 100vh;
`;

const Title = styled.h1`
  font-size: 1.75rem;
  color: #2d3748;
  margin-bottom: 2rem;
`;

const GamesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const GameCard = styled.div`
  background: white;
  border-radius: 15px;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
  }
`;

const GameIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const GameTitle = styled.h2`
  font-size: 1.25rem;
  color: #2d3748;
  margin-bottom: 0.5rem;
`;

const GameDescription = styled.p`
  color: #4a5568;
  font-size: 0.875rem;
  margin-bottom: 1rem;
`;

const PlayButton = styled.button`
  background: #4A5568;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background: #2D3748;
  }
`;

// Memory Game Components
const MemoryGameContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

const MemoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin-bottom: 1rem;
`;

const MemoryCard = styled.div`
  aspect-ratio: 1;
  background: ${props => props.flipped ? 'white' : '#4A5568'};
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  cursor: pointer;
  transition: all 0.3s;
  transform: ${props => props.flipped ? 'rotateY(180deg)' : 'rotateY(0)'};

  &:hover {
    opacity: 0.9;
  }
`;

// Breathing Exercise Components
const BreathingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
`;

const BreathingCircle = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: #4A5568;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
  animation: ${props => props.animate ? 'breathe 8s infinite' : 'none'};

  @keyframes breathe {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.4); }
  }
`;

// Color Relaxation Components
const ColorGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 1rem;
  max-width: 800px;
  margin: 0 auto;
`;

const ColorTile = styled.div`
  aspect-ratio: 1;
  background-color: ${props => props.color};
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.1);
  }
`;

const BackButton = styled.button`
  background: #4A5568;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  margin-bottom: 2rem;
  transition: background-color 0.2s;

  &:hover {
    background: #2D3748;
  }
`;

// Zen Garden Components
const GardenContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;
`;

const GardenCanvas = styled.div`
  background: #f0f4f8;
  border-radius: 12px;
  aspect-ratio: 16/9;
  position: relative;
  overflow: hidden;
  cursor: pointer;
`;

const Plant = styled.div`
  position: absolute;
  font-size: 2rem;
  transform: translate(-50%, -50%);
  transition: opacity 0.3s;
  cursor: pointer;
`;

// Word Clouds Components
const WordCloudContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  min-height: 400px;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;

const Word = styled.div`
  padding: 0.5rem 1rem;
  background: ${props => props.selected ? '#4A5568' : 'white'};
  color: ${props => props.selected ? 'white' : '#4A5568'};
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s;
  font-size: ${props => props.size}px;
  transform: rotate(${props => props.rotate}deg);

  &:hover {
    transform: scale(1.1) rotate(${props => props.rotate}deg);
  }
`;

// Gratitude Journal Components
const JournalContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 1rem;
`;

const JournalPrompt = styled.div`
  font-size: 1.25rem;
  color: #2d3748;
  margin-bottom: 1rem;
  text-align: center;
`;

const JournalInput = styled.textarea`
  width: 100%;
  height: 200px;
  padding: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  margin-bottom: 1rem;
  font-size: 1rem;
  resize: none;

  &:focus {
    outline: none;
    border-color: #4A5568;
  }
`;

// Pattern Tapping Components
const PatternGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  max-width: 400px;
  margin: 0 auto;
`;

const PatternTile = styled.div`
  aspect-ratio: 1;
  background: ${props => props.active ? '#4A5568' : 'white'};
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
  border: 2px solid #4A5568;

  &:hover {
    opacity: 0.8;
  }
`;

// Mood Tracker Components
const MoodContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 1rem;
`;

const MoodGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;
  margin-bottom: 1rem;
`;

const MoodTile = styled.div`
  aspect-ratio: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${props => props.selected ? '#4A5568' : 'white'};
  color: ${props => props.selected ? 'white' : '#4A5568'};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 2rem;

  span {
    font-size: 0.875rem;
    margin-top: 0.5rem;
  }

  &:hover {
    transform: translateY(-2px);
  }
`;

// Mindful Drawing Components
const DrawingContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;
`;

const Canvas = styled.canvas`
  background: white;
  border-radius: 12px;
  cursor: crosshair;
`;

const ColorPicker = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  justify-content: center;
`;

const ColorOption = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background: ${props => props.color};
  cursor: pointer;
  border: 2px solid ${props => props.selected ? '#4A5568' : 'transparent'};
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.1);
  }
`;

const Games = () => {
  const [activeGame, setActiveGame] = useState(null);
  const [memoryCards, setMemoryCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [isBreathing, setIsBreathing] = useState(false);
  const [breathingText, setBreathingText] = useState('Start');
  
  // New state variables for additional games
  const [plants, setPlants] = useState([]);
  const [selectedWords, setSelectedWords] = useState([]);
  const [gratitudeEntry, setGratitudeEntry] = useState('');
  const [pattern, setPattern] = useState([]);
  const [userPattern, setUserPattern] = useState([]);
  const [selectedMood, setSelectedMood] = useState(null);
  const [drawingColor, setDrawingColor] = useState('#4A5568');
  const [canvasRef] = useState(React.createRef());

  // Memory Game Logic
  const initializeMemoryGame = () => {
    const emojis = ['🌟', '🎈', '🌸', '🌺', '🌈', '🦋', '🌙', '⭐'];
    const cards = [...emojis, ...emojis]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({
        id: index,
        emoji,
        isFlipped: false,
        isMatched: false
      }));
    setMemoryCards(cards);
    setFlippedCards([]);
    setMatchedPairs([]);
  };

  const handleCardClick = (cardId) => {
    if (flippedCards.length === 2) return;
    if (flippedCards.includes(cardId)) return;
    if (matchedPairs.includes(cardId)) return;

    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      const [firstId, secondId] = newFlippedCards;
      const firstCard = memoryCards[firstId];
      const secondCard = memoryCards[secondId];

      if (firstCard.emoji === secondCard.emoji) {
        setMatchedPairs([...matchedPairs, firstId, secondId]);
        setFlippedCards([]);
      } else {
        setTimeout(() => {
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  // Breathing Exercise Logic
  useEffect(() => {
    let interval;
    if (isBreathing) {
      interval = setInterval(() => {
        setBreathingText(prev => {
          if (prev === 'Inhale') return 'Hold';
          if (prev === 'Hold') return 'Exhale';
          return 'Inhale';
        });
      }, 4000);
    }
    return () => clearInterval(interval);
  }, [isBreathing]);

  // Color Relaxation Logic
  const colors = [
    '#FF9AA2', '#FFB7B2', '#FFDAC1', '#E2F0CB',
    '#B5EAD7', '#C7CEEA', '#E8E8E4', '#F4BFBF',
    '#DAB894', '#B8E0D2', '#D6EADF', '#95B8D1'
  ];

  // Zen Garden Logic
  const addPlant = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const plantEmojis = ['🌸', '🌺', '🌹', '🌷', '🌻', '🌼'];
    setPlants([...plants, {
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      emoji: plantEmojis[Math.floor(Math.random() * plantEmojis.length)]
    }]);
  };

  // Word Cloud Logic
  const positiveWords = [
    { text: 'Peace', size: 24 },
    { text: 'Joy', size: 32 },
    { text: 'Love', size: 28 },
    { text: 'Hope', size: 26 },
    { text: 'Calm', size: 30 },
    { text: 'Smile', size: 22 },
    { text: 'Happy', size: 34 },
    { text: 'Gentle', size: 24 },
    { text: 'Dream', size: 28 },
    { text: 'Light', size: 26 }
  ].map(word => ({
    ...word,
    rotate: Math.random() * 60 - 30
  }));

  // Pattern Game Logic
  const generatePattern = () => {
    const newPattern = Array(5).fill(0).map(() => Math.floor(Math.random() * 9));
    setPattern(newPattern);
    setUserPattern([]);
    showPattern(newPattern);
  };

  const showPattern = async (patternToShow) => {
    for (let i = 0; i < patternToShow.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const tiles = document.querySelectorAll('.pattern-tile');
      tiles[patternToShow[i]].classList.add('active');
      await new Promise(resolve => setTimeout(resolve, 500));
      tiles[patternToShow[i]].classList.remove('active');
    }
  };

  // Mindful Drawing Logic
  useEffect(() => {
    if (activeGame === 'drawing' && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      let isDrawing = false;
      let lastX = 0;
      let lastY = 0;

      canvas.addEventListener('mousedown', startDrawing);
      canvas.addEventListener('mousemove', draw);
      canvas.addEventListener('mouseup', stopDrawing);
      canvas.addEventListener('mouseout', stopDrawing);

      function startDrawing(e) {
        isDrawing = true;
        [lastX, lastY] = [e.offsetX, e.offsetY];
      }

      function draw(e) {
        if (!isDrawing) return;
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.strokeStyle = drawingColor;
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.stroke();
        [lastX, lastY] = [e.offsetX, e.offsetY];
      }

      function stopDrawing() {
        isDrawing = false;
      }

      return () => {
        canvas.removeEventListener('mousedown', startDrawing);
        canvas.removeEventListener('mousemove', draw);
        canvas.removeEventListener('mouseup', stopDrawing);
        canvas.removeEventListener('mouseout', stopDrawing);
      };
    }
  }, [activeGame, canvasRef, drawingColor]);

  const games = [
    {
      title: 'Memory Cards',
      description: 'Test and improve your memory by matching pairs of cards',
      icon: '🎴',
      id: 'memory'
    },
    {
      title: 'Breathing Exercise',
      description: 'Follow the animated circle for guided breathing',
      icon: '🌬️',
      id: 'breathing'
    },
    {
      title: 'Color Relaxation',
      description: 'Click on soothing colors to create peaceful patterns',
      icon: '🎨',
      id: 'colors'
    },
    {
      title: 'Zen Garden',
      description: 'Create your own peaceful garden by placing plants',
      icon: '🌺',
      id: 'garden'
    },
    {
      title: 'Word Cloud',
      description: 'Select positive words to create your mindfulness cloud',
      icon: '☁️',
      id: 'wordcloud'
    },
    {
      title: 'Gratitude Journal',
      description: 'Write down things you are grateful for',
      icon: '📔',
      id: 'journal'
    },
    {
      title: 'Pattern Tapping',
      description: 'Follow and repeat the pattern to improve focus',
      icon: '🎯',
      id: 'pattern'
    },
    {
      title: 'Mood Tracker',
      description: 'Track your daily mood with emojis',
      icon: '😊',
      id: 'mood'
    },
    {
      title: 'Mindful Drawing',
      description: 'Express yourself through peaceful drawing',
      icon: '✏️',
      id: 'drawing'
    }
  ];

  const renderGame = () => {
    switch (activeGame) {
      case 'memory':
        return (
          <MemoryGameContainer>
            <MemoryGrid>
              {memoryCards.map((card, index) => (
                <MemoryCard
                  key={index}
                  flipped={flippedCards.includes(index) || matchedPairs.includes(index)}
                  onClick={() => handleCardClick(index)}
                >
                  {(flippedCards.includes(index) || matchedPairs.includes(index)) && card.emoji}
                </MemoryCard>
              ))}
            </MemoryGrid>
          </MemoryGameContainer>
        );

      case 'breathing':
        return (
          <BreathingContainer>
            <BreathingCircle animate={isBreathing}>
              {breathingText}
            </BreathingCircle>
            <PlayButton
              style={{ marginTop: '2rem' }}
              onClick={() => {
                setIsBreathing(!isBreathing);
                setBreathingText(isBreathing ? 'Start' : 'Inhale');
              }}
            >
              {isBreathing ? 'Stop' : 'Start'} Exercise
            </PlayButton>
          </BreathingContainer>
        );

      case 'colors':
        return (
          <ColorGrid>
            {colors.map((color, index) => (
              <ColorTile
                key={index}
                color={color}
                onClick={() => {
                  // Add ripple effect or sound here if desired
                }}
              />
            ))}
          </ColorGrid>
        );

      case 'garden':
        return (
          <GardenContainer>
            <GardenCanvas onClick={addPlant}>
              {plants.map((plant, index) => (
                <Plant
                  key={index}
                  style={{ left: `${plant.x}%`, top: `${plant.y}%` }}
                >
                  {plant.emoji}
                </Plant>
              ))}
            </GardenCanvas>
            <PlayButton onClick={() => setPlants([])}>Clear Garden</PlayButton>
          </GardenContainer>
        );

      case 'wordcloud':
        return (
          <WordCloudContainer>
            {positiveWords.map((word, index) => (
              <Word
                key={index}
                size={word.size}
                rotate={word.rotate}
                selected={selectedWords.includes(word.text)}
                onClick={() => {
                  if (selectedWords.includes(word.text)) {
                    setSelectedWords(selectedWords.filter(w => w !== word.text));
                  } else {
                    setSelectedWords([...selectedWords, word.text]);
                  }
                }}
              >
                {word.text}
              </Word>
            ))}
          </WordCloudContainer>
        );

      case 'journal':
        return (
          <JournalContainer>
            <JournalPrompt>
              What are three things you're grateful for today?
            </JournalPrompt>
            <JournalInput
              value={gratitudeEntry}
              onChange={(e) => setGratitudeEntry(e.target.value)}
              placeholder="Start writing here..."
            />
            <PlayButton onClick={() => {
              // Save gratitude entry logic here
              setGratitudeEntry('');
            }}>
              Save Entry
            </PlayButton>
          </JournalContainer>
        );

      case 'pattern':
        return (
          <div style={{ textAlign: 'center' }}>
            <PatternGrid>
              {Array(9).fill(0).map((_, index) => (
                <PatternTile
                  key={index}
                  className="pattern-tile"
                  onClick={() => {
                    if (pattern.length > 0) {
                      const newUserPattern = [...userPattern, index];
                      setUserPattern(newUserPattern);
                      if (newUserPattern.length === pattern.length) {
                        if (newUserPattern.every((val, i) => val === pattern[i])) {
                          alert('Correct pattern! Well done!');
                        } else {
                          alert('Try again!');
                        }
                        setUserPattern([]);
                      }
                    }
                  }}
                />
              ))}
            </PatternGrid>
            <PlayButton
              style={{ marginTop: '1rem' }}
              onClick={generatePattern}
            >
              Start New Pattern
            </PlayButton>
          </div>
        );

      case 'mood':
        return (
          <MoodContainer>
            <MoodGrid>
              {[
                { emoji: '😊', text: 'Happy' },
                { emoji: '😌', text: 'Calm' },
                { emoji: '😔', text: 'Sad' },
                { emoji: '😤', text: 'Angry' },
                { emoji: '😴', text: 'Tired' }
              ].map((mood, index) => (
                <MoodTile
                  key={index}
                  selected={selectedMood === index}
                  onClick={() => setSelectedMood(index)}
                >
                  {mood.emoji}
                  <span>{mood.text}</span>
                </MoodTile>
              ))}
            </MoodGrid>
            <PlayButton onClick={() => {
              // Save mood tracking logic here
              setSelectedMood(null);
            }}>
              Save Mood
            </PlayButton>
          </MoodContainer>
        );

      case 'drawing':
        return (
          <DrawingContainer>
            <ColorPicker>
              {['#4A5568', '#F56565', '#48BB78', '#4299E1', '#9F7AEA'].map((color) => (
                <ColorOption
                  key={color}
                  color={color}
                  selected={color === drawingColor}
                  onClick={() => setDrawingColor(color)}
                />
              ))}
            </ColorPicker>
            <Canvas
              ref={canvasRef}
              width={800}
              height={500}
            />
            <PlayButton
              onClick={() => {
                const ctx = canvasRef.current.getContext('2d');
                ctx.clearRect(0, 0, 800, 500);
              }}
            >
              Clear Canvas
            </PlayButton>
          </DrawingContainer>
        );

      default:
        return (
          <GamesGrid>
            {games.map((game) => (
              <GameCard
                key={game.id}
                onClick={() => {
                  setActiveGame(game.id);
                  if (game.id === 'memory') {
                    initializeMemoryGame();
                  }
                }}
              >
                <GameIcon>{game.icon}</GameIcon>
                <GameTitle>{game.title}</GameTitle>
                <GameDescription>{game.description}</GameDescription>
                <PlayButton>Play Now</PlayButton>
              </GameCard>
            ))}
          </GamesGrid>
        );
    }
  };

  return (
    <Container>
      <Title>Wellness Games</Title>
      {activeGame && (
        <BackButton onClick={() => {
          setActiveGame(null);
          setIsBreathing(false);
          setBreathingText('Start');
        }}>
          ← Back to Games
        </BackButton>
      )}
      {renderGame()}
    </Container>
  );
};

export default Games;