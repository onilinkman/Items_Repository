
var DB;


document.addEventListener("DOMContentLoaded",()=>{
    crmDB()
    setTimeout(()=>{
        crearCliente();
    },5000)
})

function crmDB(){
    //crear la base de datos 1.0
    let crmDB= window.indexedDB.open('crm',1)

    //si hay un error
    crmDB.onerror=function(){
        alert("error al cargar la base de datos")
    }
    //si se creo bien
    crmDB.onsuccess=function(){
        console.log("Base de datos creada")
        DB=crmDB.result;
    }

    //Configuracion de la base de datos 
    crmDB.onupgradeneeded=function(e){
        console.log("Este metodo solo se ejecuta una vez")
        const db=e.target.result;
        const objectStore=db.createObjectStore('crm',{
            keyPath:"crm",
            autoIncrement:true
        })

        //Definir las columnas
        objectStore.createIndex('nombre','nombre',{
            unique:false
        })
        objectStore.createIndex('email','email',{
            unique:true
        })
        objectStore.createIndex('telefono','telefono',{
            unique:false
        })
        console.log("Columnas creadas");
    }
}

function crearCliente(){
     let transaction=DB.transaction(['crm'],'readwrite');

     transaction.oncomplete=function(){
         console.log("transaccion completada")

     }

     transaction.onerror=function(){
         console.log("hubo un error en la transaccion")
     }

     const objectStore=transaction.objectStore('crm')
     const nuevoCliente={
         telefono:7844353,
         nombre:"Jhoselyn Pacaje",
         email:"Jhoselyn.Pacaje@gmail.com"
     }

     const peticion=objectStore.add(nuevoCliente);
     console.log(peticion)
}

function obtenerClientes(){
    const abrirConexion=window.indexedDB.open('crm',1);

    abrirConexion.onerror=function(){
        console.log('hubo un error al conectar la base de datos');
    }

    abrirConexion.onsuccess=function(){
        DB=abrirConexion.result;

        const objectStore=DB.transaction('crm').objectStore('crm');

        objectStore.openCursor().onsuccess=function(e){
            const cursor=e.target.result;
            if(cursor){
                console.log(cursor.value)
                cursor.continue();
            }else{
                console.log("No hay mas registros...")
            }
        }
    }
}


function Login(){
    window.location.href="src/pages/menu/menu.html"
}