const Todo = class {
	constructor() {
		this.tasks = [{text: "coding", checked: false},{text:"javascript", checked: true}];
		this.init();
	}

	init() {
		// add event handlers
		$('#add-task').on('submit',(e)=>{this.addTask(e)});
		$('#todos').on('click','.js-delete', (e)=>{this.deleteTask(e)} );
		$('#todos').on('click','.js-check', (e)=>{this.toggleDone(e)} );
		// $('.js-delete').on('click', (e)=>{this.deleteTask(e)} );
		this.showTasks();
	}

	showTasks(){
		this.tasks.forEach(task => {
			const $template = $('.todo-template').contents().clone();
			$template.find('.text').text(task.text);
			console.log($template);
			if (task.checked) {
				$template.find('input').attr('checked', true);
				$template.addClass('is-done')
			}
			$('#todos').append($template);
		});
	}

	addTask(e){
		e.preventDefault();
		const task = $('#task').val();
		const $template = $('.todo-template').contents().clone();
		$template.find('.text').text(task);
		$('#todos').append($template);
		const newTask = {text: task, checked:false};
		this.tasks.push(newTask);		
	}

	deleteTask(e){
		const task = $(e.currentTarget).parent('.todo');
		const index = task.index();
		task.remove();
		this.tasks.splice(index, 1);
	}

	toggleDone(e){
		e.preventDefault();
		const index = $(e.currentTarget)
			.parent('.todo')
			.toggleClass('is-done')
			.index();
		
			const isChecked = $(e.currentTarget).find('input').prop('checked');
			$(e.currentTarget).find('input').prop('checked', !isChecked);
			this.tasks[index].checked = !isChecked;
			console.log(this.tasks);
	}
};

$(document).ready(function(){
	new Todo();
});
