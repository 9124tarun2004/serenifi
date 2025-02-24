import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { theme } from '../theme/colors';

const Container = styled.div`
  padding: ${theme.spacing.xxl};
  max-width: 1200px;
  margin: 0 auto;
  background-color: ${theme.colors.background};
  min-height: 100vh;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.xl};
  padding-bottom: ${theme.spacing.lg};
  border-bottom: 2px solid ${theme.colors.border.light};

  h1 {
    font-size: 2rem;
    color: ${theme.colors.text.primary};
    font-weight: 600;
    position: relative;
    
    &:after {
      content: '';
      position: absolute;
      bottom: -8px;
      left: 0;
      width: 60px;
      height: 4px;
      background: ${theme.gradients.primary};
      border-radius: ${theme.radius.full};
    }
  }
`;

const CreatePostButton = styled.button`
  background: ${theme.gradients.primary};
  color: white;
  border: none;
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  border-radius: ${theme.radius.full};
  cursor: pointer;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  transition: ${theme.transitions.bounce};
  box-shadow: ${theme.shadows.md};
  position: relative;
  overflow: hidden;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${theme.gradients.secondary};
    opacity: 0;
    transition: ${theme.transitions.default};
  }

  &:hover {
    transform: translateY(-2px) scale(1.02);
    box-shadow: ${theme.shadows.hover};

    &:before {
      opacity: 1;
    }
  }

  span {
    font-size: 1.2rem;
    position: relative;
    z-index: 1;
  }
`;

const CommunitiesSection = styled.div`
  margin-bottom: ${theme.spacing.xl};

  h2 {
    color: ${theme.colors.text.primary};
    margin-bottom: ${theme.spacing.md};
    font-size: 1.5rem;
  }
`;

const CommunityCard = styled.div`
  display: flex;
  align-items: center;
  padding: ${theme.spacing.xl};
  background: ${theme.gradients.surface};
  border-radius: ${theme.radius.lg};
  margin-bottom: ${theme.spacing.lg};
  box-shadow: ${theme.shadows.sm};
  transition: ${theme.transitions.default};
  border: 1px solid ${theme.colors.border.light};
  position: relative;
  overflow: hidden;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background: ${theme.gradients.primary};
    opacity: 0;
    transition: ${theme.transitions.default};
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.lg};
    border-color: ${theme.colors.border.hover};

    &:before {
      opacity: 1;
    }
  }
`;

const CommunityIcon = styled.img`
  width: 70px;
  height: 70px;
  border-radius: ${theme.radius.lg};
  margin-right: ${theme.spacing.xl};
  object-fit: cover;
  box-shadow: ${theme.shadows.sm};
  border: 2px solid ${theme.colors.border.light};
  transition: ${theme.transitions.default};

  ${CommunityCard}:hover & {
    border-color: ${theme.colors.border.hover};
    transform: scale(1.05);
  }
`;

const CommunityInfo = styled.div`
  flex: 1;
`;

const CommunityName = styled.h3`
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.sm};
  font-size: 1.2rem;
`;

const CommunityDescription = styled.p`
  color: ${theme.colors.text.secondary};
  margin-bottom: ${theme.spacing.sm};
  font-size: 0.95rem;
`;

const JoinButton = styled.button`
  background: ${props => props.joined ? theme.colors.primaryLighter : theme.gradients.primary};
  color: ${props => props.joined ? theme.colors.primary : 'white'};
  border: ${props => props.joined ? `2px solid ${theme.colors.primary}` : 'none'};
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  border-radius: ${theme.radius.full};
  cursor: pointer;
  font-weight: 600;
  transition: ${theme.transitions.bounce};
  box-shadow: ${props => props.joined ? 'none' : theme.shadows.md};
  position: relative;
  overflow: hidden;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${props => props.joined ? 'none' : theme.gradients.secondary};
    opacity: 0;
    transition: ${theme.transitions.default};
  }

  &:hover {
    transform: translateY(-2px) scale(1.02);
    box-shadow: ${theme.shadows.hover};
    background: ${props => props.joined ? theme.colors.primaryLighter : 'none'};

    &:before {
      opacity: 1;
    }
  }

  span {
    position: relative;
    z-index: 1;
  }
`;

const PostsSection = styled.div`
  margin-top: ${theme.spacing.xl};
`;

const PostCard = styled.div`
  background: ${theme.colors.surface};
  border-radius: ${theme.radius.lg};
  padding: ${theme.spacing.xl};
  margin-bottom: ${theme.spacing.xl};
  box-shadow: ${theme.shadows.sm};
  border: 1px solid ${theme.colors.border.light};
  transition: ${theme.transitions.default};
  position: relative;
  overflow: hidden;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: ${theme.gradients.primary};
    opacity: 0;
    transition: ${theme.transitions.default};
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.lg};
    border-color: ${theme.colors.border.hover};

    &:before {
      opacity: 1;
    }
  }
`;

const PostHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${theme.spacing.md};
`;

const UserAvatar = styled.img`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  margin-right: ${theme.spacing.md};
`;

const PostInfo = styled.div`
  flex: 1;
`;

const UserName = styled.div`
  font-weight: 600;
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.sm};
`;

const PostTime = styled.div`
  color: ${theme.colors.text.light};
  font-size: 0.875rem;
`;

const PostContent = styled.p`
  color: ${theme.colors.text.primary};
  margin: ${theme.spacing.lg} 0;
  line-height: 1.7;
  font-size: 1.05rem;
`;

const PostImage = styled.img`
  width: 100%;
  border-radius: ${theme.radius.lg};
  margin: ${theme.spacing.lg} 0;
  max-height: 400px;
  object-fit: cover;
  box-shadow: ${theme.shadows.sm};
  transition: ${theme.transitions.default};

  &:hover {
    transform: scale(1.01);
    box-shadow: ${theme.shadows.md};
  }
`;

const PostActions = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  padding-top: ${theme.spacing.sm};
  border-top: 1px solid ${theme.colors.border.light};
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  color: ${theme.colors.text.muted};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  cursor: pointer;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.radius.md};
  transition: ${theme.transitions.bounce};
  font-weight: 500;
  position: relative;
  overflow: hidden;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${theme.colors.overlay};
    opacity: 0;
    transition: ${theme.transitions.default};
    border-radius: ${theme.radius.md};
  }

  &:hover {
    color: ${theme.colors.primary};
    transform: translateY(-1px);

    &:before {
      opacity: 1;
    }
  }

  span {
    font-size: 1.2rem;
    position: relative;
    z-index: 1;
  }
`;

const CommentSection = styled.div`
  margin: ${theme.spacing.lg} -${theme.spacing.xl} -${theme.spacing.xl} -${theme.spacing.xl};
  padding: ${theme.spacing.xl};
  background: ${theme.colors.primaryLighter};
  border-bottom-left-radius: ${theme.radius.lg};
  border-bottom-right-radius: ${theme.radius.lg};
  position: relative;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background: ${theme.gradients.accent};
  }
`;

const Comment = styled.div`
  padding: ${theme.spacing.lg};
  background: ${theme.colors.surface};
  border-radius: ${theme.radius.md};
  margin-bottom: ${theme.spacing.md};
  box-shadow: ${theme.shadows.sm};
  transition: ${theme.transitions.default};
  border: 1px solid ${theme.colors.border.light};
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: ${theme.shadows.md};
    border-color: ${theme.colors.border.hover};
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${theme.spacing.sm};
`;

const CommentAuthor = styled.span`
  font-weight: 500;
  color: ${theme.colors.text.primary};
`;

const CommentTime = styled.span`
  color: ${theme.colors.text.light};
  font-size: 0.875rem;
`;

const CommentTextArea = styled.textarea`
  flex: 1;
  padding: ${theme.spacing.md};
  border: 2px solid ${theme.colors.border.light};
  border-radius: ${theme.radius.md};
  resize: vertical;
  min-height: 40px;
  color: ${theme.colors.text.primary};
  background: ${theme.colors.surface};
  transition: ${theme.transitions.default};
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    box-shadow: ${theme.shadows.sm};
  }

  &:hover {
    border-color: ${theme.colors.border.hover};
  }
`;

const Button = styled.button`
  background: ${theme.gradients.primary};
  color: white;
  border: none;
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  border-radius: ${theme.radius.full};
  cursor: pointer;
  font-weight: 600;
  transition: ${theme.transitions.default};
  box-shadow: ${theme.shadows.sm};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.hover};
    background: ${theme.gradients.secondary};
  }

  &:disabled {
    background: ${theme.colors.divider};
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const Community = () => {
  const navigate = useNavigate();
  const [communities, setCommunities] = useState([
    {
      id: 1,
      name: 'Meditation Circle',
      description: 'Mindfulness practices and meditation discussions',
      members: 2530,
      icon: 'https://via.placeholder.com/50',
      joined: false
    },
    {
      id: 2,
      name: 'ADHD Support',
      description: 'Support group for adults with ADHD',
      members: 1845,
      icon: 'https://via.placeholder.com/50',
      joined: true
    },
    {
      id: 3,
      name: 'Anxiety Relief',
      description: 'Coping strategies and support for anxiety',
      members: 2120,
      icon: 'https://via.placeholder.com/50',
      joined: false
    }
  ]);

  const [posts, setPosts] = useState([
    {
      id: 1,
      user: {
        name: 'Sarah Johnson',
        avatar: 'https://via.placeholder.com/40'
      },
      time: '2 hours ago',
      content: 'Just completed my 30-day mindfulness challenge! The journey has been incredible, and I\'ve noticed significant improvements in my mental well-being. Remember, small steps lead to big changes! 🧘‍♀️ #MentalHealth #Mindfulness',
      image: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      likes: 42,
      liked: false,
      comments: [
        {
          id: 1,
          user: 'John Doe',
          content: 'This is amazing! Keep up the great work! 🎉',
          time: '1 hour ago'
        }
      ],
      showComments: false
    }
  ]);

  const [newComment, setNewComment] = useState('');
  const [selectedPostId, setSelectedPostId] = useState(null);

  useEffect(() => {
    // Load posts from localStorage if any
    const savedPosts = localStorage.getItem('communityPosts');
    if (savedPosts) {
      setPosts(prev => [...JSON.parse(savedPosts), ...prev]);
    }
  }, []);

  const handleJoinCommunity = (communityId) => {
    setCommunities(communities.map(community => {
      if (community.id === communityId) {
        const newJoinedStatus = !community.joined;
        return {
          ...community,
          joined: newJoinedStatus,
          members: newJoinedStatus ? community.members + 1 : community.members - 1
        };
      }
      return community;
    }));
  };

  const handleLike = (postId) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        const newLikedStatus = !post.liked;
        return {
          ...post,
          liked: newLikedStatus,
          likes: newLikedStatus ? post.likes + 1 : post.likes - 1
        };
      }
      return post;
    }));
  };

  const toggleComments = (postId) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return { ...post, showComments: !post.showComments };
      }
      return post;
    }));
    setSelectedPostId(postId);
  };

  const handleComment = (postId) => {
    if (!newComment.trim()) return;

    setPosts(posts.map(post => {
      if (post.id === postId) {
        const newCommentObj = {
          id: Date.now(),
          user: 'You',
          content: newComment,
          time: 'Just now'
        };
        return {
          ...post,
          comments: [...post.comments, newCommentObj]
        };
      }
      return post;
    }));

    setNewComment('');
  };

  const handleCreatePost = () => {
    navigate('/create-post');
  };

  return (
    <Container>
      <Header>
        <h1>Community</h1>
        <CreatePostButton onClick={handleCreatePost}>
          <span>+</span> Create Post
        </CreatePostButton>
      </Header>

      <CommunitiesSection>
        <h2>Communities</h2>
        {communities.map(community => (
          <CommunityCard key={community.id}>
            <CommunityIcon src={community.icon} alt={community.name} />
            <CommunityInfo>
              <CommunityName>{community.name}</CommunityName>
              <CommunityDescription>{community.description}</CommunityDescription>
              <span style={{ fontSize: '0.875rem', color: theme.colors.text.light }}>
                {community.members.toLocaleString()} members
              </span>
            </CommunityInfo>
            <JoinButton 
              joined={community.joined}
              onClick={() => handleJoinCommunity(community.id)}
            >
              {community.joined ? 'Joined' : 'Join'}
            </JoinButton>
          </CommunityCard>
        ))}
      </CommunitiesSection>

      <PostsSection>
        {posts.map(post => (
          <PostCard key={post.id}>
            <PostHeader>
              <UserAvatar src={post.user.avatar} alt={post.user.name} />
              <PostInfo>
                <UserName>{post.user.name}</UserName>
                <PostTime>{post.time}</PostTime>
              </PostInfo>
            </PostHeader>
            <PostContent>{post.content}</PostContent>
            {post.image && <PostImage src={post.image} alt="Post" />}
            <PostActions>
              <ActionButton 
                onClick={() => handleLike(post.id)}
                style={{ color: post.liked ? theme.colors.primary : theme.colors.text.secondary }}
              >
                <span>👍</span> {post.likes} Likes
              </ActionButton>
              <ActionButton onClick={() => toggleComments(post.id)}>
                <span>💭</span> {post.comments.length} Comments
              </ActionButton>
              <ActionButton>
                <span>↗️</span> Share
              </ActionButton>
            </PostActions>

            {post.showComments && (
              <CommentSection>
                {post.comments.map(comment => (
                  <Comment key={comment.id}>
                    <CommentHeader>
                      <CommentAuthor>{comment.user}</CommentAuthor>
                      <CommentTime>{comment.time}</CommentTime>
                    </CommentHeader>
                    <div>{comment.content}</div>
                  </Comment>
                ))}
                <CommentTextArea
                  placeholder="Write a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
                <Button 
                  primary 
                  onClick={() => handleComment(post.id)}
                  disabled={!newComment.trim()}
                >
                  Post
                </Button>
              </CommentSection>
            )}
          </PostCard>
        ))}
      </PostsSection>
    </Container>
  );
};

export default Community;