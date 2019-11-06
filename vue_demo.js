var app = new Vue({
	el: '#app',
	data: {
		base_url: 'https://thefifthmoon.herokuapp.com',
		blogs: [],
		filtered_blogs: [],
		loaded_blog: {},
		display_post: false,
		inputs: {
			text: ''
		}
	},
	mounted() {
		axios
			.get(this.base_url + '/api/v1/blogs/')
			.then(response => {
				response.data.forEach(function(item,index){
					app.blogs.push(item);
				});
			});

		this.filtered_blogs = this.blogs;
	},
	methods: {
		load_blog: function(index) {
			this.loaded_blog = this.blogs[index];
			this.filtered_blogs = this.blogs;
			this.inputs.text = '';
			this.display_post = true;
		},
		search: function() {
			this.filtered_blogs = [];
			this.blogs.forEach(function(blog){
				if (blog.title.toLowerCase().includes(app.inputs.text.toLowerCase())|| 
					blog.tags.toLowerCase().includes(app.inputs.text.toLowerCase())) {
					app.filtered_blogs.push(blog);
				}
			});
		},
		loadtag: function(tag) {
			this.filtered_blogs = [];
			this.blogs.forEach(function(blog){
				if (blog.tags.toLowerCase().includes(tag)) {
					app.filtered_blogs.push(blog);
				}
			});
			this.inputs.text = '';
			this.display_post = false;
		}
	}
});