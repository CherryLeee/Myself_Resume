~function () {
    let computed = function () {
        let desW = 640,
            devW = document.documentElement.clientWidth;
        if (devW >= 640) {
            document.documentElement.style.fontSize = "100px";
            return;
        }
        document.documentElement.style.fontSize = (devW / desW) * 100 + "px";
    };
    computed();
    window.addEventListener("resize",computed,false);
}();