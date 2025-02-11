import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../assets/logo.png';

const Container = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #f0f7ff;
`;

const Sidebar = styled.div`
  width: 240px;
  background-color: #ffffff;
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #e1eeff;
`;

const Logo = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1rem;
  margin-left: 3px;
  margin-bottom: 2rem;
  img {
    width: 120px;
    height: 120px;
  }
`;

const NavItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  color: ${props => props.active ? '#1e40af' : '#4a5568'};
  background-color: ${props => props.active ? '#dbeafe' : 'transparent'};
  border-radius: 0.5rem;
  cursor: pointer;
  margin-bottom: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${props => props.active ? '#dbeafe' : '#f0f7ff'};
    color: #1e40af;
  }
`;

const MainContent = styled.div`
  flex: 1;
  overflow-y: auto;
  background-color: #f0f7ff;
`;

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: '🏠', text: 'Home', path: '/dashboard' },
    { icon: '📔', text: 'Chatbot', path: '/chatbot' },
    { icon: '📔', text: 'Journal', path: '/journal' },
    { icon: '💡', text: 'Tips', path: '/tips' },
    { icon: '📊', text: 'Analytics', path: '/analytics' },
    { icon: '🎯', text: 'Challenge', path: '/challenge' },
    { icon: '🎁', text: 'Rewards', path: '/rewards' },
    { icon: '🌱', text: 'My Plant', path: '/my-plant' },
    { icon: '🎮', text: 'Games', path: '/games' },
    { icon: '🎵', text: 'Music', path: '/music' },
    { icon: '🎥', text: 'Webinar', path: '/webinar' },
    { icon: '👥', text: 'Community', path: '/community' },
    { icon: '👤', text: 'Profile', path: '/profile' },
    { icon: '⚙️', text: 'Settings', path: '/settings' }
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    navigate('/');
  };

  // Don't show sidebar on login, signup, or home pages
  const hideSidebar = ['/', '/login', '/signup'].includes(location.pathname);

  if (hideSidebar) {
    return <MainContent>{children}</MainContent>;
  }

  return (
    <Container>
      <Sidebar>
        <Logo>
          <img src={logo} alt="Serinifi logo" />
        </Logo>
        {navItems.map((item, index) => (
          <NavItem
            key={index}
            active={isActive(item.path)}
            onClick={() => navigate(item.path)}
          >
            <span>{item.icon}</span>
            {item.text}
          </NavItem>
        ))}
        <NavItem onClick={handleLogout} style={{ marginTop: 'auto', color: '#e53e3e' }}>
          <span>🚪</span>
          Logout
        </NavItem>
      </Sidebar>
      <MainContent>{children}</MainContent>
    </Container>
  );
};

export default Layout;
