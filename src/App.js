import React, { useState, useEffect, useRef } from 'react';
import './App.css';

const NAV_LINKS = [
  { label: '서비스', href: '#services' },
  { label: '솔루션', href: '#solutions' },
  { label: '기술', href: '#tech' },
  { label: '고객사례', href: '#cases' },
  { label: '문의', href: '#contact' },
];

const SERVICES = [
  {
    icon: '⬡',
    title: '데이터 파이프라인',
    desc: '다양한 소스의 데이터를 실시간으로 수집·정제·전달하는 자동화 파이프라인을 구축합니다.',
    tag: 'Pipeline',
  },
  {
    icon: '◈',
    title: 'API 게이트웨이',
    desc: '레거시 시스템부터 클라우드 서비스까지 단일 API 허브로 통합 연결합니다.',
    tag: 'Integration',
  },
  {
    icon: '◉',
    title: '실시간 분석',
    desc: '스트리밍 데이터를 즉시 분석하여 인사이트를 도출하는 실시간 대시보드를 제공합니다.',
    tag: 'Analytics',
  },
  {
    icon: '⬢',
    title: '데이터 보안',
    desc: '엔드-투-엔드 암호화와 접근 제어로 데이터 전송의 보안을 완벽하게 보장합니다.',
    tag: 'Security',
  },
];

const STATS = [
  { value: '99.99%', label: '서비스 가동률' },
  { value: '2.3ms', label: '평균 응답속도' },
  { value: '500+', label: '기업 고객사' },
  { value: '10B+', label: '일일 데이터 처리' },
];

const SOLUTIONS = [
  { name: 'AWS', category: 'Cloud' },
  { name: 'Azure', category: 'Cloud' },
  { name: 'GCP', category: 'Cloud' },
  { name: 'Kafka', category: 'Streaming' },
  { name: 'Spark', category: 'Processing' },
  { name: 'Airflow', category: 'Orchestration' },
  { name: 'dbt', category: 'Transform' },
  { name: 'Snowflake', category: 'Warehouse' },
  { name: 'Databricks', category: 'ML Platform' },
];

const CASES = [
  {
    industry: '금융',
    title: '실시간 리스크 모니터링',
    desc: '글로벌 금융사의 거래 데이터를 실시간 분석하여 이상 거래를 0.1초 내 탐지',
    metric: '탐지 속도 94% 향상',
  },
  {
    industry: '커머스',
    title: '개인화 추천 엔진',
    desc: '구매 패턴 데이터를 통합 분석하여 전환율을 극대화하는 실시간 추천 시스템 구축',
    metric: '전환율 3.2배 증가',
  },
  {
    industry: '제조',
    title: '스마트 팩토리 IIoT',
    desc: '공장 내 수천 개 센서 데이터를 통합 수집·분석하여 설비 고장을 사전 예측',
    metric: '다운타임 78% 감소',
  },
];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const handleNav = (href) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-inner">
        <a className="nav-logo" href="#top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <span className="logo-mark">DBH</span>
          <span className="logo-text">데이터 브릿지 허브</span>
        </a>
        <ul className="nav-links">
          {NAV_LINKS.map(l => (
            <li key={l.label}>
              <button onClick={() => handleNav(l.href)}>{l.label}</button>
            </li>
          ))}
        </ul>
        <a href="#contact" className="nav-cta" onClick={(e) => { e.preventDefault(); handleNav('#contact'); }}>
          무료 상담
        </a>
        <button className={`hamburger ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="메뉴">
          <span /><span /><span />
        </button>
      </div>
      {menuOpen && (
        <div className="mobile-menu">
          {NAV_LINKS.map(l => (
            <button key={l.label} onClick={() => handleNav(l.href)}>{l.label}</button>
          ))}
          <button className="mobile-cta" onClick={() => handleNav('#contact')}>무료 상담 신청</button>
        </div>
      )}
    </nav>
  );
}

function Hero() {
  const [ref, inView] = useInView(0.1);
  return (
    <section className="hero" id="top" ref={ref}>
      <div className="hero-grid-bg" />
      <div className={`hero-content ${inView ? 'visible' : ''}`}>
        <div className="hero-badge">Enterprise Data Platform</div>
        <h1 className="hero-title">
          데이터의 흐름을<br />
          <span className="hero-accent">하나로 연결</span>합니다
        </h1>
        <p className="hero-desc">
          분산된 데이터 소스를 통합하고, 실시간으로 분석하며,<br className="pc-only" />
          비즈니스 인사이트를 즉시 전달하는 엔터프라이즈 데이터 플랫폼
        </p>
        <div className="hero-actions">
          <button className="btn-primary" onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}>
            무료 데모 신청
          </button>
          <button className="btn-secondary" onClick={() => document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' })}>
            서비스 보기 →
          </button>
        </div>
      </div>
      <div className={`hero-visual ${inView ? 'visible' : ''}`}>
        <HeroVisual />
      </div>
    </section>
  );
}

function HeroVisual() {
  return (
    <div className="bridge-visual">
      <svg viewBox="0 0 320 280" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="glow1" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#00d4ff" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="glow2" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
          </radialGradient>
          <filter id="blur1">
            <feGaussianBlur stdDeviation="8" />
          </filter>
        </defs>

        {/* Background circles */}
        <circle cx="160" cy="140" r="110" stroke="#00d4ff" strokeOpacity="0.08" strokeWidth="1" />
        <circle cx="160" cy="140" r="80" stroke="#00d4ff" strokeOpacity="0.12" strokeWidth="1" />
        <circle cx="160" cy="140" r="50" stroke="#00d4ff" strokeOpacity="0.18" strokeWidth="1" />

        {/* Glow bg */}
        <ellipse cx="160" cy="140" rx="90" ry="90" fill="url(#glow1)" filter="url(#blur1)" />

        {/* Connection lines */}
        <line x1="30" y1="60" x2="140" y2="130" stroke="#00d4ff" strokeOpacity="0.4" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="30" y1="140" x2="140" y2="140" stroke="#00d4ff" strokeOpacity="0.4" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="30" y1="220" x2="140" y2="155" stroke="#00d4ff" strokeOpacity="0.4" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="290" y1="60" x2="180" y2="130" stroke="#7c3aed" strokeOpacity="0.4" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="290" y1="140" x2="180" y2="140" stroke="#7c3aed" strokeOpacity="0.4" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="290" y1="220" x2="180" y2="155" stroke="#7c3aed" strokeOpacity="0.4" strokeWidth="1" strokeDasharray="4 4" />

        {/* Source nodes left */}
        {[60, 140, 220].map((y, i) => (
          <g key={i}>
            <rect x="10" y={y - 16} width="40" height="32" rx="6" fill="#0a0e1a" stroke="#00d4ff" strokeOpacity="0.5" strokeWidth="1" />
            <text x="30" y={y + 5} textAnchor="middle" fill="#00d4ff" fontSize="9" fontFamily="monospace" opacity="0.8">
              {['API', 'DB', 'IoT'][i]}
            </text>
          </g>
        ))}

        {/* Target nodes right */}
        {[60, 140, 220].map((y, i) => (
          <g key={i}>
            <rect x="270" y={y - 16} width="40" height="32" rx="6" fill="#0a0e1a" stroke="#7c3aed" strokeOpacity="0.5" strokeWidth="1" />
            <text x="290" y={y + 5} textAnchor="middle" fill="#a78bfa" fontSize="9" fontFamily="monospace" opacity="0.8">
              {['DW', 'ML', 'BI'][i]}
            </text>
          </g>
        ))}

        {/* Center hub */}
        <circle cx="160" cy="140" r="28" fill="#0a0e1a" stroke="#00d4ff" strokeWidth="1.5" />
        <circle cx="160" cy="140" r="20" fill="#00d4ff" fillOpacity="0.08" />
        <text x="160" y="136" textAnchor="middle" fill="#00d4ff" fontSize="8" fontFamily="monospace" fontWeight="bold">DBH</text>
        <text x="160" y="148" textAnchor="middle" fill="#00d4ff" fontSize="7" fontFamily="monospace" opacity="0.6">HUB</text>

        {/* Animated dots on lines */}
        <circle cx="85" cy="95" r="3" fill="#00d4ff" opacity="0.8">
          <animateMotion dur="2s" repeatCount="indefinite" path="M0,0 L110,35" />
        </circle>
        <circle cx="85" cy="140" r="3" fill="#00d4ff" opacity="0.8">
          <animateMotion dur="2.5s" repeatCount="indefinite" path="M0,0 L110,0" />
        </circle>
        <circle cx="85" cy="185" r="3" fill="#7c3aed" opacity="0.8">
          <animateMotion dur="1.8s" repeatCount="indefinite" path="M170,80 L60,25" begin="0.5s" />
        </circle>
      </svg>
    </div>
  );
}

function Stats() {
  const [ref, inView] = useInView();
  return (
    <section className="stats-section" ref={ref}>
      <div className="stats-inner">
        {STATS.map((s, i) => (
          <div key={i} className={`stat-item ${inView ? 'visible' : ''}`} style={{ animationDelay: `${i * 0.1}s` }}>
            <div className="stat-value">{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Services() {
  const [ref, inView] = useInView();
  return (
    <section className="services-section" id="services" ref={ref}>
      <div className="section-inner">
        <div className={`section-header ${inView ? 'visible' : ''}`}>
          <span className="section-tag">SERVICES</span>
          <h2 className="section-title">핵심 서비스</h2>
          <p className="section-desc">데이터의 수집부터 활용까지, 전체 파이프라인을 커버하는 통합 솔루션</p>
        </div>
        <div className="services-grid">
          {SERVICES.map((s, i) => (
            <div key={i} className={`service-card ${inView ? 'visible' : ''}`} style={{ animationDelay: `${i * 0.12}s` }}>
              <div className="service-icon">{s.icon}</div>
              <div className="service-tag">{s.tag}</div>
              <h3 className="service-title">{s.title}</h3>
              <p className="service-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Solutions() {
  const [ref, inView] = useInView();
  return (
    <section className="solutions-section" id="solutions" ref={ref}>
      <div className="section-inner">
        <div className={`section-header ${inView ? 'visible' : ''}`}>
          <span className="section-tag">INTEGRATIONS</span>
          <h2 className="section-title">기술 스택 통합</h2>
          <p className="section-desc">주요 클라우드 및 데이터 플랫폼과 즉시 연동 가능합니다</p>
        </div>
        <div className="solutions-grid">
          {SOLUTIONS.map((s, i) => (
            <div key={i} className={`solution-chip ${inView ? 'visible' : ''}`} style={{ animationDelay: `${i * 0.07}s` }}>
              <span className="chip-name">{s.name}</span>
              <span className="chip-cat">{s.category}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Tech() {
  const [ref, inView] = useInView();
  return (
    <section className="tech-section" id="tech" ref={ref}>
      <div className="section-inner tech-inner">
        <div className={`tech-text ${inView ? 'visible' : ''}`}>
          <span className="section-tag">TECHNOLOGY</span>
          <h2 className="section-title">엔터프라이즈급<br />인프라 보안</h2>
          <ul className="tech-list">
            {[
              ['AES-256 암호화', '모든 데이터 전송 및 저장 시 군사급 암호화 적용'],
              ['SOC 2 Type II 인증', '국제 보안 표준 준수 및 정기 감사 완료'],
              ['99.99% SLA 보장', '24/7 모니터링과 자동 복구로 다운타임 최소화'],
              ['멀티 리전 DR', '재해복구 자동화로 데이터 손실 없는 비즈니스 연속성'],
            ].map(([title, desc], i) => (
              <li key={i} className={`tech-item ${inView ? 'visible' : ''}`} style={{ animationDelay: `${0.2 + i * 0.1}s` }}>
                <span className="tech-dot" />
                <div>
                  <strong>{title}</strong>
                  <p>{desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className={`tech-visual ${inView ? 'visible' : ''}`}>
          <div className="security-badge">
            <div className="badge-ring ring1" />
            <div className="badge-ring ring2" />
            <div className="badge-ring ring3" />
            <div className="badge-center">
              <span className="badge-icon">🔒</span>
              <span className="badge-label">SECURE</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Cases() {
  const [ref, inView] = useInView();
  return (
    <section className="cases-section" id="cases" ref={ref}>
      <div className="section-inner">
        <div className={`section-header ${inView ? 'visible' : ''}`}>
          <span className="section-tag">CASE STUDIES</span>
          <h2 className="section-title">고객 성공 사례</h2>
          <p className="section-desc">다양한 산업에서 입증된 데이터 브릿지 허브의 성과</p>
        </div>
        <div className="cases-grid">
          {CASES.map((c, i) => (
            <div key={i} className={`case-card ${inView ? 'visible' : ''}`} style={{ animationDelay: `${i * 0.15}s` }}>
              <div className="case-industry">{c.industry}</div>
              <h3 className="case-title">{c.title}</h3>
              <p className="case-desc">{c.desc}</p>
              <div className="case-metric">{c.metric}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [ref, inView] = useInView();
  const [form, setForm] = useState({ name: '', company: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="contact-section" id="contact" ref={ref}>
      <div className="section-inner">
        <div className={`section-header ${inView ? 'visible' : ''}`}>
          <span className="section-tag">CONTACT</span>
          <h2 className="section-title">무료 상담 신청</h2>
          <p className="section-desc">전문 컨설턴트가 귀사에 최적화된 데이터 솔루션을 제안해 드립니다</p>
        </div>
        <div className={`contact-wrapper ${inView ? 'visible' : ''}`}>
          {submitted ? (
            <div className="submit-success">
              <div className="success-icon">✓</div>
              <h3>문의가 접수되었습니다</h3>
              <p>영업일 기준 1일 이내 담당자가 연락드립니다.</p>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>담당자명 *</label>
                  <input type="text" required placeholder="홍길동" value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })} />
                </div>
                <div className="form-group">
                  <label>회사명 *</label>
                  <input type="text" required placeholder="(주)회사명" value={form.company}
                    onChange={e => setForm({ ...form, company: e.target.value })} />
                </div>
              </div>
              <div className="form-group">
                <label>이메일 *</label>
                <input type="email" required placeholder="email@company.com" value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })} />
              </div>
              <div className="form-group">
                <label>문의 내용</label>
                <textarea rows="4" placeholder="도입을 검토 중인 서비스나 궁금한 점을 입력해 주세요."
                  value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
              </div>
              <button type="submit" className="btn-submit">무료 상담 신청하기</button>
            </form>
          )}
          <div className="contact-info">
            <div className="info-item">
              <span className="info-icon">📧</span>
              <div>
                <strong>이메일</strong>
                <p>contact@databridgehub.kr</p>
              </div>
            </div>
            <div className="info-item">
              <span className="info-icon">📞</span>
              <div>
                <strong>전화</strong>
                <p>02-1234-5678</p>
              </div>
            </div>
            <div className="info-item">
              <span className="info-icon">🕐</span>
              <div>
                <strong>운영시간</strong>
                <p>평일 09:00 – 18:00</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <span className="logo-mark">DBH</span>
          <span className="logo-text">데이터 브릿지 허브</span>
          <p>데이터의 흐름을 연결하는 엔터프라이즈 플랫폼</p>
        </div>
        <div className="footer-links">
          <div className="footer-col">
            <strong>서비스</strong>
            <a href="#services">데이터 파이프라인</a>
            <a href="#services">API 게이트웨이</a>
            <a href="#services">실시간 분석</a>
            <a href="#services">데이터 보안</a>
          </div>
          <div className="footer-col">
            <strong>회사</strong>
            <a href="#cases">고객 사례</a>
            <a href="#tech">기술 소개</a>
            <a href="#contact">파트너십</a>
            <a href="#contact">채용</a>
          </div>
          <div className="footer-col">
            <strong>지원</strong>
            <a href="#contact">문의하기</a>
            <a href="#contact">기술 지원</a>
            <a href="#contact">문서 센터</a>
            <a href="#contact">커뮤니티</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2025 데이터 브릿지 허브. All rights reserved.</p>
        <div className="footer-legal">
          <a href="#top">개인정보처리방침</a>
          <a href="#top">이용약관</a>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div className="app">
      <Navbar />
      <Hero />
      <Stats />
      <Services />
      <Solutions />
      <Tech />
      <Cases />
      <Contact />
      <Footer />
    </div>
  );
}
