#Graph Explorer

##Top Level API

###Create/Destroy

```javascript
var gpExplorer = new GraphExplorer(settings);
gpExplorer.destroy();
```

###Example

When you create new GraphExplorer you put settings like variable.

####Expample of settings

```javascript
{
    container: container,
    url: 'http://localhost:63342/graph-explorer/example/metadata.json',
    showAll: false,
    height: '500px',
    width: '100%'
}
```


container - it's block where your graph will be created

For example:
```javascript
var container = document.getElementById('container');
```

url - it's url to your data. Example of data format see above.


showAll - if ```true```, you show all node and edges from your data, if ```false``` you get white board for your graph.

height and width - it's size of you graph block


####Expample of data format
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

```javascript
var node = gpExplorer.showNode(nodeId); 
var childNodes = gpExplorer.expandNode(nodeId);
gpExplorer.collapseNode(nodeId);
```

###Get sub DataSet

```javascript
var data = gpExplorer.getVisibleDataSet();
```

##How to build

```sh
& npm install
& npm run build
```


##Node manipulations

```javascript
//Node operations
gpExplorer
	.showNode(nodeId, xPosition, yPosition);
```
