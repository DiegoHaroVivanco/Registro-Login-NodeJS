const msjErorr = document.getElementsByClassName("error")[0];

document.getElementById("login").addEventListener("submit", async(e)=>{
    e.preventDefault();



    const res = await fetch("http://localhost:8080/api/login",{
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            user : e.target.children.usuario.value,
            password : e.target.children.password.value
            
        })
    });
    if(!res.ok) return msjErorr.classList.toggle("escondido", false);
    const resJson = await res.json();
    if(resJson.redirect){
        window.location.href = resJson.redirect;
    }

})