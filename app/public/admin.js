document.getElementsByTagName("button")[0].addEventListener("click", ()=>{
    // creo una nueva cookie que ya expiró, cuando el navegador detecta que una cookie ya expiró la borra.
    document.cookie = 'jwt=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'; 
    document.location.href = "/"


})