const container = document.getElementById("container")
const heading = document.getElementById("title")
const content = document.getElementById("content")
const toggle = document.getElementById("toggle")
const loader = document.getElementById("loader")
const refresh =document.getElementById("refresh")
const book = document.getElementById("book")
const popup_follow = document.getElementById("popup-follow")
const url = "https://stories-api.onrender.com/"
// const url = "http://localhost:5000/"




const pageArr = [
    "पेज",
    "n1",
    "n2",
    "n3",
    "n4",
    "n5",
    "n6",
    "n7",
]


const displayLoading = () => {
    container.style.display = 'none';
    loader.style.display = 'block';

};

const hideLoading = () => {
    loader.style.display = 'none';
    container.style.display = 'block';
};
const displayRefreshing = () => {
    container.style.display = 'none';
    refresh.style.display = 'block';

};

const hideRefreshing = () => {
    refresh.style.display = 'none';
    container.style.display = 'block';
};






async function getData(link){
    displayLoading()
    const res = await fetch(link)
    const data = await res.json()
    
    return data
}
async function backgroundFetch(link){
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

   

function functionSelector(){
    if(localStorage.length === 0 && book.value === "add bookmark"){
        addBookMark()


        

    }else{
        removeBookMark()


    }
}




function addBookMark() {
    
            let storedSelections = [];
            var currSelection = window.getSelection ();
            for (var i = 0; i < currSelection.rangeCount; i++) {
                storedSelections.push(currSelection.getRangeAt (i));

            }
            // console.log(storedSelections)
            currSelection.removeAllRanges ();
            const index = storedSelections[0].startOffset
            let str = content.innerHTML
            let insert = `<img src="./assets/pin.png" alt="" style="width: 40px;background-color: greenyellow; border-radius: 50%;">`
            const new_content = str.slice(0, index) + insert + str.slice(index);
            content.innerHTML = new_content
            //storing in localstorage
            localStorage.setItem("heading",heading.innerHTML)
            localStorage.setItem("content",new_content)
            // localStorage.setItem("content_old",str)
            book.value = "remove bookmark"

            // console.log(storedSelections[0].startOffset,storedSelections[0].endOffset)
        }

function removeBookMark(){
    console.log("cleared")
    // content.innerHTML = localStorage.getItem("content_old")
    localStorage.clear()
    // location.reload();
    getData(url).then((res)=>{
        hideLoading()
        heading.innerHTML = res.heading
        content.innerHTML = res.content})
    book.value = "add bookmark"

    

    
}
async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
 }



// -------------------------------runner code---------------------------------//
if(window.localStorage.length===0){
    getData(url).then((res)=>{
    hideLoading()
    book.value = "add bookmark"
    heading.innerHTML = res.heading
    content.innerHTML = res.content
    console.log("loaded")
})

}else{
    hideLoading()
    book.value = "remove bookmark"
    heading.innerHTML = localStorage.getItem('heading')
    content.innerHTML = localStorage.getItem('content')
    backgroundFetch(url).then(async (res)=>{
        if(res.heading != heading.innerHTML){
           displayRefreshing()
           await sleep(3000)
            hideRefreshing()
            //    setTimeout(hideLoading(),5000)
            heading.innerHTML = res.heading
            content.innerHTML = res.content
           book.value = "add bookmark"
           localStorage.clear()
        }
    })
}
