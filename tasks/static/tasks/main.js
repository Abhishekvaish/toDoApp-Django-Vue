function sendRequest(url,method,data){
	var r = axios({
		url : url,
		method : method ,
		data : data,
		xsrfCookieName : 'csrftoken',
		xsrfHeaderName : 'X-CSRFToken',
		headers : {
			'x-Requested-With':'XMLHttpRequest'
		}

	})
	return r
}


var app = new Vue({
	// delimiters : [ "[[","]]" ]
	el : '#app',
	data : {
		task : '',
		tasks : []
	},
	created(){
		var vm = this ;
		sendRequest('','get')
		.then(function(res){
			vm.tasks = res.data.tasks
		})
	},
	computed :{
		taskList(){
			function compare(a,b){
				if (a.completed > b.completed) {
					return 1
				}
				else if(a.completed < b.completed){
					return -1
				}
				else {
					return 0
				}
			}
			return this.tasks.sort(compare)
		}
	},
	methods : {
		createTask(){
			var vm = this;
			var formData = new FormData();
			formData.append('title',this.task);
			sendRequest('','post',formData)
			.then(function(res){
				vm.tasks.push(res.data.task);
				vm.task = ''
			})
		},
		completedTask(index){
			var vm = this;
			var id = this.tasks[index].id;
			sendRequest(''+id+'/completed/','post')
			.then(function(res){
				vm.tasks.splice(index,1);
				vm.tasks.push(res.data.task);
			})
		},
		deletedTask(index){
			var vm = this;
			var id = this.tasks[index].id;
			sendRequest(''+id+'/deleted/','post')
			.then(function(res){
				vm.tasks.splice(index,1)
			})	
		}
	}

})
