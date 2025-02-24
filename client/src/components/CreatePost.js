import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { theme } from '../theme/colors';

const Container = styled.div`
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
  background-color: ${theme.colors.background};
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid ${theme.colors.border};

  h1 {
    font-size: 2rem;
    color: ${theme.colors.text.primary};
    font-weight: 600;
  }
`;

const Form = styled.form`
  background: ${theme.colors.surface};
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 2px 4px ${theme.colors.shadow};
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;

  label {
    display: block;
    color: ${theme.colors.text.primary};
    margin-bottom: 0.75rem;
    font-weight: 500;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid ${theme.colors.border};
  border-radius: 8px;
  color: ${theme.colors.text.primary};
  background-color: white;
  transition: all 0.2s;
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
  }

  &:hover {
    border-color: ${theme.colors.primary};
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid ${theme.colors.border};
  border-radius: 8px;
  color: ${theme.colors.text.primary};
  transition: all 0.2s;
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
  }

  &:hover {
    border-color: ${theme.colors.primary};
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid ${theme.colors.border};
  border-radius: 8px;
  min-height: 150px;
  color: ${theme.colors.text.primary};
  resize: vertical;
  transition: all 0.2s;
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
  }

  &:hover {
    border-color: ${theme.colors.primary};
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 20px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  
  ${props => props.primary ? `
    background: ${theme.gradients.primary};
    color: white;
    border: none;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 6px ${theme.colors.shadow};
    }
  ` : `
    background: white;
    color: ${theme.colors.text.primary};
    border: 2px solid ${theme.colors.border};
    
    &:hover {
      background: ${theme.colors.primaryLighter};
      border-color: ${theme.colors.primary};
      color: ${theme.colors.primary};
    }
  `}
`;

const CreatePost = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    community: '',
    title: '',
    mood: '',
    thoughts: '',
    imageUrl: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create new post object
    const newPost = {
      id: Date.now(),
      user: {
        name: 'You',
        avatar: 'https://via.placeholder.com/40'
      },
      time: 'Just now',
      content: `${formData.title}\n\n${formData.thoughts}`,
      image: formData.imageUrl || null,
      likes: 0,
      liked: false,
      comments: [],
      showComments: false
    };

    // Get existing posts from localStorage
    const existingPosts = JSON.parse(localStorage.getItem('communityPosts') || '[]');
    
    // Add new post to the beginning of the array
    const updatedPosts = [newPost, ...existingPosts];
    
    // Save to localStorage
    localStorage.setItem('communityPosts', JSON.stringify(updatedPosts));

    // Navigate back to community page
    navigate('/community');
  };

  const handleCancel = () => {
    navigate('/community');
  };

  return (
    <Container>
      <Header>
        <h1>Create Journal Entry</h1>
      </Header>

      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <label>Select Community</label>
          <Select
            name="community"
            value={formData.community}
            onChange={handleChange}
            required
          >
            <option value="">Select a community</option>
            <option value="meditation">Meditation Circle</option>
            <option value="adhd">ADHD Support</option>
            <option value="anxiety">Anxiety Relief</option>
            <option value="depression">Depression Support</option>
          </Select>
        </FormGroup>

        <FormGroup>
          <label>Title</label>
          <Input
            type="text"
            name="title"
            placeholder="Give your journal entry a title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <label>How are you feeling today?</label>
          <Select
            name="mood"
            value={formData.mood}
            onChange={handleChange}
            required
          >
            <option value="">Select your mood</option>
            <option value="happy">😊 Happy</option>
            <option value="sad">😌 Sad</option>
            <option value="angry">😠 Angry</option>
            <option value="relaxed">😔 Relaxed</option>
            <option value="excited">😃 Excited</option>
            <option value="neutral">😐 Neutral</option>
          </Select>
        </FormGroup>

        <FormGroup>
          <label>Your Thoughts</label>
          <TextArea
            name="thoughts"
            placeholder="Share your thoughts, feelings, and experiences..."
            value={formData.thoughts}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <label>Add an Image (Optional)</label>
          <Input
            type="url"
            name="imageUrl"
            placeholder="Enter image URL"
            value={formData.imageUrl}
            onChange={handleChange}
          />
        </FormGroup>

        <ButtonGroup>
          <Button type="button" onClick={handleCancel}>
            Cancel
          </Button>
          <Button type="submit" primary>
            Publish
          </Button>
        </ButtonGroup>
      </Form>
    </Container>
  );
};

export default CreatePost;
