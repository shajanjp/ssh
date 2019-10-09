function line(content) {
  return `<p>${content}</p>`;
}

function renderObject(data) {
  let rData = '';
  for (var k in data) {
    rData += `<p><span class="c-faded">${k}</span> : ${data[k]}</p>`;
  }
  return rData;
}

let currentPathStack = [];

function currentPath() {
  let cPath = mainTree;
  currentPathStack.forEach(path => {
    cPath = cPath[path];
  });
  return cPath;
}

function lsCommand() {
  if (currentPath().isEnd == true) {
    return line(renderObject(currentPath()));
  } else {
    filesystemPrediction = Object.keys(currentPath());
    return line(Object.keys(currentPath()).join(' '));
  }
}

function pwdCommand(){
  return line(`/${currentPathStack.join('/')}`)
}

function cdCommand(relativePath) {
  if(relativePath == ''){
    currentPathStack = []
    return line('');
  }
  else {
    relativePath = relativePath.trim();
    let paths = relativePath.split('/');
    paths.forEach(path => {
      if (currentPath()[path]) {
        currentPathStack.push(path);
      }
      if (path == '..') {
        currentPathStack.pop();
      }
    });
    return line('');
  }
}

function catCommand(path){
// if(path )
}

function getReplay(command) {
  let renderedReplay = '';
  let commandSplit = command.split(' ');
  console.log('commandSplit.slice(1)', commandSplit.slice(1));
  switch (commandSplit[0]) {
    case 'ls':
      renderedReplay = lsCommand();
      break;
    
    case 'pwd':
      renderedReplay = pwdCommand();
      break;

    case 'cd':
      renderedReplay = cdCommand(command.split('cd')[1]);
      break;

    case 'cat':
      renderedReplay = catCommand(command.split('cat ')[1])
      break;

    case 'exit':
      window.close();
      break;

    case 'uptime':
      renderedReplay = line(sinceExact(new Date(1993, 7, 24)));
      break;

    case 'whoami':
      renderedReplay = line('shajan');
      break;

    default:
      renderedReplay = `<p>${command}: command not found</p>`;
      break;
  }
  renderedReplay += `<span class="stdout-text">${currentPathStack.join(
    '/'
  )}</span> $<input type="text" autocorrect="off" autocapitalize="off">`;
  return renderedReplay;
}