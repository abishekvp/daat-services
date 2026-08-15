/* ============================================================
   DAAT SERVICES — Particle System (Hero Canvas)
   ============================================================ */

class ParticleSystem {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.mouse = { x: null, y: null };
    this.animFrame = null;
    this.resize();
    this.populate();
    this.bindEvents();
    this.animate();
  }

  resize() {
    this.canvas.width  = this.canvas.offsetWidth;
    this.canvas.height = this.canvas.offsetHeight;
  }

  populate() {
    const count = Math.floor((this.canvas.width * this.canvas.height) / 12000);
    this.particles = [];
    for (let i = 0; i < count; i++) {
      this.particles.push(this.createParticle());
    }
  }

  createParticle(x, y) {
    const isCyan   = Math.random() > 0.4;
    const color    = isCyan ? [0, 240, 255] : [112, 0, 255];
    return {
      x:      x ?? Math.random() * this.canvas.width,
      y:      y ?? Math.random() * this.canvas.height,
      vx:     (Math.random() - 0.5) * 0.4,
      vy:     (Math.random() - 0.5) * 0.4,
      r:      Math.random() * 1.8 + 0.4,
      color,
      alpha:  Math.random() * 0.5 + 0.1,
      life:   Math.random() * 200 + 100,
      age:    0,
    };
  }

  drawConnections() {
    const { ctx, particles, mouse } = this;
    const maxDist = 120;

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i], b = particles[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > maxDist) continue;

        const alpha = (1 - dist / maxDist) * 0.15;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = `rgba(0, 240, 255, ${alpha})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      // Mouse repel / attract
      if (mouse.x !== null) {
        const p = particles[i];
        const dx = p.x - mouse.x, dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 80) {
          const force = (80 - dist) / 80 * 0.015;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }
      }
    }
  }

  animate() {
    const { ctx, canvas, particles } = this;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Connections
    this.drawConnections();

    // Particles
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.age++;
      p.x += p.vx;
      p.y += p.vy;

      // Dampen velocity
      p.vx *= 0.998;
      p.vy *= 0.998;

      // Wrap
      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;

      // Fade in/out
      let alpha = p.alpha;
      if (p.age < 30) alpha = (p.age / 30) * p.alpha;
      if (p.age > p.life - 30) alpha = ((p.life - p.age) / 30) * p.alpha;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.color[0]}, ${p.color[1]}, ${p.color[2]}, ${alpha})`;
      ctx.fill();

      // Recycle
      if (p.age >= p.life) particles[i] = this.createParticle();
    }

    this.animFrame = requestAnimationFrame(() => this.animate());
  }

  bindEvents() {
    window.addEventListener('resize', () => {
      this.resize();
      this.populate();
    });

    this.canvas.addEventListener('mousemove', e => {
      const rect = this.canvas.getBoundingClientRect();
      this.mouse.x = e.clientX - rect.left;
      this.mouse.y = e.clientY - rect.top;
    });

    this.canvas.addEventListener('mouseleave', () => {
      this.mouse.x = null;
      this.mouse.y = null;
    });
  }

  destroy() {
    cancelAnimationFrame(this.animFrame);
  }
}

// Init on page load
window.particleSystem = null;
document.addEventListener('DOMContentLoaded', () => {
  window.particleSystem = new ParticleSystem('particle-canvas');
});
