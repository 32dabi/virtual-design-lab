import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  opacitySpeed: number;
}

const HeroSection = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W = window.innerWidth;
    let H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    // Vertical lines config
    const NUM_LINES = 9;
    const linePhases = Array.from({ length: NUM_LINES }, (_, i) => i * (Math.PI * 2 / NUM_LINES));
    const lineXPositions = Array.from({ length: NUM_LINES }, (_, i) => (W / (NUM_LINES + 1)) * (i + 1));

    // Particles
    const particles: Particle[] = Array.from({ length: 55 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.3,
      vy: -Math.random() * 0.4 - 0.1,
      size: Math.random() * 2 + 0.5,
      opacity: Math.random(),
      opacitySpeed: Math.random() * 0.005 + 0.002,
    }));

    let t = 0;
    const GOLD = '201, 168, 76';
    const BG = '#0B3D2E';

    const draw = () => {
      t += 0.008;

      // Background
      ctx.fillStyle = BG;
      ctx.fillRect(0, 0, W, H);

      // Subtle radial glow center
      const cx = W / 2 + (mouseRef.current.x - W / 2) * 0.04;
      const cy = H / 2 + (mouseRef.current.y - H / 2) * 0.04;
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, W * 0.6);
      grad.addColorStop(0, 'rgba(201,168,76,0.07)');
      grad.addColorStop(1, 'rgba(11,61,46,0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);

      // Vertical breathing lines
      lineXPositions.forEach((baseX, i) => {
        const parallaxX = baseX + (mouseRef.current.x - W / 2) * 0.015 * (i % 2 === 0 ? 1 : -1);
        const opacity = 0.08 + 0.12 * Math.sin(t + linePhases[i]);
        const lineGrad = ctx.createLinearGradient(0, 0, 0, H);
        lineGrad.addColorStop(0, `rgba(${GOLD},0)`);
        lineGrad.addColorStop(0.3, `rgba(${GOLD},${opacity})`);
        lineGrad.addColorStop(0.7, `rgba(${GOLD},${opacity})`);
        lineGrad.addColorStop(1, `rgba(${GOLD},0)`);
        ctx.beginPath();
        ctx.moveTo(parallaxX, 0);
        ctx.lineTo(parallaxX, H);
        ctx.strokeStyle = lineGrad;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      });

      // Horizontal subtle line at 1/3 height
      const hLineY = H * 0.33 + Math.sin(t * 0.5) * 6;
      const hGrad = ctx.createLinearGradient(0, 0, W, 0);
      hGrad.addColorStop(0, `rgba(${GOLD},0)`);
      hGrad.addColorStop(0.2, `rgba(${GOLD},0.06)`);
      hGrad.addColorStop(0.5, `rgba(${GOLD},0.12)`);
      hGrad.addColorStop(0.8, `rgba(${GOLD},0.06)`);
      hGrad.addColorStop(1, `rgba(${GOLD},0)`);
      ctx.beginPath();
      ctx.moveTo(0, hLineY);
      ctx.lineTo(W, hLineY);
      ctx.strokeStyle = hGrad;
      ctx.lineWidth = 0.6;
      ctx.stroke();

      // Particles
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.opacity += p.opacitySpeed * (Math.random() > 0.5 ? 1 : -1);
        p.opacity = Math.max(0.05, Math.min(0.7, p.opacity));

        if (p.y < -10) { p.y = H + 10; p.x = Math.random() * W; }
        if (p.x < -10) p.x = W + 10;
        if (p.x > W + 10) p.x = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${GOLD},${p.opacity * 0.6})`;
        ctx.fill();
      });

      // Bottom gradient fade
      const bottomGrad = ctx.createLinearGradient(0, H * 0.7, 0, H);
      bottomGrad.addColorStop(0, 'rgba(11,61,46,0)');
      bottomGrad.addColorStop(1, 'rgba(11,61,46,0.95)');
      ctx.fillStyle = bottomGrad;
      ctx.fillRect(0, H * 0.7, W, H * 0.3);

      animRef.current = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W;
      canvas.height = H;
      lineXPositions.splice(0, lineXPositions.length,
        ...Array.from({ length: NUM_LINES }, (_, i) => (W / (NUM_LINES + 1)) * (i + 1))
      );
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ background: '#0B3D2E' }}
      />

      <div className="relative z-10 text-center px-6">
        <div className="gold-line mx-auto mb-8" />

        <h1 className="font-logo text-6xl md:text-8xl lg:text-9xl text-gold tracking-[0.15em] uppercase glow-gold mb-4">
          ELEVARE
        </h1>
        <p className="text-xl md:text-2xl font-heading font-normal tracking-[0.2em] uppercase mb-2 text-gold/80">
          Cores e Formas
        </p>
        <p className="text-base md:text-lg text-foreground/90 max-w-lg mx-auto mb-10 font-body">
          Painéis WPC e Bamboo Carbon que transformam espaços em experiências únicas
        </p>

        <div className="flex flex-col sm:flex-row gap-5 justify-center">
          <a
            href="#catalogo"
            className="px-12 py-4 border border-gold/60 text-gold font-medium tracking-wider uppercase text-base rounded hover:bg-gold/10 hover:border-gold transition-all flex items-center justify-center font-subtitle"
          >
            Ver Catálogo
          </a>
          <a
            href="#contato"
            className="px-14 py-5 bg-gradient-to-r from-[hsl(var(--gold))] to-[hsl(var(--gold-light))] text-background font-medium tracking-wider uppercase text-base rounded shadow-[0_0_20px_hsl(43_62%_52%/0.4)] hover:shadow-[0_0_30px_hsl(43_62%_52%/0.6)] hover:scale-105 transition-all duration-300 font-subtitle"
          >
            Solicitar Orçamento
          </a>
        </div>

        <div className="gold-line mx-auto mt-8" />
      </div>
    </section>
  );
};

export default HeroSection;
