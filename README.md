#Graph Explorer

##Top Level API

```js

var gpExplorer = new GraphExplorer(container, data, options);


gpExplorer.destroy();

```

##Node manipulations

```js

//Node operations

gpExplorer
	.addNode({
			id : "/product",
			label: "Product",
			screenPosition : {
				x : 10,
				y : 8
		} 	
	})
	.addNode({ ... })
	.removeNode(nodeId);


```

##Edges manipulations 

```js

gpExplorer
	.addEdge({
		from: nodeId,
		to: nodeId
	})
	.removeEdge({
		from: nodeId,
		to:	  nodeId 
	});


```