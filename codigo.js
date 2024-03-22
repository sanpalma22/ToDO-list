let tareas=[
{ nombre: "Tarea matematica", hecho: true, fechaIngreso: new Date(0),fechaTachado:new Date()}, { nombre: "Tarea lengua", hecho:true, fechaIngreso: new Date(0),fechaTachado:new Date()}
];

function mostrarLista(tareas){
    let html=""
    tareas.forEach((t,index)=>{
        let fecha=`${t.fechaIngreso.getDate()}/${t.fechaIngreso.getMonth()+1}/${t.fechaIngreso.getFullYear()}  ${t.fechaIngreso.getHours()}:${t.fechaIngreso.getMinutes()}`;
        if(t.hecho==true) html+=`<li style="text-decoration:line-through"; onclick="tacharTarea(${index})">${t.nombre}</li>`;
        else html+=`<li onclick="tacharTarea(${index})">${t.nombre}</li>`;

        html+=`<p>${fecha}</p>
        <button onclick="borrarTarea(${index})">Borrar tarea</button>`;
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
    if(tareasTachadas.length==0)alert("No hay tareas tachadas");
    tareasTachadas.forEach(t=>{
        if(t.fechaTachado-t.fechaIngreso<tareaR.fechaTachado-tareaR.fechaIngreso) tareaR=t
    });
    document.getElementById("resultado").innerText=`La tarea hecha más rápida fue: ${tareaR.nombre}`
}