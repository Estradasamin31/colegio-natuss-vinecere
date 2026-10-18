const students=[
["Valeria Quispe Huamán",1,17.8,98],["Mateo Ríos Cárdenas",1,14.2,93],["Camila Flores Soto",1,12.1,84],
["Diego Salazar Vega",2,16.4,96],["Lucía Paredes Mori",2,18.6,99],["Joaquín Mendoza Ruiz",2,11.5,81],
["Sofía Chávez León",3,15.3,94],["Bruno Castillo Ramos",3,13.4,90],["Alessia Vargas Lazo",3,17.1,97],
["Gabriel Núñez Ponce",4,12.8,86],["Renata Torres Díaz",4,16.9,95],["Andrés Cabrera Luna",4,14.7,92],
["Isabella Rojas Gamarra",5,18.2,98],["Sebastián Aguilar Peña",5,13.1,88],["Fernanda Herrera Silva",5,15.8,95]];
const attendance=[["Lun",94],["Mar",96],["Mié",92],["Jue",95],["Vie",89]];
const events=[["2026-10-22","Feria de Ciencias","Patio central · 9:00 a. m."],["2026-10-28","Reunión de padres de 3.° y 4.°","Auditorio · 6:00 p. m."],["2026-11-05","Simulacro de evacuación","Todo el colegio · 10:30 a. m."],["2026-11-12","Torneo interescolar de vóley","Coliseo · 3:00 p. m."],["2026-11-20","Entrega de libretas del 4.° bimestre","Aulas · 8:00 a. m."]];
const notes=[["Uniforme de gala","Obligatorio para la ceremonia del 28 de octubre."],["Biblioteca","Los préstamos se devuelven hasta el 30 de octubre."],["Matrícula 2027","Las inscripciones abren el 2 de noviembre."]];
const $=s=>document.querySelector(s), avg=a=>a.reduce((x,y)=>x+y,0)/a.length;
const mes=["ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic"];
const ev=e=>{const d=new Date(e[0]+"T00:00");return `<li><div class="date"><b>${d.getDate()}</b><small>${mes[d.getMonth()]}</small></div><div><strong>${e[1]}</strong><span>${e[2]}</span></div></li>`};
const status=p=>p>=17?["Destacado","ok"]:p>=13?["Regular","warn"]:["En riesgo","bad"];

$("#today").textContent=new Date().toLocaleDateString("es-PE",{weekday:"long",day:"numeric",month:"long",year:"numeric"});
$("#band").innerHTML=[[students.length,"Estudiantes registrados"],[avg(students.map(s=>s[2])).toFixed(1),"Promedio general"],[avg(attendance.map(a=>a[1])).toFixed(0)+"%","Asistencia semanal"],[events.length,"Eventos próximos"]].map(c=>`<div><b>${c[0]}</b><span>${c[1]}</span></div>`).join("");
const min=Math.min(...attendance.map(a=>a[1]));
$("#attBars").innerHTML=attendance.map(a=>`<div class="bar ${a[1]===min?"low":""}">${a[1]}%<i style="height:${(a[1]-70)/30*100}%"></i></div>`).join("");
$("#attBars").insertAdjacentHTML("afterend",`<div class="days">${attendance.map(a=>`<span>${a[0]}</span>`).join("")}</div>`);
$("#gradeBars").innerHTML=[1,2,3,4,5].map(g=>{const p=avg(students.filter(s=>s[1]===g).map(s=>s[2]));return `<div class="hrow"><span>${g}.° grado</span><div class="track"><i style="width:${p/20*100}%"></i></div><b>${p.toFixed(1)}</b></div>`}).join("");
$("#nextEvents").innerHTML=events.slice(0,3).map(ev).join("");
$("#allEvents").innerHTML=events.map(ev).join("");
$("#notes").innerHTML=notes.map(n=>`<li><strong>${n[0]}</strong><small>${n[1]}</small></li>`).join("");

$("#gradeFilter").insertAdjacentHTML("beforeend",[1,2,3,4,5].map(g=>`<option value="${g}">${g}.° grado</option>`).join(""));
function renderRows(){
  const q=$("#q").value.trim().toLowerCase(), g=$("#gradeFilter").value;
  const list=students.filter(s=>s[0].toLowerCase().includes(q)&&(!g||s[1]==g));
  $("#rows").innerHTML=list.length?list.map(s=>{const t=status(s[2]);return `<tr><td>${s[0]}</td><td>${s[1]}.°</td><td>${s[2].toFixed(1)}</td><td>${s[3]}%</td><td><span class="tag ${t[1]}">${t[0]}</span></td></tr>`}).join(""):`<tr><td colspan="5" class="empty">No hay estudiantes con ese nombre o grado. Prueba con otra búsqueda.</td></tr>`;
  $("#count").textContent=`${list.length} de ${students.length} estudiantes`;
}
$("#q").addEventListener("input",renderRows);$("#gradeFilter").addEventListener("change",renderRows);renderRows();

const titles={resumen:"Resumen",estudiantes:"Estudiantes",agenda:"Agenda escolar"};
document.querySelectorAll(".nav button").forEach(b=>b.addEventListener("click",()=>{
  document.querySelectorAll(".nav button,.view").forEach(e=>e.classList.remove("active"));
  b.classList.add("active");$("#view-"+b.dataset.view).classList.add("active");
  $("#viewTitle").textContent=titles[b.dataset.view];$("#sidebar").classList.remove("open");
}));
$("#menuBtn").addEventListener("click",()=>$("#sidebar").classList.toggle("open"));
try{const t=localStorage.getItem("nv-theme");if(t)document.documentElement.dataset.theme=t}catch(e){}
$("#themeBtn").addEventListener("click",()=>{const d=document.documentElement,n=d.dataset.theme==="dark"?"light":"dark";d.dataset.theme=n;try{localStorage.setItem("nv-theme",n)}catch(e){}});
