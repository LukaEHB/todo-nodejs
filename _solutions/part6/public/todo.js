const Todo = class {
	constructor() {
		// this.tasks = [];
		this.init();
	}

	init() {
		// add event handlers
		$('#add-task').on('submit',(e)=>{this.addTask(e)});
		$('#todos').on('click','.js-delete', (e)=>{this.deleteTask(e)} );
		$('#todos').on('click','.js-check', (e)=>{this.toggleDone(e)} );
		// $('.js-delete').on('click', (e)=>{this.deleteTask(e)} );
		fetch('/getItems')
			.then(response => response.json())
			.then(data => {
				this.showTasks(data);
			});
			
	}

	showTasks(tasks){
		tasks.forEach(task => {
			const $template = $('.todo-template').contents().clone();
			$template.find('.text').text(task.text);
			$template.attr('data-id',task.id);
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

		fetch('/saveItem', {
			method: 'post',
			body: JSON.stringify({"text": task, "checked":false}),
			headers: {
				'Content-type': 'application/json'
			}
		})
		.then(response => response.json())
		.then(data => {
			console.log(data.id);
			$template.attr('data-id', data.id);
			$('#todos').append($template);
		});
	}

	deleteTask(e){
		const task = $(e.currentTarget).parent('.todo');
		const id = task.data('id');
		task.remove();
		fetch('/deleteItem/'+ id,{
			method: 'delete',
		}); 
	}

	toggleDone(e){
		e.preventDefault();
		const id = $(e.currentTarget)
			.parent('.todo')
			.toggleClass('is-done')
			.data('id');
			
			const isChecked = $(e.currentTarget).find('input').prop('checked');
			$(e.currentTarget).find('input').prop('checked', !isChecked);

			fetch('/updateItem/'+id, {
				method: 'PATCH',
				body: JSON.stringify({"prop": "checked", "value":!isChecked }),
				headers: {
					'Content-type': 'application/json'
				}
			});
	}
};

$(document).ready(function(){
	new Todo();
});
