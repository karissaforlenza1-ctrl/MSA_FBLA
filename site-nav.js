(() => {
	const header = document.querySelector('.site-header');
	const mainNav = header?.querySelector('nav[aria-label="Main navigation"]');
	if (!header || !mainNav) return;

	const links = [
		['index.html', 'Home'],
		['mission.html', 'Mission'],
		['sponsor.html', 'Sponsor'],
		['social.html', 'Social'],
		['events.html', 'Events'],
		['conference.html', 'Conference'],
		['competition.html', 'Competition'],
		['rankings.html', 'Rankings'],
		['officers.html', 'Officers'],
		['gallery.html', 'Gallery'],
		['coordinator.html', 'Coordinator']
	];
	const primaryLinks = new Set(['index.html', 'mission.html', 'sponsor.html', 'social.html']);

	const createLink = ([href, label]) => {
		const link = document.createElement('a');
		link.href = href;
		link.textContent = label;
		return link;
	};

	mainNav.className = 'primary-nav';
	mainNav.innerHTML = '';
	links.filter(([href]) => primaryLinks.has(href)).forEach((link) => mainNav.appendChild(createLink(link)));

	let mobileNav = header.querySelector('.mobile-menu');
	if (!mobileNav) {
		mobileNav = document.createElement('nav');
		header.appendChild(mobileNav);
	}
	mobileNav.className = 'mobile-menu';
	mobileNav.id = 'mobile-menu';
	mobileNav.setAttribute('aria-label', 'More navigation');
	mobileNav.innerHTML = '';
	links.filter(([href]) => !primaryLinks.has(href)).forEach((link) => mobileNav.appendChild(createLink(link)));

	let menuToggle = header.querySelector('.menu-toggle');
	if (!menuToggle) {
		menuToggle = document.createElement('button');
		header.appendChild(menuToggle);
	}
	menuToggle.className = 'menu-toggle';
	menuToggle.type = 'button';
	menuToggle.id = 'menu-toggle';
	menuToggle.setAttribute('aria-expanded', 'false');
	menuToggle.setAttribute('aria-controls', 'mobile-menu');
	menuToggle.setAttribute('aria-label', 'Open more navigation');
	menuToggle.textContent = '☰';

	const style = document.createElement('style');
	style.textContent = `
		.site-header { position: relative; }
		.primary-nav { display: flex !important; gap: 18px !important; align-items: center; }
		.primary-nav a { white-space: nowrap; }
		.menu-toggle { display: block; padding: 9px 12px; border: 1px solid rgba(29,50,83,.14); background: #fff; color: #1d3253; font-size: 21px; line-height: 1; cursor: pointer; }
		.mobile-menu { display: none; position: absolute; top: calc(100% + 8px); right: 18px; z-index: 20; min-width: 220px; padding: 8px; background: #fff; border: 1px solid rgba(29,50,83,.14); box-shadow: 0 14px 30px rgba(17,33,58,.16); }
		.mobile-menu.is-open { display: grid; gap: 2px; }
		.mobile-menu a { padding: 12px 14px; color: #1d3253; font-size: 12px; font-weight: 700; letter-spacing: .08em; text-decoration: none; text-transform: uppercase; }
		.mobile-menu a:hover { background: #edf6ff; color: #d9472f; }
		@media (max-width: 700px) {
			.site-header { padding: 12px 14px !important; }
			.brand-logo { width: 86px !important; height: 58px !important; }
			.primary-nav { gap: 8px !important; flex: 1; justify-content: flex-end; }
			.primary-nav a { font-size: 10px; letter-spacing: .02em; }
			.menu-toggle { padding: 8px 10px; margin-left: 8px; }
			.mobile-menu { right: 14px; left: 14px; min-width: 0; }
		}
	`;
	document.head.appendChild(style);

	menuToggle.addEventListener('click', () => {
		const isOpen = mobileNav.classList.toggle('is-open');
		menuToggle.setAttribute('aria-expanded', String(isOpen));
		menuToggle.setAttribute('aria-label', isOpen ? 'Close more navigation' : 'Open more navigation');
	});

	document.addEventListener('click', (event) => {
		if (!header.contains(event.target)) {
			mobileNav.classList.remove('is-open');
			menuToggle.setAttribute('aria-expanded', 'false');
		}
	});
})();
