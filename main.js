let userInput = document.getElementById('user-input');
let btnSave = document.getElementById('btn-save');
let tabs = document.querySelectorAll('.task-tab ul li a');
let underLine = document.getElementById('under-line');
let taskList = [];
let filteredList = [];
let selectedMenu = 'task-all';


btnSave.addEventListener('mousedown', addTask);
userInput.addEventListener('keypress', function(event){
    if(event.keyCode === 13){
        addTask(event);
    }
});

for(let i=0;i<tabs.length;i++){
    tabs[i].addEventListener('click', function(event){
        filter(event)
    });
}

function addTask(){

    let inputValue = userInput.value;

    let task = {
        content: inputValue,
        isComplete: false,
        id: randomIDGenerator(),
    };

    taskList.push(task);
    userInput.value = '';
    render();
    
    
}

function render(){

    let result = '';
    
    list = [];

    if(selectedMenu === 'task-all'){
        list = taskList;
    }else{
        list = filteredList;
    }
   
    for(let i=0;i<list.length;i++){
        if(list[i].isComplete){
            result += ` <section>
                            <span class="done">${list[i].content}</span>
                            <div class="btn-area">
                                <button class="check" onclick="toggleCheck('${list[i].id}')"><i class="fa-solid fa-circle-check"></i></button>
                                <button class="delete" onclick="deleteItem('${list[i].id}')"><i class="fa-solid fa-trash"></i></button>
                            </div>
                        </section>`
        }else {
            result += ` <section>
                    <span>${list[i].content}</span>
                    <div class="btn-area">
                        <button class="check" onclick="toggleCheck('${list[i].id}')"><i class="fa-solid fa-circle-check"></i></button>
                        <button class="delete" onclick="deleteItem('${list[i].id}')"><i class="fa-solid fa-trash"></i></button>
                    </div>
                </section>`
         }

       
    }
    document.getElementById('task-list').innerHTML = result;
}

function toggleCheck(id){
    for(let i=0;i<taskList.length;i++){
        if(taskList[i].id === id){
            taskList[i].isComplete = !taskList[i].isComplete;
            break;
        }
    }
    filter();
}

function deleteItem(id){
    for(let i=0;i<taskList.length;i++){
        if(taskList[i].id === id){
            taskList.splice(i,1);
        }
    }
    filter();
}


function filter(event){

    if(event){
        selectedMenu = event.target.id;
        underLine.style.width = event.target.offsetWidth + 'px';
        underLine.style.left = event.target.offsetLeft + 'px';
        underLine.style.top = event.target.offsetTop + (event.target.offsetHeight + 10) + 'px';

    }
    
    filteredList = [];

    if(selectedMenu === 'task-not-done'){
        for(let i=0;i<taskList.length;i++){
            if(taskList[i].isComplete == false){
                filteredList.push(taskList[i]);
            }
        }
    }else if(selectedMenu === 'task-done'){
        for(let i=0;i<taskList.length;i++){
            if(taskList[i].isComplete == true){
                filteredList.push(taskList[i]);
            }
        }
    }
    render();

}

function randomIDGenerator(){
    return '_' + Math. random(). toString(36). substr(2, 9);
}
