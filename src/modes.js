const { objectToArray } = require("@genx/july");

const CLI = 'cli';
const SERVER = 'server';
const APP_MODULE = 'app-module';
const REACT_LIB = 'react-lib';
const REACT_WEB = 'web';
const REACT_NATIVE = 'mobile';
const ELECTRON = 'desktop';

const modeDescriptions = {
    //[CLI]: "Command line application project based on @genx/app",
    [SERVER]: "Web service hosting project based on @genx/server",    
    [APP_MODULE]: "App module to be hosted by @genx/server",
    //[REACT_LIB]: "React component library",
    //[REACT_WEB]: "React web app",
    //[REACT_NATIVE]: "React native mobile app",
    //[ELECTRON]: "Electron-based desktop app"
};

exports.appModeList = objectToArray(modeDescriptions, "value", "name");

exports.appModes = [
    //CLI,
    SERVER,
    APP_MODULE,
    //REACT_LIB,
    //REACT_WEB,
    //REACT_NATIVE,
    //ELECTRON
];