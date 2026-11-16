
(function(){
  var d=document, rm=matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* film grain texture, generated once */
  var g=d.getElementById('grain'), c=d.createElement('canvas');
  c.width=c.height=120;
  var x=c.getContext('2d'), img=x.createImageData(120,120), p=img.data;
  for(var i=0;i<p.length;i+=4){var v=Math.random()*255|0;p[i]=p[i+1]=p[i+2]=v;p[i+3]=26;}
  x.putImageData(img,0,0);
  g.style.backgroundImage='url('+c.toDataURL()+')';

  /* nav shrink */
  var nav=d.getElementById('nav');
  var onScroll=function(){ nav.classList.toggle('stuck', scrollY>24); };
  addEventListener('scroll',onScroll,{passive:true}); onScroll();

  /* pointer spotlight + reel tilt */
  var spot=d.getElementById('spot'), reel=d.getElementById('reel');
  if(!rm && matchMedia('(hover:hover)').matches){
    addEventListener('pointermove',function(e){
      var px=e.clientX/innerWidth, py=e.clientY/innerHeight;
      spot.style.setProperty('--mx',(px*100).toFixed(2)+'%');
      spot.style.setProperty('--my',(py*100).toFixed(2)+'%');
      if(reel){ reel.style.setProperty('--tx',(px-.5).toFixed(2)); reel.style.setProperty('--ty',(py-.5).toFixed(2)); }
    },{passive:true});
  }

  /* scroll reveal */
  var rv=[].slice.call(d.querySelectorAll('.rv,.step-media'));
  if('IntersectionObserver' in window && !rm){
    var io=new IntersectionObserver(function(es){
      es.forEach(function(en){ if(en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target);} });
    },{rootMargin:'0px 0px -8% 0px',threshold:.12});
    rv.forEach(function(el,i){ el.style.transitionDelay=(Math.min(i,6)*45)+'ms'; io.observe(el); });
  } else { rv.forEach(function(el){el.classList.add('in');}); }
  /* safety net: nothing stays hidden if the observer never fires (tall viewports, crawlers, screenshots) */
  setTimeout(function(){ rv.forEach(function(el){ el.classList.add('in'); }); },1400);

  /* video fallbacks: if the loop is missing, keep the gradient bloom only */
  [].forEach.call(d.querySelectorAll('video'),function(v){
    v.addEventListener('error',function(){ v.style.display='none'; },true);
    var s=v.querySelector('source');
    if(s) s.addEventListener('error',function(){ v.style.display='none'; });
  });


  /* services dropdown */
  var dd=d.getElementById('dd');
  if(dd){
    var ddbtn=dd.querySelector('.ddbtn');
    var setOpen=function(on){ dd.classList.toggle('open',on); ddbtn.setAttribute('aria-expanded',on?'true':'false'); };
    ddbtn.addEventListener('click',function(e){ e.preventDefault(); e.stopPropagation(); setOpen(!dd.classList.contains('open')); });
    dd.addEventListener('mouseleave',function(){ setOpen(false); });
    d.addEventListener('click',function(e){ if(!dd.contains(e.target)) setOpen(false); });
    d.addEventListener('keydown',function(e){ if(e.key==='Escape') setOpen(false); });
    Array.prototype.forEach.call(dd.querySelectorAll('.ddmenu a'),function(a){
      a.addEventListener('click',function(){ setOpen(false); });
    });
  }

  d.getElementById('yr').textContent=new Date().getFullYear();
})();
