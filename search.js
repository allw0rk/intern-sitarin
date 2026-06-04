/* ── Site Search ── */
(function () {

  /* Search index */
  const INDEX = [
    { title: 'หน้าแรก',                   url: 'index.html',       desc: 'รายงานการฝึกงาน Sitarin Phalert',              keys: 'หน้าแรก home internship report sitarin' },
    { title: 'สถานที่ฝึกงาน',              url: 'place.html',       desc: 'ข้อมูลโรงพยาบาลบึงสามัคคี',                   keys: 'สถานที่ โรงพยาบาล บึงสามัคคี กำแพงเพชร ประวัติ' },
    { title: 'โครงสร้างองค์กร',            url: 'org.html',         desc: 'แผนผังการบริหารโรงพยาบาล 14 กลุ่มงาน',         keys: 'โครงสร้าง องค์กร แผนผัง กลุ่มงาน หน่วยงาน' },
    { title: 'โครงสร้างกลุ่มงาน',          url: 'org-group.html',   desc: 'กลุ่มงานดิจิทัลทางการแพทย์และสุขภาพ',          keys: 'กลุ่มงาน ดิจิทัล คอมพิวเตอร์ คารม วิศรุต' },
    { title: 'บทบาทหน้าที่',               url: 'org-roles.html',   desc: '4 กลไกหลักขับเคลื่อนดิจิทัลโรงพยาบาล',        keys: 'บทบาท หน้าที่ network infrastructure software data helpdesk' },
    { title: 'งานที่ได้รับมอบหมาย',        url: 'Work.html',        desc: 'บันทึกงานรายสัปดาห์ 8 สัปดาห์',               keys: 'งาน สัปดาห์ ซ่อมบำรุง ฮาร์ดแวร์ opd เว็บไซต์ mini project' },
    { title: 'สัปดาห์ที่ 1',               url: 'Work.html#week1',  desc: 'บันทึกงานประจำสัปดาห์ที่ 1',                   keys: 'สัปดาห์ 1 week1' },
    { title: 'สัปดาห์ที่ 2',               url: 'Work.html#week2',  desc: 'บันทึกงานประจำสัปดาห์ที่ 2',                   keys: 'สัปดาห์ 2 week2' },
    { title: 'สัปดาห์ที่ 3',               url: 'Work.html#week3',  desc: 'บันทึกงานประจำสัปดาห์ที่ 3',                   keys: 'สัปดาห์ 3 week3' },
    { title: 'สัปดาห์ที่ 4',               url: 'Work.html#week4',  desc: 'บันทึกงานประจำสัปดาห์ที่ 4',                   keys: 'สัปดาห์ 4 week4' },
    { title: 'สัปดาห์ที่ 5',               url: 'Work.html#week5',  desc: 'บันทึกงานประจำสัปดาห์ที่ 5',                   keys: 'สัปดาห์ 5 week5' },
    { title: 'สัปดาห์ที่ 6',               url: 'Work.html#week6',  desc: 'บันทึกงานประจำสัปดาห์ที่ 6',                   keys: 'สัปดาห์ 6 week6' },
    { title: 'สัปดาห์ที่ 7',               url: 'Work.html#week7',  desc: 'บันทึกงานประจำสัปดาห์ที่ 7',                   keys: 'สัปดาห์ 7 week7' },
    { title: 'สัปดาห์ที่ 8',               url: 'Work.html#week8',  desc: 'บันทึกงานประจำสัปดาห์ที่ 8',                   keys: 'สัปดาห์ 8 week8' },
    { title: 'ข้อมูลผู้จัดทำ',             url: 'about.html',       desc: 'นายสิตรินทร์ ผาเลิศ · KMUTNB',                keys: 'ผู้จัดทำ สิตรินทร์ ผาเลิศ ก้า kmutnb คอมพิวเตอร์ about' },
  ];

  /* ── Inject dropdown CSS ── */
  const style = document.createElement('style');
  style.textContent = `
    .search-drop {
      position: absolute; top: calc(100% + 8px); left: 0; right: 0;
      background: #fff; border-radius: 14px;
      box-shadow: 0 12px 40px rgba(26,47,90,.2);
      overflow: hidden; z-index: 9999;
      border: 1px solid #e8ecf4;
      display: none;
    }
    .search-drop.open { display: block; }
    .sd-item {
      display: flex; align-items: center; gap: 12px;
      padding: 11px 16px; cursor: pointer;
      border-bottom: 1px solid #f0f4f8;
      transition: background .12s;
      text-decoration: none;
    }
    .sd-item:last-child { border: none; }
    .sd-item:hover, .sd-item.active { background: #f0f5ff; }
    .sd-icon {
      width: 32px; height: 32px; border-radius: 8px; flex-shrink: 0;
      background: linear-gradient(135deg,#1a2f5a,#2da89a);
      display: flex; align-items: center; justify-content: center;
      font-size: 14px;
    }
    .sd-text { flex: 1; min-width: 0; }
    .sd-title { font-size: 13px; font-weight: 700; color: #1a2f5a; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .sd-desc  { font-size: 11px; color: #8a9ab0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .sd-empty { padding: 16px; text-align: center; font-size: 13px; color: #9aa5b4; }
    .sd-mark  { background: #fff3b0; border-radius: 3px; padding: 0 2px; }
  `;
  document.head.appendChild(style);

  /* Page icon mapping */
  const ICON = {
    'index.html':     '🏠',
    'place.html':     '🏥',
    'org.html':       '🗂️',
    'org-group.html': '👥',
    'org-roles.html': '📋',
    'Work.html':      '📅',
    'about.html':     '👤',
  };
  function getIcon(url) {
    const base = url.split('#')[0];
    return ICON[base] || '📄';
  }

  /* Highlight matched text */
  function highlight(text, q) {
    if (!q) return text;
    const re = new RegExp('(' + q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi');
    return text.replace(re, '<span class="sd-mark">$1</span>');
  }

  /* Search function */
  function search(q) {
    if (!q.trim()) return [];
    const lq = q.toLowerCase();
    return INDEX.filter(item =>
      item.title.toLowerCase().includes(lq) ||
      item.desc.toLowerCase().includes(lq) ||
      item.keys.toLowerCase().includes(lq)
    ).slice(0, 7);
  }

  /* Init search on DOMContentLoaded */
  document.addEventListener('DOMContentLoaded', () => {
    const wrap = document.querySelector('.header-search');
    if (!wrap) return;

    const input = wrap.querySelector('input');
    if (!input) return;

    /* Create dropdown */
    const drop = document.createElement('div');
    drop.className = 'search-drop';
    wrap.style.position = 'relative';
    wrap.appendChild(drop);

    let active = -1;

    function render(results, q) {
      drop.innerHTML = '';
      active = -1;
      if (!results.length) {
        drop.innerHTML = `<div class="sd-empty">ไม่พบผลลัพธ์ สำหรับ "<b>${q}</b>"</div>`;
        drop.classList.add('open');
        return;
      }
      results.forEach((item, i) => {
        const a = document.createElement('a');
        a.className = 'sd-item';
        a.href = item.url;
        a.innerHTML = `
          <div class="sd-icon">${getIcon(item.url)}</div>
          <div class="sd-text">
            <div class="sd-title">${highlight(item.title, q)}</div>
            <div class="sd-desc">${highlight(item.desc, q)}</div>
          </div>`;
        drop.appendChild(a);
      });
      drop.classList.add('open');
    }

    function close() {
      drop.classList.remove('open');
      active = -1;
    }

    input.addEventListener('input', () => {
      const q = input.value.trim();
      if (!q) { close(); return; }
      render(search(q), q);
    });

    /* Keyboard navigation */
    input.addEventListener('keydown', e => {
      const items = drop.querySelectorAll('.sd-item');
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        active = Math.min(active + 1, items.length - 1);
        items.forEach((el, i) => el.classList.toggle('active', i === active));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        active = Math.max(active - 1, 0);
        items.forEach((el, i) => el.classList.toggle('active', i === active));
      } else if (e.key === 'Enter') {
        if (active >= 0 && items[active]) { items[active].click(); }
        else if (items.length > 0) { items[0].click(); }
      } else if (e.key === 'Escape') {
        close(); input.blur();
      }
    });

    /* Close on outside click */
    document.addEventListener('click', e => {
      if (!wrap.contains(e.target)) close();
    });

    input.addEventListener('focus', () => {
      if (input.value.trim()) render(search(input.value.trim()), input.value.trim());
    });
  });

})();
