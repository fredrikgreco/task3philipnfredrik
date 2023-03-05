const formTodo = document.querySelector('#formTodo');
const newTodo = document.querySelector('#new-todo');
const todoList = document.querySelector('#todoList');
const showTodo = document.querySelector('#partToShow');
let todoCount = 0;
let todoCounter = document.querySelector('#todoCounter');
const clearCompletedButton = document.querySelector('#clearCompleted');
clearCompletedButton.style.visibility = 'hidden'
showTodo.style.display = 'none';
const allButtonBorder = document.querySelector('#allButton');
const activeButtonBorder = document.querySelector('#activeButton');
const completedButtonBorder = document.querySelector('#completedButton');




formTodo.onsubmit = event => {
  event.preventDefault();
  const todoText = newTodo.value.trim();
  if (todoText === '') {
    return;
  }
  const todoId = `todo-${todoCount}`;
  todoCount++;
  const todoItem = document.createElement('li');
  const todoCheckbox = document.createElement('input');
  todoCheckbox.type = 'checkbox';
  todoCheckbox.id = todoId;
  todoCheckbox.onclick = () => {
    if (todoCheckbox.checked) {
      todoCount--;
      todoLabel.setAttribute('class', 'stroke');

    }
    else if (!todoCheckbox.checked) {
      todoCount++;
      todoLabel.setAttribute('class', 'normal');

    }
    emptyList();
    updateTodoCounter();
    showhideCompletedButton();
  };

  const todoLabel = document.createElement('label');
  todoLabel.setAttribute('class', 'normal');
  todoLabel.textContent = '  ' + todoText + '  ';
  todoLabel.setAttribute('for', todoId);
  const removeButton = document.createElement('input');
  removeButton.setAttribute('type', 'button');
  removeButton.setAttribute('id', 'removeButton');
  removeButton.setAttribute('value', '❌');
  removeButton.onclick = () => {
    todoList.removeChild(todoItem);
    if (todoCheckbox.checked) {
      todoCount++;

    }
    else {
      todoCount--;


    }
    emptyList();
    updateTodoCounter();
  };
  todoItem.appendChild(todoCheckbox);
  todoItem.appendChild(todoLabel);
  todoItem.appendChild(removeButton);
  todoList.appendChild(todoItem);
  emptyList();
  updateTodoCounter();
  showhideCompletedButton();

  newTodo.value = '';
};

function updateTodoCounter() {
  const uncheckedCount = document.querySelectorAll('#todoList input[type="checkbox"]:not(:checked)').length;
  todoCounter.textContent = `${uncheckedCount} items left`;
}

const showAll = document.querySelector('#allButton');
showAll.onclick = () => {
  allButtonBorder.style.border = 'solid';
  activeButtonBorder.style.border = '';
  completedButtonBorder.style.border = '';
  const todoItems = todoList.querySelectorAll('li');
  todoItems.forEach(todoItem => {
    todoItem.style.display = '';
    // const allbuttonBorder = document.querySelector('#allButton');
    // allButtonBorder.style.border = 'solid';
  });
}
const showActive = document.querySelector('#activeButton');
showActive.onclick = () => {
  allButtonBorder.style.border = '';
  activeButtonBorder.style.border = 'solid';
  completedButtonBorder.style.border = '';
  const todoItems = todoList.querySelectorAll('li');
  todoItems.forEach(todoItem => {
    if (todoItem.querySelector('input[type=checkbox]').checked) {
      todoItem.style.display = 'none';
    }
    else {
      todoItem.style.display = '';
    }
  });
}
const showCompleted = document.querySelector('#completedButton');
showCompleted.onclick = () => {
  allButtonBorder.style.border = '';
  activeButtonBorder.style.border = '';
  completedButtonBorder.style.border = 'solid';
  const todoItems = todoList.querySelectorAll('li');
  todoItems.forEach(todoItem => {
    if (todoItem.querySelector('input[type=checkbox]').checked) {
      todoItem.style.display = '';
    }
    else {
      todoItem.style.display = 'none';
    }
  });
}

clearCompletedButton.onclick = () => {
  const todoItems = todoList.querySelectorAll('li');
  todoItems.forEach(todoItem => {
    if (todoItem.querySelector('input[type=checkbox]').checked) {
      todoItem.remove();

    }
  });
  emptyList();
  updateTodoCounter();
};

const selectAll = document.querySelector('#selectAll');

selectAll.onclick = () => {
  const checkboxes = document.querySelectorAll('#todoList input[type="checkbox"]');
  let allChecked = true;
  const findLabel = document.querySelectorAll('label');


  checkboxes.forEach((checkbox) => {
    if (!checkbox.checked) {
      checkbox.checked = true;
      allChecked = false;
      findLabel.forEach((findLabel) => {
        findLabel.setAttribute('class', 'stroke');

      });
    }
    else {
      allChecked = allChecked && true;
    }
  });

  if (allChecked) {
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
    findLabel.forEach((findLabel) => {
      findLabel.setAttribute('class', 'normal');

    });
  }
  updateTodoCounter();
  showhideCompletedButton();
};

// function showhideCompletedButton() {
//   const checkboxes = document.querySelectorAll('#todoList input[type="checkbox"]');
//   let isCompleted = false;

//   checkboxes.forEach((checkbox) => {
//     if (checkbox.checked) {
//       isCompleted = true;
//     }
//   });

//   if (isCompleted) {
//     clearCompletedButton.style.visibility = 'visible';
//     document.querySelector('label').classList.add("stroke");
//     document.querySelector('label').classList.remove("normal");
//   } else {
//     clearCompletedButton.style.visibility = "hidden";
//     document.querySelector('label').classList.add("normal");
//     document.querySelector('label').classList.remove("stroke");
//   }
// }

function showhideCompletedButton() {
  const checkboxes = document.querySelectorAll('#todoList input[type="checkbox"]');
  let checked = false;

  checkboxes.forEach((checkbox) => {
    if (!checkbox.checked) {
      clearCompletedButton.style.visibility = "hidden";
    }
  });
  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      clearCompletedButton.style.visibility = 'visible'
    }
  });
}

function emptyList() {
  const checklist = document.querySelectorAll('li');
  if (checklist.length === 0) {
    showTodo.style.display = 'none';
  }
  else {
    showTodo.style.display = '';
  }
}


// function toggleStroke() {
// const boxesToCheck = document.querySelectorAll('#todoList input[type="checkbox"]');
// const strokeStyle = document.querySelectorAll('label');

// boxesToCheck.forEach((checkbox) => {
//   if (checkbox.checked) {
//     strokeStyle.setAttribute('class', 'stroke');
//   }
//   // else {
//   //   strokeStyle.setAttribute('class', 'normal');
//   // }
// })

// }