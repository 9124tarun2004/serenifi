import React, { useState, useEffect } from 'react';
import '../styles/Profile.css';

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
    setProfile(formData);
    localStorage.setItem('userProfile', JSON.stringify(formData));
    setIsEditing(false);
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setFormData(profile);
  };

  const renderBasicInfo = () => (
    <div className="profile-section">
      <h3>Basic Information</h3>
      <div className="form-grid">
        <div className="form-group">
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            value={isEditing ? formData.firstName : profile.firstName}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
        </div>

        <div className="form-group">
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={isEditing ? formData.lastName : profile.lastName}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={isEditing ? formData.email : profile.email}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
          {!isEditing && <span className="verified-badge">✓</span>}
        </div>

        <div className="form-group">
          <label>Phone</label>
          <input
            type="tel"
            name="phone"
            value={isEditing ? formData.phone : profile.phone}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
        </div>

        <div className="form-group">
          <label>Date of Birth</label>
          <input
            type="date"
            name="dateOfBirth"
            value={isEditing ? formData.dateOfBirth : profile.dateOfBirth}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
        </div>

        <div className="form-group">
          <label>Gender</label>
          <input
            type="text"
            name="gender"
            value={isEditing ? formData.gender : profile.gender}
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
        <textarea
          name="bio"
          value={isEditing ? formData.bio : profile.bio}
          onChange={handleInputChange}
          disabled={!isEditing}
          rows="4"
        />
      </div>

      <div className="form-group">
        <label>Occupation</label>
        <input
          type="text"
          name="occupation"
          value={isEditing ? formData.occupation : profile.occupation}
          onChange={handleInputChange}
          disabled={!isEditing}
        />
      </div>

      <div className="form-group">
        <label>Interests</label>
        <div className="interests-container">
          {['Meditation', 'Yoga', 'Reading', 'Music', 'Art', 'Nature', 'Exercise', 'Cooking'].map(interest => (
            <label key={interest} className="interest-chip">
              <input
                type="checkbox"
                checked={formData.interests.includes(interest)}
                onChange={() => handleInterestChange(interest)}
                disabled={!isEditing}
              />
              <span className={formData.interests.includes(interest) ? 'selected' : ''}>
                {interest}
              </span>
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

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="avatar-container">
          <img
            src={profile.avatar}
            alt="Profile"
            className="profile-avatar"
          />
          {isEditing && (
            <button className="edit-avatar-button">
              📷
            </button>
          )}
        </div>
        {!isEditing && (
          <button className="edit-button" onClick={handleEditClick}>
            ✏️
          </button>
        )}
      </div>

      <div className="profile-tabs">
        <button
          className={`tab-button ${activeTab === 'basic' ? 'active' : ''}`}
          onClick={() => setActiveTab('basic')}
        >
          Basic Info
        </button>
        <button
          className={`tab-button ${activeTab === 'bio' ? 'active' : ''}`}
          onClick={() => setActiveTab('bio')}
        >
          About Me
        </button>
        <button
          className={`tab-button ${activeTab === 'mood' ? 'active' : ''}`}
          onClick={() => setActiveTab('mood')}
        >
          Mood Tracker
        </button>
        <button
          className={`tab-button ${activeTab === 'achievements' ? 'active' : ''}`}
          onClick={() => setActiveTab('achievements')}
        >
          Achievements
        </button>
      </div>

      <form className="profile-form" onSubmit={handleSubmit}>
        {activeTab === 'basic' && renderBasicInfo()}
        {activeTab === 'bio' && renderBioSection()}
        {activeTab === 'mood' && renderMoodTracker()}
        {activeTab === 'achievements' && renderAchievements()}

        {isEditing && (
          <div className="button-group">
            <button type="submit" className="save-button">
              Save Changes
            </button>
            <button
              type="button"
              className="cancel-button"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default Profile;
