import React from 'react';

const linkedInIcon = '/icon-_linkedin_.svg';
const githubIcon = '/icon-_github_.svg';
const emailIcon = '/email.svg';

function Footer() {
  return (
    <footer className="flex flex-col lg:flex-row justify-between items-center p-5 bg-[#00748C] text-white mt-5 font-quicksand">
      <div className="mb-5 lg:mb-0">
        <p>&copy; {new Date().getFullYear()} Anna Nizhoni</p>
      </div>
      <div className="flex justify-end lg:mt-0 mt-5">
        <a href="https://www.linkedin.com/in/annanizhoni/" target="_blank" rel="noopener noreferrer" className="mr-10 last:mr-0">
          <img src={linkedInIcon} alt="LinkedIn" className="w-6 h-6" />
        </a>
        <a href="https://github.com/annanizhoni" target="_blank" rel="noopener noreferrer" className="mr-10 last:mr-0">
          <img src={githubIcon} alt="GitHub" className="w-6 h-6" />
        </a>
        <a href="mailto:example@example.com" target="_blank" rel="noopener noreferrer" className="mr-10 last:mr-0">
          <img src={emailIcon} alt="Email" className="w-6 h-6" />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
