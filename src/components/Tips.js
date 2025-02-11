import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 2rem;
  background-color: #f0f7ff;
  min-height: 100vh;
`;

const Header = styled.h1`
  color: #1e40af;
  text-align: center;
  margin-bottom: 2rem;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 1rem;
`;

const Card = styled.div`
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const CardContent = styled.div`
  padding: 1.5rem;
`;

const CardTitle = styled.h2`
  color: #1e40af;
  margin-bottom: 0.5rem;
`;

const CardDescription = styled.p`
  color: #4a5568;
`;

const DetailView = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #f0f7ff;
  z-index: 1000;
  overflow-y: auto;
  padding: 2rem;
  animation: slideIn 0.3s ease;

  @keyframes slideIn {
    from {
      transform: translateY(100%);
    }
    to {
      transform: translateY(0);
    }
  }
`;

const BackButton = styled.button`
  background: #1e40af;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 1rem;

  &:hover {
    background: #1e3a8a;
  }
`;

const DetailContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const TipsList = styled.ol`
  margin-top: 1.5rem;
  padding-left: 1.2rem;
  
  li {
    margin-bottom: 1rem;
    color: #4a5568;
    line-height: 1.6;
  }
`;

const Tips = () => {
  const [selectedCard, setSelectedCard] = useState(null);

  const cardsData = [
    {
      id: 'exercise',
      title: 'Exercise',
      image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438',
      description: 'Physical activity to boost your mood and energy',
      tips: [
        'Start with 10 minutes of daily walking',
        'Try yoga for both mind and body wellness',
        'Join group fitness classes for motivation',
        'Include strength training twice a week',
        'Dance to your favorite music for cardio',
        'Practice stretching exercises for flexibility',
        'Take the stairs instead of the elevator'
      ]
    },
    {
      id: 'food',
      title: 'Food and Mood',
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd',
      description: 'Nutrition tips for better mental health',
      tips: [
        'Eat regular meals to stabilize blood sugar',
        'Include omega-3 rich foods like fish',
        'Stay hydrated throughout the day',
        'Limit caffeine and alcohol intake',
        'Add more whole grains to your diet',
        'Include colorful fruits and vegetables',
        'Plan your meals ahead to reduce stress'
      ]
    },
    {
      id: 'relax',
      title: 'Relax',
      image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773',
      description: 'Techniques for relaxation and stress relief',
      tips: [
        'Practice deep breathing exercises',
        'Try progressive muscle relaxation',
        'Listen to calming music',
        'Take regular breaks during work',
        'Create a peaceful bedtime routine',
        'Use aromatherapy with calming scents',
        'Practice mindfulness meditation'
      ]
    },
    {
      id: 'socialise',
      title: 'Socialise',
      image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac',
      description: 'Build and maintain social connections',
      tips: [
        'Schedule regular video calls with friends',
        'Join clubs or groups with shared interests',
        'Volunteer in your community',
        'Plan regular family activities',
        'Attend local social events',
        'Start a hobby group',
        'Reach out to old friends'
      ]
    },
    {
      id: 'nature',
      title: 'Nature',
      image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e',
      description: 'Connect with nature for mental wellness',
      tips: [
        'Take daily walks in nature',
        'Start a small garden or grow plants',
        'Have lunch in a park',
        'Go for weekend hikes',
        'Practice outdoor meditation',
        'Bird watching or nature photography',
        'Create an outdoor relaxation space'
      ]
    },
    {
      id: 'sleep',
      title: 'Sleep',
      image: 'https://www.theladders.com/wp-content/uploads/sleep-happy-190925.jpg',

      description: 'Improve your sleep quality',
      tips: [
        'Maintain a consistent sleep schedule',
        'Create a relaxing bedtime routine',
        'Keep your bedroom cool and dark',
        'Avoid screens before bedtime',
        'Practice relaxation techniques',
        'Limit caffeine after noon',
        'Exercise regularly but not close to bedtime'
      ]
    }
  ];

  return (
    <Container>
      <Header>Mental Health Tips</Header>
      {!selectedCard ? (
        <CardGrid>
          {cardsData.map((card) => (
            <Card key={card.id} onClick={() => setSelectedCard(card)}>
              <CardImage src={card.image} alt={card.title} />
              <CardContent>
                <CardTitle>{card.title}</CardTitle>
                <CardDescription>{card.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </CardGrid>
      ) : (
        <DetailView>
          <DetailContent>
            <BackButton onClick={() => setSelectedCard(null)}>← Back to Tips</BackButton>
            <CardImage src={selectedCard.image} alt={selectedCard.title} />
            <CardTitle>{selectedCard.title}</CardTitle>
            <CardDescription>{selectedCard.description}</CardDescription>
            <TipsList>
              {selectedCard.tips.map((tip, index) => (
                <li key={index}>{tip}</li>
              ))}
            </TipsList>
          </DetailContent>
        </DetailView>
      )}
    </Container>
  );
};

export default Tips;
