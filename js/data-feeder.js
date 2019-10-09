function line(content) {
  return `<p>${content}</p>`;
}

function renderObject(data) {
  let tData = '';
  for (var k in data) {
    tData += `<tr><td class="c-faded">${k}</td><td>${data[k]}</td></tr>`;
  }
  return `<table>
  ${tData}
 </table>`;
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

}

const replays = {
  //   "ls -l": line(`total 5
  // <br>drwxrwxr-x 1 <a href="http://shajanjacob.com">Shajan Jacob</a> js Feb 21 16:57 \t ./
  // <br>drwxrwxr-x 2 <a href="http://shajanjacob.com">Shajan Jacob</a> js Feb 21 16:51 \t ../
  // <br>drwxrwxr-x 3 <a href="http://shajanjacob.com">Shajan Jacob</a> js Feb 21 16:57 \t css/
  // <br>drwxrwxr-x 4 <a href="http://shajanjacob.com">Shajan Jacob</a> js Feb 21 17:26 \t .git/
  // <br>drwxrwxr-x 5 <a href="http://shajanjacob.com">Shajan Jacob</a> js Feb 21 17:26 \t index.html`),
  //   "help": line("This is made possible by terminal UI"),
  //   "whoami": line("shajanjp"),
  //   "free": line(`              total        used        free      shared  buff/cache   available
  // <br>Mem:        8044316     5571224      917188      647028     1555904     1550612
  // <br>Swap:       8262652       60684     8201968`)
};

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