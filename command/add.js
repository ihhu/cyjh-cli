const path=require("path");
const inquirer=require("inquirer");

const fs=require("../lib/file");
const questions=require("../lib/questions");
const config=require("../lib/config");

let questionAdd=questions.questionAdd;
let TemplatePath=path.resolve(__dirname,"../template/");
let ProjectPath=path.resolve(process.cwd(),"./");


function init(template){
    let toPath=TemplatePath;
    let fromPath=ProjectPath;
    let _path="";
    //user input project info
    inquirer.prompt(questionAdd).then(({templateName,bAdd})=>{
        //toPath=path.join(toPath,args.projectName);
        if(!bAdd){return;}
        templateName=templateName||template;
        toPath=path.join(toPath,templateName);

        fs.showCreateDirInfo(`Add template to：${toPath}`);

        fs.ensureDir(toPath).then(flag=>{
            //empty dir
            return fs.emptyDir(toPath)
        }).then(flag=>{
            //copy template
            fs.showCreateDirInfo(`\n Start creating Template...`);
            return fs.copy(fromPath,toPath);
        }).then(flag=>{
            //copy end
            return fs.showCreateDirInfo("\n Creating Template OK...")
        }).catch(err=>{
            //error
            console.log("err:", err);
        })
    })

    return;

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
            questionAdd[0].message=`The template name '${templateName}' already exists, whether it is overwritten?`;
            questionAdd[0].default=false;
        }else{
            questionAdd[0].message=`Confirm Template's name：${templateName}`;
        }
        
    }
    init(templateName);
    return;
}

