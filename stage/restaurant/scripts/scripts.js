!function(){"use strict";angular.module("restaurant.restaurant-cart",["ionic","LocalStorageModule"]).config(["$stateProvider",function(a){a.state("app.restaurant-cart",{url:"/restaurant-cart",views:{menuContent:{templateUrl:"scripts/cart/restaurant-cart/restaurant-cart.html",controller:"RestaurantCartController as vm"}}})}])}(),function(){"use strict";angular.module("restaurant.categories",["ionic"]).config(["$stateProvider",function(a){a.state("app.categories",{url:"/categories",views:{menuContent:{templateUrl:"scripts/categories/categories.html",controller:"CategoriesController as vm"}}})}])}(),function(){"use strict";angular.module("restaurant.common",["ionic"]).value("geolib",window.geolib).value("convert",window.convert)}(),function(){"use strict";angular.module("restaurant.contact-us",["ionic","ngCordova","restaurant.common"]).config(["$stateProvider",function(a){a.state("app.contact-us",{url:"/contact-us",views:{menuContent:{templateUrl:"scripts/contact-us/contact-us.html",controller:"ContactUsController as vm"}}})}])}(),function(){"use strict";angular.module("restaurant.restaurant-delivery",["ionic"]).config(["$stateProvider",function(a){var b="scripts/delivery/";a.state("app.delivery-method-selector",{url:"/delivery-method-selector",views:{menuContent:{templateUrl:b+"delivery-selector/delivery-method-selector.html",controller:"DeliveryMethodSelectorController as vm"}}}).state("app.home-delivery",{url:"/home-delivery",views:{menuContent:{templateUrl:b+"home-delivery/home-delivery.html",controller:"HomeDeliveryController as vm"}}}).state("app.take-away",{url:"/take-away",views:{menuContent:{templateUrl:b+"take-away/take-away.html",controller:"TakeAwayController as vm"}}})}])}(),function(){"use strict";angular.module("restaurant.drupal",["ionic","restaurant.common"]).config(["$stateProvider",function(a){a.state("app.drupal-articles",{url:"/drupal-articles",views:{menuContent:{templateUrl:"scripts/drupal/drupal-articles.html",controller:"DrupalArticlesController as vm"}}}).state("app.drupal-article",{url:"/drupal-articles/:articleId",views:{menuContent:{templateUrl:"scripts/drupal/drupal-article.html",controller:"DrupalArticleController as vm"}}})}])}(),function(){"use strict";angular.module("restaurant.favorites",["ionic","LocalStorageModule"]).config(["$stateProvider",function(a){a.state("app.favorites",{url:"/favorites",views:{menuContent:{templateUrl:"scripts/favorites/favorites.html",controller:"FavoritesController as vm"}}})}])}(),function(){"use strict";angular.module("restaurant.home",["ionic","ngCordova","restaurant.common"]).config(["$stateProvider",function(a){a.state("app.home",{url:"/home",views:{menuContent:{templateUrl:"scripts/home/home.html",controller:"HomeController as vm"}}})}])}(),function(){"use strict";angular.module("restaurant.map",["ionic"]).config(["$stateProvider",function(a){a.state("app.map",{url:"/map",views:{menuContent:{templateUrl:"scripts/map/map.html",controller:"MapController as vm"}},resolve:{businessInfo:["mapService",function(a){return a.getBusiness()}]}})}])}(),function(){"use strict";angular.module("restaurant.menu",["ionic"]).config(["$stateProvider",function(a){a.state("app",{url:"/app","abstract":!0,templateUrl:"scripts/menu/menu.html",controller:"MenuController as vm",resolve:{categories:["menuService",function(a){return a.getCategoriesMenuItem()}]}})}])}(),function(){"use strict";angular.module("restaurant.news",["ionic"]).config(["$stateProvider",function(a){a.state("app.articles",{url:"/articles",views:{menuContent:{templateUrl:"scripts/news/articles.html",controller:"ArticlesController as vm"}}}).state("app.article",{url:"/articles/:articleId",views:{menuContent:{templateUrl:"scripts/news/article.html",controller:"ArticleController as vm"}}})}])}(),function(){"use strict";angular.module("restaurant.products",["ionic"]).config(["$stateProvider",function(a){a.state("app.products",{url:"/products/:categoryId?categoryName",views:{menuContent:{templateUrl:"scripts/products/products.html",controller:"ProductsController as vm"}}}).state("app.featured-product",{url:"/products/featured/:productId",views:{menuContent:{templateUrl:"scripts/products/product.html",controller:"ProductController as vm"}},resolve:{product:["$stateParams","$state","productsService",function(a,b,c){var d=a.productId;return c.getFeatured(d)}]}}).state("app.product",{url:"/products/:categoryId/:productId",views:{menuContent:{templateUrl:"scripts/products/product.html",controller:"ProductController as vm"}},resolve:{product:["$stateParams","$state","productsService",function(a,b,c){var d=a.categoryId,e=a.productId;return c.get(d,e)}]}})}])}(),function(){"use strict";angular.module("restaurant.push",["ionic","ionic.service.core","ionic.service.push","base64"]).config(["$stateProvider",function(a){a.state("app.push",{url:"/push",views:{menuContent:{templateUrl:"scripts/push/push.html",controller:"PushController as vm"}}})}]).config(["$ionicAppProvider","ENV",function(a,b){a.identify({app_id:b.ionicAppId,api_key:b.ionicPublicKey,gcm_id:b.gcmId,dev_push:!0})}])}(),function(){"use strict";angular.module("restaurant.wordpress",["ionic","restaurant.common"]).config(["$stateProvider",function(a){a.state("app.wordpress-articles",{url:"/wordpress-articles",views:{menuContent:{templateUrl:"scripts/wordpress/wordpress-articles.html",controller:"WordpressArticlesController as vm"}}}).state("app.wordpress-article",{url:"/wordpress-articles/:articleId",views:{menuContent:{templateUrl:"scripts/wordpress/wordpress-article.html",controller:"WordpressArticleController as vm"}}})}])}(),angular.module("restaurant",["ionic","ionic.service.core","ionic.service.push","ngCordova","ionic-toast","LocalStorageModule","config","restaurant.restaurant-cart","restaurant.restaurant-delivery","restaurant.categories","restaurant.products","restaurant.news","restaurant.map","restaurant.home","restaurant.push","restaurant.menu","restaurant.contact-us","restaurant.wordpress","restaurant.drupal","restaurant.favorites","gMaps"]).value("_",window._).run(["$ionicPlatform",function(a){a.ready(function(){window.cordova&&window.cordova.plugins.Keyboard&&cordova.plugins.Keyboard.hideKeyboardAccessoryBar(!0),window.StatusBar&&StatusBar.styleDefault()})}]).config(["$urlRouterProvider",function(a){a.otherwise("/app/home")}]),function(){"use strict";function a(a,b,c,d,e){function f(a){d.remove(n,function(b){return b===a}),e.set(m,n)}function g(){n=[],e.set(m,n)}function h(){c.go("app.restaurant-cart")}function i(){return n}function j(a){var c=l(a.name);return b.show(c).then(function(b){b.canceled||(a.quantity=b.quantity,n.push(a),e.set(m,n))})}function k(a){var c=l(a.name,a.quantity);return b.show(c).then(function(b){b.canceled||(a.quantity=b.quantity,e.set(m,n))})}function l(b,c){var d=a.$new();return d.data={quantity:c||1},{templateUrl:"scripts/cart/add-to-cart.html",title:b,subTitle:"Quantity:",scope:d,buttons:[{text:"Cancel",onTap:function(a){return d.data.canceled=!0,d.data}},{text:"<b>Add to cart</b>",type:"button-positive",onTap:function(a){var b=parseInt(d.data.quantity);return b>0?(d.data.quantity=b,d.data):(alert("Quantity should be greather then zero"),void a.preventDefault())}}]}}var m="restaurant-cart",n=e.get(m)||[],o={addToCart:j,showMyCart:h,deleteItem:f,changeQuantity:k,flush:g,getAll:i};return o}angular.module("restaurant.restaurant-cart").factory("restaurantCartService",a),a.$inject=["$rootScope","$ionicPopup","$state","_","localStorageService"]}(),function(){"use strict";function a(a,b,c,d){function e(){k.items=c.getAll(),g()}function f(){k.currency&&d.go("app.delivery-method-selector")}function g(){k.currency=null;var a=0;b.each(k.items,function(b){a+=h(b),k.currency=b.currency}),k.total=a}function h(a){var c=a.price*a.quantity;return a.options&&b.each(a.options,function(b){c+=b.value*a.quantity}),c}function i(b){c.changeQuantity(b).then(e),a.closeOptionButtons()}function j(a){c.deleteItem(a),e()}var k=angular.extend(this,{items:[],proceedToPayment:f,changeQuantity:i,deleteItem:j,getItemTotal:h,total:0,currency:null});!function(){e()}()}angular.module("restaurant.restaurant-cart").controller("RestaurantCartController",a),a.$inject=["$ionicListDelegate","_","restaurantCartService","$state"]}(),function(){"use strict";function a(a,b){function c(){return b.all().then(function(a){e.categories=a})}function d(b){a.go("app.products",{categoryId:b.guid,categoryName:b.title})}var e=angular.extend(this,{categories:[],showProducts:d});!function(){c()}()}angular.module("restaurant.categories").controller("CategoriesController",a),a.$inject=["$state","categoriesService"]}(),function(){"use strict";function a(a){function b(){return a.getCategories()}var c={all:b};return c}angular.module("restaurant.categories").factory("categoriesService",a),a.$inject=["dataService"]}(),angular.module("gMaps",[]).directive("gmaps",["$window",function(a){return{restrict:"E",replace:!0,template:'<div class="gmaps" data-tap-disabled="true"></div>',scope:{center:"=",markers:"=",width:"@",height:"@",zoom:"=",mapTypeId:"@",panControl:"@",zoomControl:"@",scaleControl:"@"},link:function(b,c,d){function e(){console.log("map: start loading js gmaps");var b=a.document.createElement("script");b.type="text/javascript",b.src="https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=true&callback=InitMapCb",a.document.body.appendChild(b)}function f(){console.log("map: create map start");var a=b.center,d={zoom:b.zoom||10,center:new m.maps.LatLng(a.lat,a.lon),mapTypeId:m.maps.MapTypeId.ROADMAP,panControl:!0,zoomControl:!0,mapTypeControl:!0,scaleControl:!1,streetViewControl:!1,navigationControl:!0,disableDefaultUI:!0,overviewMapControl:!0};j instanceof m.maps.Map||(console.log("map: create map now as not already available "),j=new m.maps.Map(c[0],d),m.maps.event.addDomListener(c[0],"mousedown",function(a){return a.preventDefault(),!1}),k=new m.maps.InfoWindow({disableAutoPan:!0}))}function g(a,b){var c=b;k.setContent(c),k.setPosition(a.position),k.open(j),m.maps.event.addListener(k,"closeclick",function(){k.close()})}function h(a,b,c){return function(){g(a,b.name)}}function i(){if(j&&b.markers){l=[];var a=b.markers;angular.isString(a)&&(a=b.$eval(b.markers));for(var c=0;c<a.length;c++){var d=a[c],e=new m.maps.LatLng(d.lat,d.lon),f=new m.maps.Marker({position:e,map:j,title:d.name});m.maps.event.addListener(f,"click",h(f,d,e)),l.push(f)}}}var j,k,l,m,n="InitMapCb";a[n]=function(){m=window.google,console.log("map: init callback"),f(),i()},a.google&&a.google.maps?(console.log("map: IS available - create only map now"),m=window.google,f()):(console.log("map: not available - load now gmap js"),e()),b.$watch("markers",function(){i()})}}}]),function(){"use strict";function a(a,b){switch(a.dataProvider){case"LOCAL":return b.get("localDataService");case"REMOTE":return b.get("remoteDataService")}throw new Error("Data provider is not valid")}angular.module("restaurant.common").factory("dataService",a),a.$inject=["ENV","$injector"]}(),function(){"use strict";function a(a,b,c){function d(){return a.get(o).then(function(a){var b=a.data.result;return b})}function e(){return p?b.when(p):void 0}function f(){return a.get(m).then(function(a){return q=a.data.result,c.each(q,function(a){var b=a.url.lastIndexOf("/");a.url=l+a.url.substring(b+1)}),q})}function g(){return f().then(function(a){return c.filter(a,"featured",!0)})}function h(b){var d=c.find(q,function(a){return a.guid===b});return a.get(d.url).then(function(a){return s[b]=a.data.result,c.each(s[b],function(a){}),s[b]})}function i(){return a.get(n).then(function(a){return r=a.data.result})}function j(a,d){var e;return e=s[a]?b.when(s[a]):h(a),e.then(function(a){return c.find(a,function(a){return a.guid===d})})}function k(a){var d=c.find(r,function(b){return b.guid===a});return b.when(d)}var l="misc/",m=l+"categories.json",n=l+"featured.json",o=l+"business.json",p=l+"news.json",q=[],r=[],s={},t={getCategories:f,getProducts:h,getProduct:j,getFeaturedCategories:g,getFeaturedProducts:i,getFeaturedProduct:k,getBusiness:d,getNewsUrl:e};return t}angular.module("restaurant.common").factory("localDataService",a),a.$inject=["$http","$q","_"]}(),function(){"use strict";function a(a,b,c){function d(){return b.when(p)}function e(){return a.get(o).then(function(a){var b=a.data.result;return b})}function f(){return q&&q.length>0?b.when(q):a.get(m).then(function(a){return q=a.data.result})}function g(){return f().then(function(a){return c.filter(a,"featured",!0)})}function h(b){var d=c.find(q,function(a){return a.guid===b});return a.get(d.url).then(function(a){return r[b]=a.data.result,r[b]})}function i(){return l?b.when(l):a.get(n).then(function(a){return l=a.data.result})}function j(a,d){var e;return e=r[a]?b.when(r[a]):h(a),e.then(function(a){return c.find(a,function(a){return a.guid===d})})}function k(a){var d=c.find(l,function(b){return b.guid===a});return b.when(d)}var l,m="https://skounis.s3.amazonaws.com/mobile-apps/restaurant-ionic/categories.json",n="https://skounis.s3.amazonaws.com/mobile-apps/restaurant-ionic/featured.json",o="https://skounis.s3.amazonaws.com/mobile-apps/restaurant-ionic/business.json",p="https://skounis.s3.amazonaws.com/mobile-apps/restaurant-ionic/news.json",q=[],r={},s={getCategories:f,getProducts:h,getProduct:j,getFeaturedCategories:g,getFeaturedProducts:i,getFeaturedProduct:k,getBusiness:e,getNewsUrl:d};return s}angular.module("restaurant.common").factory("remoteDataService",a),a.$inject=["$http","$q","_"]}(),function(){"use strict";function a(a){function b(b){return a.open(b,"_system","location=yes"),!1}function c(b){var c;c=ionic.Platform.isAndroid()?"geo:"+b:"maps://maps.apple.com/?q="+b,a.location.href=c}var d={openExternalUrl:b,openMapsApp:c};return d}angular.module("restaurant.common").factory("externalAppsService",a),a.$inject=["$window"]}(),function(){"use strict";function a(){return function(a){return String(a).replace(/<[^>]+>/gm,"")}}angular.module("restaurant.common").factory("htmlToPlainText",a),a.$inject=[]}(),function(){"use strict";function a(a){function b(){var b=[],c=a.groupBy(e.days,"day");return a.each(c,function(c){var e={times:[]};a.each(c,function(a){e.name=d[a.day];var b=new Date(a.openAt),c=new Date(a.closeAt),f=b.format("hh:MMtt"),g=c.format("hh:MMtt");e.times.push(f+" - "+g)}),b.push(e)}),b}function c(){for(var a,b=new Date,c=b.getDay(),d=b.getHours(),f=b.getMinutes(),g=new Date(2015,0,1,d,f,0).getTime(),h=0;h<e.days.length;h++)if(a=e.days[h],a.day===c&&g>=a.openAt&&g<=a.closeAt)return!0;return!1}var d=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],e={days:[{day:1,openAt:14200956e5,closeAt:14201244e5},{day:2,openAt:14200956e5,closeAt:142011e7},{day:2,openAt:14201244e5,closeAt:14201388e5},{day:3,openAt:14200956e5,closeAt:14201244e5},{day:4,openAt:14200956e5,closeAt:14201263e5},{day:5,openAt:14200956e5,closeAt:14201244e5}],zone:3},f={isBusinessOpen:c,getOpenHours:b};return f}angular.module("restaurant.common").factory("openHoursService",a),a.$inject=["_"]}(),angular.module("config",[]).constant("ENV",{name:"production",youtubeKey:"AIzaSyDael5MmCQa1GKQNKQYypmBeB08GATgSEo",ionicPrivateKey:"a9265eaf15a20cc8516c770e8748aeed4891b28f453ce755",ionicPublicKey:"e30d4d540b8c75d1f167bbf242423c3fb23fe10275d1c016",ionicAppId:"241b6d37",gcmId:"228071472080",dataProvider:"LOCAL"}),function(){"use strict";function a(a,b,c,d){function e(){a.getBusiness().then(function(a){l=a,m.storeName=a.storeName,m.address=a.address,m.desc=a.desc,m.phoneNumber=a.phoneNumber})}function f(){b.openMapsApp(l.officeLocation)}function g(){c.isAvailable().then(function(){var a={to:l.email,subject:"Cordova Icons",body:"How are you? Nice greetings from Leipzig"};c.open(a)})}function h(){b.openExternalUrl(l.facebookPage)}function i(){b.openExternalUrl(l.instagramPage)}function j(){b.openExternalUrl(l.twitterPage)}function k(){b.openExternalUrl(l.pinterestPage)}var l,m=angular.extend(this,{storeName:"",address:"",desc:"",phoneNumber:"",getDirections:f,sendEmail:g,openFacebookPage:h,openInstagramPage:i,openTwitterPage:j,openPinterestPage:k,openHours:d.getOpenHours()});!function(){e()}()}angular.module("restaurant.contact-us").controller("ContactUsController",a),a.$inject=["contactUsService","externalAppsService","$cordovaEmailComposer","openHoursService"]}(),function(){"use strict";function a(a){var b={getBusiness:a.getBusiness};return b}angular.module("restaurant.contact-us").factory("contactUsService",a),a.$inject=["dataService"]}(),function(){"use strict";function a(){angular.extend(this,{})}angular.module("restaurant.restaurant-delivery").controller("DeliveryMethodSelectorController",a),a.$inject=[]}(),function(){"use strict";function a(a,b,c,d,e){function f(){c.getRestaurantInfo().then(function(a){i=a.restaurant})}function g(a){angular.forEach(a,function(a){angular.isObject(a)&&angular.isDefined(a.$setDirty)&&a.$setDirty()}),a.$valid&&h()}function h(){var c=a.getAll();b.performHomeDelivery(c,j.form,i.email).then(function(){a.flush(),d.nextViewOptions({disableBack:!0}),e.go("app.home")},function(){alert("Error when sending email")})}var i,j=angular.extend(this,{submit:g,form:{firstName:null,lastName:null,phoneNumber:null,zipCode:null,address:null}});!function(){f()}()}angular.module("restaurant.restaurant-delivery").controller("HomeDeliveryController",a),a.$inject=["restaurantCartService","restaurantOrderProcessor","restaurantInfoService","$ionicHistory","$state"]}(),function(){"use strict";function a(a){function b(){return a.getBusiness().then(function(a){var b=a.officeLocation.split(",");b={lat:parseFloat(b[0]),lon:parseFloat(b[1])};var c={origin:b,zoom:15,markers:[{lat:b.lat,lon:b.lon,name:a.storeName}]},d={name:a.storeName,address:a.address,email:a.email};return{location:c,restaurant:d}})}var c={getRestaurantInfo:b};return c}angular.module("restaurant.restaurant-delivery").factory("restaurantInfoService",a),a.$inject=["dataService"]}(),function(){"use strict";function a(a,b,c,d){function e(a,b,c){var d="";d+="<b>Restaurant info:</b>",d+="<br/>",d+="Restaurant name: "+b.name+"<br/>",d+="Address: "+b.address+"<br/>",d+="<br/>",d+="<b>Items:</b>",d+="<br/>",d+=g(a);var e=i();return h(c,e,d)}function f(a,b,c){var d="";d+="<b>Delivery info:</b>",d+="<br/>",d+="First name: "+b.firstName+"<br/>",d+="Last name: "+b.lastName+"<br/>",d+="Address: "+b.address+"<br/>",d+="Zip code: "+b.zipCode+"<br/>",d+="Phone number: "+b.phoneNumber+"<br/>",d+="<br/>",d+="<b>Items:</b>",d+="<br/>",d+=g(a);var e=i();return h(c,e,d)}function g(a){var b="",d=0,e="$";return c.each(a,function(a){var f=a.price*a.quantity;e=a.currency,b+=a.name+" "+a.quantity+"x "+a.size+" "+j(a.price,a.currency)+"<br/>",a.options&&a.options.length&&(b+="Options:<br/>",c.each(a.options,function(c){b+="- "+c.name+" "+j(c.value)+"<br/>",f+=c.value*a.quantity})),b+="<b>Item total:</b> "+j(f,a.currency)+"<br/>",d+=f}),b+="<br/>",b+="Total: "+j(d,e)}function h(a,c,e){try{return b.isAvailable().then(function(){var d={to:a,subject:c,body:e};b.open(d)})}catch(f){return d.reject("$cordovaEmailComposer is not available or failed. Are you running the app within a browser?")}}function i(){return"Restaurant Store - Order No "+Math.floor(9e3*Math.random()+1e3)}function j(b,c){return a("currency")(b,c,2)}var k={performHomeDelivery:f,sendTakeAwayConfirmation:e};return k}angular.module("restaurant.restaurant-delivery").factory("restaurantOrderProcessor",a),a.$inject=["$filter","$cordovaEmailComposer","_","$q"]}(),function(){"use strict";function a(a,b,c,d,e,f,g){function h(){e.getRestaurantInfo().then(function(a){k.location=a.location,k.restaurant=a.restaurant})}function i(){var c=j();return d.show(c).then(function(c){if(!c.canceled){var d=a.getAll();b.sendTakeAwayConfirmation(d,k.restaurant,c.email).then(function(){a.flush(),f.nextViewOptions({disableBack:!0}),g.go("app.home")},function(){alert("Error when sending email")})}})}function j(){var a=c.$new();return a.data={email:null},{templateUrl:"scripts/delivery/take-away/delivery-confirmation.html",title:"Confirmation dialog",subTitle:"Email",scope:a,buttons:[{text:"Cancel",onTap:function(b){return a.data.canceled=!0,a.data}},{text:"<b>Confirm</b>",type:"button-positive",onTap:function(b){var c=a.data.email;return c&&c.length>3?a.data:(alert("Enter correct email"),void b.preventDefault())}}]}}var k=angular.extend(this,{confirm:i,location:null,restaurant:null});!function(){h()}()}angular.module("restaurant.restaurant-delivery").controller("TakeAwayController",a),a.$inject=["restaurantCartService","restaurantOrderProcessor","$rootScope","$ionicPopup","restaurantInfoService","$ionicHistory","$state"]}(),function(){"use strict";function a(a,b,c,d){function e(){f()}function f(){d.getArticle(l).then(function(a){m.article=a})}function g(){b.show({buttons:[{text:"Facebook"},{text:"Twitter"},{text:"Email"},{text:"Share"}],titleText:"Share",cancelText:"Cancel",buttonClicked:function(a){switch(a){case 0:i();break;case 1:j();break;case 2:k();break;case 3:h()}return!0}})}function h(){var a=m.article.title,b=m.article.title;c.share(a,b,null,m.article.url)}function i(){var a=m.article.title,b=m.article.image,d=m.article.url;c.shareViaFacebook(a,b,d)}function j(){var a=m.article.title+" "+m.article.url,b=m.article.image,d=m.article.url;c.shareViaTwitter(a,b,d)}function k(){var a='Read more about "'+m.article.title+'" '+m.article.url,b=m.article.title;c.shareViaEmail(a,b,[],[],[],null)}var l=a.articleId,m=angular.extend(this,{article:null,share:g});e()}angular.module("restaurant.drupal").controller("DrupalArticleController",a),a.$inject=["$stateParams","$ionicActionSheet","$cordovaSocialSharing","drupalService"]}(),function(){"use strict";function a(a,b){function c(){d()}function d(){b.getArticles().then(function(a){f.articles=a})}function e(b){a.go("app.drupal-article",{articleId:b})}var f=angular.extend(this,{articles:[],navigate:e});c()}angular.module("restaurant.drupal").controller("DrupalArticlesController",a),a.$inject=["$state","drupalService"]}(),function(){"use strict";function a(a,b,c,d){function e(a){var b=a.match(/\<img.+src\=(?:\"|\')(.+?)(?:\"|\')(?:.+?)\>/);return b[1]}function f(){return a.get(h).then(function(a){return i=[],c.each(a.data,function(a){i.push({id:a.nid,title:a.node_title,brief:a.teaser,image:e(a.image),content:a.body,tags:a.tags})}),i})}function g(a){if(i.length)return b.when(c.find(i,"id",a));var d=b.defer();return f().then(function(){d.resolve(c.find(i,"id",a))}),d.promise}var h="https://demo.titaniumtemplates.com/drupal/rest/views/rest_api",i=[],j={getArticles:f,getArticle:g};return j}angular.module("restaurant.drupal").factory("drupalService",a),a.$inject=["$http","$q","_","htmlToPlainText"]}(),function(){"use strict";function a(a,b){function c(c,d){var e="Please send me more information about the following product:<br>";b.each(d,function(a,b){e+=b+1+". "+a.name+"<br>"+a.description,e+="<br><br>"}),a.isAvailable().then(function(){var b={to:c,subject:"Favorites list",body:e,isHtml:!0};a.open(b)})}var d={sendFavorites:c};return d}angular.module("restaurant.favorites").factory("favoritesSenderService",a),a.$inject=["$cordovaEmailComposer","_"]}(),function(){"use strict";function a(a,b,c){function d(){b.getBusiness().then(function(a){i=a})}function e(){j.items=b.getAll()}function f(a){b.deleteItem(a.guid),e()}function g(){c.sendFavorites(i.email,j.items)}function h(b){a.go("app.product",{productId:b.guid,categoryId:b.categoryId})}var i,j=angular.extend(this,{items:[],deleteItem:f,sendFavorites:g,showProductDetails:h});!function(){e(),d()}()}angular.module("restaurant.favorites").controller("FavoritesController",a),a.$inject=["$state","favoritesService","favoritesSenderService"]}(),function(){"use strict";function a(a,b,c,d){function e(a){c.remove(i,function(b){return b.guid===a}),d.set("favorites",i)}function f(){return i}function g(a){i.push(a),d.set("favorites",i)}function h(a){return c.some(i,"guid",a)}var i=d.get("favorites")||[],j={addItem:g,deleteItem:e,getAll:f,isInFavorites:h,getBusiness:a.getBusiness};return j}angular.module("restaurant.favorites").factory("favoritesService",a),a.$inject=["dataService","$rootScope","_","localStorageService"]}(),function(){"use strict";function a(a,b,c){function d(){b.getFeaturedProducts().then(function(a){i.products=a,c.update()})}function e(){b.getFeaturedCategories().then(function(a){i.categories=a})}function f(){b.getBusiness().then(function(a){i.storeName=a.storeName})}function g(b){a.go("app.featured-product",{productId:b.guid})}function h(b){a.go("app.products",{categoryId:b.guid,categoryName:b.title})}var i=angular.extend(this,{categories:[],products:[],showProducts:h,showProductDetails:g,storeName:""});!function(){d(),e(),f()}()}angular.module("restaurant.home").controller("HomeController",a),a.$inject=["$state","homeService","$ionicSlideBoxDelegate"]}(),function(){"use strict";function a(a){function b(){return a.getFeaturedCategories()}function c(){return a.getFeaturedProducts()}var d={getFeaturedCategories:b,getFeaturedProducts:c,getBusiness:a.getBusiness};return d}angular.module("restaurant.home").factory("homeService",a),a.$inject=["dataService"]}(),function(){"use strict";angular.module("restaurant").config(["$httpProvider",function(a){a.interceptors.push(["$cordovaNetwork","$q","$rootScope","$injector",function(a,b,c,d){function e(){var b=!!navigator.connection;if(b){var c=JSON.stringify(navigator.connection);return console.log("Internet connectivity chech. NetworkState: "+c),"unknown"==navigator.connection.type.toLowerCase()?!0:a.isOnline()}return navigator.onLine}return{request:function(a){if(!ionic.Platform.isReady)return a;if(0!==a.url.indexOf("http"))return a;var c=e();if(c)return a;var f=d.get("$ionicPopup");f.alert({title:"Alert",template:"There is no internet connection"});return b.reject("No internet connection")},response:function(a){return a}}}])}])}(),function(){"use strict";function a(a,b){for(var c=angular.extend(this,{origin:{lat:b.map.origin.latitude,lon:b.map.origin.longitude},zoom:b.map.zoomLevel,markers:[]}),d=[],e=0;e<b.map.annotations.length;e++){var f=b.map.annotations[e];d.push({name:f.title,lat:f.latitude,lon:f.longitude})}c.markers=d}angular.module("restaurant.map").controller("MapController",a),a.$inject=["$scope","businessInfo"]}(),function(){"use strict";function a(a){var b={getBusiness:a.getBusiness};return b}angular.module("restaurant.map").factory("mapService",a),a.$inject=["dataService"]}(),function(){"use strict";function a(a){angular.extend(this,{categories:a})}angular.module("restaurant.menu").controller("MenuController",a),a.$inject=["categories"]}(),function(){"use strict";function a(a,b){function c(){return b.getCategories().then(function(b){var c=[];return a.each(b,function(a){c.push({title:a.title,categoryId:a.guid})}),c})}var d={getCategoriesMenuItem:c};return d}angular.module("restaurant.menu").factory("menuService",a),a.$inject=["_","dataService"]}(),function(){"use strict";function a(a,b){var c=angular.extend(this,{article:null}),d=parseInt(a.articleId);b.get(d).then(function(a){c.article=a})}angular.module("restaurant.news").controller("ArticleController",a),a.$inject=["$stateParams","newsService"]}(),function(){"use strict";function a(a,b,c){function d(a){b.go("app.article",{articleId:a})}function e(){setTimeout(a.$broadcast("scroll.refreshComplete"),16e3)}var f=angular.extend(this,{articles:[],navigate:d,doRefresh:e});c.all().then(function(a){f.articles=a})}angular.module("restaurant.news").controller("ArticlesController",a),a.$inject=["$scope","$state","newsService"]}(),function(){"use strict";function a(a,b,c){function d(){return c.getNewsUrl().then(function(b){return a.get(b).then(function(a){return f=a.data.result})})}function e(a){for(var c=0;c<f.length;c++)if(f[c].id===a)return b.when(f[c]);return b.when(null)}var f=[],g={all:d,get:e};return g}angular.module("restaurant.news").factory("newsService",a),a.$inject=["$http","$q","dataService"]}(),function(){"use strict";function a(a,b,c,d,e,f,g,h){function i(){c.go("app.restaurant-cart")}function j(){g.addToCart({name:n.product.title,price:n.selectedPrice.value,currency:n.selectedPrice.currency,size:n.selectedPrice.name,picture:n.product.pictures[0],description:n.product.body,options:k(n.product.standardOptions).concat(k(n.product.extraOptions))})}function k(a){var b=h.filter(a,function(a){return a.selected});return h.map(b,function(a){return{name:a.name,value:a.value||0}})}function l(){n.isInFavorites?(e.deleteItem(n.product.guid),f.show("'"+n.product.title+"' has been removed from your Favorites","bottom",!1,2e3)):(e.addItem({guid:n.product.guid,categoryId:m,thumb:n.product.thumb,name:n.product.title,description:n.product.body}),f.show("'"+n.product.title+"' has been added to your Favorites","bottom",!1,2e3)),n.isInFavorites=!n.isInFavorites}var m=b.categoryId;d=angular.copy(d);var n=angular.extend(this,{product:d,selectedPrice:d.price[0],addToCart:j,isInFavorites:e.isInFavorites(d.guid),showCart:i,toggleFavorites:l,hasStandardOptions:!1,hasExtraOptions:!1});!function(){a.$on("$ionicView.enter",function(){return n.product&&(n.isInFavorites=e.isInFavorites(n.product.guid)),n.product.standardOptions&&n.product.standardOptions.length>0?a.hasStandardOptions=!0:n.product.extraOptions&&n.product.extraOptions.length>0?a.hasExtraOptions=!0:void 0})}()}angular.module("restaurant.products").controller("ProductController",a),a.$inject=["$scope","$stateParams","$state","product","favoritesService","ionicToast","restaurantCartService","_"]}(),function(){"use strict";function a(a,b){function c(){a.go("app.restaurant-cart")}function d(){return b.all(f).then(function(a){h.products=a})}function e(b){a.go("app.product",{categoryId:f,productId:b})}var f=a.params.categoryId,g=a.params.categoryName,h=angular.extend(this,{products:[],showProductDetails:e,showCart:c,category:g});!function(){d()}()}angular.module("restaurant.products").controller("ProductsController",a),a.$inject=["$state","productsService"]}(),function(){"use strict";function a(a){function b(b){return a.getProducts(b)}function c(b,c){return a.getProduct(b,c)}function d(b){return a.getFeaturedProduct(b)}var e={all:b,get:c,getFeatured:d};return e}angular.module("restaurant.products").factory("productsService",a),a.$inject=["dataService"]}(),function(){"use strict";function a(a,b,c,d){function e(e){var g=b.getDeviceToken();console.log("Send push using token: "+g);var h={tokens:[g],notification:{alert:e,ios:{badge:1,expiry:1423238641,priority:10,contentAvailable:!0},android:{collapseKey:"foo",delayWhileIdle:!0,timeToLive:300,payload:{key1:"value",key2:"value"}}}},i=c.ionicPrivateKey+":";a({method:"POST",url:f,data:h,headers:{Authorization:"Basic "+d.encode(i),"Content-Type":"application/json","X-Ionic-Application-Id":c.ionicAppId}}).then(function(a){console.log(a)})}var f="https://push.ionic.io/api/v1/push",g={send:e};return g}angular.module("restaurant.push").factory("pushSenderService",a),a.$inject=["$http","pushTokenService","ENV","$base64"]}(),function(){"use strict";function a(a,b,c){function d(){return h}function e(){return console.log("Ionic Push: Registering a device"),a.register({canShowAlert:!0,canSetBadge:!0,canPlaySound:!0,canRunActionsOnWake:!0,onNotification:function(a){return console.log(a),!0}})}function f(){console.log("Ionic User: Identifying with Ionic User service");var a=b.get();return a.user_id||(a.user_id=b.generateGUID()),b.identify(a).then(function(){i.identified=!0,g=a.user_id})}var g="",h=null;c.$on("$cordovaPush:tokenReceived",function(a,b){console.log("Ionic Push: Got token ",b.token,b.platform),h=b.token});var i={getDeviceToken:d,registerDevice:e,identifyUser:f,identified:!1};return i}angular.module("restaurant.push").service("pushTokenService",a),a.$inject=["$ionicPush","$ionicUser","$rootScope"]}(),function(){"use strict";function a(a,b,c){function d(){b.send(g.message),g.message=null}function e(){c.registerDevice().then(function(){g.registered=!0,a.alert({title:"Push service",template:"Device registered"})})}function f(){c.identifyUser().then(function(){
g.identified=!0,a.alert({title:"Push service",template:"User identified"})})}var g=angular.extend(this,{identifyUser:f,registerDevice:e,sendMessage:d,identified:!1,registered:!1,message:""})}angular.module("restaurant.push").controller("PushController",a),a.$inject=["$ionicPopup","pushSenderService","pushTokenService"]}(),function(){"use strict";angular.module("restaurant").config(["$httpProvider",function(a){a.interceptors.push(["$rootScope","$q",function(a,b){return{request:function(b){return a.$broadcast("loading:show"),b},response:function(b){return a.$broadcast("loading:hide"),b},requestError:function(c){return a.$broadcast("loading:hide"),b.reject(c)}}}])}]).run(["$rootScope","$ionicLoading",function(a,b){a.$on("loading:show",function(){b.show({})}),a.$on("loading:hide",function(){b.hide()})}])}(),function(){"use strict";function a(a,b,c,d){function e(){k()}function f(){b.show({buttons:[{text:"Facebook"},{text:"Twitter"},{text:"Email"},{text:"Share"}],titleText:"Share",cancelText:"Cancel",buttonClicked:function(a){switch(a){case 0:h();break;case 1:i();break;case 2:j();break;case 3:g()}return!0}})}function g(){var a=m.article.title,b=m.article.title;c.share(a,b,null,m.article.url)}function h(){var a=m.article.title,b=m.article.image,d=m.article.url;c.shareViaFacebook(a,b,d)}function i(){var a=m.article.title+" "+m.article.url,b=m.article.image,d=m.article.url;c.shareViaTwitter(a,b,d)}function j(){var a='Read more about "'+m.article.title+'" '+m.article.url,b=m.article.title;c.shareViaEmail(a,b,[],[],[],null)}function k(){d.getArticle(l).then(function(a){m.article=a})}var l=parseInt(a.articleId,10),m=angular.extend(this,{article:null,share:f});e()}angular.module("restaurant.wordpress").controller("WordpressArticleController",a),a.$inject=["$stateParams","$ionicActionSheet","$cordovaSocialSharing","wordpressService"]}(),function(){"use strict";function a(a,b){function c(){d()}function d(){b.getArticles().then(function(a){f.articles=a})}function e(b){a.go("app.wordpress-article",{articleId:b})}var f=angular.extend(this,{articles:[],navigate:e});c()}angular.module("restaurant.wordpress").controller("WordpressArticlesController",a),a.$inject=["$state","wordpressService"]}(),function(){"use strict";function a(a,b,c,d){function e(){return a.get(g).then(function(a){return h=[],c.each(a.data.posts,function(a){var b=a.attachments.length>0?a.attachments[0].images.full.url:null,e=[];c.each(a.tags,function(a){e.push(a.title)});var f=a.content.indexOf("</p>")+4,i=-1===f?a.content:a.content.substring(f);h.push({id:a.id,title:a.title,brief:d(a.excerpt),image:b,date:a.date,content:i,author:a.author.name,tags:e,url:g})}),h})}function f(a){if(h.length)return b.when(c.find(h,"id",a));var d=b.defer();return e().then(function(){d.resolve(c.find(h,"id",a))}),d.promise}var g="https://demo.titaniumtemplates.com/wordpress/?json=1",h=[],i={getArticles:e,getArticle:f};return i}angular.module("restaurant.wordpress").factory("wordpressService",a),a.$inject=["$http","$q","_","htmlToPlainText"]}();