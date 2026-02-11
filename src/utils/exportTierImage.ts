import { browser } from '$app/environment';

export async function exportTierListImage(
  node: HTMLElement,
  filename: string,
  label: string
) {
  if (!browser) return;

  if (!node) {
    console.error('Không tìm thấy node để xuất ảnh');
    return;
  }

  const htmlToImage = await import('html-to-image');

  const iframe = document.createElement('iframe');
  iframe.style.position = 'absolute';
  iframe.style.top = '-9999px';
  iframe.style.left = '-9999px';
  iframe.style.width = `${node.offsetWidth}px`;
  iframe.style.height = `${node.offsetHeight + 100}px`;
  iframe.style.visibility = 'hidden';
  document.body.appendChild(iframe);

  try {
    const doc = iframe.contentDocument || iframe.contentWindow?.document;
    if (!doc) throw new Error('Không thể truy cập vào iframe document');

    const clone = node.cloneNode(true) as HTMLElement;

    const title = document.createElement('h2');
    title.textContent = `Tier List ${label}`;
    title.className =
      'my-4 inline-block bg-space bg-clip-text font-bold leading-tight text-transparent text-5xl w-full text-center';

    const wrapper = document.createElement('div');
    wrapper.style.padding = '0 24px';
    wrapper.style.background = 'black';
    wrapper.appendChild(title);
    wrapper.appendChild(clone);

    const styleSheets = Array.from(document.styleSheets);
    const styleTags: string[] = [];

    for (const sheet of styleSheets) {
      try {
        const rules = (sheet as CSSStyleSheet).cssRules;
        const css = Array.from(rules)
          .map((rule) => rule.cssText)
          .join('\n');
        styleTags.push(`<style>${css}</style>`);
      } catch {}
    }

    doc.open();
    doc.write(`
      <html>
        <head>
          ${styleTags.join('\n')}
        </head>
        <body style="margin:0; background:black;"></body>
      </html>
    `);
    doc.body.appendChild(wrapper);
    doc.close();

    await new Promise((resolve) => setTimeout(resolve, 500));

    const target = doc.body.firstElementChild as HTMLElement;
    await waitForImagesToLoad(target);

    const dataUrl = await htmlToImage.toPng(target, {
      pixelRatio: 2,
      backgroundColor: '#000000'
    });

    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error('Lỗi khi xuất ảnh bằng iframe:', error);
    alert('Xuất ảnh thất bại. Vui lòng thử lại.');
  } finally {
    document.body.removeChild(iframe);
  }
}


function waitForImagesToLoad(container: HTMLElement): Promise<void> {
  const images = Array.from(container.querySelectorAll('img'));
  if (images.length === 0) return Promise.resolve();

  const promises = images.map(img => {
    return new Promise<void>((resolve) => {
      if (img.complete && img.naturalHeight !== 0) return resolve();

      img.addEventListener('load', () => resolve(), { once: true });
      img.addEventListener('error', () => resolve(), { once: true });

      // Timeout dự phòng
      setTimeout(() => resolve(), 5000);
    });
  });

  return Promise.all(promises).then(() => {});
}
