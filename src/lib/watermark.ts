export const downloadWithWatermark = (imageSrc: string, productName: string) => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.onload = () => {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);

    // Diagonal watermark (anti print-screen)
    ctx.save();
    ctx.globalAlpha = 0.06;
    ctx.font = "48px 'Poiret One', sans-serif";
    ctx.fillStyle = '#D4AF37';
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(-30 * Math.PI / 180);
    for (let y = -canvas.height; y < canvas.height; y += 120) {
      for (let x = -canvas.width; x < canvas.width; x += 400) {
        ctx.fillText('ELEVARE', x, y);
      }
    }
    ctx.restore();

    // Bottom bar
    const barHeight = 60;
    ctx.fillStyle = 'rgba(11,61,46,0.85)';
    ctx.fillRect(0, canvas.height - barHeight, canvas.width, barHeight);

    ctx.font = "14px 'Montserrat', sans-serif";
    ctx.fillStyle = '#D4AF37';
    ctx.fillText('ELEVARE - Cores e Formas | elevare.com.br', 20, canvas.height - 25);

    const date = new Date().toLocaleDateString('pt-BR');
    const rightText = `Simulação: ${productName} | ${date}`;
    const textWidth = ctx.measureText(rightText).width;
    ctx.fillText(rightText, canvas.width - textWidth - 20, canvas.height - 25);

    // Download
    const link = document.createElement('a');
    link.download = `elevare-simulacao-${productName.replace(/\s+/g, '-').toLowerCase()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };
  img.onerror = () => {
    // Fallback: download raw
    const link = document.createElement('a');
    link.download = `elevare-${productName.replace(/\s+/g, '-').toLowerCase()}.png`;
    link.href = imageSrc;
    link.click();
  };
  img.src = imageSrc;
};
