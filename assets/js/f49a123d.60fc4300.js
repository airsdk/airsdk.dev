"use strict";(self.webpackChunkairsdk_dev=self.webpackChunkairsdk_dev||[]).push([[22727],{3905:(t,a,e)=>{e.d(a,{Zo:()=>m,kt:()=>k});var n=e(67294);function r(t,a,e){return a in t?Object.defineProperty(t,a,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[a]=e,t}function l(t,a){var e=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);a&&(n=n.filter((function(a){return Object.getOwnPropertyDescriptor(t,a).enumerable}))),e.push.apply(e,n)}return e}function d(t){for(var a=1;a<arguments.length;a++){var e=null!=arguments[a]?arguments[a]:{};a%2?l(Object(e),!0).forEach((function(a){r(t,a,e[a])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(e)):l(Object(e)).forEach((function(a){Object.defineProperty(t,a,Object.getOwnPropertyDescriptor(e,a))}))}return t}function i(t,a){if(null==t)return{};var e,n,r=function(t,a){if(null==t)return{};var e,n,r={},l=Object.keys(t);for(n=0;n<l.length;n++)e=l[n],a.indexOf(e)>=0||(r[e]=t[e]);return r}(t,a);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(t);for(n=0;n<l.length;n++)e=l[n],a.indexOf(e)>=0||Object.prototype.propertyIsEnumerable.call(t,e)&&(r[e]=t[e])}return r}var o=n.createContext({}),p=function(t){var a=n.useContext(o),e=a;return t&&(e="function"==typeof t?t(a):d(d({},a),t)),e},m=function(t){var a=p(t.components);return n.createElement(o.Provider,{value:a},t.children)},s="mdxType",u={inlineCode:"code",wrapper:function(t){var a=t.children;return n.createElement(n.Fragment,{},a)}},N=n.forwardRef((function(t,a){var e=t.components,r=t.mdxType,l=t.originalType,o=t.parentName,m=i(t,["components","mdxType","originalType","parentName"]),s=p(e),N=r,k=s["".concat(o,".").concat(N)]||s[N]||u[N]||l;return e?n.createElement(k,d(d({ref:a},m),{},{components:e})):n.createElement(k,d({ref:a},m))}));function k(t,a){var e=arguments,r=a&&a.mdxType;if("string"==typeof t||r){var l=e.length,d=new Array(l);d[0]=N;var i={};for(var o in a)hasOwnProperty.call(a,o)&&(i[o]=a[o]);i.originalType=t,i[s]="string"==typeof t?t:r,d[1]=i;for(var p=2;p<l;p++)d[p]=e[p];return n.createElement.apply(null,d)}return n.createElement.apply(null,e)}N.displayName="MDXCreateElement"},69064:(t,a,e)=>{e.r(a),e.d(a,{assets:()=>o,contentTitle:()=>d,default:()=>u,frontMatter:()=>l,metadata:()=>i,toc:()=>p});var n=e(87462),r=(e(67294),e(3905));const l={sidebar_position:3},d="SQL error detail messages, ids, and arguments",i={unversionedId:"development/appendixes/sql-support-in-local-databases/sql-error-detail-messages-ids-and-arguments",id:"development/appendixes/sql-support-in-local-databases/sql-error-detail-messages-ids-and-arguments",title:"SQL error detail messages, ids, and arguments",description:"The SQLError class represents various errors that can occur while working with",source:"@site/docs/development/appendixes/sql-support-in-local-databases/sql-error-detail-messages-ids-and-arguments.md",sourceDirName:"development/appendixes/sql-support-in-local-databases",slug:"/development/appendixes/sql-support-in-local-databases/sql-error-detail-messages-ids-and-arguments",permalink:"/docs/development/appendixes/sql-support-in-local-databases/sql-error-detail-messages-ids-and-arguments",draft:!1,editUrl:"https://github.com/airsdk/airsdk.dev/edit/main/docs/development/appendixes/sql-support-in-local-databases/sql-error-detail-messages-ids-and-arguments.md",tags:[],version:"current",sidebarPosition:3,frontMatter:{sidebar_position:3},sidebar:"mainSidebar",previous:{title:"Data type support",permalink:"/docs/development/appendixes/sql-support-in-local-databases/data-type-support"},next:{title:"Adobe Graphics Assembly Language (AGAL)",permalink:"/docs/development/appendixes/adobe-graphics-assembly-language-agal/"}},o={},p=[],m={toc:p},s="wrapper";function u(t){let{components:a,...e}=t;return(0,r.kt)(s,(0,n.Z)({},m,e,{components:a,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"sql-error-detail-messages-ids-and-arguments"},"SQL error detail messages, ids, and arguments"),(0,r.kt)("p",null,"The SQLError class represents various errors that can occur while working with\nan Adobe AIR local SQL database. For any given exception, the SQLError instance\nhas a ",(0,r.kt)("inlineCode",{parentName:"p"},"details")," property containing an English error message. In addition, each\nerror message has an associated unique identifier that is available in the\nSQLError object's ",(0,r.kt)("inlineCode",{parentName:"p"},"detailID")," property. Using the ",(0,r.kt)("inlineCode",{parentName:"p"},"detailID")," property, an\napplication can identify the specific details error message. The application can\nprovide alternate text for the end user in the language of his or her locale.\nThe argument values in the ",(0,r.kt)("inlineCode",{parentName:"p"},"detailArguments")," array can be substituted in the\nappropriate position in the error message string. This is useful for\napplications that display the ",(0,r.kt)("inlineCode",{parentName:"p"},"details")," property error message for an error\ndirectly to end users in a specific locale."),(0,r.kt)("p",null,"The following table contains a list of the ",(0,r.kt)("inlineCode",{parentName:"p"},"detailID")," values and the associated\nEnglish error message text. Placeholder text in the messages indicates where\n",(0,r.kt)("inlineCode",{parentName:"p"},"detailArguments")," values are substituted in by the runtime. This list can be\nused as a source for localizing the error messages that can occur in SQL\ndatabase operations."),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null}),(0,r.kt)("th",{parentName:"tr",align:null}))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"SQLError detailID"),(0,r.kt)("td",{parentName:"tr",align:null},"English error detail message and parameters")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"1001"),(0,r.kt)("td",{parentName:"tr",align:null},"Connection closed.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"1102"),(0,r.kt)("td",{parentName:"tr",align:null},"Database must be open to perform this operation.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"1003"),(0,r.kt)("td",{parentName:"tr",align:null},"%s ","[",",","|","and %s","]"," parameter name(s) found in parameters property but not in the SQL specified.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"1004"),(0,r.kt)("td",{parentName:"tr",align:null},"Mismatch in parameter count. Found %d in SQL specified and %d value(s) set in parameters property. Expecting values for %s ","[",",","|","and %s","]",".")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"1005"),(0,r.kt)("td",{parentName:"tr",align:null},"Auto compact could not be turned on.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"1006"),(0,r.kt)("td",{parentName:"tr",align:null},"The pageSize value could not be set.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"1007"),(0,r.kt)("td",{parentName:"tr",align:null},"The schema object with name '%s' of type '%s' in database '%s' was not found.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"1008"),(0,r.kt)("td",{parentName:"tr",align:null},"The schema object with name '%s' in database '%s' was not found.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"1009"),(0,r.kt)("td",{parentName:"tr",align:null},"No schema objects with type '%s' in database '%s' were found.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"1010"),(0,r.kt)("td",{parentName:"tr",align:null},"No schema objects in database '%s' were found.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"2001"),(0,r.kt)("td",{parentName:"tr",align:null},"Parser stack overflow.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"2002"),(0,r.kt)("td",{parentName:"tr",align:null},"Too many arguments on function '%s'")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"2003"),(0,r.kt)("td",{parentName:"tr",align:null},"near '%s': syntax error")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"2004"),(0,r.kt)("td",{parentName:"tr",align:null},"there is already another table or index with this name: '%s'")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"2005"),(0,r.kt)("td",{parentName:"tr",align:null},"PRAGMA is not allowed in SQL.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"2006"),(0,r.kt)("td",{parentName:"tr",align:null},"Not a writable directory.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"2007"),(0,r.kt)("td",{parentName:"tr",align:null},"Unknown or unsupported join type: '%s %s %s'")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"2008"),(0,r.kt)("td",{parentName:"tr",align:null},"RIGHT and FULL OUTER JOINs are not currently supported.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"2009"),(0,r.kt)("td",{parentName:"tr",align:null},"A NATURAL join may not have an ON or USING clause.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"2010"),(0,r.kt)("td",{parentName:"tr",align:null},"Cannot have both ON and USING clauses in the same join.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"2011"),(0,r.kt)("td",{parentName:"tr",align:null},"Cannot join using column '%s' - column not present in both tables.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"2012"),(0,r.kt)("td",{parentName:"tr",align:null},"Only a single result allowed for a SELECT that is part of an expression.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"2013"),(0,r.kt)("td",{parentName:"tr",align:null},"No such table: '","[","%s.","]","%s'")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"2014"),(0,r.kt)("td",{parentName:"tr",align:null},"No tables specified.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"2015"),(0,r.kt)("td",{parentName:"tr",align:null},"Too many columns in result set","|","too many columns on '%s'.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"2016"),(0,r.kt)("td",{parentName:"tr",align:null},"%s ORDER","|","GROUP BY term out of range - should be between 1 and %d")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"2017"),(0,r.kt)("td",{parentName:"tr",align:null},"Too many terms in ORDER BY clause.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"2018"),(0,r.kt)("td",{parentName:"tr",align:null},"%s ORDER BY term out of range - should be between 1 and %d.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"2019"),(0,r.kt)("td",{parentName:"tr",align:null},"%r ORDER BY term does not match any column in the result set.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"2020"),(0,r.kt)("td",{parentName:"tr",align:null},"ORDER BY clause should come after '%s' not before.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"2021"),(0,r.kt)("td",{parentName:"tr",align:null},"LIMIT clause should come after '%s' not before.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"2022"),(0,r.kt)("td",{parentName:"tr",align:null},"SELECTs to the left and right of '%s' do not have the same number of result columns.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"2023"),(0,r.kt)("td",{parentName:"tr",align:null},"A GROUP BY clause is required before HAVING.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"2024"),(0,r.kt)("td",{parentName:"tr",align:null},"Aggregate functions are not allowed in the GROUP BY clause.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"2025"),(0,r.kt)("td",{parentName:"tr",align:null},"DISTINCT in aggregate must be followed by an expression.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"2026"),(0,r.kt)("td",{parentName:"tr",align:null},"Too many terms in compound SELECT.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"2027"),(0,r.kt)("td",{parentName:"tr",align:null},"Too many terms in ORDER","|","GROUP BY clause")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"2028"),(0,r.kt)("td",{parentName:"tr",align:null},"Temporary trigger may not have qualified name")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"2030"),(0,r.kt)("td",{parentName:"tr",align:null},"Trigger '%s' already exists")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"2032"),(0,r.kt)("td",{parentName:"tr",align:null},"Cannot create BEFORE","|","AFTER trigger on view: '%s'.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"2033"),(0,r.kt)("td",{parentName:"tr",align:null},"Cannot create INSTEAD OF trigger on table: '%s'.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"2034"),(0,r.kt)("td",{parentName:"tr",align:null},"No such trigger: '%s'")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"2035"),(0,r.kt)("td",{parentName:"tr",align:null},"Recursive triggers not supported ('%s').")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"2036"),(0,r.kt)("td",{parentName:"tr",align:null},"No such column: %s","[",".%s","[",".%s","]","]")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"2037"),(0,r.kt)("td",{parentName:"tr",align:null},"VACUUM is not allowed from SQL.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"2043"),(0,r.kt)("td",{parentName:"tr",align:null},"Table '%s': indexing function returned an invalid plan.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"2044"),(0,r.kt)("td",{parentName:"tr",align:null},"At most %d tables in a join.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"2046"),(0,r.kt)("td",{parentName:"tr",align:null},"Cannot add a PRIMARY KEY column.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"2047"),(0,r.kt)("td",{parentName:"tr",align:null},"Cannot add a UNIQUE column.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"2048"),(0,r.kt)("td",{parentName:"tr",align:null},"Cannot add a NOT NULL column with default value NULL.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"2049"),(0,r.kt)("td",{parentName:"tr",align:null},"Cannot add a column with non-constant default.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"2050"),(0,r.kt)("td",{parentName:"tr",align:null},"Cannot add a column to a view.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"2051"),(0,r.kt)("td",{parentName:"tr",align:null},"ANALYZE is not allowed in SQL.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"2052"),(0,r.kt)("td",{parentName:"tr",align:null},"Invalid name: '%s'")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"2053"),(0,r.kt)("td",{parentName:"tr",align:null},"ATTACH is not allowed from SQL.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"2054"),(0,r.kt)("td",{parentName:"tr",align:null},"%s '%s' cannot reference objects in database '%s'")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"2055"),(0,r.kt)("td",{parentName:"tr",align:null},"Access to '","[","%s.","]","%s.%s' is prohibited.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"2056"),(0,r.kt)("td",{parentName:"tr",align:null},"Not authorized.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"2058"),(0,r.kt)("td",{parentName:"tr",align:null},"No such view: '","[","%s.","]","%s'")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"2060"),(0,r.kt)("td",{parentName:"tr",align:null},"Temporary table name must be unqualified.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"2061"),(0,r.kt)("td",{parentName:"tr",align:null},"Table '%s' already exists.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"2062"),(0,r.kt)("td",{parentName:"tr",align:null},"There is already an index named: '%s'")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"2064"),(0,r.kt)("td",{parentName:"tr",align:null},"Duplicate column name: '%s'")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"2065"),(0,r.kt)("td",{parentName:"tr",align:null},"Table '%s' has more than one primary key.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"2066"),(0,r.kt)("td",{parentName:"tr",align:null},"AUTOINCREMENT is only allowed on an INTEGER PRIMARY KEY")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"2067"),(0,r.kt)("td",{parentName:"tr",align:null},"No such collation sequence: '%s'")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"2068"),(0,r.kt)("td",{parentName:"tr",align:null},"Parameters are not allowed in views.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"2069"),(0,r.kt)("td",{parentName:"tr",align:null},"View '%s' is circularly defined.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"2070"),(0,r.kt)("td",{parentName:"tr",align:null},"Table '%s' may not be dropped.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"2071"),(0,r.kt)("td",{parentName:"tr",align:null},"Use DROP VIEW to delete view '%s'")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"2072"),(0,r.kt)("td",{parentName:"tr",align:null},"Use DROP TABLE to delete table '%s'")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"2073"),(0,r.kt)("td",{parentName:"tr",align:null},"Foreign key on '%s' should reference only one column of table '%s'")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"2074"),(0,r.kt)("td",{parentName:"tr",align:null},"Number of columns in foreign key does not match the number of columns in the referenced table.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"2075"),(0,r.kt)("td",{parentName:"tr",align:null},"Unknown column '%s' in foreign key definition.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"2076"),(0,r.kt)("td",{parentName:"tr",align:null},"Table '%s' may not be indexed.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"2077"),(0,r.kt)("td",{parentName:"tr",align:null},"Views may not be indexed.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"2080"),(0,r.kt)("td",{parentName:"tr",align:null},"Conflicting ON CONFLICT clauses specified.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"2081"),(0,r.kt)("td",{parentName:"tr",align:null},"No such index: '%s'")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"2082"),(0,r.kt)("td",{parentName:"tr",align:null},"Index associated with UNIQUE or PRIMARY KEY constraint cannot be dropped.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"2083"),(0,r.kt)("td",{parentName:"tr",align:null},"BEGIN is not allowed in SQL.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"2084"),(0,r.kt)("td",{parentName:"tr",align:null},"COMMIT is not allowed in SQL.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"2085"),(0,r.kt)("td",{parentName:"tr",align:null},"ROLLBACK is not allowed in SQL.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"2086"),(0,r.kt)("td",{parentName:"tr",align:null},"Unable to open a temporary database file for storing temporary tables.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"2087"),(0,r.kt)("td",{parentName:"tr",align:null},"Unable to identify the object to be reindexed.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"2088"),(0,r.kt)("td",{parentName:"tr",align:null},"Table '%s' may not be modified.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"2089"),(0,r.kt)("td",{parentName:"tr",align:null},"Cannot modify '%s' because it is a view.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"2090"),(0,r.kt)("td",{parentName:"tr",align:null},"Variable number must be between ?0 and ?%d\\<")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"2092"),(0,r.kt)("td",{parentName:"tr",align:null},"Misuse of aliased aggregate '%s'")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"2093"),(0,r.kt)("td",{parentName:"tr",align:null},"Ambiguous column name: '","[","%s.","[","%s.","]","]","%s'")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"2094"),(0,r.kt)("td",{parentName:"tr",align:null},"No such function: '%s'")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"2095"),(0,r.kt)("td",{parentName:"tr",align:null},"Wrong number of arguments to function '%s'")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"2096"),(0,r.kt)("td",{parentName:"tr",align:null},"Subqueries prohibited in CHECK constraints.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"2097"),(0,r.kt)("td",{parentName:"tr",align:null},"Parameters prohibited in CHECK constraints.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"2098"),(0,r.kt)("td",{parentName:"tr",align:null},"Expression tree is too large (maximum depth %d)")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"2099"),(0,r.kt)("td",{parentName:"tr",align:null},"RAISE() may only be used within a trigger-program")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"2100"),(0,r.kt)("td",{parentName:"tr",align:null},"Table '%s' has %d columns but %d values were supplied")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"2101"),(0,r.kt)("td",{parentName:"tr",align:null},"Database schema is locked: '%s'")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"2102"),(0,r.kt)("td",{parentName:"tr",align:null},"Statement too long.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"2103"),(0,r.kt)("td",{parentName:"tr",align:null},"Unable to delete/modify collation sequence due to active statements")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"2104"),(0,r.kt)("td",{parentName:"tr",align:null},"Too many attached databases - max %d")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"2105"),(0,r.kt)("td",{parentName:"tr",align:null},"Cannot ATTACH database within transaction.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"2106"),(0,r.kt)("td",{parentName:"tr",align:null},"Database '%s' is already in use.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"2108"),(0,r.kt)("td",{parentName:"tr",align:null},"Attached databases must use the same text encoding as main database.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"2200"),(0,r.kt)("td",{parentName:"tr",align:null},"Out of memory.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"2201"),(0,r.kt)("td",{parentName:"tr",align:null},"Unable to open database.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"2202"),(0,r.kt)("td",{parentName:"tr",align:null},"Cannot DETACH database within transaction.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"2203"),(0,r.kt)("td",{parentName:"tr",align:null},"Cannot detach database: '%s'")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"2204"),(0,r.kt)("td",{parentName:"tr",align:null},"Database '%s' is locked.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"2205"),(0,r.kt)("td",{parentName:"tr",align:null},"Unable to acquire a read lock on the database.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"2206"),(0,r.kt)("td",{parentName:"tr",align:null},"[","column","|","columns","]"," '%s'","[",",'%s'","]"," are not ","[","unique","|","is","]"," not unique.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"2207"),(0,r.kt)("td",{parentName:"tr",align:null},"Malformed database schema.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"2208"),(0,r.kt)("td",{parentName:"tr",align:null},"Unsupported file format.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"2209"),(0,r.kt)("td",{parentName:"tr",align:null},"Unrecognized token: '%s'")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"2300"),(0,r.kt)("td",{parentName:"tr",align:null},"Could not convert text value to numeric value.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"2301"),(0,r.kt)("td",{parentName:"tr",align:null},"Could not convert string value to date.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"2302"),(0,r.kt)("td",{parentName:"tr",align:null},"Could not convert floating point value to integer without loss of data.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"2303"),(0,r.kt)("td",{parentName:"tr",align:null},"Cannot rollback transaction - SQL statements in progress.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"2304"),(0,r.kt)("td",{parentName:"tr",align:null},"Cannot commit transaction - SQL statements in progress.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"2305"),(0,r.kt)("td",{parentName:"tr",align:null},"Database table is locked: '%s'")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"2306"),(0,r.kt)("td",{parentName:"tr",align:null},"Read-only table.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"2307"),(0,r.kt)("td",{parentName:"tr",align:null},"String or blob too big.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"2309"),(0,r.kt)("td",{parentName:"tr",align:null},"Cannot open indexed column for writing.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"2400"),(0,r.kt)("td",{parentName:"tr",align:null},"Cannot open value of type %s.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"2401"),(0,r.kt)("td",{parentName:"tr",align:null},"No such rowid: %s\\<")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"2402"),(0,r.kt)("td",{parentName:"tr",align:null},"Object name reserved for internal use: '%s'")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"2403"),(0,r.kt)("td",{parentName:"tr",align:null},"View '%s' may not be altered.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"2404"),(0,r.kt)("td",{parentName:"tr",align:null},"Default value of column '%s' is not constant.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"2405"),(0,r.kt)("td",{parentName:"tr",align:null},"Not authorized to use function '%s'")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"2406"),(0,r.kt)("td",{parentName:"tr",align:null},"Misuse of aggregate function '%s'")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"2407"),(0,r.kt)("td",{parentName:"tr",align:null},"Misuse of aggregate: '%s'")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"2408"),(0,r.kt)("td",{parentName:"tr",align:null},"No such database: '%s'")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"2409"),(0,r.kt)("td",{parentName:"tr",align:null},"Table '%s' has no column named '%s'")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"2501"),(0,r.kt)("td",{parentName:"tr",align:null},"No such module: '%s'")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"2508"),(0,r.kt)("td",{parentName:"tr",align:null},"No such savepoint: '%s'")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"2510"),(0,r.kt)("td",{parentName:"tr",align:null},"Cannot rollback - no transaction is active.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"2511"),(0,r.kt)("td",{parentName:"tr",align:null},"Cannot commit - no transaction is active.")))))}u.isMDXComponent=!0}}]);