function getHandle(id){
    return document.getElementById(id)
}
function getHandleClass(className){
    return document.querySelector('.' + className)
}
function getEvents(list, value) {
    for (let i = 1; i < list.length; i++) {
        getHandle(list[i].id).style.display = 'none';
    }
    if (value === 'nill') return;
    getHandle(value).style.display = 'block';
}
function showEvents(element){
    if (element.className == 'pro-night' && getHandle('pro-night').style.display == 'none') {
        getHandle('pro-night').style.display = 'block';
        getHandle('competitions').style.display = 'none';
        getHandle('timeline').style.display = 'none';
    }
    if (element.className == 'competitions' && getHandle('competitions').style.display == 'none') {
        getHandle('pro-night').style.display = 'none';
        getHandle('competitions').style.display = 'block';
        getHandle('timeline').style.display = 'none';
    }
    if (element.className == 'timeline' && getHandle('timeline').style.display == 'none') {
        getHandle('pro-night').style.display = 'none';
        getHandle('competitions').style.display = 'none';
        getHandle('timeline').style.display = 'block';
    }
}

function showAlert(id){
    alert(id + '.pdf is being downloaded. Kindly check your downloads folder if the file does not open right away.');    
}

function downloadFile(id) {
    var link = document.createElement('a');

    link.href = 'docs/' + id + '.pdf';

    link.download = id + '.pdf';

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    showAlert(id);
}

gsap.registerPlugin(ScrollTrigger);

const columns = document.querySelectorAll(".event-card");

columns.forEach((column) => {
    const opacity = window.innerWidth < 1000 ? 0 : 0;

    gsap.from(column, {
        scrollTrigger: {
            trigger: column,
            start: "top bottom",
            end: "bottom 80%",
            scrub: 0.5,
            markers: false,
            toggleActions: "restart pause reverse pause",
        },
        opacity: opacity,
        opacity: 0,
        duration: 0.1,
        ease: "power1.inOut",
    });
});

function showSchedule(element, value){
    for (let i=0; i<element.length; i++) {
        getHandle(element[i].id).style.display = 'none';
    }
    if (value === 'nill') return;
    getHandle(value).style.display = 'block';
}



const selectHandle = getHandle('event-type')
selectHandle.addEventListener('change', event => getEvents(event.target.parentNode.children,  event.target.value))

const selectHandleSchedule = getHandle('select-schedule')
selectHandleSchedule.addEventListener('change', event => showSchedule(event.target.parentNode.parentNode.children[1].children,  event.target.value))
