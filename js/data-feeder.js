function line(content) {
  return `<p>${content}</p>`;
}

function renderObject(data) {
  let thData = '';
  let tdData = '';
  for (var k in data) {
    thData += `<td>${k}</td>`;
    tdData += `<td>${data[k]}</td>`;
  }
  return `<table>
  <tr>${thData}</tr>
  <tr>${tdData}</tr>
 </table>`;
}

const mainTree = {
  projects: {
    'project-a': {
      isEnd: true,
      description: 'Description',
      title: 'Title',
      nodeType: 'PROJECT',
    },
    'project-b': {
      isEnd: true,
      description: 'Description',
      title: 'Title',
      nodeType: 'PROJECT',
    },
  },
  thoughts: {
    'thought-b': {
      isEnd: true,
      title: 'Title 1',
    },
    'thought-a': {
      isEnd: true,
      title: 'Title 2',
    },
  },
  profiles: {
    email: 'shajan@gmail.com',
    facebook: 'shajanjp',
    github: 'shajanjp',
    instagram: 'shajanjp',
    linkedin: 'shajanjp',
    pinterest: 'shajanjp',
    skype: 'shajanjp',
    twitter: 'shajanjacob',
    youtube: 'shajanjp',
  },
  stories: {
    'story-1': {
      isEnd: true,
      title: 'My little story',
    },
  },
};

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

function cdCommand(paths) {
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

    case 'cd':
      renderedReplay = cdCommand(command.split('cd ')[1].split('/'));
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
  )}</span> $<input type="text">`;
  return renderedReplay;
}