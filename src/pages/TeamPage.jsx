
import React from 'react';
import TeamMemberCard from '../components/TeamMemberCard';


const teamMembers = [
  {
    id: 1,
    name: 'Deniz Açay',
    title: 'Project Manager',
    imageSrc: 'https://placehold.co/400x400/23A6F0/FFFFFF?text=D.A.', 
  },
  {
    id: 2,
    name: 'M. Alper Perdecioglu', 
    title: 'Full Stack Developer',
    imageSrc: 'https://placehold.co/400x400/23856D/FFFFFF?text=M.A.P.', 
  },
];

const TeamPage = () => {
  return (
    <div className="py-12 px-4">
      <div className="container mx-auto text-center">
        <h4 className="font-bold text-second-text-color">NE YAPIYORUZ</h4>
        <h2 className="text-5xl font-bold text-text-color mt-2 mb-4">Size Özel İnovatif Projeler</h2>
        <p className="text-second-text-color max-w-2xl mx-auto mb-16">
          Büyük Fikirleri Olan Küçük İşletmelere Yardımcı Oluyoruz
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {teamMembers.map((member) => (
            <TeamMemberCard
              key={member.id}
              name={member.name}
              title={member.title}
              imageSrc={member.imageSrc}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamPage;