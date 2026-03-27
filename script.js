const progressFill = document.getElementById("progressFill");
const progressPercent = document.getElementById("progressPercent");
const assetsStatus = document.getElementById("assetsStatus");
const shadersStatus = document.getElementById("shadersStatus");
const networkStatus = document.getElementById("networkStatus");
const withMusicBtn = document.getElementById("withMusicBtn");
const withoutMusicBtn = document.getElementById("withoutMusicBtn");
const progressTrack = document.querySelector(".progress-track");
const background = document.querySelector(".bg-squares");
const launcherWrap = document.getElementById("launcherWrap");
const portfolioPage = document.getElementById("portfolioPage");

const heroName = document.getElementById("heroName");
const heroBio = document.getElementById("heroBio");
const avatarImg = document.getElementById("avatarImg");
const hpStat = document.getElementById("hpStat");
const xpStat = document.getElementById("xpStat");
const skillChips = document.getElementById("skillChips");
const projectGrid = document.getElementById("projectGrid");
const contactBtn = document.getElementById("contactBtn");
const hireBtn = document.getElementById("hireBtn");
const viewProjectsBtn = document.getElementById("viewProjectsBtn");
const missionText = document.getElementById("missionText");
const abilityGrid = document.getElementById("abilityGrid");
const aboutTags = document.getElementById("aboutTags");
const aboutAvatar = document.getElementById("aboutAvatar");
const aboutProjectsBtn = document.getElementById("aboutProjectsBtn");
const aboutContactBtn = document.getElementById("aboutContactBtn");
const playerStatsCards = document.getElementById("playerStatsCards");
const loadoutTabs = document.getElementById("loadoutTabs");
const loadoutTitle = document.getElementById("loadoutTitle");
const loadoutLevel = document.getElementById("loadoutLevel");
const equipmentChips = document.getElementById("equipmentChips");
const achievementList = document.getElementById("achievementList");
const loadoutSide = document.getElementById("loadoutSide");
const projectPreviewImg = document.getElementById("projectPreviewImg");
const projectShowcaseTitle = document.getElementById("projectShowcaseTitle");
const projectShowcaseSummary = document.getElementById(
  "projectShowcaseSummary",
);
const projectShowcaseMeta = document.getElementById("projectShowcaseMeta");
const projectShowcasePoints = document.getElementById("projectShowcasePoints");
const projectShowcaseLink = document.getElementById("projectShowcaseLink");
const projectPrevBtn = document.getElementById("projectPrevBtn");
const projectNextBtn = document.getElementById("projectNextBtn");

const switchboardList = document.getElementById("switchboardList");
const experienceRole = document.getElementById("experienceRole");
const experienceCompany = document.getElementById("experienceCompany");
const experiencePeriod = document.getElementById("experiencePeriod");
const experienceTitle = document.getElementById("experienceTitle");
const experienceSummary = document.getElementById("experienceSummary");
const experienceTags = document.getElementById("experienceTags");
const experiencePoints = document.getElementById("experiencePoints");
const experiencePrevBtn = document.getElementById("experiencePrevBtn");
const experienceNextBtn = document.getElementById("experienceNextBtn");

const reviewCredits = document.getElementById("reviewCredits");
const reviewScore = document.getElementById("reviewScore");
const reviewQuote = document.getElementById("reviewQuote");
const reviewStars = document.getElementById("reviewStars");
const reviewAuthor = document.getElementById("reviewAuthor");
const reviewAuthorRole = document.getElementById("reviewAuthorRole");
const reviewPrevBtn = document.getElementById("reviewPrevBtn");
const reviewNextBtn = document.getElementById("reviewNextBtn");
const contactForm = document.getElementById("contactForm");
const contactNameInput = document.getElementById("contactName");
const contactEmailInput = document.getElementById("contactEmail");
const contactMessageInput = document.getElementById("contactMessage");
const contactEmailLink = document.getElementById("contactEmailLink");
const contactGithubLink = document.getElementById("contactGithubLink");
const miniAvatar = document.getElementById("miniAvatar");
const miniName = document.getElementById("miniName");
const miniRole = document.getElementById("miniRole");
const miniBio = document.getElementById("miniBio");
const connectBarOne = document.getElementById("connectBarOne");
const connectBarTwo = document.getElementById("connectBarTwo");
const contactHp = document.getElementById("contactHp");
const contactXp = document.getElementById("contactXp");
const finalCtaMail = document.getElementById("finalCtaMail");
const localTimeText = document.getElementById("localTimeText");
const copyrightText = document.getElementById("copyrightText");
const backToTopBtn = document.getElementById("backToTopBtn");
const pricingBtn = document.getElementById("pricingBtn");
const availabilityBtn = document.getElementById("availabilityBtn");
const heroRightPanel = document.querySelector(".hero-right");

let progress = 0;
let musicEngine = null;
let loadoutState = [];
let activeLoadout = 0;
let projectShowcaseState = [];
let activeProjectShowcase = 0;
let experienceState = [];
let activeExperience = 0;
let reviewState = [];
let activeReview = 0;
let revealObserver = null;

const GITHUB_USERNAME = "akshatt877";
const CUSTOM_HERO_IMAGE = "assets/hero-character.png";

const HERO_FIXED_SKILLS = [
  "React",
  "TypeScript",
  "Framer Motion",
  "Tailwind",
  "3D / Assets",
];

const HERO_FIXED_CARDS = [
  { title: "Top Project", subtitle: "GTA Mod UI", tilt: "-2deg" },
  { title: "Current Goal", subtitle: "1-month stream prep", tilt: "1.2deg" },
  { title: "Live", subtitle: "GTA6 launch plan", tilt: "-0.8deg" },
  { title: "Shop", subtitle: "Merch + Packaging", tilt: "1.4deg" },
];

function createFloatingSquares() {
  const squareCount = window.innerWidth < 760 ? 12 : 18;
  background.innerHTML = "";

  for (let i = 0; i < squareCount; i += 1) {
    const square = document.createElement("span");
    const size = Math.random() * 28 + 18;
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const duration = Math.random() * 12 + 12;
    const delay = Math.random() * 7;
    const angle = `${Math.floor(Math.random() * 40) - 20}deg`;

    square.style.width = `${size}px`;
    square.style.height = `${size}px`;
    square.style.left = `${x}%`;
    square.style.top = `${y}%`;
    square.style.animationDuration = `${duration}s`;
    square.style.animationDelay = `-${delay}s`;
    square.style.setProperty("--angle", angle);

    background.appendChild(square);
  }
}

function updateProgressUI(value) {
  progressFill.style.width = `${value}%`;
  progressPercent.textContent = `${value}%`;
  progressTrack.setAttribute("aria-valuenow", String(value));

  const assets = Math.min(100, Math.round(value));
  const shaders = Math.min(100, Math.round(value * 0.85));

  assetsStatus.textContent = `Assets: ${assets}%`;
  shadersStatus.textContent = `Shaders: ${shaders}%`;

  if (value < 30) {
    networkStatus.textContent = "Network: Connecting";
  } else if (value < 100) {
    networkStatus.textContent = "Network: Online";
  } else {
    networkStatus.textContent = "Network: Stable";
  }
}

function startLoadingSequence() {
  const timer = setInterval(() => {
    const increment = Math.random() < 0.7 ? 1 : 2;
    progress = Math.min(100, progress + increment);
    updateProgressUI(progress);

    if (progress >= 100) {
      clearInterval(timer);
      withMusicBtn.disabled = false;
      withoutMusicBtn.disabled = false;
    }
  }, 70);
}

function ensureMusicEngine() {
  if (musicEngine) {
    return musicEngine;
  }

  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) {
    return null;
  }

  const context = new AudioContextClass();
  const gain = context.createGain();
  gain.gain.value = 0.03;
  gain.connect(context.destination);

  musicEngine = { context, gain, timer: null };
  return musicEngine;
}

function startMusic() {
  const engine = ensureMusicEngine();
  if (!engine) {
    return;
  }

  const notes = [220, 246.94, 293.66, 329.63, 349.23, 392.0, 440.0];
  let idx = 0;

  if (engine.timer) {
    clearInterval(engine.timer);
  }

  engine.context.resume();

  engine.timer = setInterval(() => {
    const osc = engine.context.createOscillator();
    const note = notes[idx % notes.length];
    idx += 1;

    osc.type = "triangle";
    osc.frequency.setValueAtTime(note, engine.context.currentTime);
    osc.connect(engine.gain);
    osc.start();
    osc.stop(engine.context.currentTime + 0.22);
  }, 260);
}

function stopMusic() {
  if (!musicEngine || !musicEngine.timer) {
    return;
  }

  clearInterval(musicEngine.timer);
  musicEngine.timer = null;
}

function enterPortfolio(withMusic) {
  if (withMusic) {
    startMusic();
  } else {
    stopMusic();
  }

  withMusicBtn.textContent = "Launching...";
  withoutMusicBtn.textContent = "Launching...";
  withMusicBtn.disabled = true;
  withoutMusicBtn.disabled = true;

  setTimeout(() => {
    launcherWrap.classList.add("hidden");
    portfolioPage.classList.remove("hidden");
    document.body.classList.add("mode-portfolio");
    window.location.hash = "home";
    fetchGithubPortfolio();
  }, 700);
}

function normalizeBio(bio, company) {
  if (bio && bio.trim()) {
    return bio;
  }

  if (company && company.trim()) {
    return `Building polished products at ${company}.`;
  }

  return "Building web experiences with game-like polish, clean interfaces, and expressive interactions.";
}

function getTopSkills(repos) {
  const frequencies = new Map();

  repos.forEach((repo) => {
    if (!repo.language) {
      return;
    }
    const current = frequencies.get(repo.language) || 0;
    frequencies.set(repo.language, current + 1);
  });

  const sorted = [...frequencies.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map((entry) => entry[0]);

  if (sorted.length) {
    return sorted;
  }

  return ["JavaScript", "TypeScript", "React", "Node.js", "CSS"];
}

function pickFeaturedProjects(repos) {
  return repos
    .filter((repo) => !repo.fork)
    .sort((a, b) => {
      if (b.stargazers_count !== a.stargazers_count) {
        return b.stargazers_count - a.stargazers_count;
      }
      return (
        new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
      );
    })
    .slice(0, 4);
}

function inferLevel(count) {
  if (count >= 8) {
    return "Expert";
  }
  if (count >= 4) {
    return "Advanced";
  }
  return "Intermediate";
}

function getAbilityItems(repos) {
  const frequencies = new Map();

  repos.forEach((repo) => {
    if (!repo.language) {
      return;
    }
    frequencies.set(repo.language, (frequencies.get(repo.language) || 0) + 1);
  });

  const top = [...frequencies.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4);

  if (!top.length) {
    return [
      ["JavaScript", 4],
      ["TypeScript", 3],
      ["React", 3],
      ["UI Engineering", 2],
    ];
  }

  return top;
}

function renderSkills(skills) {
  skillChips.innerHTML = "";
  skills.forEach((skill) => {
    const chip = document.createElement("span");
    chip.className = "skill-chip";
    chip.textContent = skill;
    skillChips.appendChild(chip);
  });
}

function shorten(text, max) {
  if (!text) {
    return "No description yet.";
  }
  if (text.length <= max) {
    return text;
  }
  return `${text.slice(0, max - 3)}...`;
}

function renderProjects(projects) {
  void projects;
  projectGrid.innerHTML = "";

  HERO_FIXED_CARDS.forEach((project) => {
    const card = document.createElement("article");
    card.className = "project-card";
    card.style.setProperty("--tilt", project.tilt);

    const title = document.createElement("h3");
    title.textContent = project.title;

    const desc = document.createElement("p");
    desc.textContent = project.subtitle;

    card.append(title, desc);
    projectGrid.appendChild(card);
  });
}

function renderAbilities(abilities) {
  abilityGrid.innerHTML = "";

  abilities.forEach(([name, count]) => {
    const card = document.createElement("article");
    card.className = "ability-item";

    const title = document.createElement("h4");
    title.textContent = name;

    const level = document.createElement("p");
    level.textContent = inferLevel(count);

    card.append(title, level);
    abilityGrid.appendChild(card);
  });
}

function renderAboutTags(skills) {
  aboutTags.innerHTML = "";
  skills.slice(0, 3).forEach((skill) => {
    const tag = document.createElement("span");
    tag.className = "about-tag";
    tag.textContent = skill.toUpperCase();
    aboutTags.appendChild(tag);
  });
}

function formatK(value) {
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}k`;
  }
  return String(value);
}

function formatDate(dateStr) {
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) {
    return "Unknown";
  }
  return d.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

function buildProjectShowcaseData(repos) {
  const nonFork = repos.filter((repo) => !repo.fork);
  const sorted = [...nonFork].sort((a, b) => {
    if (b.stargazers_count !== a.stargazers_count) {
      return b.stargazers_count - a.stargazers_count;
    }
    return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
  });

  return sorted.slice(0, 6).map((repo) => {
    const lang = repo.language || "Code";
    return {
      title: repo.name.replace(/[-_]/g, " ").toUpperCase(),
      summary: shorten(
        repo.description ||
          `Open-source build focused on ${lang} and polished delivery.`,
        120,
      ),
      image: `https://opengraph.githubassets.com/1/${GITHUB_USERNAME}/${repo.name}`,
      meta: [
        lang,
        `${repo.stargazers_count} Stars`,
        `${repo.forks_count} Forks`,
      ],
      points: [
        `Last updated ${formatDate(repo.updated_at)} with active iteration.`,
        `${repo.open_issues_count || 0} open issues tracked for improvements.`,
        `Repository size ${repo.size} KB and deployment-ready structure.`,
      ],
      link: repo.html_url,
    };
  });
}

function renderProjectShowcase() {
  if (!projectShowcaseState.length) {
    return;
  }

  const current = projectShowcaseState[activeProjectShowcase];
  projectPreviewImg.src = current.image;
  projectPreviewImg.alt = `${current.title} preview`;
  projectShowcaseTitle.textContent = current.title;
  projectShowcaseSummary.textContent = current.summary;
  projectShowcaseLink.href = current.link;

  projectShowcaseMeta.innerHTML = "";
  current.meta.forEach((item) => {
    const chip = document.createElement("span");
    chip.textContent = item;
    projectShowcaseMeta.appendChild(chip);
  });

  projectShowcasePoints.innerHTML = "";
  current.points.forEach((point) => {
    const li = document.createElement("li");
    li.textContent = point;
    projectShowcasePoints.appendChild(li);
  });
}

function roleForLanguage(language) {
  const lower = (language || "").toLowerCase();
  if (["javascript", "typescript", "html", "css"].includes(lower)) {
    return "SENIOR FRONTEND ENGINEER";
  }
  if (["python", "java", "go", "rust", "c#"].includes(lower)) {
    return "FULLSTACK ENGINEER";
  }
  return "PRODUCT ENGINEER";
}

function buildExperienceData(repos) {
  const nonFork = repos.filter((repo) => !repo.fork);
  const sorted = [...nonFork].sort(
    (a, b) =>
      new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime(),
  );

  return sorted.slice(0, 4).map((repo) => ({
    switchLabel: repo.name.replace(/[-_]/g, " ").toUpperCase(),
    role: roleForLanguage(repo.language),
    company: repo.name.replace(/[-_]/g, " "),
    period: `${formatDate(repo.created_at)} - Present • Open Source`,
    summary: shorten(
      repo.description ||
        `Built and maintained ${repo.name} with a focus on quality and delivery.`,
      120,
    ),
    tags: [repo.language || "Code", "GitHub", "Open Source"],
    points: [
      `Delivered ${repo.stargazers_count} stars and ${repo.forks_count} forks from the community.`,
      `Resolved and tracked ${repo.open_issues_count || 0} active issues through iteration.`,
      `Kept release velocity high with consistent updates in ${formatDate(repo.updated_at)}.`,
    ],
  }));
}

function renderExperienceSwitchboard() {
  switchboardList.innerHTML = "";

  experienceState.forEach((entry, index) => {
    const item = document.createElement("button");
    item.type = "button";
    item.className = `switch-item${index === activeExperience ? " active" : ""}`;

    const label = document.createElement("span");
    label.textContent = entry.switchLabel;

    const toggle = document.createElement("div");
    toggle.className = "switch-toggle";

    item.append(label, toggle);
    item.addEventListener("click", () => {
      activeExperience = index;
      renderExperienceSection();
    });

    switchboardList.appendChild(item);
  });
}

function renderExperienceSection() {
  if (!experienceState.length) {
    return;
  }

  const current = experienceState[activeExperience];
  experienceRole.textContent = current.role;
  experienceCompany.textContent = current.company;
  experiencePeriod.textContent = current.period;
  experienceTitle.textContent = current.company.toUpperCase();
  experienceSummary.textContent = current.summary;

  experienceTags.innerHTML = "";
  current.tags.forEach((tag) => {
    const chip = document.createElement("span");
    chip.textContent = tag;
    experienceTags.appendChild(chip);
  });

  experiencePoints.innerHTML = "";
  current.points.forEach((point) => {
    const li = document.createElement("li");
    li.textContent = point;
    experiencePoints.appendChild(li);
  });

  renderExperienceSwitchboard();
}

function buildReviewData(profile, repos) {
  const nonFork = repos.filter((repo) => !repo.fork);
  const totalStars = nonFork.reduce(
    (sum, repo) => sum + (repo.stargazers_count || 0),
    0,
  );
  const latest = [...nonFork].sort(
    (a, b) =>
      new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime(),
  )[0];

  return [
    {
      quote: `${profile.name || profile.login} maintains ${nonFork.length} active repositories with consistent production-ready updates.`,
      author: "GITHUB INSIGHTS",
      role: "Profile analytics stream",
      stars: 5,
      score: 5000,
      credits: 3,
    },
    {
      quote: `Open-source impact shows ${totalStars} stars collected with a strong focus on clean developer experience.`,
      author: "REPOSITORY SIGNAL",
      role: "Community telemetry",
      stars: 5,
      score: 6200,
      credits: 2,
    },
    {
      quote: latest
        ? `${latest.name} received recent updates in ${formatDate(latest.updated_at)} and demonstrates ongoing craftsmanship.`
        : "Recent build activity remains strong across portfolio projects.",
      author: "DEPLOY LOG",
      role: "Release timeline monitor",
      stars: 4,
      score: 7100,
      credits: 1,
    },
  ];
}

function renderReviewSection() {
  if (!reviewState.length) {
    return;
  }

  const current = reviewState[activeReview];
  reviewQuote.textContent = `"${current.quote}"`;
  reviewAuthor.textContent = current.author;
  reviewAuthorRole.textContent = current.role;
  reviewScore.textContent = `SCORE: ${current.score}`;
  reviewStars.textContent = "⭐ ".repeat(current.stars).trim();
  reviewCredits.textContent = `CREDITS: ${"🪙 ".repeat(current.credits).trim()}`;
}

function inferRoleFromRepos(repos) {
  const langs = getTopSkills(repos).map((item) => item.toLowerCase());
  if (langs.includes("javascript") || langs.includes("typescript")) {
    return "Frontend • Creator";
  }
  return "Product • Developer";
}

function getReachableEmail(profile) {
  if (profile.email && profile.email.trim()) {
    return profile.email.trim();
  }
  return `${GITHUB_USERNAME}@users.noreply.github.com`;
}

function updateClock() {
  const now = new Date();
  const parts = now.toLocaleTimeString("en-US", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  localTimeText.textContent = `Local time: ${parts}`;
}

function renderContactAndFinal(profile, repos) {
  const email = getReachableEmail(profile);
  const displayName = profile.name || profile.login || "Akshat";

  contactNameInput.value = displayName;
  contactEmailInput.value = email;
  contactMessageInput.value = `Hi ${displayName}, let's build something epic together.`;

  contactEmailLink.href = `mailto:${email}`;
  contactGithubLink.href = `https://github.com/${GITHUB_USERNAME}`;

  miniAvatar.src =
    profile.avatar_url || `https://github.com/${GITHUB_USERNAME}.png`;
  miniAvatar.alt = `${displayName} avatar`;
  miniName.textContent = displayName;
  miniRole.textContent = inferRoleFromRepos(repos);
  miniBio.textContent = normalizeBio(profile.bio, profile.company);

  const firstBar = Math.min(100, 30 + (profile.public_repos || 0) * 2);
  const secondBar = Math.min(100, 25 + (profile.followers || 0) * 4);
  connectBarOne.style.width = `${firstBar}%`;
  connectBarTwo.style.width = `${secondBar}%`;

  const hp = 80 + Math.min(20, profile.public_repos || 0);
  const xp = Math.min(99, Math.max(12, (profile.followers || 0) * 2));
  contactHp.textContent = `HP ${hp}`;
  contactXp.textContent = `XP ${xp}%`;

  finalCtaMail.textContent = email.toUpperCase();
  finalCtaMail.href = `mailto:${email}`;
  copyrightText.textContent = `© ${new Date().getFullYear()} All rights reserved.`;
}

function setHeroImage(preferredSrc, fallbackSrc, fallbackAlt) {
  avatarImg.onerror = () => {
    avatarImg.onerror = null;
    avatarImg.src = fallbackSrc;
    avatarImg.alt = fallbackAlt;
  };

  avatarImg.src = preferredSrc;
}

function setupHeroCursorParallax() {
  if (!heroRightPanel || !avatarImg) {
    return;
  }

  const maxShift = 14;
  const maxTilt = 5;

  heroRightPanel.addEventListener("mousemove", (event) => {
    const rect = heroRightPanel.getBoundingClientRect();
    const nx = (event.clientX - rect.left) / rect.width - 0.5;
    const ny = (event.clientY - rect.top) / rect.height - 0.5;

    const tx = nx * maxShift;
    const ty = ny * maxShift;
    const ry = nx * maxTilt;
    const rx = -ny * maxTilt;

    avatarImg.style.transform = `translate(${tx}px, ${ty}px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.02)`;
  });

  heroRightPanel.addEventListener("mouseleave", () => {
    avatarImg.style.transform =
      "translate(0, 0) rotateX(0deg) rotateY(0deg) scale(1)";
  });
}

function setupScrollReveal() {
  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  const targets = [
    ...document.querySelectorAll(
      [
        ".hero-left",
        ".hero-right",
        ".about-section",
        ".skills-section",
        ".projects-showcase-section",
        ".experience-section",
        ".testimonials-section",
        ".contact-section",
        ".final-cta-section",
        ".project-card",
        ".ability-item",
        ".stats-card",
        ".side-card",
        ".switch-item",
        ".achievement-item",
      ].join(","),
    ),
  ];

  if (!targets.length) {
    return;
  }

  if (prefersReduced) {
    targets.forEach((el) => {
      el.classList.remove(
        "reveal",
        "reveal-delay-1",
        "reveal-delay-2",
        "reveal-delay-3",
      );
      el.classList.add("is-visible");
    });
    return;
  }

  if (revealObserver) {
    revealObserver.disconnect();
  }

  targets.forEach((el, index) => {
    el.classList.add("reveal");
    el.classList.remove(
      "is-visible",
      "reveal-delay-1",
      "reveal-delay-2",
      "reveal-delay-3",
    );

    const mod = index % 4;
    if (mod === 1) {
      el.classList.add("reveal-delay-1");
    } else if (mod === 2) {
      el.classList.add("reveal-delay-2");
    } else if (mod === 3) {
      el.classList.add("reveal-delay-3");
    }
  });

  revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      root: null,
      rootMargin: "0px 0px -8% 0px",
      threshold: 0.12,
    },
  );

  targets.forEach((el) => revealObserver.observe(el));
}

function renderPlayerStats(profile, repos) {
  const totalStars = repos.reduce(
    (sum, repo) => sum + (repo.stargazers_count || 0),
    0,
  );
  const totalForks = repos.reduce(
    (sum, repo) => sum + (repo.forks_count || 0),
    0,
  );
  const cards = [
    { value: repos.filter((repo) => !repo.fork).length, label: "PROJECTS" },
    { value: profile.followers || 0, label: "FOLLOWERS" },
    { value: totalStars + totalForks, label: "IMPACT" },
  ];

  playerStatsCards.innerHTML = "";

  cards.forEach((item) => {
    const card = document.createElement("article");
    card.className = "stats-card";

    const strong = document.createElement("strong");
    strong.textContent = formatK(item.value);

    const label = document.createElement("span");
    label.textContent = item.label;

    card.append(strong, label);
    playerStatsCards.appendChild(card);
  });
}

function averageStarsFor(filterFn, repos) {
  const filtered = repos.filter(filterFn);
  if (!filtered.length) {
    return 20;
  }
  const stars = filtered.reduce(
    (sum, repo) => sum + (repo.stargazers_count || 0),
    0,
  );
  const score = Math.min(100, 25 + Math.round((stars / filtered.length) * 25));
  return Math.max(20, score);
}

function buildLoadoutData(repos) {
  const nonForks = repos.filter((repo) => !repo.fork);
  const textFor = (repo) =>
    `${repo.name} ${repo.description || ""}`.toLowerCase();

  const foundationsKeywords = [
    "html",
    "css",
    "typescript",
    "javascript",
    "a11y",
  ];
  const motionKeywords = [
    "motion",
    "animation",
    "framer",
    "gsap",
    "scroll",
    "parallax",
  ];
  const backendLangs = [
    "Python",
    "Java",
    "C#",
    "Go",
    "Rust",
    "PHP",
    "Ruby",
    "Node",
  ];

  const foundationsRepos = nonForks.filter((repo) => {
    const lower = textFor(repo);
    return foundationsKeywords.some((keyword) => lower.includes(keyword));
  });

  const frontendRepos = nonForks.filter((repo) => {
    const lang = (repo.language || "").toLowerCase();
    return ["javascript", "typescript", "html", "css"].includes(lang);
  });

  const motionRepos = nonForks.filter((repo) => {
    const lower = textFor(repo);
    return motionKeywords.some((keyword) => lower.includes(keyword));
  });

  const backendRepos = nonForks.filter((repo) => {
    const lang = repo.language || "";
    return backendLangs.some((target) => lang.includes(target));
  });

  const data = [
    {
      icon: "🏗️",
      label: "Foundations",
      title: "FOUNDATIONS",
      color: "#f8c83d",
      repos: foundationsRepos,
      skills: ["HTML", "CSS", "JAVASCRIPT", "TYPESCRIPT", "A11Y", "TESTING"],
    },
    {
      icon: "⚡",
      label: "Frontend",
      title: "FRONTEND",
      color: "#20e2b0",
      repos: frontendRepos,
      skills: [
        "REACT",
        "NEXT.JS",
        "STATE",
        "RESPONSIVE UI",
        "COMPONENTS",
        "SPA",
      ],
    },
    {
      icon: "🎬",
      label: "Motion & Scroll",
      title: "MOTION & SCROLL",
      color: "#ff5f95",
      repos: motionRepos,
      skills: ["GSAP", "FRAMER", "SCROLL FX", "TIMELINES", "MICRO UX"],
    },
    {
      icon: "⚙️",
      label: "Build & Backend",
      title: "BUILD & BACKEND",
      color: "#3ab2f6",
      repos: backendRepos,
      skills: ["API", "NODE", "PYTHON", "DATABASE", "DEPLOY", "CI/CD"],
    },
  ];

  return data.map((entry, index) => {
    const count = entry.repos.length;
    const level = Math.min(4, Math.max(1, Math.ceil(count / 2) || 1));
    const achievements =
      entry.repos.slice(0, 3).map((repo) => {
        const base = repo.description || `Built project: ${repo.name}`;
        return shorten(base, 70);
      }) || [];

    if (!achievements.length) {
      achievements.push(
        "Completed practical projects and polished core workflows.",
      );
      achievements.push(
        "Improved architecture and performance through iteration.",
      );
      achievements.push(
        "Maintained clean code quality and deployment readiness.",
      );
    }

    return {
      ...entry,
      count,
      level,
      achievements,
      progress:
        index === 0
          ? averageStarsFor((repo) => foundationsRepos.includes(repo), repos)
          : index === 1
            ? averageStarsFor((repo) => frontendRepos.includes(repo), repos)
            : index === 2
              ? averageStarsFor((repo) => motionRepos.includes(repo), repos)
              : averageStarsFor((repo) => backendRepos.includes(repo), repos),
    };
  });
}

function renderLoadoutTabs() {
  loadoutTabs.innerHTML = "";

  loadoutState.forEach((item, index) => {
    const button = document.createElement("button");
    button.className = `loadout-tab${index === activeLoadout ? " active" : ""}`;
    button.type = "button";
    button.textContent = `${item.icon} ${item.title}`;
    button.addEventListener("click", () => {
      activeLoadout = index;
      renderLoadout();
    });
    loadoutTabs.appendChild(button);
  });
}

function renderLoadoutSide() {
  loadoutSide.innerHTML = "";

  loadoutState.forEach((item, index) => {
    const card = document.createElement("article");
    card.className = `side-card${index === activeLoadout ? " active" : ""}`;

    const head = document.createElement("div");
    head.className = "side-card-head";
    head.innerHTML = `<span>${item.icon} ${item.label}</span><span>${index === activeLoadout ? "▶" : ""}</span>`;

    const sub = document.createElement("p");
    sub.className = "side-card-sub";
    sub.textContent = `${item.count || item.skills.length} Skills`;

    const track = document.createElement("div");
    track.className = "side-progress";
    const fill = document.createElement("span");
    fill.style.width = `${item.progress}%`;
    fill.style.background = item.color;
    track.appendChild(fill);

    card.append(head, sub, track);
    loadoutSide.appendChild(card);
  });
}

function renderLoadout() {
  if (!loadoutState.length) {
    return;
  }

  const current = loadoutState[activeLoadout];
  loadoutTitle.textContent = `${current.icon} ${current.title}`;
  loadoutLevel.textContent = `⭐ Level ${current.level} / 4`;

  equipmentChips.innerHTML = "";
  current.skills.forEach((skill) => {
    const chip = document.createElement("span");
    chip.className = "equipment-chip";
    chip.textContent = skill;
    equipmentChips.appendChild(chip);
  });

  achievementList.innerHTML = "";
  current.achievements.forEach((entry) => {
    const item = document.createElement("article");
    item.className = "achievement-item";
    item.textContent = entry;
    achievementList.appendChild(item);
  });

  renderLoadoutTabs();
  renderLoadoutSide();
}

function applyProfile(profile, repos) {
  const firstName = (profile.name || profile.login || "Akshat").split(" ")[0];
  heroName.textContent = firstName;
  heroBio.textContent =
    "I build game-inspired web experiences - heavy on performance, clean UI, and delightful micro-interactions. I design interfaces that feel like menus and HUDs in retro games.";
  setHeroImage(
    CUSTOM_HERO_IMAGE,
    profile.avatar_url,
    `${profile.login} GitHub avatar`,
  );
  avatarImg.alt = "Hero character avatar";

  const hp = 80 + Math.min(20, profile.public_repos || 0);
  const xp = Math.min(99, Math.max(12, (profile.followers || 0) * 2));
  hpStat.textContent = `HP ${hp}`;
  xpStat.textContent = `XP ${xp}%`;

  const contactLink =
    profile.blog && profile.blog.trim()
      ? profile.blog
      : `https://github.com/${GITHUB_USERNAME}`;

  contactBtn.href = "#contact";
  hireBtn.href = `https://github.com/${GITHUB_USERNAME}`;
  viewProjectsBtn.href = `https://github.com/${GITHUB_USERNAME}?tab=repositories`;
  aboutProjectsBtn.href = `https://github.com/${GITHUB_USERNAME}?tab=repositories`;
  aboutContactBtn.href = contactLink;

  missionText.textContent = normalizeBio(profile.bio, profile.company);
  aboutAvatar.src = profile.avatar_url;
  aboutAvatar.alt = `${profile.login} profile visual`;

  const topSkills = getTopSkills(repos);
  renderSkills(HERO_FIXED_SKILLS);
  renderAboutTags(topSkills);
  renderAbilities(getAbilityItems(repos));
  renderProjects(pickFeaturedProjects(repos));
  renderPlayerStats(profile, repos);

  loadoutState = buildLoadoutData(repos);
  activeLoadout = 0;
  renderLoadout();

  projectShowcaseState = buildProjectShowcaseData(repos);
  if (!projectShowcaseState.length) {
    projectShowcaseState = [
      {
        title: "PROJECT WINDOW",
        summary: "No public repositories found yet.",
        image: `https://github.com/${GITHUB_USERNAME}.png`,
        meta: ["GitHub", "0 Stars", "0 Forks"],
        points: [
          "Create a public repository to unlock this section.",
          "Project metrics and details will appear here.",
          "This panel auto-syncs from your GitHub profile.",
        ],
        link: `https://github.com/${GITHUB_USERNAME}`,
      },
    ];
  }
  activeProjectShowcase = 0;
  renderProjectShowcase();

  experienceState = buildExperienceData(repos);
  if (!experienceState.length) {
    experienceState = [
      {
        switchLabel: "GITHUB PROFILE",
        role: "PRODUCT ENGINEER",
        company: GITHUB_USERNAME,
        period: "Now - Present • Open Source",
        summary:
          "Profile is ready. Push projects to display richer experience logs.",
        tags: ["GitHub", "Open Source", "Profile"],
        points: [
          "Experience cards are generated from your repositories.",
          "Each card tracks stars, forks, and update frequency.",
          "Add repositories to enrich this monitor.",
        ],
      },
    ];
  }
  activeExperience = 0;
  renderExperienceSection();

  reviewState = buildReviewData(profile, repos);
  activeReview = 0;
  renderReviewSection();

  renderContactAndFinal(profile, repos);
  setupScrollReveal();
}

function applyFallbackState() {
  heroName.textContent = "Akshat";
  heroBio.textContent =
    "I build game-inspired web experiences - heavy on performance, clean UI, and delightful micro-interactions. I design interfaces that feel like menus and HUDs in retro games.";
  setHeroImage(
    CUSTOM_HERO_IMAGE,
    `https://github.com/${GITHUB_USERNAME}.png`,
    "GitHub avatar",
  );
  hpStat.textContent = "HP 100";
  xpStat.textContent = "XP 30%";
  missionText.textContent =
    "I build game-like web interfaces with clean motion, tactile UI details, and fast loading experiences.";
  aboutAvatar.src = `https://github.com/${GITHUB_USERNAME}.png`;
  aboutAvatar.alt = "About profile visual";
  aboutProjectsBtn.href = `https://github.com/${GITHUB_USERNAME}?tab=repositories`;
  aboutContactBtn.href = `https://github.com/${GITHUB_USERNAME}`;

  const fallbackSkills = [
    "JavaScript",
    "TypeScript",
    "React",
    "Node.js",
    "CSS",
  ];
  renderSkills(HERO_FIXED_SKILLS);
  renderAboutTags(fallbackSkills);
  renderAbilities([
    ["JavaScript", 5],
    ["TypeScript", 4],
    ["React", 4],
    ["UI Engineering", 3],
  ]);
  renderProjects([
    {
      name: "Portfolio",
      description: "Responsive game-style portfolio shell.",
      html_url: `https://github.com/${GITHUB_USERNAME}`,
      stargazers_count: 0,
    },
    {
      name: "Featured Repo",
      description:
        "Live project data will appear when GitHub API is reachable.",
      html_url: `https://github.com/${GITHUB_USERNAME}?tab=repositories`,
      stargazers_count: 0,
    },
  ]);

  renderPlayerStats({ followers: 5 }, [
    { fork: false, stargazers_count: 2, forks_count: 1 },
    { fork: false, stargazers_count: 1, forks_count: 0 },
  ]);

  loadoutState = [
    {
      icon: "🏗️",
      label: "Foundations",
      title: "FOUNDATIONS",
      color: "#f8c83d",
      skills: ["HTML", "CSS", "JAVASCRIPT", "TYPESCRIPT", "A11Y", "TESTING"],
      achievements: [
        "Semantic HTML with ARIA patterns and reusable tokens.",
        "CSS utility layering and theme-ready architecture.",
        "Typed frontend workflows with lint and checks.",
      ],
      count: 6,
      progress: 72,
      level: 2,
    },
    {
      icon: "⚡",
      label: "Frontend",
      title: "FRONTEND",
      color: "#20e2b0",
      skills: [
        "REACT",
        "NEXT.JS",
        "STATE",
        "RESPONSIVE UI",
        "COMPONENTS",
        "SPA",
      ],
      achievements: [
        "Built modern interfaces with scalable component patterns.",
        "Created responsive layouts and strong user journeys.",
        "Shipped reusable front-end systems for production.",
      ],
      count: 6,
      progress: 66,
      level: 3,
    },
    {
      icon: "🎬",
      label: "Motion & Scroll",
      title: "MOTION & SCROLL",
      color: "#ff5f95",
      skills: ["GSAP", "FRAMER", "SCROLL FX", "TIMELINES", "MICRO UX"],
      achievements: [
        "Built interactive transitions with motion-first thinking.",
        "Balanced animation quality with rendering performance.",
        "Designed smooth and engaging scroll storytelling.",
      ],
      count: 5,
      progress: 58,
      level: 2,
    },
    {
      icon: "⚙️",
      label: "Build & Backend",
      title: "BUILD & BACKEND",
      color: "#3ab2f6",
      skills: ["API", "NODE", "PYTHON", "DATABASE", "DEPLOY", "CI/CD"],
      achievements: [
        "Connected frontend systems to real data APIs.",
        "Automated build pipelines and deployment workflows.",
        "Improved reliability with better error handling.",
      ],
      count: 6,
      progress: 62,
      level: 3,
    },
  ];
  activeLoadout = 0;
  renderLoadout();

  projectShowcaseState = [
    {
      title: "PORTFOLIO BOOT",
      summary:
        "GitHub API unavailable. Rendering fallback project diagnostics.",
      image: `https://github.com/${GITHUB_USERNAME}.png`,
      meta: ["JavaScript", "0 Stars", "0 Forks"],
      points: [
        "Connect to the network to fetch live repository content.",
        "This panel will auto-update from your public repos.",
        "Navigation and controls remain fully interactive.",
      ],
      link: `https://github.com/${GITHUB_USERNAME}`,
    },
  ];
  activeProjectShowcase = 0;
  renderProjectShowcase();

  experienceState = [
    {
      switchLabel: "GITHUB PROFILE",
      role: "PRODUCT ENGINEER",
      company: "AKSHATT877",
      period: "Now - Present • Open Source",
      summary:
        "Fallback mode active. Experience data will return after GitHub reconnects.",
      tags: ["GitHub", "Open Source", "Fallback"],
      points: [
        "Experience monitor uses repository activity signals.",
        "Language tags are generated from project metadata.",
        "Recent activity is shown once API access is restored.",
      ],
    },
  ];
  activeExperience = 0;
  renderExperienceSection();

  reviewState = [
    {
      quote:
        "Portfolio telemetry is ready. Live GitHub review feed will reconnect automatically.",
      author: "SYSTEM FEED",
      role: "Offline diagnostics",
      stars: 4,
      score: 3200,
      credits: 2,
    },
  ];
  activeReview = 0;
  renderReviewSection();

  renderContactAndFinal(
    {
      login: GITHUB_USERNAME,
      name: "Akshat",
      email: `${GITHUB_USERNAME}@users.noreply.github.com`,
      bio: "Building clean interfaces with game-inspired UX polish.",
      avatar_url: `https://github.com/${GITHUB_USERNAME}.png`,
      public_repos: 10,
      followers: 10,
    },
    [
      { language: "JavaScript" },
      { language: "TypeScript" },
      { language: "CSS" },
    ],
  );
  setupScrollReveal();
}

async function fetchGithubPortfolio() {
  try {
    const [profileResponse, reposResponse] = await Promise.all([
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}`),
      fetch(
        `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`,
      ),
    ]);

    if (!profileResponse.ok || !reposResponse.ok) {
      throw new Error("GitHub API request failed");
    }

    const profile = await profileResponse.json();
    const repos = await reposResponse.json();

    applyProfile(profile, repos);
  } catch (error) {
    applyFallbackState();
  }
}

withMusicBtn.addEventListener("click", () => enterPortfolio(true));
withoutMusicBtn.addEventListener("click", () => enterPortfolio(false));
window.addEventListener("resize", createFloatingSquares);

projectPrevBtn.addEventListener("click", () => {
  if (!projectShowcaseState.length) {
    return;
  }
  activeProjectShowcase =
    (activeProjectShowcase - 1 + projectShowcaseState.length) %
    projectShowcaseState.length;
  renderProjectShowcase();
});

projectNextBtn.addEventListener("click", () => {
  if (!projectShowcaseState.length) {
    return;
  }
  activeProjectShowcase =
    (activeProjectShowcase + 1) % projectShowcaseState.length;
  renderProjectShowcase();
});

experiencePrevBtn.addEventListener("click", () => {
  if (!experienceState.length) {
    return;
  }
  activeExperience =
    (activeExperience - 1 + experienceState.length) % experienceState.length;
  renderExperienceSection();
});

experienceNextBtn.addEventListener("click", () => {
  if (!experienceState.length) {
    return;
  }
  activeExperience = (activeExperience + 1) % experienceState.length;
  renderExperienceSection();
});

reviewPrevBtn.addEventListener("click", () => {
  if (!reviewState.length) {
    return;
  }
  activeReview = (activeReview - 1 + reviewState.length) % reviewState.length;
  renderReviewSection();
});

reviewNextBtn.addEventListener("click", () => {
  if (!reviewState.length) {
    return;
  }
  activeReview = (activeReview + 1) % reviewState.length;
  renderReviewSection();
});

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const to = (
    contactEmailInput.value || `${GITHUB_USERNAME}@users.noreply.github.com`
  ).trim();
  const subject = encodeURIComponent(
    `Portfolio Contact from ${contactNameInput.value.trim() || "Visitor"}`,
  );
  const body = encodeURIComponent(contactMessageInput.value.trim() || "Hello");
  window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
});

pricingBtn.addEventListener("click", () => {
  window.open(`https://github.com/${GITHUB_USERNAME}`, "_blank", "noreferrer");
});

availabilityBtn.addEventListener("click", () => {
  window.location.hash = "contact";
});

backToTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

updateClock();
window.setInterval(updateClock, 1000);

createFloatingSquares();
setupHeroCursorParallax();
startLoadingSequence();
