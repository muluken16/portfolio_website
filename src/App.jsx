import React, { useState, useEffect } from 'react';
import profileImage from './assets/DSC_0059.JPG';
import appMainImage from './assets/deliverapp/image.png';
import appScreenshot1 from './assets/deliverapp/photo_2025-12-18.jpg';
import appScreenshot2 from './assets/deliverapp/photo_2025-12.jpg';
import appScreenshot3 from './assets/deliverapp/photo_2025.jpg';
// Customer App APK
import customerAppApk from './assets/app/customer.apk';
// Rider App Images
import riderAppMainImage from './assets/rideapp/image.png';
import riderAppScreenshot1 from './assets/rideapp/photo_2025-12-18_12-22-29.jpg';
import riderAppScreenshot2 from './assets/rideapp/photo_2025-12-18_12-22-29 (2).jpg';
// Certification Images
import ciscoCert from './assets/Certifications & Training/Cisco.jpg';
import digitalMarketingCert from './assets/Certifications & Training/Digital Marketing.png';
import linuxCert from './assets/Certifications & Training/NDG Essential Linux.jpg';
import recommendationCert from './assets/Certifications & Training/Recommendation Letter – Advisor.jpg';
import redHatCert from './assets/Certifications & Training/Red Hat.jpg';
import { 
  User, 
  Code, 
  Briefcase, 
  GraduationCap, 
  Award, 
  Mail, 
  Phone, 
  MapPin, 
  Github, 
  Linkedin, 
  Download,
  ExternalLink,
  Database,
  Globe,
  Server,
  Smartphone,
  Brain,
  Shield,
  Menu,
  X,
  Star,
  GitBranch,
  Eye,
  Calendar,
  Twitter,
  MessageCircle,
  Send,
  ChevronRight,
  ChevronLeft,
  Play,
  Code2,
  Zap,
  Target,
  Users,
  TrendingUp,
  Coffee,
  Heart,
  CheckCircle,
  Bell,
  FileText,
  Layers,
  Monitor,
  Palette,
  Rocket,
  Trophy,
  Clock,
  BarChart3,
  PieChart,
  Activity,
  Cpu,
  HardDrive,
  Wifi,
  Battery,
  Settings,
  Lightbulb,
  Flame,
  Sparkles,
  Crown,
  Diamond,
  Gift,
  Bookmark,
  Flag,
  Navigation,
  Compass,
  Camera,
  Video,
  Music,
  Headphones,
  Mic,
  Volume,
  VolumeOff,
  Image,
  Film,
  Gamepad,
  Puzzle,
  Shuffle,
  Repeat,
  SkipBack,
  FastForward,
  Rewind,
  Pause,
  StopCircle,
  PlayCircle,
  Circle,
  Plus,
  Minus,
  Equal,
  Hash,
  AtSign,
  DollarSign,
  Bitcoin,
  CreditCard,
  Wallet,
  ShoppingBag,
  ShoppingCart,
  Store,
  Building,
  Home,
  Car,
  Truck,
  Plane,
  Ship,
  Train,
  Bus,
  Bike,
  Sun,
  Moon,
  Cloud,
  CloudRain,
  Snowflake,
  Thermometer,
  Umbrella,
  Wind,
  Sunrise,
  Sunset,
  Mountain,
  Leaf,
  Bug,
  Bird,
  Fish,
  Laptop,
  Tablet,
  Watch,
  Glasses,
  Hammer,
  Link,
  Lock,
  Key,
  Tag,
  Tags,
  File,
  Folder,
  FolderOpen,
  Archive,
  Package,
  Box,
  Inbox,
  Clipboard,
  Copy,
  Undo,
  Redo,
  ZoomIn,
  ZoomOut,
  Map,
  Route,
  ThumbsUp,
  ThumbsDown,
  Smile,
  Frown,
  Meh
} from 'lucide-react';

const Portfolio = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isTablet, setIsTablet] = useState(window.innerWidth >= 768 && window.innerWidth < 1024);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
  const [isSmallMobile, setIsSmallMobile] = useState(window.innerWidth < 480);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeProject, setActiveProject] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState({});
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [orientation, setOrientation] = useState(window.innerHeight > window.innerWidth ? 'portrait' : 'landscape');
  
  // Image Popup Modal State
  const [imagePopup, setImagePopup] = useState({
    isOpen: false,
    image: '',
    title: '',
    issuer: ''
  });
  
  // Mobile Frame Preview State
  const [mobilePreview, setMobilePreview] = useState({
    isOpen: false,
    images: [],
    currentIndex: 0,
    appTitle: '',
    appColor: '#4CAF50'
  });
  
  // GitHub Integration State
  const [githubRepos, setGithubRepos] = useState([]);
  const [githubLoading, setGithubLoading] = useState(true);
  const [githubError, setGithubError] = useState(null);
  const [githubStats, setGithubStats] = useState({
    repos: 0,
    followers: 0,
    following: 0,
    stars: 0
  });

  // App Development Portfolio State
  const [appProjects, setAppProjects] = useState([
    {
      id: 'customer-app',
      title: 'Customer App',
      description: 'Food & grocery ordering app with real-time tracking and secure payments.',
      icon: '📱',
      color: '#4CAF50',
      features: ['Real-time Tracking', 'Secure Payments', 'Push Notifications'],
      tech: ['React Native', 'Redux', 'Socket.io'],
      mainImage: appMainImage,
      screenshots: [appScreenshot1, appScreenshot2, appScreenshot3],
      downloadUrl: customerAppApk,
      status: 'Active'
    },
    {
      id: 'vendor-app',
      title: 'Vendor App',
      description: 'Restaurant & shop management app for orders, inventory, and analytics.',
      icon: '🏪',
      color: '#2196F3',
      features: ['Order Management', 'Inventory Tracking', 'Sales Analytics'],
      tech: ['React Native', 'GraphQL', 'MongoDB'],
      screenshots: [
        'https://via.placeholder.com/200x400/2196F3/ffffff?text=Vendor+Dashboard',
        'https://via.placeholder.com/200x400/2196F3/ffffff?text=Orders',
        'https://via.placeholder.com/200x400/2196F3/ffffff?text=Analytics'
      ],
      status: 'Active'
    },
    {
      id: 'rider-app',
      title: 'Rider App',
      description: 'Professional delivery rider app with GPS navigation, earnings tracking, and route optimization for efficient deliveries.',
      icon: '🚴‍♂️',
      color: '#FF9800',
      features: ['GPS Navigation', 'Earnings Tracker', 'Route Optimization'],
      tech: ['React Native', 'Google Maps API', 'Firebase'],
      mainImage: riderAppMainImage,
      screenshots: [
        riderAppScreenshot1,
        riderAppScreenshot2,
        riderAppMainImage
      ],
      status: 'Active'
    }
  ]);

  // Enhanced Portfolio Features
  const [currentTheme, setCurrentTheme] = useState('light');
  const [particlesEnabled, setParticlesEnabled] = useState(true);
  const [typingText, setTypingText] = useState('');
  const [currentSkill, setCurrentSkill] = useState(0);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [achievementUnlocked, setAchievementUnlocked] = useState(null);
  const [visitCount, setVisitCount] = useState(0);
  const [timeSpent, setTimeSpent] = useState(0);
  const [interactionScore, setInteractionScore] = useState(0);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [konami, setKonami] = useState([]);
  const [weatherData, setWeatherData] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [batteryLevel, setBatteryLevel] = useState(100);
  const [networkSpeed, setNetworkSpeed] = useState('Fast');
  const [deviceInfo, setDeviceInfo] = useState({});
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorTrail, setCursorTrail] = useState([]);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(0);
  const [volume, setVolume] = useState(50);
  const [gameScore, setGameScore] = useState(0);
  const [gameLevel, setGameLevel] = useState(1);
  const [achievements, setAchievements] = useState([]);
  const [badges, setBadges] = useState([]);
  const [skillProgress, setSkillProgress] = useState({});
  const [projectViews, setProjectViews] = useState({});
  const [favoriteProjects, setFavoriteProjects] = useState([]);
  const [bookmarkedSections, setBookmarkedSections] = useState([]);
  const [personalityType, setPersonalityType] = useState('INTJ');
  const [codingStreak, setCodingStreak] = useState(365);
  const [coffeeCount, setCoffeeCount] = useState(1247);
  const [linesOfCode, setLinesOfCode] = useState(50000);
  const [bugsFixed, setBugsFixed] = useState(999);
  const [projectsCompleted, setProjectsCompleted] = useState(42);
  const [clientsSatisfied, setClientsSatisfied] = useState(100);
  const [awardsWon, setAwardsWon] = useState(15);
  const [certificationsEarned, setCertificationsEarned] = useState(10);
  const [languagesSpoken, setLanguagesSpoken] = useState(5);
  const [countriesVisited, setCountriesVisited] = useState(3);
  const [booksRead, setBooksRead] = useState(127);
  const [podcastsListened, setPodcastsListened] = useState(89);
  const [coursesCompleted, setCoursesCompleted] = useState(34);
  const [mentorshipHours, setMentorshipHours] = useState(156);
  const [openSourceContributions, setOpenSourceContributions] = useState(234);
  const [stackOverflowReputation, setStackOverflowReputation] = useState(5678);
  const [githubContributions, setGithubContributions] = useState(1234);
  const [linkedinConnections, setLinkedinConnections] = useState(567);
  const [twitterFollowers, setTwitterFollowers] = useState(890);
  const [instagramFollowers, setInstagramFollowers] = useState(1234);
  const [youtubeSubscribers, setYoutubeSubscribers] = useState(456);
  const [blogViews, setBlogViews] = useState(12345);
  const [newsletterSubscribers, setNewsletterSubscribers] = useState(789);
  const [speakingEngagements, setSpeakingEngagements] = useState(12);
  const [workshopsConducted, setWorkshopsConducted] = useState(8);
  const [hackathonsWon, setHackathonsWon] = useState(5);
  const [patentsHeld, setPatentsHeld] = useState(2);
  const [researchPapers, setResearchPapers] = useState(3);
  const [startupsFounded, setStartupsFounded] = useState(1);
  const [teamSize, setTeamSize] = useState(15);
  const [budgetManaged, setBudgetManaged] = useState(500000);
  const [revenueGenerated, setRevenueGenerated] = useState(2000000);
  const [usersSatisfied, setUsersSatisfied] = useState(10000);
  const [appDownloads, setAppDownloads] = useState(50000);
  const [websiteVisitors, setWebsiteVisitors] = useState(100000);
  const [apiCalls, setApiCalls] = useState(1000000);
  const [databaseRecords, setDatabaseRecords] = useState(5000000);
  const [serverUptime, setServerUptime] = useState(99.9);
  const [loadTime, setLoadTime] = useState(0.8);
  const [performanceScore, setPerformanceScore] = useState(98);
  const [securityScore, setSecurityScore] = useState(100);
  const [accessibilityScore, setAccessibilityScore] = useState(95);
  const [seoScore, setSeoScore] = useState(92);
  const [carbonFootprint, setCarbonFootprint] = useState(0.5);
  const [energyEfficiency, setEnergyEfficiency] = useState(95);
  const [codeQuality, setCodeQuality] = useState(98);
  const [testCoverage, setTestCoverage] = useState(95);
  const [documentationScore, setDocumentationScore] = useState(90);
  const [maintainabilityIndex, setMaintainabilityIndex] = useState(85);
  const [technicalDebt, setTechnicalDebt] = useState(5);
  const [cyclomatic, setCyclomatic] = useState(3);
  const [duplication, setDuplication] = useState(2);
  const [complexity, setComplexity] = useState(4);
  const [reliability, setReliability] = useState(98);
  const [efficiency, setEfficiency] = useState(96);
  const [portability, setPortability] = useState(94);
  const [usability, setUsability] = useState(97);
  const [functionality, setFunctionality] = useState(99);
  const [compatibility, setCompatibility] = useState(93);
  const [scalability, setScalability] = useState(91);
  const [flexibility, setFlexibility] = useState(89);
  const [reusability, setReusability] = useState(87);
  const [testability, setTestability] = useState(92);
  const [installability, setInstallability] = useState(96);
  const [replaceability, setReplaceability] = useState(88);
  const [adaptability, setAdaptability] = useState(90);
  const [transferability, setTransferability] = useState(85);
  const [coexistence, setCoexistence] = useState(94);
  const [interoperability, setInteroperability] = useState(91);
  const [maturity, setMaturity] = useState(88);
  const [faultTolerance, setFaultTolerance] = useState(93);
  const [recoverability, setRecoverability] = useState(95);
  const [timeEfficiency, setTimeEfficiency] = useState(92);
  const [resourceUtilization, setResourceUtilization] = useState(89);
  const [capacity, setCapacity] = useState(96);
  const [confidentiality, setConfidentiality] = useState(98);
  const [integrity, setIntegrity] = useState(97);
  const [nonRepudiation, setNonRepudiation] = useState(94);
  const [accountability, setAccountability] = useState(91);
  const [authenticity, setAuthenticity] = useState(96);
  const [compliance, setCompliance] = useState(93);

  // Skills and Technologies - Top 6 Programming Languages
  const [topSkills, setTopSkills] = useState([
    { name: 'JavaScript', level: 98, icon: '🟨', color: '#F7DF1E', experience: '4+ years' },
    { name: 'Python', level: 89, icon: '🐍', color: '#3776AB', experience: '3+ years' },
    { name: 'React', level: 95, icon: '⚛️', color: '#61DAFB', experience: '3+ years' },
    { name: 'Node.js', level: 94, icon: '🟢', color: '#339933', experience: '3+ years' },
    { name: 'React Native', level: 93, icon: '📱', color: '#61DAFB', experience: '3+ years' },
    { name: 'MongoDB', level: 91, icon: '🍃', color: '#47A248', experience: '3+ years' }
  ]);
  // Testimonials
  const [testimonials, setTestimonials] = useState([
    {
      name: 'Sarah Johnson',
      role: 'CEO, TechStart Inc.',
      company: 'TechStart Inc.',
      image: 'https://via.placeholder.com/80x80/4CAF50/ffffff?text=SJ',
      rating: 5,
      text: 'Muluken delivered an exceptional mobile app that exceeded our expectations. His attention to detail and technical expertise are outstanding.',
      project: 'E-commerce Mobile App',
      date: '2024-01-15'
    },
    {
      name: 'Michael Chen',
      role: 'CTO, InnovateLab',
      company: 'InnovateLab',
      image: 'https://via.placeholder.com/80x80/2196F3/ffffff?text=MC',
      rating: 5,
      text: 'Working with Muluken was a game-changer for our startup. He built a scalable platform that handles thousands of users seamlessly.',
      project: 'SaaS Platform Development',
      date: '2023-11-20'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Product Manager, DigitalFlow',
      company: 'DigitalFlow',
      image: 'https://via.placeholder.com/80x80/FF9800/ffffff?text=ER',
      rating: 5,
      text: 'Muluken\'s full-stack development skills are impressive. He delivered our project on time and within budget with excellent quality.',
      project: 'Business Management System',
      date: '2023-09-10'
    },
    {
      name: 'David Kim',
      role: 'Founder, StartupHub',
      company: 'StartupHub',
      image: 'https://via.placeholder.com/80x80/9C27B0/ffffff?text=DK',
      rating: 5,
      text: 'The delivery app Muluken created for us has revolutionized our business. The real-time tracking and user experience are phenomenal.',
      project: 'Delivery Management App',
      date: '2023-07-25'
    },
    {
      name: 'Lisa Thompson',
      role: 'Marketing Director, GrowthCorp',
      company: 'GrowthCorp',
      image: 'https://via.placeholder.com/80x80/E91E63/ffffff?text=LT',
      rating: 5,
      text: 'Muluken built us a beautiful, responsive website that perfectly captures our brand. His design sense and technical skills are top-notch.',
      project: 'Corporate Website Redesign',
      date: '2023-05-12'
    }
  ]);

  // Achievements and Badges
  const [achievementsList, setAchievementsList] = useState([
    { id: 1, name: 'Full Stack Developer', description: 'Built complete web and mobile applications', icon: '💻', unlocked: true, date: '2024-01-01' },
    { id: 2, name: 'Mobile App Creator', description: 'Developed delivery and e-commerce mobile apps', icon: '📱', unlocked: true, date: '2024-02-15' },
    { id: 3, name: 'Hackathon Participant', description: 'Participated in Innovation Minister Hackathon', icon: '🏆', unlocked: true, date: '2024-03-20' },
    { id: 4, name: 'Network Specialist', description: 'Completed CCNA certification series', icon: '🌐', unlocked: true, date: '2024-04-10' },
    { id: 5, name: 'Java Enterprise Developer', description: 'Certified in Red Hat Java EE Development', icon: '☕', unlocked: true, date: '2024-05-05' },
    { id: 6, name: 'Linux Administrator', description: 'Mastered essential Linux system administration', icon: '🐧', unlocked: true, date: '2024-06-12' },
    { id: 7, name: 'AI/ML Practitioner', description: 'Completed Machine Learning with Python training', icon: '🤖', unlocked: true, date: '2024-07-08' },
    { id: 8, name: 'Digital Marketer', description: 'Learned digital marketing strategies and tools', icon: '📈', unlocked: true, date: '2024-08-15' },
    { id: 9, name: 'GitHub Contributor', description: 'Active open source contributor', icon: '🌟', unlocked: true, date: '2024-09-01' },
    { id: 10, name: 'Professional Recognition', description: 'Received advisor recommendation letter', icon: '📜', unlocked: true, date: '2024-10-01' }
  ]);

  // Certifications
  const [certifications, setCertifications] = useState([
    { name: 'Red Hat Application Development I (Java EE – AD183)', issuer: 'Red Hat', date: '2024', image: redHatCert, category: 'Development' },
    { name: 'Cisco Networking Associate (CCNA)', issuer: 'Cisco', date: '2024', image: ciscoCert, category: 'Networking' },
    { name: 'CCNA1: Introduction to Networks', issuer: 'Cisco', date: '2024', image: ciscoCert, category: 'Networking' },
    { name: 'CCNA2: Routing and Switching Essentials', issuer: 'Cisco', date: '2024', image: ciscoCert, category: 'Networking' },
    { name: 'CCNA3: Enterprise Networking, Security, and Automation', issuer: 'Cisco', date: '2024', image: ciscoCert, category: 'Networking' },
    { name: 'NDG Essential Linux', issuer: 'NDG (Network Development Group)', date: '2024', image: linuxCert, category: 'System Administration' },
    { name: 'Machine Learning with Python – Training', issuer: 'Training Institute', date: '2024', image: 'https://via.placeholder.com/100x100/3776AB/ffffff?text=ML', category: 'AI/ML' },
    { name: 'Digital Marketing', issuer: 'Orbit Innovation Hub', date: '2024', image: digitalMarketingCert, category: 'Marketing' },
    { name: 'Innovation Minister Hackathon – Participation', issuer: 'Ministry of Innovation', date: '2024', image: 'https://via.placeholder.com/100x100/FF6B35/ffffff?text=HACK', category: 'Competition' },
    { name: 'Recommendation Letter – Advisor', issuer: 'Professional Advisor', date: '2024', image: recommendationCert, category: 'Recognition' }
  ]);




  // Blog Posts
  const [blogPosts, setBlogPosts] = useState([
    {
      title: 'Building Scalable React Applications',
      excerpt: 'Learn how to structure and optimize React apps for maximum performance and maintainability.',
      date: '2024-01-15',
      readTime: '8 min read',
      tags: ['React', 'Performance', 'Architecture'],
      views: 1250,
      likes: 89
    },
    {
      title: 'The Future of Mobile Development',
      excerpt: 'Exploring emerging trends and technologies shaping the mobile development landscape.',
      date: '2024-01-08',
      readTime: '6 min read',
      tags: ['Mobile', 'Flutter', 'React Native'],
      views: 980,
      likes: 67
    },
    {
      title: 'Microservices Architecture Best Practices',
      excerpt: 'A comprehensive guide to designing and implementing microservices architecture.',
      date: '2024-01-01',
      readTime: '12 min read',
      tags: ['Architecture', 'Backend', 'DevOps'],
      views: 1450,
      likes: 112
    }
  ]);

  // Fetch GitHub repositories and user data
  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        setGithubLoading(true);
        
        // Fetch user data
        const userResponse = await fetch('https://api.github.com/users/muluken16');
        const userData = await userResponse.json();
        
        // Fetch repositories
        const reposResponse = await fetch('https://api.github.com/users/muluken16/repos?sort=updated&per_page=50');
        const reposData = await reposResponse.json();
        
        if (userResponse.ok && reposResponse.ok) {
          // Update GitHub stats
          setGithubStats({
            repos: userData.public_repos || 0,
            followers: userData.followers || 0,
            following: userData.following || 0,
            stars: reposData.reduce((total, repo) => total + (repo.stargazers_count || 0), 0)
          });
          
          // Process repositories
          const processedRepos = reposData
            .filter(repo => !repo.fork && repo.name !== 'muluken16') // Filter out forks and profile repo
            .map(repo => ({
              id: repo.id,
              title: repo.name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
              description: repo.description || 'No description available',
              image: getProjectEmoji(repo.name, repo.language),
              tech: [
                repo.language,
                ...(repo.topics || []).slice(0, 4)
              ].filter(Boolean),
              github: repo.html_url,
              demo: repo.homepage || `${repo.html_url}#readme`,
              status: repo.updated_at > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString() ? 'Active' : 'Stable',
              stars: repo.stargazers_count || 0,
              forks: repo.forks_count || 0,
              category: getCategoryFromLanguage(repo.language),
              language: repo.language,
              updated: repo.updated_at,
              created: repo.created_at
            }))
            .sort((a, b) => new Date(b.updated) - new Date(a.updated))
            .slice(0, 8); // Show top 8 repositories
          
          setGithubRepos(processedRepos);
        } else {
          throw new Error('Failed to fetch GitHub data');
        }
      } catch (error) {
        console.error('Error fetching GitHub data:', error);
        setGithubError(error.message);
        // Fallback to sample projects if GitHub API fails
        setGithubRepos(sampleProjects);
      } finally {
        setGithubLoading(false);
      }
    };

    fetchGitHubData();
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setTestimonialIndex(prev => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  // Update current time
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Track visit count and time spent
  useEffect(() => {
    const startTime = Date.now();
    const storedVisits = localStorage.getItem('portfolioVisits') || '0';
    setVisitCount(parseInt(storedVisits) + 1);
    localStorage.setItem('portfolioVisits', (parseInt(storedVisits) + 1).toString());

    const interval = setInterval(() => {
      setTimeSpent(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Mouse tracking for cursor effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Add cursor trail
      setCursorTrail(prev => [
        ...prev.slice(-10),
        { x: e.clientX, y: e.clientY, id: Date.now() }
      ]);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Konami code easter egg
  useEffect(() => {
    const konamiCode = [
      'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
      'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
      'KeyB', 'KeyA'
    ];

    const handleKeyDown = (e) => {
      setKonami(prev => {
        const newSequence = [...prev, e.code].slice(-10);
        if (newSequence.join(',') === konamiCode.join(',')) {
          setShowEasterEgg(true);
          setAchievementUnlocked('🎮 Konami Code Master!');
          setTimeout(() => setAchievementUnlocked(null), 3000);
        }
        return newSequence;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Device info detection
  useEffect(() => {
    const getDeviceInfo = () => {
      const info = {
        userAgent: navigator.userAgent,
        platform: navigator.platform,
        language: navigator.language,
        cookieEnabled: navigator.cookieEnabled,
        onLine: navigator.onLine,
        screenWidth: window.screen.width,
        screenHeight: window.screen.height,
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight,
        colorDepth: window.screen.colorDepth,
        pixelDepth: window.screen.pixelDepth,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
      };
      setDeviceInfo(info);
    };

    getDeviceInfo();
    window.addEventListener('resize', getDeviceInfo);
    return () => window.removeEventListener('resize', getDeviceInfo);
  }, []);

  // Battery API (if supported)
  useEffect(() => {
    if ('getBattery' in navigator) {
      navigator.getBattery().then(battery => {
        setBatteryLevel(Math.round(battery.level * 100));
        
        battery.addEventListener('levelchange', () => {
          setBatteryLevel(Math.round(battery.level * 100));
        });
      });
    }
  }, []);

  // Typing effect for hero section
  useEffect(() => {
    const texts = [
      'Full-Stack Developer',
      'Mobile App Specialist',
      'UI/UX Designer',
      'Problem Solver',
      'Innovation Leader',
      'Code Architect'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    const typeEffect = () => {
      const currentText = texts[textIndex];
      
      if (isDeleting) {
        setTypingText(currentText.substring(0, charIndex - 1));
        charIndex--;
      } else {
        setTypingText(currentText.substring(0, charIndex + 1));
        charIndex++;
      }
      
      if (!isDeleting && charIndex === currentText.length) {
        setTimeout(() => {
          isDeleting = true;
        }, 2000);
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
      }
      
      const speed = isDeleting ? 50 : 100;
      setTimeout(typeEffect, speed);
    };
    
    typeEffect();
  }, []);

  // Generate QR Code URL for download links
  const generateQRCodeUrl = (url) => {
    if (!url) return '';
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(url)}`;
  };

  // Helper function to get project emoji based on name and language
  const getProjectEmoji = (name, language) => {
    const nameEmojis = {
      'delivery': '🚚',
      'ecommerce': '🛒',
      'shop': '🛍️',
      'chat': '💬',
      'blog': '📝',
      'portfolio': '👨‍💻',
      'weather': '🌤️',
      'todo': '📋',
      'task': '✅',
      'game': '🎮',
      'calculator': '🧮',
      'music': '🎵',
      'video': '🎬',
      'photo': '📸',
      'social': '👥',
      'api': '🔌',
      'bot': '🤖',
      'ml': '🧠',
      'ai': '🤖',
      'data': '📊',
      'dashboard': '📈',
      'admin': '⚙️',
      'mobile': '📱',
      'web': '🌐',
      'react': '⚛️',
      'vue': '💚',
      'angular': '🅰️',
      'node': '🟢',
      'python': '🐍',
      'java': '☕',
      'php': '🐘',
      'laravel': '🎯',
      'django': '🎸',
      'flutter': '💙',
      'swift': '🍎',
      'kotlin': '🟠'
    };

    const languageEmojis = {
      'JavaScript': '🟨',
      'TypeScript': '🔷',
      'Python': '🐍',
      'Java': '☕',
      'PHP': '🐘',
      'C#': '🟦',
      'C++': '⚡',
      'Swift': '🍎',
      'Kotlin': '🟠',
      'Dart': '�',
      'Go': '🐹',
      'Rust': '🦀',
      'Ruby': '�',
      'HTML': '🌐',
      'CSS': '🎨',
      'Shell': '🐚',
      'Dockerfile': '🐳'
    };

    // Check name first
    for (const [key, emoji] of Object.entries(nameEmojis)) {
      if (name.toLowerCase().includes(key)) {
        return emoji;
      }
    }

    // Fallback to language
    return languageEmojis[language] || '📁';
  };

  // Helper function to categorize projects based on language
  const getCategoryFromLanguage = (language) => {
    const categories = {
      'JavaScript': 'Web App',
      'TypeScript': 'Web App',
      'Python': 'AI/ML',
      'Java': 'Backend',
      'PHP': 'Web App',
      'C#': 'Desktop App',
      'Swift': 'iOS App',
      'Kotlin': 'Android App',
      'Dart': 'Mobile App',
      'Go': 'Backend',
      'Rust': 'System',
      'Ruby': 'Web App',
      'HTML': 'Website',
      'CSS': 'Frontend',
      'Shell': 'DevOps',
      'Dockerfile': 'DevOps'
    };

    return categories[language] || 'Project';
  };

  // Sample projects fallback
  const sampleProjects = [
    {
      id: 1,
      title: "Aksum Delivery Platform",
      description: "Delivery platform with customer, vendor, and rider apps.",
      image: "🚚",
      tech: ["React Native", "Node.js", "MongoDB", "Socket.io", "GraphQL"],
      github: "https://github.com/muluken16/aksum-delivery",
      demo: "https://aksum-delivery.vercel.app",
      status: "Active",
      stars: 45,
      forks: 12,
      category: "Mobile App"
    },
    {
      id: 2,
      title: "Rider Delivery App",
      description: "Delivery rider app with GPS navigation and earnings tracking.",
      image: "🚴‍♂️",
      tech: ["React Native", "Google Maps API", "Firebase", "Redux"],
      github: "https://github.com/muluken16/rider-delivery-app",
      demo: "https://rider-app-demo.netlify.app",
      status: "Active",
      stars: 28,
      forks: 7,
      category: "Mobile App"
    },
    {
      id: 3,
      title: "E-Commerce Platform",
      description: "E-commerce website with shopping cart and payments.",
      image: "🛒",
      tech: ["React", "PHP", "MySQL", "Stripe", "Redis"],
      github: "https://github.com/muluken16/ecommerce-platform",
      demo: "https://ecommerce-demo.netlify.app",
      status: "Active",
      stars: 32,
      forks: 8,
      category: "Web App"
    }
  ];

  // Add CSS animations
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      
      @keyframes fadeInUp {
        0% { 
          opacity: 0; 
          transform: translateY(30px); 
        }
        100% { 
          opacity: 1; 
          transform: translateY(0); 
        }
      }
      
      @keyframes slideInRight {
        0% { 
          opacity: 0; 
          transform: translateX(100px); 
        }
        100% { 
          opacity: 1; 
          transform: translateX(0); 
        }
      }
      
      @keyframes slideInLeft {
        0% { 
          opacity: 0; 
          transform: translateX(-100px); 
        }
        100% { 
          opacity: 1; 
          transform: translateX(0); 
        }
      }
      
      @keyframes bounce {
        0%, 20%, 50%, 80%, 100% { 
          transform: translateY(0); 
        }
        40% { 
          transform: translateY(-10px); 
        }
        60% { 
          transform: translateY(-5px); 
        }
      }
      
      @keyframes pulse {
        0%, 100% { 
          transform: scale(1); 
        }
        50% { 
          transform: scale(1.05); 
        }
      }
      
      @keyframes glow {
        0%, 100% { 
          box-shadow: 0 0 5px rgba(230,57,70,0.5); 
        }
        50% { 
          box-shadow: 0 0 20px rgba(230,57,70,0.8); 
        }
      }
      
      @keyframes float {
        0%, 100% { 
          transform: translateY(0px); 
        }
        50% { 
          transform: translateY(-10px); 
        }
      }
      
      @keyframes shake {
        0%, 100% { 
          transform: translateX(0); 
        }
        25% { 
          transform: translateX(-5px); 
        }
        75% { 
          transform: translateX(5px); 
        }
      }
      
      @keyframes rainbow {
        0% { color: #ff0000; }
        16% { color: #ff8000; }
        33% { color: #ffff00; }
        50% { color: #00ff00; }
        66% { color: #0080ff; }
        83% { color: #8000ff; }
        100% { color: #ff0000; }
      }
      
      @keyframes typewriter {
        from { width: 0; }
        to { width: 100%; }
      }
      
      @keyframes blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
      }
      
      .loading-spinner {
        animation: spin 1s linear infinite;
      }
      
      .project-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 15px 40px rgba(0,0,0,0.12);
      }
      
      .app-card:hover {
        transform: translateY(-8px);
        box-shadow: 0 20px 50px rgba(0,0,0,0.15);
      }
      
      .social-link:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(230,57,70,0.3);
      }
      
      .gallery-image:hover {
        transform: scale(1.1);
      }
      
      .gallery-image:hover img {
        transform: scale(1.2);
      }
      
      .app-download-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(0,0,0,0.2);
      }
      
      .qr-code:hover {
        transform: scale(1.1);
      }
      
      .portfolio-download-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 15px 40px rgba(0,0,0,0.12);
      }
      
      .skill-category-card:hover {
        transform: translateY(-3px);
        box-shadow: 0 10px 30px rgba(0,0,0,0.12);
      }
      
      .achievement-item:hover {
        transform: translateX(5px);
        background-color: #fff;
        box-shadow: 0 5px 15px rgba(0,0,0,0.1);
      }
      
      .certification-item:hover {
        transform: translateX(5px);
        background-color: #fff;
        box-shadow: 0 5px 15px rgba(0,0,0,0.1);
      }
      
      .testimonial-card {
        animation: fadeInUp 0.8s ease-out;
      }
      
      .stat-card:hover {
        transform: translateY(-3px);
        box-shadow: 0 8px 25px rgba(0,0,0,0.1);
      }
      
      .blog-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 15px 40px rgba(0,0,0,0.12);
      }
      
      .game-card:hover {
        transform: translateY(-3px);
        background-color: #fff;
        box-shadow: 0 8px 25px rgba(0,0,0,0.1);
      }
      
      .music-track:hover {
        background-color: #3a3a3a !important;
      }
      
      .achievement-notification {
        animation: slideInRight 0.5s ease-out, bounce 0.5s ease-out 0.5s;
      }
      
      .fade-in-up {
        animation: fadeInUp 0.6s ease-out;
      }
      
      .slide-in-left {
        animation: slideInLeft 0.6s ease-out;
      }
      
      .slide-in-right {
        animation: slideInRight 0.6s ease-out;
      }
      
      .pulse {
        animation: pulse 2s infinite;
      }
      
      .glow {
        animation: glow 2s infinite;
      }
      
      .float {
        animation: float 3s ease-in-out infinite;
      }
      
      .rainbow-text {
        animation: rainbow 3s linear infinite;
      }
      
      .typewriter {
        overflow: hidden;
        border-right: 2px solid #E63946;
        white-space: nowrap;
        animation: typewriter 3s steps(40, end), blink 0.75s step-end infinite;
      }
      
      .cursor-trail {
        animation: fadeOut 1s ease-out forwards;
      }
      
      @keyframes fadeOut {
        to { opacity: 0; }
      }
      
      .floating-stats {
        animation: slideInLeft 0.5s ease-out;
      }
      
      .theme-toggle:hover, .sound-toggle:hover {
        transform: scale(1.1);
        box-shadow: 0 6px 20px rgba(0,0,0,0.15);
      }
      
      .interactive-stat button:hover {
        transform: scale(1.05);
        box-shadow: 0 5px 15px rgba(230,57,70,0.3);
      }
      
      .music-play-button:hover {
        transform: scale(1.1);
        box-shadow: 0 5px 15px rgba(230,57,70,0.4);
      }
      
      .leaderboard-item:hover {
        transform: translateX(5px);
        box-shadow: 0 5px 15px rgba(0,0,0,0.1);
      }
      
      .blog-read-more:hover {
        color: #c53030;
        transform: translateX(3px);
      }
      
      .testimonial-dot:hover {
        transform: scale(1.2);
      }
      
      .skill-progress {
        animation: skillFill 2s ease-out;
      }
      
      @keyframes skillFill {
        from { width: 0%; }
        to { width: var(--skill-width); }
      }
      
      .game-play-button:hover {
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(230,57,70,0.3);
      }
      
      .easter-egg-modal {
        animation: bounce 0.5s ease-out;
      }
      
      .easter-egg-close:hover {
        transform: scale(1.05);
        box-shadow: 0 5px 15px rgba(230,57,70,0.3);
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setIsMobile(width < 768);
      setIsSmallMobile(width < 480);
      setIsTablet(width >= 768 && width < 1024);
      setIsDesktop(width >= 1024);
      setOrientation(height > width ? 'portrait' : 'landscape');
      if (width >= 768) {
        setMenuOpen(false);
        setShowMobileMenu(false);
      }
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
      if (isMobile && menuOpen) {
        setMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isMobile, menuOpen]);

  // Enhanced scroll to section with mobile optimization
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = isMobile ? 60 : 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setMenuOpen(false);
    setShowMobileMenu(false);
  };

  // Mobile-optimized scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Mobile menu toggle with animation
  const toggleMobileMenu = () => {
    setMenuOpen(!menuOpen);
    setShowMobileMenu(!showMobileMenu);
    if (!menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  };

  // Image Popup Functions
  const openImagePopup = (image, title, issuer) => {
    setImagePopup({
      isOpen: true,
      image: image,
      title: title,
      issuer: issuer
    });
    document.body.style.overflow = 'hidden';
  };

  const closeImagePopup = () => {
    setImagePopup({
      isOpen: false,
      image: '',
      title: '',
      issuer: ''
    });
    document.body.style.overflow = 'unset';
  };

  const socialLinks = [
    { name: "GitHub", icon: Github, url: "https://github.com/muluken16", color: "#333" },
    { name: "LinkedIn", icon: Linkedin, url: "https://www.linkedin.com/in/mule16", color: "#0077B5" },
    { name: "Twitter", icon: Twitter, url: "https://x.com/mulukencs16", color: "#1DA1F2" }
  ];

  return (
    <div style={styles.container}>
      {/* Modern Responsive Navigation */}
      <nav style={styles.modernNav}>
        <div style={styles.modernNavContent}>
          {/* Logo with Photo */}
          <div style={styles.modernLogo}>
            <div style={styles.logoPhotoContainer}>
              <img 
                src={profileImage} 
                alt="Muluken Mesfin" 
                style={styles.logoPhoto}
              />
            </div>
            <div style={styles.logoTextContainer}>
              <span style={styles.logoName}>Muluken Mesfin</span>
              <span style={styles.logoTitle}>Full-Stack Developer</span>
            </div>
          </div>
          
          {/* Desktop Navigation Links */}
          {!isMobile && (
            <div style={styles.modernNavLinks}>
              <button onClick={() => scrollToSection('about')} style={styles.modernNavLink}>About</button>
              <button onClick={() => scrollToSection('apps')} style={styles.modernNavLink}>Apps</button>
              <button onClick={() => scrollToSection('projects')} style={styles.modernNavLink}>Projects</button>
              <button onClick={() => scrollToSection('skills')} style={styles.modernNavLink}>Skills</button>
              <button onClick={() => scrollToSection('achievements')} style={styles.modernNavLink}>Achievements</button>
              <button onClick={() => scrollToSection('contact')} style={styles.modernNavLink}>Contact</button>
            </div>
          )}
          
          {/* Action Buttons */}
          <div style={styles.navActions}>
            <a 
              href="https://github.com/muluken16" 
              target="_blank" 
              rel="noopener noreferrer" 
              style={styles.modernGithubBtn}
            >
              <Github size={18} />
              {!isMobile && <span>GitHub</span>}
            </a>
            
            {/* Mobile Menu Button */}
            {isMobile && (
              <button 
                onClick={toggleMobileMenu}
                style={styles.modernMobileMenuBtn}
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              >
                {menuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            )}
          </div>
        </div>
        
        {/* Modern Mobile Menu */}
        {isMobile && menuOpen && (
          <div style={styles.modernMobileMenu}>
            <div style={styles.modernMobileMenuContent}>
              {/* Mobile Menu Header with Photo */}
              <div style={styles.modernMobileMenuHeader}>
                <img 
                  src={profileImage} 
                  alt="Muluken Mesfin" 
                  style={styles.modernMobileMenuPhoto}
                />
                <div style={styles.modernMobileMenuInfo}>
                  <h3 style={styles.modernMobileMenuName}>Muluken Mesfin</h3>
                  <p style={styles.modernMobileMenuTitle}>Full-Stack Developer</p>
                </div>
              </div>
            </div>
            
            <div style={styles.mobileMenuContent}>
              <button onClick={() => scrollToSection('about')} style={styles.mobileNavLink}>
                <User size={20} />
                About
              </button>
              <button onClick={() => scrollToSection('apps')} style={styles.mobileNavLink}>
                <Smartphone size={20} />
                Apps
              </button>
              <button onClick={() => scrollToSection('projects')} style={styles.mobileNavLink}>
                <Briefcase size={20} />
                Projects
              </button>
              <button onClick={() => scrollToSection('skills')} style={styles.mobileNavLink}>
                <Code size={20} />
                Skills
              </button>
              <button onClick={() => scrollToSection('achievements')} style={styles.mobileNavLink}>
                <Trophy size={20} />
                Achievements
              </button>
              <button onClick={() => scrollToSection('testimonials')} style={styles.mobileNavLink}>
                <MessageCircle size={20} />
                Testimonials
              </button>
              <button onClick={() => scrollToSection('blog')} style={styles.mobileNavLink}>
                <FileText size={20} />
                Blog
              </button>
              <button onClick={() => scrollToSection('contact')} style={styles.mobileNavLink}>
                <Mail size={20} />
                Contact
              </button>
            </div>
            
            <div style={styles.mobileMenuFooter}>
              <div style={styles.mobileMenuSocial}>
                {socialLinks.map((social, index) => (
                  <a 
                    key={index}
                    href={social.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={styles.mobileMenuSocialLink}
                  >
                    <social.icon size={20} />
                  </a>
                ))}
              </div>
              <p style={styles.mobileMenuCopyright}>© 2024 Muluken Mesfin</p>
            </div>
          </div>
        )}
        
        {/* Mobile Menu Overlay */}
        {isMobile && menuOpen && (
          <div 
            style={styles.mobileMenuOverlay}
            onClick={toggleMobileMenu}
          />
        )}
      </nav>

      {/* Hero Section */}
      <section style={styles.hero}>
        <div style={styles.heroPhotoSection}>
          <div style={styles.heroPhotoContainer}>
            <img 
              src={profileImage} 
              alt="Muluken Mesfin - Full Stack Developer" 
              style={styles.heroPhoto}
            />
            {/* Additional profile images gallery */}
            <div style={styles.profileGallery}>
              <div style={styles.galleryImage} className="gallery-image">
                <img 
                  src={profileImage} 
                  alt="Profile 1" 
                  style={styles.galleryImg}
                />
              </div>
              <div style={styles.galleryImage} className="gallery-image">
                <img 
                  src="https://via.placeholder.com/100x100/E63946/ffffff?text=Work" 
                  alt="Work Setup" 
                  style={styles.galleryImg}
                />
              </div>
              <div style={styles.galleryImage} className="gallery-image">
                <img 
                  src="https://via.placeholder.com/100x100/2196F3/ffffff?text=Code" 
                  alt="Coding" 
                  style={styles.galleryImg}
                />
              </div>
            </div>
          </div>
        </div>

        <div style={styles.heroMainContent}>
          <div style={styles.heroTextSection}>
            {/* Status Badge */}
            <div style={styles.heroBadge}>
              <Zap size={16} />
              Available for Opportunities
            </div>
            
            {/* Main Title */}
            <h1 style={styles.heroTitle}>
              Hi, I'm <span style={styles.heroHighlight}>Muluken Mesfin</span>
            </h1>
            
            {/* Dynamic Subtitle */}
            <p style={styles.heroSubtitle}>
              <span className="typewriter">{typingText || 'Full-Stack Developer & Mobile App Specialist'}</span>
            </p>
            
            {/* Brief Description */}
            <div style={styles.heroDescription}>
              Full-stack developer specializing in React, React Native, and modern web technologies. Building scalable applications with clean code and user-focused design.
            </div>
            
            {/* Career Objective */}
            <div style={styles.heroAssumption}>
              <strong>Career Objective:</strong> Seeking opportunities to contribute to innovative software projects while growing as a full-stack developer.
            </div>

            {/* Core Technologies Preview */}
            <div style={styles.heroSkillsPreview}>
              <h4 style={styles.heroSkillsTitle}>Core Technologies</h4>
              <div style={styles.heroSkillsTags}>
                {topSkills.slice(0, 4).map((skill, index) => (
                  <div key={index} style={{...styles.heroSkillTag, backgroundColor: skill.color + '20', color: skill.color}}>
                    <span style={styles.heroSkillIcon}>{skill.icon}</span>
                    <span>{skill.name}</span>
                    <span style={styles.heroSkillLevel}>{skill.level}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Call-to-Action Buttons */}
            <div style={styles.heroActions}>
              <button onClick={() => scrollToSection('apps')} style={styles.primaryBtn}>
                <Smartphone size={20} />
                View My Apps
              </button>
              <button onClick={() => scrollToSection('projects')} style={styles.secondaryBtn}>
                <Eye size={20} />
                GitHub Projects
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" style={styles.aboutSection}>
        <div style={styles.aboutContainer}>
          <div style={styles.aboutContent}>
            {/* Left Column - Profile & Stats */}
            <div style={styles.aboutLeft}>
              <div style={styles.aboutProfileCard}>
                <div style={styles.aboutImageContainer}>
                  <img 
                    src={profileImage} 
                    alt="Muluken Mesfin" 
                    style={styles.aboutProfileImage}
                  />
                  <div style={styles.aboutImageOverlay}>
                    <div style={styles.aboutImageBadge}>
                      <CheckCircle size={20} color="#4CAF50" />
                      <span>Verified Developer</span>
                    </div>
                  </div>
                </div>
                
                <div style={styles.aboutProfileInfo}>
                  <h3 style={styles.aboutProfileName}>Muluken Mesfin</h3>
                  <p style={styles.aboutProfileTitle}>Full-Stack Developer</p>
                  <div style={styles.aboutProfileLocation}>
                    <MapPin size={16} color="#64748b" />
                    <span>Ethiopia (Remote Available)</span>
                  </div>
                </div>

                {/* Quick Stats */}
                <div style={styles.aboutQuickStats}>
                  <div style={styles.aboutQuickStat}>
                    <div style={styles.aboutStatNumber}>2023</div>
                    <div style={styles.aboutStatLabel}>Graduate</div>
                  </div>
                  <div style={styles.aboutQuickStat}>
                    <div style={styles.aboutStatNumber}>3.35</div>
                    <div style={styles.aboutStatLabel}>CGPA</div>
                  </div>
                  <div style={styles.aboutQuickStat}>
                    <div style={styles.aboutStatNumber}>10+</div>
                    <div style={styles.aboutStatLabel}>Projects</div>
                  </div>
                </div>
              </div>

              {/* Education Card */}
              <div style={styles.aboutEducationCard}>
                <div style={styles.aboutCardHeader}>
                  <GraduationCap size={24} color="#3b82f6" />
                  <h4>Education</h4>
                </div>
                <div style={styles.aboutEducationItem}>
                  <div style={styles.aboutEducationDegree}>
                    Bachelor of Science in Computer Science
                  </div>
                  <div style={styles.aboutEducationSchool}>
                    Wolkite University
                  </div>
                  <div style={styles.aboutEducationDetails}>
                    <span style={styles.aboutEducationYear}>2019 - 2023</span>
                    <span style={styles.aboutEducationGPA}>CGPA: 3.35</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - About Content */}
            <div style={styles.aboutRight}>
              <div style={styles.aboutHeader}>
                <h2 style={styles.aboutTitle}>About Me</h2>
                <p style={styles.aboutSubtitle}>
                  Passionate about creating innovative digital solutions that make a real impact
                </p>
              </div>

              <div style={styles.aboutDescription}>
                <p style={styles.aboutParagraph}>
                  I'm a recent Computer Science graduate from Wolkite University with a strong passion for 
                  building practical software solutions. My journey in technology has been driven by curiosity 
                  and a desire to create applications that solve real-world problems.
                </p>
                
                <p style={styles.aboutParagraph}>
                  With hands-on experience in developing web and cross-platform mobile applications, I specialize 
                  in React Native and Flutter for mobile development, while leveraging Python, JavaScript, PHP, 
                  and SQL for backend solutions. I'm comfortable working with various databases including MySQL 
                  and SQL Server.
                </p>

                <p style={styles.aboutParagraph}>
                  As a fast learner and problem solver, I enjoy collaborating with forward-thinking development 
                  teams and turning innovative ideas into reliable, scalable applications. I'm always eager to 
                  take on new challenges and contribute to projects that make a difference.
                </p>
              </div>

              {/* Professional Values */}
              <div style={styles.aboutValues}>
                <h4 style={styles.aboutValuesTitle}>Professional Values</h4>
                <div style={styles.aboutValuesList}>
                  <div style={styles.aboutValue}>
                    <Target size={16} color="#3b82f6" />
                    <span>Quality-focused development</span>
                  </div>
                  <div style={styles.aboutValue}>
                    <Users size={16} color="#10b981" />
                    <span>Collaborative teamwork</span>
                  </div>
                  <div style={styles.aboutValue}>
                    <Lightbulb size={16} color="#f59e0b" />
                    <span>Continuous learning</span>
                  </div>
                  <div style={styles.aboutValue}>
                    <Rocket size={16} color="#ef4444" />
                    <span>Innovation-driven solutions</span>
                  </div>
                </div>
              </div>

              {/* Key Highlights */}
              <div style={styles.aboutHighlights}>
                <h4 style={styles.aboutHighlightsTitle}>Key Highlights</h4>
                <div style={styles.aboutHighlightsList}>
                  <div style={styles.aboutHighlightItem}>
                    <Code size={20} color="#3b82f6" />
                    <div>
                      <strong>Full-Stack Development</strong>
                      <p>End-to-end application development with modern technologies</p>
                    </div>
                  </div>
                  <div style={styles.aboutHighlightItem}>
                    <Smartphone size={20} color="#10b981" />
                    <div>
                      <strong>Mobile App Specialist</strong>
                      <p>Cross-platform mobile apps with React Native & Flutter</p>
                    </div>
                  </div>
                  <div style={styles.aboutHighlightItem}>
                    <Database size={20} color="#f59e0b" />
                    <div>
                      <strong>Database Management</strong>
                      <p>Proficient in MySQL, SQL Server, and database optimization</p>
                    </div>
                  </div>
                  <div style={styles.aboutHighlightItem}>
                    <Users size={20} color="#ef4444" />
                    <div>
                      <strong>Team Collaboration</strong>
                      <p>Strong communication skills and collaborative mindset</p>
                    </div>
                  </div>
                </div>
              </div>


            </div>
          </div>
        </div>
      </section>

      {/* App Development Portfolio Section */}
      <section id="apps" style={styles.appPortfolio}>
        <div style={styles.appPortfolioContainer}>
          <h2 style={styles.sectionTitle}>
            <span role="img" aria-label="mobile phone">📱</span> App Development Portfolio
          </h2>
          <p style={styles.sectionSubtitle}>
            Professional mobile applications built with modern technologies
          </p>
          
          {/* App Cards */}
          <div style={styles.modernAppGrid}>
            {appProjects.map((app, index) => (
                <div key={app.id} className="modern-app-card" style={styles.modernAppCard}>
                  {/* App Header */}
                  <div style={styles.modernAppHeader}>
                    <div style={{...styles.modernAppIcon, background: `linear-gradient(135deg, ${app.color}, ${app.color}dd)`}}>
                      <span style={styles.modernAppEmoji}>{app.icon}</span>
                    </div>
                    <div style={styles.modernAppMeta}>
                      <h3 style={styles.modernAppTitle}>{app.title}</h3>
                      <div style={styles.modernAppBadge}>
                        <div style={{...styles.modernStatusDot, backgroundColor: app.color}}></div>
                        <span style={styles.modernStatusText}>{app.status}</span>
                      </div>
                    </div>
                  </div>

                  {/* App Description */}
                  <p style={styles.modernAppDescription}>{app.description}</p>

                  {/* Key Features Grid */}
                  <div style={styles.modernFeaturesGrid}>
                    {app.features.slice(0, 4).map((feature, i) => (
                      <div key={i} style={styles.modernFeatureItem}>
                        <div style={{...styles.modernFeatureIcon, backgroundColor: `${app.color}20`}}>
                          <CheckCircle size={16} color={app.color} />
                        </div>
                        <span style={styles.modernFeatureText}>{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech Stack Pills */}
                  <div style={styles.modernTechStack}>
                    {app.tech.slice(0, 4).map((tech, i) => (
                      <span key={i} style={styles.modernTechPill}>
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Screenshots Carousel */}
                  {app.screenshots && app.screenshots.length > 0 && (
                    <div style={styles.modernScreenshots}>
                      <div style={styles.modernScreenshotsContainer}>
                        {app.screenshots.map((screenshot, i) => (
                          <div 
                            key={i} 
                            className="modern-screenshot-wrapper"
                            style={styles.modernScreenshotWrapper}
                            onClick={() => setMobilePreview({
                              isOpen: true,
                              images: app.screenshots,
                              currentIndex: i,
                              appTitle: app.title,
                              appColor: app.color
                            })}
                          >
                            <img 
                              src={screenshot} 
                              alt={`${app.title} Screenshot ${i + 1}`}
                              className="modern-screenshot"
                              style={styles.modernScreenshot}
                            />
                            <div className="screenshot-overlay" style={styles.screenshotOverlay}>
                              <Eye size={16} color="#fff" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Download Actions */}
                  <div style={styles.modernDownloadSection}>
                    {app.downloadUrl ? (
                      <div style={styles.modernDownloadActions}>
                        <a 
                          href={app.downloadUrl} 
                          download={`${app.title.replace(' ', '_')}.apk`}
                          style={{...styles.modernPrimaryBtn, backgroundColor: app.color}}
                          className="modern-download-btn"
                        >
                          <Download size={18} />
                          <span>Download APK</span>
                        </a>
                        <button 
                          onClick={() => setMobilePreview({
                            isOpen: true,
                            images: app.screenshots,
                            currentIndex: 0,
                            appTitle: app.title,
                            appColor: app.color
                          })}
                          style={{...styles.modernSecondaryBtn, borderColor: app.color, color: app.color}}
                          className="modern-preview-btn"
                        >
                          <Eye size={18} />
                          <span>Preview App</span>
                        </button>
                        <div style={styles.downloadInfo}>
                          <div style={styles.downloadInfoItem}>
                            <Smartphone size={16} color="#666" />
                            <span>Android App</span>
                          </div>
                          <div style={styles.downloadInfoItem}>
                            <Shield size={16} color="#666" />
                            <span>Safe & Secure</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div style={styles.modernDownloadActions}>
                        <button 
                          onClick={() => setMobilePreview({
                            isOpen: true,
                            images: app.screenshots,
                            currentIndex: 0,
                            appTitle: app.title,
                            appColor: app.color
                          })}
                          style={{...styles.modernSecondaryBtn, borderColor: app.color, color: app.color}}
                          className="modern-preview-btn"
                        >
                          <Eye size={18} />
                          <span>Preview App</span>
                        </button>
                        <div style={styles.modernComingSoon}>
                          <Clock size={20} color="#999" />
                          <span>Download Coming Soon</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
        </div>
      </section>

      {/* Enhanced Projects Section */}
      <section id="projects" style={styles.projects}>
        <h2 style={styles.sectionTitle}>Featured Projects</h2>
        <p style={styles.sectionSubtitle}>
          {githubLoading ? 'Loading projects from GitHub...' : 
           githubError ? 'Some of my recent work with live demos and source code' :
           `${githubRepos.length} projects fetched from GitHub`}
        </p>
        
        {/* GitHub Stats */}
        <div style={styles.githubStatsContainer}>
          <div style={styles.githubStat}>
            <Github size={24} color="#E63946" />
            <div>
              <span style={styles.githubStatNumber}>{githubStats.repos}</span>
              <span style={styles.githubStatLabel}>Repositories</span>
            </div>
          </div>
          <div style={styles.githubStat}>
            <Star size={24} color="#FFD700" />
            <div>
              <span style={styles.githubStatNumber}>{githubStats.stars}</span>
              <span style={styles.githubStatLabel}>Stars</span>
            </div>
          </div>
          <div style={styles.githubStat}>
            <Users size={24} color="#4CAF50" />
            <div>
              <span style={styles.githubStatNumber}>{githubStats.followers}</span>
              <span style={styles.githubStatLabel}>Followers</span>
            </div>
          </div>
          <div style={styles.githubStat}>
            <GitBranch size={24} color="#2196F3" />
            <div>
              <span style={styles.githubStatNumber}>{githubStats.following}</span>
              <span style={styles.githubStatLabel}>Following</span>
            </div>
          </div>
        </div>
        
        {githubLoading ? (
          <div style={styles.loadingContainer}>
            <div style={styles.loadingSpinner} className="loading-spinner"></div>
            <p>Fetching repositories from GitHub...</p>
          </div>
        ) : (
          <div style={styles.projectsGrid}>
            {githubRepos.map((project, index) => (
              <div key={project.id} style={styles.projectCard} className="project-card">
                <div style={styles.projectHeader}>
                  <div style={styles.projectEmoji}>{project.image}</div>
                  <div style={styles.projectMeta}>
                    <span style={styles.projectCategory}>{project.category}</span>
                    <span style={{...styles.projectStatus, 
                      backgroundColor: project.status === 'Active' ? '#4CAF50' : '#2196F3'
                    }}>
                      {project.status}
                    </span>
                  </div>
                </div>
                
                <h3 style={styles.projectTitle}>{project.title}</h3>
                <p style={styles.projectDesc}>{project.description}</p>
                
                <div style={styles.projectTech}>
                  {project.tech.slice(0, 4).map((tech, i) => (
                    <span key={i} style={styles.techTag}>{tech}</span>
                  ))}
                </div>
                
                <div style={styles.projectStats}>
                  <div style={styles.projectStat}>
                    <Star size={16} color="#FFD700" />
                    <span>{project.stars}</span>
                  </div>
                  <div style={styles.projectStat}>
                    <GitBranch size={16} color="#666" />
                    <span>{project.forks}</span>
                  </div>
                  <div style={styles.projectStat}>
                    <Calendar size={16} color="#999" />
                    <span>{new Date(project.updated).toLocaleDateString()}</span>
                  </div>
                </div>
                
                <div style={styles.projectLinks}>
                  {project.demo && project.demo !== `${project.github}#readme` ? (
                    <a href={project.demo} target="_blank" rel="noopener noreferrer" style={styles.projectBtn}>
                      <ExternalLink size={16} />
                      Live Demo
                    </a>
                  ) : (
                    <a href={project.github} target="_blank" rel="noopener noreferrer" style={styles.projectBtn}>
                      <Eye size={16} />
                      View Project
                    </a>
                  )}
                  <a href={project.github} target="_blank" rel="noopener noreferrer" style={styles.projectBtnSecondary}>
                    <Github size={16} />
                    Source Code
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
        
        <div style={styles.githubCTA}>
          <h3>Want to see more?</h3>
          <p>Check out my GitHub profile for more projects and contributions</p>
          <a href="https://github.com/muluken16" target="_blank" rel="noopener noreferrer" style={styles.githubCtaBtn}>
            <Github size={20} />
            View All Projects on GitHub
            <ChevronRight size={20} />
          </a>
        </div>
      </section>

      {/* Skills & Technologies Section */}
      <section id="skills" style={styles.skillsSection}>
        <div style={styles.skillsContainer}>
          <h2 style={styles.sectionTitle}>
            <span role="img" aria-label="rocket">🚀</span> Skills & Technologies
          </h2>
          <p style={styles.sectionSubtitle}>
            Top programming languages and technologies I work with
          </p>
          
          {/* Compact Skills Grid */}
          <div style={styles.compactSkillsGrid}>
            {topSkills.map((skill, index) => (
              <div key={index} style={styles.compactSkillCard}>
                <div style={styles.compactSkillHeader}>
                  <span style={styles.compactSkillIcon}>{skill.icon}</span>
                  <h3 style={styles.compactSkillName}>{skill.name}</h3>
                </div>
                <div style={styles.compactSkillBar}>
                  <div 
                    style={{
                      ...styles.compactSkillProgress,
                      width: `${skill.level}%`,
                      backgroundColor: skill.color
                    }}
                  />
                </div>
                <div style={styles.compactSkillMeta}>
                  <span style={styles.compactSkillLevel}>{skill.level}%</span>
                  <span style={styles.compactSkillExperience}>{skill.experience}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements & Certifications Section */}
      <section id="achievements" style={styles.achievementsSection}>
        <div style={styles.achievementsContainer}>
          <h2 style={styles.sectionTitle}>
            <span role="img" aria-label="trophy">🏆</span> Achievements & Certifications
          </h2>
          <p style={styles.sectionSubtitle}>
            Recognition and continuous learning milestones
          </p>
          
          {/* Achievements Grid */}
          <div style={styles.achievementsGrid}>
            <div style={styles.achievementsColumn}>
              <h3 style={styles.achievementsColumnTitle}>
                <span role="img" aria-label="target">🎯</span> Achievements
              </h3>
              <div style={styles.achievementsList}>
                {achievementsList.map((achievement, index) => (
                  <div key={achievement.id} style={styles.achievementItem}>
                    <div style={styles.achievementIcon}>{achievement.icon}</div>
                    <div style={styles.achievementContent}>
                      <h4 style={styles.achievementName}>{achievement.name}</h4>
                      <p style={styles.achievementDescription}>{achievement.description}</p>
                      <span style={styles.achievementDate}>{achievement.date}</span>
                    </div>
                    <div style={styles.achievementBadge}>
                      <CheckCircle size={20} color="#4CAF50" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div style={styles.achievementsColumn}>
              <h3 style={styles.achievementsColumnTitle}>
                <span role="img" aria-label="scroll">📜</span> Certifications & Training
              </h3>
              <div style={styles.certificationsList}>
                {certifications.map((cert, index) => (
                  <div key={index} style={styles.certificationItem}>
                    <img 
                      src={cert.image} 
                      alt={cert.name} 
                      style={styles.certificationImage}
                      onClick={() => openImagePopup(cert.image, cert.name, cert.issuer)}
                      className="certification-image-clickable"
                    />
                    <div style={styles.certificationContent}>
                      <div style={styles.certificationCategory}>
                        {cert.category}
                      </div>
                      <h4 style={styles.certificationName}>{cert.name}</h4>
                      <p style={styles.certificationIssuer}>{cert.issuer}</p>
                      <span style={styles.certificationDate}>{cert.date}</span>
                    </div>
                    <div style={styles.certificationVerify}>
                      <Award size={20} color="#FFD700" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" style={styles.testimonialsSection}>
        <div style={styles.testimonialsContainer}>
          <h2 style={styles.sectionTitle}>💬 Client Testimonials</h2>
          <p style={styles.sectionSubtitle}>
            What clients say about working with me
          </p>
          
          <div style={styles.testimonialsCarousel}>
            <div style={styles.testimonialCard}>
              <div style={styles.testimonialHeader}>
                <img 
                  src={testimonials[testimonialIndex].image} 
                  alt={testimonials[testimonialIndex].name}
                  style={styles.testimonialAvatar}
                />
                <div style={styles.testimonialMeta}>
                  <h4 style={styles.testimonialName}>{testimonials[testimonialIndex].name}</h4>
                  <p style={styles.testimonialRole}>{testimonials[testimonialIndex].role}</p>
                  <p style={styles.testimonialCompany}>{testimonials[testimonialIndex].company}</p>
                </div>
                <div style={styles.testimonialRating}>
                  {[...Array(testimonials[testimonialIndex].rating)].map((_, i) => (
                    <Star key={i} size={16} color="#FFD700" fill="#FFD700" />
                  ))}
                </div>
              </div>
              
              <blockquote style={styles.testimonialText}>
                "{testimonials[testimonialIndex].text}"
              </blockquote>
              
              <div style={styles.testimonialFooter}>
                <span style={styles.testimonialProject}>Project: {testimonials[testimonialIndex].project}</span>
                <span style={styles.testimonialDate}>{testimonials[testimonialIndex].date}</span>
              </div>
            </div>
            
            <div style={styles.testimonialNavigation}>
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setTestimonialIndex(index)}
                  style={{
                    ...styles.testimonialDot,
                    backgroundColor: index === testimonialIndex ? '#E63946' : '#ddd'
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog & Articles Section */}
      <section id="blog" style={styles.blogSection}>
        <div style={styles.blogContainer}>
          <h2 style={styles.sectionTitle}>📝 Latest Blog Posts</h2>
          <p style={styles.sectionSubtitle}>
            Sharing knowledge and insights from my development journey
          </p>
          
          <div style={styles.blogGrid}>
            {blogPosts.map((post, index) => (
              <article key={index} style={styles.blogCard}>
                <div style={styles.blogCardHeader}>
                  <div style={styles.blogMeta}>
                    <span style={styles.blogDate}>{post.date}</span>
                    <span style={styles.blogReadTime}>{post.readTime}</span>
                  </div>
                  <div style={styles.blogStats}>
                    <span style={styles.blogViews}>
                      <Eye size={14} />
                      {post.views}
                    </span>
                    <span style={styles.blogLikes}>
                      <Heart size={14} />
                      {post.likes}
                    </span>
                  </div>
                </div>
                
                <h3 style={styles.blogTitle}>{post.title}</h3>
                <p style={styles.blogExcerpt}>{post.excerpt}</p>
                
                <div style={styles.blogTags}>
                  {post.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} style={styles.blogTag}>{tag}</span>
                  ))}
                </div>
                
                <div style={styles.blogFooter}>
                  <button style={styles.blogReadMore}>
                    Read More
                    <ChevronRight size={16} />
                  </button>
                </div>
              </article>
            ))}
          </div>
          
          <div style={styles.blogCTA}>
            <h3>Want to read more?</h3>
            <p>Check out my blog for more articles on development, technology, and innovation</p>
            <button style={styles.blogCtaButton}>
              <FileText size={20} />
              Visit My Blog
              <ExternalLink size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" style={styles.contact}>
        <h2 style={styles.sectionTitle}>Contact</h2>
        <p style={styles.sectionSubtitle}>Ready to bring your ideas to life? Let's connect!</p>
        
        <div style={styles.contactContent}>
          <div style={styles.contactInfo}>
            <h3>Get In Touch</h3>
            <p>I'm always interested in new opportunities and exciting projects. Whether you have a question or just want to say hi, feel free to reach out!</p>
            
            <div style={styles.contactMethods}>
              <a href="mailto:mulukenmesfin@gmail.com" style={styles.contactMethod}>
                <Mail size={24} color="#E63946" />
                <div>
                  <h4>Email</h4>
                  <p>mulukenmesfin@gmail.com</p>
                </div>
              </a>
              <a href="tel:+251900000000" style={styles.contactMethod}>
                <Phone size={24} color="#4CAF50" />
                <div>
                  <h4>Phone</h4>
                  <p>+251 9XX XXX XXX</p>
                </div>
              </a>
              <div style={styles.contactMethod}>
                <MapPin size={24} color="#2196F3" />
                <div>
                  <h4>Location</h4>
                  <p>Ethiopia (Remote Available)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        

      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerContent}>
          <div style={styles.footerMain}>
            <div style={styles.footerBrand}>
              <User size={32} color="#E63946" />
              <span style={styles.footerLogoText}>Muluken Mesfin</span>
            </div>
            <p style={styles.footerDesc}>
              Computer Science graduate passionate about building practical software solutions 
              and contributing to innovative development teams.
            </p>
            <div style={styles.footerSocial}>
              {socialLinks.map((social, index) => (
                <a 
                  key={index}
                  href={social.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={styles.footerSocialLink}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>
        
        <div style={styles.footerBottom}>
          <p>© 2024 Muluken Mesfin. All rights reserved.</p>
          <p>
            <Coffee size={16} style={{marginRight: '5px'}} />
            Made with passion in Ethiopia
          </p>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      {scrollY > 300 && (
        <button 
          onClick={scrollToTop}
          style={styles.scrollToTop}
          aria-label="Scroll to top"
        >
          <ChevronRight size={24} style={{transform: 'rotate(-90deg)'}} />
        </button>
      )}

      {/* Achievement Notification */}
      {achievementUnlocked && (
        <div style={styles.achievementNotification} className="achievement-notification">
          <div style={styles.achievementNotificationContent}>
            <Trophy size={24} color="#FFD700" />
            <div>
              <h4 style={styles.achievementNotificationTitle}>Achievement Unlocked!</h4>
              <p style={styles.achievementNotificationText}>{achievementUnlocked}</p>
            </div>
          </div>
        </div>
      )}

      {/* Easter Egg Modal */}
      {showEasterEgg && (
        <div style={styles.easterEggOverlay} onClick={() => setShowEasterEgg(false)}>
          <div style={styles.easterEggModal}>
            <h2 style={styles.easterEggTitle}>🎉 Congratulations!</h2>
            <p style={styles.easterEggText}>
              You found the secret Konami code! You're a true developer at heart! 🚀
            </p>
            <div style={styles.easterEggReward}>
              <Crown size={48} color="#FFD700" />
              <p>You've unlocked the "Code Master" badge!</p>
            </div>
            <button 
              onClick={() => setShowEasterEgg(false)}
              style={styles.easterEggClose}
            >
              Awesome! 🎮
            </button>
          </div>
        </div>
      )}

      {/* Cursor Trail */}
      {cursorTrail.map((point, index) => (
        <div
          key={point.id}
          style={{
            ...styles.cursorTrail,
            left: point.x,
            top: point.y,
            opacity: (index + 1) / cursorTrail.length * 0.5
          }}
        />
      ))}

      {/* Floating Stats Panel */}
      <div style={styles.floatingStats}>
        <div style={styles.floatingStatsContent}>
          <div style={styles.floatingStat}>
            <Clock size={16} />
            <span>{Math.floor(timeSpent / 60)}:{(timeSpent % 60).toString().padStart(2, '0')}</span>
          </div>
          <div style={styles.floatingStat}>
            <Eye size={16} />
            <span>{visitCount}</span>
          </div>
          <div style={styles.floatingStat}>
            <Battery size={16} />
            <span>{batteryLevel}%</span>
          </div>
          <div style={styles.floatingStat}>
            <Wifi size={16} />
            <span>{networkSpeed}</span>
          </div>
        </div>
      </div>

      {/* Theme Toggle */}
      <button 
        onClick={() => setCurrentTheme(currentTheme === 'light' ? 'dark' : 'light')}
        style={styles.themeToggle}
        aria-label="Toggle theme"
      >
        {currentTheme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
      </button>

      {/* Sound Toggle */}
      <button 
        onClick={() => setSoundEnabled(!soundEnabled)}
        style={styles.soundToggle}
        aria-label="Toggle sound"
      >
        {soundEnabled ? <Volume size={20} /> : <VolumeOff size={20} />}
      </button>

      {/* Image Popup Modal */}
      {imagePopup.isOpen && (
        <div style={styles.imagePopupOverlay} onClick={closeImagePopup}>
          <div style={styles.imagePopupModal} onClick={(e) => e.stopPropagation()}>
            <div style={styles.imagePopupHeader}>
              <div style={styles.imagePopupInfo}>
                <h3 style={styles.imagePopupTitle}>{imagePopup.title}</h3>
                <p style={styles.imagePopupIssuer}>{imagePopup.issuer}</p>
              </div>
              <button 
                onClick={closeImagePopup}
                style={styles.imagePopupClose}
                aria-label="Close image popup"
              >
                <X size={24} />
              </button>
            </div>
            <div style={styles.imagePopupContent}>
              <img 
                src={imagePopup.image} 
                alt={imagePopup.title}
                style={styles.imagePopupImage}
              />
            </div>
            <div style={styles.imagePopupFooter}>
              <button onClick={closeImagePopup} style={styles.imagePopupCloseBtn}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Frame Preview Modal */}
      {mobilePreview.isOpen && (
        <div 
          style={styles.mobilePreviewOverlay} 
          onClick={(e) => {
            // Only close if clicking directly on the overlay, not on child elements
            if (e.target === e.currentTarget) {
              setMobilePreview({...mobilePreview, isOpen: false});
            }
          }}
        >
          <div style={styles.mobilePreviewModal} onClick={(e) => e.stopPropagation()}>
            <div style={styles.mobileFrameHeader}>
              <h3 style={styles.mobilePreviewTitle}>{mobilePreview.appTitle}</h3>
              <div style={styles.imageCounter}>
                {mobilePreview.images.length > 1 && (
                  <span style={styles.counterText}>
                    {mobilePreview.currentIndex + 1} / {mobilePreview.images.length}
                  </span>
                )}
              </div>
              <button 
                onClick={() => setMobilePreview({...mobilePreview, isOpen: false})}
                style={styles.mobilePreviewClose}
                aria-label="Close preview"
              >
                <X size={24} />
              </button>
            </div>
            <div className="mobile-frame" style={styles.mobileFrame} onClick={(e) => e.stopPropagation()}>
              <div style={styles.mobileFrameTop}>
                <div style={styles.mobileNotch}></div>
              </div>
              <div className="mobile-screen" style={styles.mobileScreen} onClick={(e) => e.stopPropagation()}>
                <img 
                  src={mobilePreview.images[mobilePreview.currentIndex]} 
                  alt={`${mobilePreview.appTitle} Preview`}
                  className="mobile-screen-image"
                  style={styles.mobileScreenImage}
                />
                
                {/* Always show navigation if more than 1 image */}
                {mobilePreview.images.length > 1 && (
                  <>
                    <button 
                      onClick={() => setMobilePreview({
                        ...mobilePreview, 
                        currentIndex: mobilePreview.currentIndex > 0 ? mobilePreview.currentIndex - 1 : mobilePreview.images.length - 1
                      })}
                      className="nav-button"
                      style={{...styles.navButton, ...styles.navButtonLeft}}
                      aria-label="Previous image"
                    >
                      <ChevronLeft size={24} color="#fff" />
                    </button>
                    <button 
                      onClick={() => setMobilePreview({
                        ...mobilePreview, 
                        currentIndex: mobilePreview.currentIndex < mobilePreview.images.length - 1 ? mobilePreview.currentIndex + 1 : 0
                      })}
                      className="nav-button"
                      style={{...styles.navButton, ...styles.navButtonRight}}
                      aria-label="Next image"
                    >
                      <ChevronRight size={24} color="#fff" />
                    </button>
                  </>
                )}
              </div>
              <div style={styles.mobileFrameBottom}>
                <div style={{...styles.mobileHomeButton, backgroundColor: mobilePreview.appColor}}></div>
              </div>
            </div>
            {/* Always show dots if more than 1 image */}
            {mobilePreview.images.length > 1 && (
              <div style={styles.imageDots}>
                {mobilePreview.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setMobilePreview({...mobilePreview, currentIndex: index})}
                    className="image-dot"
                    style={{
                      ...styles.imageDot,
                      backgroundColor: index === mobilePreview.currentIndex ? mobilePreview.appColor : '#fff',
                      opacity: index === mobilePreview.currentIndex ? 1 : 0.6
                    }}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// Clean styles object
const styles = {
  container: {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: '#333',
    lineHeight: 1.6,
    overflowX: 'hidden',
    width: '100%',
    maxWidth: '100vw',
    minHeight: '100vh',
    position: 'relative',
  },
  nav: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    boxShadow: '0 2px 15px rgba(0,0,0,0.1)',
    zIndex: 1000,
    padding: '12px 0',
  },
  navContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  logoText: {
    fontSize: '22px',
    fontWeight: 'bold',
    color: '#E63946',
  },
  navLinks: {
    display: 'flex',
    gap: '25px',
  },
  navLink: {
    background: 'none',
    border: 'none',
    fontSize: '15px',
    color: '#333',
    cursor: 'pointer',
    transition: 'color 0.3s',
    fontWeight: '500',
  },
  githubBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: '#333',
    color: '#fff',
    padding: '8px 16px',
    borderRadius: '20px',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'all 0.3s',
  },
  mobileMenuBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#E63946',
    padding: '8px',
    transition: 'transform 0.3s',
  },
  
  // Modern Navigation Styles
  modernNav: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(20px)',
    borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
    zIndex: 1000,
    padding: '16px 0',
    transition: 'all 0.3s ease',
  },
  modernNavContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modernLogo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  logoPhotoContainer: {
    position: 'relative',
  },
  logoPhoto: {
    width: '44px',
    height: '44px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '2px solid #e2e8f0',
    transition: 'all 0.3s ease',
  },
  logoTextContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  logoName: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#1a1a1a',
    lineHeight: 1.2,
  },
  logoTitle: {
    fontSize: '12px',
    color: '#64748b',
    fontWeight: '500',
  },
  modernNavLinks: {
    display: 'flex',
    gap: '32px',
    alignItems: 'center',
  },
  modernNavLink: {
    background: 'none',
    border: 'none',
    fontSize: '15px',
    color: '#475569',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontWeight: '500',
    padding: '8px 0',
    position: 'relative',
  },
  navActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  modernGithubBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: '#1a1a1a',
    color: '#fff',
    padding: '10px 16px',
    borderRadius: '12px',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    border: 'none',
    cursor: 'pointer',
  },
  modernMobileMenuBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#475569',
    padding: '8px',
    borderRadius: '8px',
    transition: 'all 0.3s ease',
  },
  modernMobileMenu: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1001,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  modernMobileMenuContent: {
    width: '320px',
    height: '100%',
    backgroundColor: '#fff',
    padding: '24px',
    overflowY: 'auto',
    boxShadow: '-4px 0 24px rgba(0, 0, 0, 0.15)',
  },
  modernMobileMenuHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    marginBottom: '32px',
    paddingBottom: '24px',
    borderBottom: '1px solid #f1f5f9',
  },
  modernMobileMenuPhoto: {
    width: '56px',
    height: '56px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '2px solid #e2e8f0',
  },
  modernMobileMenuInfo: {
    flex: 1,
  },
  modernMobileMenuName: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#1a1a1a',
    margin: '0 0 4px 0',
  },
  modernMobileMenuTitle: {
    fontSize: '14px',
    color: '#64748b',
    margin: 0,
  },
  mobileMenu: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '280px',
    height: '100vh',
    backgroundColor: '#fff',
    boxShadow: '2px 0 20px rgba(0,0,0,0.15)',
    zIndex: 1001,
    display: 'flex',
    flexDirection: 'column',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    overflowY: 'auto',
  },
  mobileMenuOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 1000,
  },
  mobileMenuHeader: {
    padding: '20px',
    borderBottom: '1px solid #eee',
  },
  mobileMenuProfile: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  mobileMenuAvatar: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    objectFit: 'cover',
  },
  mobileMenuName: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#333',
    margin: 0,
  },
  mobileMenuTitle: {
    fontSize: '12px',
    color: '#666',
    margin: 0,
  },
  mobileMenuContent: {
    flex: 1,
    padding: '10px 0',
  },
  mobileNavLink: {
    background: 'none',
    border: 'none',
    fontSize: '16px',
    color: '#333',
    cursor: 'pointer',
    padding: '15px 20px',
    textAlign: 'left',
    fontWeight: '500',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    transition: 'all 0.3s',
  },
  mobileMenuFooter: {
    padding: '20px',
    borderTop: '1px solid #eee',
  },
  mobileMenuSocial: {
    display: 'flex',
    gap: '15px',
    justifyContent: 'center',
    marginBottom: '15px',
  },
  mobileMenuSocialLink: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40px',
    height: '40px',
    backgroundColor: '#f8f9fa',
    borderRadius: '50%',
    color: '#E63946',
    textDecoration: 'none',
    transition: 'all 0.3s',
  },
  mobileMenuCopyright: {
    fontSize: '12px',
    color: '#666',
    textAlign: 'center',
    margin: 0,
  },
  hero: {
    minHeight: '70vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #FFF5F5 0%, #FFF 50%, #F5F5F5 100%)',
    padding: '80px 20px 40px',
    gap: '30px',
    maxWidth: '1400px',
    margin: '0 auto',
    position: 'relative',
    overflow: 'hidden',
  },
  heroPhotoSection: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '20px',
  },
  heroPhotoContainer: {
    position: 'relative',
    width: '220px',
    height: '220px',
    borderRadius: '50%',
    overflow: 'hidden',
    boxShadow: '0 25px 80px rgba(230, 57, 70, 0.25)',
    border: '8px solid #fff',
    transition: 'all 0.3s ease',
  },
  heroPhoto: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.3s ease',
  },
  profileGallery: {
    display: 'flex',
    gap: '10px',
    marginTop: '20px',
    justifyContent: 'center',
  },
  galleryImage: {
    position: 'relative',
    overflow: 'hidden',
    borderRadius: '15px',
    boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
  },
  galleryImg: {
    width: '80px',
    height: '80px',
    objectFit: 'cover',
    transition: 'all 0.3s ease',
  },
  heroMainContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    maxWidth: '900px',
    width: '100%',
  },
  heroTextSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',
    width: '100%',
  },
  heroBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: '#FFF0F0',
    color: '#E63946',
    padding: '10px 20px',
    borderRadius: '25px',
    fontSize: '14px',
    fontWeight: '600',
    border: '2px solid #FFE5E5',
  },
  heroTitle: {
    fontSize: '56px',
    fontWeight: 'bold',
    lineHeight: 1.1,
    margin: '0',
    color: '#333',
  },
  heroHighlight: {
    color: '#E63946',
  },
  heroSubtitle: {
    fontSize: '24px',
    fontWeight: '600',
    color: '#555',
    margin: '0',
  },
  heroDescription: {
    fontSize: '18px',
    color: '#666',
    lineHeight: 1.6,
    maxWidth: '600px',
    margin: '0',
    textAlign: 'left',
  },
  heroAssumption: {
    fontSize: '16px',
    color: '#4a5568',
    lineHeight: 1.6,
    maxWidth: '600px',
    margin: '20px 0 0 0',
    padding: '16px',
    backgroundColor: '#f7fafc',
    borderRadius: '12px',
    borderLeft: '4px solid #3182ce',
    textAlign: 'left',
  },
  personalStats: {
    display: 'flex',
    gap: '40px',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '20px',
  },
  personalStat: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '5px',
  },
  statValue: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#E63946',
  },
  statLabel: {
    fontSize: '14px',
    color: '#777',
    fontWeight: '500',
  },
  heroActions: {
    display: 'flex',
    gap: '20px',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: '20px',
  },
  primaryBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    backgroundColor: '#E63946',
    color: '#fff',
    border: 'none',
    padding: '16px 32px',
    fontSize: '16px',
    fontWeight: '600',
    borderRadius: '50px',
    cursor: 'pointer',
    transition: 'all 0.3s',
    boxShadow: '0 4px 15px rgba(230,57,70,0.3)',
  },
  secondaryBtn: {
    backgroundColor: 'transparent',
    color: '#E63946',
    border: '2px solid #E63946',
    padding: '14px 32px',
    fontSize: '16px',
    fontWeight: '600',
    borderRadius: '50px',
    cursor: 'pointer',
    transition: 'all 0.3s',
  },
  heroSocial: {
    display: 'flex',
    gap: '15px',
    justifyContent: 'center',
    marginTop: '30px',
  },

  // Hero Skills Preview Styles
  heroSkillsPreview: {
    marginTop: '30px',
    marginBottom: '20px',
  },
  heroSkillsTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: '15px',
    textAlign: 'center',
  },
  heroSkillsTags: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '12px',
    justifyContent: 'center',
  },
  heroSkillTag: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 16px',
    borderRadius: '25px',
    fontSize: '14px',
    fontWeight: '500',
    border: '1px solid rgba(0,0,0,0.1)',
  },
  heroSkillIcon: {
    fontSize: '16px',
  },
  heroSkillLevel: {
    fontSize: '12px',
    fontWeight: '600',
    opacity: 0.8,
  },

  
  socialLink: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '45px',
    height: '45px',
    backgroundColor: '#fff',
    borderRadius: '50%',
    color: '#E63946',
    textDecoration: 'none',
    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
    transition: 'all 0.3s ease',
    border: '2px solid #FFE5E5',
  },
  projects: {
    padding: '80px 20px',
    backgroundColor: '#f5f5f5',
  },
  sectionTitle: {
    fontSize: '36px',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '10px',
  },
  sectionSubtitle: {
    fontSize: '17px',
    color: '#666',
    textAlign: 'center',
    marginBottom: '50px',
  },
  githubStatsContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '30px',
    flexWrap: 'wrap',
    marginBottom: '50px',
    padding: '30px',
    backgroundColor: '#f8f9fa',
    borderRadius: '15px',
    boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
  },
  githubStat: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '15px 20px',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
    minWidth: '120px',
  },
  githubStatNumber: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333',
    display: 'block',
  },
  githubStatLabel: {
    fontSize: '12px',
    color: '#666',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '60px 20px',
    color: '#666',
  },
  loadingSpinner: {
    width: '40px',
    height: '40px',
    border: '4px solid #f3f3f3',
    borderTop: '4px solid #E63946',
    borderRadius: '50%',
    marginBottom: '20px',
  },
  projectsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '25px',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  projectCard: {
    backgroundColor: '#fff',
    borderRadius: '20px',
    padding: '25px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
    transition: 'all 0.3s ease',
    border: '1px solid #f0f0f0',
    position: 'relative',
    overflow: 'hidden',
  },
  projectHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '15px',
  },
  projectEmoji: {
    fontSize: '32px',
    marginBottom: '10px',
  },
  projectMeta: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    alignItems: 'flex-end',
  },
  projectCategory: {
    fontSize: '12px',
    color: '#666',
    backgroundColor: '#f8f9fa',
    padding: '4px 8px',
    borderRadius: '12px',
    fontWeight: '500',
  },
  projectStatus: {
    fontSize: '11px',
    color: '#fff',
    padding: '4px 8px',
    borderRadius: '12px',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  projectTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '10px',
    color: '#333',
    lineHeight: 1.3,
  },
  projectDesc: {
    color: '#666',
    fontSize: '14px',
    lineHeight: 1.5,
    marginBottom: '15px',
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  },
  projectTech: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '6px',
    marginBottom: '15px',
  },
  techTag: {
    backgroundColor: '#E63946',
    color: '#fff',
    padding: '4px 8px',
    borderRadius: '12px',
    fontSize: '11px',
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  projectStats: {
    display: 'flex',
    gap: '15px',
    marginBottom: '20px',
    paddingTop: '15px',
    borderTop: '1px solid #f0f0f0',
  },
  projectStat: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    fontSize: '13px',
    color: '#666',
  },
  projectLinks: {
    display: 'flex',
    gap: '10px',
  },
  projectBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    backgroundColor: '#E63946',
    color: '#fff',
    padding: '10px 16px',
    borderRadius: '8px',
    textDecoration: 'none',
    fontSize: '13px',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    flex: 1,
    justifyContent: 'center',
  },
  projectBtnSecondary: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    backgroundColor: 'transparent',
    color: '#E63946',
    border: '2px solid #E63946',
    padding: '8px 16px',
    borderRadius: '8px',
    textDecoration: 'none',
    fontSize: '13px',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    flex: 1,
    justifyContent: 'center',
  },
  githubCTA: {
    textAlign: 'center',
    marginTop: '60px',
    padding: '40px',
    backgroundColor: '#f8f9fa',
    borderRadius: '20px',
  },
  githubCtaBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '10px',
    backgroundColor: '#333',
    color: '#fff',
    padding: '15px 30px',
    borderRadius: '50px',
    textDecoration: 'none',
    fontSize: '16px',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    marginTop: '20px',
  },
  contact: {
    padding: '80px 20px',
    backgroundColor: '#fff',
  },
  contactContent: {
    maxWidth: '1000px',
    margin: '0 auto',
    display: 'flex',
    gap: '60px',
    flexWrap: 'wrap',
  },
  contactInfo: {
    flex: 1,
    minWidth: '300px',
  },
  contactMethods: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    marginTop: '30px',
  },
  contactMethod: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '15px',
    textDecoration: 'none',
    color: '#333',
    transition: 'all 0.3s',
  },

  footer: {
    backgroundColor: '#1a1a1a',
    color: '#fff',
    padding: '60px 20px 30px',
  },
  footerContent: {
    maxWidth: '1100px',
    margin: '0 auto',
    marginBottom: '40px',
  },
  footerMain: {
    textAlign: 'center',
  },
  footerBrand: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    marginBottom: '15px',
  },
  footerLogoText: {
    fontSize: '20px',
    fontWeight: 'bold',
  },
  footerDesc: {
    fontSize: '14px',
    opacity: 0.8,
    lineHeight: 1.7,
    marginBottom: '20px',
    maxWidth: '600px',
    margin: '0 auto 20px',
  },
  footerSocial: {
    display: 'flex',
    gap: '15px',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  footerSocialLink: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40px',
    height: '40px',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: '50%',
    color: '#fff',
    textDecoration: 'none',
    transition: 'all 0.3s',
  },
  footerBottom: {
    borderTop: '1px solid rgba(255,255,255,0.1)',
    paddingTop: '25px',
    textAlign: 'center',
    fontSize: '13px',
    opacity: 0.7,
  },
  scrollToTop: {
    position: 'fixed',
    bottom: '30px',
    right: '30px',
    width: '50px',
    height: '50px',
    backgroundColor: '#E63946',
    color: '#fff',
    border: 'none',
    borderRadius: '50%',
    cursor: 'pointer',
    boxShadow: '0 4px 15px rgba(230,57,70,0.3)',
    transition: 'all 0.3s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999,
  },
  // App Portfolio Styles
  appPortfolio: {
    padding: '80px 20px',
    backgroundColor: '#fff',
  },
  appPortfolioContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
  },
  appStats: {
    display: 'flex',
    justifyContent: 'center',
    gap: '30px',
    flexWrap: 'wrap',
    marginBottom: '50px',
    padding: '30px',
    backgroundColor: '#f8f9fa',
    borderRadius: '15px',
    boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
  },
  appStat: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '15px 20px',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
    minWidth: '120px',
  },
  appStatNumber: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333',
    display: 'block',
  },
  appStatLabel: {
    fontSize: '12px',
    color: '#666',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  appGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: '30px',
    marginBottom: '60px',
  },
  appCard: {
    backgroundColor: '#fff',
    borderRadius: '20px',
    padding: '30px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
    transition: 'all 0.3s ease',
    border: '1px solid #f0f0f0',
  },
  appCardHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    marginBottom: '20px',
  },
  appIcon: {
    width: '60px',
    height: '60px',
    borderRadius: '15px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  appEmoji: {
    fontSize: '28px',
  },
  appCardMeta: {
    flex: 1,
  },
  appTitle: {
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '5px',
    color: '#333',
  },
  appStatus: {
    color: '#fff',
    padding: '4px 12px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  appDescription: {
    color: '#666',
    fontSize: '14px',
    lineHeight: 1.6,
    marginBottom: '20px',
  },
  appFeatures: {
    marginBottom: '20px',
  },
  appFeaturesTitle: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#333',
    marginBottom: '10px',
  },
  appFeaturesList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  appFeature: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '13px',
    color: '#666',
    marginBottom: '6px',
  },
  appTechStack: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '6px',
    marginBottom: '20px',
  },
  appTechTag: {
    color: '#fff',
    padding: '4px 8px',
    borderRadius: '12px',
    fontSize: '11px',
    fontWeight: '500',
  },
  appInfo: {
    display: 'flex',
    gap: '20px',
    marginBottom: '20px',
    paddingTop: '15px',
    borderTop: '1px solid #f0f0f0',
  },
  appInfoItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  appInfoLabel: {
    fontSize: '12px',
    color: '#999',
    fontWeight: '500',
  },
  appInfoValue: {
    fontSize: '14px',
    color: '#333',
    fontWeight: '600',
  },
  appDownloadSection: {
    padding: '20px',
    backgroundColor: '#f8f9fa',
    borderRadius: '15px',
    marginBottom: '20px',
  },
  qrCodeSection: {
    textAlign: 'center',
    marginBottom: '15px',
  },
  qrCode: {
    width: '100px',
    height: '100px',
    borderRadius: '10px',
    border: '2px solid #fff',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  },
  qrCodeText: {
    fontSize: '12px',
    color: '#666',
    marginTop: '8px',
    margin: '8px 0 0 0',
  },
  appDownloadButtons: {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap',
  },
  appDownloadBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    color: '#fff',
    padding: '12px 20px',
    borderRadius: '10px',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    flex: 1,
    justifyContent: 'center',
    minWidth: '140px',
  },
  appStoreBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '8px',
    borderRadius: '10px',
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
  },
  storeBadge: {
    height: '40px',
    width: 'auto',
  },
  comingSoon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: '20px',
    color: '#999',
    fontSize: '14px',
    fontWeight: '500',
  },
  appScreenshots: {
    marginTop: '20px',
  },
  screenshotsTitle: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#333',
    marginBottom: '10px',
  },
  screenshotsGrid: {
    display: 'flex',
    gap: '10px',
    overflowX: 'auto',
  },
  screenshot: {
    width: '80px',
    height: '140px',
    objectFit: 'cover',
    borderRadius: '8px',
    border: '1px solid #ddd',
  },
  
  // Modern App Styles
  modernAppGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '24px',
    marginBottom: '60px',
    maxWidth: '1200px',
    margin: '0 auto 60px auto',
  },
  modernAppCard: {
    backgroundColor: '#fff',
    borderRadius: '24px',
    padding: '32px',
    boxShadow: '0 8px 32px rgba(0,0,0,0.06)',
    border: '1px solid rgba(0,0,0,0.04)',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'relative',
    overflow: 'hidden',
  },
  modernAppHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    marginBottom: '24px',
  },
  modernAppIcon: {
    width: '64px',
    height: '64px',
    borderRadius: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
  },
  modernAppEmoji: {
    fontSize: '32px',
  },
  modernAppMeta: {
    flex: 1,
  },
  modernAppTitle: {
    fontSize: '22px',
    fontWeight: '700',
    marginBottom: '8px',
    color: '#1a1a1a',
    letterSpacing: '-0.02em',
  },
  modernAppBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  modernStatusDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
  },
  modernStatusText: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#666',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  modernAppDescription: {
    color: '#666',
    fontSize: '15px',
    lineHeight: 1.7,
    marginBottom: '28px',
  },
  modernFeaturesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
    gap: '16px',
    marginBottom: '28px',
  },
  modernFeatureItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px',
    backgroundColor: '#fafafa',
    borderRadius: '12px',
    transition: 'all 0.3s ease',
  },
  modernFeatureIcon: {
    width: '32px',
    height: '32px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  modernFeatureText: {
    fontSize: '13px',
    fontWeight: '500',
    color: '#333',
    lineHeight: 1.4,
  },
  modernTechStack: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    marginBottom: '28px',
  },
  modernTechPill: {
    backgroundColor: '#f1f5f9',
    color: '#475569',
    padding: '6px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '600',
    border: '1px solid #e2e8f0',
    transition: 'all 0.3s ease',
  },
  modernAppMetrics: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '16px',
    marginBottom: '28px',
    padding: '20px',
    backgroundColor: '#f8fafc',
    borderRadius: '16px',
  },
  modernMetric: {
    textAlign: 'center',
  },
  modernMetricLabel: {
    display: 'block',
    fontSize: '12px',
    color: '#64748b',
    fontWeight: '500',
    marginBottom: '4px',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  modernMetricValue: {
    display: 'block',
    fontSize: '16px',
    fontWeight: '700',
    color: '#1e293b',
  },
  modernRating: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '2px',
  },
  modernRatingText: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#1e293b',
    marginLeft: '6px',
  },
  modernScreenshots: {
    marginBottom: '28px',
  },
  modernScreenshotsContainer: {
    display: 'flex',
    gap: '12px',
    overflowX: 'auto',
    padding: '8px 0',
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
  },
  modernScreenshotWrapper: {
    flexShrink: 0,
    position: 'relative',
    cursor: 'pointer',
    borderRadius: '12px',
    overflow: 'hidden',
    transition: 'all 0.3s ease',
  },
  modernScreenshot: {
    width: '90px',
    height: '160px',
    objectFit: 'cover',
    borderRadius: '16px',
    border: '2px solid #f1f5f9',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
  },
  screenshotOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0,
    transition: 'opacity 0.3s ease',
    borderRadius: '16px',
  },
  
  // Mobile Preview Modal Styles
  mobilePreviewOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10000,
    padding: '20px',
  },
  mobilePreviewModal: {
    backgroundColor: 'transparent',
    borderRadius: '0',
    padding: '0',
    maxWidth: 'none',
    width: 'auto',
    maxHeight: 'none',
    overflow: 'visible',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  mobileFrameHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    width: '100%',
    maxWidth: '320px',
  },
  imageCounter: {
    fontSize: '14px',
    color: '#fff',
    fontWeight: '500',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: '6px 12px',
    borderRadius: '20px',
    backdropFilter: 'blur(10px)',
  },
  counterText: {
    color: '#fff',
  },
  mobilePreviewTitle: {
    fontSize: '18px',
    fontWeight: '600',
    margin: 0,
    color: '#fff',
  },
  mobilePreviewClose: {
    background: 'rgba(255, 255, 255, 0.2)',
    border: 'none',
    cursor: 'pointer',
    padding: '8px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s ease',
    backdropFilter: 'blur(10px)',
    color: '#fff',
  },
  mobileFrame: {
    width: '320px',
    height: '640px',
    backgroundColor: '#1a1a1a',
    borderRadius: '40px',
    padding: '8px',
    position: 'relative',
    boxShadow: '0 30px 60px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1)',
    background: 'linear-gradient(145deg, #2a2a2a, #1a1a1a)',
  },
  mobileFrameTop: {
    height: '30px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  mobileNotch: {
    width: '140px',
    height: '24px',
    backgroundColor: '#000',
    borderRadius: '12px',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mobileScreen: {
    width: '100%',
    height: '570px',
    backgroundColor: '#000',
    borderRadius: '32px',
    overflow: 'hidden',
    position: 'relative',
    border: '2px solid #333',
  },
  mobileScreenImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '30px',
  },
  mobileFrameBottom: {
    height: '30px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mobileHomeButton: {
    width: '40px',
    height: '4px',
    borderRadius: '2px',
    backgroundColor: '#666',
  },
  
  // Navigation Controls
  navButton: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    backgroundColor: '#4CAF50',
    border: '2px solid #fff',
    borderRadius: '50%',
    width: '50px',
    height: '50px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    zIndex: 20,
    boxShadow: '0 4px 15px rgba(76, 175, 80, 0.4)',
  },
  navButtonLeft: {
    left: '10px',
  },
  navButtonRight: {
    right: '10px',
  },
  
  // Image Dots
  imageDots: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
    marginTop: '20px',
  },
  imageDot: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    opacity: 0.6,
  },
  modernDownloadSection: {
    borderTop: '1px solid #f1f5f9',
    paddingTop: '24px',
  },
  modernDownloadActions: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  downloadInfo: {
    display: 'flex',
    gap: '16px',
    justifyContent: 'center',
  },
  downloadInfoItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '14px',
    color: '#666',
  },
  modernPrimaryBtn: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    color: '#fff',
    padding: '14px 24px',
    borderRadius: '16px',
    textDecoration: 'none',
    fontSize: '15px',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    border: 'none',
    cursor: 'pointer',
  },
  modernSecondaryBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    backgroundColor: '#f8fafc',
    color: '#475569',
    padding: '14px 20px',
    borderRadius: '16px',
    fontSize: '15px',
    fontWeight: '600',
    border: '1px solid #e2e8f0',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  modernComingSoon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    padding: '16px',
    color: '#94a3b8',
    fontSize: '15px',
    fontWeight: '500',
    backgroundColor: '#f8fafc',
    borderRadius: '16px',
    border: '1px solid #e2e8f0',
  },
  // Skills Section Styles
  skillsSection: {
    padding: '80px 20px',
    backgroundColor: '#f8f9fa',
  },
  skillsContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
  },
  skillCategoriesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
    gap: '30px',
  },
  skillCategoryCard: {
    backgroundColor: '#fff',
    borderRadius: '15px',
    padding: '30px',
    boxShadow: '0 5px 20px rgba(0,0,0,0.08)',
  },
  skillCategoryHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    marginBottom: '25px',
  },
  skillCategoryIcon: {
    fontSize: '32px',
  },
  skillCategoryTitle: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#333',
    margin: 0,
  },
  skillsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  skillItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  skillInfo: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  skillName: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#333',
  },
  skillLevel: {
    fontSize: '12px',
    fontWeight: '600',
    color: '#666',
  },
  skillBar: {
    width: '100%',
    height: '8px',
    backgroundColor: '#e0e0e0',
    borderRadius: '4px',
    overflow: 'hidden',
  },
  skillProgress: {
    height: '100%',
    borderRadius: '4px',
    transition: 'width 1s ease-in-out',
  },
  skillMeta: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '11px',
    color: '#999',
  },
  skillExperience: {
    fontWeight: '500',
  },
  skillProjects: {
    fontWeight: '500',
  },
  
  // Compact Skills Styles
  compactSkillsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
    gap: '20px',
    maxWidth: '800px',
    margin: '0 auto',
  },
  compactSkillCard: {
    backgroundColor: '#fff',
    borderRadius: '16px',
    padding: '24px',
    boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
    border: '1px solid rgba(0,0,0,0.04)',
    transition: 'all 0.3s ease',
    textAlign: 'center',
  },
  compactSkillHeader: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '16px',
  },
  compactSkillIcon: {
    fontSize: '32px',
  },
  compactSkillName: {
    fontSize: '16px',
    fontWeight: '700',
    color: '#1a1a1a',
    margin: 0,
  },
  compactSkillBar: {
    width: '100%',
    height: '6px',
    backgroundColor: '#f1f5f9',
    borderRadius: '3px',
    overflow: 'hidden',
    marginBottom: '12px',
  },
  compactSkillProgress: {
    height: '100%',
    borderRadius: '3px',
    transition: 'width 1.5s ease-in-out',
  },
  compactSkillMeta: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  compactSkillLevel: {
    fontSize: '14px',
    fontWeight: '700',
    color: '#1e293b',
  },
  compactSkillExperience: {
    fontSize: '12px',
    color: '#64748b',
    fontWeight: '500',
  },
  // Achievements Section Styles
  achievementsSection: {
    padding: '80px 20px',
    backgroundColor: '#fff',
  },
  achievementsContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
  },
  achievementsGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '40px',
  },
  achievementsColumn: {
    display: 'flex',
    flexDirection: 'column',
  },
  achievementsColumnTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '30px',
    textAlign: 'center',
  },
  achievementsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  achievementItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    padding: '20px',
    backgroundColor: '#f8f9fa',
    borderRadius: '15px',
    transition: 'all 0.3s ease',
  },
  achievementIcon: {
    fontSize: '32px',
    minWidth: '50px',
    textAlign: 'center',
  },
  achievementContent: {
    flex: 1,
  },
  achievementName: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#333',
    margin: '0 0 5px 0',
  },
  achievementDescription: {
    fontSize: '14px',
    color: '#666',
    margin: '0 0 5px 0',
  },
  achievementDate: {
    fontSize: '12px',
    color: '#999',
  },
  achievementBadge: {
    minWidth: '30px',
  },
  certificationsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  certificationItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    padding: '20px',
    backgroundColor: '#f8f9fa',
    borderRadius: '15px',
    transition: 'all 0.3s ease',
  },
  certificationImage: {
    width: '60px',
    height: '60px',
    borderRadius: '8px',
    objectFit: 'cover',
    border: '1px solid #e2e8f0',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  certificationContent: {
    flex: 1,
  },
  certificationCategory: {
    fontSize: '11px',
    fontWeight: '600',
    color: '#2563eb',
    backgroundColor: '#eff6ff',
    padding: '2px 8px',
    borderRadius: '12px',
    display: 'inline-block',
    marginBottom: '6px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  certificationName: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#333',
    margin: '0 0 5px 0',
    lineHeight: 1.3,
  },
  certificationIssuer: {
    fontSize: '14px',
    color: '#666',
    margin: '0 0 5px 0',
  },
  certificationDate: {
    fontSize: '12px',
    color: '#999',
  },
  certificationVerify: {
    minWidth: '30px',
  },
  // Testimonials Section Styles
  testimonialsSection: {
    padding: '80px 20px',
    backgroundColor: '#f8f9fa',
  },
  testimonialsContainer: {
    maxWidth: '800px',
    margin: '0 auto',
    textAlign: 'center',
  },
  testimonialsCarousel: {
    position: 'relative',
  },
  testimonialCard: {
    backgroundColor: '#fff',
    borderRadius: '20px',
    padding: '40px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
    margin: '0 auto 30px',
  },
  testimonialHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    marginBottom: '25px',
  },
  testimonialAvatar: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    objectFit: 'cover',
  },
  testimonialMeta: {
    flex: 1,
    textAlign: 'left',
  },
  testimonialName: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#333',
    margin: '0 0 5px 0',
  },
  testimonialRole: {
    fontSize: '14px',
    color: '#666',
    margin: '0 0 3px 0',
  },
  testimonialCompany: {
    fontSize: '14px',
    color: '#999',
    margin: 0,
  },
  testimonialRating: {
    display: 'flex',
    gap: '2px',
  },
  testimonialText: {
    fontSize: '18px',
    lineHeight: 1.6,
    color: '#333',
    fontStyle: 'italic',
    margin: '0 0 25px 0',
    textAlign: 'left',
  },
  testimonialFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '20px',
    borderTop: '1px solid #eee',
  },
  testimonialProject: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#E63946',
  },
  testimonialDate: {
    fontSize: '12px',
    color: '#999',
  },
  testimonialNavigation: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
  },
  testimonialDot: {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  // Stats Section Styles
  statsSection: {
    padding: '80px 20px',
    backgroundColor: '#fff',
  },
  statsContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '25px',
    marginBottom: '60px',
  },
  statCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    padding: '25px',
    backgroundColor: '#f8f9fa',
    borderRadius: '15px',
    transition: 'all 0.3s ease',
  },
  statIcon: {
    fontSize: '32px',
    minWidth: '50px',
    textAlign: 'center',
  },
  statEmoji: {
    fontSize: '32px',
  },
  statContent: {
    flex: 1,
  },
  statValue: {
    fontSize: '24px',
    fontWeight: 'bold',
    display: 'block',
    lineHeight: 1,
  },
  statLabel: {
    fontSize: '14px',
    color: '#666',
    marginTop: '5px',
  },
  interactiveStats: {
    textAlign: 'center',
    padding: '40px',
    backgroundColor: '#f8f9fa',
    borderRadius: '20px',
  },
  interactiveStatsTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '30px',
  },
  interactiveStatsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '30px',
  },
  interactiveStat: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '15px',
  },
  statButton: {
    padding: '12px 24px',
    backgroundColor: '#E63946',
    color: '#fff',
    border: 'none',
    borderRadius: '25px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  statCounter: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#333',
  },
  // Blog Section Styles
  blogSection: {
    padding: '80px 20px',
    backgroundColor: '#f8f9fa',
  },
  blogContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
  },
  blogGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: '30px',
    marginBottom: '60px',
  },
  blogCard: {
    backgroundColor: '#fff',
    borderRadius: '15px',
    padding: '30px',
    boxShadow: '0 5px 20px rgba(0,0,0,0.08)',
    transition: 'all 0.3s ease',
  },
  blogCardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  blogMeta: {
    display: 'flex',
    gap: '15px',
  },
  blogDate: {
    fontSize: '12px',
    color: '#999',
  },
  blogReadTime: {
    fontSize: '12px',
    color: '#666',
    fontWeight: '500',
  },
  blogStats: {
    display: 'flex',
    gap: '15px',
  },
  blogViews: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    fontSize: '12px',
    color: '#666',
  },
  blogLikes: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    fontSize: '12px',
    color: '#E91E63',
  },
  blogTitle: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '15px',
    lineHeight: 1.3,
  },
  blogExcerpt: {
    fontSize: '14px',
    color: '#666',
    lineHeight: 1.6,
    marginBottom: '20px',
  },
  blogTags: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    marginBottom: '20px',
  },
  blogTag: {
    padding: '4px 12px',
    backgroundColor: '#E63946',
    color: '#fff',
    borderRadius: '12px',
    fontSize: '11px',
    fontWeight: '500',
  },
  blogFooter: {
    paddingTop: '20px',
    borderTop: '1px solid #eee',
  },
  blogReadMore: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: 'transparent',
    color: '#E63946',
    border: 'none',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  blogCTA: {
    textAlign: 'center',
    padding: '40px',
    backgroundColor: '#fff',
    borderRadius: '20px',
  },
  blogCtaButton: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '10px',
    backgroundColor: '#E63946',
    color: '#fff',
    border: 'none',
    padding: '15px 30px',
    borderRadius: '25px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    marginTop: '20px',
  },
  // Games Section Styles
  gamesSection: {
    padding: '80px 20px',
    backgroundColor: '#fff',
  },
  gamesContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
  },
  gamesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '25px',
    marginBottom: '60px',
  },
  gameCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: '15px',
    padding: '30px',
    textAlign: 'center',
    transition: 'all 0.3s ease',
  },
  gameIcon: {
    fontSize: '48px',
    marginBottom: '15px',
  },
  gameName: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '15px',
  },
  gameStats: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '20px',
    fontSize: '14px',
    color: '#666',
  },
  gameScore: {
    fontWeight: '600',
  },
  gameHighScore: {
    fontWeight: '600',
    color: '#E63946',
  },
  gamePlayButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    width: '100%',
    padding: '12px',
    backgroundColor: '#E63946',
    color: '#fff',
    border: 'none',
    borderRadius: '10px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  leaderboard: {
    backgroundColor: '#f8f9fa',
    borderRadius: '20px',
    padding: '40px',
    textAlign: 'center',
  },
  leaderboardTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '30px',
  },
  leaderboardList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    maxWidth: '400px',
    margin: '0 auto',
  },
  leaderboardItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '15px 20px',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
  },
  // Music Section Styles
  musicSection: {
    padding: '80px 20px',
    backgroundColor: '#1a1a1a',
    color: '#fff',
  },
  musicContainer: {
    maxWidth: '800px',
    margin: '0 auto',
  },
  musicPlayer: {
    backgroundColor: '#2a2a2a',
    borderRadius: '20px',
    padding: '30px',
    marginBottom: '40px',
  },
  musicPlayerHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    marginBottom: '20px',
  },
  musicAlbumArt: {
    width: '80px',
    height: '80px',
    backgroundColor: '#3a3a3a',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  musicCurrentTrack: {
    flex: 1,
  },
  musicTrackTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#fff',
    margin: '0 0 5px 0',
  },
  musicTrackArtist: {
    fontSize: '14px',
    color: '#ccc',
    margin: 0,
  },
  musicControls: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
  },
  musicControlButton: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#ccc',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  musicPlayButton: {
    backgroundColor: '#E63946',
    border: 'none',
    color: '#fff',
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  musicProgress: {
    marginBottom: '20px',
  },
  musicProgressBar: {
    width: '100%',
    height: '6px',
    backgroundColor: '#3a3a3a',
    borderRadius: '3px',
    marginBottom: '10px',
  },
  musicProgressFill: {
    width: '35%',
    height: '100%',
    backgroundColor: '#E63946',
    borderRadius: '3px',
  },
  musicTime: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '12px',
    color: '#ccc',
  },
  musicVolume: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  musicVolumeSlider: {
    flex: 1,
    height: '4px',
    backgroundColor: '#3a3a3a',
    borderRadius: '2px',
    outline: 'none',
    cursor: 'pointer',
  },
  musicPlaylist: {
    backgroundColor: '#2a2a2a',
    borderRadius: '20px',
    padding: '30px',
  },
  musicPlaylistTitle: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: '20px',
  },
  musicTrack: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    padding: '15px',
    borderRadius: '10px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  musicTrackNumber: {
    width: '30px',
    fontSize: '14px',
    color: '#ccc',
    textAlign: 'center',
  },
  musicTrackInfo: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '3px',
  },
  musicTrackName: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#fff',
  },
  musicTrackArtistName: {
    fontSize: '12px',
    color: '#ccc',
  },
  musicTrackGenre: {
    fontSize: '12px',
    color: '#999',
    minWidth: '80px',
  },
  musicTrackDuration: {
    fontSize: '12px',
    color: '#ccc',
    minWidth: '50px',
    textAlign: 'right',
  },
  // Floating Elements Styles
  achievementNotification: {
    position: 'fixed',
    top: '100px',
    right: '20px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    padding: '20px',
    borderRadius: '15px',
    boxShadow: '0 10px 30px rgba(76, 175, 80, 0.3)',
    zIndex: 1001,
    animation: 'slideInRight 0.5s ease-out',
    maxWidth: '300px',
  },
  achievementNotificationContent: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
  },
  achievementNotificationTitle: {
    fontSize: '16px',
    fontWeight: 'bold',
    margin: '0 0 5px 0',
  },
  achievementNotificationText: {
    fontSize: '14px',
    margin: 0,
    opacity: 0.9,
  },
  easterEggOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0,0,0,0.8)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1002,
  },
  easterEggModal: {
    backgroundColor: '#fff',
    borderRadius: '20px',
    padding: '40px',
    textAlign: 'center',
    maxWidth: '400px',
    margin: '20px',
    boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
  },
  easterEggTitle: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '20px',
  },
  easterEggText: {
    fontSize: '16px',
    color: '#666',
    lineHeight: 1.6,
    marginBottom: '30px',
  },
  easterEggReward: {
    padding: '20px',
    backgroundColor: '#f8f9fa',
    borderRadius: '15px',
    marginBottom: '30px',
  },
  easterEggClose: {
    backgroundColor: '#E63946',
    color: '#fff',
    border: 'none',
    padding: '15px 30px',
    borderRadius: '25px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  cursorTrail: {
    position: 'fixed',
    width: '6px',
    height: '6px',
    backgroundColor: '#E63946',
    borderRadius: '50%',
    pointerEvents: 'none',
    zIndex: 999,
    transform: 'translate(-50%, -50%)',
  },
  floatingStats: {
    position: 'fixed',
    bottom: '100px',
    left: '20px',
    backgroundColor: 'rgba(255,255,255,0.95)',
    backdropFilter: 'blur(10px)',
    borderRadius: '15px',
    padding: '15px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
    zIndex: 998,
  },
  floatingStatsContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  floatingStat: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '12px',
    color: '#666',
    fontWeight: '500',
  },
  themeToggle: {
    position: 'fixed',
    bottom: '20px',
    right: '80px',
    width: '50px',
    height: '50px',
    backgroundColor: '#fff',
    border: '2px solid #E63946',
    borderRadius: '50%',
    color: '#E63946',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 15px rgba(230,57,70,0.2)',
    transition: 'all 0.3s ease',
    zIndex: 997,
  },
  soundToggle: {
    position: 'fixed',
    bottom: '20px',
    right: '140px',
    width: '50px',
    height: '50px',
    backgroundColor: '#fff',
    border: '2px solid #4CAF50',
    borderRadius: '50%',
    color: '#4CAF50',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 15px rgba(76,175,80,0.2)',
    transition: 'all 0.3s ease',
    zIndex: 997,
  },
  
  // Image Popup Modal Styles
  imagePopupOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2000,
    padding: '20px',
  },
  imagePopupModal: {
    backgroundColor: '#fff',
    borderRadius: '16px',
    maxWidth: '90vw',
    maxHeight: '90vh',
    overflow: 'hidden',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
    animation: 'fadeInScale 0.3s ease-out',
  },
  imagePopupHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px',
    borderBottom: '1px solid #e2e8f0',
  },
  imagePopupInfo: {
    flex: 1,
  },
  imagePopupTitle: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#1a1a1a',
    margin: '0 0 4px 0',
  },
  imagePopupIssuer: {
    fontSize: '14px',
    color: '#64748b',
    margin: 0,
  },
  imagePopupClose: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#64748b',
    padding: '8px',
    borderRadius: '8px',
    transition: 'all 0.3s ease',
  },
  imagePopupContent: {
    padding: '20px',
    textAlign: 'center',
  },
  imagePopupImage: {
    maxWidth: '100%',
    maxHeight: '60vh',
    objectFit: 'contain',
    borderRadius: '8px',
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
  },
  imagePopupFooter: {
    padding: '20px',
    borderTop: '1px solid #e2e8f0',
    textAlign: 'center',
  },
  imagePopupCloseBtn: {
    backgroundColor: '#3b82f6',
    color: '#fff',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },

  // About Section Styles
  aboutSection: {
    padding: '80px 0',
    background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
    position: 'relative',
  },
  aboutContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 24px',
  },
  aboutContent: {
    display: 'grid',
    gridTemplateColumns: '1fr 2fr',
    gap: '48px',
    alignItems: 'start',
  },
  aboutLeft: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  aboutProfileCard: {
    background: 'white',
    borderRadius: '20px',
    padding: '32px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.06)',
    border: '1px solid rgba(0, 0, 0, 0.04)',
    textAlign: 'center',
  },
  aboutImageContainer: {
    position: 'relative',
    display: 'inline-block',
    marginBottom: '20px',
  },
  aboutProfileImage: {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '4px solid #e2e8f0',
    transition: 'all 0.3s ease',
  },
  aboutImageOverlay: {
    position: 'absolute',
    bottom: '8px',
    right: '8px',
  },
  aboutImageBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    background: 'white',
    padding: '4px 8px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: '600',
    color: '#4CAF50',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  },
  aboutProfileInfo: {
    marginBottom: '24px',
  },
  aboutProfileName: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#1e293b',
    margin: '0 0 8px 0',
  },
  aboutProfileTitle: {
    fontSize: '16px',
    color: '#64748b',
    margin: '0 0 12px 0',
  },
  aboutProfileLocation: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    fontSize: '14px',
    color: '#64748b',
  },
  aboutQuickStats: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '16px',
    paddingTop: '20px',
    borderTop: '1px solid #e2e8f0',
  },
  aboutQuickStat: {
    textAlign: 'center',
  },
  aboutStatNumber: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#3b82f6',
    display: 'block',
  },
  aboutStatLabel: {
    fontSize: '12px',
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    marginTop: '4px',
  },
  aboutEducationCard: {
    background: 'white',
    borderRadius: '16px',
    padding: '24px',
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.06)',
    border: '1px solid rgba(0, 0, 0, 0.04)',
  },
  aboutCardHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '20px',
  },
  aboutEducationItem: {
    paddingLeft: '36px',
  },
  aboutEducationDegree: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: '8px',
  },
  aboutEducationSchool: {
    fontSize: '14px',
    color: '#3b82f6',
    fontWeight: '500',
    marginBottom: '8px',
  },
  aboutEducationDetails: {
    display: 'flex',
    gap: '16px',
    fontSize: '13px',
    color: '#64748b',
  },
  aboutEducationYear: {
    fontWeight: '500',
  },
  aboutEducationGPA: {
    fontWeight: '600',
    color: '#10b981',
  },
  aboutRight: {
    display: 'flex',
    flexDirection: 'column',
    gap: '32px',
  },
  aboutHeader: {
    marginBottom: '8px',
  },
  aboutTitle: {
    fontSize: '36px',
    fontWeight: '700',
    color: '#1e293b',
    margin: '0 0 16px 0',
    lineHeight: '1.2',
  },
  aboutSubtitle: {
    fontSize: '18px',
    color: '#64748b',
    margin: '0',
    lineHeight: '1.5',
  },
  aboutDescription: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  aboutParagraph: {
    fontSize: '16px',
    color: '#475569',
    lineHeight: '1.7',
    margin: '0',
  },
  aboutHighlights: {
    background: 'rgba(255, 255, 255, 0.7)',
    borderRadius: '16px',
    padding: '24px',
    border: '1px solid rgba(0, 0, 0, 0.04)',
  },
  aboutHighlightsTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#1e293b',
    margin: '0 0 20px 0',
  },
  aboutHighlightsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  aboutHighlightItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
    padding: '12px',
    background: 'white',
    borderRadius: '12px',
    transition: 'all 0.3s ease',
  },

  // About Values Styles
  aboutValues: {
    marginTop: '30px',
    background: 'rgba(59, 130, 246, 0.05)',
    borderRadius: '16px',
    padding: '24px',
    border: '1px solid rgba(59, 130, 246, 0.1)',
  },
  aboutValuesTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#1e293b',
    margin: '0 0 20px 0',
  },
  aboutValuesList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '12px',
  },
  aboutValue: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '10px 12px',
    background: 'white',
    borderRadius: '10px',
    fontSize: '14px',
    fontWeight: '500',
    color: '#374151',
    transition: 'all 0.3s ease',
  },
};

export default Portfolio;