$(document).ready(function () {
    // Add task to the list
    $('#todo-form').on('submit', function (e) {
        e.preventDefault();

        const taskText = $('#task-input').val().trim();
        const priority = $('#priority-select').val();

        if (taskText === '') return;

        // Create a new task item
        const taskItem = $('<li></li>')
            .addClass('todo-item')
            .addClass(priority.toLowerCase())
            .html(`
                ${taskText} 
                <span class="priority">(${priority})</span>
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            `);

        // Append the new task to the to-do list
        $('#todo-list').append(taskItem);

        // Clear the input field
        $('#task-input').val('');
    });

    // Delete a task
    $(document).on('click', '.delete-btn', function () {
        $(this).parent().remove();
    });

    // Edit a task
    $(document).on('click', '.edit-btn', function () {
        const taskItem = $(this).parent();
        const currentText = taskItem.contents().get(0).nodeValue.trim(); // Get only the text content

        const newText = prompt('Edit your task:', currentText);
        if (newText) {
            taskItem.contents().get(0).nodeValue = newText + ' '; // Update text content
        }
    });

    // Enable drag-and-drop sorting within and between containers
    $('#todo-list, #completed-list').sortable({
        connectWith: '#todo-list, #completed-list',
        placeholder: 'ui-state-highlight',
        receive(event, ui) {
            // Adjust classes when moving items between lists
            if ($(this).attr('id') === 'completed-list') {
                ui.item.removeClass('todo-item').addClass('completed-item');
            } else if ($(this).attr('id') === 'todo-list') {
                ui.item.removeClass('completed-item').addClass('todo-item');
            }
        }
    }).disableSelection();
});
