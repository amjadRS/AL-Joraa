fetch("components/header.html")
  .then(res => res.text())
  .then(data => {
    document.getElementById("header").innerHTML = data;

    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    if (menuToggle && navLinks) {

        // فتح/إغلاق القائمة
        menuToggle.addEventListener("click", (e) => {
            e.stopPropagation(); // يمنع الإغلاق الفوري
            navLinks.classList.toggle("active");
        });

        // إغلاق عند الضغط على أي رابط
        navLinks.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("active");
            });
        });

        // إغلاق عند الضغط خارج القائمة
        document.addEventListener("click", (e) => {
            if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
                navLinks.classList.remove("active");
            }
        });
    }
});
  

fetch("components/footer.html")
  .then(res => res.text())
  .then(data => document.getElementById("footer").innerHTML = data);

console.log("JS works");