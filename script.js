// Github Linki
document.getElementById("githubLink").addEventListener("click", function(event) {
  event.preventDefault(); // Sayfanın yenilenmesini engeller
  window.open("https://github.com/selinturkdogan", "_blank");
});

// Linkedin Linki
document.getElementById("linkedinLink").addEventListener("click", function(event) {
  event.preventDefault();
  window.open("https://www.linkedin.com/in/selinturkdogan", "_blank");
});

//Paragraflar için scroll efekti
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      // Burada unobserve etmeyiz, çünkü birkaç kez görünür/görünmez olabilir
    }
  });
}, {
  threshold: 0.1 //%10 u viewporta girince tetikler
});

document.querySelectorAll(".fade-in-text").forEach(el => {
  observer.observe(el);
});

//Technical skills animasyonu ve barların doluluk oranı
 document.addEventListener('DOMContentLoaded', () => {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const skills = {
          html: '90%',
          css: '85%',
          javascript: '60%',
          c: '50%',
          'c-plusplus': '50%',
          python: '50%'
        };

        for (const skill in skills) {
          const bar = document.querySelector(`.progress-line.${skill} span`);
          if (bar) {
            bar.style.width = skills[skill];
          }
        }

        observer.unobserve(entry.target); //Tek seferlik animasyon
      }
    });
  }, {
    threshold: 0.4 // %40’ı görünür olunca çalışır
  });

  const skillsSection = document.querySelector('#skills');
  if (skillsSection) {
    observer.observe(skillsSection);
  }
});

//Language alanı ve barların doluluk oranı animasyonu
  document.addEventListener("DOMContentLoaded", () => {
    const fills = document.querySelectorAll(".progress-fill");

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const fill = entry.target;
          const targetWidth = fill.getAttribute("data-width");
          fill.style.width = targetWidth;
          obs.unobserve(fill); // Tek seferlik animasyon
        }
      });
    }, {
      threshold: 0.4 // %40 görünür olunca çalışır
    });

    fills.forEach(fill => observer.observe(fill));
  });

