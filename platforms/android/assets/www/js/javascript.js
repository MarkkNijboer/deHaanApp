window.onerror = function(msg, url, line, col, error) {
   // Note that col & error are new to the HTML 5 spec and may not be
   // supported in every browser.  It worked for me in Chrome.
   var extra = !col ? '' : '\ncolumn: ' + col;
   extra += !error ? '' : '\nerror: ' + error;

   // You can view the information in an alert to see things working like this:
   alert("Error: " + msg + "\nurl: " + url + "\nline: " + line + extra);

   // TODO: Report this error via ajax so you can keep track
   //       of what pages have JS issues

   var suppressErrorAlert = true;
   // If you return true, then error alerts (like in older versions of
   // Internet Explorer) will be suppressed.
   return suppressErrorAlert;
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
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
      if (xhttp.readyState == 4 && xhttp.status == 200) {
         document.getElementById("page-content").innerHTML = xhttp.responseText;
         document.getElementById("page-name").innerHTML = name;
         document.getElementById("spinner").style.display="none";
         document.getElementById("page-content").style.display="block";
         checkCodeToExecute(name);
      }
  };
  xhttp.open("GET", page, true);
  xhttp.send();
}
loadPage("templates/home.html", "Home");

function execLink(href, name) {
  document.getElementById("spinner").style.display="block";
  document.getElementById("page-content").style.display="none";
  document.querySelector(".mobile-menu").classList.remove("open");
  document.querySelector(".menu-overlay").classList.remove("open");
  loadPage(href, name);
}
function checkCodeToExecute(name) {
  if(typeof codeToExecute[name] !== "undefined") {
    codeToExecute[name]();
  }
}

$(function() {
  $(document).on("click", "[data-link]", function() {
    execLink(this.getAttribute("data-href"), this.getAttribute("data-name"));
  });

  $(".flipbook").on("swipeleft", function() {
    console.log("test")
    $(".flip-item").hide();
    $(".flip-item.active").removeClass("active").next().addClass("active").show();
  });
});