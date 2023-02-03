import fs from 'fs';
import inquirer from 'inquirer';
import path from 'path';

// create view MyView
let project = {};

const createViewPrompt = {
  type: 'input',
  name: 'name',
  message: 'View name?',
};

function createView() {
  inquirer.prompt([createViewPrompt]).then(answers => {
    createViewWithName(answers.name);
  });
}

const createModulePrompt = {
  type: 'input',
  name: 'name',
  message: 'Module name?',
};

function createModule() {
  inquirer.prompt([createModulePrompt]).then(answers => {
    writeFolderRecursive(`./src/app/modules/${answers.name}/screens`);
  });
}

const createComponentPrompt = {
  type: 'input',
  name: 'name',
  message: 'Component name?',
};

function createComponent() {
  inquirer.prompt([createComponentPrompt]).then(answers => {
    createComponentWithName(answers.name);
  });
}

const createViewWithNamePrompt = {
  type: 'list',
  name: 'module',
  message: 'Select a module',
  choices: [],
};

function createViewWithName(name) {
  createViewWithNamePrompt.choices = getModules();
  inquirer.prompt([createViewWithNamePrompt]).then(answers => {
    const module = answers.module;
    const global = `./src/app/modules/${module}/screens/${name}`;
    createViewFile(
      './config/templates/controller.txt',
      `${global}/Controllers/${name}Controller.tsx`,
      name,
    );
    createViewFile(
      './config/templates/viewmodel.txt',
      `${global}/ViewModels/${name}ViewModel.ts`,
      name,
    );
    createViewFile(
      './config/templates/view.txt',
      `${global}/Views/${name}View.tsx`,
      name,
    );
    regenerateModuleIndex(module);
    regenerateScreensCatalog();
  });
}

function createComponentWithName(name) {
  const global = `./src/components`;
  createViewFile(
    './config/templates/component.txt',
    `${global}/${name}.tsx`,
    name,
  );
}

const createPrompt = {
  type: 'list',
  name: 'action',
  message: 'What kind of element you want to create?',
  choices: ['view', 'module', 'component'],
};

function create() {
  inquirer.prompt([createPrompt]).then(answers => {
    switch (answers.action) {
      case 'view':
        createView();
        break;
      case 'module':
        createModule();
      case 'component':
        createComponent();
      default:
        break;
    }
  });
}

function init() {
  const configPath = './config/project.json';
  const data = {
    modules: getModules(),
    screens: getScreens(),
  };
  fs.writeFileSync(configPath, JSON.stringify(data));
}

function getModules() {
  return fs.readdirSync('./src/app/modules');
}

function getScreens() {
  let screens = [];
  const modules = getModules();
  for (var i in modules) {
    const list = fs.readdirSync('./src/app/modules/' + modules[i] + '/screens');
    screens = screens.concat(list);
  }
  return screens;
}

function getScreensOnModule(module) {
  return fs.readdirSync('./src/app/modules/' + module + '/screens');
}

function createViewFile(source, to, viewName) {
  let text = fs.readFileSync(source, {encoding: 'utf8', flag: 'r'});
  text = text.replaceAll('${name}', viewName);
  writeFileSyncRecursive(to, text);
}

function writeFileSyncRecursive(filename, content = '') {
  fs.mkdirSync(path.dirname(filename), {recursive: true});
  fs.writeFileSync(filename, content);
}

function writeFolderRecursive(filename) {
  fs.mkdirSync(filename, {recursive: true});
}

function regenerateModuleIndex(module) {
  const path = `./src/app/modules/${module}/index.ts`;
  const screens = getScreensOnModule(module);
  let content = '';
  screens.forEach(screen => {
    content =
      content +
      `import ${screen}Controller from './screens/${screen}/Controllers/${screen}Controller';\n`;
  });
  content = content + '\n';
  screens.forEach(screen => {
    content =
      content +
      `import ${screen}ViewModel from './screens/${screen}/ViewModels/${screen}ViewModel';\n`;
  });
  content = content + '\nexport {\n';
  screens.forEach(screen => {
    content = content + `${screen}Controller,\n${screen}ViewModel,\n`;
  });
  content = content + '}';
  writeFileSyncRecursive(path, content);
}

function regenerateScreensCatalog() {
  const path = './src/constants/Screens.ts';
  const screens = getScreens();
  let content = 'enum ScreenNames {\n\tDashboard,\n';
  screens.forEach((value, index) => {
    content = content + `\t${value},\n`;
  });
  content = content + '}\n\nexport default ScreenNames;';
  writeFileSyncRecursive(path, content);
}

const runPrompt = {
  type: 'list',
  name: 'action',
  message: 'Select an action',
  choices: ['create'],
};

function run() {
  init();
  inquirer.prompt([runPrompt]).then(answers => {
    switch (answers.action) {
      case 'create':
        create();
        break;
      default:
        break;
    }
  });
}

run();
