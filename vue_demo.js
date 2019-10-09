var app = new Vue({
	el: '#app',
	data: {
		base_url: 'http://www.thefifthmoon.xyz',
		blogs: []
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
	template: `
		<div class="container">
			<div v-for="blog in blogs">
				<div class="row">
					<div class="col-10">
						<div class="card">
						<div class="card-body">
						<div class="container">
						<div class="row">
						<div class="col-2">
							<a v-bind:href="base_url + '/blog/' + blog.slug_name"><img v-bind:src="base_url + '/static/images/random.png'" class="img-thumbnail img-fluid rounded float-left" style="margin-right: 1em;" alt="topic image"></a>
						</div><!--/col-2-->
						<div class="col-10">
							<h5 class="card-title"><a v-bind:href="base_url + '/blog/' + blog.slug_name">{{ blog.title }}</a> {{ prettyDate(blog.pub_date) }}</h5> 
							<p class="card-text"><span v-html="blog.body.slice(0,100)"></span> .....</p>	
						</div><!--/col-10-->
						</div><!--/row-->
						</div><!--/container-->
						</div><!--/card-body-->
						</div><!--/card-->			
					</div>
					<div class="col-2"></div>
				</div>
			</div>
		</div>
	`,
	methods: {
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
		}
	}
});