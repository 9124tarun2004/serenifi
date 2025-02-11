import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';

const ContentWrapper = styled.div`
  padding: 2rem;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  color: #2d3748;
  margin-bottom: 1.5rem;
`;

const JournalGrid = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 1.5rem;
  height: calc(100vh - 150px);
`;

const EntriesList = styled.div`
  background: white;
  border-radius: 10px;
  padding: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
`;

const EntryCard = styled.div`
  padding: 1rem;
  border-radius: 8px;
  cursor: pointer;
  margin-bottom: 0.5rem;
  background-color: ${props => props.active ? '#fff3e3' : '#f7fafc'};
  border-left: 3px solid ${props => props.active ? '#f6ad55' : 'transparent'};

  &:hover {
    background-color: ${props => props.active ? '#fff3e3' : '#edf2f7'};
  }
`;

const EditorSection = styled.div`
  background: white;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
`;

const TitleInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 5px;
  margin-bottom: 1rem;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #f6ad55;
  }
`;

const ContentTextarea = styled.textarea`
  width: 100%;
  flex: 1;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 5px;
  margin-bottom: 1rem;
  font-size: 1rem;
  resize: none;

  &:focus {
    outline: none;
    border-color: #f6ad55;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;

  ${props => props.primary ? `
    background: #f6ad55;
    color: white;
    border: none;

    &:hover {
      background: #ed8936;
    }
  ` : `
    background: white;
    color: #4a5568;
    border: 1px solid #e2e8f0;

    &:hover {
      background: #f7fafc;
    }
  `}
`;

const NewEntryButton = styled(Button)`
  width: 100%;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

const EmptyState = styled.div`
  text-align: center;
  color: #4a5568;
  padding: 2rem;

  p {
    margin-top: 0.5rem;
    font-size: 0.875rem;
  }
`;

const SearchBar = styled.div`
  margin-bottom: 1rem;
  position: relative;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  padding-left: 2.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 5px;
  font-size: 0.875rem;

  &:focus {
    outline: none;
    border-color: #f6ad55;
  }
`;

const SearchIcon = styled.span`
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: #718096;
`;

const MoodSelector = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const MoodButton = styled.button`
  padding: 0.5rem;
  border-radius: 5px;
  border: 1px solid #e2e8f0;
  background: ${props => props.selected ? '#fff3e3' : 'white'};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #fff3e3;
  }
`;

const TagsInput = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
  padding: 0.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 5px;
`;

const Tag = styled.span`
  background: ${props => props.selected ? '#f6ad55' : '#edf2f7'};
  color: ${props => props.selected ? 'white' : '#4a5568'};
  padding: 0.25rem 0.75rem;
  border-radius: 15px;
  font-size: 0.875rem;
  cursor: pointer;

  &:hover {
    background: ${props => props.selected ? '#ed8936' : '#e2e8f0'};
  }
`;

const FormatToolbar = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  padding: 0.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 5px;
`;

const FormatButton = styled.button`
  padding: 0.5rem;
  border: none;
  background: ${props => props.active ? '#f6ad55' : 'transparent'};
  color: ${props => props.active ? 'white' : '#4a5568'};
  border-radius: 3px;
  cursor: pointer;

  &:hover {
    background: ${props => props.active ? '#ed8936' : '#edf2f7'};
  }
`;

const AutoSaveIndicator = styled.div`
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  padding: 0.5rem 1rem;
  background: #48bb78;
  color: white;
  border-radius: 5px;
  font-size: 0.875rem;
  opacity: ${props => props.visible ? '1' : '0'};
  transition: opacity 0.3s;
`;

const Journal = () => {
  const [entries, setEntries] = useState(() => {
    const saved = localStorage.getItem('journal_entries');
    return saved ? JSON.parse(saved) : [{
      id: 1,
      title: 'My First Journal Entry',
      content: 'Today was a great day...',
      date: '2024-02-11',
      mood: '😊',
      tags: ['personal']
    }];
  });
  
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [currentTitle, setCurrentTitle] = useState('');
  const [currentContent, setCurrentContent] = useState('');
  const [currentMood, setCurrentMood] = useState('😊');
  const [currentTags, setCurrentTags] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAutoSave, setShowAutoSave] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState({ bold: false, italic: false, underline: false });

  const moods = ['😊', '😔', '😡', '😴', '🤔', '😐', '🥳', '😎'];
  const availableTags = ['personal', 'work', 'health', 'goals', 'gratitude', 'ideas'];

  // Auto-save functionality
  useEffect(() => {
    localStorage.setItem('journal_entries', JSON.stringify(entries));
  }, [entries]);

  const autoSave = useCallback(() => {
    if (isEditing && currentTitle && currentContent) {
      saveEntry();
      setShowAutoSave(true);
      setTimeout(() => setShowAutoSave(false), 2000);
    }
  }, [isEditing, currentTitle, currentContent]);

  useEffect(() => {
    const timer = setTimeout(autoSave, 30000); // Auto-save every 30 seconds
    return () => clearTimeout(timer);
  }, [currentTitle, currentContent, autoSave]);

  const createNewEntry = () => {
    setSelectedEntry(null);
    setCurrentTitle('');
    setCurrentContent('');
    setCurrentMood('😊');
    setCurrentTags([]);
    setIsEditing(true);
    setSelectedFormat({ bold: false, italic: false, underline: false });
  };

  const selectEntry = (entry) => {
    setSelectedEntry(entry);
    setCurrentTitle(entry.title);
    setCurrentContent(entry.content);
    setCurrentMood(entry.mood);
    setCurrentTags(entry.tags || []);
    setIsEditing(false);
  };

  const saveEntry = () => {
    if (!currentTitle.trim() || !currentContent.trim()) return;

    const newEntry = {
      id: selectedEntry?.id || Date.now(),
      title: currentTitle,
      content: currentContent,
      date: new Date().toISOString().split('T')[0],
      mood: currentMood,
      tags: currentTags
    };

    if (selectedEntry) {
      setEntries(entries.map(entry => 
        entry.id === selectedEntry.id ? newEntry : entry
      ));
    } else {
      setEntries([newEntry, ...entries]);
    }

    setSelectedEntry(newEntry);
    setIsEditing(false);
  };

  const toggleTag = (tag) => {
    setCurrentTags(prev => 
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const applyFormat = (format) => {
    const textarea = document.querySelector('#editor');
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selection = currentContent.substring(start, end);
    let formattedText = selection;

    switch(format) {
      case 'bold':
        formattedText = `**${selection}**`;
        break;
      case 'italic':
        formattedText = `*${selection}*`;
        break;
      case 'underline':
        formattedText = `_${selection}_`;
        break;
      default:
        break;
    }

    const newContent = 
      currentContent.substring(0, start) +
      formattedText +
      currentContent.substring(end);

    setCurrentContent(newContent);
    setSelectedFormat(prev => ({ ...prev, [format]: !prev[format] }));
  };

  const filteredEntries = entries.filter(entry => {
    const searchLower = searchTerm.toLowerCase();
    return (
      entry.title.toLowerCase().includes(searchLower) ||
      entry.content.toLowerCase().includes(searchLower) ||
      entry.tags?.some(tag => tag.toLowerCase().includes(searchLower))
    );
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <ContentWrapper>
      <Title>My Journal</Title>
      
      <JournalGrid>
        <EntriesList>
          <SearchBar>
            <SearchIcon>🔍</SearchIcon>
            <SearchInput
              placeholder="Search entries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchBar>

          <NewEntryButton primary onClick={createNewEntry}>
            <span>✏️</span> New Entry
          </NewEntryButton>

          {filteredEntries.map(entry => (
            <EntryCard
              key={entry.id}
              active={selectedEntry?.id === entry.id}
              onClick={() => selectEntry(entry)}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                <span style={{ fontWeight: '500', color: '#2d3748' }}>{entry.title}</span>
                <span>{entry.mood}</span>
              </div>
              <div style={{ fontSize: '0.875rem', color: '#718096' }}>
                {formatDate(entry.date)}
              </div>
              {entry.tags?.length > 0 && (
                <div style={{ marginTop: '0.5rem', display: 'flex', gap: '0.25rem', flexWrap: 'wrap' }}>
                  {entry.tags.map(tag => (
                    <Tag key={tag} selected={false}>{tag}</Tag>
                  ))}
                </div>
              )}
            </EntryCard>
          ))}

          {filteredEntries.length === 0 && (
            <EmptyState>
              <span style={{ fontSize: '2rem' }}>📝</span>
              <p>No entries found</p>
            </EmptyState>
          )}
        </EntriesList>

        <EditorSection>
          {(selectedEntry || isEditing) ? (
            <>
              <TitleInput
                placeholder="Entry Title"
                value={currentTitle}
                onChange={(e) => setCurrentTitle(e.target.value)}
                disabled={!isEditing}
              />

              {isEditing && (
                <>
                  <MoodSelector>
                    {moods.map(mood => (
                      <MoodButton
                        key={mood}
                        selected={currentMood === mood}
                        onClick={() => setCurrentMood(mood)}
                      >
                        {mood}
                      </MoodButton>
                    ))}
                  </MoodSelector>

                  <TagsInput>
                    {availableTags.map(tag => (
                      <Tag
                        key={tag}
                        selected={currentTags.includes(tag)}
                        onClick={() => toggleTag(tag)}
                      >
                        {tag}
                      </Tag>
                    ))}
                  </TagsInput>

                  <FormatToolbar>
                    <FormatButton
                      active={selectedFormat.bold}
                      onClick={() => applyFormat('bold')}
                      title="Bold"
                    >
                      B
                    </FormatButton>
                    <FormatButton
                      active={selectedFormat.italic}
                      onClick={() => applyFormat('italic')}
                      title="Italic"
                    >
                      I
                    </FormatButton>
                    <FormatButton
                      active={selectedFormat.underline}
                      onClick={() => applyFormat('underline')}
                      title="Underline"
                    >
                      U
                    </FormatButton>
                  </FormatToolbar>
                </>
              )}

              <ContentTextarea
                id="editor"
                placeholder="Write your thoughts..."
                value={currentContent}
                onChange={(e) => setCurrentContent(e.target.value)}
                disabled={!isEditing}
              />

              <ButtonGroup>
                {isEditing ? (
                  <>
                    <Button onClick={() => {
                      if (selectedEntry) {
                        selectEntry(selectedEntry);
                      } else {
                        setSelectedEntry(null);
                        setCurrentTitle('');
                        setCurrentContent('');
                        setCurrentMood('😊');
                        setCurrentTags([]);
                      }
                      setIsEditing(false);
                    }}>
                      Cancel
                    </Button>
                    <Button primary onClick={saveEntry}>
                      Save
                    </Button>
                  </>
                ) : (
                  <>
                    <Button onClick={() => {
                      if (selectedEntry) {
                        setEntries(entries.filter(entry => entry.id !== selectedEntry.id));
                        setSelectedEntry(null);
                        setCurrentTitle('');
                        setCurrentContent('');
                        setIsEditing(false);
                      }
                    }}>
                      Delete
                    </Button>
                    <Button primary onClick={() => setIsEditing(true)}>
                      Edit
                    </Button>
                  </>
                )}
              </ButtonGroup>
            </>
          ) : (
            <EmptyState>
              <span style={{ fontSize: '2rem' }}>📖</span>
              <p>Select an entry to view or create a new one</p>
            </EmptyState>
          )}
        </EditorSection>
      </JournalGrid>

      <AutoSaveIndicator visible={showAutoSave}>
        ✓ Auto-saved
      </AutoSaveIndicator>
    </ContentWrapper>
  );
};

export default Journal;