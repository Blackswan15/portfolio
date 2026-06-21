const Footer = () => {
  return (
    <footer className="c-space pt-7 pb-3 border-t border-black-300 flex justify-between items-center flex-wrap gap-5">
      <div className="flex gap-5 ">
        <a
          href="https://github.com/Blackswan15"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon"
        >
          <img src="/assets/github.svg" alt="github" className="w-1/2 h-1/2" />
        </a>

        <a
          href="https://www.linkedin.com/in/abishekcr/"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon"
        >
          <img src="/assets/linkedin-svgrepo-com.svg" alt="linkedin" className="w-1/2 h-1/2" />
        </a>

        <a
          href="https://leetcode.com/u/whiteswan_15"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon"
        >
          <img src="/assets/leetcode.svg" alt="leetcode" className="w-1/2 h-1/2" />
        </a>

        <a
          href="https://www.geeksforgeeks.org/profile/abishekc03o"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon"
        >
          <img src="/assets/geeksforgeeks-svgrepo-com.svg" alt="geeksforgeeks" className="w-1/2 h-1/2" />
        </a>
        <a
          href="https://codeforces.com/profile/abishekcrcse"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon"
        >
          <img src="/assets/code-forces.svg" alt="codeforces" className="w-1/2 h-1/2" />
        </a>
      </div>
      

    </footer>
  );
};

export default Footer;
