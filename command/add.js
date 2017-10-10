const path=require("path");
const inquirer=require("inquirer");

const fs=require("../lib/file");
const questions=require("../lib/questions");
const config=require("../lib/config");

let questionAdd=questions.questionAdd;
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

function init(template){
    let toPath=TemplatePath;
    let fromPath=ProjectPath;
    let _path="";
    //user input project info
    inquirer.prompt(questionAdd).then(({templateName,bAdd})=>{
        //toPath=path.join(toPath,args.projectName);
        if(!bAdd){return;}
        _path=templateName||template;
       
        //check dir
        return fs.ensureDir(toPath)
    })

    return;

    //clear dir
    a.then(flag=>{
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
    let templateName=opts.templateName;
    if(templateName){
        if(/[\\\/\*\?\|\<\>\:\"]+/g.test(templateName)||/^\.+$/.test(templateName)){
            console.log(`Template name is illegal.`);
            return;
        }
        questionAdd.shift();
        if(fs.fsExistsSync(path.join(TemplatePath,templateName))){
            questionAdd[0].message=`The template name '${templateName}' already exists, whether it is overwritten`;
            questionAdd[0].default=false;
        }else{
            questionAdd[0].message=`Confirm Template's name：${templateName}`;
        }
        
    }
    init(templateName);
    return;
}

