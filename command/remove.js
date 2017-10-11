const path=require("path");
const inquirer=require("inquirer");

const fs=require("../lib/file");
const questions=require("../lib/questions");
const config=require("../lib/config");

let questionRemove=questions.questionRemove;
let TemplatePath=path.resolve(__dirname,"../template/");

function readDir(){
    return fs.readdir(TemplatePath).then(data=>{
        let choices=[];
        data.forEach((value,i)=>{
            if(value.toLocaleLowerCase()==="pc"||value.toLocaleLowerCase()==="mobile"){
                return;
            }
            choices.push(value);
        })
        questionRemove[0].choices=choices;
    })
}
function init(){
    readDir().then(()=>{
        return inquirer.prompt(questionRemove);    
    }).then(({templateName,bRemove})=>{
        if(bRemove){
            let _path=path.join(TemplatePath,templateName);
            fs.showCreateDirInfo("Start removeing Template... ")
            fs.remove(_path).then(()=>{
                fs.showCreateDirInfo("Removeing Template success... ")
            });
        }
    }).catch(err=>{
        //error
        console.log("err:", err);
    })

    return;

}

module.exports=function(opts){
    init();
    return;
}

