const divs = document.querySelectorAll(".target")

if (divs.length) {

    divs.forEach(div => {
        let isMoving = false;
        let isFixed = false;
        let offsetX, offsetY;
        let lastPosX = div.offsetLeft;
        let lastPosY = div.offsetTop;

        div.addEventListener('mousedown', (e) => {
            isMoving = true;
            offsetX = e.clientX - div.offsetLeft;
            offsetY = e.clientY - div.offsetTop;

            div.style.zIndex = 10;
        })
        div.addEventListener('dblclick', (e) => {
            isFixed = true;
            offsetX = e.clientX - div.offsetLeft;
            offsetY = e.clientY - div.offsetTop;

            div.style.backgroundColor = 'blue';
            div.style.zIndex = 10;
        })
        div.addEventListener('mousemove', (e) => {
            if (isMoving || isFixed) {
                div.style.left = `${e.clientX - offsetX}px`;
                div.style.top = `${e.clientY - offsetY}px`;
            }
        })
        div.addEventListener('mouseup', (e) => {
            isMoving = false;
            div.style.zIndex = '';

            lastPosX = div.offsetLeft;
            lastPosY = div.offsetTop;
        })

        div.addEventListener('click', (e) => {
            div.style.backgroundColor = 'red';
            div.style.zIndex = '';
            isFixed = false;
            lastPosX = div.offsetLeft;
            lastPosY = div.offsetTop;
        })
        document.addEventListener("keydown", (e) => {
            if (e.code == "Escape") {
                if (isFixed || isMoving) {
                    isFixed = false;
                    isMoving = false;

                    div.style.backgroundColor = 'red';
                    div.style.zIndex = '';

                    div.style.left = lastPosX + 'px';
                    div.style.top = lastPosY + 'px';
                }
            }
        });


        //Lab 6
        let lastTouchTime = 0;
        let isFollowing = false;
        let followMode = false;

        function handleDoubleTap() {
            const now = new Date().getTime();
            const timeSinceLastTouch = now - lastTouchTime;

            if (timeSinceLastTouch > 0 && timeSinceLastTouch < 300) {
                isFollowing = true;
                setTimeout(()=> { followMode = true;}, 800)
            }
            lastTouchTime = now;
        }

        div.addEventListener("touchstart", (e) => {
            
            handleDoubleTap();

            isMoving = true;

            let touch = e.touches[0];
            offsetX = touch.clientX - div.offsetLeft;
            offsetY = touch.clientY - div.offsetTop;
            div.style.zIndex = 10;
        })
        div.addEventListener("touchmove", (e) => {
            if (isMoving) {
                let touch = e.touches[0];
                div.style.left = `${touch.clientX - offsetX}px`;
                div.style.top = `${touch.clientY - offsetY}px`;
            }
        })
        div.addEventListener("touchend", (e) => {
            isMoving = false;
            div.style.zIndex = '';

            lastPosX = div.offsetLeft;
            lastPosY = div.offsetTop;
        })
        document.addEventListener("touchstart", (e) => {
            if (e.touches.length > 1) {
                isFollowing = false;
                isMoving = false;

                div.style.zIndex = '';

                div.style.left = lastPosX + 'px';
                div.style.top = lastPosY + 'px';
                return;
            }

            if (isFollowing) {
                let touch = e.touches[0];
                div.style.left = `${touch.clientX - offsetX}px`;
                div.style.top = `${touch.clientY - offsetY}px`;
                div.style.zIndex = 10;
            }
        })
        document.addEventListener("touchmove", (e)=>{
            if(isFollowing){
                let touch = e.touches[0];
                div.style.left = `${touch.clientX - offsetX}px`;
                div.style.top = `${touch.clientY - offsetY}px`;
            }
        })
        document.addEventListener("touchend", (e) => {
            if (isFollowing) {
                let distance  = div.offsetLeft - lastPosX + div.offsetTop - lastPosY;
                if(distance===0 && followMode){
                    isFollowing = false;
                    followMode = false;
                }
                div.style.zIndex = '';
            }
        })
    })
}