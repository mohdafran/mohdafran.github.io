// Configuration and Default Values
const defaultConfig = {
  developer_name: "Mohd Afran",
  developer_role: "Software Developer",
  tagline:
    "Passionate about building elegant solutions and turning complex problems into simple, beautiful interfaces.",
  about_text:
    "I'm a dedicated software developer with a strong foundation in computer science. Currently seeking opportunities to contribute to innovative projects while continuing to grow my skills in a professional environment.",
  email_address: "mohdafran7078@gmail.com",
  phone_number: "+91 7454074580",
  primary_color: "#c9a962",
  secondary_color: "#0a0a0f",
  text_color: "#ffffff",
  card_color: "#1a1a24",
  muted_text_color: "#a0a0b0",
  font_family: "Inter",
  font_size: 16,
};

let config = { ...defaultConfig };

// Element SDK Integration
function initElementSDK() {
  if (window.elementSdk) {
    window.elementSdk.init({
      defaultConfig,
      onConfigChange: async (newConfig) => {
        config = { ...defaultConfig, ...newConfig };
        applyConfig();
      },
      mapToCapabilities: (cfg) => ({
        recolorables: [
          {
            get: () => cfg.primary_color || defaultConfig.primary_color,
            set: (value) => {
              config.primary_color = value;
              window.elementSdk.setConfig({ primary_color: value });
            },
          },
          {
            get: () => cfg.secondary_color || defaultConfig.secondary_color,
            set: (value) => {
              config.secondary_color = value;
              window.elementSdk.setConfig({ secondary_color: value });
            },
          },
          {
            get: () => cfg.text_color || defaultConfig.text_color,
            set: (value) => {
              config.text_color = value;
              window.elementSdk.setConfig({ text_color: value });
            },
          },
          {
            get: () => cfg.card_color || defaultConfig.card_color,
            set: (value) => {
              config.card_color = value;
              window.elementSdk.setConfig({ card_color: value });
            },
          },
          {
            get: () => cfg.muted_text_color || defaultConfig.muted_text_color,
            set: (value) => {
              config.muted_text_color = value;
              window.elementSdk.setConfig({ muted_text_color: value });
            },
          },
        ],
        borderables: [],
        fontEditable: {
          get: () => cfg.font_family || defaultConfig.font_family,
          set: (value) => {
            config.font_family = value;
            window.elementSdk.setConfig({ font_family: value });
          },
        },
        fontSizeable: {
          get: () => cfg.font_size || defaultConfig.font_size,
          set: (value) => {
            config.font_size = value;
            window.elementSdk.setConfig({ font_size: value });
          },
        },
      }),
      mapToEditPanelValues: (cfg) =>
        new Map([
          [
            "developer_name",
            cfg.developer_name || defaultConfig.developer_name,
          ],
          [
            "developer_role",
            cfg.developer_role || defaultConfig.developer_role,
          ],
          ["tagline", cfg.tagline || defaultConfig.tagline],
          ["about_text", cfg.about_text || defaultConfig.about_text],
          ["email_address", cfg.email_address || defaultConfig.email_address],
          ["phone_number", cfg.phone_number || defaultConfig.phone_number],
        ]),
    });
  }
}

// Apply Configuration to DOM
function applyConfig() {
  const root = document.documentElement;
  const primaryColor = config.primary_color || defaultConfig.primary_color;
  const secondaryColor =
    config.secondary_color || defaultConfig.secondary_color;
  const textColor = config.text_color || defaultConfig.text_color;
  const cardColor = config.card_color || defaultConfig.card_color;
  const mutedTextColor =
    config.muted_text_color || defaultConfig.muted_text_color;
  const fontFamily = config.font_family || defaultConfig.font_family;
  const fontSize = config.font_size || defaultConfig.font_size;

  // Apply CSS custom properties
  root.style.setProperty("--accent-gold", primaryColor);
  root.style.setProperty("--primary-bg", secondaryColor);
  root.style.setProperty("--text-primary", textColor);
  root.style.setProperty("--card-bg", cardColor);
  root.style.setProperty("--text-secondary", mutedTextColor);

  // Apply gradient
  root.style.setProperty(
    "--gradient-gold",
    `linear-gradient(135deg, ${primaryColor} 0%, ${adjustColor(primaryColor, -30)} 100%)`,
  );

  // Apply font family
  document.body.style.fontFamily = `${fontFamily}, -apple-system, BlinkMacSystemFont, sans-serif`;

  // Apply font size scaling
  root.style.fontSize = `${fontSize}px`;

  // Update text content
  const heroName = document.getElementById("heroName");
  if (heroName)
    heroName.textContent =
      config.developer_name || defaultConfig.developer_name;

  const heroRole = document.getElementById("heroRole");
  if (heroRole)
    heroRole.textContent =
      config.developer_role || defaultConfig.developer_role;

  const heroTagline = document.getElementById("heroTagline");
  if (heroTagline)
    heroTagline.textContent = config.tagline || defaultConfig.tagline;

  const aboutText = document.getElementById("aboutText");
  if (aboutText)
    aboutText.textContent = config.about_text || defaultConfig.about_text;

  const contactEmail = document.getElementById("contactEmail");
  if (contactEmail) {
    const email = config.email_address || defaultConfig.email_address;
    contactEmail.innerHTML = `<a href="mailto:${email}">${email}</a>`;
  }

  const contactPhone = document.getElementById("contactPhone");
  if (contactPhone) {
    const phone = config.phone_number || defaultConfig.phone_number;
    const phoneClean = phone.replace(/[^0-9+]/g, "");
    contactPhone.innerHTML = `<a href="tel:${phoneClean}">${phone}</a>`;
  }
}

// Helper function to adjust color brightness
function adjustColor(color, amount) {
  const hex = color.replace("#", "");
  const r = Math.max(0, Math.min(255, parseInt(hex.substr(0, 2), 16) + amount));
  const g = Math.max(0, Math.min(255, parseInt(hex.substr(2, 2), 16) + amount));
  const b = Math.max(0, Math.min(255, parseInt(hex.substr(4, 2), 16) + amount));
  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
}

// Navigation and Scroll Effects
function initNavigation() {
  const navbar = document.querySelector(".navbar-custom");
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section[id]");

  // Navbar scroll effect
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    // Update active nav link
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });

  // Smooth scroll for nav links
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href");
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }

      // Close mobile menu
      const navbarCollapse = document.querySelector(".navbar-collapse");
      if (navbarCollapse.classList.contains("show")) {
        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
        if (bsCollapse) bsCollapse.hide();
      }
    });
  });
}

// Scroll to Top Button
function initScrollToTop() {
  const scrollBtn = document.getElementById("scrollToTop");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
      scrollBtn.classList.add("visible");
    } else {
      scrollBtn.classList.remove("visible");
    }
  });

  scrollBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

// Scroll Animations
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll(".animate-on-scroll");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animated");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    },
  );

  animatedElements.forEach((el) => observer.observe(el));
}

// Contact Form

function initContactForm() {
  const form = document.getElementById("contactForm");
  const formMessage = document.getElementById("formMessage");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();

    // Simple validation
    if (!name || !email || !message) {
      formMessage.className = "form-message error";
      formMessage.innerHTML =
        '<i class="bi bi-exclamation-circle me-2"></i>Please fill in all required fields.';
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      formMessage.className = "form-message error";
      formMessage.innerHTML =
        '<i class="bi bi-exclamation-circle me-2"></i>Please enter a valid email address.';
      return;
    }

    // Simulate form submission success
    formMessage.className = "form-message success";
    formMessage.innerHTML =
      '<i class="bi bi-check-circle me-2"></i>Thank you! Your message has been sent successfully. I\'ll get back to you soon.';

    // Reset form
    form.reset();

    // Hide message after 5 seconds
    setTimeout(() => {
      formMessage.className = "form-message";
    }, 5000);
  });
}

// Initialize Everything
initElementSDK();
applyConfig();
initNavigation();
initScrollToTop();
initScrollAnimations();
initContactForm();
