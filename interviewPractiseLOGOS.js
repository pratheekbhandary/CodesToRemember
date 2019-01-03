function processData(input) {
    const [noOfTests,...testCases]=input.split(/\r?\n/);
    const outputArray=[];
    testCases.forEach((ele,index)=>{
        if(index % 2!==0) return;
        const count = ele;
        const array = testCases[index+1].split(" ").map(ele=>parseInt(ele));
        const sumOfArray = array.reduce((acc,curr)=>acc+curr);
        //first half
        let midpoint=-1;
        let midpointSum=-1;
        array.reduce((acc,ele,index)=>{
            if(acc===-1) return -1;
            const currentSum=(sumOfArray-ele)/2;
            if(acc===currentSum){
                midpoint=index;
                midpointSum=currentSum;
                return -1;
            }
            return acc+ele;
        });
        
        if(midpoint===-1){
            console.log('NO');
            return;
        }
        else {
        const remainingSum = array.reduce((acc,ele,index)=>{
            if(index<=midpoint) return 0;
            return acc+ele;
        });
        if(remainingSum===midpointSum){
            console.log('YES');
            return;
        }
        console.log('NO');
        }
    })
    //console.log(outputArray);
} 

process.stdin.resume();
process.stdin.setEncoding("ascii");
_input = "";
process.stdin.on("data", function (input) {
    _input += input;
});

process.stdin.on("end", function () {
   processData(_input);
});
