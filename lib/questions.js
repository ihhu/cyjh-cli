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
let questionAdd=[
    {
        name:"templateName",
        type:"input",
        message:"Enter your Template's name:",
        validate(value){
            console.log("\n");
            console.log(value);
            if(value.length){
                if(/[\\\/\*\?\|\<\>\:\"]+/g.test(value)){
                    return `Template name is illegal.`;
                }
                return true;
            }else{
                return `Please Enter your Template's name.`;
            }
        }
    },
    {
        name:"bAdd",
        type:"confirm",
        message:function(args){
            return `Confirm Template's name：${args.templateName}`
        },
        default:true
    }
]
module.exports={
    questionOne,
    questionAdd
}
