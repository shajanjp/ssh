function line(content){
  return `<p>${content}</p>`;
}


const mainTree = {
  "projects": {
    "project A": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore, optio!",
    "project B": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum, facilis.",  
    "project C": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum, facilis.",  
    "project D": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum, facilis." 
  },
  "thoughts": ["Thought 1", "Thought 2", "Thought 3", "Thought 4", "Thought 5", "Thought 6"]
}

let currentPath = mainTree;

function lsCommand(){
  return line(Object.keys(currentPath).join(" "));
}

function cdCommand(path){
  currentPath = currentPath[path];
  return line("");
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

}

function getReplay(command){
  let commandSplit = command.split(" ")
  console.log('commandSplit[1]', commandSplit[1]);
  switch(commandSplit[0]) {
    case "ls":
      return lsCommand();
      break;
    
    case "cd":
      return cdCommand(commandSplit[1]);
      break;
    
    default:
      break;
    // code block
  }

  return replays[command] || `<p>${command}: command not found</p>`;
}
