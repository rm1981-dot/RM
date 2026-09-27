'use client';
import {useMemo,useState} from 'react';
const euro=n=>(n/100).toLocaleString('de-DE',{style:'currency',currency:'EUR'});
const people=[{id:'u2',name:'Anke Müller',handle:'@anke',phone:'017612345678',email:'anke@test.de'},{id:'u3',name:'Lena Becker',handle:'@lena',phone:'015112345678',email:'lena@test.de'},{id:'u4',name:'Max Weber',handle:'@max',phone:'017212345678',email:'max@test.de'}];
export default function Home(){
 const [wallet,setWallet]=useState(124850),[q,setQ]=useState(''),[person,setPerson]=useState(null),[amount,setAmount]=useState(''),[history,setHistory]=useState([]),[notice,setNotice]=useState('');
 const toast=m=>{setNotice(m);setTimeout(()=>setNotice(''),2200)};
 const results=useMemo(()=>{let x=q.trim().toLowerCase();if(!x)return [];return people.filter(p=>[p.name,p.handle,p.phone,p.email].some(v=>v.toLowerCase().includes(x))).slice(0,4)},[q]);
 const send=()=>{let cents=Math.round(Number(amount.replace(',','.'))*100);if(!person)return toast('Bitte zuerst eine Person auswählen');if(!cents||cents<1)return toast('Bitte Betrag eingeben');if(cents>wallet)return toast('Nicht genug Testguthaben');setWallet(v=>v-cents);setHistory(h=>[{id:Date.now(),person,amount:cents},...h]);toast(euro(cents)+' an '+person.name+' gesendet');setAmount('');setQ('');setPerson(null)};
 return <main className="shell">{notice&&<div className="toast">{notice}</div>}<header><div><span className="eyebrow">PROJECT M · TESTVERSION</span><h1>Hallo, Ronny</h1></div><button className="avatar">RM</button></header>
 <section className="hero"><span>Dein Testguthaben</span><strong>{euro(wallet)}</strong><small>@ronny · kein Echtgeld</small></section>
 <section><h2>Geld senden</h2><p className="hint">Person über Name, @Name, Handynummer oder E-Mail finden.</p><input className="search" value={q} onChange={e=>{setQ(e.target.value);setPerson(null)}} placeholder="z. B. @anke oder Handynummer"/>
 {!person&&results.map(p=><button className="person" key={p.id} onClick={()=>{setPerson(p);setQ(p.handle)}}><span className="bubble">{p.name[0]}</span><span><b>{p.name}</b><small>{p.handle}</small></span><strong>›</strong></button>)}
 {q&&!person&&results.length===0&&<div className="empty"><b>Nicht bei Project M gefunden</b><span>Diese Person könnte eingeladen werden.</span></div>}
 {person&&<div className="confirm"><span className="bubble big">{person.name[0]}</span><div><b>{person.name}</b><span>{person.handle}</span></div><button onClick={()=>{setPerson(null);setQ('')}}>Ändern</button></div>}
 {person&&<div className="paybox"><label>Betrag</label><div className="money"><input value={amount} onChange={e=>setAmount(e.target.value)} inputMode="decimal" placeholder="0,00"/><b>€</b></div><button className="send" onClick={send}>Geld senden</button></div>}</section>
 {history.length>0&&<section><h2>Letzte Zahlungen</h2>{history.map(x=><article className="row" key={x.id}><div><b>{x.person.name}</b><span>{x.person.handle} · Gesendet</span></div><div className="right"><b>-{euro(x.amount)}</b></div></article>)}</section>}
 <footer><b>Project M</b><span>Sandbox · kein Echtgeld</span></footer></main>}