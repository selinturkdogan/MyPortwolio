document.addEventListener('DOMContentLoaded', () => {
  // Github linki
  document.getElementById("githubLink").addEventListener("click", function(event) {
    event.preventDefault();
    window.open("https://github.com/selinturkdogan", "_blank");
  });

  // Linkedin linki
  document.getElementById("linkedinLink").addEventListener("click", function(event) {
    event.preventDefault();
    window.open("https://www.linkedin.com/in/selinturkdogan", "_blank");
  });

  // Paragraflar scroll efekti
  const observerText = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll(".fade-in-text").forEach(el => {
    observerText.observe(el);
  });

  // Technical skills animasyonu ve barların doluluk oranı
  fetch('technicalSkills.json')
    .then(response => response.json())
    .then(data => {
      const container = document.getElementById('technical-bars');
      
      data.skills.forEach((skill, index) => {
        // Bar container oluşturma
        const barDiv = document.createElement('div');
        barDiv.classList.add('bar');
        
        // İkon ekleme
        const icon = document.createElement('i');
        icon.className = skill.icon;
        icon.style.color = skill.color || '#cd4075';
        
        // Skill ismi ekleme
        const infoDiv = document.createElement('div');
        infoDiv.classList.add('info');
        const span = document.createElement('span');
        span.textContent = skill.name;
        infoDiv.appendChild(span);
        
        // Progress line oluşturma
        const progressLine = document.createElement('div');
        progressLine.classList.add('progress-line');
        progressLine.setAttribute('data-skill', skill.name.toLowerCase().replace(/\+/g, '-plus'));
        
        const progressSpan = document.createElement('span');
        progressSpan.style.width = '0%';
        progressSpan.setAttribute('data-level', skill.level);
        progressSpan.style.backgroundColor = skill.color || '#cd4075';
        
        progressLine.appendChild(progressSpan);
        
        // Elementleri birleştirmek için
        barDiv.appendChild(icon);
        barDiv.appendChild(infoDiv);
        barDiv.appendChild(progressLine);
        
        // Container'a ekleme
        container.appendChild(barDiv);
      });
      
      // Animasyon observerını başlatma
      initSkillsAnimation();
    });

  // Skills animasyon fonksiyonu
  function initSkillsAnimation() {
    const skillsObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Tüm progress barları bulup ve animate etme
          const progressBars = document.querySelectorAll('.progress-line span');
          
          progressBars.forEach((bar, index) => {
            const level = bar.getAttribute('data-level');
            setTimeout(() => {
              bar.style.width = level;
            }, index * 200); // Her bar için 200ms gecikmeyi sağlar
          });
          
          // Tek seferlik animasyon
          skillsObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.3
    });
    
    const skillsSection = document.querySelector('#skills');
    if (skillsSection) {
      skillsObserver.observe(skillsSection);
    }
  }

  // Language bar animasyonu
  const fills = document.querySelectorAll(".progress-fill");
  const observerLang = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        const targetWidth = fill.getAttribute("data-width");
        fill.style.width = targetWidth;
        obs.unobserve(fill);
      }
    });
  }, { threshold: 0.4 });

  fills.forEach(fill => observerLang.observe(fill));

  // Soft skills kart oluşturma
  fetch('softSkills.json')
    .then(response => response.json())
    .then(data => {
      const container = document.getElementById('skills-container');
      data.forEach(skill => {
        const card = document.createElement('div');
        card.classList.add('skill-card');

        const title = document.createElement('h3');
        title.classList.add('skill-title');
        // İkonu html olarak ekler
        title.innerHTML = `${skill.icon || ''} ${skill.title}`;
        card.appendChild(title);

        const subskillsDiv = document.createElement('div');
        subskillsDiv.classList.add('skill-subskills');
        subskillsDiv.style.opacity = '0';
        subskillsDiv.style.maxHeight = '0';

        const ul = document.createElement('ul');
        ul.classList.add('subskill-list');

        skill.subskills.forEach(sub => {
          const li = document.createElement('li');
          li.classList.add('subskill-item');
          li.textContent = sub;
          ul.appendChild(li);
        });

        subskillsDiv.appendChild(ul);
        card.appendChild(subskillsDiv);
        container.appendChild(card);

        // Aç/Kapat animasyonu (EventListener)
        card.addEventListener('click', () => {
          const isOpen = card.classList.contains('open');
          if (isOpen) {
            card.classList.remove('open');
            subskillsDiv.style.opacity = '0';
            subskillsDiv.style.maxHeight = '0';
            card.style.height = '140px';
          } else {
            card.classList.add('open');
            subskillsDiv.style.opacity = '1';
            subskillsDiv.style.maxHeight = subskillsDiv.scrollHeight + 'px';
            card.style.height = '260px';
          }
        });
      });
    });

  // Certificates
  fetch("certificates.json")
    .then(response => response.json())
    .then(data => renderCertificates(data))
    .catch(error => console.error("JSON verisi yüklenemedi:", error));

  // Contact form submit 
  document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const form = e.target;
    const data = {
      name: form.name.value,
      email: form.email.value,
      message: form.message.value,
    };

    fetch('http://localhost:3000/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(response => {
      if(response.success){
        showNotification('Mesajınız başarıyla gönderildi!', 'success');
        form.reset();
      } else {
        showNotification('Bir hata oluştu, lütfen tekrar deneyiniz.', 'error');
      }
    })
    .catch(() => showNotification('Sunucuya bağlanırken hata oluştu.', 'error'));
  });

});

function renderCertificates(certificates) {
  const container = document.getElementById("certificatesGrid");

  certificates.forEach(cert => {
    const card = document.createElement("a");
    card.className = "certificate-card";
    card.href = cert.file;
    card.target = "_blank";
    card.rel = "noopener noreferrer";

    card.innerHTML = `
      <div class="certificate-title">${cert.title}</div>
      <div class="certificate-meta">Date: ${formatDate(cert.date)}</div>
      <div class="certificate-meta">Institution: ${cert.issuer}</div>
    `;

    container.appendChild(card);
  });
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("tr-TR", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}
//contact me mail gönderme
function showNotification(message, type = 'success') {
  const notification = document.getElementById('notification');
  notification.textContent = message;
  notification.className = 'notification'; // önce tüm classları temizler
  notification.classList.add('show');
  
  // Türüne göre class ekle
  if (type === 'success') {
    notification.classList.add('success');
  } else if (type === 'error') {
    notification.classList.add('error');
  }

  // 3 saniye sonra gizler mesaji
  setTimeout(() => {
    notification.classList.remove('show');
  }, 3000);
}

//Portfolio section
fetch('projects.json')
  .then(res => res.json())
  .then(projects => {
    const container = document.getElementById('portfolioGrid');

    projects.forEach(proj => {
      const card = document.createElement('div');
      card.classList.add('portfolio-card');

      card.innerHTML = `
        <img src="${proj.image}" alt="${proj.name} Görseli">
        <h3>${proj.name}</h3>
        <p>${proj.description}</p>
        <p><strong>Teknolojiler:</strong> ${proj.technologies.join(', ')}</p>
        <a href="${proj.github}" target="_blank">GitHub</a>
      `;

      container.appendChild(card);
    });
  })
  .catch(err => console.error('Projeler yüklenirken hata:', err));

  document.addEventListener('DOMContentLoaded', () => {
  const settingsIcon = document.querySelector('.settings-link');
  const settingsPanel = document.getElementById('settingsPanel');
  const closeBtn = document.getElementById('closeSettingsBtn');
  const darkModeSwitch = document.getElementById('darkModeSwitch');
  const languageSelect = document.getElementById('languageSelect');

  // Ayarlar panelini aç/kapat
  settingsIcon.addEventListener('click', (e) => {
    e.preventDefault();
    settingsPanel.classList.toggle('hidden');
  });

  closeBtn.addEventListener('click', () => {
    settingsPanel.classList.add('hidden');
  });

  // Dark mode toggle (switch)
  darkModeSwitch.addEventListener('click', () => {
    darkModeSwitch.classList.toggle('active');
    const isActive = darkModeSwitch.classList.contains('active');

    if (isActive) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('darkMode', 'enabled');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('darkMode', 'disabled');
    }
  });

  // Sayfa yüklendiğinde durumu yükle
  if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark-mode');
    darkModeSwitch.classList.add('active');
  } else {
    document.body.classList.remove('dark-mode');
    darkModeSwitch.classList.remove('active');
  }

  // Dil seçimi
 function showLangNotification(message) {
  const notif = document.getElementById('langNotification');
  notif.textContent = message;
  notif.classList.add('show');

  setTimeout(() => {
    notif.classList.remove('show');
  }, 2000);
}

const langSwitch = document.getElementById('languageSwitch');

langSwitch.addEventListener('click', () => {
  const newLang = langSwitch.dataset.active === 'en' ? 'tr' : 'en';
  langSwitch.dataset.active = newLang;
  localStorage.setItem('language', newLang);
  showLangNotification(`Language changed to: ${newLang === 'en' ? 'English' : 'Türkçe'}`);
});

// Sayfa açıldığında kaydedilmiş dili uygula
const savedLang = localStorage.getItem('language');
if (savedLang) {
  langSwitch.dataset.active = savedLang;
}
  });