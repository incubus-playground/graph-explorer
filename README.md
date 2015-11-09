#Graph Explorer

##Top Level API

###Create/Destroy

```js

var gpExplorer = new GraphExplorer(container, data, options);
gpExplorer.destroy();

```
###Example of data format

```
{
    "elements": [
        {
            "group": {
                "elements": [
                    {
                        "element": {
                            "isIdentifier": true,
                            "type": "java.lang.Short",
                            "name": "CategoryID"
                        }
                    },
                    {
                        "element": {
                            "type": "java.lang.String",
                            "name": "CategoryName"
                        }
                    },
                    {
                        "element": {
                            "type": "java.lang.String",
                            "name": "Description"
                        }
                    },
                    {
                        "element": {
                            "name": "Picture"
                        }
                    }
                ],
                "name": "categories"
            }
        },
        {
            "group": {
                "elements": [
                    {
                        "element": {
                            "referenceTo": "public.customers.CustomerID",
                            "isIdentifier": true,
                            "type": "java.lang.String",
                            "name": "CustomerID"
                        }
                    },
                    {
                        "element": {
                            "isIdentifier": true,
                            "type": "java.lang.String",
                            "name": "CustomerTypeID"
                        }
                    }
                ],
                "name": "customercustomerdemo"
            }
        },
        {
            "group": {
                "elements": [
                    {
                        "element": {
                            "isIdentifier": true,
                            "type": "java.lang.String",
                            "name": "CustomerTypeID"
                        }
                    },
                    {
                        "element": {
                            "type": "java.lang.String",
                            "name": "CustomerDesc"
                        }
                    }
                ],
                "name": "customerdemographics"
            }
        },
        {
            "group": {
                "elements": [
                    {
                        "element": {
                            "isIdentifier": true,
                            "type": "java.lang.Short",
                            "name": "EmployeeID"
                        }
                    },
                    {
                        "element": {
                            "referenceTo": "public.territories.TerritoryID",
                            "isIdentifier": true,
                            "type": "java.lang.String",
                            "name": "TerritoryID"
                        }
                    }
                ],
                "name": "employeeterritories"
            }
        }
    ],
    "name": "public"
}
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
