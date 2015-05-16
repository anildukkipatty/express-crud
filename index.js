(function () {
	var express = require('express'),
		_ = require('lodash'),
		router = express.Router();
		router.model = null;
		
		function getTotalPages(count, perPage) {
			var res = count/perPage;
			var inte = parseInt(res.toString());
			if (res > inte) {
				return inte+1;	
			}
			return inte;
		}
		
		function paginate (req, res, next, perPage) {
			var query = query = router.model.find().skip((req.query.page - 1) * perPage).limit(perPage);
			query.exec(function (err, objs) {
				if (err) next(err);
				router.model.count({}, function (err, count) {
					if (err) next (err);
					res.send({totalPages: getTotalPages(count, perPage), currentPage: req.query.page, data: objs});
				});
			});
		}
		
		router.get('/', function (req, res, next) {
			var perPage = req.query.perPage || 10;
			if (req.query.page > 0) {
				paginate(req, res, next, perPage);
				return;
			} else {
				router.model.find().exec(function (err, objects) {
					if (err) next(err);
					res.send(objects);
				});
			}
		});
		
		router.post('/', function (req, res, next) {
			var object = new router.model(req.body);
			object.save(function (err, obj) {
				if (err) next(err);
				res.send(obj);
			});
		});
		
		router.get('/:id', function (req, res, next) {
			router.model.findOne({_id: req.params.id}, function (err, object) {
				if (err) next(err);
				res.send(object);
			});
		});

		router.put('/:id', function (req, res, next) {
			router.model.findOne({_id: req.params.id}, function (err, obj) {
				if (err) next(err);
				_.each(req.body, function (value, key) {
					obj[key] = value;
				});
				obj.save(function (err, object) {
					if (err) next(err);
					res.send(object);
				});
			});
		});
		
		router.delete('/:id', function (req, res, next) {
			router.model.remove({_id: req.params.id}, function (err, response) {
				if (err) next(err);
				res.send(response);
			});
		});
		
		module.exports = router;
}) ();
