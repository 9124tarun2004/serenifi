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

const GamesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
`;

const GameCard = styled.div`
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
  }
`;

const GameImage = styled.div`
  height: 160px;
  background-color: #edf2f7;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
`;

const GameContent = styled.div`
  padding: 1.5rem;
`;

const PlayButton = styled.button`
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
`;

const Games = () => {
  const games = [
    {
      title: 'Mindfulness Match',
      description: 'Match pairs of cards while practicing mindfulness',
      icon: '🎴',
      players: '1 player'
    },
    {
      title: 'Breathing Balloon',
      description: 'Guide your breathing with an interactive balloon',
      icon: '🎈',
      players: '1 player'
    },
    {
      title: 'Emotion Quest',
      description: 'An adventure game about understanding emotions',
      icon: '🎮',
      players: '1 player'
    },
    {
      title: 'Gratitude Garden',
      description: 'Grow your garden by practicing gratitude',
      icon: '🌸',
      players: '1 player'
    }
  ];

  return (
    <Container>
      <div style={{ width: '100%' }}>
        <Title>Wellness Games</Title>

        <GamesGrid>
          {games.map((game, index) => (
            <GameCard key={index}>
              <GameImage>
                {game.icon}
              </GameImage>
              <GameContent>
                <h2 style={{ color: '#2d3748', marginBottom: '0.5rem' }}>{game.title}</h2>
                <p style={{ color: '#4a5568', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                  {game.description}
                </p>
                <span style={{ 
                  color: '#718096', 
                  fontSize: '0.75rem',
                  background: '#f7fafc',
                  padding: '0.25rem 0.5rem',
                  borderRadius: '9999px'
                }}>
                  {game.players}
                </span>
                <PlayButton>Play Now</PlayButton>
              </GameContent>
            </GameCard>
          ))}
        </GamesGrid>
      </div>
    </Container>
  );
};

export default Games;