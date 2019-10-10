var app = new Vue({
	el: '#app',
	data: {
		base_url: 'https://thefifthmoon.herokuapp.com',
		blogs: [],
		loaded_blog: {},
		display_post: false
	},
	mounted() {
		axios
			.get(this.base_url + '/api/allblogs/')
			.then(response => {
				response.data.forEach(function(item,index){
					app.blogs.push(item.fields);
				});
			});
	},
	methods: {
		load_blog: function(index) {
			this.loaded_blog = this.blogs[index];
			this.display_post = true;
		},
		prettyDate: function(time_string) {
			return this.getMonth(time_string.slice(5,7)) + ' ' +
					time_string.slice(8,10) + ', ' +
					time_string.slice(0,4);
		},
		getMonth: function(month_string) {
			switch(month_string) {
				case '01': return 'Jan';
				case '02': return 'Feb';
				case '03': return 'Mar';
				case '04': return 'Apr';
				case '05': return 'May';
				case '06': return 'Jun';
				case '07': return 'Jul';
				case '08': return 'Aug';
				case '09': return 'Sep';
				case '10': return 'Oct';
				case '11': return 'Nov';
				case '12': return 'Dec';
				default: return 'not a valid month';
			}
		},
		getImage: function(tags) {
			if (tags.includes('software engineering') || tags.includes('algorithms')) {
				return 'cs_bg.jpg';
			}
			else if(tags.includes('cpp')){
				return 'cpp_logo.png';			
			}
			else if(tags.includes('python')){
				return 'python.png';			
			}
			else if(tags.includes('javascript')){
				return 'js.png';			
			}
			else if(tags.includes('book') || tags.includes('books')){
				return 'book.png';			
			}
			else if(tags.includes('cpp')){
				return 'cpp_logo.png';			
			} 
			else {
				return 'random.png';
			}
		}
	}
});