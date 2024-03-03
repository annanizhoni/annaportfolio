import React from 'react';

const About = () => {
  return (
    <main className="content-grid mx-auto max-w-4xl p-4">
      <div className="profile-photo mb-8">
        <img src="me.jpg" alt="Headshot" className="rounded-full mx-auto" style={{ maxWidth: '200px' }} />
      </div>
      <div className="text-content mb-8">
        <h1 className="text-4xl font-barrio text-center mb-6">ABOUT</h1>
        <p className="text-base font-quicksand text-center">
          I am a lifelong artist and musician with a diverse skillset. I have always been fascinated by the creative process and the endless possibilities it presents. From charcoal drawing to beadwork, graphic design to pinstriping, I have honed my artistic skills over the years and explored a wide range of mediums. In addition to my artistic pursuits, I am also a talented musician; proficient in classical piano and banjo. For several years, I lived in an old van; exploring the western United States, immersing myself in the beauty of the natural world.
          <br /><br />
          As a polymath and member of the Navajo Nation, I bring a unique perspective and apply my wide range of abilities to everything that I do. In addition to my creative talents, I am also skilled in web development, wilderness survival, and auto mechanics. I am a dedicated problem solver and an effective communicator. I am always seeking out new challenges and pushing myself to learn and grow.
          <br /><br />
          My passion for computer science was ignited when I discovered Google's user experience course; I quickly realized that I could combine my love of art and technology to create amazing things. I aspire to design interactive software that is both beautiful and functional, bringing new and exciting ideas to life. With my breadth of skills and experience combined with my passion for creativity and innovation, I am ready to take on any challenge and make a difference in the world.
        </p>
      </div>
      <div className="text-center my-4">
        <a href="https://niybpkzfotwxowffxpps.supabase.co/storage/v1/object/public/resume/AnnaNizhoniResume.pdf?t=2024-02-28T04%3A29%3A15.761Z" download="AnnaNizhoniResume.pdf" target="_blank" rel="noopener noreferrer" className="bg-[#00748C] hover:bg-[#003844] text-white font-bold py-2 px-4">
          View Resume
        </a>
      </div>
    </main>
  );
};

export default About;
