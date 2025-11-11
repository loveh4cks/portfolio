import React, { useState, useEffect, useRef } from 'react';
import { Shield, Lock, Code, Terminal, Mail, Linkedin, Github, ChevronDown, ExternalLink, Award, Briefcase, GraduationCap, Wrench, Target, Brain, Users, Cpu, Wifi, Radar, Binary, Eye, Zap, Database, Activity } from 'lucide-react';

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [glitchText, setGlitchText] = useState('LOVE');
  const [isClient, setIsClient] = useState(false);
  
  const canvasRef = useRef(null);
  const matrixRef = useRef(null);

  useEffect(() => {
    setIsClient(true);
    document.documentElement.style.fontFamily = "'Space Mono', monospace";
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = document.documentElement.scrollHeight;
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);

    class HexGrid {
      hexagons;
      canvas;
      constructor(canvasElement) {
        this.canvas = canvasElement;
        this.hexagons = [];
        const hexSize = 40;
        const rows = Math.ceil(this.canvas.height / (hexSize * 1.5));
        const cols = Math.ceil(this.canvas.width / (hexSize * Math.sqrt(3)));
        
        for (let row = 0; row < rows; row++) {
          for (let col = 0; col < cols; col++) {
            const x = col * hexSize * Math.sqrt(3) + (row % 2) * (hexSize * Math.sqrt(3) / 2);
            const y = row * hexSize * 1.5;
            this.hexagons.push({
              x, y, size: hexSize,  
              opacity: Math.random() * 0.15, 
              pulse: Math.random() * Math.PI * 2
            });
          }
        }
      }

      draw() {
        this.hexagons.forEach(hex => {
          hex.pulse += 0.03;
          const opacity = Math.cos(hex.pulse) * 0.05 + hex.opacity;  
          
          ctx.strokeStyle = `rgba(52, 211, 153, ${opacity})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          
          for (let i = 0; i < 6; i++) {
            const angle = (Math.PI / 3) * i;
            const x = hex.x + hex.size * Math.cos(angle);
            const y = hex.y + hex.size * Math.sin(angle);
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.closePath();
          ctx.stroke();
        });
      }
    }

    class CircuitLine {
      x;
      y;
      targetX;
      targetY;
      progress;
      speed;
      opacity;
      canvas;
      
      constructor(canvasElement) {
        this.canvas = canvasElement;
        this.x = 0; 
        this.y = 0; 
        this.targetX = 0; 
        this.targetY = 0; 
        this.progress = 0; 
        this.speed = 0; 
        this.opacity = 0; 
        this.reset();
      }

      reset() {
        this.x = Math.random() * this.canvas.width;
        this.y = Math.random() * this.canvas.height;
        this.targetX = Math.random() * this.canvas.width;
        this.targetY = Math.random() * this.canvas.height;
        this.progress = 0;
        this.speed = 0.01 + Math.random() * 0.015;
        this.opacity = Math.random() * 0.5 + 0.5;
      }

      update() {
        this.progress += this.speed;
        if (this.progress >= 1) this.reset();
      }

      draw() {
        const currentX = this.x + (this.targetX - this.x) * this.progress;
        const currentY = this.y + (this.targetY - this.y) * this.progress;
        
        const gradient = ctx.createLinearGradient(this.x, this.y, currentX, currentY);
        gradient.addColorStop(0, `rgba(52, 211, 153, 0)`);
        gradient.addColorStop(0.5, `rgba(52, 211, 153, ${this.opacity})`);
        gradient.addColorStop(1, `rgba(5, 150, 105, ${this.opacity * 0.8})`);
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(currentX, currentY);
        ctx.stroke();

        ctx.fillStyle = `rgba(52, 211, 153, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(currentX, currentY, 3, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const hexGrid = new HexGrid(canvas);
    const circuitLines = Array.from({ length: 30 }, () => new CircuitLine(canvas));

    let animationId;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      hexGrid.draw();
      circuitLines.forEach(line => {
        line.update();
        line.draw();
      });

      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, [isClient]);

  useEffect(() => {
    if (!isClient) return;

    const matrixCanvas = matrixRef.current;
    if (!matrixCanvas) return;

    const ctx = matrixCanvas.getContext('2d');
    if (!ctx) return;
    
    const handleResize = () => {
      matrixCanvas.width = window.innerWidth;
      matrixCanvas.height = window.innerHeight;
    }
    
    handleResize();
    window.addEventListener('resize', handleResize);

    const chars = '01FfAaBbCcDdEeGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz@#$%^&*()_+=-{}[]:;"\'|\\<,>.?/~`';
    const fontSize = 14;
    const columns = matrixCanvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.08)'; 
      ctx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);
      
      ctx.fillStyle = '#34d399';
      ctx.font = fontSize + 'px monospace';

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        if (drops[i] * fontSize > matrixCanvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 30);
    
    return () => {
        clearInterval(interval);
        window.removeEventListener('resize', handleResize);
    };
  }, [isClient]);

  useEffect(() => {
    if (!isClient) return;
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      const sections = ['hero', 'about', 'skills', 'experience', 'projects', 'education', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);

      const canvas = canvasRef.current;
      if (canvas) {
        canvas.height = document.documentElement.scrollHeight;
      }
    };

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isClient]);

  useEffect(() => {
    const interval = setInterval(() => {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*';
      const original = 'LOVE';
      let iterations = 0;
      const glitchInterval = setInterval(() => {
        setGlitchText(original.split('').map((char, index) => {
          if (index < iterations) return original[index];
          return chars[Math.floor(Math.random() * chars.length)];
        }).join(''));
        iterations += 0.5;
        if (iterations >= original.length) {
          setGlitchText(original);
          clearInterval(glitchInterval);
        }
      }, 50);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const skills = {
    cybersecurity: ['Threat Detection', 'Incident Response', 'VAPT', 'Digital Forensics', 'SOC Monitoring', 'IDS/IPS', 'Risk Assessment', 'Security Auditing', 'Log Analysis', 'Threat Intelligence'],
    networking: ['TCP/IP', 'DNS', 'Firewall Configuration', 'Network Traffic Analysis', 'Endpoint Protection', 'Network Hardening'],
    programming: ['Python', 'Bash Scripting', 'PowerShell', 'Automation'],
    tools: ['Splunk', 'Google SecOps', 'Wireshark', 'Nessus', 'Nmap', 'Metasploit', 'Burp Suite', 'Autopsy', 'Hashcat']
  };

  const experiences = [
    {
      title: 'Cybersecurity/Vulnerability Assessment Intern',
      company: 'Hacktify',
      period: '07/2024 – 08/2024',
      achievements: ['Identified and mitigated 5+ security vulnerabilities', 'Conducted penetration tests on 10+ labs', 'Improved organizational security posture'],
      color: 'from-emerald-500 to-green-500'
    },
    {
      title: 'Cybersecurity Analyst Intern',
      company: 'Shadow Fox',
      period: '01/09/2024',
      achievements: ['Hands-on with Wireshark, Metasploit, PE Explorer', 'Completed TryHackMe Basic Pentesting', 'Solved password decryption challenges'],
      color: 'from-green-500 to-teal-500'
    },
    {
      title: 'Cyber Crime Investigation Intern',
      company: 'CFSS Cyber & Forensics',
      period: '06/2024 – 07/2024',
      achievements: ['Analyzed system images for cyber incidents', 'Recovered deleted emails and communications', 'Supported digital forensic investigations'],
      color: 'from-teal-500 to-cyan-500'
    },
    {
      title: 'Python Training Intern',
      company: 'Geeta Technical Hub',
      period: '06/2024 – 08/2024',
      achievements: ['Developed automation scripts', 'Expertise in OOP and data analysis', 'NumPy, Pandas, Matplotlib mastery'],
      color: 'from-cyan-500 to-emerald-500'
    }
  ];

  const projects = [
    { name: 'IDPS with Snort 3', desc: 'Intrusion Detection & Prevention System with custom rules', icon: Shield, tech: ['Snort', 'Linux', 'Network Security'] },
    { name: 'Python Network Sniffer', desc: 'TCP/UDP packet capture and analysis tool', icon: Eye, tech: ['Python', 'Scapy', 'Networking'] },
    { name: 'Geo Location Finder', desc: 'IP geolocation tool for network analysis', icon: Target, tech: ['Python', 'API Integration'] },
    { name: 'Mac Changer Automation', desc: 'Automated MAC address modification script', icon: Lock, tech: ['Bash', 'Linux', 'Security'] },
    { name: 'Basic Encrypter/Decrypter', desc: 'Encryption application with user-friendly interface', icon: Code, tech: ['Python', 'Cryptography'] },
    { name: 'Incident Analysis', desc: 'DNS issue analysis and resolution', icon: Terminal, tech: ['Network Security', 'DNS'] }
  ];

  const certifications = [
    'Network Basics (Cisco)',
    'Play It Safe - Manage Security Risk (Google)',
    'Digital Forensics Associate (CYINTGLOBLE)',
    'RH104: Linux Fundamentals (Red Hat)',
    'Tools of the Trade: Linux and SQL (Google)',
    'Connect And Protect: Networks (Google)',
    'Digital Forensics Fundamentals (Virtual Cyber Labs)'
  ];

  const dataLines = [1, 2, 3, 4, 5, 6, 7, 8];

  if (!isClient) {
    return (
      <div className="min-h-screen bg-black text-emerald-400 font-mono flex items-center justify-center text-2xl">
        <Cpu className="w-8 h-8 mr-4 animate-spin" />
        Initializing Secure Connection...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-slate-100 overflow-x-hidden relative">
      
      <canvas ref={matrixRef} className="fixed inset-0 pointer-events-none z-0 opacity-10" />

      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0 opacity-40" />

      <div className="fixed inset-0 bg-black/80 pointer-events-none z-0"></div> 
      <div className="fixed inset-0 opacity-20 pointer-events-none z-0" style={{
        backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(52, 211, 153, 0.03) 2px, rgba(52, 211, 153, 0.03) 4px)`
      }}></div>

      <div 
        className="fixed w-[600px] h-[600px] rounded-full blur-3xl pointer-events-none transition-all duration-500 ease-out z-0"
        style={{
          left: mousePosition.x - 300,
          top: mousePosition.y - 300,
          background: 'radial-gradient(circle, rgba(52, 211, 153, 0.15) 0%, transparent 70%)'
        }}
      ></div>

      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-black/60 backdrop-blur-2xl border-b border-emerald-500/20 shadow-lg shadow-emerald-500/5' : ''}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400 bg-clip-text text-transparent tracking-tight flex items-center gap-2 animate-pulse">
            <Shield className="w-6 h-6 text-emerald-400" />
            {glitchText}
          </div>
          <div className="hidden md:flex gap-8">
            {['About', 'Skills', 'Experience', 'Projects', 'Education', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className={`text-sm font-medium transition-all hover:text-emerald-400 relative group ${
                  activeSection === item.toLowerCase() ? 'text-emerald-400' : 'text-slate-400'
                }`}
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-400 to-green-500 group-hover:w-full transition-all duration-300 shadow-lg shadow-emerald-500/50"></span>
              </a>
            ))}
          </div>
        </div>
      </nav>

      <section id="hero" className="min-h-screen flex items-center justify-center relative px-6 z-10">
        
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-50">
            {dataLines.map(i => (
                <div 
                    key={i}
                    className="absolute w-[1px] h-full bg-gradient-to-b from-green-400/0 via-green-400/80 to-green-400/0 animate-data-flow"
                    style={{ 
                        left: `${(i * 12.5) + (Math.random() * 5)}%`,
                        animationDelay: `${i * 0.5 + Math.random() * 2}s`,
                        height: `${Math.random() * 80 + 20}%`,
                        top: `${Math.random() * 30}%`
                    }}
                />
            ))}
        </div>

        <div className="max-w-5xl w-full text-center relative z-10 p-8">
          <div className="inline-block mb-6 px-6 py-3 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-emerald-400 text-sm font-medium backdrop-blur-xl shadow-lg shadow-emerald-500/20 animate-pulse">
            <Radar className="inline w-4 h-4 mr-2 animate-ping" style={{ animationDuration: '3s' }} />
            Cybersecurity Specialist
          </div>
          <h1 className="text-7xl md:text-9xl font-black mb-6 bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400 bg-clip-text text-transparent leading-tight tracking-tighter animate-glow">
            {glitchText}
          </h1>
          <div className="flex items-center justify-center gap-3 mb-4">
            <Activity className="w-6 h-6 text-emerald-400 animate-pulse" />
            <p className="text-2xl md:text-3xl text-slate-300 font-light">
              SOC Analyst | VAPT | Digital Forensics
            </p>
            <Activity className="w-6 h-6 text-emerald-400 animate-pulse" />
          </div>
          <p className="text-lg text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Protecting digital assets through advanced threat detection, incident response, and vulnerability assessment. Committed to securing the future, one system at a time.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a href="#contact" className="group px-8 py-4 bg-gradient-to-r from-emerald-500 to-green-600 rounded-lg font-semibold hover:shadow-2xl hover:shadow-emerald-500/50 transition-all hover:-translate-y-1 hover:scale-105 flex items-center gap-2 animate-pulse">
              Get In Touch
              <ExternalLink className="w-4 h-4 group-hover:translate-x-1 group-hover:rotate-12 transition-transform" />
            </a>
            <a href="#projects" className="px-8 py-4 bg-slate-900/50 backdrop-blur-xl border border-emerald-500/30 rounded-lg font-semibold hover:border-emerald-500 hover:bg-emerald-500/10 transition-all hover:-translate-y-1 hover:scale-105 shadow-lg">
              View Projects
            </a>
          </div>
          <div className="flex gap-6 justify-center mt-12 text-emerald-400">
            <a href="mailto:chhokerluv@gmail.com" className="p-4 bg-slate-900/50 backdrop-blur-xl border border-emerald-500/30 rounded-xl hover:border-emerald-500 hover:bg-emerald-500/10 transition-all hover:-translate-y-2 hover:rotate-6 shadow-lg hover:shadow-emerald-500/30">
              <Mail className="w-5 h-5" />
            </a>
            <a href="https://linkedin.com/in/love-4a74622a1/" target="_blank" rel="noopener noreferrer" className="p-4 bg-slate-900/50 backdrop-blur-xl border border-emerald-500/30 rounded-xl hover:border-emerald-500 hover:bg-emerald-500/10 transition-all hover:-translate-y-2 hover:rotate-6 shadow-lg hover:shadow-emerald-500/30">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="https://github.com/loveh4cks" target="_blank" rel="noopener noreferrer" className="p-4 bg-slate-900/50 backdrop-blur-xl border border-emerald-500/30 rounded-xl hover:border-emerald-500 hover:bg-emerald-500/10 transition-all hover:-translate-y-2 hover:rotate-6 shadow-lg hover:shadow-emerald-500/30">
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-emerald-400 drop-shadow-lg" />
        </div>
      </section>

      <section id="about" className="py-32 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold mb-16 text-center bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent animate-glow">
            About Me
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-lg text-slate-300 leading-relaxed animate-fadeIn">
                Results-driven Cybersecurity Analyst with hands-on experience in Security Operations Center (SOC) environments, incident response, and threat analysis.
              </p>
              <p className="text-lg text-slate-300 leading-relaxed animate-fadeIn" style={{ animationDelay: '0.2s' }}>
                Skilled in vulnerability assessment, network monitoring, and SIEM-based threat detection. Adept at analyzing security events, mitigating risks, and enhancing system defenses.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-6">
                <div className="p-4 bg-slate-900/50 backdrop-blur-xl border border-emerald-500/30 rounded-xl hover:border-emerald-500 transition-all shadow-lg group hover:scale-[1.03] hover:shadow-emerald-500/50">
                  <Award className="w-8 h-8 text-emerald-400 mb-2 group-hover:rotate-6 transition-transform" />
                  <div className="text-2xl font-bold text-emerald-400">GDSC</div>
                  <div className="text-sm text-slate-400">Secretary</div>
                </div>
                <div className="p-4 bg-slate-900/50 backdrop-blur-xl border border-green-500/30 rounded-xl hover:border-green-500 transition-all shadow-lg group hover:scale-[1.03] hover:shadow-green-500/50">
                  <Cpu className="w-8 h-8 text-green-400 mb-2 group-hover:rotate-6 transition-transform" />
                  <div className="text-2xl font-bold text-green-400">5+</div>
                  <div className="text-sm text-slate-400">Vulnerabilities Fixed</div>
                </div>
              </div>
            </div>
            
            <div className="relative flex items-center justify-center">
              <div className="aspect-square bg-black/50 rounded-2xl border border-green-500/30 p-8 hover:border-green-400 transition-all shadow-lg flex items-center justify-center">
                <div className="relative w-48 h-48">
                    <Cpu className="w-full h-full text-green-400/80 animate-pulse cpu-glow" strokeWidth={1} style={{ animationDuration: '4s' }} />

                    <div className="absolute inset-0 border-2 border-green-500/50 rounded-full animate-ping-slow" />
                    
                    <div className="absolute inset-4 border-2 border-green-500/50 rounded-full animate-ping-slow" style={{ animationDelay: '1s' }} />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <section id="skills" className="py-32 px-6 relative z-10 bg-gradient-to-b from-transparent via-emerald-950/10 to-transparent">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold mb-16 text-center bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent animate-glow">
            Technical Arsenal
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 bg-slate-900/50 backdrop-blur-xl border border-emerald-500/30 rounded-2xl hover:border-emerald-500 transition-all group hover:scale-[1.03] hover:shadow-2xl hover:shadow-emerald-500/50 duration-300">
              <div className="flex items-center gap-3 mb-6">
                <Shield className="w-8 h-8 text-emerald-400 group-hover:scale-125 group-hover:rotate-6 transition-transform" />
                <h3 className="text-2xl font-bold text-emerald-400">Cybersecurity</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.cybersecurity.map((skill, i) => (
                  <span key={i} className="px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-sm text-emerald-300 hover:bg-emerald-500/20 hover:scale-[1.05] transition-all cursor-default">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-8 bg-slate-900/50 backdrop-blur-xl border border-green-500/30 rounded-2xl hover:border-green-500 transition-all group hover:scale-[1.03] hover:shadow-2xl hover:shadow-green-500/50 duration-300">
              <div className="flex items-center gap-3 mb-6">
                <Wifi className="w-8 h-8 text-green-400 group-hover:scale-125 group-hover:rotate-6 transition-transform" />
                <h3 className="text-2xl font-bold text-green-400">Networking</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.networking.map((skill, i) => (
                  <span key={i} className="px-3 py-1.5 bg-green-500/10 border border-green-500/30 rounded-full text-sm text-green-300 hover:bg-green-500/20 hover:scale-[1.05] transition-all cursor-default">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-8 bg-slate-900/50 backdrop-blur-xl border border-teal-500/30 rounded-2xl hover:border-teal-500 transition-all group hover:scale-[1.03] hover:shadow-2xl hover:shadow-teal-500/50 duration-300">
              <div className="flex items-center gap-3 mb-6">
                <Binary className="w-8 h-8 text-teal-400 group-hover:scale-125 group-hover:rotate-6 transition-transform" />
                <h3 className="text-2xl font-bold text-teal-400">Programming</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.programming.map((skill, i) => (
                  <span key={i} className="px-3 py-1.5 bg-teal-500/10 border border-teal-500/30 rounded-full text-sm text-teal-300 hover:bg-teal-500/20 hover:scale-[1.05] transition-all cursor-default">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-8 bg-slate-900/50 backdrop-blur-xl border border-cyan-500/30 rounded-2xl hover:border-cyan-500 transition-all group hover:scale-[1.03] hover:shadow-2xl hover:shadow-cyan-500/50 duration-300">
              <div className="flex items-center gap-3 mb-6">
                <Wrench className="w-8 h-8 text-cyan-400 group-hover:scale-125 group-hover:rotate-6 transition-transform" />
                <h3 className="text-2xl font-bold text-cyan-400">Tools & Technologies</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.tools.map((skill, i) => (
                  <span key={i} className="px-3 py-1.5 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-sm text-cyan-300 hover:bg-cyan-500/20 hover:scale-[1.05] transition-all cursor-default">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="experience" className="py-32 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold mb-16 text-center bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent animate-glow">
            Experience
          </h2>
          <div className="space-y-8">
            {experiences.map((exp, i) => (
              <div key={i} className="group p-8 bg-slate-900/50 backdrop-blur-xl border border-emerald-500/30 rounded-2xl hover:border-emerald-500 transition-all hover:-translate-y-2 hover:shadow-2xl hover:shadow-emerald-500/50 duration-300">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-100 mb-2 group-hover:text-emerald-400 transition-colors">{exp.title}</h3>
                    <div className={`inline-block px-4 py-1 bg-gradient-to-r ${exp.color} rounded-full text-sm font-medium shadow-lg`}>
                      {exp.company}
                    </div>
                  </div>
                  <div className="text-slate-400 text-sm mt-4 md:mt-0 flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-emerald-400" />
                    {exp.period}
                  </div>
                </div>
                <ul className="space-y-2 mt-6">
                  {exp.achievements.map((achievement, j) => (
                    <li key={j} className="flex items-start gap-3 text-slate-300 hover:text-emerald-300 transition-colors">
                      <Zap className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="py-32 px-6 relative z-10 bg-gradient-to-b from-transparent via-emerald-950/10 to-transparent">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold mb-16 text-center bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent animate-glow">
            Featured Projects
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, i) => (
              <div key={i} className="group p-6 bg-slate-900/50 backdrop-blur-xl border border-emerald-500/30 rounded-2xl hover:border-emerald-500 transition-all hover:-translate-y-3 hover:shadow-2xl hover:shadow-emerald-500/50 cursor-pointer duration-300 hover:rotate-1">
                <div className="w-14 h-14 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-emerald-500/20 group-hover:scale-110 group-hover:rotate-12 transition-all shadow-lg">
                  <project.icon className="w-7 h-7 text-emerald-400" />
                </div>
                <h3 className="text-xl font-bold text-slate-100 mb-2 group-hover:text-emerald-400 transition-colors">{project.name}</h3>
                <p className="text-slate-400 text-sm mb-4">{project.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, j) => (
                    <span key={j} className="px-2 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded text-xs text-emerald-300 hover:bg-emerald-500/20 transition-colors">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="education" className="py-32 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold mb-16 text-center bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent animate-glow">
            Education & Certifications
          </h2>
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="p-8 bg-slate-900/50 backdrop-blur-xl border border-emerald-500/30 rounded-2xl hover:border-emerald-500 transition-all hover:scale-[1.03] hover:shadow-2xl hover:shadow-emerald-500/50 duration-300 group">
              <GraduationCap className="w-12 h-12 text-emerald-400 mb-4 group-hover:rotate-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-bold text-slate-100 mb-2 group-hover:text-emerald-400 transition-colors">B.Tech in Computer Science</h3>
              <p className="text-slate-400">Geeta University, Panipat</p>
              <p className="text-emerald-400 text-sm mt-2 font-semibold">2023 – 2027 (Expected)</p>
            </div>
            <div className="p-8 bg-slate-900/50 backdrop-blur-xl border border-green-500/30 rounded-2xl hover:border-green-500 transition-all group hover:scale-[1.03] hover:shadow-2xl hover:shadow-green-500/50 duration-300">
              <Users className="w-12 h-12 text-green-400 mb-4 group-hover:rotate-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-bold text-slate-100 mb-2 group-hover:text-green-400 transition-colors">Leadership</h3>
              <p className="text-slate-400">Secretary of Google Developer Student Club (GDSC)</p>
              <p className="text-green-400 text-sm mt-2 font-semibold">Leading events and initiatives for student developers</p>
            </div>
          </div>
          <div className="p-8 bg-slate-900/50 backdrop-blur-xl border border-emerald-500/30 rounded-2xl hover:border-emerald-500 transition-all hover:shadow-2xl hover:shadow-emerald-500/50 duration-300">
            <h3 className="text-2xl font-bold text-slate-100 mb-6 flex items-center gap-3">
              <Award className="w-8 h-8 text-emerald-400 animate-pulse" />
              Certifications
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {certifications.map((cert, i) => (
                <div key={i} className="flex items-start gap-3 p-4 bg-slate-900/80 rounded-xl border border-emerald-500/20 hover:border-emerald-500 hover:bg-emerald-500/5 transition-all hover:scale-[1.03] hover:shadow-lg hover:shadow-emerald-500/20 group">
                  <Database className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0 group-hover:rotate-180 transition-transform duration-500" />
                  <span className="text-slate-300 text-sm group-hover:text-emerald-300 transition-colors">{cert}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-32 px-6 relative z-10 bg-gradient-to-b from-transparent via-emerald-950/10 to-transparent">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-8 bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent animate-glow">
            Let's Connect
          </h2>
          <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto">
            Interested in collaboration or have a security challenge? Let's discuss how we can work together to secure your digital infrastructure.
          </p>
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <a href="mailto:chhokerluv@gmail.com" className="p-8 bg-slate-900/50 backdrop-blur-xl border border-emerald-500/30 rounded-2xl hover:border-emerald-500 transition-all hover:-translate-y-3 hover:shadow-2xl hover:shadow-emerald-500/50 group hover:rotate-2 duration-300">
              <Mail className="w-10 h-10 text-emerald-400 mx-auto mb-3 group-hover:scale-125 group-hover:rotate-12 transition-transform" />
              <div className="text-sm text-slate-400 mb-2 group-hover:text-emerald-400 transition-colors">Email</div>
              <div className="text-slate-200 text-sm break-all group-hover:text-emerald-300 transition-colors">chhokerluv@gmail.com</div>
            </a>
            <a href="tel:+919254477727" className="p-8 bg-slate-900/50 backdrop-blur-xl border border-green-500/30 rounded-2xl hover:border-green-500 transition-all hover:-translate-y-3 hover:shadow-2xl hover:shadow-green-500/50 group hover:rotate-2 duration-300">
              <Terminal className="w-10 h-10 text-green-400 mx-auto mb-3 group-hover:scale-125 group-hover:rotate-12 transition-transform" />
              <div className="text-sm text-slate-400 mb-2 group-hover:text-green-400 transition-colors">Phone</div>
              <div className="text-slate-200 group-hover:text-green-300 transition-colors">+91 9254477727</div>
            </a>
            <a href="https://linkedin.com/in/love-4a74622a1/" target="_blank" rel="noopener noreferrer" className="p-8 bg-slate-900/50 backdrop-blur-xl border border-teal-500/30 rounded-2xl hover:border-teal-500 transition-all hover:-translate-y-3 hover:shadow-2xl hover:shadow-teal-500/50 group hover:rotate-2 duration-300">
              <Linkedin className="w-10 h-10 text-teal-400 mx-auto mb-3 group-hover:scale-125 group-hover:rotate-12 transition-transform" />
              <div className="text-sm text-slate-400 mb-2 group-hover:text-teal-400 transition-colors">LinkedIn</div>
              <div className="text-slate-200 group-hover:text-teal-300 transition-colors">Connect with me</div>
            </a>
          </div>
          <div className="flex items-center justify-center gap-2 text-slate-500 text-sm">
            <Target className="w-4 h-4 text-emerald-400 animate-pulse" />
            Panipat, Haryana, India
          </div>
        </div>
      </section>

      <footer className="py-12 px-6 border-t border-emerald-500/20 text-center text-slate-400 relative z-10 bg-black/50 backdrop-blur-xl">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Shield className="w-5 h-5 text-emerald-400 animate-pulse" />
          <p className="text-emerald-400 font-semibold">LOVE</p>
        </div>
        <p>&copy; 2024 Love. All rights reserved. Built with Next.js & Tailwind CSS</p>
        <div className="mt-4 flex items-center justify-center gap-4">
          <Lock className="w-4 h-4 text-emerald-400/50" />
          <span className="text-xs text-slate-500">Secured & Encrypted</span>
          <Lock className="w-4 h-4 text-emerald-400/50" />
        </div>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap');
        
        .cpu-glow {
            filter: drop-shadow(0 0 8px rgba(52, 211, 153, 0.8));
        }
        
        @keyframes glow {
          0%, 100% { text-shadow: 0 0 20px rgba(16, 185, 129, 0.5); }
          50% { text-shadow: 0 0 40px rgba(16, 185, 129, 0.8); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes data-flow {
          0% { transform: translateY(-100%) scaleY(0.1); opacity: 0; }
          50% { opacity: 0.8; }
          100% { transform: translateY(100vh) scaleY(0.1); opacity: 0; }
        }
        @keyframes ping-slow {
            0% { transform: scale(1); opacity: 0.7; }
            100% { transform: scale(2.5); opacity: 0; }
        }

        .animate-glow { animation: glow 2s ease-in-out infinite; }
        .animate-fadeIn { animation: fadeIn 0.8s ease-out forwards; }
        .animate-data-flow { animation: data-flow 5s linear infinite; }
        .animate-ping-slow { animation: ping-slow 4s cubic-bezier(0, 0, 0.2, 1) infinite; }
      `}</style>
    </div>
  );
};

export default Portfolio;																																															
