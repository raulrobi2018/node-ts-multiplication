import fs from "fs";
import {yarg} from "./config/plugins/args.plugin";

const message: string = "Hello world!";
const title: string = "Tabla del ";
const bar: string = "========================================";
let content: string;
let outputPath;
const {b: base, l: limit, s: show} = yarg;

const printNumbers = () => {
    for (let index = 1; index <= limit; index++) {
        content += `${base} x ${index} = ${Number(base) * index}\n`;
        if (show) {
            console.log(`${base} x ${index} = ${Number(base) * index}`);
        }
    }
};

if (show) {
    console.log(bar);
    console.log(title + base);
    console.log(bar);
}

content = `${bar}\n ${title} ${base} \n${bar}\n`;
printNumbers();

outputPath = `outputs`;
fs.mkdirSync(outputPath, {recursive: true});
try {
    fs.writeFileSync(`${outputPath}/table-${base}.txt`, content);
    console.log("File created!");
} catch (error) {
    console.log(error);
}
