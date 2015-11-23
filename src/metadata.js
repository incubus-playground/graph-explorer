/**
 * Created by valeriy.abornyev on 11/9/2015.
 */
    define(function() {
        var metadata = {
            "elements": [
                {
                    "group": {
                        "name": "information_schema"
                    }
                },
                {
                    "group": {
                        "name": "pg_catalog"
                    }
                },
                {
                    "group": {
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
                                                "type": "java.lang.String",
                                                "name": "CustomerID"
                                            }
                                        },
                                        {
                                            "element": {
                                                "type": "java.lang.String",
                                                "name": "CompanyName"
                                            }
                                        },
                                        {
                                            "element": {
                                                "type": "java.lang.String",
                                                "name": "ContactName"
                                            }
                                        },
                                        {
                                            "element": {
                                                "type": "java.lang.String",
                                                "name": "ContactTitle"
                                            }
                                        },
                                        {
                                            "element": {
                                                "type": "java.lang.String",
                                                "name": "Address"
                                            }
                                        },
                                        {
                                            "element": {
                                                "type": "java.lang.String",
                                                "name": "City"
                                            }
                                        },
                                        {
                                            "element": {
                                                "type": "java.lang.String",
                                                "name": "Region"
                                            }
                                        },
                                        {
                                            "element": {
                                                "type": "java.lang.String",
                                                "name": "PostalCode"
                                            }
                                        },
                                        {
                                            "element": {
                                                "type": "java.lang.String",
                                                "name": "Country"
                                            }
                                        },
                                        {
                                            "element": {
                                                "type": "java.lang.String",
                                                "name": "Phone"
                                            }
                                        },
                                        {
                                            "element": {
                                                "type": "java.lang.String",
                                                "name": "Fax"
                                            }
                                        }
                                    ],
                                    "name": "customers"
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
                                                "type": "java.lang.String",
                                                "name": "LastName"
                                            }
                                        },
                                        {
                                            "element": {
                                                "type": "java.lang.String",
                                                "name": "FirstName"
                                            }
                                        },
                                        {
                                            "element": {
                                                "type": "java.lang.String",
                                                "name": "Title"
                                            }
                                        },
                                        {
                                            "element": {
                                                "type": "java.lang.String",
                                                "name": "TitleOfCourtesy"
                                            }
                                        },
                                        {
                                            "element": {
                                                "type": "java.util.Date",
                                                "name": "BirthDate"
                                            }
                                        },
                                        {
                                            "element": {
                                                "type": "java.util.Date",
                                                "name": "HireDate"
                                            }
                                        },
                                        {
                                            "element": {
                                                "type": "java.lang.String",
                                                "name": "Address"
                                            }
                                        },
                                        {
                                            "element": {
                                                "type": "java.lang.String",
                                                "name": "City"
                                            }
                                        },
                                        {
                                            "element": {
                                                "type": "java.lang.String",
                                                "name": "Region"
                                            }
                                        },
                                        {
                                            "element": {
                                                "type": "java.lang.String",
                                                "name": "PostalCode"
                                            }
                                        },
                                        {
                                            "element": {
                                                "type": "java.lang.String",
                                                "name": "Country"
                                            }
                                        },
                                        {
                                            "element": {
                                                "type": "java.lang.String",
                                                "name": "HomePhone"
                                            }
                                        },
                                        {
                                            "element": {
                                                "type": "java.lang.String",
                                                "name": "Extension"
                                            }
                                        },
                                        {
                                            "element": {
                                                "name": "Photo"
                                            }
                                        },
                                        {
                                            "element": {
                                                "type": "java.lang.String",
                                                "name": "Notes"
                                            }
                                        },
                                        {
                                            "element": {
                                                "type": "java.lang.Short",
                                                "name": "ReportsTo"
                                            }
                                        },
                                        {
                                            "element": {
                                                "type": "java.lang.String",
                                                "name": "PhotoPath"
                                            }
                                        }
                                    ],
                                    "name": "employees"
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
                            },
                            {
                                "group": {
                                    "elements": [
                                        {
                                            "element": {
                                                "referenceTo": "public.orders.OrderID",
                                                "isIdentifier": true,
                                                "type": "java.lang.Short",
                                                "name": "OrderID"
                                            }
                                        },
                                        {
                                            "element": {
                                                "referenceTo": "public.products.ProductID",
                                                "isIdentifier": true,
                                                "type": "java.lang.Short",
                                                "name": "ProductID"
                                            }
                                        },
                                        {
                                            "element": {
                                                "type": "java.math.Double",
                                                "name": "UnitPrice"
                                            }
                                        },
                                        {
                                            "element": {
                                                "type": "java.lang.Short",
                                                "name": "Quantity"
                                            }
                                        },
                                        {
                                            "element": {
                                                "type": "java.math.Double",
                                                "name": "Discount"
                                            }
                                        }
                                    ],
                                    "name": "order_details"
                                }
                            },
                            {
                                "group": {
                                    "elements": [
                                        {
                                            "element": {
                                                "isIdentifier": true,
                                                "type": "java.lang.Short",
                                                "name": "OrderID"
                                            }
                                        },
                                        {
                                            "element": {
                                                "referenceTo": "public.customers.CustomerID",
                                                "type": "java.lang.String",
                                                "name": "CustomerID"
                                            }
                                        },
                                        {
                                            "element": {
                                                "referenceTo": "public.employees.EmployeeID",
                                                "type": "java.lang.Short",
                                                "name": "EmployeeID"
                                            }
                                        },
                                        {
                                            "element": {
                                                "type": "java.util.Date",
                                                "name": "OrderDate"
                                            }
                                        },
                                        {
                                            "element": {
                                                "type": "java.util.Date",
                                                "name": "RequiredDate"
                                            }
                                        },
                                        {
                                            "element": {
                                                "type": "java.util.Date",
                                                "name": "ShippedDate"
                                            }
                                        },
                                        {
                                            "element": {
                                                "type": "java.lang.Short",
                                                "name": "ShipVia"
                                            }
                                        },
                                        {
                                            "element": {
                                                "type": "java.math.Double",
                                                "name": "Freight"
                                            }
                                        },
                                        {
                                            "element": {
                                                "type": "java.lang.String",
                                                "name": "ShipName"
                                            }
                                        },
                                        {
                                            "element": {
                                                "type": "java.lang.String",
                                                "name": "ShipAddress"
                                            }
                                        },
                                        {
                                            "element": {
                                                "type": "java.lang.String",
                                                "name": "ShipCity"
                                            }
                                        },
                                        {
                                            "element": {
                                                "type": "java.lang.String",
                                                "name": "ShipRegion"
                                            }
                                        },
                                        {
                                            "element": {
                                                "type": "java.lang.String",
                                                "name": "ShipPostalCode"
                                            }
                                        },
                                        {
                                            "element": {
                                                "type": "java.lang.String",
                                                "name": "ShipCountry"
                                            }
                                        }
                                    ],
                                    "name": "orders"
                                }
                            },
                            {
                                "group": {
                                    "elements": [
                                        {
                                            "element": {
                                                "isIdentifier": true,
                                                "type": "java.lang.Short",
                                                "name": "ProductID"
                                            }
                                        },
                                        {
                                            "element": {
                                                "type": "java.lang.String",
                                                "name": "ProductName"
                                            }
                                        },
                                        {
                                            "element": {
                                                "referenceTo": "public.suppliers.SupplierID",
                                                "type": "java.lang.Short",
                                                "name": "SupplierID"
                                            }
                                        },
                                        {
                                            "element": {
                                                "referenceTo": "public.categories.CategoryID",
                                                "type": "java.lang.Short",
                                                "name": "CategoryID"
                                            }
                                        },
                                        {
                                            "element": {
                                                "type": "java.lang.String",
                                                "name": "QuantityPerUnit"
                                            }
                                        },
                                        {
                                            "element": {
                                                "type": "java.math.Double",
                                                "name": "UnitPrice"
                                            }
                                        },
                                        {
                                            "element": {
                                                "type": "java.lang.Short",
                                                "name": "UnitsInStock"
                                            }
                                        },
                                        {
                                            "element": {
                                                "type": "java.lang.Short",
                                                "name": "UnitsOnOrder"
                                            }
                                        },
                                        {
                                            "element": {
                                                "type": "java.lang.Short",
                                                "name": "ReorderLevel"
                                            }
                                        },
                                        {
                                            "element": {
                                                "type": "java.lang.Integer",
                                                "name": "Discontinued"
                                            }
                                        }
                                    ],
                                    "name": "products"
                                }
                            },
                            {
                                "group": {
                                    "elements": [
                                        {
                                            "element": {
                                                "isIdentifier": true,
                                                "type": "java.lang.Short",
                                                "name": "RegionID"
                                            }
                                        },
                                        {
                                            "element": {
                                                "type": "java.lang.String",
                                                "name": "RegionDescription"
                                            }
                                        }
                                    ],
                                    "name": "region"
                                }
                            },
                            {
                                "group": {
                                    "elements": [
                                        {
                                            "element": {
                                                "isIdentifier": true,
                                                "type": "java.lang.Short",
                                                "name": "ShipperID"
                                            }
                                        },
                                        {
                                            "element": {
                                                "type": "java.lang.String",
                                                "name": "CompanyName"
                                            }
                                        },
                                        {
                                            "element": {
                                                "type": "java.lang.String",
                                                "name": "Phone"
                                            }
                                        }
                                    ],
                                    "name": "shippers"
                                }
                            },
                            {
                                "group": {
                                    "elements": [
                                        {
                                            "element": {
                                                "isIdentifier": true,
                                                "type": "java.lang.Short",
                                                "name": "ShipperID"
                                            }
                                        },
                                        {
                                            "element": {
                                                "type": "java.lang.String",
                                                "name": "CompanyName"
                                            }
                                        },
                                        {
                                            "element": {
                                                "type": "java.lang.String",
                                                "name": "Phone"
                                            }
                                        }
                                    ],
                                    "name": "shippers_tmp"
                                }
                            },
                            {
                                "group": {
                                    "elements": [
                                        {
                                            "element": {
                                                "isIdentifier": true,
                                                "type": "java.lang.Short",
                                                "name": "SupplierID"
                                            }
                                        },
                                        {
                                            "element": {
                                                "type": "java.lang.String",
                                                "name": "CompanyName"
                                            }
                                        },
                                        {
                                            "element": {
                                                "type": "java.lang.String",
                                                "name": "ContactName"
                                            }
                                        },
                                        {
                                            "element": {
                                                "type": "java.lang.String",
                                                "name": "ContactTitle"
                                            }
                                        },
                                        {
                                            "element": {
                                                "type": "java.lang.String",
                                                "name": "Address"
                                            }
                                        },
                                        {
                                            "element": {
                                                "type": "java.lang.String",
                                                "name": "City"
                                            }
                                        },
                                        {
                                            "element": {
                                                "type": "java.lang.String",
                                                "name": "Region"
                                            }
                                        },
                                        {
                                            "element": {
                                                "type": "java.lang.String",
                                                "name": "PostalCode"
                                            }
                                        },
                                        {
                                            "element": {
                                                "type": "java.lang.String",
                                                "name": "Country"
                                            }
                                        },
                                        {
                                            "element": {
                                                "type": "java.lang.String",
                                                "name": "Phone"
                                            }
                                        },
                                        {
                                            "element": {
                                                "type": "java.lang.String",
                                                "name": "Fax"
                                            }
                                        },
                                        {
                                            "element": {
                                                "type": "java.lang.String",
                                                "name": "HomePage"
                                            }
                                        }
                                    ],
                                    "name": "suppliers"
                                }
                            },
                            {
                                "group": {
                                    "elements": [
                                        {
                                            "element": {
                                                "isIdentifier": true,
                                                "type": "java.lang.String",
                                                "name": "TerritoryID"
                                            }
                                        },
                                        {
                                            "element": {
                                                "type": "java.lang.String",
                                                "name": "TerritoryDescription"
                                            }
                                        },
                                        {
                                            "element": {
                                                "referenceTo": "public.region.RegionID",
                                                "type": "java.lang.Short",
                                                "name": "RegionID"
                                            }
                                        }
                                    ],
                                    "name": "territories"
                                }
                            },
                            {
                                "group": {
                                    "elements": [
                                        {
                                            "element": {
                                                "type": "java.lang.Short",
                                                "name": "StateID"
                                            }
                                        },
                                        {
                                            "element": {
                                                "type": "java.lang.String",
                                                "name": "StateName"
                                            }
                                        },
                                        {
                                            "element": {
                                                "type": "java.lang.String",
                                                "name": "StateAbbr"
                                            }
                                        },
                                        {
                                            "element": {
                                                "type": "java.lang.String",
                                                "name": "StateRegion"
                                            }
                                        }
                                    ],
                                    "name": "usstates"
                                }
                            }
                        ],
                        "name": "public"
                    }
                }
            ],
            "name": "root"
        };

        return metadata;
    });
