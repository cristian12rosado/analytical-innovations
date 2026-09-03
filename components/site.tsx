'use client';
import { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Blocks,
  Braces,
  Check,
  ChevronRight,
  Database,
  Globe2,
  Mail,
  MapPin,
  Menu,
  Phone,
  Server,
  Sparkles,
  Workflow,
  X,
} from 'lucide-react';

const routes = [
  ['Home', '/'],
  ['About', '/about'],
  ['Services', '/services'],
  ['Work', '/work'],
  ['How We Work', '/how-we-work'],
  ['Contact', '/contact'],
] as const;
const services = [
  {
    icon: Globe2,
    title: 'Web Application Development',
    text: 'Full-stack software built for performance, security, and everyday usability.',
    tag: 'Applications',
  },
  {
    icon: Blocks,
    title: 'Internal Tools & Dashboards',
    text: 'Purpose-built interfaces that replace brittle spreadsheets and disconnected workflows.',
    tag: 'Applications',
  },
  {
    icon: Database,
    title: 'Data Engineering & Integration',
    text: 'Reliable models, pipelines, and connections that make your systems work as one.',
    tag: 'Data',
  },
  {
    icon: Workflow,
    title: 'Workflow Automation',
    text: 'Thoughtful automations that remove repetitive work while keeping people in control.',
    tag: 'Automation',
  },
  {
    icon: Braces,
    title: 'API & Backend Development',
    text: 'Clean, documented services and dependable infrastructure for products that need to scale.',
    tag: 'Applications',
  },
  {
    icon: Sparkles,
    title: 'Technical Consulting',
    text: 'Clear architecture, discovery, and delivery guidance for complex technical decisions.',
    tag: 'Advisory',
  },
];
const work = [
  {
    title: 'Operations Command Center',
    type: 'Dashboard',
    desc: 'A unified operational view for KPIs, queues, exceptions, and team visibility.',
    art: 'chart',
  },
  {
    title: 'Internal Management Portal',
    type: 'Web App',
    desc: 'One secure workspace for tasks, records, documents, and approvals.',
    art: 'portal',
  },
  {
    title: 'Data Pipeline Automation',
    type: 'Automation',
    desc: 'A monitored flow that validates, transforms, and routes critical data.',
    art: 'flow',
  },
  {
    title: 'Executive Performance View',
    type: 'Dashboard',
    desc: 'Decision-ready metrics with trends, targets, and useful drill-downs.',
    art: 'bars',
  },
  {
    title: 'Client Reporting System',
    type: 'Web App',
    desc: 'A focused reporting experience that turns complex data into clear stories.',
    art: 'report',
  },
  {
    title: 'Integration Control Plane',
    type: 'Backend',
    desc: 'A resilient layer for APIs, schedules, failures, and data movement.',
    art: 'nodes',
  },
];

function Logo() {
  return (
    <a className="logo" href="/" aria-label="Analytical Innovations home">
      <span className="logo-mark">
        A<i>i</i>
      </span>
      <span>
        ANALYTICAL
        <br />
        INNOVATIONS
      </span>
    </a>
  );
}
function Header({ path }: { path: string }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <Logo />
      <nav className={open ? 'nav open' : 'nav'} aria-label="Main navigation">
        {routes.map(([label, href]) => (
          <a
            key={href}
            href={href}
            className={path === href ? 'active' : ''}
            onClick={() => setOpen(false)}
          >
            {label}
          </a>
        ))}
        <a className="nav-cta" href="/contact">
          Let&apos;s build <ArrowUpRight size={14} />
        </a>
      </nav>
      <button
        className="menu"
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        {open ? <X /> : <Menu />}
      </button>
    </header>
  );
}
function Network({ small = false }: { small?: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const x = c.getContext('2d');
    if (!x) return;
    let raf = 0,
      p = { x: 0.65, y: 0.5 };
    const draw = () => {
      const d = Math.min(devicePixelRatio, 2),
        w = c.clientWidth,
        h = c.clientHeight;
      if (c.width !== w * d || c.height !== h * d) {
        c.width = w * d;
        c.height = h * d;
        x.setTransform(d, 0, 0, d, 0, 0);
      }
      x.clearRect(0, 0, w, h);
      const rows = small ? 10 : 20,
        cols = small ? 24 : 42;
      for (let y = 0; y < rows; y++) {
        x.beginPath();
        for (let i = 0; i < cols; i++) {
          const px = (i / (cols - 1)) * w,
            dist = Math.abs(px / w - p.x),
            py =
              (y / (rows - 1)) * h +
              Math.sin(i * 0.48 + y * 0.72 + performance.now() * 0.00035) *
                12 *
                (1 - dist * 0.7) +
              Math.exp(-dist * 5) * Math.sin(y * 0.65) * 32;
          i ? x.lineTo(px, py) : x.moveTo(px, py);
        }
        x.strokeStyle = `rgba(21,210,231,${0.08 + (y / rows) * 0.28})`;
        x.lineWidth = 0.7;
        x.stroke();
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    const move = (e: PointerEvent) => {
      const r = c.getBoundingClientRect();
      p = {
        x: (e.clientX - r.left) / r.width,
        y: (e.clientY - r.top) / r.height,
      };
    };
    c.addEventListener('pointermove', move);
    return () => {
      cancelAnimationFrame(raf);
      c.removeEventListener('pointermove', move);
    };
  }, [small]);
  return <canvas className="network" ref={ref} aria-hidden="true" />;
}
function Button({
  children,
  href = '/contact',
  ghost = false,
}: {
  children: React.ReactNode;
  href?: string;
  ghost?: boolean;
}) {
  return (
    <a className={ghost ? 'button ghost' : 'button'} href={href}>
      {children}
      <ArrowRight size={15} />
    </a>
  );
}
function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="eyebrow">
      <span />
      {children}
    </p>
  );
}
function Reveal({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`reveal ${className}`}>{children}</div>;
}
function Shell({
  path,
  children,
}: {
  path: string;
  children: React.ReactNode;
}) {
  useEffect(() => {
    const o = new IntersectionObserver(
      (es) =>
        es.forEach((e) => e.isIntersecting && e.target.classList.add('shown')),
      { threshold: 0.08 },
    );
    document.querySelectorAll('.reveal').forEach((el) => o.observe(el));
    return () => o.disconnect();
  }, [path]);
  return (
    <div className="site">
      <Header path={path} />
      <main key={path} className="page-enter">
        {children}
      </main>
      <Footer />
    </div>
  );
}

function Home() {
  return (
    <>
      <section className="hero">
        <Network />
        <div className="hero-copy">
          <Eyebrow>Independent software studio</Eyebrow>
          <h1>
            Custom software.
            <br />
            Intelligent systems.
            <br />
            <em>Built</em> for how you work.
          </h1>
          <p>
            We design and build internal tools, web applications, data systems,
            and automation that turn complexity into momentum.
          </p>
          <div className="actions">
            <Button>Start a project</Button>
            <Button href="/work" ghost>
              Explore our work
            </Button>
          </div>
        </div>
        <div className="hero-index">
          <span>01</span>
          <i />
          <small>Strategy · Systems · Software</small>
        </div>
      </section>
      <section className="tech-strip" aria-label="Technology stack">
        {[
          'Python',
          'TypeScript',
          'React',
          'PostgreSQL',
          'APIs',
          'Cloud',
          'Automation',
        ].map((t, i) => (
          <span key={t}>
            <i>0{i + 1}</i>
            {t}
          </span>
        ))}
      </section>
      <section className="section">
        <Reveal>
          <Eyebrow>What we build</Eyebrow>
          <div className="section-heading">
            <h2>
              Software shaped around
              <br />
              the work itself.
            </h2>
            <p>
              No bloated platforms. No off-the-shelf compromises. Just focused
              systems designed around your team, data, and decisions.
            </p>
          </div>
        </Reveal>
        <div className="service-row">
          {services.slice(0, 4).map((s, i) => (
            <Reveal key={s.title} className="service-card">
              <span className="card-no">0{i + 1}</span>
              <s.icon />
              <h3>{s.title}</h3>
              <p>{s.text}</p>
              <ChevronRight className="corner" />
            </Reveal>
          ))}
        </div>
      </section>
      <section className="featured">
        <Reveal className="project-visual">
          <DashboardArt />
        </Reveal>
        <Reveal className="featured-copy">
          <Eyebrow>Featured concept</Eyebrow>
          <h2>
            Operations
            <br />
            Command Center
          </h2>
          <p>
            A unified operational platform that brings reporting, exceptions,
            workflow status, and key decisions into one calm interface.
          </p>
          <div className="chips">
            <span>React</span>
            <span>Python</span>
            <span>PostgreSQL</span>
            <span>REST API</span>
          </div>
          <Button href="/work" ghost>
            View project
          </Button>
        </Reveal>
      </section>
      <section className="manifesto">
        <Reveal>
          <Eyebrow>Our point of view</Eyebrow>
          <h2>
            Useful technology should feel
            <br />
            obvious after it exists.
          </h2>
        </Reveal>
        <div className="principle-grid">
          {[
            [
              'Clarity first',
              'Every screen and system should make the next action easier.',
            ],
            [
              'Built to last',
              'Maintainable foundations, documented decisions, and sensible ownership.',
            ],
            [
              'Your operation, amplified',
              'Technology should strengthen how your people already create value.',
            ],
          ].map(([a, b]) => (
            <Reveal className="quote-card" key={a}>
              <span>“</span>
              <h3>{a}</h3>
              <p>{b}</p>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
function About() {
  return (
    <>
      <section className="intro split">
        <Reveal>
          <Eyebrow>About the studio</Eyebrow>
          <h1>
            Small by design.
            <br />
            <em>Serious</em> by default.
          </h1>
          <p>
            Analytical Innovations is a Puerto Rico–based software studio
            focused on building custom systems that fit the way organizations
            actually operate.
          </p>
        </Reveal>
        <Reveal className="code-scene">
          <div className="code-window">
            <i />
            <i />
            <i />
            <pre>{`01  function solve(problem) {\n02    const context = listen();\n03    const system = design(context);\n04    return build(system);\n05  }`}</pre>
          </div>
          <Network small />
        </Reveal>
      </section>
      <section className="section">
        <div className="principles-list">
          {[
            [
              'Pragmatic',
              'Solutions that solve real constraints—not theoretical ones.',
            ],
            ['Disciplined', 'Clean code, clear data, deliberate design.'],
            [
              'Confidential',
              'Your systems, strategy, and operational details stay yours.',
            ],
            [
              'Collaborative',
              'The people closest to the work stay close to the process.',
            ],
          ].map(([a, b], i) => (
            <Reveal className="principle" key={a}>
              <span>0{i + 1}</span>
              <div>
                <h3>{a}</h3>
                <p>{b}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="statement">
        <Reveal>
          <p>Our role isn&apos;t to sell you more technology.</p>
          <h2>It&apos;s to make the right technology feel inevitable.</h2>
        </Reveal>
      </section>
    </>
  );
}
function Services() {
  const [filter, setFilter] = useState('All');
  const filters = ['All', 'Applications', 'Data', 'Automation', 'Advisory'];
  const shown = services.filter((s) => filter === 'All' || filter === s.tag);
  return (
    <>
      <section className="intro">
        <Reveal>
          <Eyebrow>Capabilities</Eyebrow>
          <h1>
            We build the systems
            <br />
            between <em>idea</em> and impact.
          </h1>
          <p>
            From focused applications to connected data infrastructure, every
            engagement is designed around a real operational outcome.
          </p>
        </Reveal>
      </section>
      <section className="section services-section">
        <div className="filters" role="group" aria-label="Filter services">
          {filters.map((f) => (
            <button
              key={f}
              className={filter === f ? 'active' : ''}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="services-grid">
          {shown.map((s, i) => (
            <Reveal className="service-card large" key={s.title}>
              <span className="card-no">0{i + 1}</span>
              <s.icon />
              <small>{s.tag}</small>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
              <div className="card-link">
                Discuss a project <ArrowUpRight size={15} />
              </div>
            </Reveal>
          ))}
        </div>
      </section>
      <CTA />
    </>
  );
}
function DashboardArt({ kind = 'chart' }: { kind?: string }) {
  return (
    <div className={`dash-art ${kind}`}>
      <div className="dash-side">
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>
      <div className="dash-main">
        <div className="dash-top">
          <i />
          <i />
          <i />
        </div>
        <div className="mini-cards">
          <b />
          <b />
          <b />
        </div>
        <svg
          viewBox="0 0 400 130"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d="M0 103 L48 83 L82 92 L125 48 L163 72 L206 38 L247 58 L294 26 L339 48 L400 12" />
          <path
            className="area"
            d="M0 103 L48 83 L82 92 L125 48 L163 72 L206 38 L247 58 L294 26 L339 48 L400 12 L400 130 L0 130Z"
          />
        </svg>
        <div className="dash-bars">
          {[42, 76, 58, 92, 64, 85, 51, 78].map((h, i) => (
            <i key={i} style={{ height: `${h}%` }} />
          ))}
        </div>
      </div>
    </div>
  );
}
function Work() {
  const [filter, setFilter] = useState('All');
  const filters = ['All', 'Web App', 'Dashboard', 'Automation', 'Backend'];
  const shown = work.filter((w) => filter === 'All' || w.type === filter);
  return (
    <>
      <section className="intro">
        <Reveal>
          <Eyebrow>Selected work</Eyebrow>
          <h1>
            Systems designed to
            <br />
            <em>earn</em> their place.
          </h1>
          <p>
            A portfolio of product concepts showing how we approach operational
            software, data, automation, and decision support.
          </p>
        </Reveal>
      </section>
      <section className="section work-section">
        <div className="filters">
          {filters.map((f) => (
            <button
              key={f}
              className={filter === f ? 'active' : ''}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="work-grid">
          {shown.map((p, i) => (
            <Reveal className="work-card" key={p.title}>
              <div className="work-art">
                <DashboardArt kind={p.art} />
                <span>{p.type}</span>
              </div>
              <div className="work-body">
                <small>Concept 0{i + 1}</small>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
                <a href="/contact">
                  Explore the approach <ArrowUpRight size={14} />
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
      <CTA />
    </>
  );
}
function Process() {
  const steps = [
    [
      'Discover',
      'Understand the work, constraints, users, and desired outcome.',
    ],
    [
      'Design',
      'Shape the solution, system boundaries, data flow, and experience.',
    ],
    [
      'Build',
      'Develop in clear increments, review often, and test the real workflow.',
    ],
    [
      'Deploy',
      'Launch carefully, document decisions, and make ownership straightforward.',
    ],
    [
      'Support',
      'Improve where it matters and stay available as the system evolves.',
    ],
  ];
  return (
    <>
      <section className="intro">
        <Reveal>
          <Eyebrow>Our process</Eyebrow>
          <h1>
            A clear path from
            <br />
            <em>complexity</em> to working software.
          </h1>
          <p>
            Collaborative enough to stay aligned. Structured enough to keep
            momentum.
          </p>
        </Reveal>
      </section>
      <section className="process-section">
        <div className="process-list">
          {steps.map(([a, b], i) => (
            <Reveal className="process-step" key={a}>
              <span>0{i + 1}</span>
              <div>
                <small>Phase {i + 1}</small>
                <h3>{a}</h3>
                <p>{b}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="system-stack">
          <div className="orb">
            <Server />
            <i />
            <i />
          </div>
          {['Interface', 'Logic', 'Data', 'Infrastructure'].map((x, i) => (
            <div
              className="stack-layer"
              key={x}
              style={{ '--i': i } as React.CSSProperties}
            >
              <span>{x}</span>
              <code>0{i + 1}</code>
            </div>
          ))}
        </Reveal>
      </section>
      <CTA />
    </>
  );
}
function Contact() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const submit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) return;
    setSending(true);
    setError('');
    const data = new FormData(form);
    data.append('_subject', 'New Analytical Innovations website inquiry');
    data.append('_template', 'table');
    try {
      const response = await fetch(
        'https://formsubmit.co/ajax/cristian12rosado@gmail.com',
        { method: 'POST', headers: { Accept: 'application/json' }, body: data },
      );
      const result = (await response.json().catch(() => null)) as {
        success?: boolean;
      } | null;
      if (!response.ok || result?.success === false)
        throw new Error('Submission failed');
      form.reset();
      setSent(true);
    } catch {
      setError('Your message could not be sent. Please try again in a moment.');
    } finally {
      setSending(false);
    }
  };
  return (
    <>
      <section className="intro contact-intro">
        <Reveal>
          <Eyebrow>Start a conversation</Eyebrow>
          <h1>
            Let&apos;s build something
            <br />
            <em>useful</em>, together.
          </h1>
          <p>
            Tell us what&apos;s slowing the work down, what you wish existed, or
            where your current systems have stopped keeping up.
          </p>
        </Reveal>
      </section>
      <section className="contact-grid">
        <Reveal className="contact-details">
          <div>
            <Mail />
            <span>
              Email<small>Send an inquiry through the secure form</small>
            </span>
          </div>
          <div>
            <MapPin />
            <span>
              Based in<small>San Juan, Puerto Rico</small>
            </span>
          </div>
          <div>
            <Phone />
            <span>
              Working style<small>Remote-first · Collaborative</small>
            </span>
          </div>
          <div className="availability">
            <i /> Currently accepting focused new engagements
          </div>
        </Reveal>
        <Reveal className="form-wrap">
          {sent ? (
            <div className="success">
              <Check />
              <Eyebrow>Message sent</Eyebrow>
              <h2>Thank you.</h2>
              <p>
                Your inquiry has been sent successfully. We&apos;ll be in touch
                after reviewing the details.
              </p>
              <button onClick={() => setSent(false)}>
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={submit}>
              <div className="field-row">
                <label>
                  Name
                  <input
                    name="name"
                    required
                    autoComplete="name"
                    placeholder="Your name"
                  />
                </label>
                <label>
                  Organization
                  <input
                    name="organization"
                    autoComplete="organization"
                    placeholder="Company or team"
                  />
                </label>
              </div>
              <label>
                Email
                <input
                  type="email"
                  name="email"
                  required
                  autoComplete="email"
                  placeholder="you@company.com"
                />
              </label>
              <label>
                Project type
                <select name="type" defaultValue="" required>
                  <option value="" disabled>
                    Select a focus
                  </option>
                  <option>Web application</option>
                  <option>Internal tool or dashboard</option>
                  <option>Data or integration</option>
                  <option>Automation</option>
                  <option>Technical consulting</option>
                </select>
              </label>
              <label>
                What are you trying to improve?
                <textarea
                  name="message"
                  required
                  minLength={20}
                  placeholder="A little context about the work, the friction, and what better might look like…"
                />
              </label>
              <button className="button" type="submit" disabled={sending}>
                {sending ? 'Sending…' : 'Send inquiry'}{' '}
                {!sending && <ArrowRight size={15} />}
              </button>
              <small>Required fields are validated before submission.</small>
              {error && (
                <p className="form-error" role="alert" aria-live="polite">
                  {error}
                </p>
              )}
            </form>
          )}
        </Reveal>
      </section>
      <section className="island">
        <Network small />
        <span>Puerto Rico</span>
        <div className="pulse" />
      </section>
    </>
  );
}
function CTA() {
  return (
    <section className="cta">
      <Network small />
      <div>
        <Eyebrow>Have a specific idea in mind?</Eyebrow>
        <h2>Let&apos;s discuss how we can build it.</h2>
      </div>
      <Button>Start a conversation</Button>
    </section>
  );
}
function Footer() {
  return (
    <footer>
      <Logo />
      <p>Purpose-built software for the systems behind the work.</p>
      <div>
        {routes.slice(1).map(([l, h]) => (
          <a href={h} key={h}>
            {l}
          </a>
        ))}
      </div>
      <small>© 2026 Analytical Innovations, LLC. All rights reserved.</small>
    </footer>
  );
}
export default function Site() {
  const [path, setPath] = useState('/');
  useEffect(() => {
    setPath(location.pathname);
    const click = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest('a');
      if (!a) return;
      const u = new URL(a.href);
      if (u.origin === location.origin) {
        e.preventDefault();
        history.pushState({}, '', u.pathname);
        setPath(u.pathname);
        scrollTo({ top: 0, behavior: 'smooth' });
      }
    };
    const pop = () => setPath(location.pathname);
    addEventListener('click', click);
    addEventListener('popstate', pop);
    return () => {
      removeEventListener('click', click);
      removeEventListener('popstate', pop);
    };
  }, []);
  const content =
    path === '/about' ? (
      <About />
    ) : path === '/services' ? (
      <Services />
    ) : path === '/work' ? (
      <Work />
    ) : path === '/how-we-work' ? (
      <Process />
    ) : path === '/contact' ? (
      <Contact />
    ) : (
      <Home />
    );
  return <Shell path={path}>{content}</Shell>;
}
