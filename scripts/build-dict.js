const fs=require("fs"),cp=require("child_process");
const TM={a:"āáǎà",e:"ēéěè",i:"īíǐì",o:"ōóǒò",u:"ūúǔù","ü":"ǖǘǚǜ"};
function pin(s){return s.split(" ").map(w=>{const m=w.match(/^([A-Za-zü:]+)([1-5])$/);if(!m)return w;let p=m[1].replace(/u:/g,"ü"),t=+m[2]-1;if(t===4)return p;
let k=p.search(/[aeAE]/);if(k<0)k=p.search(/ou/i);if(k<0)for(let i=p.length-1;i>=0;i--)if("iouüIOUÜ".includes(p[i])){k=i;break}
if(k<0)return p;const c=p[k],l=c.toLowerCase();return p.slice(0,k)+(TM[l]?(c===l?TM[l][t]:TM[l][t].toUpperCase()):c)+p.slice(k+1)}).join(" ")}
function read(f){if(!fs.existsSync(f))return"";let b=fs.readFileSync(f);if(b.length<100)return"";
if(b[0]===0x50&&b[1]===0x4b)b=cp.execSync(`unzip -p "${f}"`,{maxBuffer:1<<29});return b.toString("utf8")}
function parse(txt){const m=new Map();for(const l of txt.split(/\r?\n/)){if(!l||l[0]==="#")continue;const r=l.match(/^(\S+) (\S+) \[([^\]]+)\] \/(.+)\/\s*$/);if(!r)continue;
const d=r[4].split("/").filter(x=>x&&!/^CL:/.test(x)).join("; ");if(!d)continue;const k=r[2]+"|"+r[3].toLowerCase();m.set(k,{s:r[2],p:r[3],d:m.has(k)?m.get(k).d+"; "+d:d})}return m}
const en=parse(read("data/cedict_ts.u8")),fr=parse(read("data/cfdict.raw"));
const out=[];for(const [k,e] of en){const f=fr.get(k);out.push([e.s,pin(e.p),e.d,f?f.d:""]);fr.delete(k)}
for(const [k,f] of fr)out.push([f.s,pin(f.p),"",f.d]);
fs.writeFileSync("www/dict.js","window.DICT="+JSON.stringify(out)+";");
console.log("entrées:",out.length,"dont français:",out.filter(e=>e[3]).length);
