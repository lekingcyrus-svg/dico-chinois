/* Mode hors ligne : télécharge les tracés des caractères dans le cache de l'appareil */
(()=>{const CN="dico-hw",done=()=>localStorage.getItem("hwOff")==="1";
const _vp=V.prof,_hp=H.prof;
V.prof=()=>{const h=hdr("Profil");return _vp().replace(h,h+`<div class="card"><b>Mode hors ligne</b><p class="mu" id="offt">${done()?"Tracés des caractères téléchargés ✓ Tout marche sans internet (sauf l'IA et les messages).":"Télécharge les tracés des caractères (≈ 47 Mo) pour t'entraîner à écrire sans connexion."}</p><div class="xpbar"><i id="offb" style="width:${done()?100:0}%"></i></div>${done()?"":'<button class="red" id="offg">Télécharger pour le hors ligne</button>'}</div>`)};
H.prof=()=>{_hp();const g=$("#offg");if(!g)return;
g.onclick=async()=>{g.disabled=true;g.textContent="Téléchargement…";
try{const L=await (await fetch("hw-list.json")).json(),c=await caches.open(CN),q=L.slice();let n=0;
const w=async()=>{while(q.length){const f=q.pop();try{if(!(await c.match("hw/"+f)))await c.add("hw/"+f)}catch(e){}n++;if(n%40===0&&$("#offb")){const p=Math.round(n/L.length*100);$("#offb").style.width=p+"%";$("#offt").textContent="Téléchargement… "+p+" %"}}};
await Promise.all([w(),w(),w(),w(),w(),w()]);localStorage.setItem("hwOff","1");draw()}
catch(e){g.disabled=false;g.textContent="Télécharger pour le hors ligne";$("#offt").textContent="Échec : vérifie ta connexion et réessaie."}}};
})();
