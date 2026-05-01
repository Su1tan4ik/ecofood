/* ============= DATA ============= */
const sampleListings = [
  { id: 1, title: 'Свежий хлеб 4 буханки', from: 'Пекарня «Колосок»', category: 'bakery', portions: 4, district: 'Алмалинский', until: '21:00', urgent: true, free: true, notes: 'Закваска ржаная, испечён утром. Заберёте — отдадим бесплатно, главное чтобы не выкинуть.', emoji: '🥖', color: '#E8A434' },
  { id: 2, title: 'Паста карбонара, 6 порций', from: 'Кафе Veranda', category: 'meals', portions: 6, district: 'Медеуский', until: '19:30', urgent: false, free: false, notes: 'После бизнес-ланча. Упаковано в контейнеры, в холодильнике. 200 тенге за упаковку.', emoji: '🍝', color: '#D7572C' },
  { id: 3, title: 'Ящик помидоров черри', from: 'Магазин «Свежее»', category: 'produce', portions: 8, district: 'Бостандыкский', until: '22:00', urgent: false, free: true, notes: 'Подходит срок реализации, но качество отличное. Отдадим первому, кто заберёт.', emoji: '🍅', color: '#D7572C' },
  { id: 4, title: 'Круассаны и булочки, 12 шт', from: 'Кофейня Drip', category: 'bakery', portions: 12, district: 'Алмалинский', until: '20:00', urgent: true, free: true, notes: 'Дневная выпечка. Вкусные, но завтра уже не продадим. Приходите!', emoji: '🥐', color: '#E8A434' },
  { id: 5, title: 'Борщ домашний, кастрюля', from: 'Анна (частное лицо)', category: 'meals', portions: 5, district: 'Ауэзовский', until: '23:00', urgent: false, free: true, notes: 'Сварила слишком много на семью. Свежий, сегодняшний. Принесите свой контейнер.', emoji: '🍲', color: '#1F4031' },
  { id: 6, title: '2 пиццы (пеперони, маргарита)', from: 'Ресторан Mira', category: 'meals', portions: 8, district: 'Медеуский', until: '22:30', urgent: true, free: false, notes: 'Закрываемся, остались две целые пиццы. 500 тенге каждая или забирайте обе за 800.', emoji: '🍕', color: '#D7572C' },
  { id: 7, title: 'Йогурты натуральные, 8 шт', from: 'Лавка «Молочник»', category: 'dairy', portions: 8, district: 'Алмалинский', until: '20:30', urgent: true, free: true, notes: 'Срок до завтра, без сахара, разные вкусы. Просто заходите и забирайте.', emoji: '🥛', color: '#B8C9A8' },
  { id: 8, title: 'Киноа и гречка, по 1кг', from: 'Зерновая лавка', category: 'produce', portions: 6, district: 'Бостандыкский', until: 'завтра', urgent: false, free: false, notes: 'Открытые мешки, нужно реализовать. По 300 тенге за кг — символически.', emoji: '🌾', color: '#E8A434' },
  { id: 9, title: 'Тако с курицей, 4 порции', from: 'Foodtruck Tacos', category: 'meals', portions: 4, district: 'Алмалинский', until: '18:30', urgent: true, free: true, notes: 'Свежеприготовленные, остались после обеденного потока. Только что собрали.', emoji: '🌮', color: '#1F4031' },
  { id: 10, title: 'Творог фермерский, 2 кг', from: 'Anna Farm', category: 'dairy', portions: 8, district: 'Ауэзовский', until: '21:00', urgent: false, free: false, notes: 'Сделан вчера. 600 тенге за кг. Идеально для запеканки или сырников.', emoji: '🧀', color: '#B8C9A8' },
];

let listings = JSON.parse(localStorage.getItem('ecofood-listings') || 'null') || [...sampleListings];
let activeFilter = 'all';
let activeSearch = '';

/* ============= ILLUSTRATION SVG ============= */
function makeFoodIllustration(emoji, color) {
  return `
  <svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
    <defs>
      <linearGradient id="g${color.replace('#','')}" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="${color}" stop-opacity="0.25"/>
        <stop offset="1" stop-color="${color}" stop-opacity="0.05"/>
      </linearGradient>
    </defs>
    <rect width="400" height="200" fill="url(#g${color.replace('#','')})"/>
    <circle cx="80" cy="60" r="40" fill="${color}" opacity="0.18"/>
    <circle cx="340" cy="160" r="60" fill="${color}" opacity="0.12"/>
    <path d="M 0 170 Q 100 140 200 165 T 400 155 L 400 200 L 0 200 Z" fill="${color}" opacity="0.18"/>
    <text x="200" y="125" text-anchor="middle" font-size="86" font-family="serif">${emoji}</text>
  </svg>`;
}

/* ============= RENDER LISTINGS ============= */
function renderListings() {
  const container = document.getElementById('listings');
  let filtered = listings;
  if (activeFilter !== 'all') {
    filtered = filtered.filter(l => l.category === activeFilter);
  }
  if (activeSearch) {
    const q = activeSearch.toLowerCase();
    filtered = filtered.filter(l =>
      l.title.toLowerCase().includes(q) ||
      l.from.toLowerCase().includes(q) ||
      l.district.toLowerCase().includes(q)
    );
  }

  document.getElementById('count-all').textContent = listings.length;

  if (filtered.length === 0) {
    container.innerHTML = `<div class="empty-state">
      Пока ничего не нашлось. Попробуй другой фильтр — или
      <a href="#share" style="color:var(--terracotta);text-decoration:underline">поделись сам</a>.
    </div>`;
    return;
  }

  container.innerHTML = filtered.map(l => `
    <div class="card" onclick="openModal(${l.id})">
      <div class="card-img">${makeFoodIllustration(l.emoji, l.color)}
        ${l.urgent ? '<span class="card-tag urgent">Срочно</span>' : (l.free ? '<span class="card-tag free">Бесплатно</span>' : '<span class="card-tag">Символично</span>')}
      </div>
      <div class="card-body">
        <h3>${l.title}</h3>
        <div class="card-from">${l.from} · ${l.district}</div>
        <div class="card-meta">
          <span class="portions">${l.portions} ${pluralPortions(l.portions)}</span>
          <span>до ${l.until}</span>
          <span class="arrow">→</span>
        </div>
      </div>
    </div>
  `).join('');
}

function pluralPortions(n) {
  const mod10 = n % 10, mod100 = n % 100;
  if (mod100 >= 11 && mod100 <= 19) return 'порций';
  if (mod10 === 1) return 'порция';
  if (mod10 >= 2 && mod10 <= 4) return 'порции';
  return 'порций';
}

/* ============= FILTERS ============= */
document.querySelectorAll('.chip[data-filter]').forEach(chip => {
  chip.addEventListener('click', () => {
    document.querySelectorAll('.chip[data-filter]').forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    activeFilter = chip.dataset.filter;
    renderListings();
  });
});

document.getElementById('search-input').addEventListener('input', e => {
  activeSearch = e.target.value;
  renderListings();
});

/* ============= MODAL ============= */
function openModal(id) {
  const l = listings.find(x => x.id === id);
  if (!l) return;
  document.getElementById('modal-img').innerHTML = makeFoodIllustration(l.emoji, l.color);
  const cats = { bakery: 'Хлеб и выпечка', meals: 'Готовые блюда', produce: 'Овощи и фрукты', dairy: 'Молочка' };
  document.getElementById('modal-body').innerHTML = `
    <div class="tag-row">
      ${l.urgent ? '<span class="card-tag urgent">Срочно</span>' : ''}
      <span class="card-tag ${l.free ? 'free' : ''}">${l.free ? 'Бесплатно' : 'Символическая цена'}</span>
      <span class="card-tag">${cats[l.category] || ''}</span>
    </div>
    <h2>${l.title}</h2>
    <div class="from">${l.from}</div>
    <p class="desc">${l.notes}</p>
    <ul class="info-list">
      <li><span>Район</span><span>${l.district}</span></li>
      <li><span>Порций</span><span>${l.portions}</span></li>
      <li><span>Забрать до</span><span>${l.until}</span></li>
      <li><span>Тип</span><span>${cats[l.category]}</span></li>
    </ul>
    <div class="modal-actions">
      <button class="btn btn-primary" onclick="reserveListing(${l.id})">Забронировать</button>
      <button class="btn btn-secondary" onclick="closeModal()">Подумать</button>
    </div>
  `;
  document.getElementById('modal').classList.add('open');
}

function closeModal() {
  document.getElementById('modal').classList.remove('open');
}

document.getElementById('modal').addEventListener('click', e => {
  if (e.target.id === 'modal') closeModal();
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});

function reserveListing(id) {
  const l = listings.find(x => x.id === id);
  closeModal();
  showToast(`Забронировано: ${l.title}`);
}

/* ============= TOAST ============= */
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2800);
}

/* ============= SHARE FORM ============= */
document.getElementById('share-form').addEventListener('submit', e => {
  e.preventDefault();
  const formData = {
    id: Date.now(),
    title: document.getElementById('title').value,
    from: document.getElementById('from').value,
    category: document.getElementById('category').value,
    portions: parseInt(document.getElementById('portions').value),
    district: document.getElementById('district').value,
    until: document.getElementById('until').value,
    notes: document.getElementById('notes').value || 'Подробности уточняй у автора объявления.',
    urgent: false,
    free: true,
    emoji: getEmojiByCategory(document.getElementById('category').value),
    color: getColorByCategory(document.getElementById('category').value),
  };
  listings.unshift(formData);
  localStorage.setItem('ecofood-listings', JSON.stringify(listings));
  renderListings();
  e.target.reset();
  document.getElementById('portions').value = 2;
  document.getElementById('until').value = '20:00';
  showToast('Опубликовано! Объявление в ленте.');
  document.getElementById('available').scrollIntoView({ behavior: 'smooth' });
});

function getEmojiByCategory(c) {
  return { bakery: '🥖', meals: '🍲', produce: '🥬', dairy: '🥛' }[c] || '🍽️';
}
function getColorByCategory(c) {
  return { bakery: '#E8A434', meals: '#D7572C', produce: '#1F4031', dairy: '#B8C9A8' }[c] || '#1F4031';
}

/* ============= COUNTER ANIMATION ============= */
function animateCounters() {
  document.querySelectorAll('.stat-num').forEach(el => {
    const target = parseInt(el.dataset.count);
    const unit = el.querySelector('.unit');
    const unitHTML = unit ? unit.outerHTML : '';
    let current = 0;
    const inc = Math.max(1, Math.floor(target / 60));
    const t = setInterval(() => {
      current += inc;
      if (current >= target) { current = target; clearInterval(t); }
      el.innerHTML = current.toLocaleString('ru-RU') + unitHTML;
    }, 28);
  });
}

/* ============= MAP TOOLTIP ============= */
const tooltip = document.getElementById('map-tooltip');
const mapWrap = document.querySelector('.map-wrap');
document.querySelectorAll('.map-pin').forEach(pin => {
  pin.addEventListener('mouseenter', e => {
    const name = pin.dataset.name;
    const info = pin.dataset.info;
    tooltip.innerHTML = `<strong>${name}</strong><br/><span style="opacity:.7;font-size:12px">${info}</span>`;
    tooltip.style.opacity = '1';
  });
  pin.addEventListener('mousemove', e => {
    const rect = mapWrap.getBoundingClientRect();
    tooltip.style.left = (e.clientX - rect.left) + 'px';
    tooltip.style.top = (e.clientY - rect.top) + 'px';
  });
  pin.addEventListener('mouseleave', () => {
    tooltip.style.opacity = '0';
  });
  pin.addEventListener('click', () => {
    showToast(`Открываем «${pin.dataset.name}»...`);
  });
});

/* ============= REVEAL ANIMATIONS ============= */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ============= INIT ============= */
renderListings();
let countersStarted = false;
const countObserver = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting && !countersStarted) {
    countersStarted = true;
    animateCounters();
  }
});
countObserver.observe(document.querySelector('.ticker'));
