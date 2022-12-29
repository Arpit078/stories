const container = document.getElementById("container")
const heading = document.getElementById("title")
const content = document.getElementById("content")
const toggle = document.getElementById("toggle")
const url = "https://stories-api.onrender.com/"

async function getData(link){
    const res = await fetch(link)
    const data = await res.json()
    return data
}



toggle.addEventListener("click", function(){
    if(toggle.checked){
        container.style.backgroundColor = "rgba(24, 24, 24, 0.866)"
        container.style.color= "azure"
        content.style.border = "1px solid azure"
    }
    else{
        container.style.backgroundColor = "rgba(240, 227, 210, 0.8)"
        container.style.color= "black"
        content.style.border = "1px solid black"

    }
    
  });

getData(url).then((res)=>{
    heading.innerHTML = res.heading
    content.innerHTML = res.content

})