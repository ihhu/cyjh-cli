const path=require("path");
const inquirer=require("inquirer");

const fs=require("../lib/file");
const questions=require("../lib/questions");
const config=require("../lib/config");


let TemplatePath=path.resolve(__dirname,"../template/");
let ProjectPath=path.resolve(process.cwd(),"./");


function addQuestions(){
    return fs.readdir(TemplatePath).then(data=>{
        let tempMap={"Mobile":true,"PC":true};
        let choices=["PC","Mobile"];
        data.forEach((value,i)=>{
            if(!tempMap[value]){
                tempMap[value]=true;
                choices.push(value)
            }
        })
        tempMap=undefined;
        questions.questionOne.push({        
            name: 'templateName',
            type: 'list',
            message: 'Use template:',
            choices: choices,
            default:"PC"
        })
    })
}

function init(opts){
    let bAll=false;
    let toPath=ProjectPath;
    let fromPath=TemplatePath;

    //user input project info
    inquirer.prompt(questions.questionOne).then(args=>{
        toPath=path.join(toPath,args.projectName);

        if(opts.pc&&opts.mobile){
            bAll=true;
        }else if(opts.pc){
            toPath=path.join(toPath,"/PC");
            fromPath=path.join(fromPath,"/PC");
        }else if(opts.mobile){
            toPath=path.join(toPath,"/Mobile")
            fromPath=path.join(fromPath,"/Mobile");
        }else{
            fromPath=path.join(fromPath,args.templateName);
        }
        //check dir
        return fs.ensureDir(toPath)
    })
    //clear dir
    .then(flag=>{
        return fs.emptyDir(toPath)
    })
    //copy template
    .then(flag=>{
        fs.showCreateDirInfo(`\n Project directory：${toPath}`);
        fs.showCreateDirInfo("begin");
        if(bAll){
            let aCopy=[fs.copy(`${fromPath}/PC`,`${toPath}/PC`,filterFunc),
                    fs.copy(`${fromPath}/Mobile`,`${toPath}/Mobile`,filterFunc)]
            return Promise.all(aCopy) 
        }
        return fs.copy(fromPath,toPath,filterFunc);
    })
    //copy end
    .then(flag=>{
        return fs.showCreateDirInfo("end")
    })
    //error
    .catch(err=>{
        console.log("err:",err);
    })
}


module.exports=function(opts){
    console.log(opts);
    if(opts.templateName){
        if(/[\\\/\*\?\|\<\>\:\"]+/g.test(opts.templateName)){
            console.log(`Template name is illegal.`);
            return;
        }
    }
    return;
    inquirer.prompt(questions.questionAdd).then(args=>{
        console.log(args);
        //check dir
        return fs.ensureDir(toPath)
    })
    return;
}

