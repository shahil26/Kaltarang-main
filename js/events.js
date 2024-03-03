function getHandle(id){
    return document.getElementById(id)
}
function getEvents(list, value) {
    for (let i = 1; i < list[1].length; i++) {
        getHandle(list[1][i].value).style.display = 'none';
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


const selectHandle = getHandle('event-type')
selectHandle.addEventListener('change', event => getEvents(event.target.parentNode.children,  event.target.value))