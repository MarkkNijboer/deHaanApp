window.onerror = function(msg, url, line, col, error) {
   // Note that col & error are new to the HTML 5 spec and may not be
   // supported in every browser.  It worked for me in Chrome.
   var extra = !col ? '' : '\ncolumn: ' + col;
   extra += !error ? '' : '\nerror: ' + error;

   // You can view the information in an alert to see things working like this:
   document.write("Error: " + msg + "\nurl: " + url + "\nline: " + line + extra);

   // TODO: Report this error via ajax so you can keep track
   //       of what pages have JS issues

   var suppressErrorAlert = true;
   // If you return true, then error alerts (like in older versions of
   // Internet Explorer) will be suppressed.
   // return suppressErrorAlert;
};

document.querySelector(".menu-click").addEventListener("click", function() {
  document.querySelector(".mobile-menu").classList.toggle("open");
  document.querySelector(".menu-overlay").classList.toggle("open");
}, true);
document.querySelector(".menu-overlay").addEventListener("click", function() {
  document.querySelector(".mobile-menu").classList.remove("open");
  document.querySelector(".menu-overlay").classList.remove("open");
}, true);
var codeToExecute = {
  "Brochure" : function() {
    var flipbook = document.querySelector(".flipbook");
    getFirstChild(flipbook).style.display="block";
    getFirstChild(flipbook).classList.add("active");

    var hammertime = new Hammer(flipbook, {});
    hammertime.on('swipeleft', function(ev) {
      if ($(".flipbook-item.active").next().length != 0) {
        $(".flipbook-item.active").removeClass("active").next().addClass("active");
        $("#page-page-current").text($(".flipbook-item.active").prevAll().length + 1);
      }
    });
    hammertime.on('swiperight', function(ev) {
      if ($(".flipbook-item.active").prev().length) {
        $(".flipbook-item.active").removeClass("active").prev().addClass("active");
        $("#page-page-current").text($(".flipbook-item.active").prevAll().length + 1);
      }
    });
    $("#page-page-current").text('1');
    $("#page-page-max").text($(".flipbook-item").length);
  }
};
function getFirstChild(el){
  var firstChild = el.firstChild;
  while(firstChild != null && firstChild.nodeType == 3){ // skip TextNodes
    firstChild = firstChild.nextSibling;
  }
  return firstChild;
}

function loadPage(page, name) {
  $(function() {
    $.get(page, function(data, status){
        $("#page-content").html(data);
        $("#page-name").html(name);
        $("#spinner").hide();
        $("#page-overlay").hide();
        $("#page-content").show();
    });
    checkCodeToExecute(name);
  });
}
loadPage("templates/home.html", "Home");

function execLink(href, name) {
  $(function() {
    $("#spinner").show();
    $("#page-content").hide();
    $(".mobile-menu").removeClass("open");
    $(".menu-overlay").removeClass("open");
    loadPage(href, name);
  });
}
function checkCodeToExecute(name) {
  if(typeof codeToExecute[name] !== "undefined") {
    codeToExecute[name]();
  }
}

$(function() {
  $("[data-link]").on("click", function() {
    console.log("click");
    execLink(this.getAttribute("data-href"), this.getAttribute("data-name"));
  });
  $(document).on("click", "[data-link]", function() {
    console.log("click");
    execLink(this.getAttribute("data-href"), this.getAttribute("data-name"));
  });
});
