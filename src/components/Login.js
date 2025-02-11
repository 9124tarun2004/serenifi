import React from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #f7fafc;
`;

const ImageSection = styled.div`
  flex: 1;
  background-color: #f6e6ff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const Logo = styled.div`
  font-size: 2rem;
  color: #4a5568;
  margin-bottom: 2rem;
  cursor: pointer;
`;

const IllustrationContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
  img {
    width: 100%;
    height: auto;
  }
`;

const FormSection = styled.div`
  flex: 1;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 500px;
  margin: 0 auto;
`;

const Title = styled.h2`
  font-size: 1.8rem;
  color: #2d3748;
  margin-bottom: 2rem;
  text-align: center;
`;

const SocialButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const SocialButton = styled.button`
  flex: 1;
  padding: 0.8rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #f7fafc;
  }
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  margin: 1rem 0;
  color: #718096;
  
  &::before, &::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid #e2e8f0;
  }
  
  &::before {
    margin-right: 0.5rem;
  }
  
  &::after {
    margin-left: 0.5rem;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 0.8rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #f6ad55;
  }
`;

const LoginButton = styled.button`
  background-color: #f6ad55;
  color: white;
  padding: 0.8rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #ed8936;
  }
`;

const SignUpLink = styled.div`
  text-align: center;
  margin-top: 1rem;
  color: #718096;
  
  a {
    color: #f6ad55;
    text-decoration: none;
    font-weight: 500;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // For demo purposes, we'll just navigate to dashboard
    // In a real app, you would validate credentials here
    navigate('/dashboard');
  };

  const goToHome = () => {
    navigate('/');
  };

  return (
    <Container>
      <ImageSection>
        <Logo onClick={goToHome}>🌿 Serenifi</Logo>
        <IllustrationContainer>
          <img 
            src="https://img.freepik.com/free-vector/woman-relaxing-comfortable-sofa-reading-drinking-tea_74855-5961.jpg" 
            alt="Relaxation Illustration" 
          />
        </IllustrationContainer>
      </ImageSection>
      <FormSection>
        <Title>Login</Title>
        <SocialButtons>
          <SocialButton>
            <img src="https://www.google.com/favicon.ico" alt="Google" width="20" />
            Sign In With Google
          </SocialButton>
          <SocialButton>
            <img src="https://www.facebook.com/favicon.ico" alt="Facebook" width="20" />
            Sign In With Facebook
          </SocialButton>
        </SocialButtons>
        <Divider>- OR -</Divider>
        <Form onSubmit={handleSubmit}>
          <Input type="email" placeholder="Email Address" required />
          <Input type="password" placeholder="Password" required />
          <LoginButton type="submit">Login</LoginButton>
        </Form>
        <SignUpLink>
          No account? <Link to="/signup">Create one</Link>
        </SignUpLink>
      </FormSection>
    </Container>
  );
};

export default Login;
