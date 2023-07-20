var button = document.getElementById("nav-button");
button.addEventListener("click", function () {
  window.location.href = "emergency.html";
});

function openContact(evt, contactType) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(contactType).style.display = "block";
  evt.currentTarget.className += " active";
}
