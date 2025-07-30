import * as htmlToImage from 'html-to-image';

export async function exportTierListImage(node: HTMLElement, filename: string, label: string) {
  if (!node) {
    console.error('Không tìm thấy node để xuất ảnh');
    return;
  }

  // Tạo iframe tạm thời
  const iframe = document.createElement('iframe');
  iframe.style.position = 'absolute';
  iframe.style.top = '-9999px';
  iframe.style.left = '-9999px';
  iframe.style.width = `${node.offsetWidth}px`;
  iframe.style.height = `${node.offsetHeight + 100}px`; // dư ra cho tiêu đề
  iframe.style.visibility = 'hidden';
  document.body.appendChild(iframe);

  try {
    const doc = iframe.contentDocument || iframe.contentWindow?.document;
    if (!doc) throw new Error('Không thể truy cập vào iframe document');

    // Tạo bản sao HTML của node
    const clone = node.cloneNode(true) as HTMLElement;

    // Tạo tiêu đề
    const title = document.createElement('h2');
    title.textContent = `Tier List ${label}`;
    title.className = 'my-4 inline-block bg-space bg-clip-text font-bold leading-tight text-transparent text-5xl w-full text-center';
    doc.body.appendChild(title);
    doc.body.appendChild(clone);

    // Tạo wrapper bao cả title và content
    const wrapper = document.createElement('div');
    wrapper.style.padding = '0 24px';
    wrapper.style.background = 'black';
    wrapper.appendChild(title);
    wrapper.appendChild(clone);

    // Nhúng style nếu cần (bắt buộc nếu dùng Tailwind hoặc CSS module)
    const styleSheets = Array.from(document.styleSheets);
    const styleTags: string[] = [];

    for (const sheet of styleSheets) {
      try {
        const rules = (sheet as CSSStyleSheet).cssRules;
        const css = Array.from(rules).map(rule => rule.cssText).join('\n');
        styleTags.push(`<style>${css}</style>`);
      } catch {
        // Bỏ qua nếu là cross-origin stylesheet
      }
    }

    doc.open();
    doc.write(`
      <html>
        <head>
          ${styleTags.join('\n')}
        </head>
        <body style="margin:0; background: black;">
        </body>
      </html>
    `);
    doc.body.appendChild(wrapper);
    doc.close();

    // Chờ render đầy đủ
    await new Promise(resolve => setTimeout(resolve, 500));

    const target = doc.body.firstElementChild as HTMLElement;

    // Đợi ảnh tải xong
    await waitForImagesToLoad(target);

    const dataUrl = await htmlToImage.toPng(target, {
      pixelRatio: 2,
      backgroundColor: '#000000',
    });

    // Tải ảnh
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
