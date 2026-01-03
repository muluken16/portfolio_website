import React, { useState, useRef, useEffect } from 'react';
import {
  MessageCircle,
  Send,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Bot,
  User,
  Globe,
  X,
  Minimize2,
  Maximize2,
  Languages,
  AlertTriangle,
  Copy,
  Volume1
} from 'lucide-react';

// Error Boundary Component
class ChatbotErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Chatbot Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          background: '#fff',
          border: '2px solid #ef4444',
          borderRadius: '12px',
          padding: '16px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
          maxWidth: '300px',
          zIndex: 1000
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <AlertTriangle size={20} color="#ef4444" />
            <span style={{ fontWeight: '600', color: '#ef4444' }}>Chatbot Error</span>
          </div>
          <p style={{ fontSize: '14px', color: '#666', margin: '0 0 12px 0' }}>
            The AI assistant is temporarily unavailable. Please contact Muluken directly:
          </p>
          <div style={{ fontSize: '12px', color: '#333' }}>
            <div>📧 mulukencs16@gmail.com</div>
            <div>📱 +251 918 490 881</div>
            <div>💬 @Fullday16 (Telegram)</div>
          </div>
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            style={{
              marginTop: '12px',
              padding: '6px 12px',
              background: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '12px',
              cursor: 'pointer'
            }}
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

const AIChatbot = () => {
  // Add CSS animations
  React.useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-5px); }
      }
      
      @keyframes bounce {
        0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
        40% { transform: translateY(-10px); }
        60% { transform: translateY(-5px); }
      }
      
      @keyframes pulse {
        0% { box-shadow: 0 8px 24px rgba(59, 130, 246, 0.4); }
        50% { box-shadow: 0 8px 24px rgba(59, 130, 246, 0.6); }
        100% { box-shadow: 0 8px 24px rgba(59, 130, 246, 0.4); }
      }
      
      @keyframes slideIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }
      
      @keyframes buttonFloat {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-2px); }
      }
      
      @keyframes typingDot {
        0%, 100% { transform: translateY(0); opacity: 0.4; }
        50% { transform: translateY(-4px); opacity: 1; }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 'initial_welcome_msg',
      type: 'bot',
      content: '👋 Hey there! I\'m Mule Assistant 🤖\n\nI\'m here to help you get to know Muluken Mesfin - he\'s a talented full-stack developer from Ethiopia who builds some really cool stuff!\n\nWhat would you like to know about him? I can tell you about his projects, skills, background, or help you get in touch.\n\n🌍 I speak English and አማርኛ (Amharic) too!\n\nFeel free to click a button below or just ask me anything! 😊',
      timestamp: new Date(),
      showButtons: true
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [useGeminiAI, setUseGeminiAI] = useState(true);

  const messagesEndRef = useRef(null);
  const audioRef = useRef(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const synthesisRef = useRef(window.speechSynthesis);
  const recognitionRef = useRef(null);

  // Detect mobile devices
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Initialize Speech Recognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = selectedLanguage === 'am' ? 'am-ET' : 'en-US';

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => setIsListening(false);
      recognitionRef.current.onend = () => setIsListening(false);
    }
  }, [selectedLanguage]);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      if (recognitionRef.current) {
        recognitionRef.current.start();
        setIsListening(true);
      } else {
        alert("Speech recognition is not supported in this browser.");
      }
    }
  };

  // Load chat history from localStorage
  useEffect(() => {
    const savedMessages = localStorage.getItem('mule_chat_history');
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages).map(m => ({
        ...m,
        timestamp: new Date(m.timestamp)
      })));
    }
  }, []);

  // Save chat history to localStorage
  useEffect(() => {
    if (messages.length > 1) { // Don't save if it's just the initial message
      localStorage.setItem('mule_chat_history', JSON.stringify(messages));
    }
  }, [messages]);

  const clearChat = () => {
    setMessages([{
      id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type: 'bot',
      content: 'Chat cleared! How can I help you learn more about Muluken? 😊',
      timestamp: new Date(),
      showButtons: true
    }]);
    localStorage.removeItem('mule_chat_history');
    stopSpeaking();
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  // Backend AI Configuration (uses Vite proxy in dev, direct in production)
  const BACKEND_URL = import.meta.env.PROD ? '' : '';
  const CHAT_API_URL = `/api/chat`;

  // Call Google Gemini AI with conversation history
  const callGeminiAI = async (userMessage, history = []) => {
    if (!useGeminiAI) return null;

    try {
      const prompt = `You are Mule Assistant, the ELITE AI personal companion of Muluken Mesfin. You are highly intelligent, charismatic, and specifically designed to showcase Muluken's world-class skills as a Full-Stack Developer.

PERSONALITY & BRANDING:
- **Elite Representation**: You are not just a bot; you are Muluken's professional digital twin.
- **Charismatic & Professional**: Use a tone that is confident yet humble, like an expert agent representing a top-tier athlete.
- **Visitor Experience**: Make the visitor feel special. If they ask about hiring, be extremely helpful and proactive.
- **Direct Engagement**: Suggest specific projects or skills based on their interest.

CURRENT CONTEXT:
- **Location**: Addis Ababa, Ethiopia (UTC+3)
- **Status**: ACTIVE & OPEN to Remote/Global Roles
- **Key Highlight**: Built a massive delivery ecosystem with 3 production-ready mobile apps.
- **Education**: 3.35 CGPA Computer Science graduate.

TECHNICAL STACK (Highlight these):
- Frontend: React, React Native (Expert), TypeScript
- Backend: Node.js, Python, PHP, GraphQL
- Databases: MySQL, MongoDB, Firebase
- DevOps: Linux (Certified), Cisco Networking (Certified)

RESPONSE GUIDELINES:
- Use clear bullet points for lists.
- Mention Muluken's 10+ completed projects.
- ALWAYS offer to share his CV or setup a call.
- Be extremely conversational - ask "Shall I show you the source code for that project?" or "Would you like to see how he optimized the database?"

User's message: "${userMessage}"

Respond as the Premium Mule Assistant:`;

      const response = await fetch(CHAT_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: prompt,
          history: history
        })
      });

      if (!response.ok) {
        throw new Error(`Gemini API error: ${response.status}`);
      }

      const data = await response.json();
      return data.response;
    } catch (error) {
      console.error('Gemini AI Error:', error);
      return null;
    }
  };

  // Ethiopian languages support
  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸', locale: 'en-US' },
    { code: 'am', name: 'አማርኛ (Amharic)', flag: '🇪🇹', locale: 'am-ET' },
    { code: 'or', name: 'Oromiffa', flag: '🇪🇹', locale: 'om-ET' },
    { code: 'ti', name: 'ትግርኛ (Tigrinya)', flag: '🇪🇹', locale: 'ti-ET' }
  ];

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Text to Speech Functionality
  const speak = (text) => {
    if (!soundEnabled || !synthesisRef.current) return;

    // Stop any current speech
    synthesisRef.current.cancel();

    // Remove markdown-like syntax for better speech
    const cleanText = text.replace(/[*#_\[\]()]/g, '').replace(/!.*?\)/g, '');

    const utterance = new SpeechSynthesisUtterance(cleanText);

    // Try to find a good voice
    const voices = synthesisRef.current.getVoices();
    const preferredVoice = voices.find(v => v.lang.includes(selectedLanguage) || v.name.includes('Google'));
    if (preferredVoice) utterance.voice = preferredVoice;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    synthesisRef.current.speak(utterance);
  };

  const stopSpeaking = () => {
    if (synthesisRef.current) {
      synthesisRef.current.cancel();
      setIsSpeaking(false);
    }
  };

  // Play notification sound
  const playSound = (type = 'message') => {
    if (!soundEnabled) return;

    try {
      // Create audio context for modern sound effects
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      if (type === 'message') {
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.1);
      } else if (type === 'send') {
        oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime + 0.1);
      }

      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.2);
    } catch (error) {
      console.log('Sound not supported');
    }
  };

  // Generate QR Code URL
  const generateQRCode = (text, size = 200) => {
    return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(text)}&format=png&margin=10`;
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Quick action buttons
  const quickActions = [
    { text: '📄 CV', action: 'cv' },
    { text: '🚀 Projects', action: 'projects' },
    { text: '🛠️ Skills', action: 'skills' },
    { text: '📞 Schedule Call', action: 'schedule call' },
    { text: '🌐 Social', action: 'social media' }
  ];

  // Typewriter effect helper
  const streamResponse = async (text, messageId) => {
    let currentText = '';
    const words = text.split(' ');

    for (let i = 0; i < words.length; i++) {
      currentText += words[i] + ' ';
      setMessages(prev => prev.map(msg =>
        msg.id === messageId ? { ...msg, content: currentText } : msg
      ));
      // Instant streaming
      await new Promise(resolve => setTimeout(resolve, 0));
    }
  };

  const handleQuickAction = async (action) => {
    const userMessage = {
      id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type: 'user',
      content: action,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // 1. Get AI Response
      let aiResponse = await callGeminiAI(action);

      if (!aiResponse) {
        aiResponse = "I'm having trouble connecting to my brain 🧠. Attempting to answer locally...";
        // Fallback if needed
        aiResponse = getAIResponse(action);
      }

      // 2. Create placeholder bot message
      const botMsgId = Date.now() + 1;
      const botMessage = {
        id: botMsgId,
        type: 'bot',
        content: '', // Start empty for typing effect
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
      playSound('message');

      // 3. Start Typing Effect
      await streamResponse(aiResponse, botMsgId);

      // 4. Auto-speak
      if (aiResponse.length < 500) {
        speak(aiResponse);
      }

    } catch (error) {
      console.error('Quick action error:', error);
      setIsLoading(false);
    }
  };

  // Auto-detect language from input
  const detectLanguage = (text) => {
    // Check for Amharic characters
    const amharicPattern = /[\u1200-\u137F]/;
    if (amharicPattern.test(text)) {
      return 'am';
    }
    return 'en';
  };

  // Professional AI responses with HR focus
  const getAIResponse = (message) => {
    const lowerMessage = message.toLowerCase();
    const detectedLang = detectLanguage(message);
    const currentLang = languages.find(l => l.code === detectedLang) || languages.find(l => l.code === selectedLanguage);

    // QR Code responses - Enhanced with multiple QR codes
    if (lowerMessage.includes('qr') || lowerMessage.includes('scan') || lowerMessage.includes('qr code')) {
      const portfolioUrl = window.location.origin;
      const emailQR = generateQRCode('mailto:mulukencs16@gmail.com?subject=Portfolio Inquiry');
      const phoneQR = generateQRCode('tel:+251918490881');
      const telegramQR = generateQRCode('https://t.me/Fullday16');
      const githubQR = generateQRCode('https://github.com/muluken16');
      const linkedinQR = generateQRCode('https://linkedin.com/in/mule16');
      const portfolioQR = generateQRCode(portfolioUrl);

      return `📱 QR Codes - Quick Mobile Access\n\n🌐 Portfolio & CV:\n![Portfolio QR](${portfolioQR})\nScan to access full portfolio & CV download\n\n📧 Email Contact:\n![Email QR](${emailQR})\nScan to send email directly\n\n📞 Phone Contact:\n![Phone QR](${phoneQR})\nScan to call +251 918 490 881\n\n💬 Telegram:\n![Telegram QR](${telegramQR})\nScan to chat on Telegram (@Fullday16)\n\n💻 GitHub:\n![GitHub QR](${githubQR})\nScan to view code repositories\n\n💼 LinkedIn:\n![LinkedIn QR](${linkedinQR})\nScan to connect professionally\n\n📱 How to Use:\n1. Open camera app on your phone\n2. Point at any QR code above\n3. Tap the notification to open\n4. Instant access to contact/profile!\n\n💡 Pro Tip: Save these QR codes for offline sharing with HR teams and recruiters!`;
    }

    // Social Media responses - Comprehensive social presence
    if (lowerMessage.includes('social') || lowerMessage.includes('media') || lowerMessage.includes('linkedin') || lowerMessage.includes('telegram') || lowerMessage.includes('social media')) {
      const linkedinQR = generateQRCode('https://linkedin.com/in/mule16');
      const githubQR = generateQRCode('https://github.com/muluken16');
      const telegramQR = generateQRCode('https://t.me/Fullday16');

      return `🌐 Muluken's Social Media & Professional Presence\n\n💼 Professional Networks:\n\nLinkedIn 💼\n• Profile: linkedin.com/in/mule16\n• Status: Open to opportunities\n• Connections: Professional network\n• Content: Tech insights, project updates\n![LinkedIn QR](${linkedinQR})\n\nGitHub 💻\n• Profile: github.com/muluken16\n• Repositories: 10+ active projects\n• Activity: Regular contributions\n• Code Quality: Clean, documented\n![GitHub QR](${githubQR})\n\nTelegram 💬\n• Handle: @Fullday16\n• Response Time: Within 2-4 hours\n• Languages: English, Amharic\n• Best For: Quick communication\n![Telegram QR](${telegramQR})\n\n📧 Email Communication:\n• Primary: mulukencs16@gmail.com\n• Response Time: Within 4-8 hours\n• Best For: Formal inquiries, CV requests\n\n📱 Phone/WhatsApp:\n• Number: +251 918 490 881\n• Available: 9 AM - 6 PM EAT (UTC+3)\n• Best For: Urgent matters, interviews\n\n🤝 Professional Sharing:\n• HR Teams: Use QR codes for easy sharing\n• Recruiters: LinkedIn for formal connections\n• Clients: Telegram for project discussions\n• Developers: GitHub for code collaboration\n\n📊 Social Media Strategy:\n• Professional Focus: Career-oriented content\n• Tech Insights: Sharing development tips\n• Project Updates: Showcasing latest work\n• Community Engagement: Helping other developers\n\nWhich platform would you like to connect on? 🚀`;
    }

    // CV/Resume responses - Professional HR focus with enhanced PDF access
    if (lowerMessage.includes('cv') || lowerMessage.includes('resume') || lowerMessage.includes('download') || lowerMessage.includes('pdf') || lowerMessage.includes('scan cv')) {
      const portfolioUrl = window.location.origin;
      const emailQR = generateQRCode('mailto:mulukencs16@gmail.com?subject=CV Request - Portfolio Inquiry');
      const portfolioQR = generateQRCode(portfolioUrl);
      const cvDirectLink = `${portfolioUrl}/src/assets/cv/muluken.pdf`;

      return `📄 **Muluken's Professional CV & Resume**\n\n**👨‍💻 Quick Summary:**\n• **Name:** Muluken Mesfin\n• **Role:** Full-Stack Developer\n• **Experience:** 2+ years in web & mobile development\n• **Education:** BSc Computer Science (Wolkite University, 2023)\n• **Location:** Ethiopia (Remote Available Globally)\n\n**🎯 Core Expertise:**\n• Frontend: React, React Native, JavaScript, TypeScript\n• Backend: Node.js, Python, PHP, MySQL, MongoDB\n• Mobile: React Native, Flutter, Firebase\n• DevOps: Git, Linux, Server Administration\n\n**📋 CV Access Options:**\n\n**🔗 Direct Download:**\n• **[📄 Download CV PDF]** - Click in About section\n• **Direct Link:** ${cvDirectLink}\n• **Format:** Professional PDF format\n• **Updated:** Latest version always available\n\n**📱 QR Code Access:**\n![Portfolio QR](${portfolioQR})\n*Scan to access CV download page*\n\n**📧 Email Request:**\n![Email QR](${emailQR})\n*Scan to request CV via email*\n\n**🤝 For HR Teams:**\n• **Availability:** Immediate start available\n• **Work Type:** Remote, Full-time, Contract\n• **Salary:** Competitive, negotiable\n• **References:** Available upon request\n• **Background Check:** Ready to provide\n\n**📞 Direct Contact:**\n• Email: mulukencs16@gmail.com\n• Phone: +251 918 490 881\n• Telegram: @Fullday16\n• LinkedIn: linkedin.com/in/mule16\n\n**💼 Additional Documents:**\n• Portfolio website (this site)\n• GitHub repositories\n• Project case studies\n• Certification copies\n\nWould you like me to share specific project details or arrange an interview? 🚀`;
    }

    // Projects/Portfolio responses with GitHub integration
    if (lowerMessage.includes('project') || lowerMessage.includes('portfolio') || lowerMessage.includes('github') || lowerMessage.includes('repo') || lowerMessage.includes('code')) {
      return `🚀 Muluken's Project Portfolio & GitHub Repositories\n\n📊 Portfolio Overview:\n• Total Projects: 10+ completed\n• GitHub: github.com/muluken16\n• Live Demos: Available for most projects\n• Code Quality: Clean, documented, production-ready\n\n🏆 Featured Projects:\n\n1. 🚚 Delivery Ecosystem ⭐⭐⭐⭐⭐\n• Description: Complete food delivery platform\n• Apps: Customer, Vendor, Rider applications\n• Tech Stack: React Native, Node.js, Firebase, Socket.io\n• Features: Real-time tracking, payments, notifications\n• Status: Production-ready\n• [View Demo] [GitHub Repo] [Share with HR]\n\n2. 🔧 MuyaPro Service Marketplace ⭐⭐⭐⭐\n• Description: Connects customers with technicians\n• Tech Stack: React Native, Expo, Firebase\n• Features: Service booking, ratings, payments\n• Status: Live application\n• [Download APK] [View Code] [Technical Details]\n\n3. 🛒 E-commerce Platforms ⭐⭐⭐⭐\n• Description: Online shopping solutions\n• Tech Stack: React, PHP, MySQL, Stripe\n• Features: Cart, payments, inventory management\n• Status: Multiple deployments\n• [Live Demo] [Source Code] [Case Study]\n\n💻 Technical Highlights:\n• Clean Architecture: SOLID principles, MVC patterns\n• Modern Stack: Latest React, Node.js, mobile frameworks\n• Database Design: Optimized queries, proper indexing\n• API Development: RESTful, GraphQL, real-time WebSocket\n• Testing: Unit tests, integration tests\n• Deployment: CI/CD, cloud hosting, monitoring\n\n🤝 For Technical Teams:\n• Code Reviews: Available on GitHub\n• Documentation: Comprehensive README files\n• Architecture: Scalable, maintainable designs\n• Best Practices: ESLint, Prettier, Git workflows\n\nWant to dive deeper into any specific project? 🔍`;
    }

    // Skills responses with charts/progress bars
    if (lowerMessage.includes('skill') || lowerMessage.includes('tech') || lowerMessage.includes('expertise') || lowerMessage.includes('stack')) {
      return `🛠️ **Muluken's Technical Skills & Expertise**\n\n**📊 Skill Proficiency Chart:**\n\n**Frontend Development:**\n• React.js ████████████████████ 95%\n• React Native ███████████████████ 93%\n• JavaScript ████████████████████ 98%\n• TypeScript ██████████████████ 88%\n• HTML5/CSS3 ████████████████████ 90%\n• Tailwind CSS ██████████████████ 90%\n\n**Backend Development:**\n• Node.js ███████████████████ 94%\n• Python ████████████████ 89%\n• PHP ███████████████ 85%\n• REST APIs ███████████████████ 93%\n• GraphQL ███████████████ 81%\n\n**Database & Storage:**\n• MySQL ██████████████████ 91%\n• MongoDB ████████████████ 86%\n• Firebase ███████████████████ 93%\n• Redis ████████████ 75%\n\n**Mobile Development:**\n• React Native ███████████████████ 93%\n• Flutter ███████████████ 83%\n• iOS/Android ████████████████ 85%\n• Push Notifications ██████████████████ 90%\n\n**DevOps & Tools:**\n• Git/GitHub ████████████████████ 95%\n• Linux Administration ███████████████ 85%\n• Docker ████████████ 70%\n• AWS/Cloud ████████████ 75%\n\n**🏆 Certifications:**\n• Red Hat Java EE Development ✅\n• Cisco CCNA Networking ✅\n• Linux System Administration ✅\n• Digital Marketing ✅\n\n**💼 Professional Experience:**\n• **Years of Experience:** 2+ years\n• **Projects Completed:** 10+\n• **Client Satisfaction:** 100%\n• **Code Quality Score:** A+\n\n**🎯 Specializations:**\n• Full-stack web applications\n• Cross-platform mobile apps\n• Real-time applications\n• E-commerce solutions\n• API development & integration\n\n**📈 Learning & Growth:**\n• Continuously updating skills\n• Following latest tech trends\n• Contributing to open source\n• Mentoring junior developers\n\nNeed specific technical details for any skill area? 🚀`;
    }

    // HR/Sharing responses
    if (lowerMessage.includes('share with hr') || lowerMessage.includes('send cv') || lowerMessage.includes('send portfolio') || lowerMessage.includes('download all') || lowerMessage.includes('hr team')) {
      const portfolioUrl = window.location.origin;
      const hrEmailTemplate = `mailto:?subject=Candidate Recommendation - Muluken Mesfin&body=Hi,%0D%0A%0D%0AI'd like to recommend Muluken Mesfin for your consideration.%0D%0A%0D%0AProfile Summary:%0D%0A- Full-Stack Developer%0D%0A- 2+ years experience%0D%0A- React, React Native, Node.js expertise%0D%0A- Available for remote work%0D%0A%0D%0APortfolio: ${portfolioUrl}%0D%0AContact: mulukencs16@gmail.com%0D%0APhone: +251 918 490 881%0D%0A%0D%0ABest regards`;

      return `🤝 **HR Sharing & Recruitment Tools**\n\n**📋 Complete Candidate Package:**\n\n**📄 Documents Ready for HR:**\n• **[📄 Download CV PDF]** - Professional resume\n• **[💼 Portfolio Website]** - ${portfolioUrl}\n• **[💻 GitHub Profile]** - github.com/muluken16\n• **[💼 LinkedIn]** - linkedin.com/in/mule16\n\n**📧 Quick HR Actions:**\n• **[📧 Email HR Template]** - ${hrEmailTemplate}\n• **[📱 Share via WhatsApp]** - Ready-to-send message\n• **[💬 Telegram Contact]** - @Fullday16\n• **[📞 Schedule Call]** - +251 918 490 881\n\n**👨‍💻 Candidate Summary for HR:**\n\n**🎯 Role Fit:**\n• **Position:** Full-Stack Developer / Mobile Developer\n• **Level:** Mid-level (2+ years experience)\n• **Availability:** Immediate start\n• **Work Preference:** Remote-first, flexible hours\n\n**💰 Compensation Expectations:**\n• **Salary Range:** Competitive, market-rate\n• **Work Type:** Full-time, Part-time, Contract\n• **Benefits:** Open to discussion\n• **Location:** Ethiopia (Remote globally)\n\n**✅ Pre-screening Checklist:**\n• ✅ Technical skills verified\n• ✅ Portfolio projects reviewed\n• ✅ Education credentials confirmed\n• ✅ Professional references available\n• ✅ Communication skills: Excellent English\n• ✅ Cultural fit: Professional, collaborative\n\n**🚀 Next Steps for HR:**\n1. **[📄 Download Complete Package]**\n2. **[📧 Send Interview Invitation]**\n3. **[📞 Schedule Technical Interview]**\n4. **[💼 Check References]**\n\n**⚡ Fast-Track Hiring:**\n• **Technical Assessment:** Can complete within 24 hours\n• **Interview Availability:** Flexible across time zones\n• **Start Date:** Immediate or as per requirement\n• **Trial Period:** Open to project-based evaluation\n\nReady to move forward with this candidate? 🎯`;
    }

    // Availability responses
    if (lowerMessage.includes('available') || lowerMessage.includes('work hours') || lowerMessage.includes('remote') || lowerMessage.includes('hire') || lowerMessage.includes('start date')) {
      return `⏰ **Availability & Work Preferences**\n\n**🟢 Current Status: AVAILABLE**\n\n**📅 Availability Details:**\n• **Start Date:** Immediate (within 1-2 weeks notice)\n• **Work Type:** Remote-first, hybrid, or on-site\n• **Hours:** Full-time (40+ hrs/week) or Part-time\n• **Contract Type:** Permanent, Contract, Freelance\n• **Time Zone:** East Africa Time (EAT, UTC+3)\n\n**🌍 Remote Work Capabilities:**\n• **Experience:** 2+ years remote work\n• **Setup:** Professional home office\n• **Internet:** High-speed, reliable connection\n• **Equipment:** Latest development tools\n• **Communication:** Excellent English, video calls\n\n**⏰ Working Hours Flexibility:**\n• **Primary:** 9 AM - 6 PM EAT (UTC+3)\n• **Overlap with US:** 6 AM - 2 PM EST possible\n• **Overlap with EU:** 9 AM - 5 PM CET natural fit\n• **Overlap with Asia:** 2 PM - 10 PM JST possible\n• **Weekend Work:** Available for urgent projects\n\n**💼 Work Preferences:**\n• **Team Size:** Comfortable with small to large teams\n• **Management Style:** Self-directed, regular check-ins\n• **Project Duration:** 3+ months preferred\n• **Industry:** Tech, E-commerce, Healthcare, FinTech\n• **Role Type:** Individual contributor or tech lead\n\n**🚀 Immediate Availability For:**\n• Full-stack web development\n• Mobile app development (React Native)\n• API development and integration\n• Database design and optimization\n• Technical consulting and code reviews\n\n**📞 Quick Contact for Hiring:**\n• **Email:** mulukencs16@gmail.com\n• **Phone/WhatsApp:** +251 918 490 881\n• **Telegram:** @Fullday16\n• **Response Time:** Within 2-4 hours\n\n**💰 Compensation Discussion:**\n• Open to market-rate discussions\n• Flexible based on project scope\n• Performance-based bonuses welcome\n• Equity participation considered\n\nReady to discuss your project requirements? 📞`;
    }

    // About/Experience responses
    if (lowerMessage.includes('about you') || lowerMessage.includes('who are you') || lowerMessage.includes('experience') || lowerMessage.includes('achievements') || lowerMessage.includes('about muluken')) {
      return detectedLang === 'am'
        ? `👋 **ስለ ሙሉከን መስፍን - About Muluken Mesfin**\n\n**🎯 Professional Identity:**\n• **ስም:** ሙሉከን መስፍን (Muluken Mesfin)\n• **ሙያ:** Full-Stack Developer\n• **ልምድ:** 2+ years in software development\n• **ቦታ:** Ethiopia (በዓለም አቀፍ ደረጃ remote work)\n\n**🎓 የትምህርት ዳራ:**\n• BSc in Computer Science - Wolkite University (2019-2023)\n• CGPA: 3.35/4.0\n• Multiple professional certifications\n\n**🏆 ዋና ስኬቶች:**\n• 10+ successful projects completed\n• Delivery ecosystem with 3 mobile apps\n• E-commerce platforms serving real customers\n• Service marketplace connecting users\n• 100% client satisfaction rate\n\n**💼 ሙያዊ ልምድ:**\n• Mobile app development (React Native)\n• Web application development (React, Node.js)\n• Database design and optimization\n• API development and integration\n• Real-time application development\n\n**🌟 ልዩ ችሎታዎች:**\n• Problem-solving and analytical thinking\n• Clean, maintainable code writing\n• Cross-platform development\n• Client communication and project management\n• Continuous learning and adaptation\n\n**📞 ግንኙነት:**\n• Email: mulukencs16@gmail.com\n• Phone: +251 918 490 881\n• Telegram: @Fullday16`
        : `👋 **About Muluken Mesfin - Professional Background**\n\n**🎯 Professional Identity:**\n• **Full Name:** Muluken Mesfin\n• **Role:** Full-Stack Developer & Mobile App Specialist\n• **Experience:** 2+ years in software development\n• **Location:** Ethiopia (Available globally for remote work)\n• **Age:** 24 years old (Born 1999)\n\n**🎓 Educational Background:**\n• **Degree:** Bachelor of Science in Computer Science\n• **University:** Wolkite University (2019-2023)\n• **CGPA:** 3.35/4.0\n• **Graduation:** 2023 (Recent graduate with fresh perspective)\n\n**🏆 Key Achievements:**\n• **Projects Completed:** 10+ successful projects\n• **Client Satisfaction:** 100% positive feedback\n• **Code Quality:** Consistently high standards\n• **Innovation:** Built complete delivery ecosystem\n• **Recognition:** Hackathon participant, professional recommendations\n\n**💼 Professional Experience:**\n• **Specialization:** Full-stack web and mobile development\n• **Primary Technologies:** React, React Native, Node.js, Python\n• **Project Types:** E-commerce, delivery apps, service marketplaces\n• **Work Style:** Self-directed, collaborative, deadline-focused\n• **Communication:** Excellent English, professional presentation\n\n**🌟 Personal Strengths:**\n• **Problem Solver:** Analytical approach to complex challenges\n• **Fast Learner:** Quickly adapts to new technologies\n• **Detail-Oriented:** Clean, well-documented code\n• **Team Player:** Collaborative and supportive\n• **Reliable:** Consistent delivery and communication\n\n**🚀 Career Vision:**\n• Building scalable, user-focused applications\n• Contributing to innovative software solutions\n• Growing expertise in emerging technologies\n• Mentoring and knowledge sharing\n• Making positive impact through technology\n\n**📈 Current Focus:**\n• Advanced React Native development\n• Cloud architecture and DevOps\n• AI/ML integration in applications\n• Open source contributions\n• Professional networking and growth\n\nWhat specific aspect would you like to know more about? 🤔`;
    }

    // Education/Certifications responses
    if (lowerMessage.includes('education') || lowerMessage.includes('certification') || lowerMessage.includes('degree') || lowerMessage.includes('university') || lowerMessage.includes('ትምህርት')) {
      return `🎓 **Education & Professional Certifications**\n\n**🏫 University Education:**\n• **Degree:** Bachelor of Science in Computer Science\n• **Institution:** Wolkite University, Ethiopia\n• **Duration:** 2019 - 2023 (4 years)\n• **CGPA:** 3.35/4.0\n• **Status:** Graduated 2023\n• **Thesis:** [Software Development Project]\n\n**📜 Professional Certifications:**\n\n**🔴 Red Hat Certified:**\n• **Red Hat Application Development I (Java EE - AD183)**\n• **Issuer:** Red Hat, Inc.\n• **Year:** 2024\n• **Skills:** Enterprise Java development, application servers\n\n**🌐 Cisco Networking Certifications:**\n• **CCNA (Cisco Certified Network Associate)**\n• **CCNA1:** Introduction to Networks\n• **CCNA2:** Routing and Switching Essentials\n• **CCNA3:** Enterprise Networking, Security, and Automation\n• **Issuer:** Cisco Systems\n• **Year:** 2024\n• **Skills:** Network configuration, security, troubleshooting\n\n**🐧 Linux Administration:**\n• **NDG Essential Linux**\n• **Issuer:** Network Development Group\n• **Year:** 2024\n• **Skills:** System administration, command line, server management\n\n**🤖 AI/ML Training:**\n• **Machine Learning with Python - Training**\n• **Issuer:** Training Institute\n• **Year:** 2024\n• **Skills:** Python, data analysis, machine learning algorithms\n\n**📈 Digital Marketing:**\n• **Digital Marketing Certification**\n• **Issuer:** Orbit Innovation Hub\n• **Year:** 2024\n• **Skills:** SEO, social media, online marketing strategies\n\n**🏆 Additional Achievements:**\n• **Innovation Minister Hackathon** - Participant (2024)\n• **Professional Recommendation Letter** - From Academic Advisor\n• **Multiple Technical Workshops** - Continuous learning\n\n**📚 Continuous Learning:**\n• **Online Courses:** Coursera, Udemy, freeCodeCamp\n• **Tech Communities:** Active in developer forums\n• **Reading:** Technical blogs, documentation, best practices\n• **Practice:** Personal projects, coding challenges\n\n**🎯 Academic Strengths:**\n• **Programming Languages:** Java, Python, JavaScript, PHP\n• **Database Systems:** MySQL, MongoDB, database design\n• **Software Engineering:** SDLC, design patterns, testing\n• **Web Technologies:** HTML, CSS, frameworks, APIs\n• **Mobile Development:** Cross-platform app development\n\n**📊 Academic Performance:**\n• **Strong Foundation:** Computer science fundamentals\n• **Practical Skills:** Hands-on project experience\n• **Research Ability:** Problem analysis and solution design\n• **Presentation Skills:** Technical communication\n\nNeed verification of any specific certification? 📋`;
    }

    // Contact responses - Enhanced with all social media
    if (lowerMessage.includes('contact') || lowerMessage.includes('reach') || lowerMessage.includes('hire') || lowerMessage.includes('email') || lowerMessage.includes('phone') || lowerMessage.includes('ግንኙነት')) {
      const emailQR = generateQRCode('mailto:mulukencs16@gmail.com?subject=Portfolio Inquiry');
      const phoneQR = generateQRCode('tel:+251918490881');
      const telegramQR = generateQRCode('https://t.me/Fullday16');
      const linkedinQR = generateQRCode('https://linkedin.com/in/mule16');

      return selectedLanguage === 'am'
        ? `📞 **ሙሉከንን ማግኘት:**\n\n📧 **ኢሜል:** mulukencs16@gmail.com\n![Email QR](${emailQR})\n\n📱 **ስልክ:** +251 918 490 881\n![Phone QR](${phoneQR})\n\n💬 **ቴሌግራም:** @Fullday16\n![Telegram QR](${telegramQR})\n\n💼 **LinkedIn:** linkedin.com/in/mule16\n![LinkedIn QR](${linkedinQR})\n\n🌐 **GitHub:** github.com/muluken16\n\n⏰ **ተገኝነት:** በዓለም አቀፍ ደረጃ ለርቀት ስራ ይገኛል\n🕐 **የሰዓት ክልል:** East Africa Time (EAT, UTC+3)\n\n✅ ለፕሮጀክት ውይይቶች እና ስራ እድሎች ዝግጁ!`
        : `📞 **Contact Muluken - All Channels:**\n\n**📧 Email (Primary):**\n• mulukencs16@gmail.com\n• Response: 4-8 hours\n• Best for: Formal inquiries, CV requests\n![Email QR](${emailQR})\n\n**📱 Phone/WhatsApp:**\n• +251 918 490 881\n• Available: 9 AM - 6 PM EAT (UTC+3)\n• Best for: Urgent matters, interviews\n![Phone QR](${phoneQR})\n\n**💬 Telegram (Fast Response):**\n• @Fullday16\n• Response: 2-4 hours\n• Best for: Quick questions, project discussions\n![Telegram QR](${telegramQR})\n\n**💼 LinkedIn (Professional):**\n• linkedin.com/in/mule16\n• Best for: Professional networking, references\n![LinkedIn QR](${linkedinQR})\n\n**💻 GitHub (Code):**\n• github.com/muluken16\n• Best for: Code reviews, technical discussions\n\n**🌍 Availability:**\n• Remote work globally\n• Time zone: East Africa Time (EAT, UTC+3)\n• Flexible hours for international clients\n• Available for immediate start\n\n**⚡ Response Times:**\n• Telegram: 2-4 hours\n• Email: 4-8 hours\n• Phone: During business hours\n• LinkedIn: 24-48 hours\n\n**🎯 Contact Preferences:**\n• **Urgent matters:** Phone or Telegram\n• **Project inquiries:** Email or Telegram\n• **Professional networking:** LinkedIn\n• **Technical discussions:** GitHub or Email\n\nReady to connect? Choose your preferred method! 🚀`;
    }

    // Amharic name recognition
    if (lowerMessage.includes('ሙሉከን') || lowerMessage.includes('muluken')) {
      return selectedLanguage === 'am'
        ? "👋 **ስለ ሙሉከን መስፍን:**\n\n🎯 **Full-Stack Developer** from Ethiopia\n📍 **Location:** Ethiopia (Remote Available)\n🎓 **Education:** Computer Science Graduate\n💼 **Experience:** Mobile & Web Development\n\n**🚀 ዋና ፕሮጀክቶች:**\n• የማድረሻ መተግበሪያዎች\n• MuyaPro አገልግሎት ገበያ\n• የኢ-ኮሜርስ መድረኮች\n\n**📞 ግንኙነት:**\n• mulukencs16@gmail.com\n• +251 918 490 881\n• @Fullday16 (Telegram)"
        : "👋 **About Muluken Mesfin:**\n\n🎯 **Full-Stack Developer** from Ethiopia\n📍 **Location:** Ethiopia (Remote Available Globally)\n🎓 **Education:** Computer Science Graduate (Wolkite University)\n💼 **Specialization:** React, React Native, Mobile Development\n\n**🚀 Key Projects:**\n• Delivery App Ecosystem\n• MuyaPro Service Marketplace\n• E-commerce Platforms\n• Real-time Applications\n\n**📞 Contact:**\n• Email: mulukencs16@gmail.com\n• Phone: +251 918 490 881\n• Telegram: @Fullday16";
    }

    // Default simple response
    return "Hey! 🤖 I'm Mule Assistant, and I'm here to help you learn about Muluken!\n\nI can chat with you about:\n• 📄 His CV and professional background\n• 🚀 The cool projects he's built\n• 🛠️ His technical skills and expertise\n• 📞 How to get in touch with him\n• 🌐 His social media and online presence\n\nOr just ask me anything! I love talking about Muluken's work - he's built some really impressive stuff like a complete delivery app ecosystem and a service marketplace.\n\nQuick contact if you need it:\n📧 mulukencs16@gmail.com\n📱 +251 918 490 881\n💬 @Fullday16 on Telegram\n\nWhat would you like to know? 😊";
  };

  // Handle sending message with Gemini AI integration
  const handleSendMessage = async () => {
    try {
      if (!input.trim()) return;

      playSound('send'); // Play sound when user sends message

      const userMessage = {
        id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        type: 'user',
        content: input.trim(),
        timestamp: new Date()
      };

      setMessages(prev => [...prev, userMessage]);
      const currentInput = input.trim();
      setInput('');
      setIsLoading(true);

      // Build conversation history for context
      const conversationHistory = messages
        .filter(m => m.type !== 'system')
        .map(m => ({
          role: m.type === 'user' ? 'user' : 'assistant',
          content: m.content
        }))
        .slice(-10); // Only send last 10 messages for context

      // Try Gemini AI first with conversation context
      let aiResponse = await callGeminiAI(currentInput, conversationHistory);

      // If Gemini AI fails, use pattern-based responses
      if (!aiResponse) {
        aiResponse = getAIResponse(currentInput);
      }

      // 2. Create placeholder bot message
      const botMsgId = Date.now() + 1;
      const botMessage = {
        id: botMsgId,
        type: 'bot',
        content: '', // Start empty for typing effect
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
      playSound('message');

      // 3. Start Typing Effect
      await streamResponse(aiResponse, botMsgId);

      // 4. Auto-speak
      if (aiResponse.length < 500) {
        speak(aiResponse);
      }

    } catch (error) {
      console.error('Send message error:', error);
      setIsLoading(false);
    }
  };

  // Handle key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
          border: 'none',
          color: 'white',
          cursor: 'pointer',
          boxShadow: '0 8px 24px rgba(59, 130, 246, 0.4)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.3s ease',
          animation: 'pulse 2s infinite',
          fontSize: '28px'
        }}
        onMouseOver={(e) => {
          e.target.style.transform = 'scale(1.1)';
          e.target.style.boxShadow = '0 12px 32px rgba(59, 130, 246, 0.5)';
        }}
        onMouseOut={(e) => {
          e.target.style.transform = 'scale(1)';
          e.target.style.boxShadow = '0 8px 24px rgba(59, 130, 246, 0.4)';
        }}
      >
        🤖
      </button>
    );
  }

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      width: isMobile ? 'calc(100vw - 40px)' : '420px',
      height: isMinimized ? '60px' : '600px',
      background: 'rgba(255, 255, 255, 0.85)',
      borderRadius: '24px',
      boxShadow: '0 20px 80px rgba(0,0,0,0.2)',
      zIndex: 1000,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      backdropFilter: 'blur(20px) saturate(180%)',
      WebkitBackdropFilter: 'blur(20px) saturate(180%)',
    }}>
      {/* Header - Enhanced with floating animation */}
      <div style={{
        padding: '16px',
        borderBottom: '1px solid #e5e7eb',
        background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        animation: 'float 3s ease-in-out infinite'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            animation: 'bounce 2s infinite',
            fontSize: '24px'
          }}>
            🤖
          </div>
          <div>
            <h3 style={{
              margin: 0,
              fontSize: '16px',
              fontWeight: '600',
              textShadow: '0 1px 2px rgba(0,0,0,0.1)'
            }}>
              Mule Assistant
            </h3>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          {/* Gemini AI Toggle */}
          <button
            onClick={() => setUseGeminiAI(!useGeminiAI)}
            style={{
              background: useGeminiAI ? 'rgba(34, 197, 94, 0.3)' : 'rgba(255,255,255,0.2)',
              border: useGeminiAI ? '1px solid rgba(34, 197, 94, 0.5)' : 'none',
              color: 'white',
              borderRadius: '6px',
              padding: '6px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              fontSize: '10px'
            }}
            title={useGeminiAI ? 'Gemini AI: ON' : 'Gemini AI: OFF'}
          >
            🤖 {useGeminiAI ? 'AI' : 'OFF'}
          </button>

          {/* Sound Toggle */}
          <button
            onClick={() => {
              if (isSpeaking) {
                stopSpeaking();
              } else {
                setSoundEnabled(!soundEnabled);
              }
            }}
            style={{
              background: isSpeaking ? 'rgba(239, 68, 68, 0.4)' : 'rgba(255,255,255,0.2)',
              border: 'none',
              color: 'white',
              borderRadius: '6px',
              padding: '6px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              animation: isSpeaking ? 'pulse 1s infinite' : 'none'
            }}
            title={isSpeaking ? 'Stop Speaking' : (soundEnabled ? 'Disable Sound' : 'Enable Sound')}
          >
            {isSpeaking ? <VolumeX size={16} /> : (soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />)}
          </button>

          {/* Language Selector */}
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            style={{
              background: 'rgba(255,255,255,0.2)',
              border: 'none',
              color: 'white',
              borderRadius: '6px',
              padding: '4px 8px',
              fontSize: '12px'
            }}
          >
            {languages.map(lang => (
              <option key={lang.code} value={lang.code} style={{ color: 'black' }}>
                {lang.flag} {lang.name}
              </option>
            ))}
          </select>

          <button
            onClick={clearChat}
            style={{
              background: 'rgba(255,255,255,0.2)',
              border: 'none',
              color: 'white',
              borderRadius: '6px',
              padding: '6px',
              cursor: 'pointer'
            }}
            title="Clear Chat"
          >
            🗑️
          </button>

          <button
            onClick={() => setIsMinimized(!isMinimized)}
            style={{
              background: 'rgba(255,255,255,0.2)',
              border: 'none',
              color: 'white',
              borderRadius: '6px',
              padding: '6px',
              cursor: 'pointer'
            }}
          >
            {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
          </button>

          <button
            onClick={clearChat}
            style={{
              background: 'rgba(255,255,255,0.2)',
              border: 'none',
              color: 'white',
              borderRadius: '6px',
              padding: '6px',
              cursor: 'pointer'
            }}
            title="Clear Chat"
          >
            🗑️
          </button>

          <button
            onClick={() => setIsMinimized(!isMinimized)}
            style={{
              background: 'rgba(255,255,255,0.2)',
              border: 'none',
              color: 'white',
              borderRadius: '6px',
              padding: '6px',
              cursor: 'pointer'
            }}
          >
            {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
          </button>

          <button
            onClick={() => setIsOpen(false)}
            style={{
              background: 'rgba(255,255,255,0.2)',
              border: 'none',
              color: 'white',
              borderRadius: '6px',
              padding: '6px',
              cursor: 'pointer'
            }}
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages - Enhanced UI with no horizontal scroll */}
          <div style={{
            flex: 1,
            padding: '16px',
            overflowY: 'auto',
            overflowX: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            background: 'linear-gradient(to bottom, #f8fafc, #ffffff)',
            maxWidth: '100%'
          }}>
            {messages.map((message) => (
              <div
                key={message.id}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '8px',
                  flexDirection: message.type === 'user' ? 'row-reverse' : 'row'
                }}
              >
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: message.type === 'user' ? '#3b82f6' : '#f3f4f6',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  {message.type === 'user' ?
                    <User size={16} color="white" /> :
                    <Bot size={16} color="#6b7280" />
                  }
                </div>

                <div style={{
                  background: message.type === 'user'
                    ? 'linear-gradient(135deg, #3b82f6, #2563eb)'
                    : 'linear-gradient(135deg, #f8fafc, #e2e8f0)',
                  color: message.type === 'user' ? 'white' : '#374151',
                  padding: '12px 16px',
                  borderRadius: message.type === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                  maxWidth: '85%',
                  fontSize: '14px',
                  lineHeight: '1.5',
                  whiteSpace: 'pre-wrap',
                  wordWrap: 'break-word',
                  overflowWrap: 'break-word',
                  boxShadow: message.type === 'user'
                    ? '0 4px 12px rgba(59, 130, 246, 0.3)'
                    : '0 2px 8px rgba(0, 0, 0, 0.1)',
                  animation: 'slideIn 0.3s ease-out',
                  border: message.type === 'user' ? 'none' : '1px solid #e2e8f0'
                }}>
                  {message.content}

                  {message.type === 'bot' && (
                    <div style={{
                      display: 'flex',
                      gap: '8px',
                      marginTop: '8px',
                      opacity: 0.6
                    }}>
                      <button
                        onClick={() => copyToClipboard(message.content)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', padding: 0 }}
                        title="Copy text"
                      >
                        <Copy size={14} />
                      </button>
                      <button
                        onClick={() => speak(message.content)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', padding: 0 }}
                        title="Speak text"
                      >
                        <Volume1 size={14} />
                      </button>
                    </div>
                  )}

                  {/* Enhanced Quick Action Buttons */}
                  {message.showButtons && (
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(2, 1fr)',
                      gap: '10px',
                      marginTop: '16px',
                      width: '100%'
                    }}>
                      {quickActions.map((action, index) => (
                        <button
                          key={index}
                          onClick={() => handleQuickAction(action.action)}
                          style={{
                            background: 'linear-gradient(135deg, #10b981, #059669)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '12px',
                            padding: '12px 8px',
                            fontSize: '13px',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            fontWeight: '600',
                            boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
                            transform: 'translateY(0)',
                            animation: `buttonFloat ${2 + index * 0.2}s ease-in-out infinite`,
                            minHeight: '48px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            textAlign: 'center'
                          }}
                          onMouseOver={(e) => {
                            e.target.style.background = 'linear-gradient(135deg, #059669, #047857)';
                            e.target.style.transform = 'translateY(-2px)';
                            e.target.style.boxShadow = '0 6px 16px rgba(16, 185, 129, 0.4)';
                          }}
                          onMouseOut={(e) => {
                            e.target.style.background = 'linear-gradient(135deg, #10b981, #059669)';
                            e.target.style.transform = 'translateY(0)';
                            e.target.style.boxShadow = '0 4px 12px rgba(16, 185, 129, 0.3)';
                          }}
                        >
                          {action.text}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isLoading && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'rgba(59, 130, 246, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Bot size={16} color="#3b82f6" />
                </div>
                <div style={{
                  background: 'rgba(243, 244, 246, 0.8)',
                  padding: '12px 16px',
                  borderRadius: '18px 18px 18px 4px',
                  display: 'flex',
                  gap: '4px',
                  alignItems: 'center'
                }}>
                  <div style={{ width: '6px', height: '6px', background: '#94a3b8', borderRadius: '50%', animation: 'typingDot 1s infinite' }}></div>
                  <div style={{ width: '6px', height: '6px', background: '#94a3b8', borderRadius: '50%', animation: 'typingDot 1s infinite 0.2s' }}></div>
                  <div style={{ width: '6px', height: '6px', background: '#94a3b8', borderRadius: '50%', animation: 'typingDot 1s infinite 0.4s' }}></div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Enhanced Input Area */}
          <div style={{
            padding: '16px',
            borderTop: '1px solid #e5e7eb',
            background: 'linear-gradient(to right, #f8fafc, #ffffff)',
            display: 'flex',
            gap: '12px',
            alignItems: 'center'
          }}>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flex: 1 }}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={isListening ? "Listening..." : "Type your message..."}
                style={{
                  flex: 1,
                  padding: '12px 16px',
                  border: '2px solid' + (isListening ? '#ef4444' : '#e2e8f0'),
                  borderRadius: '25px',
                  fontSize: '14px',
                  outline: 'none',
                  transition: 'all 0.3s ease',
                  background: 'white',
                  boxShadow: isListening ? '0 0 10px rgba(239, 68, 68, 0.2)' : 'none'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#3b82f6';
                  e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = isListening ? '#ef4444' : '#e2e8f0';
                  e.target.style.boxShadow = isListening ? '0 0 10px rgba(239, 68, 68, 0.2)' : 'none';
                }}
              />

              <button
                onClick={toggleListening}
                style={{
                  background: isListening ? '#ef4444' : '#f3f4f6',
                  border: 'none',
                  color: isListening ? 'white' : '#6b7280',
                  borderRadius: '50%',
                  width: '44px',
                  height: '44px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease',
                  animation: isListening ? 'pulse 1.5s infinite' : 'none'
                }}
                title={isListening ? "Stop Listening" : "Voice Search"}
              >
                {isListening ? <MicOff size={18} /> : <Mic size={18} />}
              </button>
            </div>

            <button
              onClick={handleSendMessage}
              disabled={!input.trim() || isLoading}
              style={{
                background: input.trim() && !isLoading
                  ? 'linear-gradient(135deg, #3b82f6, #2563eb)'
                  : '#d1d5db',
                border: 'none',
                color: 'white',
                borderRadius: '50%',
                width: '44px',
                height: '44px',
                cursor: input.trim() && !isLoading ? 'pointer' : 'not-allowed',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease',
                boxShadow: input.trim() && !isLoading
                  ? '0 4px 12px rgba(59, 130, 246, 0.3)'
                  : 'none'
              }}
              onMouseOver={(e) => {
                if (input.trim() && !isLoading) {
                  e.target.style.transform = 'scale(1.05)';
                  e.target.style.boxShadow = '0 6px 16px rgba(59, 130, 246, 0.4)';
                }
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'scale(1)';
                e.target.style.boxShadow = input.trim() && !isLoading
                  ? '0 4px 12px rgba(59, 130, 246, 0.3)'
                  : 'none';
              }}
            >
              <Send size={18} />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

// Wrapped component with error boundary
const AIChatbotWithErrorBoundary = () => (
  <ChatbotErrorBoundary>
    <AIChatbot />
  </ChatbotErrorBoundary>
);

export default AIChatbotWithErrorBoundary;