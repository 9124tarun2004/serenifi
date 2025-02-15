import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import '../styles/Profile.css';

const Container = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #f0f2f5;
  padding: 2rem;
`;

const ProfileContainer = styled.div`
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  color: #2d3748;
  margin-bottom: 1.5rem;
`;

const Card = styled.div`
  background: white;
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const PhotoSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
`;

const PhotoContainer = styled.div`
  position: relative;
  width: 150px;
  height: 150px;
  margin-bottom: 1rem;
`;

const ProfilePhoto = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background-color: ${props => props.hasImage ? 'transparent' : '#e2e8f0'};
  background-image: ${props => props.hasImage ? `url(${props.image})` : 'none'};
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: #a0aec0;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    opacity: 0.8;
  }
`;

const UploadButton = styled.button`
  background: #007bff;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.875rem;
  transition: background-color 0.2s;

  &:hover {
    background: #0056b3;
  }
`;

const HiddenInput = styled.input`
  display: none;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  color: #4a5568;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 5px;
  font-size: 1rem;
  color: #2d3748;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const SaveButton = styled.button`
  background: #007bff;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  width: 100%;
  transition: background-color 0.2s;

  &:hover {
    background: #0056b3;
  }
`;

const EditButton = styled.button`
  background: #007bff;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.875rem;
  transition: background-color 0.2s;
  margin-bottom: 1rem;

  &:hover {
    background: #0056b3;
  }
`;

const TabContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const TabButton = styled.button`
  background: ${props => props.active ? '#007bff' : 'transparent'};
  color: ${props => props.active ? 'white' : '#4a5568'};
  border: 1px solid ${props => props.active ? '#007bff' : '#e2e8f0'};
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.875rem;
  transition: all 0.2s;

  &:hover {
    background: ${props => props.active ? '#0056b3' : '#f7fafc'};
  }
`;

const Profile = () => {
  const [profile, setProfile] = useState({
    firstName: 'Lily',
    lastName: 'James',
    email: 'lilyjames@gmail.com',
    phone: '+1 (555) 123-4567',
    address: '33062 Zboncak isle',
    avatar: '/default-avatar.png',
    bio: 'Passionate about mental health and personal growth',
    dateOfBirth: '1995-06-15',
    gender: 'Female',
    occupation: 'Software Developer',
    interests: ['Meditation', 'Yoga', 'Reading', 'Music'],
    socialLinks: {
      twitter: '@lilyjames',
      linkedin: 'linkedin.com/in/lilyjames',
      instagram: '@lily.james'
    },
    mentalHealthGoals: [
      'Reduce stress through meditation',
      'Improve sleep quality',
      'Practice mindfulness daily'
    ],
    achievements: [
      { id: 1, title: '7-Day Meditation Streak', icon: '🧘‍♀️' },
      { id: 2, title: 'Completed Anxiety Management Course', icon: '📚' },
      { id: 3, title: 'Mindfulness Master', icon: '🏆' }
    ],
    moodTracker: {
      lastUpdated: new Date().toISOString(),
      currentMood: 'Happy',
      moodHistory: [
        { date: '2025-02-10', mood: 'Happy', note: 'Great meditation session!' },
        { date: '2025-02-09', mood: 'Calm', note: 'Peaceful day' }
      ]
    }
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(profile);
  const [activeTab, setActiveTab] = useState('basic');
  const [showMoodPicker, setShowMoodPicker] = useState(false);
  const [profileImage, setProfileImage] = useState(null);

  const fileInputRef = useRef(null);

  const moods = [
    { emoji: '😊', name: 'Happy' },
    { emoji: '😌', name: 'Calm' },
    { emoji: '😔', name: 'Sad' },
    { emoji: '😤', name: 'Stressed' },
    { emoji: '😴', name: 'Tired' },
    { emoji: '🤗', name: 'Grateful' }
  ];

  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
      setFormData(JSON.parse(savedProfile));
    }
  }, []);

  const handlePhotoClick = () => {
    fileInputRef.current.click();
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
        setFormData(prev => ({
          ...prev,
          avatar: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleInterestChange = (interest) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleMoodSelect = (mood) => {
    const newMoodHistory = [{
      date: new Date().toISOString().split('T')[0],
      mood: mood.name,
      note: ''
    }, ...profile.moodTracker.moodHistory];

    setFormData(prev => ({
      ...prev,
      moodTracker: {
        ...prev.moodTracker,
        currentMood: mood.name,
        lastUpdated: new Date().toISOString(),
        moodHistory: newMoodHistory
      }
    }));
    setShowMoodPicker(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedProfile = { ...formData };
    if (profileImage) {
      updatedProfile.avatar = profileImage;
    }
    setProfile(updatedProfile);
    localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
    setIsEditing(false);
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setFormData({ ...profile });
  };

  const renderBasicInfo = () => (
    <div className="profile-section">
      <h3>Basic Information</h3>
      <div className="form-grid">
        <div className="form-group">
          <label>First Name</label>
          <Input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
        </div>

        <div className="form-group">
          <label>Last Name</label>
          <Input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
          {!isEditing && <span className="verified-badge">✓</span>}
        </div>

        <div className="form-group">
          <label>Phone</label>
          <Input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
        </div>

        <div className="form-group">
          <label>Date of Birth</label>
          <Input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
        </div>

        <div className="form-group">
          <label>Gender</label>
          <Input
            type="text"
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
        </div>
      </div>
    </div>
  );

  const renderBioSection = () => (
    <div className="profile-section">
      <h3>About Me</h3>
      <div className="form-group">
        <label>Bio</label>
        <Input
          as="textarea"
          name="bio"
          value={formData.bio}
          onChange={handleInputChange}
          disabled={!isEditing}
          style={{ height: '100px' }}
        />
      </div>

      <div className="form-group">
        <label>Occupation</label>
        <Input
          type="text"
          name="occupation"
          value={formData.occupation}
          onChange={handleInputChange}
          disabled={!isEditing}
        />
      </div>

      <div className="form-group">
        <label>Interests</label>
        <div className="interests-container" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {['Meditation', 'Yoga', 'Reading', 'Music', 'Art', 'Nature', 'Exercise', 'Cooking'].map(interest => (
            <label
              key={interest}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '0.25rem 0.75rem',
                borderRadius: '15px',
                border: '1px solid #e2e8f0',
                background: formData.interests.includes(interest) ? '#007bff' : 'white',
                color: formData.interests.includes(interest) ? 'white' : '#4a5568',
                cursor: isEditing ? 'pointer' : 'default'
              }}
            >
              <input
                type="checkbox"
                style={{ display: 'none' }}
                checked={formData.interests.includes(interest)}
                onChange={() => isEditing && handleInterestChange(interest)}
                disabled={!isEditing}
              />
              {interest}
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  const renderMoodTracker = () => (
    <div className="profile-section">
      <h3>Mood Tracker</h3>
      <div className="mood-tracker">
        <div className="current-mood">
          <h4>Current Mood</h4>
          <button 
            className="mood-button"
            onClick={() => setShowMoodPicker(!showMoodPicker)}
          >
            {moods.find(m => m.name === profile.moodTracker.currentMood)?.emoji || '😊'} 
            {profile.moodTracker.currentMood}
          </button>
          
          {showMoodPicker && (
            <div className="mood-picker">
              {moods.map(mood => (
                <button
                  key={mood.name}
                  className="mood-option"
                  onClick={() => handleMoodSelect(mood)}
                >
                  {mood.emoji} {mood.name}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="mood-history">
          <h4>Mood History</h4>
          <div className="mood-timeline">
            {profile.moodTracker.moodHistory.map((entry, index) => (
              <div key={index} className="mood-entry">
                <span className="mood-date">
                  {new Date(entry.date).toLocaleDateString()}
                </span>
                <span className="mood-emoji">
                  {moods.find(m => m.name === entry.mood)?.emoji}
                </span>
                <span className="mood-note">{entry.note}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderAchievements = () => (
    <div className="profile-section">
      <h3>Achievements</h3>
      <div className="achievements-grid">
        {profile.achievements.map(achievement => (
          <div key={achievement.id} className="achievement-card">
            <span className="achievement-icon">{achievement.icon}</span>
            <h4>{achievement.title}</h4>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPhotoSection = () => (
    <PhotoSection>
      <PhotoContainer>
        <ProfilePhoto 
          hasImage={!!profileImage} 
          image={profileImage}
          onClick={handlePhotoClick}
        >
          {!profileImage && '👤'}
        </ProfilePhoto>
      </PhotoContainer>
      <UploadButton type="button" onClick={handlePhotoClick}>
        Upload Photo
      </UploadButton>
      <HiddenInput
        type="file"
        ref={fileInputRef}
        onChange={handlePhotoChange}
        accept="image/*"
      />
    </PhotoSection>
  );

  return (
    <Container>
      <ProfileContainer>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <Title>My Profile</Title>
          <EditButton onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? 'Cancel Editing' : 'Edit Profile'}
          </EditButton>
        </div>

        <TabContainer>
          <TabButton active={activeTab === 'basic'} onClick={() => setActiveTab('basic')}>
            Basic Info
          </TabButton>
          <TabButton active={activeTab === 'bio'} onClick={() => setActiveTab('bio')}>
            About Me
          </TabButton>
          <TabButton active={activeTab === 'mood'} onClick={() => setActiveTab('mood')}>
            Mood Tracker
          </TabButton>
          <TabButton active={activeTab === 'achievements'} onClick={() => setActiveTab('achievements')}>
            Achievements
          </TabButton>
        </TabContainer>

        <Card>
          <form onSubmit={handleSubmit}>
            {renderPhotoSection()}
            {activeTab === 'basic' && renderBasicInfo()}
            {activeTab === 'bio' && renderBioSection()}
            {activeTab === 'mood' && renderMoodTracker()}
            {activeTab === 'achievements' && renderAchievements()}

            {isEditing && (
              <div className="button-group" style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  className="cancel-button"
                  onClick={() => setIsEditing(false)}
                  style={{
                    padding: '0.5rem 1rem',
                    borderRadius: '5px',
                    border: '1px solid #e2e8f0',
                    background: 'white',
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
                <SaveButton type="submit">
                  Save Changes
                </SaveButton>
              </div>
            )}
          </form>
        </Card>
      </ProfileContainer>
    </Container>
  );
};

export default Profile;
