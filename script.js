const container = document.getElementById("container")
const heading = document.getElementById("title")
const content = document.getElementById("content")
const toggle = document.getElementById("toggle")
const loader = document.getElementById("loader")
const url = "https://stories-api.onrender.com/"
// const url = "http://localhost:5000/"

const pageArr = [
    "n\n2\n\n",
    "n\n3\n\n",
    "n\n4\n\n",
    "n\n5\n\n",
    "n\n6\n\n",
    "n\n7\n\n",
]
positions = []
// console.log(pageArr["n\n2\n\n"])


const displayLoading = () => {
    container.style.display = 'none';
    loader.style.display = 'block';

};

const hideLoading = () => {
    loader.style.display = 'none';
    container.style.display = 'block';
};





async function getData(link){
    displayLoading()
    const res = await fetch(link)
    const data = await res.json()
    // for(i=0;i<pageArr.length;i++){
    //     pos = data.content.search(pageArr[i])
    //     positions[i] = pos

    // }
    // console.log(positions)
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
    hideLoading()
    heading.innerHTML = res.heading
    content.innerHTML = res.content


})