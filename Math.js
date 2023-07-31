var num1 = [];
var num2 = [];
var Operation = [];

//Create Random 10 Tasks
for(var i =0; i <10; i++){
    num1[i] = Math.floor(Math.random()*30);
}
for(var i =0; i <10; i++){
    num2[i] = Math.floor(Math.random()*30);
}
for(var i =0; i <10; i++){
    Operation[i] = Math.floor(Math.random() * 4)
}
var dict = [];
for(var i =0; i <10; i++){
    var s, r;
    switch(Operation[i]) { 
        case 0:
            r = num1[i] + num2[i];
            s = "+";
            break;
        case 1:
            var tmp;
            if(num1[i] < num2[i]){
                tmp = num1[i];
                num1[i] = num2[i];
                num2[i] = tmp;
            }
            r = num1[i] - num2[i];           
            s = "-";
            break;
        case 2:
            r = num1[i] * num2[i];
            s = "x";
            break;
        case 3:
            var tmp;
            if(num1[i] < num2[i]){
                tmp = num1[i];
                num1[i] = num2[i];
                num2[i] = tmp;
            }
            if( (num1[i] == 0 || num2[i] == 0) || ((num1[i]/num2[i]).toString().replace('.','') > 10000000)){
                    r = num1[i] + num2[i];
                    s = "+"
                }
            else{
                r = num1[i] / num2[i];
                s = "÷";
            } 
            break;
    }
    var text = `${num1[i]} ${s} ${num2[i]}`;
    dict.push({
        key: text,
        value: r
    })
}
var f = dict[0].key;
Quiz.innerHTML = f;
var count = 1;
var NextBn = document.getElementById("Next");
var CheckBn = document.getElementById("Check");
var Counter = document.getElementById("count");
Counter.innerHTML = `${count}/10`;
var input = document.getElementById("Value");
NextBn.setAttribute("disabled", true);
let CorN = 0, FalsN=0;

//check if it is correct or wornng
function Check(){
    if(count <= 10 && input.value != ''){
        if(input.value == dict[count-1].value){
            console.log("Correct");
            input.style.backgroundColor = "#9f9";
            CorN ++;
        }
        else{
            console.log("False");
            input.style.backgroundColor = "#f99";
            FalsN++;
        }
        NextBn.removeAttribute("disabled");
        input.setAttribute("disabled", true);
        CheckBn.setAttribute("disabled", true);
        if(count == 10){
            var Result = document.getElementById("Result");
            var AgainBn = document.getElementById("StartAg");
            NextBn.setAttribute("disabled", true);
            var Res = `Correct: ${CorN} , Wrong: ${FalsN}`;
            Result.innerHTML = Res;
            AgainBn.style.display = "inline";
            AgainBn.removeAttribute("disabled");
        }
    }  
}

//Click to go to next task
function Next(){    
        var f = dict[count].key;
        Quiz.innerHTML = f;
        count = count + 1;
        Counter.innerHTML = `${count}/10`;
        input.removeAttribute("disabled");
        input.style.backgroundColor = "#fff";
        input.value = '';
        CheckBn.removeAttribute("disabled");
        NextBn.setAttribute("disabled", true);
}

