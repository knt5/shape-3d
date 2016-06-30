const glob = require('glob');
const path = require('path');
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const gulp = require('gulp');
const plumber = require('gulp-plumber');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const config = require('./config');

module.exports = (done) => {
	let entries = glob.sync(config.entries);
	let name;
	let count = 0;
	
	for (entry of entries) {
		
		//-------------------------------
		// Base name
		name = path.basename(path.dirname(entry));
		
		//-------------------------------
		// Browserify
		((name, entry) => {
			browserify({
				entries: entry,
				extensions: ['.js'],
				paths: ['./src/js']
			})
			.transform(babelify, {
				presets: ['es2015'],
				plugins: [
					'transform-exponentiation-operator'
				]
			})
			.bundle()
			.on('error', function (error) {
				console.error(error.message);
				this.emit('end');
			})
			.pipe(source(name + '.js'))
			.pipe(gulp.dest(config.browserify.dest))
			.on('end', () => {
				
				//-------------------------------
				// Minify
				gulp.src(config.browserify.dest + '*.js')
				.pipe(plumber())
				.pipe(uglify())
				.pipe(rename(name + '.js'))
				.pipe(gulp.dest(config.minify.dest))
				.on('end', () => {
					
					//-------------------------------
					// Check done or not
					count ++;
					if (count >= entries.length) {
						done();
					}
				});
			});
			
		})(name, entry);
	}
};
