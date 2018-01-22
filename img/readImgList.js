let fs=require("fs");
let imgAry=fs.readdirSync("./");
let result=[];

imgAry.forEach(function (item) {
  if(/\.(jpg|png|gif)$/i.test(item)){
    result.push(`img/`+item);
  }
});
fs.writeFileSync("./result.txt",JSON.stringify(result),"utf-8");

