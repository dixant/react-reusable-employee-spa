export function showLoader(){
    console.log("show");
    let el = document.getElementById('load');
    el.classList.remove('hide');
    el.classList.add('show');
}
export function hideLoader(){
    let el = document.getElementById('load');
    el.classList.remove('show');
    el.classList.add('hide');
}