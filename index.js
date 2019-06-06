var fs = require('fs');
var co = require('co');
var moment = require('moment');

function readFilePromise(path) {
	return new Promise(function (resolve, reject) {
		fs.readFile(path, {
			encoding: 'utf8'
		}, function (err, data) {
			if (err) {
				reject(err);
			}
			resolve(data);
		})
	});
}

co(function*() {
	// var data = yield readFilePromise('./data.json');
	// var text = yield readFilePromise('./text.txt');
	// return [data, text];

	var values = yield [
		readFilePromise('./data.json'),
		readFilePromise('./text.txt')
	];
	return values;
}).then(function (values) {
	console.log(values);
}).catch (function (error) {
	console.log(error);
});

var readFiles = co.wrap(function*(files) {
	var values = yield files.map(function (file) {
		return readFilePromise(file);
	});
	return values;
});

readFiles(['data.json', 'text.txt'])
.then(function (values) {
	console.log(values);
}).catch(function (error) {
	console.log(error);
});

async function run() {
	var data = await readFilePromise('./data.json');
	return data;
};

run().then(function (data) {
	console.log(data);
});

function countFrom(a, b) {
	return new Promise(function (resolve, reject) {
		var count = setInterval(function () {
			console.log(a);
			a++;
			if (a > b) {
				clearInterval(count);
				resolve(true);
			}
		}, 10);
	});
}

countFrom(1, 10).then(function () {
	console.log('Done');
});

var now = moment('2019-06-05 18:13');
console.log(now.format('DD/MM/YYYY HH:mm'));
console.log(now.fromNow());

console.log('Modified');