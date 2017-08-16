function updateLocation(a,b,c){c||(c=window.location.href);var d=new RegExp("([?|&])"+a+"=.*?(&|#|$)(.*)","gi");if(d.test(c))return b?c.replace(d,"$1"+a+"="+b+"$2$3"):c.replace(d,"$1$3").replace(/(&|\?)$/,"");if(b){var e=-1!==c.indexOf("?")?"&":"?",f=c.split("#");return c=f[0]+e+a+"="+b,f[1]&&(c+="#"+f[1]),c}return c}var chapman=chapman||{};chapman.virtualtour=chapman.virtualtour||{},chapman.virtualtour.imgFilePath="img/",chapman.virtualtour.MissionControl=function(a,b,c,d){"use strict";var e,f=c.title,g=!1,h=function(a){if(""===a)return{};for(var b={},c=0;c<a.length;++c){var d=a[c].split("=");2===d.length&&(b[d[0]]=decodeURIComponent(d[1].replace(/\+/g," ")))}return b}(d.location.search.substr(1).split("&")),i="screen and (min-width: 768px)",j="screen and (min-width: 320px)",k=!1,l="",m=!1,n=function(b){k=b,a(d).on("debouncedresize",q),a("#virtualTour-shuttleBtn").click(function(b){var c=a(this).data().url;return d.open(c,"_blank"),!1}),a("#virtualTour-backButton").click(function(b){var c=d.location.hash;""!==c&&"#"!==c&&a.History.trigger()}),chapman.virtualtour.VirtualTourPanel.registerListeners(),o()},o=function(){return Modernizr.mq(i)||g?r():Modernizr.mq(j)?s():r()},p=function(){var b,e;chapman.virtualtour.MainNavigation.init(),chapman.virtualtour.CategoryMenu.init(),chapman.virtualtour.ManagePanels.init(),chapman.virtualtour.Search.init(),a.History.bind(function(b){var d,e,g,h=f;""!==b&&(m||(m=!0),chapman.virtualtour.Map.updateMapById(b),"campus-map"!==b&&"virtual-tour"!==b&&chapman.virtualtour.ManagePanels.showDetail(b),d=a("#"+b),e=d.data(),g=chapman.virtualtour.CategoryMenu.getTitleById(b),h=g+" | "+f),c.title=h}),b=d.location.hash,e=b.substr(1,b.length),"#campus-map"===b?setTimeout(function(b){a("#virtualTour-mapBtn").hasClass("primary")||a("#virtualTour-mapBtn").trigger("click",function(a){chapman.virtualtour.VirtualTourPanel.switchPanels(a)})},1e3):"#virtual-tour"===b?setTimeout(function(b){a("#virtualTour-tourBtn").hasClass("primary")||a("#virtualTour-tourBtn").trigger("click",function(a){chapman.virtualtour.VirtualTourPanel.switchPanels(a)})},1e3):a.History.go(e)},q=function(){Modernizr.mq(i)||g?r():t()},r=function(){"big"!==e&&(e="big",chapman.virtualtour.Map.init(),a(".bx-wrapper").length?a(".street-view").show():(chapman.virtualtour.StreetViewBar.init(),chapman.virtualtour.Overlays.init(),a(".street-view").show()))},s=function(){"small"!==e&&(e="small",chapman.virtualtour.Map.init(),a(".street-view").hide())},t=function(){"small"!==e&&(p(),e="small",a(".street-view").hide())},u=function(){var a=!1;return Modernizr.mq(i)||g?!0:a},v=function(){return k},w=function(){var a;return"ontouchstart"in c.documentElement&&(a="finger"),a},x=function(c){var d,e,f,g,h,i="",j=c.length;for(d in c)c.hasOwnProperty(d)&&(e=c[d].id,f=c[d].type,"kml"===f&&(e=c[d].obj.id),i+=j-1>d?e+",":e);g=b("s",i),a("#virtualTour-deepLink").attr("href",g).fadeIn(),""===l&&(l=a("#virtualTour-printButton").data().url),h=b("s",i,l+".aspx"),a("#virtualTour-printButton").attr("href",h)},y=function(){var a={};return void 0!==h.s&&(a=h.s.split(",")),a};return{init:n,isDesktop:u,isPrint:v,mouseOrFinger:w,updateQueryString:x,getQueryStringSelections:y,mapReady:p,updateScreenSize:o}}(window.jQuery,window.updateLocation,window.document,window),chapman.virtualtour.MainNavigation=function(a,b){"use strict";var c=!1,d=!1,e=function(){d||(a("#virtualTour-mainNavigationMenuButton button").click(f),a("#virtualTour-mainNavigationSearchButton button").click(f).focusout(function(b){var c=a(this).parent().find("input");c.val().length||f(b)}),d=!0)},f=function(b){var c=a(b.currentTarget).parent(),d=c.data().action;switch(d){case"menu":chapman.virtualtour.ManagePanels.toggleCategoryMenu("menu");break;case"search":chapman.virtualtour.ManagePanels.toggleSearch("menu")}return!1},g=function(b){switch(c||(a("#virtualTour-mainNavigation").show(),c=!0),b){case"categoryMenu":a("#virtualTour-mainNavigationMenuButton").toggleClass("active"),a("#virtualTour-mainNavigationSearchButton").removeClass("active");break;case"search":a("#virtualTour-mainNavigationMenuButton").removeClass("active"),a("#virtualTour-mainNavigationSearchButton").toggleClass("active");break;case"detail":a("#virtualTour-mainNavigationMenuButton").removeClass("active"),a("#virtualTour-mainNavigationSearchButton").removeClass("active");break;default:a("#virtualTour-mainNavigationMenuButton").removeClass("active"),a("#virtualTour-mainNavigationSearchButton").removeClass("active")}return!1};return{init:e,updateMainMenu:g}}(window.jQuery,window),chapman.virtualtour.Map=function(a,b,c){"use strict";var d,e,f=!/chapman\.edu/.test(c.location),g=[],h=[],i=!1,j=!1,k=chapman.virtualtour.MissionControl,l=new InfoBox({alignBottom:!0,pixelOffset:new google.maps.Size(28,-10),maxWidth:350,closeBoxURL:""}),m=a("#virtualTour-mapColumn"),n={center:new google.maps.LatLng(m.data().startingPointLatitude,m.data().startingPointLongitude),mapTypeId:google.maps.MapTypeId.ROADMAP,disableDefaultUI:!0,zoom:17,mapTypeControl:!0,mapTypeControlOptions:{style:google.maps.MapTypeControlStyle.DEFAULT,position:google.maps.ControlPosition.TOP_RIGHT},zoomControl:!0,zoomControlOptions:{position:google.maps.ControlPosition.RIGHT_CENTER},styles:[{featureType:"poi",stylers:[{visibility:"simplified"}]},{featureType:"administrative",stylers:[{visibility:"off"}]},{featureType:"transit",stylers:[{visibility:"off"}]},{featureType:"landscape",elementType:"labels",stylers:[{visibility:"off"}]}],overviewMapControl:!0,panControl:!1,scaleControl:!0},o="",p=[],q=function(){i||(chapman.virtualtour.Map.chapmanMap=e=new google.maps.Map(b.getElementById("virtualTour-mapCanvas"),n),google.maps.event.addListener(e,"idle",function(){i||(i=!0,google.maps.event.clearListeners(e,"idle"),h.length>0&&y(h),void 0!==d&&v(d),k.mapReady())}),google.maps.event.addDomListener(c,"resize",function(){var a=e.getCenter();google.maps.event.trigger(e,"resize"),e.setCenter(a)}))},r=function(a,b){var c;switch(a){case"library2":c=f?"icon_library.png":"[system-asset]/_files/virtualTour/img/icon_library.png[/system-asset]";break;case"dumbbell":c=f?"icon_dumbbell.png":"[system-asset]/_files/virtualTour/img/icon_dumbbell.png[/system-asset]";break;case"users":c=f?"icon_users.png":"[system-asset]/_files/virtualTour/img/icon_users.png[/system-asset]";break;case"food3":c=f?"icon_food.png":"[system-asset]/_files/virtualTour/img/icon_food.png[/system-asset]";break;case"mic3":c=f?"icon_mic.png":"[system-asset]/_files/virtualTour/img/icon_mic.png[/system-asset]";break;case"lab":c=f?"icon_lab.png":"[system-asset]/_files/virtualTour/img/icon_lab.png[/system-asset]";break;case"lab3":c=f?"icon_lab.png":"[system-asset]/_files/virtualTour/img/icon_lab.png[/system-asset]";break;case"car":c=f?"icon_car.png":"[system-asset]/_files/virtualTour/img/icon_car.png[/system-asset]";break;case"step":c=f?"icon_steps.png":"[system-asset]/_files/virtualTour/img/icon_steps.png[/system-asset]";break;case"camera":c=f?"icon_camera.png":"[system-asset]/_files/virtualTour/img/icon_camera.png[/system-asset]";break;case"tree":c=f?"icon_tree.png":"[system-asset]/_files/virtualTour/img/icon_tree.png[/system-asset]";break;case"bed":c=f?"icon_bed.png":"[system-asset]/_files/virtualTour/img/icon_bed.png[/system-asset]";break;case"graduation":c=f?"icon_graduation.png":"[system-asset]/_files/virtualTour/img/icon_graduation.png[/system-asset]";break;case"star3":c=f?"icon_star.png":"[system-asset]/_files/virtualTour/img/icon_star.png[/system-asset]";break;case"bus":c=f?"icon_bus.png":"[system-asset]/_files/virtualTour/img/icon_bus.png[/system-asset]";break;case"accessibility2":c=f?"icon_accessibility.png":"[system-asset]/_files/virtualTour/img/icon_accessibility.png[/system-asset]";break;case"aid":c=f?"icon_aid.png":"[system-asset]/_files/virtualTour/img/icon_aid.png[/system-asset]";break;case"coin":c=f?"icon_coin.png":"[system-asset]/_files/virtualTour/img/icon_coin.png[/system-asset]";break;case"toilets_unisex":c=f?"icon_bathroom.png":"[system-asset]/_files/virtualTour/img/icon_bathroom.png[/system-asset]";break;default:c=b>0?f?"icon_"+String(b)+".png":"/_files/virtualTour/img/icon_"+String(b)+".png":f?"icon_default.png":"/_files/virtualTour/img/icon_default.png"}return f?chapman.virtualtour.imgFilePath+c:c},s=function(a){var b=-1;for(var c in g)if(g[c].hasOwnProperty("id")&&g[c].id===a)return c;return b},t=function(a){return g[s(a)]},u=function(a){var b=-1;for(var c in g)if(g.hasOwnProperty(c)){var d=g[c],e=d.type;if("kml"===e&&d.obj.lineId===a)return c}return b},v=function(a,b){void 0!==a&&"kml"!==a.type?e.panTo(a.getPosition()):d=a},w=function(b,c){var d=b.type,f=s(b.id);switch(d){case"kml":var j=b.url,l={suppressInfoWindows:!0,preserveViewport:!1},m=new google.maps.KmlLayer(j,l);g.push({type:d,obj:b,layer:m,id:b.id}),m.setMap(e),google.maps.event.addListener(m,"click",function(b){var c=b.featureData.name,d=g[u(c)];a.History.go(d.obj.id)}),k.updateQueryString(g);break;default:if(-1===f&&i){var n,p=b.index&&b.index>9?new google.maps.Point(10,37):new google.maps.Point(4,37);if(c?(n=new google.maps.Marker({type:d,icon:r(b.group,b.index),shadow:chapman.virtualtour.imgFilePath+"icon_shadow.png",labelAnchor:p,labelClass:"label",labelStyle:{opacity:"1","text-align":"center","font-weight":"bold","font-size":"15px"},name:b.title,position:new google.maps.LatLng(b.latitude,b.longitude)}),n.id=b.id):n=new google.maps.Marker(k.isPrint()?{type:d,icon:r(b.group),shadow:chapman.virtualtour.imgFilePath+"icon_shadow.png",labelContent:b.title,labelAnchor:new google.maps.Point(60,-5),labelClass:"label",labelStyle:{opacity:1},name:b.title,position:new google.maps.LatLng(b.latitude,b.longitude)}:{type:d,group:b.group,icon:r(b.group),shadow:chapman.virtualtour.imgFilePath+"icon_shadow.png",id:b.id,name:b.title,position:new google.maps.LatLng(b.latitude,b.longitude),visible:!0}),!n.position.lat()||!n.position.lng())return console.log("FAILED TO ADD MARKERS",n),!1;g.push(n),n.setMap(e),google.maps.event.addListener(n,"mouseover",function(a){var b=n.name;return b===o?!1:void(k.isDesktop()&&(chapman.virtualtour.Map.mouseOverWindow=new InfoBox({alignBottom:!1,pixelOffset:new google.maps.Size(18,-48),maxWidth:1350,closeBoxURL:""}),chapman.virtualtour.Map.mouseOverWindow.setContent('<div class="content">'+b+"</div>"),chapman.virtualtour.Map.mouseOverWindow.open(e,n)))}),google.maps.event.addListener(n,"mouseout",function(){chapman.virtualtour.Map.mouseOverWindow.close()}),google.maps.event.addListener(n,"click",function(b){(a("#virtualTour-mapBtn").hasClass("primary")||a("#virtualTour-tourBtn").hasClass("primary"))&&a("#virtualTour-mapBtn, #virtualTour-tourBtn").removeClass("primary"),a("#js-jmenu--slide-left").hasClass("is-active")&&a("#js-jmenu--slide-left").removeClass("is-active"),a.History.go(n.id)}),k.updateQueryString(g);var q=new google.maps.LatLng(33.793003,-117.852606),t=new google.maps.LatLng(b.latitude,b.longitude),v=g.length;return chapman.virtualtour.Map.chapmanMap.setCenter(1===v?t:q),n}h.push(b)}},x=function(a){var b=s(a.id),c=g[b];c&&("kml"!==c.type?c.setMap(null):c.layer.setMap(null),google.maps.event.clearListeners(c),g.splice(b,1),c=null),k.updateQueryString(g)},y=function(b,c){var d,f=b.length;return e?(d=e.getBounds(),j=!0,void a.each(b,function(a,b){var g,h,i,k,l=w(b,c);l&&(g=new google.maps.LatLng(l.position.lat(),l.position.lng()),h=e.getBounds().contains(g),h||(i=e.getZoom(),e.setZoom(i-1)),k=b.type,"kml"!==k&&d.extend(new google.maps.LatLng(b.latitude,b.longitude)),a>=f-1&&(j=!1))})):!1},z=function(a){for(var b in a)a.hasOwnProperty(b)&&x(a[b])},A=function(a){var b=t(a);return v(b),b},B=function(b){a.History.go(b)},C=function(){return g};return{init:q,addMarker:w,addMarkers:y,removeMarker:x,removeMarkers:z,updateMapById:A,getSelections:C,clickMarkerById:B,chapmanMap:e,mouseOverWindow:l,knownMarkers:p}}(window.jQuery,window.document,window),chapman.virtualtour.CategoryMenu=function(a,b){"use strict";var c=!1,d=function(){var b=chapman.virtualtour.MissionControl.getQueryStringSelections();if(!c){if(a("#virtualTour-categories").accordion({header:".virtualTour-categoryButton",collapsible:!0,active:!1,heightStyle:"content",icons:!1,beforeActivate:function(b,c){var d;return a(b.originalEvent.target).hasClass("changeCheckbox")||a(b.originalEvent.target).hasClass("virtualTour-categoryCheckboxLabel")?(d=a(b.currentTarget).find("input"),d.prop("checked",!d.prop("checked")),h(d),chapman.virtualtour.VirtualTourPanel.removeOrAddMarkers("map",b.originalEvent),!1):void 0}}),a(".virtualTour-subCategoryLink","#virtualTour-categories").click(function(a){f(a)}),a(".virtualTour-categoryCheckbox").change(function(b){h(b),g(".virtualTour-categoryCheckbox",function(b){b>0?a("#virtualTour-goToMapCTA").addClass("is-active"):a("#virtualTour-goToMapCTA").removeClass("is-active")})}),b.length>0)for(var d in b)b.hasOwnProperty(d)&&a("#"+b[d],"#virtualTour-categoryMenu").trigger("click");c=!0}},e=function(a){var b,c=a.data(),d=a.attr("name"),e=a.attr("value"),f=a.data().primaryId,g=a.parent().parent().find(".infowindowImg").data();void 0!==f&&(e=f);var h=void 0!==a.data().kmlUrl;if(h){var i=c.kmlLineId,j=a.data().kmlUrl;return b={id:e,type:"kml",value:a.attr("value"),title:a.next().next().text(),group:d,lineId:i,url:j}}return b={id:e,type:"marker",value:a.attr("value"),title:c.name||a.parent().find("label").find("span").text(),group:d,latitude:c.latitude,longitude:c.longitude,streetview:c.streetview,index:c.index,address:c.address,secondaryAddress:c.secondaryAddress,city:c.city,state:c.state,zip:c.zip,img:g&&g.src&&g.src.trim(),alt:g&&g.alt&&g.alt.trim(),phone:c.phone,website:c.site,hours:c.officeHours},!b.title&&b.id&&(b.title=c.name),/listen.+to.+audio/g.test(b.title)&&(b.title=c.name),b},f=function(b){b.preventDefault();var c=a(b.currentTarget),d=c.data().checkboxId,e=a("#"+d).is(":checked");e||a("#"+d).trigger("click"),a("#js-jmenu--slide-left").hasClass("is-active")&&a("#js-jmenu--slide-left").removeClass("is-active")},g=function(b,c){var d=a(b+":checked"),e=d.length;if(!a(b).is(":checkbox"))throw Error('The selector "'+b+'" does not return a correct set of matched elements for type "checkbox".');if("undefined"!=typeof c){if("function"!=typeof c)throw Error(typeof c+" is not a function.");c(e)}return e},h=function(b){var c,d,f,g=b instanceof a?b:a(b.currentTarget),h=g.attr("name"),j=g.attr("value"),k=[],l=g.prop("checked"),m=a("input[value="+j+"]");void 0===l&&(l=g.parent().find("input").prop("checked")),g.find(".tour").length?a(".virtualTour-category input").each(function(b,f){h=a(f).attr("name"),j=a(f).attr("value"),c=a(":checkbox[name="+h+"]"),c.each(function(b,c){var d=a(c);if(d.prop("checked")&&(d.data().longitude&&d.data().latitude||d.data().kmlUrl)){var f=e(a(d));k.push(f)}}),d=g.is(":checked"),d?(c.each(function(b,c){a(c).prop("checked",!0)}),chapman.virtualtour.Map.addMarkers(k)):(c.each(function(b,c){a(c).prop("checked",!1)}),chapman.virtualtour.Map.removeMarkers(k)),i(c,d)}):g.hasClass("parent")?(c=a(":checkbox[name="+h+"]").each(function(b,c){var d=a(c);if(d.data().longitude&&d.data().latitude||d.data().kmlUrl){var f=e(a(d));k.push(f)}}),d=g.prop("checked"),void 0===d&&(d=g.parent().find("input").prop("checked")),d?(c.each(function(b,c){a(c).prop("checked",!0)}),chapman.virtualtour.Map.addMarkers(k)):(c.each(function(b,c){a(c).prop("checked",!1)}),chapman.virtualtour.Map.removeMarkers(k)),i(c,d)):(f=e(g),l?(m.attr("checked",!0),chapman.virtualtour.Map.addMarker(f),b.stopPropagation()):(m.attr("checked",!1),chapman.virtualtour.Map.removeMarker(f),b.stopPropagation()))},i=function(b,c){b.each(function(b,d){if(0!==b){var e=a(d).attr("value"),f=a("input[value="+e+"]");f.length>1&&f.attr("checked",c)}})},j=function(b){var c=a("#"+b,"#virtualTour-categoryMenu"),d=a(".virtualTour-subCategoryLink",c.parent());d.trigger("click")},k=function(b){var c=a("#"+b).next().next().text();return c};return{init:d,initWithSubCategory:j,subCategoryClicked:f,getTitleById:k,createMarkerObject:e,checkboxChanged:h}}(window.jQuery,window),chapman.virtualtour.ManagePanels=function(a,b){"use strict";var c,d="searchOpen",e="categoryMenuOpen",f="default",g="mapDetail",h=f,i=function(){c=a("#virtualTour-mainNavigation"),a("#virtualTour-categoryMenu").is(":visible")&&a("#virtualTour-categoryMenu").show(),a("#virtualTour-search").is(":visible")&&a("#virtualTour-search").show(),a(b).resize(function(){j()}),a(b).load(function(){j()})},j=function(){a(".map-reduce").css("height",function(){var b=a(".map-container").css("height");return b?b=b.replace("px",""):void 0})},k=function(){c.hasClass(e)||(c.addClass(e),a("#virtualTour-categoryMenu").slideDown(),r(),a("#virtualTour-searchResults").slideUp()),chapman.virtualtour.MainNavigation.updateMainMenu("categoryMenu")},l=function(){h=f,c.removeClass(e),a("#virtualTour-categoryMenu").slideUp()},m=function(){c.addClass(e),a("#virtualTour-categoryMenu").slideDown()},n=function(){l(),c.hasClass(d)||(c.addClass(d),a("#virtualTour-search").slideDown()),chapman.virtualtour.MainNavigation.updateMainMenu("search")},o=function(){c.removeClass(d),a("#virtualTour-search").slideUp()},p=function(){c.addClass(d),a("#virtualTour-search").slideDown(),a("#virtualTour-searchResults").slideDown()},q=function(c){var d,e,f,i,j,k,l,m=!/chapman\.edu/.test(b.location),n=b.location.protocol,o=b.location.hostname,p=b.location.pathname.substr(b.location.pathname.lastIndexOf(".")+1);return h=g,a("#js-jmenu--slide-left").hasClass("is-active")&&a("#js-jmenu--slide-left").removeClass("is-active"),d=a("#virtualTour-categoryMenu").find("#"+c),d.length||(d=a(".virtual-tour-block").find("#"+c)),e=m?d.data().href:p.indexOf(".")>-1?n+"//"+o+d.data().href+"."+p:n+"//"+o+d.data().href+".aspx",f=b.location.hash,""===f||"#"===f?!1:(l=a("#virtualTour-detail"),j=d.data().latitude,k=d.data().longitude,l.empty(),i=a.ajax({url:e,method:"GET",dataType:"html"}),i.then(function(a,c,d){var e=b.location.hash;return""===e||"#"===e?!1:void(l.hasClass("is-active")&&l.removeClass("is-active"))}),void i.done(function(b,c,d){var e,f,g,h,i,j=a(b).find("#virtualTour-attractionContent").html();l.empty(),l.html(j),"success"===c&&a("#virtualTour-bxSlider").length>0&&(e=a("#virtualTour-bxSlider").find(".bxslider"),g=e.data().speed,f="On"===e.data().auto?!0:!1,h=e.data().startSlide,e.find("li").length>0?e.find("li").each(function(b){var c=a(this).data("src"),d=a(this).find("img");d.attr("src",c)}):e.html('<li><img src="[system-asset]/_files/virtualTour/img/chapman_university_logo-placeholder.jpg[/system-asset]" alt="Chapman University" /></li>'),i=a(e).bxSlider({startSlide:h,adaptiveHeight:!0,pager:!1,auto:f,pause:g,onSliderLoad:function(b){a(".bx-prev").empty().attr("title","Previous slide").attr("aria-label","Previous").addClass("icon icon-chevron-left").css({opacity:1,visibility:"visible"}),a(".bx-next").empty().attr("title","Next slide").attr("aria-label","Next").addClass("icon icon-chevron-right").css({opacity:1,visibility:"visible"})}}),f&&a(".bx-prev, .bx-next").on("click",function(a){a.preventDefault(),i.startAuto()})),setTimeout(function(){return l.hasClass("is-open")?null:l.addClass("is-active")},500)}))},r=function(){var b=a("#virtualTour-detail");b.hide()};return{init:i,toggleCategoryMenu:k,showCategoryMenu:m,hideCategoryMenu:l,toggleSearch:n,showSearch:p,hideSearch:o,showDetail:q,hideDetail:r}}(window.jQuery,window),chapman.virtualtour.Search=function(a,b){"use strict";var c=function(){a("#virtualTour-searchField").on("keyup",function(b){var c=0,d="",e="",f=[],g=a("#virtualTour-searchField").val();g&&g.length>=0?(chapman.virtualtour.ManagePanels.showSearch(),chapman.virtualtour.ManagePanels.hideCategoryMenu(),a("#js-reset").addClass("is-active"),a('.virtualTour-subCategory[data-search-terms*="'+g.toLowerCase()+'"]').each(function(b,g){var h,i,j,k,l;a(g).hasClass("virtual-tour-block")?(h=a(".go-to-info",g),j=h.text()+" (Virtual Tour Listing)",k=h.attr("href"),l=h.data().id):(i=a(g),j=i.find(".virtualTour-categoryCheckboxLabel span").text(),k=i.find(".virtualTour-categoryCheckbox.child").data().href,l=i.find(".virtualTour-categoryCheckbox.child").attr("id")),-1===f.indexOf(j)&&(c+=1,d='<li class="virtualTour-searchResult"><a href="'+k+'" data-checkbox-id="'+l+'">'+j+"</a></li>",e+=d,f.push(j))}),a("#virtualTour-searchResultsList").empty().append(e),a("#virtualTour-numItems").text(c),a(".virtualTour-searchResult a","#virtualTour-searchResultsList").on("click",function(a){chapman.virtualtour.CategoryMenu.subCategoryClicked(a)})):(chapman.virtualtour.ManagePanels.hideSearch(),chapman.virtualtour.ManagePanels.showCategoryMenu(),a("#js-reset").removeClass("is-active"),a("#virtualTour-searchResultsList").empty(),a("#virtualTour-numItems").text(0))}),a("#js-reset").on("click",function(b){b.preventDefault(),a("#virtualTour-searchField").length>0&&a("#virtualTour-searchField").val(""),a("#virtualTour-searchField").trigger("keyup")})};return{init:c}}(window.jQuery,window),chapman.virtualtour.StreetViewBar=function(a,b){"use strict";var c=chapman.virtualtour,d=!1,e=!1,f=function(){var b=this.images=a('.street-view-data input[type="hidden"]'),d=this.container=a("#streetViewBar");this.formattedImages=[],this.map=c.Map.chapmanMap,this.mapContainer=a("#streetViewCanvas").get(0),this.each_image(b),this.setup_list(d),this.register_listeners(),a(".streetViewBar ul").bxSlider({slideMargin:5,adaptiveHeight:!0,responsive:!1,controls:!0,pager:!1,minSlides:1,maxSlides:10,slideWidth:250})},g=function(b){var c=this.formattedImages,d=this,e=1;a.each(b,function(b,f){var g=a(f).attr("value"),h=d.parse_url(g),i=d.format_url(h),j=a(f).data("name"),k=a(f).data("icon");c.push({parsedUrl:i,originalUrl:g,qs:h,id:e,icon:k,name:j}),e++})},h=function(a){var b,c,d={};return a?(b=a.split("/"),b.forEach(function(a,d){/@/.test(a)?b=a:/data=/.test(a)&&(c=a)}),b=b.split("@")[1],b=b.split(","),b.forEach(function(a,c){b[c]=a.split(/[a-zA-Z]/)[0]}),c=this.parse_pano(c),d.ll=b[0]+","+b[1],d.yaw=b[4],d.heading=b[4],d.pitch=b[5],d.panoid=c,d.h=200,d.w=350,d.pitch=d.pitch-90,d):!1},i=function(a){var b;return a?(b=a.split(/!\d\D/g),b[4]):!1},j=function(b,c){var d=c,e="";return d||(d="400x400"),e="https://geo2.ggpht.com/cbk?output=thumbnail&thumb=1&cb_client=maps_sv.gps.maps_sv.tactile",a.each(b,function(a,b){b&&(e+="&"+a+"="+b)}),e},k=function(a){var b='<ul class="street-view-tile slides" data-partial="street-view-tile">',c=this.formattedImages,d=this;c.forEach(function(a,c){b+=d.add_image(a)}),b+="</ul>",a.append(b)},l=function(a){var b=JSON.stringify(a.qs),c="photo"===a.icon?"photo":"street-pano";return'<li class="street-slide"><div class="tile-container"><div class="img-container"><img class="streetViewImg" src="'+a.parsedUrl+'" data-original-href="'+a.originalUrl+'" data-id="'+a.id+'" data-query-string='+b+' /></div><div class="icon-container"><span class="icon '+c+'"></span><span class="title">'+a.name+"</span></div></div></li>"},m=function(){var b=this,d=b.map.getStreetView();a(".street-view").on("click",".streetViewImg",function(){(a("#virtualTour-mapBtn").hasClass("primary")||a("#virtualTour-tourBtn").hasClass("primary"))&&a("#virtualTour-mapBtn, #virtualTour-tourBtn").removeClass("primary"),a("#js-jmenu--slide-left").hasClass("is-active")&&a("#js-jmenu--slide-left").removeClass("is-active"),a("#virtualTour-detail").hasClass("is-active")?a("#virtualTour-detail").removeClass("is-active"):a("#virtualTour-detail").hasClass("is-open")&&a("#virtualTour-detail").addClass("has-content").removeClass("is-open"),a("#map-header, #virtualTour-streetView").fadeOut(500),setTimeout(function(){o.call(this,b)}.bind(this),300)}),a("#virtualTour-mapColumn").on("click",".streetViewBtn",function(a){a.preventDefault(),o.call(this,b)}),a("#virtualTour-mapColumn").on("click",".open-street-view",function(c){c.preventDefault();var d=a(c.target);n.call(this,b,d)}),google.maps.event.addListener(d,"position_changed",function(){c.streetViewMap&&c.streetViewMap.getVisible()&&c.streetViewMap.setVisible(!1),a("#streetViewCanvas").is(":visible")||(c.originalStreetView||(b.originalStreetView=d,c.originalStreetView=d),s(b,"original","map"))})},n=function(a,b){var c=a.mapContainer,d=p.call(this,a,!0),e=d.streetOptions,f=d.thisStreet,g=new google.maps.StreetViewService;t.call(this,a),g.getPanoramaByLocation(f,100,function(d,g){g===google.maps.StreetViewStatus.OK?(a.streetViewMap=new google.maps.StreetViewPanorama(c,e),a.streetViewMap.setPano(d.location.pano),a.map.setStreetView(a.streetViewMap),q(a,f),s.call(this,a,"streetView","street"),r(a,"streetView"),q(a),a.streetViewMap.setVisible(!0),chapman.virtualtour.StreetViewBar.inStreetViewService=!0):b.text("Street View is Unavailable")})},o=function(a){var b=a.mapContainer,c=p.call(this,a).streetOptions;t.call(this,a),a.streetViewMap=new google.maps.StreetViewPanorama(b,c),r(a,"streetView"),s.call(this,a,"streetView","street"),q(a),a.streetViewMap.setVisible(!0)},p=function(b,c){var d=a(this).data("query-string"),e=d?parseFloat(d.heading):void 0,f=d?parseFloat(d.pitch):void 0,g=b.get_location(c?a(this).data("ll"):d),h=new google.maps.LatLng(g[0],g[1]),i={position:h};return c?i.radius=100:(i.pov={heading:e,pitch:f},d.panoid&&(i.pano=d.panoid)),{streetOptions:i,thisStreet:h}},q=function(a,b){google.maps.event.addListenerOnce(c.Map.chapmanMap,"bounds_changed",function(){c.Map.chapmanMap.setCenter(b)}),google.maps.event.addListener(a.streetViewMap,"visible_changed",function(){c.originalStreetView&&c.originalStreetView.getVisible()&&c.originalStreetView.setVisible(!1),a.streetViewMap&&!a.streetViewMap.getVisible()&&r(a,"streetView")})},r=function(b,d){"streetView"===d?(a("#virtualTour-mapCanvas").hide(),a("#streetViewCanvas").show(),c.streetViewMap=b.streetViewMap,c.StreetViewBar.pegmanOnly&&(c.streetViewMap.setVisible(!0),c.StreetViewBar.pegmanOnly=!1)):"original"===d&&(a("#virtualTour-mapCanvas").show(),a("#streetViewCanvas").hide(),c.streetViewMap.setVisible(!1))},s=function(b,c,d){var e=a(".controls-back"),f=a(".issues-"+d),g=a(".controls-link"),h=a("html.no-js").length?!0:!1;"streetView"===c?(e.show(),b.originalStreetView&&b.originalStreetView.controls[google.maps.ControlPosition.LEFT_BOTTOM].clear(),h&&(b.streetViewMap.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(f[0]),f.find(".control-issues").show()),b.streetViewMap.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(e[0])):"original"===c?(e.show(),h&&(b.streetViewMap.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(f[0]),f.find(".control-issues").show()),b.originalStreetView.controls[google.maps.ControlPosition.LEFT_BOTTOM].clear(),b.originalStreetView.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(e[0])):"main"===c&&(g.show(),h&&(b.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(f[0]),f.find(".control-issues").show()),b.controls[google.maps.ControlPosition.TOP_LEFT].push(g[0]))},t=function(a){c.originalStreetView&&c.originalStreetView.getVisible()&&c.originalStreetView.setVisible(!1),c.streetViewMap&&c.streetViewMap.getVisible()&&c.streetViewMap.setVisible(!1)},u=function(a){var b,c,d;return a?(b=a.ll||a,b=b.split(","),c=parseFloat(b[0]),d=parseFloat(b[1]),[c,d]):!1};return{init:f,each_image:g,parse_url:h,parse_pano:i,format_url:j,setup_list:k,add_image:l,register_listeners:m,get_location:u,pegmanOnly:d,inStreetViewService:e,add_controls:s}}(window.jQuery,window),chapman.virtualtour.VirtualTourPanel=function(a,b){"use strict";var c=function(){a("#virtualTour-navContainer").on("click",".button",function(b){return b.preventDefault(),a("#virtualTour-detail").removeClass("is-active").empty(),a(b.target).hasClass("primary")?(a(b.target).removeClass("primary"),a("#js-hamburger").removeClass("is-active"),a("#js-jmenu--slide-left").removeClass("is-active"),void a.History.go("")):void g(b)}),a("body").on("click","#virtualTour-attractionHeader",function(){a("#virtualTour-attractionHeader").hasClass("is-fixed")&&(a("#virtualTour-attractionHeader").removeClass("is-fixed"),a("#virtualTour-contentContainer").css("margin-top","0")),a("#virtualTour-attractionHeader").hasClass("move-left")&&a("#virtualTour-attractionHeader").removeClass("move-left"),a("#virtualTour-detail").toggleClass("is-active is-open")}),a("#virtualTour-detail").on("scroll",function(){var b=a("#virtualTour-bxSlider").outerHeight(!0)-a("#virtualTour-attractionHeader").outerHeight(!0)+a("#map-header").outerHeight(!0),c=a(this).scrollTop();c<=b-a(".virtualTour-backButtonContainer").outerHeight(!0)/2&&a("#virtualTour-attractionHeader").removeClass("move-left").promise().done(function(){a("#virtualTour-backButton").removeClass("move-top")}),c>=b-a(".virtualTour-backButtonContainer").outerHeight(!0)/2&&a("#virtualTour-attractionHeader").addClass("move-left").promise().done(function(){a("#virtualTour-backButton").addClass("move-top")}),c>=b?(a("#virtualTour-attractionHeader").addClass("is-fixed"),a("#virtualTour-contentContainer").css("margin-top","86px")):(a("#virtualTour-attractionHeader").removeClass("is-fixed"),a("#virtualTour-contentContainer").css("margin-top","0"))}),a("body").on("click","#virtualTour-backButton",function(c){c.preventDefault(),a("#virtualTour-detail").removeClass("is-open").promise().done(function(){a(this).empty(),"true"===a("#virtualTour-mapBtn").attr("data-active")?(a("#virtualTour-mapBtn").addClass("primary"),b.location.hash="#campus-map"):"true"===a("#virtualTour-tourBtn").attr("data-active")?(a("#virtualTour-tourBtn").addClass("primary"),b.location.hash="#virtual-tour"):(a("#virtualTour-mapBtn").addClass("primary"),a("#virtualTour-panel").hide(),b.location.hash="#campus-map"),a("#js-jmenu--slide-left").hasClass("is-active")||a("#js-jmenu--slide-left").addClass("is-active")})}),a("#virtualTour-goToMapCTA").on("click",function(b){b.preventDefault(),(a("#virtualTour-mapBtn").hasClass("primary")||a("#virtualTour-tourBtn").hasClass("primary"))&&a("#virtualTour-mapBtn, #virtualTour-tourBtn").removeClass("primary"),a("#js-jmenu--slide-left").removeClass("is-active"),a.History.go("")}),a(".virtualTour-categoryCheckboxLabel").click(function(b){a(b.target).prop("checked")&&e("map",b)}),a(".go-to-info").on("click",function(b){b.preventDefault();var c=a(this).data("id");a("#virtualTour-tourBtn").hasClass("primary")&&a("#virtualTour-tourBtn").removeClass("primary"),c&&(chapman.virtualtour.ManagePanels.showDetail(c),a.History.go(c))}),a(".virtual-tour-block button").click(function(a){f.call(this)}),a("#media-close-button").on("click",function(b){b.preventDefault();var c=a(".virtual-tour-block button.undo");f.call(c.parent().find(".media-button"),!0),d({doThis:"showMap",ele:c})}),a(b).load(function(){a(".media iframe").each(function(b,c){var d=a(c).attr("src");a(c).data("src",d),a(c).attr("src","")}),a(".virtual-tour-block").each(function(b,c){a(c).find("input").data("index",b+1)})})},d=function(b){var c=b.ele&&b.ele.parents(".button-group");"showMap"===b.doThis&&b.ele?(c.find(".undo").removeClass("active"),c.find(".media-button").addClass("active"),b.reset||(a(".map-reduce, .street-view-reduce").fadeIn(800),a(".media").removeClass("is-visible"),a(".street-view-reduce").removeClass("hidden"),a(".map-reduce").removeClass("hidden")),a(".smallScreen").show()):"hideMap"===b.doThis&&(c.find(".undo").addClass("active"),c.find(".media-button").removeClass("active"),a(".map-reduce, .street-view-reduce").fadeOut(300,function(){a(this).hide(),a(".media").addClass("is-visible"),a(".street-view-reduce").addClass("hidden"),a(".map-reduce").addClass("hidden")}),a(".smallScreen").hide()),a(".media iframe").each(function(b,c){var d=a(c).attr("src");d&&(a(c).data("src",d),a(c).attr("src",""))}),chapman.virtualtour.Map.chapmanMap&&google.maps.event.trigger(chapman.virtualtour.Map.chapmanMap,"resize")},e=function(b,c){var d,e,f,g,h=[],i=function(b,c){return a(b).each(function(c,d){var e;".virtualTour-categoryCheckbox.parent"===b?(e=a(d).attr("name"),a(":checkbox[name="+e+"]").each(function(b,c){var d,e=a(c);(a(c).prop("checked")||c.checked)&&(e.data().longitude&&e.data().latitude||e.data().kmlUrl)&&(d=chapman.virtualtour.CategoryMenu.createMarkerObject(e),
h.push(d))})):(g=chapman.virtualtour.CategoryMenu.createMarkerObject(a(d)),g.id&&h.push(g))}),c()};"virtualTour"===b?(d=".locations li input",e=".virtualTour-categoryCheckbox.parent",f=!0):(d=".virtualTour-categoryCheckbox.parent",e=".locations li input",f=!1),chapman.virtualtour.CategoryMenu.checkboxChanged(c),i(d,function(){return chapman.virtualtour.Map.addMarkers(h,f)}),h=[],i(e,function(){return chapman.virtualtour.Map.removeMarkers(h,f)})},f=function(b){var c,e=a(".virtual-tour-block button.undo"),f=a(this).data("id"),g=a(this).data("type");b?"audio"===g?(g=".video",c=".audio"):"video"===g&&(g=".audio",c=".video"):"video"===g?(g=".video",c=".audio"):"audio"===g&&(g=".audio",c=".video"),a(this).hasClass("undo")?d({doThis:"showMap",ele:a(this)}):(d({doThis:"showMap",ele:e,reset:!0}),d({doThis:"hideMap",ele:a(this)}),a(".media-block").each(function(b,d){var e,h,i,j=a(d);j.data("id")===f?j.find(".video, .audio").each(function(b,c){e=a(this).find("iframe"),h=e.data("src"),e.attr("src")||e.attr("src",h)}).promise().done(function(){i=j.find(c).find("iframe"),i.attr("src",""),j.find(g).show(),j.find(c).hide()}):(j.find(g).hide(),j.find(c).hide(),j.find(g).find("iframe").attr("src",""),j.find(c).find("iframe").attr("src",""))}))},g=function(c){var f=a(c.target);if(a("#js-hamburger").hasClass("is-active")||a("#js-hamburger").addClass("is-active"),a("#js-jmenu--slide-left").hasClass("is-active")||a("#js-jmenu--slide-left").addClass("is-active"),f.hasClass("tour"))b.location.hash="#virtual-tour",a("#virtualTour-mapBtn").attr("data-active","false"),a("#virtualTour-tourBtn").attr("data-active","true"),a("#virtualTour-tourBtn").addClass("primary"),a("#virtualTour-mapBtn").removeClass("primary"),a("#virtualTour-mainNavigation").hide(),a("#virtualTour-panel").show(),e("virtualTour",c);else if(f.hasClass("map")){b.location.hash="#campus-map",a("#virtualTour-mapBtn").attr("data-active","true"),a("#virtualTour-tourBtn").attr("data-active","false"),a("#virtualTour-mapBtn").addClass("primary"),a("#virtualTour-tourBtn").removeClass("primary");var g=a(".virtual-tour-block button.undo");a("#virtualTour-mainNavigation").show(),a("#virtualTour-panel").hide(),e("map",c),d({doThis:"showMap",ele:g,reset:!1})}};return{switchPanels:g,registerListeners:c,removeOrAddMarkers:e}}(window.jQuery,window),chapman.virtualtour=chapman.virtualtour||{},chapman.virtualtour.Overlays=function(a,b,c){"use strict";var d=function(){e(),f(),g()},e=function(){var c=[];a.each(b,function(b,d){var e=[];a.each(d.coords,function(a,b){var c,d=b;d=d.split(","),c=new google.maps.LatLng(d[0],d[1]),e.push(c)}),c.push(e)}),a.each(c,function(a,b){var c=new google.maps.Polygon({path:b,strokeColor:"#98002e",strokeWeight:2,strokeOpacity:.25,fillColor:"#98002e",fillOpacity:.05,map:chapman.virtualtour.Map.chapmanMap});return c})},f=function(){var a=chapman.virtualtour.Map.chapmanMap;chapman.virtualtour.StreetViewBar.add_controls(a,"main","map")},g=function(){a(".controls-back").click(function(b){b.preventDefault();var c=chapman.virtualtour;c.originalStreetView&&c.originalStreetView.getVisible()&&c.originalStreetView.setVisible(!1),c.streetViewMap&&c.streetViewMap.getVisible()&&c.streetViewMap.setVisible(!1),c.StreetViewBar.inStreetViewService?(c.StreetViewBar.inStreetViewService=!1,c.StreetViewBar.pegmanOnly=!0):c.StreetViewBar.pegmanOnly=!1,a("#virtualTour-mapCanvas").show(),a("#streetViewCanvas").hide(),a("#virtualTour-detail").is(":empty")||a("#virtualTour-detail").addClass(a("#virtualTour-detail").hasClass("has-content")?"is-open":"is-active"),a("#map-header, #virtualTour-streetView").fadeIn(500)})};return{init:d}}(window.jQuery,window.overlayJson);