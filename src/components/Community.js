import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const CreatePostButton = styled.button`
  background: #FF69B4;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 20px;
  cursor: pointer;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    background: #FF1493;
  }
`;

const CommunitiesSection = styled.div`
  background: white;
  border-radius: 10px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const CommunityCard = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #edf2f7;
  
  &:last-child {
    border-bottom: none;
  }
`;

const CommunityIcon = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 10px;
  margin-right: 1rem;
`;

const CommunityInfo = styled.div`
  flex: 1;
`;

const CommunityName = styled.h3`
  margin: 0;
  color: #2d3748;
  font-size: 1rem;
`;

const CommunityDescription = styled.p`
  margin: 0.25rem 0 0;
  color: #718096;
  font-size: 0.875rem;
`;

const JoinButton = styled.button`
  background: ${props => props.joined ? '#E2E8F0' : '#FF69B4'};
  color: ${props => props.joined ? '#4A5568' : 'white'};
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 15px;
  cursor: pointer;
  font-weight: 500;
  
  &:hover {
    background: ${props => props.joined ? '#CBD5E0' : '#FF1493'};
  }
`;

const PostsSection = styled.div`
  display: grid;
  gap: 1.5rem;
`;

const PostCard = styled.div`
  background: white;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const PostHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const UserAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 1rem;
`;

const PostInfo = styled.div`
  flex: 1;
`;

const UserName = styled.h4`
  margin: 0;
  color: #2d3748;
  font-size: 1rem;
`;

const PostTime = styled.span`
  color: #718096;
  font-size: 0.875rem;
`;

const PostContent = styled.div`
  margin-bottom: 1rem;
  color: #4a5568;
`;

const PostImage = styled.img`
  width: 100%;
  border-radius: 10px;
  margin-bottom: 1rem;
`;

const PostActions = styled.div`
  display: flex;
  gap: 1rem;
  color: #718096;
  font-size: 0.875rem;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  color: #718096;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    color: #FF69B4;
  }
`;

const CommentSection = styled.div`
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #edf2f7;
`;

const CommentInput = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const CommentTextArea = styled.textarea`
  flex: 1;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 5px;
  resize: vertical;
  min-height: 40px;
  
  &:focus {
    outline: none;
    border-color: #FF69B4;
  }
`;

const Comment = styled.div`
  padding: 1rem;
  border-bottom: 1px solid #edf2f7;
  
  &:last-child {
    border-bottom: none;
  }
`;

const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

const CommentAuthor = styled.span`
  font-weight: 500;
  color: #2d3748;
`;

const CommentTime = styled.span`
  color: #718096;
  font-size: 0.875rem;
`;

const Button = styled.button`
  background: #FF69B4;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 15px;
  cursor: pointer;
  font-weight: 500;
  
  &:hover {
    background: #FF1493;
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
              <span style={{ fontSize: '0.875rem', color: '#718096' }}>
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
                style={{ color: post.liked ? '#FF69B4' : '#718096' }}
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
                <CommentInput>
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
                </CommentInput>
              </CommentSection>
            )}
          </PostCard>
        ))}
      </PostsSection>
    </Container>
  );
};

export default Community;