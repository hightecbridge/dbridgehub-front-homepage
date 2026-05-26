import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation, Link } from 'react-router-dom';
import './App.css';

const NAV_LINKS = [
  { label: '서비스', hash: 'services' },
  { label: '개인정보처리방침', path: '/privacy' },
];

const SERVICES = [
  {
    icon: '₩',
    title: '수강료 청구 및 결제 관리',
    desc: '청구·수납·납부 현황을 한곳에서 관리하고 결제 흐름을 정리합니다.',
    tag: 'Billing',
  },
  {
    icon: '◆',
    title: '미납자 자동 관리',
    desc: '미납 내역을 파악하고 안내·독촉까지 체계적으로 관리합니다.',
    tag: 'Auto',
  },
  {
    icon: '📣',
    title: '학부모 공지 및 알림 발송',
    desc: '공지·알림을 빠르게 전달하고 소통 이력을 남깁니다.',
    tag: 'Notice',
  },
  {
    icon: '📊',
    title: '학원 운영 데이터 관리',
    desc: '수강·매출 등 운영 지표를 모아 보고 의사결정을 돕습니다.',
    tag: 'Data',
  },
  {
    icon: '📱',
    title: '모바일 앱 연동 지원',
    desc: '모바일 환경에서도 주요 업무와 알림을 활용할 수 있습니다.',
    tag: 'Mobile',
  },
];

const SOLUTIONS = [];

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
        <div className="hero-badge">Academy SaaS</div>
        <h1 className="hero-title">
          학원 운영과 수납을 <span className="hero-accent">한 번에</span> 관리하세요
        </h1>
        <p className="hero-desc">
          디브릿지허브는 학원을 위한 통합 관리 SaaS 플랫폼입니다.
        </p>
        <p className="hero-desc hero-desc-sub">
          수강료 청구, 결제 관리, 학부모 소통까지 하나로 해결하세요.
        </p>
        <div className="hero-actions">
          <button type="button" className="btn-secondary" onClick={() => document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' })}>
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

function Services() {
  const [ref, inView] = useInView();
  return (
    <section className="services-section" id="services" ref={ref}>
      <div className="section-inner">
        <div className={`section-header ${inView ? 'visible' : ''}`}>
          <span className="section-tag">SERVICES</span>
          <h2 className="section-title">핵심 서비스</h2>
          <p className="section-desc">
            디브릿지허브는 학원 운영을 효율적으로 관리할 수 있도록 돕는 SaaS(Software as a Service) 플랫폼입니다.
          </p>
          <p className="section-desc">
            학원은 디브릿지허브를 통해 수강료 청구, 결제 관리, 공지 발송 등을 간편하게 수행할 수 있으며,
            <br />
            학부모와의 소통을 더욱 효율적으로 관리할 수 있습니다.
          </p>
          <p className="section-desc">
            본 서비스는 소프트웨어 이용 서비스이며, 학원 사업자를 대상으로 월 이용요금을 부과합니다.
          </p>
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

function Pricing() {
  const [ref, inView] = useInView();

  return (
    <section className="pricing-section" id="pricing" ref={ref}>
      <div className="section-inner">
        <div className={`section-header ${inView ? 'visible' : ''}`}>
          <span className="section-tag">PRICING</span>
          <h2 className="section-title">요금 안내</h2>
          <p className="section-desc">
            디브릿지허브는 학원 운영을 위한 SaaS 서비스로,
            <br />
            월 이용요금 기반으로 제공됩니다.
          </p>
          <p className="section-desc">
            요금은 학원 규모 및 이용 기능에 따라 달라질 수 있으며,
            <br />
            자세한 내용은 문의를 통해 안내드립니다.
          </p>
        </div>
      </div>
    </section>
  );
}

function PaymentGuide() {
  const [ref, inView] = useInView();
  return (
    <section className="payment-guide-section" id="payment" ref={ref}>
      <div className="section-inner">
        <div className={`section-header ${inView ? 'visible' : ''}`}>
          <span className="section-tag">PAYMENT</span>
          <h2 className="section-title">결제 안내</h2>
          <p className="section-desc">
            디브릿지허브는 소프트웨어 이용 서비스로서,
            <br />
            학원 사업자를 대상으로 월 이용요금을 청구합니다.
          </p>
          <p className="section-desc">
            학부모의 수강료 결제는 각 학원이 계약한 PG를 통해 직접 이루어지며,
            <br />
            디브릿지허브는 해당 결제 대금을 수취하거나 중개하지 않습니다.
          </p>
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
            본 약관은 디브릿지허브(이하 “회사”)가 제공하는 서비스의 이용과 관련하여 회사와 이용자 간의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.
          </p>

          <h3>제2조 (정의)</h3>
          <p>
            “서비스”란 회사가 제공하는 데이터 관리, 학원관리 및 관련 온라인 서비스를 의미합니다.<br />
            “이용자”란 본 약관에 따라 회사가 제공하는 서비스를 이용하는 회원 및 비회원을 말합니다.
          </p>

          <h3>제3조 (약관의 효력 및 변경)</h3>
          <p>
            본 약관은 서비스 화면에 게시하거나 기타 방법으로 이용자에게 공지함으로써 효력이 발생합니다.<br />
            회사는 관련 법령을 위반하지 않는 범위에서 약관을 변경할 수 있습니다.
          </p>

          <h3>제4조 (서비스의 제공)</h3>
          <p>회사는 다음과 같은 서비스를 제공합니다.</p>
          <ul>
            <li>학원 관리 시스템 제공</li>
            <li>데이터 관리 및 분석 서비스</li>
            <li>기타 회사가 정하는 서비스</li>
          </ul>

          <h3>제5조 (서비스 이용 및 제한)</h3>
          <p>
            이용자는 관계 법령 및 본 약관을 준수하여야 하며, 서비스의 정상적인 운영을 방해하는 행위를 해서는 안 됩니다.
          </p>

          <h3>제6조 (결제 및 이용요금)</h3>
          <p>
            서비스 이용에 대한 요금은 회사가 정한 정책에 따릅니다.<br />
            결제는 카드, 계좌이체 등 회사가 제공하는 방법을 통해 이루어집니다.
          </p>

          <h3>제7조 (환불 및 청약철회)</h3>
          <p>환불 및 청약철회는 회사의 환불정책에 따릅니다.</p>

          <h3>제8조 (서비스 중단)</h3>
          <p>회사는 시스템 점검, 장애, 기타 불가피한 사유로 서비스 제공을 일시적으로 중단할 수 있습니다.</p>

          <h3>제9조 (면책조항)</h3>
          <p>
            회사는 천재지변, 불가항력적 사유 등으로 서비스를 제공할 수 없는 경우, 관련 법령이 허용하는 범위 내에서 책임을 지지 않습니다.
          </p>

          <h3>제10조 (준거법 및 관할)</h3>
          <p>
            본 약관은 대한민국 법률에 따라 해석되며, 분쟁 발생 시 회사 소재지를 관할하는 법원을 관할 법원으로 합니다.
          </p>

          <h3>제11조 (회원 관리)</h3>
          <p>회사는 이용자의 개인정보를 보호하기 위해 관련 법령을 준수합니다.</p>
          <p>
            이용자는 서비스 이용 시 제공한 정보에 대해 정확성을 유지할 책임이 있으며, 타인의 정보를 도용하거나 허위 정보를 입력해서는 안 됩니다.
          </p>

          <h3>제12조 (서비스 변경 및 종료)</h3>
          <p>회사는 운영상 또는 기술상의 필요에 따라 서비스의 전부 또는 일부를 변경하거나 종료할 수 있습니다.</p>
          <p>이 경우 회사는 사전에 홈페이지를 통해 공지합니다.</p>

          <h3>부칙</h3>
          <p>본 약관은 2026년 4월 2일부터 시행합니다.</p>
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
          <p>회사는 서비스 이용 과정에서 다음과 같은 개인정보를 수집할 수 있습니다.</p>
          <ul>
            <li>필수 항목: 담당자명, 연락처</li>
            <li>선택 항목: 학원명, 문의 내용</li>
            <li>자동 수집 항목: IP 주소, 쿠키, 접속 로그</li>
          </ul>
          <p>개인정보는 홈페이지 문의, 이메일, 전화 등을 통해 수집될 수 있습니다.</p>

          <h3>2. 개인정보의 수집 및 이용 목적</h3>
          <p>회사는 수집한 개인정보를 다음의 목적을 위해 이용합니다.</p>
          <ul>
            <li>서비스 및 솔루션 관련 문의 응대</li>
            <li>서비스 제안 및 상담 진행</li>
            <li>계약 체결 및 이행을 위한 연락</li>
            <li>서비스 제공 및 운영 관리</li>
          </ul>

          <h3>3. 개인정보의 보유 및 이용 기간</h3>
          <p>
            회사는 개인정보 수집 및 이용 목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다.
          </p>
          <p>단, 관련 법령에 따라 아래와 같이 일정 기간 보관할 수 있습니다.</p>
          <ul>
            <li>계약 또는 청약철회 등에 관한 기록: 5년</li>
            <li>대금 결제 및 재화 등의 공급에 관한 기록: 5년</li>
            <li>소비자 불만 또는 분쟁 처리에 관한 기록: 3년</li>
          </ul>

          <h3>4. 개인정보의 제3자 제공</h3>
          <p>회사는 이용자의 개인정보를 원칙적으로 외부에 제공하지 않습니다.</p>
          <p>다만, 다음의 경우에는 예외로 합니다.</p>
          <ul>
            <li>이용자가 사전에 동의한 경우</li>
            <li>법령에 의거하거나 수사기관의 요청이 있는 경우</li>
          </ul>

          <h3>5. 개인정보 처리 위탁</h3>
          <p>회사는 원활한 서비스 제공을 위해 다음과 같이 개인정보 처리 업무를 위탁할 수 있습니다.</p>
          <ul>
            <li>AWS (Amazon Web Services): 서버 운영 및 데이터 보관</li>
            <li>문자 발송 서비스 업체: 알림 및 문자 발송</li>
            <li>결제대행사 (PG사): 결제 처리 (해당 시)</li>
          </ul>
          <p>회사는 위탁 계약 시 개인정보 보호 관련 법령을 준수하도록 관리·감독합니다.</p>

          <h3>6. 개인정보의 파기 절차 및 방법</h3>
          <p>
            회사는 개인정보 보유 기간의 경과, 처리 목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체 없이 해당 정보를 파기합니다.
          </p>
          <ul>
            <li>전자적 파일 형태: 복구 및 재생이 불가능한 기술적 방법으로 삭제</li>
            <li>종이 문서: 분쇄 또는 소각</li>
          </ul>

          <h3>7. 이용자의 권리와 행사 방법</h3>
          <p>이용자는 언제든지 자신의 개인정보에 대해 열람, 정정, 삭제, 처리정지를 요청할 수 있습니다.</p>
          <p>관련 요청은 아래 연락처를 통해 가능합니다.</p>
          <ul>
            <li>이메일: apporty@gmail.com</li>
            <li>전화: 010-5029-9455</li>
          </ul>

          <h3>8. 개인정보의 안전성 확보 조치</h3>
          <p>회사는 개인정보의 안전한 처리를 위하여 다음과 같은 조치를 취하고 있습니다.</p>
          <ul>
            <li>접근 권한 관리 및 최소 권한 원칙 적용</li>
            <li>개인정보 암호화 및 네트워크 보안 적용</li>
            <li>정기적인 보안 점검 및 내부 관리 계획 수립</li>
          </ul>

          <h3>9. 쿠키의 사용</h3>
          <p>회사는 이용자에게 보다 나은 서비스 제공을 위해 쿠키를 사용할 수 있습니다.</p>

          <h3>10. 개인정보 보호책임자</h3>
          <p>
            회사는 개인정보 처리에 관한 업무를 총괄하고, 이용자의 불만 처리 및 피해 구제를 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.
          </p>
          <ul>
            <li>성명: 장경수</li>
            <li>연락처: 010-5029-9455</li>
            <li>이메일: apporty@gmail.com</li>
          </ul>

          <h3>11. 회사 정보</h3>
          <ul>
            <li>상호: 디브릿지허브</li>
            <li>대표자: 장경수</li>
            <li>사업자등록번호: 599-26-02056</li>
            <li>사업장 주소: 서울특별시 동대문구 장안벗꽃로5길, 19 103동 2107호</li>
          </ul>

          <h3>12. 개인정보 처리방침의 변경</h3>
          <p>
            본 개인정보처리방침은 관련 법령, 회사 정책 또는 서비스 내용의 변경에 따라 수정될 수 있습니다.
          </p>
          <p>변경 시 홈페이지를 통해 공지합니다.</p>

          <p className="privacy-meta">
            시행일: 2026-04-02<br />
            최종 수정일: 2026-04-02
          </p>
        </div>
      </div>
    </section>
  );
}

function homepageConsultSubmitUrl() {
  const base = process.env.REACT_APP_API_BASE_URL;
  if (base) return `${base.replace(/\/$/, '')}/homepage/consults`;
  if (process.env.NODE_ENV === 'development') return 'http://localhost:8080/api/homepage/consults';
  return '/api/homepage/consults';
}

function Contact() {
  const [ref, inView] = useInView();
  const [form, setForm] = useState({ name: '', phone: '', academyName: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(null);
    const messageParts = [];
    if (form.academyName.trim()) messageParts.push(`학원명: ${form.academyName.trim()}`);
    if (form.message.trim()) messageParts.push(form.message.trim());
    const combinedMessage = messageParts.length ? messageParts.join('\n\n') : undefined;
    const body = {
      name: form.name.trim(),
      phone: form.phone.trim(),
      message: combinedMessage,
      source: 'dbridgehub-homepage',
    };
    try {
      const res = await fetch(homepageConsultSubmitUrl(), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(body),
      });
      let data = {};
      try {
        data = await res.json();
      } catch (_) {
        /* non-JSON */
      }
      if (!res.ok || data.success === false) {
        setSubmitError(data.message || `접수에 실패했습니다. (${res.status})`);
        return;
      }
      setSubmitted(true);
    } catch (err) {
      setSubmitError(err.message || '네트워크 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="contact-section" id="contact" ref={ref}>
      <div className="section-inner">
        <div className={`section-header ${inView ? 'visible' : ''}`}>
          <span className="section-tag">CONTACT</span>
          <h2 className="section-title">서비스 도입이 필요하신가요?</h2>
          <p className="section-desc">
            간단한 상담을 통해 학원에 맞는 최적의 운영 방안을 안내드립니다.
          </p>
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
                    onChange={e => setForm({ ...form, name: e.target.value })} disabled={submitting} />
                </div>
                <div className="form-group">
                  <label>연락처 *</label>
                  <input type="tel" required placeholder="010-0000-0000" value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value })} disabled={submitting} />
                </div>
              </div>
              <div className="form-group">
                <label>학원명</label>
                <input type="text" placeholder="○○학원" value={form.academyName}
                  onChange={e => setForm({ ...form, academyName: e.target.value })} disabled={submitting} />
              </div>
              <div className="form-group">
                <label>문의 내용</label>
                <textarea rows="4" placeholder="도입을 검토 중인 서비스나 궁금한 점을 입력해 주세요."
                  value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                  disabled={submitting} />
              </div>
              {submitError ? <p className="contact-form-error" role="alert">{submitError}</p> : null}
              <button type="submit" className="btn-submit" disabled={submitting}>
                {submitting ? '접수 중…' : '무료 상담 신청하기'}
              </button>
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
      <div className="footer-bottom">
        <p>© 2026 디브릿지허브. All rights reserved.</p>
        <div className="footer-legal">
          <Link to="/privacy">개인정보처리방침</Link>
          <Link to="/terms">이용약관</Link>
          <Link to="/refund">환불정책</Link>
        </div>
        <div className="footer-company">
          <div className="footer-company-row footer-company-row--emph"><strong>상호명</strong>: 디브릿지허브</div>
          <div className="footer-company-row footer-company-row--emph"><strong>대표자</strong>: 장경수</div>
          <div className="footer-company-row footer-company-row--emph"><strong>사업자등록번호</strong>: 599-26-02056</div>
          <div className="footer-company-row footer-company-row--emph"><strong>통신판매업신고번호</strong>: 제2026-서울동대문-0901호</div>
          <div className="footer-company-row footer-company-row--emph"><strong>주소</strong>: 서울특별시 동대문구 장안벗꽃로5길, 19 103동 2107호</div>
          <div className="footer-company-row footer-company-row--emph"><strong>이메일</strong>: apporty@gmail.com</div>
          <div className="footer-company-row footer-company-row--emph"><strong>전화번호</strong>: 010-5029-9455</div>
          <div className="footer-company-row footer-company-row--emph"><strong>호스팅 제공자</strong>: AWS</div>
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
      <Services />
      <Pricing />
      <PaymentGuide />
      <Tech />
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

function Refund() {
  const [ref, inView] = useInView();
  return (
    <section className="refund-section" id="refund" ref={ref}>
      <div className="section-inner">
        <div className={`section-header ${inView ? 'visible' : ''}`}>
          <span className="section-tag">REFUND</span>
          <h2 className="section-title">환불 정책</h2>
        </div>
        <div className={`refund-content ${inView ? 'visible' : ''}`}>
          <h1>환불 정책</h1>
          <p>서비스 이용과 관련된 환불 절차 및 규정을 안내합니다.</p>
          <p>회사는 전자상거래법 등 관련 법령에 따라 다음과 같은 환불 정책을 적용합니다.</p>

          <p>디브릿지허브는 SaaS 서비스로서 월 이용요금 기반으로 제공됩니다.</p>
          <p>
            결제 후 서비스가 개시된 경우,<br />
            이미 사용된 기간에 대해서는 환불이 제한될 수 있습니다.
          </p>
          <p>
            단, 서비스 장애 또는 회사의 귀책 사유로 정상적인 서비스 이용이 불가능한 경우,<br />
            관련 법령에 따라 환불이 진행될 수 있습니다.
          </p>

          <h3>1. 환불 가능 기간</h3>
          <p>결제일로부터 7일 이내 청약철회가 가능합니다.</p>
          <p>
            다만, 전자상거래법 등 관련 법령에 따라 청약철회가 제한될 수 있습니다.
          </p>

          <h3>2. 환불 기준</h3>
          <ul>
            <li>서비스 미사용: 전액 환불</li>
            <li>일부 사용: 이용분 차감 후 환불</li>
          </ul>

          <h3>3. 환불 제한</h3>
          <p>다음의 경우 환불이 제한될 수 있습니다.</p>
          <ul>
            <li>이용자의 귀책 사유로 서비스 이용이 불가능한 경우</li>
          </ul>

          <p>※ 서비스 이용이 시작된 경우에도 이용분을 제외한 금액은 환불됩니다.</p>

          <h3>4. 환불 방법</h3>
          <p>
            환불은 이메일 또는 고객센터를 통해 요청할 수 있으며, 결제 수단과 동일한 방법으로 진행됩니다.
          </p>

          <h3>5. 환불 기간</h3>
          <p>환불 요청 후 3~7 영업일 이내 처리됩니다.</p>

          <h3>6. 문의</h3>
          <p>환불 관련 문의는 아래로 연락 바랍니다.</p>

          <ul>
            <li>이메일: apporty@gmail.com</li>
            <li>전화번호: 010-5029-9455</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function RefundPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="app">
      <Navbar />
      <Refund />
      <Footer />
    </div>
  );
}

function AppsPrivacyStaticPage() {
  const [html, setHtml] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/apps/privacy/document.txt`)
      .then((res) => {
        if (!res.ok) throw new Error('failed');
        return res.text();
      })
      .then(setHtml)
      .catch(() => setError(true));
  }, []);

  if (error) {
    return <p style={{ padding: '2rem', textAlign: 'center' }}>개인정보처리방침을 불러오지 못했습니다.</p>;
  }
  if (!html) return null;

  return (
    <iframe
      title="개인정보처리방침"
      srcDoc={html}
      style={{ width: '100%', height: '100vh', border: 'none', display: 'block' }}
    />
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
      <Route path="/refund" element={<RefundPage />} />
      <Route path="/apps/privacy" element={<AppsPrivacyStaticPage />} />
      <Route path="/apps/privacy/" element={<AppsPrivacyStaticPage />} />
      <Route path="/apps/privacy/index.html" element={<AppsPrivacyStaticPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
