$(document).ready(function() {
	var i = 0;
	var root;
	var tree = d3.layout.tree().size([500, 600]);
	var diagonal = d3.svg.diagonal().projection(function(d) {
		return [d.y, d.x];
	});
	var canvas = d3.select("#cs-tree").append("svg:svg")
		.attr("width", 628)
		.attr("height", 480)
		.append("svg:g").attr("transform", "translate(" + 92 + ", -5)");

	d3.json("js/cs.json", function(projects) {
		root = projects;
		root.x0 = 300;
		root.y0 = 0;
		
		function toggleAll(d) {
			if (d.children) {
				d.children.forEach(toggleAll);
				toggle(d);
			}
		}
		
		root.children.forEach(toggleAll);
		toggle(root.children[2]);
		toggle(root.children[4]);
		update(root);
	});

	function update(source) {
		var duration = d3.event && d3.event.altKey ? 5000 : 500;
		var nodes = tree.nodes(root).reverse();
		
		nodes.forEach(function(d) { d.y = d.depth * 180; });
		var node = canvas.selectAll("g.node").data(nodes, function(d) {
			return d.id || (d.id = ++i);
		});
		var nodeEnter = node.enter().append("svg:g")
			.attr("class", "node")
			.attr("transform", function(d) {
				return "translate(" + source.y0 + "," + source.x0 + ")";
			}).on("click", function(d) {
				toggle(d); update(d);
			});
		nodeEnter.append("svg:circle").attr("r", 1e-8).style("fill", function(d) {
			return d._children ? "#70FA75" : "#FFFFFF";
		});
		nodeEnter.append('a')
			.attr('xlink:href', function(d) {
				return d.url;
			}).append("svg:text").attr("x", function(d) {
				return d.children || d._children ? -10 : 10;
			}).attr("dy", ".35em").attr("text-anchor", function(d) {
				return d.children || d._children ? "end" : "start";
			}).text(function(d) {
				return d.name;
			}).style("fill-opacity", 1e-8);
		nodeEnter.append("svg:title").text(function(d) {
			return d.description;
		});
		
		var nodeUpdate = node.transition().duration(duration).attr("transform", function(d) {
			return "translate(" + d.y + "," + d.x + ")";
		});
		nodeUpdate.select("circle").attr("r", 8).style("fill", function(d) {
			return d._children ? "#70FA75" : "#FFFFFF";
		});
		nodeUpdate.select("text").style("fill-opacity", 1);
		
		var nodeExit = node.exit().transition().duration(duration)
			.attr("transform", function(d) {
				return "translate(" + source.y + "," + source.x + ")";
			}).remove();
		nodeExit.select("circle").attr("r", 1e-8);
		nodeExit.select("text").style("fill-opacity", 1e-8);
		
		var link = canvas.selectAll("path.link").data(tree.links(nodes), function(d) {
			return d.target.id;
		});
		link.enter().insert("svg:path", "g")
			.attr("class", "link")
			.attr("d", function(d) {
				var o = {
					x: source.x0,
					y: source.y0
				};
				return diagonal({
					source: o,
					target: o
				});
			}).transition().duration(duration).attr("d", diagonal);
		link.transition().duration(duration).attr("d", diagonal);
		link.exit().transition().duration(duration)
			.attr("d", function(d) {
				var o = {
					x: source.x,
					y: source.y
				};
				return diagonal({
					source: o,
					target: o
				});
			}).remove();
		
		nodes.forEach(function(d) {
			d.x0 = d.x;
			d.y0 = d.y;
		});
	}

	function toggle(d) {
		if (d.children) {
			d._children = d.children;
			d.children = null;
		}
		else {
			d.children = d._children;
			d._children = null;
		}
	}
});
