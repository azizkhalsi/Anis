import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useScrollAnimation from '../hooks/useScrollAnimation';
import useCountUp from '../hooks/useCountUp';

function ParticleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animId;

    function resize() {
      canvas.width = canvas.parentElement.offsetWidth;
      canvas.height = canvas.parentElement.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      size: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.3 + 0.1,
    }));

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = i % 3 === 0
          ? `rgba(196,43,43,${p.opacity * 0.6})`
          : `rgba(107,107,107,${p.opacity * 0.35})`;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[j].x - p.x;
          const dy = particles[j].y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(196,43,43,${0.035 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });
      animId = requestAnimationFrame(draw);
    }
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />;
}

function StatCounter({ target, suffix, label }) {
  const ref = useRef(null);
  const isVisible = useScrollAnimation(ref, { threshold: 0.5 });
  const value = useCountUp(target, 2000, isVisible);

  return (
    <div className="stat" ref={ref}>
      <span className="stat-number">{value}</span>
      {suffix && <span className="stat-suffix">{suffix}</span>}
      <span className="stat-label">{label}</span>
    </div>
  );
}

export default function Hero() {
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const actionsRef = useRef(null);

  const badgeVisible = useScrollAnimation(badgeRef, { threshold: 0.1 });
  const titleVisible = useScrollAnimation(titleRef, { threshold: 0.1, delay: 100 });
  const subtitleVisible = useScrollAnimation(subtitleRef, { threshold: 0.1, delay: 200 });
  const actionsVisible = useScrollAnimation(actionsRef, { threshold: 0.1, delay: 300 });

  return (
    <section className="hero" id="home">
      <div className="hero-bg">
        <div className="hero-bg-base" aria-hidden="true" />
        <img
          src="/images/lab-testbench.png"
          srcSet="/images/lab-testbench.png 1x"
          sizes="100vw"
          alt=""
          className="hero-bg-image"
          aria-hidden="true"
          width="1920"
          height="600"
          fetchPriority="high"
          decoding="async"
        />
        <div className="hero-particles">
          <ParticleCanvas />
        </div>
        <div className="hero-grid" />
      </div>
      <div className="hero-content">
        <div ref={badgeRef} className={`hero-badge${badgeVisible ? ' visible' : ''}`} data-animate="fade-up">
          <span className="badge-dot" />
          R&amp;D Engineering &amp; Consultancy
        </div>
        <h1 ref={titleRef} className={`hero-title${titleVisible ? ' visible' : ''}`} data-animate="fade-up">
          Engineering &amp; Consultancy for{' '}
          <span className="gradient-text">Motor Control</span> &amp;{' '}
          <span className="gradient-text">Power Electronics</span>
        </h1>
        <p ref={subtitleRef} className={`hero-subtitle${subtitleVisible ? ' visible' : ''}`} data-animate="fade-up">
          Innovating the future of sensorless motor control solutions, enabling energy-efficient drives across industries worldwide.
        </p>
        <p className={`hero-oneliner${subtitleVisible ? ' visible' : ''}`} data-animate="fade-up">
          Reduce cost and complexity with sensorless solutions — no encoders, fewer parts, higher reliability.
        </p>
        <div ref={actionsRef} className={`hero-actions${actionsVisible ? ' visible' : ''}`} data-animate="fade-up">
          <Link to="/expertise" className="btn btn-primary">
            Explore Our Expertise
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </Link>
          <Link to="/products" className="btn btn-outline">Our Products</Link>
        </div>
        <div className="hero-stats" data-animate="fade-up">
          <StatCounter target={20} suffix="+" label="Years Experience" />
          <div className="stat-divider" />
          <StatCounter target={3} label="Innovative Products" />
          <div className="stat-divider" />
          <StatCounter target={1000000} suffix="+" label="Units in Production" />
        </div>
      </div>
      <div className="hero-scroll">
        <button
          type="button"
          className="scroll-indicator"
          onClick={() => {
            const services = document.getElementById('services');
            if (services) services.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <span>Scroll</span>
          <div className="scroll-line" />
        </button>
      </div>
    </section>
  );
}
