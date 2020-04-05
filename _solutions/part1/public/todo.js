const Todo = class {
	constructor() {
		this.init();
	}

	init() {
		// add event handlers
		$('#add-task').on('submit',(e)=>{this.addTask(e)});
		$('#todos').on('click','.js-delete', (e)=>{this.deleteTask(e)} );
		$('#todos').on('click','.js-check', (e)=>{this.toggleDone(e)} );
		// $('.js-delete').on('click', (e)=>{this.deleteTask(e)} )
	}

	addTask(e){
		e.preventDefault();
		const task = $('#task').val();
		const $template = $('.todo-template').contents().clone();
		$template.find('.text').text(task);
		$('#todos').append($template);
	}

	deleteTask(e){
		const task = $(e.currentTarget).parent('.todo').remove();
	}

	toggleDone(e){
		e.preventDefault();
		$(e.currentTarget).parent('.todo').toggleClass('is-done');
	}
};

$(document).ready(function(){
	new Todo();
});
