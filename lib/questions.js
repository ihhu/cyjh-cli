let questionOne=[
    {
        name:"projectName",
        type:"input",
        message:"Enter your Project's name:",
        validate(value){
            if(value.length){
                return true;
            }else{
                return `Please Enter your Project's name`;
            }
        }
    }
];

module.exports={
    questionOne
}
