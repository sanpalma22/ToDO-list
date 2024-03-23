let tareas=[
{ nombre: "Tarea matematica", hecho: false, fechaIngreso: new Date(0),fechaTachado:null}, { nombre: "Tarea lengua", hecho:false, fechaIngreso: new Date(0),fechaTachado:null}
];

function mostrarLista(tareas){
    let html=""
    tareas.forEach((t,index)=>{
        let fecha=`${t.fechaIngreso.getDate()}/${t.fechaIngreso.getMonth()+1}/${t.fechaIngreso.getFullYear()}  ${t.fechaIngreso.getHours()}:${t.fechaIngreso.getMinutes()}`;
        if(t.hecho==true) {
            html+=`<div class="tarea-hecha" >`;
            html+=`<li style="text-decoration:line-through" onclick="tacharTarea(${index})">${t.nombre}</li>`;
        } else {
            html+=`<div class="tarea-pendiente" >`;
            html+=`<li onclick="tacharTarea(${index})">${t.nombre}</li>`;
        }

        html+=`<p class="fecha">${fecha}</p>
        <button class="tachar" onclick="borrarTarea(${index})"><img src="https://cdn-icons-png.flaticon.com/512/3817/3817209.png" ></button></div>`;
    })
    document.getElementById("listaTareas").innerHTML= html;
}

function tacharTarea(index){
    tareas[index].hecho = !tareas[index].hecho;
    tareas[index].fechaTachado=new Date();
    mostrarLista(tareas);
}
function borrarTarea(index){
    tareas.splice(index,1);
    mostrarLista(tareas);
}

mostrarLista(tareas);
document.getElementById("ingreso").onclick=()=>{
    const nuevaTarea={
        nombre: document.getElementById("textoIngresado").value,
        hecho: false,
        fechaIngreso: new Date(),
        fechaTachado:null
    };
    tareas.push(nuevaTarea);
    mostrarLista(tareas);
}

document.getElementById("tareaMasRapida").onclick=()=>{
    const tareasTachadas=tareas.filter(t=>t.hecho==true);
    let tareaR=tareasTachadas[0];
    if(tareasTachadas.length==0)alert("No hay tareas hechas");
    tareasTachadas.forEach(t=>{
        if(t.fechaTachado-t.fechaIngreso<tareaR.fechaTachado-tareaR.fechaIngreso) tareaR=t
    });
    document.getElementById("resultado").innerText=`La tarea hecha más rápida fue: ${tareaR.nombre}`
}