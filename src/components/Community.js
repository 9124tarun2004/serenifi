import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #f0f2f5;
  padding: 2rem;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  color: #2d3748;
  margin-bottom: 1.5rem;
`;

const PostCard = styled.div`
  background: white;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 1.5rem;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
`;

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: #edf2f7;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
`;

const CreatePost = styled.div`
  background: white;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 1.5rem;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 5px;
  margin: 1rem 0;
  min-height: ${props => props.small ? '60px' : '100px'};
  resize: vertical;

  &:focus {
    outline: none;
    border-color: #f6ad55;
  }
`;

const Button = styled.button`
  background: #f6ad55;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background: #ed8936;
  }

  &:disabled {
    background: #cbd5e0;
    cursor: not-allowed;
  }
`;

const InteractionButton = styled.button`
  background: transparent;
  border: none;
  color: #4a5568;
  padding: 0.5rem 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    color: #f6ad55;
  }

  ${props => props.active && `
    color: #f6ad55;
  `}
`;

const CommentSection = styled.div`
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #e2e8f0;
`;

const Comment = styled.div`
  margin: 1rem 0;
  padding: 1rem;
  background: #f8fafc;
  border-radius: 8px;

  .header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
  }

  .user {
    font-weight: 500;
    color: #2d3748;
  }

  .time {
    font-size: 0.75rem;
    color: #718096;
  }

  .content {
    color: #4a5568;
  }
`;

const TagInput = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 0.5rem 0;

  .tag {
    background: #edf2f7;
    padding: 0.25rem 0.75rem;
    border-radius: 15px;
    font-size: 0.875rem;
    color: #4a5568;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    button {
      background: none;
      border: none;
      color: #718096;
      cursor: pointer;
      padding: 0;
      font-size: 1rem;

      &:hover {
        color: #e53e3e;
      }
    }
  }

  input {
    border: none;
    outline: none;
    padding: 0.25rem;
    font-size: 0.875rem;

    &::placeholder {
      color: #a0aec0;
    }
  }
`;

const Community = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      user: 'Sarah M.',
      avatar: '👩',
      content: 'Just completed a 30-minute meditation session! Feeling so peaceful and centered. 🧘‍♀️✨',
      likes: 12,
      likedBy: [],
      comments: [
        {
          id: 1,
          user: 'Mike R.',
          content: 'That\'s amazing! Keep it up! 🎉',
          time: '1 hour ago'
        }
      ],
      tags: ['meditation', 'mindfulness'],
      time: '2 hours ago'
    },
    {
      id: 2,
      user: 'Mike R.',
      avatar: '👨',
      content: 'Looking for meditation buddies! Anyone interested in doing daily morning sessions together? 🌅',
      likes: 8,
      likedBy: [],
      comments: [],
      tags: ['meditation', 'community'],
      time: '4 hours ago'
    }
  ]);

  const [newPost, setNewPost] = useState('');
  const [newTags, setNewTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [commentInputs, setCommentInputs] = useState({});
  const [showComments, setShowComments] = useState({});

  const handlePost = () => {
    if (newPost.trim()) {
      const post = {
        id: Date.now(),
        user: 'You',
        avatar: '👤',
        content: newPost,
        likes: 0,
        likedBy: [],
        comments: [],
        tags: newTags,
        time: 'Just now'
      };
      setPosts([post, ...posts]);
      setNewPost('');
      setNewTags([]);
      setTagInput('');
    }
  };

  const handleAddTag = (e) => {
    if (e.key === 'Enter' && tagInput.trim() && !newTags.includes(tagInput.trim())) {
      setNewTags([...newTags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove) => {
    setNewTags(newTags.filter(tag => tag !== tagToRemove));
  };

  const handleLike = (postId) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        const isLiked = post.likedBy.includes('You');
        return {
          ...post,
          likes: isLiked ? post.likes - 1 : post.likes + 1,
          likedBy: isLiked 
            ? post.likedBy.filter(user => user !== 'You')
            : [...post.likedBy, 'You']
        };
      }
      return post;
    }));
  };

  const handleComment = (postId) => {
    const comment = commentInputs[postId];
    if (comment?.trim()) {
      setPosts(posts.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            comments: [...post.comments, {
              id: Date.now(),
              user: 'You',
              content: comment,
              time: 'Just now'
            }]
          };
        }
        return post;
      }));
      setCommentInputs({ ...commentInputs, [postId]: '' });
    }
  };

  const toggleComments = (postId) => {
    setShowComments({ ...showComments, [postId]: !showComments[postId] });
  };

  return (
    <Container>
      <div style={{ width: '100%', maxWidth: '600px', margin: '0 auto' }}>
        <Title>Community</Title>

        <CreatePost>
          <UserInfo>
            <Avatar>👤</Avatar>
            <div>
              <p style={{ color: '#2d3748', fontWeight: '500' }}>Share your thoughts</p>
            </div>
          </UserInfo>
          <TextArea
            placeholder="What's on your mind?"
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
          />
          <TagInput>
            {newTags.map(tag => (
              <span key={tag} className="tag">
                #{tag}
                <button onClick={() => removeTag(tag)}>&times;</button>
              </span>
            ))}
            <input
              type="text"
              placeholder="Add tags... (press Enter)"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleAddTag}
            />
          </TagInput>
          <div style={{ textAlign: 'right' }}>
            <Button onClick={handlePost} disabled={!newPost.trim()}>Post</Button>
          </div>
        </CreatePost>

        {posts.map(post => (
          <PostCard key={post.id}>
            <UserInfo>
              <Avatar>{post.avatar}</Avatar>
              <div>
                <p style={{ color: '#2d3748', fontWeight: '500' }}>{post.user}</p>
                <p style={{ color: '#718096', fontSize: '0.875rem' }}>{post.time}</p>
              </div>
            </UserInfo>
            
            <p style={{ color: '#4a5568', marginBottom: '1rem' }}>{post.content}</p>
            
            {post.tags.length > 0 && (
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                {post.tags.map(tag => (
                  <span key={tag} style={{ 
                    color: '#718096',
                    fontSize: '0.875rem'
                  }}>
                    #{tag}
                  </span>
                ))}
              </div>
            )}
            
            <div style={{ display: 'flex', gap: '1rem', borderTop: '1px solid #e2e8f0', paddingTop: '1rem' }}>
              <InteractionButton 
                onClick={() => handleLike(post.id)}
                active={post.likedBy.includes('You')}
              >
                ❤️ {post.likes}
              </InteractionButton>
              <InteractionButton onClick={() => toggleComments(post.id)}>
                💬 {post.comments.length}
              </InteractionButton>
              <InteractionButton>
                ↗️ Share
              </InteractionButton>
            </div>

            {showComments[post.id] && (
              <CommentSection>
                {post.comments.map(comment => (
                  <Comment key={comment.id}>
                    <div className="header">
                      <span className="user">{comment.user}</span>
                      <span className="time">{comment.time}</span>
                    </div>
                    <p className="content">{comment.content}</p>
                  </Comment>
                ))}
                
                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                  <TextArea
                    small
                    placeholder="Write a comment..."
                    value={commentInputs[post.id] || ''}
                    onChange={(e) => setCommentInputs({
                      ...commentInputs,
                      [post.id]: e.target.value
                    })}
                  />
                  <Button 
                    onClick={() => handleComment(post.id)}
                    disabled={!commentInputs[post.id]?.trim()}
                  >
                    Comment
                  </Button>
                </div>
              </CommentSection>
            )}
          </PostCard>
        ))}
      </div>
    </Container>
  );
};

export default Community;