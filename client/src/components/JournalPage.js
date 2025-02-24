import React, { useState } from 'react';
import { Plus, Pencil, Trash, ImageIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css';

const JournalPage = () => {
  const [entries, setEntries] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const navigate = useNavigate();

  const sidebarItems = [
    { icon: '🏠', label: 'Home', path: '/dashboard' },
    { icon: '👥', label: 'My Feed', path: '/feed' },
    { icon: '📔', label: 'Journal', path: '/journal' },
    { icon: '📊', label: 'Analytics', path: '/analytics' },
    { icon: '🎯', label: 'Challenge', path: '/challenge' },
    { icon: '🎁', label: 'Rewards', path: '/rewards' },
    { icon: '🎮', label: 'Games', path: '/games' },
    { icon: '🎵', label: 'Music', path: '/music' },
    { icon: '🌱', label: 'My Plant', path: '/plant' },
    { icon: '🎥', label: 'Webinar', path: '/webinar' },
    { icon: '👤', label: 'Profile', path: '/profile' },
    { icon: '👥', label: 'Community', path: '/community' },
    { icon: '⚙️', label: 'Settings', path: '/settings' }
  ];

  const addEntry = (entry) => {
    setEntries([entry, ...entries]);
    setIsCreating(false);
  };

  const deleteEntry = (id) => {
    setEntries(entries.filter(entry => entry.id !== id));
  };

  const updateEntry = (id, updatedEntry) => {
    setEntries(entries.map(entry => 
      entry.id === id ? { ...entry, ...updatedEntry } : entry
    ));
    setEditingId(null);
  };

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="logo">
          <img src="/logo.png" alt="Logo" />
        </div>
        <nav>
          {sidebarItems.map((item, index) => (
            <div
              key={index}
              className={`sidebar-item ${item.path === '/journal' ? 'active' : ''}`}
              onClick={() => navigate(item.path)}
            >
              <span className="icon">{item.icon}</span>
              <span className="label">{item.label}</span>
            </div>
          ))}
          <div className="sidebar-item logout">
            <span className="icon">🚪</span>
            <span className="label">Logout</span>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Top Navigation */}
        <div className="top-nav">
          <div className="search-bar">
            <input type="text" placeholder="Search journals.." />
            <button className="search-btn">🔍</button>
          </div>
          <div className="nav-icons">
            <button className="icon-btn">🔔</button>
            <button className="icon-btn">⚙️</button>
            <button className="icon-btn">👤</button>
          </div>
        </div>

        {/* Journal Content */}
        <div className="content">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">My Journal</h1>
              <Button 
                onClick={() => setIsCreating(true)}
                className="flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                New
              </Button>
            </div>

            {/* Create/Edit Form */}
            {(isCreating || editingId !== null) && (
              <EntryForm 
                onSubmit={isCreating ? addEntry : updateEntry}
                onCancel={() => {
                  setIsCreating(false);
                  setEditingId(null);
                }}
                entry={editingId ? entries.find(e => e.id === editingId) : null}
              />
            )}

            {/* Entries List */}
            <div className="space-y-4">
              {entries.map(entry => (
                <JournalEntry 
                  key={entry.id}
                  entry={entry}
                  onEdit={() => setEditingId(entry.id)}
                  onDelete={() => deleteEntry(entry.id)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const EntryForm = ({ onSubmit, onCancel, entry = null }) => {
  const [content, setContent] = useState(entry?.content || '');
  const [images, setImages] = useState(entry?.images || []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEntry = {
      id: entry?.id || Date.now(),
      content,
      images,
      date: entry?.date || new Date().toISOString(),
    };
    onSubmit(entry?.id ? newEntry : newEntry);
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const readers = files.map(file => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(readers).then(results => {
      setImages([...images, ...results]);
    });
  };

  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your journal entry..."
            className="w-full min-h-[200px]"
          />
          
          {/* Image Preview */}
          {images.length > 0 && (
            <div className="grid grid-cols-4 gap-2">
              {images.map((img, idx) => (
                <div key={idx} className="relative">
                  <img src={img} alt="" className="w-full h-24 object-cover rounded" />
                  <button
                    type="button"
                    onClick={() => setImages(images.filter((_, i) => i !== idx))}
                    className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full"
                  >
                    <Trash className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
          
          <div className="flex items-center gap-4">
            <Button type="button" variant="outline" onClick={() => {
              const input = document.createElement('input');
              input.type = 'file';
              input.multiple = true;
              input.accept = 'image/*';
              input.onchange = handleImageUpload;
              input.click();
            }}>
              <ImageIcon className="w-4 h-4 mr-2" />
              Add Images
            </Button>
            <Button type="submit">
              {entry ? 'Update' : 'Post'}
            </Button>
            <Button type="button" variant="ghost" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

const JournalEntry = ({ entry, onEdit, onDelete }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-sm text-gray-500">
          {new Date(entry.date).toLocaleDateString()}
        </CardTitle>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" onClick={onEdit}>
            <Pencil className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={onDelete}>
            <Trash className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <p className="whitespace-pre-wrap">{entry.content}</p>
        {entry.images?.length > 0 && (
          <div className="grid grid-cols-4 gap-2 mt-4">
            {entry.images.map((img, idx) => (
              <img 
                key={idx} 
                src={img} 
                alt="" 
                className="w-full h-24 object-cover rounded"
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default JournalPage;
