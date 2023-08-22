(()=>{
    const ele =document.createElement("script");
    ele.src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.21.1/axios.js";
    document.head.appendChild(ele);
    ele.addEventListener("load",()=>{
        axios.defaults.headers = {
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache',
            'Expires': '0',
        };
        axios.get("https://raw.githubusercontent.com/Zyrica-Caspeco/tools/master/dist/index.js").then(({data})=>{
            const ele = document.createElement("script");
            ele.innerHTML = data;
            document.head.appendChild(ele);
        });
    })
})();