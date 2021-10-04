
// 新增class到body身上來控制headUP的出現與消失
var bodyClass = document.body.classList, lastScrollY = 0;
// 判斷滾動調的上下來決定新增與消失
window.addEventListener('scroll', function () {
    var mouse = this.scrollY;
    if (mouse <= lastScrollY ) {
        bodyClass.remove('headUP');
    } else {
        bodyClass.add('headUP');
    }
    lastScrollY = mouse;
}
)
