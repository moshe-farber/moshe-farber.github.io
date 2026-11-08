(function(){
  var C=window.MF_CONFIG||{};
  var btn=document.querySelector('.menu-btn'),menu=document.getElementById('menu'),nav=document.querySelector('.nav');
  if(btn&&menu){
    btn.addEventListener('click',function(){var o=menu.classList.toggle('open');btn.setAttribute('aria-expanded',o?'true':'false');});
    menu.addEventListener('click',function(e){if(e.target.tagName==='A'){menu.classList.remove('open');btn.setAttribute('aria-expanded','false');}});
  }
  function onScroll(){if(nav)nav.classList.toggle('small',window.scrollY>40);}
  window.addEventListener('scroll',onScroll,{passive:true});onScroll();
  var reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if('IntersectionObserver' in window&&!reduce){
    var els=document.querySelectorAll('.pillars li,.case,.offer,.steps li,.tq-grid figure,.career li,.signs li');
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},{rootMargin:'0px 0px -8% 0px'});
    els.forEach(function(el){el.classList.add('reveal');io.observe(el);});
  }

  /* ---------- LinkedIn posts (hidden until links are added) ---------- */
  function embedUrl(v){
    v=String(v||'').trim(); if(!v) return '';
    if(/^https:\/\/www\.linkedin\.com\/embed\/feed\/update\/urn:li:(share|activity|ugcPost):\d+/.test(v)) return v.split('?')[0];
    var m=v.match(/urn:li:(share|activity|ugcPost):(\d+)/); if(m) return 'https://www.linkedin.com/embed/feed/update/urn:li:'+m[1]+':'+m[2];
    m=v.match(/activity[-:](\d{15,})/); if(m) return 'https://www.linkedin.com/embed/feed/update/urn:li:activity:'+m[1];
    return '';
  }
  var posts=(C.linkedinPosts||[]).filter(function(p){return p&&typeof p==='object'&&p.url;}).slice(0,3);
  var sec=document.querySelector('[data-linkedin-section]'),grid=document.querySelector('[data-linkedin-grid]');
  var LI='<svg viewBox="0 0 24 24" aria-hidden="true"><rect width="24" height="24" rx="4" fill="#0A66C2"/><path fill="#fff" d="M7.1 9.4H4.6V19h2.5V9.4zM5.9 5a1.45 1.45 0 100 2.9 1.45 1.45 0 000-2.9zM19.4 13.6c0-2.6-1.4-4.4-3.9-4.4-1.2 0-2.1.6-2.5 1.3V9.4h-2.4V19H13v-4.8c0-1.3.3-2.5 1.9-2.5s1.6 1.5 1.6 2.6V19h2.5v-5.4z"/></svg>';
  if(sec&&grid&&posts.length){
    posts.forEach(function(p){
      var a=document.createElement('a');a.className='ins-card ins-post';a.href=p.url;a.target='_blank';a.rel='noopener';
      a.setAttribute('aria-label','LinkedIn post by Moshe Farber, '+(p.date||'')+'. Read more on LinkedIn');
      a.innerHTML='<div class="li-top"><img class="li-av" src="img/moshe-avatar.jpg" alt="" width="48" height="48" loading="lazy">'
        +'<div class="li-id"><b>Moshe Farber</b><span>Fractional CMO &middot; Executive Growth Partner</span><span>'+(p.date||'')+'</span></div>'
        +'<span class="li-logo">'+LI+'</span></div>';
      var x=document.createElement('p');x.className='li-text';x.textContent=p.excerpt||'';a.appendChild(x);
      var more=document.createElement('span');more.className='li-more';more.textContent='\u2026see more';a.appendChild(more);
      var ft=document.createElement('div');ft.className='li-foot';ft.innerHTML='<span class="li-logo sm">'+LI+'</span><span>Read more on LinkedIn &rarr;</span>';a.appendChild(ft);
      grid.appendChild(a);
    });
    sec.hidden=false;
  }

  /* ---------- Contact form ---------- */
  var f=document.getElementById('contact-form');
  if(!f) return;
  var to=C.fallbackEmail||'';
  var note=document.getElementById('fnote'),thanks=document.getElementById('form-thanks');
  var loaded=Date.now();
  var defaultNote=note?note.textContent:'';
  var endpoint=String(C.formEndpoint||'').trim();
  if(endpoint){f.setAttribute('action',endpoint);f.removeAttribute('enctype');}
  else{f.setAttribute('action','mailto:'+to);}

  /* topic preselect from ?topic= or a [data-topic] button */
  var topicMap={book:"Book: tell me when it's out",workshop:'Leadership workshop',audit:'Marketing or CX audit'};
  function setTopic(k){var s=f.elements['topic'];if(!s||!topicMap[k])return;s.value=topicMap[k];}
  try{var q=new URLSearchParams(location.search).get('topic');if(q)setTopic(q);}catch(e){}
  document.querySelectorAll('[data-topic]').forEach(function(a){a.addEventListener('click',function(){setTopic(a.getAttribute('data-topic'));});});

  /* captcha: inactive until a site key is set */
  var cap=C.captcha||{},capBox=document.getElementById('captcha-slot');
  if(capBox&&cap.siteKey){
    var prov=cap.provider==='hcaptcha'?'hcaptcha':'turnstile';
    capBox.className=prov==='hcaptcha'?'h-captcha':'cf-turnstile';
    capBox.setAttribute('data-sitekey',cap.siteKey);
    capBox.hidden=false;
    var s=document.createElement('script');s.async=true;s.defer=true;
    s.src=prov==='hcaptcha'?'https://js.hcaptcha.com/1/api.js':'https://challenges.cloudflare.com/turnstile/v0/api.js';
    document.head.appendChild(s);
  }

  function showThanks(){f.hidden=true;if(thanks){thanks.hidden=false;try{thanks.focus();}catch(e){}}}
  function setNote(t,err){if(!note)return;note.textContent=t;note.classList.toggle('err',!!err);}

  f.addEventListener('submit',function(e){
    e.preventDefault();
    var E=f.elements,name=E['name'].value.trim(),email=E['email'].value.trim(),company=E['company'].value.trim(),msg=E['message'].value.trim(),topic=E['topic']?E['topic'].value:'';
    if(!name||!email||!msg||!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)){setNote('Please add your name, a valid email and a short message.',true);return;}
    /* spam guards: honeypot + time to submit -> silently "succeed" */
    if((E['_gotcha']&&E['_gotcha'].value)||(Date.now()-loaded)<(C.minSecondsToSubmit||4)*1000){showThanks();return;}
    var subject='Website inquiry from '+name+(company?' ('+company+')':'')+(topic?' \u2014 '+topic:'');
    if(!endpoint){
      var body='Name: '+name+'\nEmail: '+email+'\nCompany: '+(company||'-')+'\nTopic: '+(topic||'-')+'\n\n'+msg;
      window.location.href='mailto:'+to+'?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body);
      setNote('Your email app should open with the message ready to send. If it doesn\u2019t, please use the Book a call button.');
      return;
    }
    if(cap.siteKey){
      var tok=f.querySelector('[name="cf-turnstile-response"],[name="h-captcha-response"]');
      if(!tok||!tok.value){setNote('Please complete the quick check above the button.',true);return;}
    }
    var fd=new FormData(f);
    fd.append('_subject',subject);fd.append('subject',subject);fd.append('_replyto',email);
    var extra=C.formHiddenFields||{};Object.keys(extra).forEach(function(k){fd.append(k,extra[k]);});
    var b=f.querySelector('button[type=submit]');if(b){b.disabled=true;b.textContent='Sending\u2026';}
    setNote('Sending\u2026');
    fetch(endpoint,{method:'POST',mode:'cors',body:new URLSearchParams(fd).toString(),headers:{'Content-Type':'application/x-www-form-urlencoded','Accept':'application/json'}}).then(function(r){
      if(!r.ok&&r.type!=='opaque') throw new Error('status '+r.status);
      showThanks();
    }).catch(function(){
      if(b){b.disabled=false;b.textContent='Send message';}
      note.innerHTML='';
      note.appendChild(document.createTextNode('The message didn\u2019t go through. Please try again, or use the Book a call button.'));note.classList.add('err');
    });
  });
})();

/* rev9: image protection — no right-click menu or dragging on images */
(function(){
  function isImg(t){return t&&(t.tagName==='IMG'||t.tagName==='PICTURE'||(t.closest&&t.closest('picture,svg')));}
  document.addEventListener('contextmenu',function(e){if(isImg(e.target))e.preventDefault();});
  document.addEventListener('dragstart',function(e){if(isImg(e.target))e.preventDefault();});
  function lock(){document.querySelectorAll('img').forEach(function(i){i.setAttribute('draggable','false');});}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',lock);else lock();
})();

/* ---------- Book sign-up (quick form) ---------- */
(function(){
  var C=window.MF_CONFIG||{},f=document.getElementById('book-signup');if(!f)return;
  var note=document.getElementById('bs-note'),btn=f.querySelector('button'),em=f.elements['email'];
  var ob=document.getElementById('bs-open'),t0=0;
  if(ob){ob.addEventListener('click',function(){f.hidden=false;ob.hidden=true;ob.setAttribute('aria-expanded','true');t0=Date.now();setTimeout(function(){em.focus();},50);});}
  f.addEventListener('submit',function(e){
    e.preventDefault();
    var v=(em.value||'').trim();
    if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v)){note.textContent='Please enter a valid email.';note.className='bs-note err';em.focus();return;}
    if(!f.elements['consent'].checked){note.textContent='Please tick the box to agree to emails.';note.className='bs-note err';return;}
    if(f.elements['botcheck'].checked)return;
    if(t0&&Date.now()-t0<2500)return;
    var d=Object.assign({},C.formHiddenFields||{},{subject:'Book list sign-up: '+v,email:v,name:'Book list',message:'Please notify me when the book is out. Consent: agreed to emails about the book and occasional updates.',list:'Book list'});
    btn.disabled=true;btn.textContent='Sending\u2026';
    fetch(C.formEndpoint||'https://api.web3forms.com/submit',{method:'POST',mode:'cors',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify(d)})
      .then(function(r){return r.json().catch(function(){return {success:r.ok};});})
      .then(function(j){if(j&&j.success!==false){f.querySelector('.bs-row').style.display='none';note.textContent='You\u2019re on the list. Thank you!';note.className='bs-note ok';}else throw 0;})
      .catch(function(){btn.disabled=false;btn.textContent='Notify me';note.textContent='Something went wrong. Please try again.';note.className='bs-note err';});
  });
})();
