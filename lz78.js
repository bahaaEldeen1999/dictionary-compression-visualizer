
let parent = document.getElementById('text');
let solution = document.getElementById('solution');
let dictionary = document.getElementById('dictionary');
let indexCol = document.getElementById('index');
let entryCol = document.getElementById('entry');
const DELAY = 500;
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
    let s =  `<  <span> ${index}</span> , <span   >'${char}'</span> >`;
    let h = document.createElement('h2');
    h.innerHTML = s;
    h.classList.add('animated');
    h.classList.add('fadeIn');
    solution.appendChild(h);
}
function highlightSol(index,color){
    let current = solution.children[index];
    current.style.color = color;
}

function clear(){
    parent.innerHTML = "";
    solution.innerHTML = "";
    entryCol.innerHTML = '<h1 style=" border-bottom: 3px solid #339EFF;padding: 10px;">Entry</h1>'
    indexCol.innerHTML = '<h1 style=" border-bottom: 3px solid #339EFF;padding: 10px;">Index</h1>'
}
function updateFooter(){
    let footer = document.querySelector('footer');
    footer.style.position = 'static';
    footer.style.marginTop = '50px';
}
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
function clearText(){
    text.innerHTML = "";
}

function addEntry(indx,string){
    let hi = document.createElement('h2');
    let he = document.createElement('h2');
    hi.innerText = indx;
    he.innerText = string;
    indexCol.appendChild(hi);
    entryCol.appendChild(he);
}
async function lz78Encode(text){
    updateFooter();
    clear();
    let colorNew = "#339EFF";
    let colorPre = "#FF5733";
    let delayTime = 1000;
    createText(text);
    let dic = {};
    let currentIndex = 1;
    // define output to be supplide to the decoding 
    let output = [];
    for(let i=0;i<text.length;i++){
        
        // < index , char>
        let entry = [-1,-1];
        if(!dic[text[i]]){
            // new entry add to dictionary 
            // index 0 and add current char
            dic[text[i]] = currentIndex;
            highlightChar(i,colorNew);
            addEntry(currentIndex,text[i]);
            entry[0] = 0;
            entry[1] = text[i];
            await delay(DELAY);
            
            currentIndex++;
            addSol(0,text[i]);
           
        }else{
           highlightChar(i,colorPre);
           await delay(DELAY);
            // this charachter was found before
            let currentString = ""+text[i];
            let nextIndex = i+1; 
            while(nextIndex < text.length && dic[currentString+text[nextIndex]]){
               highlightChar(nextIndex,colorPre);
               await delay(DELAY);
                // there is a match in dictionary so increae nextindex and currentString
                currentString += text[nextIndex];
                nextIndex++;
            }
            

                // set i to be equal to element that wasn't found
                i = nextIndex;
                if(i < text.length){
                   highlightChar(i,colorNew);
                   await delay(DELAY);
                   addSol(dic[currentString],text[nextIndex]);
                   entry[0] = dic[currentString];
                   entry[1] = text[nextIndex];
                // console.log(`< ${} , '${' >`)
                    currentString += text[nextIndex];
                
                    dic[currentString] = currentIndex;
                    addEntry(currentIndex,currentString);
                   
                    currentIndex++;
                }else{
                    addSol(dic[currentString],'');
                    entry[0] = dic[currentString];
                    entry[1] = '';
                }
            


        }
      
        output.push(entry);
        clearColor();
    }
    console.log(dic);
    return output;
}


async function lz78Decode(input){
    /*
        input : 
            array of pairs : < index , charachter > 
    */
   let colorDone = "#339EFF";
   let colorOn = "#FF5733";
   // temporary dictionary to be built on the fly
   clearText();
    let dic = {};
    let currentIndex = 1;
    let output = "";
    // loop on the input 
    for(let i=0;i<input.length;i++){
        // hightlight solution correspond to this
        highlightSol(i,colorOn);
        let index = input[i][0];
        let char = input[i][1];
        //console.log(input,index,char);
        if(index == 0){
            // first time then add to dictionary
            dic[currentIndex] = char;
            currentIndex++;
            output += char;
            createChar(char);
            await delay(DELAY);
            

        }else{
            // already found in the dictionary before
            // add it with the char to new entry in the dic then add them to the output
            dic[currentIndex] = dic[index]+char;
            currentIndex++;
            output += dic[index]+char;
            createChar(dic[index]+char);
            await delay(DELAY);
        }

        // highligh solution done
        highlightSol(i,colorDone);
        await delay(DELAY)
    }
    return output;

}

