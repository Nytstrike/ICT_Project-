function HexDigit(hex){
    var arr=["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"];
    var i;

    for (i=0; i<=16; i++){
        if (arr[i]==hex.toUpperCase()){
            return i;
        }
    }
}

function BinToDec(bin){
    var count=1;
    var dec=0;
    for (i=bin.length-1; i>=0; i--){
        dec+=bin[i]*count;
        count=count*2;
    }
    return dec;
}

function DecToHex(dec){
    var arr=["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"];
    var hex=[], digit=[];
    while (dec>=1){
        digit+=arr[dec%16];
        digit+=hex;
        hex=digit;
        dec=(dec-(dec%16))/16;
        digit=[];
    }
    return hex;
}

function BinToHex(bin){
    var hex=[], den=[];
    den=BinToDec(bin);
    hex=DecToHex(den);
    return hex;
}

function DecToBin(dec){
    var bin=[];
    index=1;
    while (index<dec){
        index*=2;
    }
    while (index>=1){
        if (index<=dec){
            bin += "1";
            dec -= index;
        }
        else{
            if (bin!=""){
                bin += 0;
            }
        }
        index/=2;
    }
    return bin;
}

function BinToOct(bin){
    var rev=[], oct=[];
    var digit=[];
    var index=bin.length-1;
    var count=0;
    while (index>=0){
        count +=1;
        digit += bin[index];
        if (count>=3 || index==0){
            count=0;
            rev += BinToDec(digit);
            digit=[];
        }
        index-=1;
    }
    index=rev.length-1;
    while (index>=0){
        oct+=rev[index];
        index-=1;
    }
    return oct;
}

function DecToOct(dec){
    var bin=[], oct=[];
    bin=DecToBin(dec);
    oct=BinToOct(bin);
    return oct;
}

function HexToBin(hex){
    var bin=[], digit=[];
    var i=0;
    while (i<hex.length){
        digit = DecToBin(HexDigit(hex[i]));
        while (digit.length < 4){
            var temp=[];
            temp="0";
            temp+=digit;
            digit=temp;
        }
        bin += digit;
        i=i+1;
    }
    bin = bin.replace(/^0+/, '') || '0';
    return bin;
}

function HexToDec(hex){
    var bin=[], dec=[];
    bin=HexToBin(hex);
    dec=BinToDec(bin);
    return dec;
}

function HexToOct(hex){
    var bin=[], oct=[];
    bin = HexToBin(hex);
    oct = BinToOct(bin);
    return oct;
}

function OctToBin(oct){
    var bin=[], digit=[];
    var i=0;
    while (i<oct.length){
        digit = DecToBin(HexDigit(oct[i]));
        while (digit.length < 3){
            var temp=[];
            temp="0";
            temp+=digit;
            digit=temp;
        }
        bin += digit;
        i=i+1;
    }
    bin = bin.replace(/^0+/, '') || '0';
    return bin;
}

function OctToDec(oct){
    var bin=[], dec=[];
    bin = OctToBin(oct);
    dec = BinToDec(bin);
    return dec;
}

function OctToHex(oct){
    var bin=[], hex=[];
    bin = OctToBin(oct);
    hex = BinToHex(bin);
    return hex;
}

document.getElementById("input-number").addEventListener("input", convert);
document.getElementById("from-base").addEventListener("change", convert);
document.getElementById("to-base").addEventListener("change", convert);

function convert() {
    const inputField = document.getElementById("input-number");
    const outputField = document.getElementById("output-number");
    const fromBase = document.getElementById("from-base").value;
    const toBase = document.getElementById("to-base").value;
    const inputNumber = inputField.value;

    // Clear previous error
    inputField.classList.remove("error");
    outputField.value = "";

    // Validate input based on the selected "from" base
    if (!isValidInput(inputNumber, fromBase)) {
        inputField.classList.add("error");
        outputField.value = "Error: Invalid input for selected base";
        return;
    }

    let result = "";

    // Perform conversion if input is valid
    try {
        if (fromBase === "dec") {
            if (toBase === "bin") result = DecToBin(parseInt(inputNumber));
            else if (toBase === "hex") result = DecToHex(parseInt(inputNumber));
            else if (toBase === "oct") result = DecToOct(parseInt(inputNumber));
            else result = inputNumber;
        } else if (fromBase === "bin") {
            if (toBase === "dec") result = BinToDec(inputNumber);
            else if (toBase === "hex") result = BinToHex(inputNumber);
            else if (toBase === "oct") result = BinToOct(inputNumber);
            else result = inputNumber;
        } else if (fromBase === "hex") {
            if (toBase === "dec") result = HexToDec(inputNumber);
            else if (toBase === "bin") result = HexToBin(inputNumber);
            else if (toBase === "oct") result = HexToOct(inputNumber);
            else result = inputNumber;
        } else if (fromBase === "oct") {
            if (toBase === "dec") result = OctToDec(inputNumber);
            else if (toBase === "bin") result = OctToBin(inputNumber);
            else if (toBase === "hex") result = OctToHex(inputNumber);
            else result = inputNumber;
        }
    } catch (error) {
        result = "Error";
    }

    outputField.value = result;
}

// Helper function to validate input based on base
function isValidInput(input, base) {
    let regex;
    switch (base) {
        case "bin":
            regex = /^[01]+$/;
            break;
        case "dec":
            regex = /^[0-9]+$/;
            break;
        case "hex":
            regex = /^[0-9A-Fa-f]+$/;
            break;
        case "oct":
            regex = /^[0-7]+$/;
            break;
    }
    return regex.test(input);
}
