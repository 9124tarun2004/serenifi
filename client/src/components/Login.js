import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

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

const ErrorMsg = styled.div`
  color: red;
  text-align: center;
  margin-top: 0.5rem;
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
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = ({ target: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:8080/api/auth";
      const { data: res } = await axios.post(url, data);
      localStorage.setItem("token", res.data);
      navigate("/dashboard");
    } catch (error) {
      if (error.response && error.response.status >= 400 && error.response.status <= 500) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <Container>
      <ImageSection>
        <Logo onClick={() => navigate("/")}>🌿 Serenifi</Logo>
        <IllustrationContainer>
          <img src="https://img.freepik.com/free-vector/woman-relaxing-comfortable-sofa-reading-drinking-tea_74855-5961.jpg" alt="Relaxation Illustration" />
        </IllustrationContainer>
      </ImageSection>
      <FormSection>
        <Title>Login</Title>
        <Form onSubmit={handleSubmit}>
          <Input type="email" name="email" placeholder="Email Address" onChange={handleChange} value={data.email} required />
          <Input type="password" name="password" placeholder="Password" onChange={handleChange} value={data.password} required />
          {error && <ErrorMsg>{error}</ErrorMsg>}
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
