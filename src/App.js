import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation, Link } from 'react-router-dom';
import './App.css';

const NAV_LINKS = [
  { label: '서비스', hash: 'services' },
  { label: '고객사례', hash: 'cases' },
  { label: '개인정보처리방침', path: '/privacy' },
];

const SERVICES = [
  {
    icon: '⬡',
    title: '서비스 통합 구현',
    desc: '여러 SaaS·레거시 시스템을 하나의 흐름으로 연결하는 엔드투엔드 서비스 통합을 제공합니다.',
    tag: 'Integration',
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
    icon: '₩',
    title: '결제 API 서비스',
    desc: '국내외 PG사와 연동되는 통합 결제 API로 카드·계좌이체·간편결제를 한 번에 지원합니다.',
    tag: 'Payment',
  },
];

const STATS = [
  { value: '안정적', label: '서비스 운영' },
  { value: '신속한', label: '요청 처리' },
  { value: '대량 처리', label: '데이터 흐름 지원' },
];

const SOLUTIONS = [];

const CASES = [
  {
    industry: '금융',
    title: '실시간 리스크 모니터링',
    desc: '금융사의 거래 데이터를 근실시간으로 분석하여 이상 거래를 빠르게 탐지할 수 있도록 지원',
    metric: '이상 징후 대응 속도 향상',
  },
  {
    industry: '커머스',
    title: '개인화 추천 엔진',
    desc: '구매 패턴 데이터를 통합 분석하여 개인화 추천 품질을 높이는 추천 환경을 제공합니다',
    metric: '전환율 개선에 기여',
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
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const handleNav = (link) => {
    setMenuOpen(false);
    if (link.path) {
      navigate(link.path);
      return;
    }
    if (link.hash) {
      if (location.pathname !== '/') {
        navigate({ pathname: '/', hash: `#${link.hash}` });
      } else {
        document.getElementById(link.hash)?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-inner">
        <Link
          className="nav-logo"
          to="/"
          onClick={(e) => {
            if (location.pathname === '/') {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
        >
          <span className="logo-mark">DBH</span>
          <span className="logo-text">디브릿지허브</span>
        </Link>
        <ul className="nav-links">
          {NAV_LINKS.map(l => (
            <li key={l.label}>
              <button type="button" onClick={() => handleNav(l)}>{l.label}</button>
            </li>
          ))}
        </ul>
        <a href="/#contact" className="nav-cta" onClick={(e) => { e.preventDefault(); handleNav({ hash: 'contact' }); }}>
          무료 상담
        </a>
        <button type="button" className={`hamburger ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="메뉴">
          <span /><span /><span />
        </button>
      </div>
      {menuOpen && (
        <div className="mobile-menu">
          {NAV_LINKS.map(l => (
            <button type="button" key={l.label} onClick={() => handleNav(l)}>{l.label}</button>
          ))}
          <button type="button" className="mobile-cta" onClick={() => handleNav({ hash: 'contact' })}>무료 상담 신청</button>
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
          서비스의 흐름을<br />
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
              ['AES-256 암호화', '보안이 필요한 구간의 데이터 전송 및 저장 시 강력한 암호화를 적용할 수 있는 구조를 지향합니다.'],
              ['안정적인 서비스 운영', '상시 모니터링과 자동 복구 체계를 설계하여 다운타임을 줄이도록 노력합니다.'],
              ['재해복구 및 백업', '중요 데이터에 대해 복구 전략과 백업 정책을 수립할 수 있는 환경을 제공합니다.'],
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
          <p className="section-desc">다양한 산업에서 입증된 디브릿지허브의 성과</p>
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

function Terms() {
  const [ref, inView] = useInView();
  return (
    <section className="terms-section" id="terms" ref={ref}>
      <div className="section-inner">
        <div className={`section-header ${inView ? 'visible' : ''}`}>
          <span className="section-tag">TERMS</span>
          <h2 className="section-title">이용약관</h2>
          <p className="section-desc">
            디브릿지허브가 제공하는 서비스의 이용 조건을 안내합니다.
          </p>
        </div>
        <div className={`terms-content ${inView ? 'visible' : ''}`}>
          <h3>제1조 (목적)</h3>
          <p>
            본 약관은 디브릿지허브(이하 &quot;회사&quot;)가 제공하는 서비스 이용과 관련하여 회사와 이용자의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.
          </p>

          <h3>제2조 (서비스 내용)</h3>
          <p>회사는 학원 관리 시스템 및 관련 서비스를 제공합니다.</p>

          <h3>제3조 (회원가입 및 관리)</h3>
          <p>이용자는 회사가 정한 절차에 따라 회원가입을 할 수 있으며, 정보는 사실에 기반해야 합니다.</p>

          <h3>제4조 (서비스 이용)</h3>
          <p>회사는 안정적인 서비스 제공을 위해 노력하며, 불가피한 경우 서비스가 중단될 수 있습니다.</p>

          <h3>제5조 (결제 및 환불)</h3>
          <p>서비스 이용에 따른 결제 및 환불 정책은 별도로 안내합니다.</p>

          <h3>제6조 (이용자의 의무)</h3>
          <p>이용자는 관련 법령 및 본 약관을 준수해야 하며, 서비스 운영을 방해하는 행위를 해서는 안 됩니다.</p>

          <h3>제7조 (책임의 제한)</h3>
          <p>회사는 천재지변 등 불가항력으로 발생한 손해에 대해 책임을 지지 않습니다.</p>

          <h3>제8조 (분쟁 해결)</h3>
          <p>
            본 약관과 관련된 분쟁은 대한민국 법을 따르며, 관할 법원은 회사 소재지를 기준으로 합니다.
          </p>
        </div>
      </div>
    </section>
  );
}

function Privacy() {
  const [ref, inView] = useInView();
  return (
    <section className="privacy-section" id="privacy" ref={ref}>
      <div className="section-inner">
        <div className={`section-header ${inView ? 'visible' : ''}`}>
          <span className="section-tag">PRIVACY</span>
          <h2 className="section-title">개인정보 처리방침</h2>
          <p className="section-desc">
            디브릿지허브(이하 &quot;회사&quot;)는 이용자의 개인정보를 소중하게 생각하며, 관련 법령을 준수하기 위해 노력합니다.
          </p>
        </div>
        <div className={`privacy-content ${inView ? 'visible' : ''}`}>
          <h3>1. 수집하는 개인정보의 항목 및 수집 방법</h3>
          <p>
            회사는 문의 및 상담을 위해 아래와 같은 정보를 제공받을 수 있습니다. 현재 웹사이트의 문의 양식은 브라우저 화면 내에서만 동작하며, 별도의 서버로 자동 저장 또는 전송되는 기능은 제공하지 않습니다.
          </p>
          <ul>
            <li>필수 항목: 담당자명, 회사명, 이메일 주소</li>
            <li>선택 항목: 문의 내용</li>
          </ul>

          <h3>2. 개인정보의 수집 및 이용 목적</h3>
          <p>회사는 이용자가 별도의 연락 수단(이메일, 전화 등)을 통해 정보를 전달하는 경우, 이를 다음의 목적 범위 내에서만 이용합니다.</p>
          <ul>
            <li>서비스 및 솔루션 관련 문의에 대한 상담 및 회신</li>
            <li>서비스 제안, 도입 검토를 위한 커뮤니케이션</li>
            <li>계약 체결 및 이행을 위한 연락</li>
          </ul>

          <h3>3. 개인정보의 보유 및 이용 기간</h3>
          <p>
            회사는 개인정보 수집 및 이용 목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다.
            단, 관계 법령에 따라 보존할 필요가 있는 경우 아래와 같이 일정 기간 보관합니다.
          </p>
          <ul>
            <li>계약 또는 청약철회 등에 관한 기록: 5년</li>
            <li>대금 결제 및 재화 등의 공급에 관한 기록: 5년</li>
            <li>소비자 불만 또는 분쟁 처리에 관한 기록: 3년</li>
          </ul>

          <h3>4. 개인정보의 제3자 제공 및 처리 위탁</h3>
          <p>
            회사는 이용자의 개인정보를 원칙적으로 외부에 제공하지 않습니다. 다만, 다음의 경우에는 예외로 합니다.
          </p>
          <ul>
            <li>이용자가 사전에 동의한 경우</li>
            <li>법령의 규정에 의거하거나, 수사 목적으로 법령에 정해진 절차와 방법에 따라 요구가 있는 경우</li>
          </ul>

          <p>
            회사는 원활한 서비스 제공을 위해 아래와 같이 개인정보 처리 업무를 위탁하고 있습니다.
          </p>
          <ul>
            <li>AWS (Amazon Web Services): 서버 및 데이터 저장</li>
            <li>문자 발송 서비스 업체: 문자 발송 처리</li>
          </ul>
          <p>
            회사는 위탁 계약 시 개인정보 보호 관련 법령을 준수하도록 관리하고 있습니다.
          </p>

          <h3>5. 이용자의 권리와 행사 방법</h3>
          <p>
            이용자는 언제든지 자신의 개인정보에 대한 열람, 정정, 삭제, 처리정지를 요청할 수 있습니다. 관련 요청은 아래 연락처로 문의해 주시기 바랍니다.
          </p>
          <ul>
            <li>이메일: apporty@gmail.com</li>
            <li>전화: 010-5029-9455</li>
          </ul>

          <h3>6. 개인정보의 안전성 확보 조치</h3>
          <p>회사는 개인정보의 안전한 처리를 위하여 합리적인 보호 조치를 마련하기 위해 노력합니다.</p>
          <ul>
            <li>접근 권한 관리 및 최소 권한 원칙 적용</li>
            <li>암호화 및 네트워크 보안 조치</li>
            <li>정기적인 보안 점검 및 내부 관리 계획 수립</li>
          </ul>

          <h3>7. 개인정보 보호책임자</h3>
          <p>회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 이용자의 불만 처리 및 피해 구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.</p>
          <ul>
            <li>개인정보 보호책임자 성명: 장경수</li>
            <li>연락처: 010-5029-9455</li>
            <li>이메일: apporty@gmail.com</li>
          </ul>

          <h3>8. 개인정보 처리방침의 변경</h3>
          <p>
            본 개인정보 처리방침은 관련 법령, 회사 정책, 서비스 내용의 변경에 따라 수정될 수 있으며, 중요한 변경 사항이 있을 경우 홈페이지를 통해 공지합니다.
          </p>

          <p className="privacy-meta">
            시행일: 2025-01-01<br />
            최종 수정일: 2026-04-02
          </p>
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
                <p>apporty@gmail.com</p>
              </div>
            </div>
            <div className="info-item">
              <span className="info-icon">📞</span>
              <div>
                <strong>전화</strong>
                <p>010-5029-9455</p>
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
          <span className="logo-text">디브릿지허브</span>
          <p>서비스의 흐름을 연결하는 엔터프라이즈 플랫폼</p>
        </div>
        <div className="footer-links">
          <div className="footer-col">
            <strong>서비스</strong>
            <Link to="/#services">서비스 통합 구현</Link>
            <Link to="/#services">API 게이트웨이</Link>
            <Link to="/#services">실시간 분석</Link>
            <Link to="/#services">결제 API 서비스</Link>
          </div>
          <div className="footer-col">
            <strong>회사</strong>
            <Link to="/#cases">고객 사례</Link>
            <Link to="/#tech">기술 소개</Link>
          </div>
          <div className="footer-col">
            <strong>지원</strong>
            <Link to="/#contact">문의하기</Link>
            <Link to="/#contact">기술 지원</Link>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2025 디브릿지허브. All rights reserved.</p>
        <div className="footer-legal">
          <Link to="/privacy">개인정보처리방침</Link>
          <Link to="/terms">이용약관</Link>
        </div>
        <div className="footer-company">
          <div className="footer-company-row footer-company-row--emph"><strong>상호명</strong>: 디브릿지허브</div>
          <div className="footer-company-row footer-company-row--emph"><strong>대표자</strong>: 장경수</div>
          <div className="footer-company-row footer-company-row--emph"><strong>사업자등록번호</strong>: 599-26-02056</div>
          <div className="footer-company-row footer-company-row--emph"><strong>주소</strong>: 서울특별시 동대문구 장안벗꽃로5길, 19 103동 2107호</div>
          <div className="footer-company-row footer-company-row--emph"><strong>이메일</strong>: apporty@gmail.com</div>
          <div className="footer-company-row footer-company-row--emph"><strong>전화번호</strong>: 010-5029-9455</div>
        </div>
      </div>
    </footer>
  );
}

function HomePage() {
  const location = useLocation();

  useEffect(() => {
    const hash = location.hash;
    if (!hash || hash === '#') return;
    const id = hash.replace(/^#/, '');
    const target = document.getElementById(id);
    if (target) {
      const t = setTimeout(() => {
        target.scrollIntoView({ behavior: 'smooth' });
      }, 0);
      return () => clearTimeout(t);
    }
  }, [location.hash]);

  return (
    <div className="app">
      <Navbar />
      <Hero />
      <Stats />
      <Services />
      <Tech />
      <Cases />
      <Contact />
      <Footer />
    </div>
  );
}

function PrivacyPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="app">
      <Navbar />
      <Privacy />
      <Footer />
    </div>
  );
}

function TermsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="app">
      <Navbar />
      <Terms />
      <Footer />
    </div>
  );
}

export default function App() {
  const location = useLocation();
  if (location.pathname === '/' && location.hash === '#privacy') {
    return <Navigate to="/privacy" replace />;
  }
  if (location.pathname === '/' && location.hash === '#terms') {
    return <Navigate to="/terms" replace />;
  }

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/privacy" element={<PrivacyPage />} />
      <Route path="/terms" element={<TermsPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
