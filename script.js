const container = document.getElementById("container")
const heading = document.getElementById("title")
const content = document.getElementById("content")
const toggle = document.getElementById("toggle")
const loader = document.getElementById("loader")
const refresh =document.getElementById("refresh")
const book = document.getElementById("book")
const bookmark = document.getElementById("ploygon")
// const popup_follow = document.getElementById("popup-follow")
const url = "https://stories-api.onrender.com/"
// const url = "http://localhost:5000/"




const displayLoading = () => {
    container.style.display = 'none';
    loader.style.display = 'block';
    document.getElementsByTagName('meta')["theme-color"].content = '#071826'

};

const hideLoading = () => {
    loader.style.display = 'none';
    container.style.display = 'block';
    document.getElementsByTagName('meta')["theme-color"].content = 'rgba(240, 227, 210, 0.8)'


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
    // console.log(res)
    return data
}
async function backgroundFetch(link){
    const res = await fetch(link)
    const data = await res.json()
    
    return data
}

toggle.addEventListener("click", function(){
    if(toggle.checked){
        document.body.style.backgroundColor = "black"
        content.style.color= "white"
        heading.style.color= "white"
        pageNumber = document.getElementsByClassName("pageNumber")
        document.getElementsByTagName('meta')["theme-color"].content = '#071826'

        pageNumber.forEach((e)=>{
            e.style.color="white"  
        })
    }
    else{
        document.body.style.backgroundColor = "rgba(240, 227, 210, 0.8)"
        content.style.color= "black"
        heading.style.color=  "black"
        document.getElementsByTagName('meta')["theme-color"].content = 'rgba(240, 227, 210, 0.8)'



    }
    
});

   

// function functionSelector(){
//     if(localStorage.length === 0 && book.value === "add bookmark"){
//         addBookMark()


        

//     }else{
//         removeBookMark()


//     }
// }


function back(){
    if(screen.width<500){

        history.back()
    }
}

function addBookMark() {
    
            // let storedSelections = [];
            // var currSelection = window.getSelection ();
            // for (var i = 0; i < currSelection.rangeCount; i++) {
            //     storedSelections.push(currSelection.getRangeAt (i));

            // }
            // console.log(storedSelections)
            // currSelection.removeAllRanges ();
            // const index = storedSelections[0].startOffset
            // let str = body.innerHTML
            // let insert = `<img src="./assets/pin.png" alt="" style="width: 40px;background-color: greenyellow; border-radius: 50%;">`
            // const new_content = str.slice(0, index) + insert + str.slice(index);

            polygon.style.fill = "green"
            // content.innerHTML = new_content
            let savedContent = content.innerHTML
            let savedHeading = heading.innerHTML
            //storing in localstorage
            localStorage.setItem("heading",savedHeading)
            // localStorage.setItem("content",new_content)
            localStorage.setItem("content",savedContent)
            //---------------------------------------------
            //will do something about savedpages later
            // let savedPage = document.querySelector(".pageNumber").innerHTML
            // localStorage.setItem("pageNumber",savedPage)
            //----------------------------------------------
            // book.value = "remove bookmark"

            // console.log(storedSelections[0].startOffset,storedSelections[0].endOffset)
        }

function removeBookMark(){
    console.log("cleared")
    content.innerHTML = localStorage.getItem("content_old")
    localStorage.clear()
    // location.reload();
    // getData(url).then((res)=>{
    //     hideLoading()
    //     heading.innerHTML = res.heading
    //     content.innerHTML = res.content})
    // book.value = "add bookmark"

    

    
}
async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
 }


 if("serviceWorker" in navigator){
    navigator.serviceWorker.register("service_worker.js").then(registration=>{
      console.log("SW Registered!");
    }).catch(error=>{
      console.log("SW Registration Failed");
    });
}else{
  console.log("Not supported");
}

//FUNCTION to create string splits at interval of 1300, takes string argument and an empty array to push new strings.
function createPages(resStr,stringArr){
    let jump = 340
    if(window.screen.width<=400){
        jump = 340
    }
    if(window.screen.width>400 && window.screen.width<700){
        jump = 600
    }
    if(window.screen.width>700){
        jump = 900
    }
    for(i=0;i<resStr.length;i+=jump){
    let page = resStr.slice(i,i+jump)
    stringArr.push(page)
}
return stringArr
}
// let ID = ""

//a function to insert separated strings into html. only new requirement is where to insert.
function insertHtmlObj(insertWhere,resStr,stringArr){
    let finalObj = ``
    let sepArr = createPages(resStr,stringArr)
    for(i=0;i<sepArr.length;i++){
        ID = allIDArr[i]
        const htmlObj = `<div class="page" id="${ID}" data-slides>${sepArr[i]}<span class="pageNumber">${i+1}</span></div>`
        finalObj = finalObj + htmlObj
        // requiredIDArr.push(allIDArr[i])
    }
    insertWhere.innerHTML = finalObj
}


const nextButton = document.getElementById("next")
const prevButton = document.getElementById("prev")



function colorOrNot(currentPage){
    const pageNumber = localStorage.getItem("pageNumber")
    if(Number(pageNumber)!= currentPage){
        document.getElementById("book").style.color = ""
    }else{book.classList.add("highlight")}
}







// console.log(nextButton,prevButton)
nextButton.addEventListener("click",()=>{
    let offset = 1
    const slides = document.querySelectorAll("[data-slides]")
    let pageArray = Array.from(slides)

    const activeSlide = document.querySelector("[data-active]")
    // console.log(slides)

        let newIndex = pageArray.indexOf(activeSlide) + offset
        if(newIndex<0){newIndex = pageArray.length -1}
        if(newIndex>=pageArray.length){newIndex=0}
        pageArray[newIndex].dataset.active = true
        delete activeSlide.dataset.active
        progress(newIndex,pageArray.length)
        // book.style.backgroundColor = ""
    	
        polygon.style.fill = "orange"

        // colorOrNot(newIndex+1)

})
prevButton.addEventListener("click",()=>{
    let offset = -1
    const slides = document.querySelectorAll("[data-slides]")
    let pageArray = Array.from(slides)

    const activeSlide = document.querySelector("[data-active]")
    // console.log(slides)

        let newIndex = pageArray.indexOf(activeSlide) + offset
        if(newIndex<0){newIndex = pageArray.length -1}
        if(newIndex>=pageArray.length){newIndex=0}
        pageArray[newIndex].dataset.active = true
        delete activeSlide.dataset.active
        progress(newIndex,pageArray.length)
        
        polygon.style.fill = "orange"


        // colorOrNot(newIndex+1)

})

//progress bar
function progress(pageNumber,totalPage) {
    const myBar = document.getElementById("myBar")
    const percentComplete = (pageNumber/totalPage)*100
    myBar.style.width = `${percentComplete}%`
    // document.getElementById("percentage").innerHTML = Math.floor(percentComplete)+"%"
      
}
// menu logic


// -------------------------------runner code---------------------------------//
if(window.localStorage.length===0){
    getData(url).then((res)=>{
    let stringArr = []
    insertHtmlObj(content,res.content,stringArr)
    document.getElementById("ID0").dataset.active = ""

    hideLoading()
    // book.value = "add bookmark"
    heading.innerHTML = res.heading

    console.log("loaded")
})

}else{
    hideLoading()
    // book.value = "remove bookmark"
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
        //    book.value = "add bookmark"
           localStorage.clear()
        }
    })
}

//garbage variables but neccessary
let allIDArr = ["ID0","ID1","ID2","ID3","ID4","ID5","ID6","ID7","ID8","ID9","ID10","ID11","ID12","ID13","ID14","ID15","ID16","ID17","ID18","ID19","ID20","ID21","ID22","ID23","ID24","ID25","ID26","ID27","ID28","ID29","ID30","ID31","ID32","ID33","ID34","ID35","ID36","ID37","ID38","ID39","ID40","ID41","ID42","ID43","ID44","ID45","ID46","ID47","ID48","ID49","ID50","ID51","ID52","ID53","ID54","ID55","ID56","ID57","ID58","ID59","ID60","ID61","ID62","ID63","ID64","ID65","ID66","ID67","ID68","ID69","ID70","ID71","ID72","ID73","ID74","ID75","ID76","ID77","ID78","ID79","ID80","ID81","ID82","ID83","ID84","ID85","ID86","ID87","ID88","ID89","ID90","ID91","ID92","ID93","ID94","ID95","ID96","ID97","ID98","ID99","ID100","ID101","ID102","ID103","ID104","ID105","ID106","ID107","ID108","ID109","ID110","ID111","ID112","ID113","ID114","ID115","ID116","ID117","ID118","ID119","ID120","ID121","ID122","ID123","ID124","ID125","ID126","ID127","ID128","ID129","ID130","ID131","ID132","ID133","ID134","ID135","ID136","ID137","ID138","ID139","ID140","ID141","ID142","ID143","ID144","ID145","ID146","ID147","ID148","ID149","ID150","ID151","ID152","ID153","ID154","ID155","ID156","ID157","ID158","ID159","ID160","ID161","ID162","ID163","ID164","ID165","ID166","ID167","ID168","ID169","ID170","ID171","ID172","ID173","ID174","ID175","ID176","ID177","ID178","ID179","ID180","ID181","ID182","ID183","ID184","ID185","ID186","ID187","ID188","ID189","ID190","ID191","ID192","ID193","ID194","ID195","ID196","ID197","ID198","ID199","ID200","ID201","ID202","ID203","ID204","ID205","ID206","ID207","ID208","ID209","ID210","ID211","ID212","ID213","ID214","ID215","ID216","ID217","ID218","ID219","ID220","ID221","ID222","ID223","ID224","ID225","ID226","ID227","ID228","ID229","ID230","ID231","ID232","ID233","ID234","ID235","ID236","ID237","ID238","ID239","ID240","ID241","ID242","ID243","ID244","ID245","ID246","ID247","ID248","ID249","ID250","ID251","ID252","ID253","ID254","ID255","ID256","ID257","ID258","ID259","ID260","ID261","ID262","ID263","ID264","ID265","ID266","ID267","ID268","ID269","ID270","ID271","ID272","ID273","ID274","ID275","ID276","ID277","ID278","ID279","ID280","ID281","ID282","ID283","ID284","ID285","ID286","ID287","ID288","ID289","ID290","ID291","ID292","ID293","ID294","ID295","ID296","ID297","ID298","ID299","ID300","ID301","ID302","ID303","ID304","ID305","ID306","ID307","ID308","ID309","ID310","ID311","ID312","ID313","ID314","ID315","ID316","ID317","ID318","ID319","ID320","ID321","ID322","ID323","ID324","ID325","ID326","ID327","ID328","ID329","ID330","ID331","ID332","ID333","ID334","ID335","ID336","ID337","ID338","ID339","ID340","ID341","ID342","ID343","ID344","ID345","ID346","ID347","ID348","ID349","ID350","ID351","ID352","ID353","ID354","ID355","ID356","ID357","ID358","ID359","ID360","ID361","ID362","ID363","ID364","ID365","ID366","ID367","ID368","ID369","ID370","ID371","ID372","ID373","ID374","ID375","ID376","ID377","ID378","ID379","ID380","ID381","ID382","ID383","ID384","ID385","ID386","ID387","ID388","ID389","ID390","ID391","ID392","ID393","ID394","ID395","ID396","ID397","ID398","ID399","ID400","ID401","ID402","ID403","ID404","ID405","ID406","ID407","ID408","ID409","ID410","ID411","ID412","ID413","ID414","ID415","ID416","ID417","ID418","ID419","ID420","ID421","ID422","ID423","ID424","ID425","ID426","ID427","ID428","ID429","ID430","ID431","ID432","ID433","ID434","ID435","ID436","ID437","ID438","ID439","ID440","ID441","ID442","ID443","ID444","ID445","ID446","ID447","ID448","ID449","ID450","ID451","ID452","ID453","ID454","ID455","ID456","ID457","ID458","ID459","ID460","ID461","ID462","ID463","ID464","ID465","ID466","ID467","ID468","ID469","ID470","ID471","ID472","ID473","ID474","ID475","ID476","ID477","ID478","ID479","ID480","ID481","ID482","ID483","ID484","ID485","ID486","ID487","ID488","ID489","ID490","ID491","ID492","ID493","ID494","ID495","ID496","ID497","ID498","ID499","ID500","ID501","ID502","ID503","ID504","ID505","ID506","ID507","ID508","ID509","ID510","ID511","ID512","ID513","ID514","ID515","ID516","ID517","ID518","ID519","ID520","ID521","ID522","ID523","ID524","ID525","ID526","ID527","ID528","ID529","ID530","ID531","ID532","ID533","ID534","ID535","ID536","ID537","ID538","ID539","ID540","ID541","ID542","ID543","ID544","ID545","ID546","ID547","ID548","ID549","ID550","ID551","ID552","ID553","ID554","ID555","ID556","ID557","ID558","ID559","ID560","ID561","ID562","ID563","ID564","ID565","ID566","ID567","ID568","ID569","ID570","ID571","ID572","ID573","ID574","ID575","ID576","ID577","ID578","ID579","ID580","ID581","ID582","ID583","ID584","ID585","ID586","ID587","ID588","ID589","ID590","ID591","ID592","ID593","ID594","ID595","ID596","ID597","ID598","ID599","ID600","ID601","ID602","ID603","ID604","ID605","ID606","ID607","ID608","ID609","ID610","ID611","ID612","ID613","ID614","ID615","ID616","ID617","ID618","ID619","ID620","ID621","ID622","ID623","ID624","ID625","ID626","ID627","ID628","ID629","ID630","ID631","ID632","ID633","ID634","ID635","ID636","ID637","ID638","ID639","ID640","ID641","ID642","ID643","ID644","ID645","ID646","ID647","ID648","ID649","ID650","ID651","ID652","ID653","ID654","ID655","ID656","ID657","ID658","ID659","ID660","ID661","ID662","ID663","ID664","ID665","ID666","ID667","ID668","ID669","ID670","ID671","ID672","ID673","ID674","ID675","ID676","ID677","ID678","ID679","ID680","ID681","ID682","ID683","ID684","ID685","ID686","ID687","ID688","ID689","ID690","ID691","ID692","ID693","ID694","ID695","ID696","ID697","ID698","ID699","ID700","ID701","ID702","ID703","ID704","ID705","ID706","ID707","ID708","ID709","ID710","ID711","ID712","ID713","ID714","ID715","ID716","ID717","ID718","ID719","ID720","ID721","ID722","ID723","ID724","ID725","ID726","ID727","ID728","ID729","ID730","ID731","ID732","ID733","ID734","ID735","ID736","ID737","ID738","ID739","ID740","ID741","ID742","ID743","ID744","ID745","ID746","ID747","ID748","ID749","ID750","ID751","ID752","ID753","ID754","ID755","ID756","ID757","ID758","ID759","ID760","ID761","ID762","ID763","ID764","ID765","ID766","ID767","ID768","ID769","ID770","ID771","ID772","ID773","ID774","ID775","ID776","ID777","ID778","ID779","ID780","ID781","ID782","ID783","ID784","ID785","ID786","ID787","ID788","ID789","ID790","ID791","ID792","ID793","ID794","ID795","ID796","ID797","ID798","ID799","ID800","ID801","ID802","ID803","ID804","ID805","ID806","ID807","ID808","ID809","ID810","ID811","ID812","ID813","ID814","ID815","ID816","ID817","ID818","ID819","ID820","ID821","ID822","ID823","ID824","ID825","ID826","ID827","ID828","ID829","ID830","ID831","ID832","ID833","ID834","ID835","ID836","ID837","ID838","ID839","ID840","ID841","ID842","ID843","ID844","ID845","ID846","ID847","ID848","ID849","ID850","ID851","ID852","ID853","ID854","ID855","ID856","ID857","ID858","ID859","ID860","ID861","ID862","ID863","ID864","ID865","ID866","ID867","ID868","ID869","ID870","ID871","ID872","ID873","ID874","ID875","ID876","ID877","ID878","ID879","ID880","ID881","ID882","ID883","ID884","ID885","ID886","ID887","ID888","ID889","ID890","ID891","ID892","ID893","ID894","ID895","ID896","ID897","ID898","ID899","ID900","ID901","ID902","ID903","ID904","ID905","ID906","ID907","ID908","ID909","ID910","ID911","ID912","ID913","ID914","ID915","ID916","ID917","ID918","ID919","ID920","ID921","ID922","ID923","ID924","ID925","ID926","ID927","ID928","ID929","ID930","ID931","ID932","ID933","ID934","ID935","ID936","ID937","ID938","ID939","ID940","ID941","ID942","ID943","ID944","ID945","ID946","ID947","ID948","ID949","ID950","ID951","ID952","ID953","ID954","ID955","ID956","ID957","ID958","ID959","ID960","ID961","ID962","ID963","ID964","ID965","ID966","ID967","ID968","ID969","ID970","ID971","ID972","ID973","ID974","ID975","ID976","ID977","ID978","ID979","ID980","ID981","ID982","ID983","ID984","ID985","ID986","ID987","ID988","ID989","ID990","ID991","ID992","ID993","ID994","ID995","ID996","ID997","ID998","ID999"]
