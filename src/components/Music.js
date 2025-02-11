import React, { useState, useEffect, useRef } from 'react';
import { usePoints, POINT_ACTIONS } from '../context/PointsContext';
import '../styles/Music.css';

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

// Using direct MP3 URLs that are publicly accessible
const SAMPLE_PLAYLISTS = [
  {
    id: '1',
    name: 'Meditation Music',
    description: 'Calm your mind with these soothing tracks',
    imageUrl: 'https://images.unsplash.com/photo-1528143358888-6d3c7f67bd5d',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
  },
  {
    id: '2',
    name: 'Relaxing Piano',
    description: 'Beautiful piano pieces for relaxation',
    imageUrl: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3'
  },
  {
    id: '3',
    name: 'Nature Sounds',
    description: 'Peaceful sounds from nature',
    imageUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3'
  },
  {
    id: '4',
    name: 'Sleep Music',
    description: 'Gentle music to help you sleep',
    imageUrl: 'https://images.unsplash.com/photo-1455642305367-68834a9c8827',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3'
  },
  {
    id: '5',
    name: 'Focus Music',
    description: 'Enhance your concentration',
    imageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3'
  }
];

const Music = () => {
  const [playlists, setPlaylists] = useState({
    recommended: [],
    topChart: []
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);
  const [error, setError] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTrack, setCurrentTrack] = useState(null);
  const audioRef = useRef(new Audio());
  const { addPoints } = usePoints();

  useEffect(() => {
    const audio = audioRef.current;

    const handleAudioError = (e) => {
      console.error('Audio playback error:', e);
      setError('Failed to play audio. Please try again.');
      setCurrentlyPlaying(null);
      setIsPlaying(false);
    };

    const handleAudioEnded = () => {
      setCurrentlyPlaying(null);
      setIsPlaying(false);
      setCurrentTime(0);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    audio.addEventListener('error', handleAudioError);
    audio.addEventListener('ended', handleAudioEnded);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);

    // Initialize playlists with sample data
    setPlaylists({
      recommended: SAMPLE_PLAYLISTS,
      topChart: SAMPLE_PLAYLISTS.slice(0, 3)
    });
    setIsLoading(false);

    return () => {
      audio.removeEventListener('error', handleAudioError);
      audio.removeEventListener('ended', handleAudioEnded);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.pause();
      audio.src = '';
    };
  }, []);

  useEffect(() => {
    audioRef.current.volume = volume;
  }, [volume]);

  const handlePlaylistClick = async (playlist) => {
    try {
      const audio = audioRef.current;

      if (currentlyPlaying === playlist.id) {
        if (isPlaying) {
          audio.pause();
          setIsPlaying(false);
        } else {
          const playPromise = audio.play();
          if (playPromise !== undefined) {
            await playPromise;
            setIsPlaying(true);
          }
        }
      } else {
        setError(null);
        if (currentlyPlaying) {
          audio.pause();
        }
        
        audio.src = playlist.audioUrl;
        const playPromise = audio.play();
        
        if (playPromise !== undefined) {
          await playPromise;
          setCurrentlyPlaying(playlist.id);
          setCurrentTrack(playlist);
          setIsPlaying(true);
          addPoints(POINT_ACTIONS.MUSIC_SESSION, 'Started a music therapy session');
        }
      }
    } catch (err) {
      console.error('Playback error:', err);
      setError('Failed to play audio. Please try again.');
      setCurrentlyPlaying(null);
      setIsPlaying(false);
    }
  };

  const handleSeek = (e) => {
    const time = parseFloat(e.target.value);
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
  };

  const PlaylistCard = ({ playlist }) => (
    <div className="playlist-card" onClick={() => handlePlaylistClick(playlist)}>
      <div className="playlist-image">
        <img src={playlist.imageUrl} alt={playlist.name} />
        <div className="play-overlay">
          <button className="play-button">
            {currentlyPlaying === playlist.id && isPlaying ? '⏸' : '▶'}
          </button>
        </div>
      </div>
      <div className="playlist-info">
        <h3>{playlist.name}</h3>
        <p>{playlist.description}</p>
      </div>
    </div>
  );

  return (
    <div className="music-page">
      <div className="music-header">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search for music..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {currentTrack && (
        <div className="player-controls">
          <div className="now-playing">
            <img src={currentTrack.imageUrl} alt={currentTrack.name} />
            <div className="track-info">
              <h3>{currentTrack.name}</h3>
              <p>{currentTrack.description}</p>
            </div>
          </div>
          <div className="controls">
            <button className="control-button" onClick={() => handlePlaylistClick(currentTrack)}>
              {isPlaying ? '⏸' : '▶'}
            </button>
          </div>
          <div className="progress-container">
            <span className="time">{formatTime(currentTime)}</span>
            <input
              type="range"
              min="0"
              max={duration || 0}
              value={currentTime}
              onChange={handleSeek}
              className="progress-bar"
            />
            <span className="time">{formatTime(duration)}</span>
          </div>
          <div className="volume-container">
            <span className="volume-icon">🔊</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="volume-slider"
            />
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="loading">Loading music...</div>
      ) : (
        <>
          <section className="recommended-section">
            <div className="section-header">
              <h2>Recommended</h2>
              <button className="view-all-button" onClick={() => console.log('View all clicked')}>
                View all
              </button>
            </div>
            <div className="playlist-grid">
              {playlists.recommended.map((playlist) => (
                <PlaylistCard key={playlist.id} playlist={playlist} />
              ))}
            </div>
          </section>

          <section className="top-chart-section">
            <h2>Top Chart This Week</h2>
            <div className="top-chart-list">
              {playlists.topChart.map((playlist, index) => (
                <div key={playlist.id} className="top-chart-item" onClick={() => handlePlaylistClick(playlist)}>
                  <span className="rank">{index + 1}</span>
                  <img src={playlist.imageUrl} alt={playlist.name} />
                  <div className="playlist-info">
                    <h3>{playlist.name}</h3>
                    <p>{playlist.description}</p>
                  </div>
                  <button className="play-button">
                    {currentlyPlaying === playlist.id && isPlaying ? '⏸' : '▶'}
                  </button>
                </div>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default Music;
