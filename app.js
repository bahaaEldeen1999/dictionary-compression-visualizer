let input = document.getElementById('input');
let button = document.getElementById('submit');
let decode = document.getElementById('decode');
decode.style.display = 'none';
let output = [];
button.addEventListener('click',async ()=>{
    decode.style.display = 'none';
    let text = input.value;
     output = await lz78Encode(text);
     decode.style.display = 'block';

})

decode.addEventListener('click',async ()=>{
    if(output.length != 0)lz78Decode(output);
})