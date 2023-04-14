
const QuickStarter = ({element = "#quick",initTop = 0,buttonList, sectionList} = {}) => {

    let _data;
    let _element;

    const init = () => {
        return {
            target : _element,
            _quickTop: parseInt(window.getComputedStyle(_element).top),
            _quickHeight: _element.getBoundingClientRect().height,
            _quickComputedTop: parseInt(window.getComputedStyle(_element).top) - initTop,
            _targetElList: _element.querySelectorAll("button"),
            _footerSize: document.getElementById("footer").getBoundingClientRect().height
        }
    }

    const _targetElList = buttonList.map((item)=>{return document.querySelector(`${item} button`)});
    const _stick = () => {
        const doc = document.documentElement;
        const top = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);
        const diff = top - _data._quickComputedTop;
        const marginTopBottom = 50;
        const fullSize = document.body.getBoundingClientRect().height;
        const footerSize = _data._footerSize;
        const quickSize = _data._quickHeight;
        const bottomEnd = fullSize - footerSize - quickSize - marginTopBottom*2;
        
        if(top > _data._quickComputedTop  && top < bottomEnd){
            _data.target.style.transform = "translate(0, "+  (diff+marginTopBottom) +"px)";
            _data.target.style.transition = "transform 0.5s ease";
        }

        if(top < _data._quickComputedTop){
            _data.target.style.transform = "";
        }
    }
    const eventSectionList = document.querySelectorAll(sectionList.join(","));
    document.onreadystatechange = () => {
        if (document.readyState === "complete" || document.readyState === "loaded") {
            _element = !_element && document.querySelector(element);
            _data = init();
            _data?._targetElList.forEach((item,idx)=>{
                item.addEventListener("click", (event)=>{
                    const offset = window.pageYOffset;
                    event.preventDefault();
                    event.target.closest("li").parentNode.querySelectorAll("li").forEach(( item )=>{
                        item.classList.remove("active");
                    });
                    event.target.closest("li").classList.add("active");
                    window.scrollTo({
                        top : document.querySelector(sectionList[idx]).getBoundingClientRect().top + offset - 100,
                        behavior:'smooth'
                    });
                })
            });
            _stick();
        }
    };

    window.addEventListener("scroll", ()=>{
        const offset = window.pageYOffset;
        if(_data) {
            _stick();
            [...eventSectionList].map((item,idx,List)=>{ 
                if(idx !== List.length - 1){
                    if( $(window).scrollTop() < List[idx+1].getBoundingClientRect().top + offset - 300 && $(window).scrollTop() >= List[idx].getBoundingClientRect().top + offset - 300){
                        _data.target.querySelectorAll("li")[idx].classList.add("active");
                    }else{
                        _data.target.querySelectorAll("li")[idx].classList.remove("active");
                    }
                }else{
                    if(  $(window).scrollTop() > List[idx].getBoundingClientRect().top + offset - 300 ){
                        _data.target.querySelectorAll("li")[idx].classList.add("active");
                    }else{
                        _data.target.querySelectorAll("li")[idx].classList.remove("active");
                    }
                }
            });
        }
    });
}
QuickStarter({element:"#quick",initTop:200,buttonList:["#quick li:nth-child(1)","#quick li:nth-child(2)","#quick li:nth-child(3)"], sectionList:[".event1",".event2",".event3"]});