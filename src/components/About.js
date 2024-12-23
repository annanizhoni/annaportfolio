import React from 'react';

const About = () => {
  return (
    <main className="content-grid mx-auto max-w-4xl p-4">
      {/* Profile Photo Section */}
      <div className="profile-photo mb-8">
        <img
          src="me.jpg"
          alt="Headshot"
          className="rounded-full mx-auto"
          style={{ maxWidth: '200px' }}
        />
      </div>

      {/* About Section */}
      <div className="text-content mb-8">
        <h1 className="text-4xl font-barrio text-center mb-6">ABOUT</h1>
        <p className="text-base font-quicksand text-center">
          I am a lifelong artist and musician with a diverse skillset.
          From charcoal drawing to beadwork, graphic design to pinstriping, I have honed
          my artistic skills over the years and explored a wide range of mediums. As a
          musician I am proficient in classical piano and banjo, but have learned many other instruments including violin, guitar, and accordion.
          <br />
          <br />
          For several years, I lived in an old van; exploring the western United States and
          immersing myself in the beauty of the natural world. As a polymath and member of
          the Navajo Nation, I bring a unique perspective to everything I do. I am
          passionate about giving back to my community and have created art to support
          Indigenous and environmental non-profits throughout Utah. From advocating for
          sacred lands to raising awareness for missing and murdered Indigenous women, my artwork has been a tool
          for storytelling, connection, and positive change.
        </p>
      </div>

      {/* Press Section */}
      <div className="press-section my-8">
        <h2 className="text-2xl font-bold text-center mb-4">Press</h2>
        <div className="flex justify-center">
          <a
            href="https://townlift.com/2024/11/anna-nizhoni-art-activism-and-healing-through-create-pc/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 border rounded-md p-4 shadow-lg hover:shadow-xl transition-shadow duration-200"
          >
            <img
              src="/townliftlogo.png" // Logo in public folder
              alt="TownLift Logo"
              style={{ width: '50px', height: '50px' }}
            />
            <span className="text-blue-500 hover:underline">
              Anna Nizhoni: Art, Activism, and Healing Through Create PC
            </span>
          </a>
        </div>
      </div>
    </main>
  );
};

export default About;