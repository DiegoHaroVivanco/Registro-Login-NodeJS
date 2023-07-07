const msjErorr = document.getElementsByClassName("error")[0];

document.getElementById("login").addEventListener("submit", async(e)=>{
    e.preventDefault();

    const user = e.target.children.usuario.value;
    const password = e.target.children.password.value;

    const response = await fetch("http://localhost:8080/api/login",{
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            user,password
            
        })
    })
    if(!response.ok) return msjErorr.classList.toggle("escondido", false);
    const resJson = await response.json();
    if(resJson.redirect){
        window.location.href = resJson.redirect;
    }

})
