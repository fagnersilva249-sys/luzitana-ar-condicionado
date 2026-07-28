(function(){
  "use strict";
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Header: sombra/blur ao rolar */
  var header = document.querySelector('.site-header');
  var onScroll = function(){
    if(window.scrollY > 8){ header.classList.add('scrolled'); }
    else{ header.classList.remove('scrolled'); }
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive:true });

  /* Hamburger mobile */
  var burger = document.querySelector('.hamburger');
  var nav = document.getElementById('main-nav');
  if(burger && nav){
    var closeNav = function(){
      burger.setAttribute('aria-expanded','false');
      nav.classList.remove('open');
    };
    burger.addEventListener('click', function(){
      var open = burger.getAttribute('aria-expanded') === 'true';
      burger.setAttribute('aria-expanded', String(!open));
      nav.classList.toggle('open', !open);
    });
    nav.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', closeNav);
    });
    document.addEventListener('keydown', function(e){
      if(e.key === 'Escape') closeNav();
    });
  }

  /* Scrollspy: marca o link ativo do menu */
  var navLinks = document.querySelectorAll('.main-nav a[href^="#"]');
  var sections = Array.prototype.map.call(navLinks, function(a){
    return document.querySelector(a.getAttribute('href'));
  }).filter(Boolean);
  if(sections.length && 'IntersectionObserver' in window){
    var spy = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        var link = document.querySelector('.main-nav a[href="#' + entry.target.id + '"]');
        if(!link) return;
        if(entry.isIntersecting){
          navLinks.forEach(function(l){ l.removeAttribute('aria-current'); });
          link.setAttribute('aria-current','true');
        }
      });
    }, { rootMargin: '-40% 0px -50% 0px', threshold:0 });
    sections.forEach(function(s){ spy.observe(s); });
  }

  /* Reveal on scroll — baseline sem lib (Tier 0) */
  var revealEls = document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold:0.15, rootMargin:'0px 0px -10% 0px' });
    revealEls.forEach(function(el){ io.observe(el); });
  } else {
    revealEls.forEach(function(el){ el.classList.add('is-visible'); });
  }

  /* Tier 2 — GSAP + Lenis, só quando disponível e sem reduced-motion */
  if(!reduce && window.gsap && window.ScrollTrigger){
    gsap.registerPlugin(ScrollTrigger);
    if(window.Lenis){
      var lenis = new Lenis({ smoothWheel:true });
      gsap.ticker.add(function(time){ lenis.raf(time * 1000); });
      gsap.ticker.lagSmoothing(0);
      lenis.on('scroll', ScrollTrigger.update);
    }
    gsap.utils.toArray('.reveal').forEach(function(el){
      gsap.fromTo(el, { y:32, opacity:0 }, {
        y:0, opacity:1, duration:.8, ease:'power2.out',
        scrollTrigger:{ trigger:el, start:'top 88%' }
      });
      el.classList.add('is-visible');
    });
    gsap.utils.toArray('.parallax-img').forEach(function(el){
      gsap.to(el, {
        yPercent:-14, ease:'none',
        scrollTrigger:{ trigger: el.closest('.parallax-section') || el, start:'top bottom', end:'bottom top', scrub:true }
      });
    });
  }

  /* Carrossel de marcas — botão pausar/tocar (acessibilidade WCAG 2.2.2) */
  var marqueeToggle = document.getElementById('marquee-toggle');
  var marqueeTrack = document.getElementById('marquee-track');
  if(marqueeToggle && marqueeTrack){
    marqueeToggle.addEventListener('click', function(){
      var paused = marqueeTrack.classList.toggle('paused');
      marqueeToggle.setAttribute('aria-pressed', String(paused));
    });
  }

  /* Cookie / LGPD */
  var cookieBar = document.getElementById('cookie-bar');
  if(cookieBar){
    if(!localStorage.getItem('luzitana-cookie-consent')){ cookieBar.hidden = false; }
    var setConsent = function(v){
      localStorage.setItem('luzitana-cookie-consent', v);
      cookieBar.hidden = true;
    };
    var accept = document.getElementById('cookie-accept');
    var reject = document.getElementById('cookie-reject');
    if(accept) accept.addEventListener('click', function(){ setConsent('accept'); });
    if(reject) reject.addEventListener('click', function(){ setConsent('reject'); });
  }

  /* Formulário de contato — sem backend, envia para o WhatsApp */
  var form = document.getElementById('contact-form');
  if(form){
    var status = document.getElementById('form-status');
    form.addEventListener('submit', function(e){
      e.preventDefault();
      var valid = true;
      ['nome','telefone','mensagem'].forEach(function(id){
        var input = document.getElementById(id);
        var field = input.closest('.field');
        if(!input.checkValidity()){
          field.classList.add('invalid');
          valid = false;
        } else {
          field.classList.remove('invalid');
        }
      });
      if(!valid){
        status.textContent = 'Confira os campos destacados antes de enviar.';
        status.removeAttribute('data-state');
        form.querySelector('.invalid input, .invalid textarea').focus();
        return;
      }
      var nome = document.getElementById('nome').value.trim();
      var telefone = document.getElementById('telefone').value.trim();
      var mensagem = document.getElementById('mensagem').value.trim();
      var msg = 'Olá! Meu nome é ' + nome + '.\nTelefone: ' + telefone + '\n' + mensagem;
      var url = 'https://wa.me/555133439490?text=' + encodeURIComponent(msg);
      window.open(url, '_blank', 'noopener');
      status.textContent = 'Abrindo o WhatsApp para enviar sua mensagem…';
      status.setAttribute('data-state','ok');
      form.reset();
    });
  }
})();
