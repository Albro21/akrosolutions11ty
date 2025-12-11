// Custom Cursor
const glow = document.getElementById('cursor-glow');

if (window.innerWidth >= 768 && glow) {
  glow.style.pointerEvents = 'none';

  // Initial styles
  glow.style.background = 'radial-gradient(circle, rgba(168,85,247,0.4) 0%, rgba(168,85,247,0.05) 80%, rgba(168,85,247,0) 100%)';
  glow.style.filter = 'blur(20px)';
  glow.style.transform = 'translate3d(-50%, -50%, 0)';
  glow.style.willChange = 'transform, opacity, width, height, filter';

  let tx = window.innerWidth / 2, ty = window.innerHeight / 2;
  let x = tx, y = ty;
  const ease = 0.15;

  // Track cursor
  window.addEventListener('mousemove', e => {
    tx = e.clientX;
    ty = e.clientY;
  }, { passive: true });

  // Animate movement + smooth size/blur changes
  let targetSize = 90;
  let targetBlur = 20;
  let size = targetSize;
  let blur = targetBlur;

  (function animate() {
    // Smooth position
    x += (tx - x) * ease;
    y += (ty - y) * ease;
    glow.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;

    // Smooth size & blur
    size += (targetSize - size) * ease;
    blur += (targetBlur - blur) * ease;
    glow.style.width = glow.style.height = `${size}px`;
    glow.style.filter = `blur(${blur}px)`;

    requestAnimationFrame(animate);
  })();

  window.addEventListener('mousedown', () => {
    targetSize = 70;
    targetBlur = 5;
  });
  window.addEventListener('mouseup', () => {
    targetSize = 90;
    targetBlur = 20;
  });

  document.addEventListener('mouseover', e => {
    if (e.target.closest('a, button, input, textarea, [role="button"]')) {
      targetSize = 70;
      targetBlur = 5;
    }
  }, true);

  document.addEventListener('mouseout', e => {
    if (!e.target.closest('a, button, input, textarea, [role="button"]')) {
      targetSize = 90;
      targetBlur = 20;
    }
  }, true);
} else {
  glow.remove();
}