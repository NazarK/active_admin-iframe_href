/* version 2.0 */
/* don't click if ctrl key pressed */
/* height in vh */
/* keep scroll top on iframe_href_close */
/* version 2.1
/* restore scroll position on close going to index */

function iframe_href_closed_check() {
  //in iframe
  if(window.self !== window.top) {
    $("body").addClass("in_iframe")
    $(".header, #footer, #title_bar, li.cancel").hide()
    if($("body.index").length>0) {
        parent.iframe_href_close()
    }
  }

}

$(document).on("turbolinks:load",function() {

  $("body.active_admin").find(".member_link.view_link, .action_item a[href$='new'], .edit_link.member_link, .blank_slate a").addClass("iframe_href").removeAttr("target")

  iframe_href_closed_check()
})

$(document).keydown(function(e) {
  if(e.keyCode==27) {
    if(window.self !== window.top) {
      parent.iframe_href_close({no_reload:true})
      e.preventDefault()
      //window.parent.postMessage("close_iframe_href","*")
    } else {
      $(".iframe-dlg-close").click()    
    }    
  }
})

$(window).on("message", function(e) {
    var message = e.originalEvent.data;  // Should work.
    if(message=="close_iframe_href") {
      console.log("got message: close_iframe_href")
      $(".iframe-dlg-close").click()
      Turbolinks.visit(window.location, { action: 'replace' })
    }
});

$(document).on("turbolinks:render",function() {
  if(Turbolinks.restore_position) {
    $(document).scrollTop(Turbolinks.top);
    $(document).scrollLeft(Turbolinks.left);
    Turbolinks.restore_position = false;
  }

})
window.iframe_href_close = function(opts={}) {
  console.log("iframe_href_close", {opts})
  $('.dlg-overlay').remove();
  if(!opts.no_reload) {
    Turbolinks.top = $(document).scrollTop();
    Turbolinks.left = $(document).scrollLeft();
    Turbolinks.restore_position = true;
    Turbolinks.clearCache()
    Turbolinks.visit(window.location, { action: 'replace' })
  }
}

window.iframe_href = function(href, data) {
  $("body").append("<div class='dlg-overlay' style='z-index:1000;position:fixed;top:0;left:0;bottom:0;right:0;background:rgba(0,0,0,0.2);' onclick=\"iframe_href_close({no_reload:true})\"></div>")
  var height = data.iframeHeight || "96vh" 
  var width = data.iframeWidth || "80%" 
  var style = data.iframeStyle || "";
  var close_btn = data.iframeCloseBtn || "Отмена"
  var refresh_on_close = ""
  if(data.iframeOnCloseReload)
    refresh_on_close = "Turbolinks.visit(window.location, { action: 'replace' })"
  $("body .dlg-overlay").append("<div class='dlg' style='position:relative;background:white;border-radius:4px;border:1px solid rgb(221,221,221);padding:0px;top:2vh;z-index:1001;margin:0 auto; width:"+width+"; height: "+height+";"+style+"'><iframe style='width:100%;height:calc( 100% - 45px );border:none;'></iframe><button style='float:left;margin: 0 20px;margin-top:5px;' class='btn btn-default iframe-dlg-close' onclick=\"iframe_href_close({no_reload:true});"+refresh_on_close+"\">"+close_btn+"</button></div>")
  $(".dlg-overlay .dlg iframe").attr("src",href)  
}

$(document).on("click",".iframe_href",function(e) {
  console.log("iframe_href click")
  if(e.ctrlKey==false) {
    e.preventDefault()
    iframe_href($(this).attr("href"),$(this).data())
  }
});
