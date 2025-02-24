import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 100vh;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const ContentSection = styled.div`
  flex: 1;
  padding-right: 2rem;

  @media (max-width: 768px) {
    padding-right: 0;
    padding-bottom: 2rem;
  }
`;

const ImageSection = styled.div`
  flex: 1;
  img {
    max-width: 100%;
    height: auto;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #2d3748;
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: #718096;
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const Button = styled.button`
  background-color: #f6ad55;
  color: white;
  padding: 0.8rem 2rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ed8936;
  }
`;

const Logo = styled.div`
  position: absolute;
  top: 2rem;
  left: 2rem;
  font-size: 1.5rem;
  color: #4a5568;
`;

const NavLinks = styled.div`
  position: absolute;
  top: 2rem;
  right: 2rem;
  display: flex;
  gap: 1rem;
`;

const NavLink = styled.button`
  background: none;
  border: none;
  color: #4a5568;
  font-size: 1rem;
  cursor: pointer;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  transition: background-color 0.3s;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
`;

const HomePage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/signup');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <div>
      <Logo>🌿 Serenifi</Logo>
      <NavLinks>
        <NavLink onClick={handleLogin}>Login</NavLink>
      </NavLinks>
      <Container>
        <ContentSection>
          <Title>Improve your Mental Health</Title>
          <Subtitle>
            Your mind is your greatest asset—nurture it, and it will guide you through the darkest times.
          </Subtitle>
          <Button onClick={handleGetStarted}>Get Started</Button>
        </ContentSection>
        <ImageSection>
          <img 
            src="https://img.freepik.com/free-vector/mental-health-awareness-concept_23-2148514643.jpg" 
            alt="Mental Health Illustration" 
          />
        </ImageSection>
      </Container>
    </div>
  );
};

export default HomePage;
