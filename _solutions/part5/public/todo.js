const Todo = class {
	constructor() {
		this.tasks = [];
		this.$taskContainer = $('#add.task');
		this.$task = $('#task')
		this.init();
	}

	init() {
		// add event handlers
		this.$taskContainer.on('submit',(e)=>{this.addTask(e)});
		this.$task.on('click','.js-delete', (e)=>{this.deleteTask(e)} );
		this.$task.on('click','.js-check', (e)=>{this.toggleDone(e)} );
		// $('.js-delete').on('click', (e)=>{this.deleteTask(e)} );
		fetch('/getItems')
		.then(response => response.json())
		.then(data => {
				this.tasks = data;
				this.showTasks();
		})
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
			$task.append($template);
		});
	}

	addTask(e){
		e.preventDefault();
		const task = $('#task').val();
		const $template = $('.todo-template').contents().clone();
		$template.find('.text').text(task);
		this.$task.append($template);
		const newTask = {text: task, checked:false};

		fetch('/saveItem', {
			method: 'post',
			body: JSON.stringify({"text": task, "checked":false}),
			headers: {
				'Content-type': 'application/json'
			}
		})
		.then(response => response.json())
		.then(data => {
			newTask.id = data.id;
			this.tasks.push(newTask);
		})
	}

	deleteTask(e){
		const task = $(e.currentTarget).parent('.todo');
		const index = task.index();
		
		const id = this.tasks[index].id;
		
		console.log(id);
		
		fetch('/deleteItem/'+id, {
			method: 'delete',
		})
		.then(response =>{
			task.remove();
			this.tasks.splice(index, 1);
		})

	}

	toggleDone(e){
		e.preventDefault();
		const index = $(e.currentTarget)
			.parent('.todo')
			.toggleClass('is-done')
			.index();
		
			const isChecked = $(e.currentTarget).find('input').prop('checked');

			const id = this.tasks[index].id;
			fetch('/updateItem/'+id, {
				method: 'PATCH',
			}).then(()=>{
				$(e.currentTarget).find('input').prop('checked', !isChecked);
				this.tasks[index].checked = !isChecked;
			})
	}
};

$(document).ready(function(){
	new Todo();
});
