#Graph Explorer

##Top Level API

###Create/Destroy

```js

var gpExplorer = new GraphExplorer(container, data, options);
gpExplorer.destroy();

```
###Example of data format

```

```


###Discovery

```js

var node = gpExplorer.showNode(nodeId); 

var childNodes = gpExplorer.expandNode(nodeId);


gpExplorer.collapseNode(nodeId);


```

###Get sub DataSet

var data = gpExplorer.getVisibleDataSet();








///not sure that we wanna 


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

##E
