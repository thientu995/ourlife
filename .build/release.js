const fs = require('fs-extra');
const path = require('path');
const recursive = require('recursive-readdir');
const rimraf = require('rimraf');
const javaScriptObfuscator = require('javascript-obfuscator');
const miniCSS = require("mini-css");
const { FILE } = require('dns');
const folderNameRelease = '.release';
const pathHome = path.join(__dirname, '../');
const pathFolderRelease = path.join(pathHome, folderNameRelease);

if (fs.existsSync(pathFolderRelease)) {
    rimraf.sync(pathFolderRelease);
}

recursive(pathHome, ['node_modules', '**/.*'], function (err, files) {
    fs.mkdirSync(pathFolderRelease);
    files.forEach(file => {
        let pfileName = file.replace(pathHome, '').indexOf('\\');
        if (pfileName < 0) {
            copyFileSync(file, pathFolderRelease);
        }
        else {
            copyFolderRecursiveSync(path.dirname(file), pathFolderRelease);
            obfuscator();
        }
    });
});

function copyFileSync(source, target) {

    var targetFile = target;

    //if target is a directory a new file with the same name will be created
    if (fs.existsSync(target)) {
        if (fs.lstatSync(target).isDirectory()) {
            targetFile = path.join(target, path.basename(source));
        }
    }

    fs.writeFileSync(targetFile, fs.readFileSync(source));
}

function copyFolderRecursiveSync(source, target) {
    let files = [];

    //check if folder needs to be created or integrated
    let targetFolder = target;//path.join(target, path.basename(source));
    let curFolder = source.replace(pathHome, '');
    let arrFolder = curFolder.split('\\');
    if (arrFolder.length > 0) {
        arrFolder.forEach(value => {
            targetFolder = path.join(targetFolder, value);
            if (!fs.existsSync(targetFolder)) {
                fs.mkdirSync(targetFolder);
            }
        });
    }

    //copy
    if (fs.lstatSync(source).isDirectory()) {
        files = fs.readdirSync(source);
        files.forEach(function (file) {
            let curSource = path.join(source, file);
            if (fs.lstatSync(curSource).isDirectory()) {
                copyFolderRecursiveSync(curSource, targetFolder);
            } else {
                copyFileSync(curSource, targetFolder);
            }
        });
    }
}

function obfuscator() {
    recursive(pathFolderRelease, [], function (err, files) {
        files.forEach(file => {
            const extName = path.extname(file);
            switch (extName) {
                case '.js':
                    obfJS(file);
                    break;
                case '.css':
                    obgCSS(file);
                    break;
                case '.html':
                    obgHTML(file);
                    break;
                case '.json':
                    obgJSON(file);
                    break;
                default:
                    break;
            }
        });

    });
}

function obfJS(file) {
    miniCSS(null, file, true);
    // let contents = fs.readFileSync(file, 'utf8');
    // let ret = javaScriptObfuscator.obfuscate(contents, {
    //     compact: true,
    //     controlFlowFlattening: false,
    //     deadCodeInjection: false,
    //     debugProtection: false,
    //     debugProtectionInterval: false,
    //     disableConsoleOutput: true,
    //     identifierNamesGenerator: 'hexadecimal',
    //     log: false,
    //     renameGlobals: false,
    //     rotateStringArray: true,
    //     selfDefending: true,
    //     shuffleStringArray: true,
    //     splitStrings: false,
    //     stringArray: true,
    //     stringArrayEncoding: false,
    //     stringArrayThreshold: 0.75,
    //     unicodeEscapeSequence: false
    // });
    // fs.writeFileSync(file, ret);
}

function obgCSS(file) {
    miniCSS(null, file, true);
}

function obgHTML(file) {
    miniCSS(null, file, true);
}

function obgJSON(file) {
    miniCSS(null, file, true);
}