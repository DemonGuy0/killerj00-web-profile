document.addEventListener('DOMContentLoaded', function() {
  
  const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fade-in-up').forEach(element => {
    observer.observe(element);
  });

  const progressBars = document.querySelectorAll('.skill-progress');
  let progressAnimated = false;

  const progressObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting && !progressAnimated) {
        progressAnimated = true;
        animateProgressBars();
      }
    });
  }, { threshold: 0.5 });

  if (progressBars.length > 0) {
    progressObserver.observe(progressBars[0]);
  }

  function animateProgressBars() {
    progressBars.forEach((progress, index) => {
      const targetValue = progress.getAttribute('data-value');
      let currentValue = 0;
      
      const interval = setInterval(() => {
        if (currentValue >= targetValue) {
          clearInterval(interval);
          progress.value = targetValue;
        } else {
          currentValue += 1;
          progress.value = currentValue;
        }
      }, 15);
    });
  }

  const form = document.querySelector('form');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const nombre = document.getElementById('nombre');
      const email = document.getElementById('email');
      const textarea = document.getElementById('textarea');
      
      if (!nombre.value.trim()) {
        showNotification('Por favor ingresa tu nombre', 'error');
        nombre.focus();
        return;
      }
      
      if (!email.value.trim() || !isValidEmail(email.value)) {
        showNotification('Por favor ingresa un email válido', 'error');
        email.focus();
        return;
      }
      
      if (!textarea.value.trim()) {
        showNotification('Por favor escribe un mensaje', 'error');
        textarea.focus();
        return;
      }
      
      showNotification('¡Mensaje enviado con éxito! Gracias por contactarme.', 'success');
      
      setTimeout(() => {
        form.reset();
      }, 1500);
    });
  }

  function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  function showNotification(message, type) {
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
      existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 100px;
      right: 20px;
      padding: 20px 30px;
      background: ${type === 'success' ? 'linear-gradient(135deg, #00c851, #007e33)' : 'linear-gradient(135deg, #ff4444, #cc0000)'};
      color: white;
      border-radius: 10px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
      z-index: 10000;
      font-weight: 600;
      animation: slideInRight 0.4s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.animation = 'slideOutRight 0.4s ease-out';
      setTimeout(() => notification.remove(), 400);
    }, 3000);
  }

  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideInRight {
      from {
        transform: translateX(400px);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
    
    @keyframes slideOutRight {
      from {
        transform: translateX(0);
        opacity: 1;
      }
      to {
        transform: translateX(400px);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offsetTop = target.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });

  let lastScrollTop = 0;
  const header = document.getElementById('nombre-title');
  
  window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
      header.style.transform = 'translateY(-100%)';
    } else {
      header.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop;
  }, false);
});
