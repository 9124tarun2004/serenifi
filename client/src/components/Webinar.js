import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 2rem;
  background-color: #f0f2f5;
  min-height: 100vh;
`;

const Title = styled.h1`
  font-size: 1.75rem;
  color: #2d3748;
  margin-bottom: 2rem;
`;

const ProfessionalCard = styled.div`
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 2rem;
  transition: transform 0.2s, box-shadow 0.2s;
  border: 1px solid rgba(226, 232, 240, 0.8);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  }
`;

const ProfileImage = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 60px;
  overflow: hidden;
  flex-shrink: 0;
  border: 3px solid #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ProfessionalInfo = styled.div`
  flex: 1;
`;

const Name = styled.h2`
  font-size: 1.5rem;
  color: #2d3748;
  margin-bottom: 0.5rem;
`;

const Specialty = styled.p`
  font-size: 1rem;
  color: #4a5568;
  margin-bottom: 0.5rem;
`;

const Experience = styled.p`
  font-size: 0.875rem;
  color: #718096;
`;

const BookButton = styled.button`
  background: #4A5568;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 0.875rem;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-left: auto;
  flex-shrink: 0;

  &:hover {
    background: #2D3748;
  }
`;

const SearchBar = styled.div`
  margin-bottom: 2rem;
  position: relative;

  input {
    width: 100%;
    padding: 1rem;
    padding-left: 3rem;
    border: 1px solid #e2e8f0;
    border-radius: 10px;
    font-size: 1rem;
    background: white;
    outline: none;
    transition: border-color 0.2s;

    &:focus {
      border-color: #4A5568;
    }
  }

  &::before {
    content: '🔍';
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    font-size: 1.25rem;
  }
`;

const FilterTags = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const FilterTag = styled.button`
  padding: 0.5rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 20px;
  background: ${props => props.active ? '#4A5568' : 'white'};
  color: ${props => props.active ? 'white' : '#4A5568'};
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${props => props.active ? '#2D3748' : '#f7fafc'};
  }
`;

const professionals = [
  // Psychiatrists
  {
    id: 1,
    name: 'Dr. Mary Jane',
    specialty: 'Psychiatrist at HMC Hospital',
    experience: '10 years of Experience',
    type: 'Psychiatrist',
    image: 'https://img.freepik.com/free-photo/woman-doctor-wearing-lab-coat-with-stethoscope-isolated_1303-29791.jpg'
  },
  {
    id: 2,
    name: 'Dr. Pepper Pots',
    specialty: 'Psychiatrist at ABC Hospital',
    experience: '9 years of Experience',
    type: 'Psychiatrist',
    image: 'https://img.freepik.com/free-photo/doctor-with-his-arms-crossed-white-background_1368-5790.jpg'
  },
  {
    id: 3,
    name: 'Dr. Peter Parker',
    specialty: 'Psychiatrist at RMN Hospital',
    experience: '12 years of Experience',
    type: 'Psychiatrist',
    image: 'https://img.freepik.com/free-photo/portrait-smiling-male-doctor_171337-1532.jpg'
  },
  // Psychologists
  {
    id: 4,
    name: 'Dr. Sarah Wilson',
    specialty: 'Clinical Psychologist at Mind Care Center',
    experience: '8 years of Experience',
    type: 'Psychologist',
    image: 'https://img.freepik.com/free-photo/medium-shot-smiley-doctor-with-crossed-arms_23-2149355828.jpg'
  },
  {
    id: 5,
    name: 'Dr. James Miller',
    specialty: 'Child Psychologist at Kids First',
    experience: '15 years of Experience',
    type: 'Psychologist',
    image: 'https://img.freepik.com/free-photo/handsome-young-male-doctor-with-stethoscope-standing-against-blue-background_662251-337.jpg'
  },
  {
    id: 6,
    name: 'Dr. Emily Brown',
    specialty: 'Sports Psychologist at Elite Mind',
    experience: '7 years of Experience',
    type: 'Psychologist',
    image: 'https://img.freepik.com/free-photo/pleased-young-female-doctor-wearing-medical-robe-stethoscope-around-neck-standing-with-closed-posture_409827-254.jpg'
  },
  // Counselors
  {
    id: 7,
    name: 'Lisa Thompson',
    specialty: 'Marriage Counselor at Family First',
    experience: '11 years of Experience',
    type: 'Counselor',
    image: 'https://img.freepik.com/free-photo/front-view-woman-doctor-with-medical-robe-stethoscope_23-2148445082.jpg'
  },
  {
    id: 8,
    name: 'Michael Chen',
    specialty: 'Career Counselor at Career Path',
    experience: '6 years of Experience',
    type: 'Counselor',
    image: 'https://img.freepik.com/free-photo/portrait-successful-mid-adult-doctor-with-crossed-arms_1262-12865.jpg'
  },
  {
    id: 9,
    name: 'Rachel Green',
    specialty: 'Addiction Counselor at New Hope',
    experience: '13 years of Experience',
    type: 'Counselor',
    image: 'https://img.freepik.com/free-photo/woman-doctor-wearing-lab-coat-with-stethoscope-isolated_1303-29791.jpg'
  }
];

const Webinar = () => {
  const [selectedType, setSelectedType] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const handleBooking = (professionalId) => {
    // Handle booking logic here
    console.log('Booking with professional:', professionalId);
  };

  const filteredProfessionals = professionals.filter(professional => {
    const matchesType = selectedType === 'All' || professional.type === selectedType;
    const matchesSearch = professional.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         professional.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <Container>
      <Title>Consult With Professionals</Title>

      <SearchBar>
        <input 
          type="text" 
          placeholder="Search professionals by name or specialty..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </SearchBar>

      <FilterTags>
        <FilterTag 
          active={selectedType === 'All'} 
          onClick={() => setSelectedType('All')}
        >
          All
        </FilterTag>
        <FilterTag 
          active={selectedType === 'Psychiatrist'} 
          onClick={() => setSelectedType('Psychiatrist')}
        >
          Psychiatrist
        </FilterTag>
        <FilterTag 
          active={selectedType === 'Psychologist'} 
          onClick={() => setSelectedType('Psychologist')}
        >
          Psychologist
        </FilterTag>
        <FilterTag 
          active={selectedType === 'Counselor'} 
          onClick={() => setSelectedType('Counselor')}
        >
          Counselor
        </FilterTag>
      </FilterTags>

      {filteredProfessionals.map(professional => (
        <ProfessionalCard key={professional.id}>
          <ProfileImage>
            <img src={professional.image} alt={professional.name} />
          </ProfileImage>
          <ProfessionalInfo>
            <Name>{professional.name}</Name>
            <Specialty>{professional.specialty}</Specialty>
            <Experience>{professional.experience}</Experience>
          </ProfessionalInfo>
          <BookButton onClick={() => handleBooking(professional.id)}>
            Book Now
          </BookButton>
        </ProfessionalCard>
      ))}
    </Container>
  );
};

export default Webinar;