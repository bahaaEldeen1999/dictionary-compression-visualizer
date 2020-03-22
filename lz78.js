
let parent = document.getElementById('text');
let solution = document.getElementById('solution');
let dictionary = document.getElementById('dictionary');
let indexCol = document.getElementById('index');
let entryCol = document.getElementById('entry');
function createChar(char){
    let span = document.createElement('span');
    span.innerText = char;
    parent.appendChild(span);

}

function highlightChar(indx,color){
    let current = parent.children[indx];
    current.style.color = color;
    current.classList.add('animated')
    current.classList.add('heartBeat')
}
function clearColor(){
    for(let char of parent.children){
        char.style.color = "black";
    }
}
function createText(text){
    for(let char of text) createChar(char);
}
function addSol(index,char){
    let s =  `<  <span> ${index}</span> , <span  style="color:#FF5733 " >'${char}'</span> >`;
    let h = document.createElement('h2');
    h.innerHTML = s;
    h.classList.add('animated');
    h.classList.add('fadeIn');
    solution.appendChild(h);
}
function clear(){
    parent.innerHTML = "";
    solution.innerHTML = "";
    entryCol.innerHTML = '<h1 style=" border-bottom: 3px solid #339EFF;padding: 10px;">Entry</h1>'
    indexCol.innerHTML = '<h1 style=" border-bottom: 3px solid #339EFF;padding: 10px;">Index</h1>'
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
function addEntry(indx,string){
    let hi = document.createElement('h2');
    let he = document.createElement('h2');
    hi.innerText = indx;
    he.innerText = string;
    indexCol.appendChild(hi);
    entryCol.appendChild(he);
}
async function lz78(text){
    clear();
    let colorNew = "#339EFF";
    let colorPre = "#FF5733";
    let delayTime = 1000;
    createText(text);
    let dic = {};
    let currentIndex = 1;
    for(let i=0;i<text.length;i++){
        if(!dic[text[i]]){
            // new entry add to dictionary 
            // index 0 and add current char
            dic[text[i]] = currentIndex;
            highlightChar(i,colorNew);
            addEntry(currentIndex,text[i]);
            await delay(delayTime);
            
            currentIndex++;
            addSol(0,text[i]);
           
        }else{
            highlightChar(i,colorPre);
            await delay(delayTime);
            // this charachter was found before
            let currentString = ""+text[i];
            let nextIndex = i+1; 
            while(nextIndex < text.length && dic[currentString+text[nextIndex]]){
                highlightChar(nextIndex,colorPre);
                await delay(delayTime);
                // there is a match in dictionary so increae nextindex and currentString
                currentString += text[nextIndex];
                nextIndex++;
            }
            

                // set i to be equal to element that wasn't found
                i = nextIndex;
                if(i < text.length){
                    highlightChar(i,colorNew);
                    await delay(delayTime);
                    addSol(dic[currentString],text[nextIndex]);
                    
                // console.log(`< ${} , '${' >`)
                    currentString += text[nextIndex];
                
                    dic[currentString] = currentIndex;
                    addEntry(currentIndex,currentString)
                    currentIndex++;
                }else{
                    addSol(dic[currentString],' ');
                }
            


        }
        clearColor();
    }
    console.log(dic);
}
