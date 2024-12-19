// const link = document.querySelector(".flex-item-item");
const link = document.querySelectorAll(".flex-item-item");
const display = document.querySelector(".display");
let current = 0;
let hold = 0;
let calc = null;
let zero = false;
let prev = "";

let options = {
    "+/-":function(){current = current*-1},
    "+":function(){hold = current; current = null;},
    "=":function(){
        return current + hold;
    }
}

let formula = {
    "+":function(x,y){return +x + +y},
    "-":function(x,y){return +x - +y}, 
    "*":function(x,y){return +x * +y},
    "/":function(x,y){
        if (y!=0)
        {
            return +x / +y;
        } 
        else
        {
            zero = true;
            return 0;
        }
    },
    "%":function(x,y){return +x % +y},
    "+/-":function(x,y){
    }
}

link.forEach((i)=>{
    i.addEventListener("click", ()=>{
        if (Number.isInteger(+i.textContent))
        {
            if (current)
            {
                current = current + ""  + i.textContent;
            }
            else
            {
                current = +i.textContent;
            }
            display.textContent = current;

        }
        else if ("+-=%/*".includes(i.textContent))
        {
            if (calc)
            {
                hold = formula[calc](hold, current);
                current = null;
                calc = i.textContent;
                if (calc == "=")
                {
                    calc = null;
                }
            }
            else
            {
                if (!hold)
                {
                    if (current)
                    {
                        hold = current; 
                    }
                    else
                    {
                        hold = 0;
                    }
                }
                current = 0;
                calc = i.textContent;
            }
            display.textContent = hold;
            if (zero)
            {
                display.textContent = "lol";
                zero = false;
            }
        }
        else if (".".includes(i.textContent))
        {
            if (current)
            {
                current = current + ".";
            }
            else
            {
                current = "0.";
            }
            display.textContent = current;
            
        }
        else if ("+/-".includes(i.textContent))
        {
            if (display.textContent == current)
            {
                display.textContent = (+display.textContent*-1) + "";
                current = +current * -1
            }
            else
            {
                display.textContent = (+display.textContent*-1) + "";
                hold = +hold * -1
            }
        }
        else
        {
            current = 0;
            hold = 0;
            display.textContent = hold;
        }
        prev = i.textContent;
    })
})