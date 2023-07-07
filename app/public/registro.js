const msjErorr = document.getElementsByClassName("error")[0];


document.getElementById("registro").addEventListener("submit", async(e)=>{
    e.preventDefault();
    //console.log(e.target.children.usuario.value);
    const res = await fetch("http://localhost:8080/api/registro",{
        method: "POST", 
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            user:e.target.children.usuario.value,
            email: e.target.children.email.value,
            password: e.target.children.password.value

        })
    })
    if(!res.ok) return msjErorr.classList.toggle("escondido", false);
    const resJson = await res.json();
    if(resJson.redirect){
        window.location.href = resJson.redirect;
    }
})