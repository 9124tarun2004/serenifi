import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #f0f2f5;
  padding: 2rem;
`;

const SettingsContainer = styled.div`
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  color: #2d3748;
  margin-bottom: 1.5rem;
`;

const Section = styled.div`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 1rem;
  color: #4a5568;
  margin-bottom: 1rem;
  font-weight: 600;
`;

const Card = styled.div`
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #e2e8f0;
  cursor: pointer;
  transition: background-color 0.2s;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: #f7fafc;
  }
`;

const MenuIcon = styled.span`
  width: 24px;
  height: 24px;
  margin-right: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #4a5568;
`;

const MenuText = styled.span`
  flex: 1;
  color: #2d3748;
`;

const ArrowIcon = styled.span`
  color: #a0aec0;
`;

const Toggle = styled.label`
  position: relative;
  display: inline-block;
  width: 44px;
  height: 24px;

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  span {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #cbd5e0;
    transition: .4s;
    border-radius: 34px;

    &:before {
      position: absolute;
      content: "";
      height: 20px;
      width: 20px;
      left: 2px;
      bottom: 2px;
      background-color: white;
      transition: .4s;
      border-radius: 50%;
    }
  }

  input:checked + span {
    background-color: #f6ad55;
  }

  input:checked + span:before {
    transform: translateX(20px);
  }
`;

const Settings = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <Container>
      <SettingsContainer>
        <Title>Settings</Title>

        <Section>
          <SectionTitle>Account preferences</SectionTitle>
          <Card>
            <MenuItem onClick={() => handleNavigation('/profile')}>
              <MenuIcon>👤</MenuIcon>
              <MenuText>Edit profile</MenuText>
              <ArrowIcon>›</ArrowIcon>
            </MenuItem>
            <MenuItem>
              <MenuIcon>⚙️</MenuIcon>
              <MenuText>General preferences</MenuText>
              <ArrowIcon>›</ArrowIcon>
            </MenuItem>
            <MenuItem>
              <MenuIcon>🌐</MenuIcon>
              <MenuText>Language</MenuText>
              <ArrowIcon>›</ArrowIcon>
            </MenuItem>
          </Card>
        </Section>

        <Section>
          <SectionTitle>Security & Privacy</SectionTitle>
          <Card>
            <MenuItem>
              <MenuIcon>🔑</MenuIcon>
              <MenuText>PassKeys</MenuText>
              <ArrowIcon>›</ArrowIcon>
            </MenuItem>
            <MenuItem>
              <MenuIcon>🔒</MenuIcon>
              <MenuText>Two-step verification</MenuText>
              <ArrowIcon>›</ArrowIcon>
            </MenuItem>
            <MenuItem>
              <MenuIcon>🔔</MenuIcon>
              <MenuText>Notifications</MenuText>
              <Toggle>
                <input type="checkbox" defaultChecked />
                <span></span>
              </Toggle>
            </MenuItem>
          </Card>
        </Section>

        <Section>
          <SectionTitle>Support & about</SectionTitle>
          <Card>
            <MenuItem>
              <MenuIcon>💳</MenuIcon>
              <MenuText>My Subscription</MenuText>
              <ArrowIcon>›</ArrowIcon>
            </MenuItem>
            <MenuItem>
              <MenuIcon>⭐</MenuIcon>
              <MenuText>Upgrade to Free</MenuText>
              <ArrowIcon>›</ArrowIcon>
            </MenuItem>
            <MenuItem>
              <MenuIcon>📜</MenuIcon>
              <MenuText>View purchase history</MenuText>
              <ArrowIcon>›</ArrowIcon>
            </MenuItem>
          </Card>
        </Section>

        <Section>
          <SectionTitle>Help & Support</SectionTitle>
          <Card>
            <MenuItem>
              <MenuIcon>❓</MenuIcon>
              <MenuText>Help centre</MenuText>
              <ArrowIcon>›</ArrowIcon>
            </MenuItem>
            <MenuItem>
              <MenuIcon>📊</MenuIcon>
              <MenuText>Channel reports</MenuText>
              <ArrowIcon>›</ArrowIcon>
            </MenuItem>
            <MenuItem>
              <MenuIcon>ℹ️</MenuIcon>
              <MenuText>App Info</MenuText>
              <ArrowIcon>›</ArrowIcon>
            </MenuItem>
          </Card>
        </Section>

        <Section>
          <Card>
            <MenuItem>
              <MenuIcon>📄</MenuIcon>
              <MenuText>Terms and Policies</MenuText>
              <ArrowIcon>›</ArrowIcon>
            </MenuItem>
          </Card>
        </Section>
      </SettingsContainer>
    </Container>
  );
};

export default Settings;
