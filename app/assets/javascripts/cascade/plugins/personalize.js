// Personalize 
var BREI=BREI||{};BREI.Personalization={config:{recentPagesLength:20,recentSearchesLength:20,favoritesLength:-1,trackCurrentPage:true,pagesKey:"BREI.RECENTP",searchesKey:"BREI.RECENTS",favoritesKey:"BREI.FAV",subjRem:""},init:function(a){var b=this.pushToRecentPages,c=window.location.href,d=document.title;if(typeof a!="undefined"){this.config=$.extend(this.config,a)}if(this.config.subjRem!=""){var e=new RegExp(this.config.subjRem);d=d.replace(e,"")}if(this.config.trackCurrentPage){b.call(this,c,d)}},gp:function(a,b,c,d){var e=b,f=e.length,g=0,h=false;if(e[0]!=null){for(;g<f;g+=1){if(e[g].url===a.url){h=true;break}}}if(!h){e.push(a)}if(c!=-1&&f+1>c){e.shift(1)}d.call(this,e)},gps:function(a,b,c,d){var e=b,f=e.length,g=0,h=false;if(e[0]==""){f=0}for(;g<f;g+=1){if(e[g]===a){h=true;break}}if(!h){e.push(a)}if(c!=-1&&f+1>c){e.shift(1)}d.call(this,e)},has:function(a){var b=this.getFavorites(),c=b.length,d=0,e=false;if(b[0]!=null){for(;d<c;d+=1){if(b[d].url===a){e=true}}}return e},pushToRecentPages:function(a,b){if(this.config.subjRem!=""){var c=new RegExp(this.config.subjRem);b=b.replace(c,"")}pitem={url:a,sub:b};this.gp(pitem,this.getRecentPages(),this.config.recentPagesLength,this.setRecentPages)},getRecentPages:function(){return amplify.store(this.config.pagesKey)||[]},setRecentPages:function(a){amplify.store(this.config.pagesKey,a)},pushToRecentSearches:function(a){this.gps(a,this.getRecentSearches(),this.config.recentSearchesLength,this.setRecentSearches)},getRecentSearches:function(){return amplify.store(this.config.searchesKey)||[]},setRecentSearches:function(a){amplify.store(this.config.searchesKey,a)},pushToFavorites:function(a,b){if(this.config.subjRem!=""){var c=new RegExp(this.config.subjRem);b=b.replace(c,"")}pitem={url:a,sub:b};this.gp(pitem,this.getFavorites(),this.config.favoritesLength,this.setFavorites)},removeFavorite:function(a){var b=this.getFavorites(),c=-1,d=b.length,e=0;for(;e<d;e+=1){if(a===b[e].url){c=e;break}}if(c!=-1){b.splice(e,e+1);this.setFavorites(b)}},getFavorites:function(){return amplify.store(this.config.favoritesKey)||[]},setFavorites:function(a){amplify.store(this.config.favoritesKey,a)}};