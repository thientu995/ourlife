const fs = require('fs-extra');
const path = require('path');
const recursive = require('recursive-readdir');
const rimraf = require('rimraf');
const javaScriptObfuscator = require('javascript-obfuscator');
const miniCSS = require("mini-css");
const folderNameRelease = 'docs';
const pathHome = path.join(__dirname, '../');
const pathFolderRelease = path.join(pathHome, folderNameRelease);

if (fs.existsSync(pathFolderRelease)) {
    rimraf.sync(pathFolderRelease);
}

recursive(pathHome, ['.gitignore','.git', 'node_modules', 'docs'], function (err, files) {
    fs.mkdirSync(pathFolderRelease);
    files.forEach(file => {
        let sourceRelease = pathFolderRelease;
        let pfileName = file.replace(pathHome, '').indexOf('\\');
        if (pfileName < 0) {
            copyFileSync(file, sourceRelease);
        }
        else {
            let source = path.dirname(file);
            sourceRelease = source.replace(pathHome, pathFolderRelease + "\\");
            copyFileSync(file, sourceRelease);
        }
    });
    obfuscator();
});

function copyFileSync(source, target) {
    fs.mkdirSync(target, { recursive: true });
    fs.writeFileSync(path.join(target, path.basename(source)), fs.readFileSync(source));
}

function obfuscator() {
    recursive(pathFolderRelease, ['node_modules'], function (err, files) {
        files.forEach(file => {
            const extName = path.extname(file);
            if (file.lastIndexOf('.min' + extName) > 0) {
                return;
            }
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
                // case '.json':
                //     obgJSON(file);
                //     break;
                default:
                    break;
            }
        });

    });
}

function obfJS(file) {
    // miniCSS(null, file, true);
    let contents = fs.readFileSync(file, 'utf8');
    let ret = javaScriptObfuscator.obfuscate(contents, {
        compact: true,
        controlFlowFlattening: false,
        deadCodeInjection: false,
        debugProtection: false,
        debugProtectionInterval: false,
        disableConsoleOutput: true,
        identifierNamesGenerator: 'hexadecimal',
        log: false,
        renameGlobals: false,
        rotateStringArray: true,
        selfDefending: true,
        shuffleStringArray: true,
        splitStrings: false,
        stringArray: false,
        stringArrayEncoding: false,
        stringArrayThreshold: 0.75,
        unicodeEscapeSequence: false
    });
    fs.writeFileSync(file, ret);
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