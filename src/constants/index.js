export const navLinks = [
  {
    id: 1,
    name: 'Home',
    href: '#home',
  },
  {
    id: 2,
    name: 'About',
    href: '#about',
  },
  {
    id: 3,
    name: 'Work',
    href: '#work',
  },
  {
    id: 4,
    name: 'Contact',
    href: '#contact',
  },
];


export const myProjects = [
  {
    title: 'VoxTamil - Regional AI Sentiment Analyzer',
    desc: 'VoxTamil is a specialized Natural Language Processing platform built to decode multi-class political sentiments from regional Tamil text. By analyzing public commentary from platforms like X, it classifies conversational data into seven distinct political categories with high precision.',
    subdesc:
      'Built as a high-performance NLP pipeline using Python, MuRIL, XLM-RoBERTa, and Hugging Face Transformers, VoxTamil scaled to process over 10,000 comments, securing a global Rank 19 on the DravidianLangTech leaderboard.',
    texture: '/textures/project/project.mp4',
    logo: '/assets/project-logo1.png',
    logoStyle: {
      backgroundColor: '#2A1816',
      border: '0.2px solid #36201D',
      boxShadow: '0px 0px 60px 0px #AA3C304D',
    },
    spotlight: '/assets/spotlight1.png',
    tags: [
      {
        id: 1,
        name: 'Python',
        path: '/assets/python-svgrepo-com.svg',
      },
      {
        id: 2,
        name: 'Hugging Face',
        path: 'assets/huggingface-color.svg',
      },
      {
        id: 3,
        name: 'PyTorch',
        path: '/assets/PyTorch.svg',
      },
      {
        id: 4,
        name: 'Scikit-Learn',
        path: '/assets/scikit-learn.svg',
      },
    ],
  },
];

export const calculateSizes = (isSmall, isMobile, isTablet) => {
  return {
    deskScale: isSmall ? 0.05 : isMobile ? 0.06 : 0.065,
    deskPosition: isMobile ? [0.5, -4.5, 0] : [0.25, -5.5, 0],
    cubePosition: isSmall ? [4, -5, 0] : isMobile ? [5, -5, 0] : isTablet ? [5, -5, 0] : [9, -5.5, 0],
    reactLogoPosition: isSmall ? [3, 4, 0] : isMobile ? [5, 4, 0] : isTablet ? [5, 4, 0] : [12, 3, 0],
    ringPosition: isSmall ? [-5, 7, 0] : isMobile ? [-10, 10, 0] : isTablet ? [-12, 10, 0] : [-24, 10, 0],
    targetPosition: isSmall ? [-5, -10, -10] : isMobile ? [-9, -10, -10] : isTablet ? [-11, -7, -10] : [-13, -13, -10],
  };
};

export const workExperiences = [
  {
    id: 1,
    name: 'Kongu Campus Explorer',
    pos: 'Lead Web Developer',
    title: "Engineered an immersive 3D navigation system using Three.js and React Three Fiber, featuring collision detection and WASD controls for 10+ models. Optimized performance by implementing custom loading for 9MB GLB models and deploying as a PWA to Vercel with offline service worker caching.",
    icon: '/assets/kec.png',
    animation: 'victory',
  },
  {
    id: 2,
    name: 'DeepAgriVision',
    pos: 'Lead Engineer',
    title: "Tomato Plant Disease Prediction using IoT and Deep Learning (MobileNetV2) An IoT‑enabled deep learning system using MobileNetV2 to classify tomato leaf diseases. Real-time monitoring and predictive analytics help farmers reduce crop loss, improve yield, and support precision agriculture. ",
    icon: '/assets/deepagri.png',
    animation: 'clapping',
  },
  {
    id: 3,
    name: 'Legal-Sahayak',
    pos: 'Java Devloper',
    title: "Legal Sahayak is a comprehensive legal awareness and assistance application designed to empower citizens with knowledge of their legal rights. Built with a Java Swing GUI and a SQLite backend, it provides an intuitive interface for navigating complex legal landscapes, maintaining personal evidence logs, and generating formal legal documents like RTI requests.",
    icon: '/assets/legal.png',
    animation: 'salute',
  },
];
