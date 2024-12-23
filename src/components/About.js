import React from 'react';

const About = () => {
  return (
    <main className="content-grid mx-auto max-w-4xl p-8">
      {/* About Section */}
      <div className="text-content mb-12 px-6 md:px-12">
        <p className="text-base font-quicksand text-center leading-relaxed">
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

      {/* Achievements Section */}
      <div className="achievements-section my-8">
        <h2 className="text-4xl font-barrio text-center mb-6">Achievements & Exhibitions</h2>
        <div className="font-quicksand text-center space-y-4">
          <p>Artist in Residence at Create PC - Park City, UT (2024 to Present)</p>
          <p>Exhibitor at Create PC Gallery - Park City, UT (2024 to Present)</p>
          <p>Live drawing artist at Monster Draw Rally - Park City, UT (2024)</p>
          <p>1st Place for Utah Symphony's "Unwound" T-shirt contest (2019)</p>
          <p>Exhibitor at Urban Arts Gallery - Salt Lake City, UT (2019)</p>
          <p>Exhibitor for Blocks SLC public art installation - Salt Lake City, UT (2018)</p>
          <p>Exhibitor at Urban Arts Gallery - Salt Lake City, UT (2018)</p>
          <p>Exhibitor at Pancakes & Booze pop-up art gallery - San Francisco, CA (2018)</p>
        </div>
      </div>

      {/* Press Section */}
      <div className="press-section my-8">
        <h2 className="text-4xl font-barrio text-center mb-6">Press</h2>
        <div className="flex justify-center">
          <a
            href="https://townlift.com/2024/11/anna-nizhoni-art-activism-and-healing-through-create-pc/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 border rounded-md p-4 shadow-lg hover:shadow-xl transition-shadow duration-200"
          >
            <img
              src="/townliftlogo.png"
              alt="TownLift Logo"
              className="w-auto h-12"
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