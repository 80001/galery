import GoToSearch from "../components/URLs/goToSearch"

export const searchURL = () => {
    let location = window.location.href

    let searchUrl = 'x'
    let pageUrl = 'x'
    console.log(location)
    if (location.match('/s/')) {
        searchUrl = location.split('/')[4]
        if (searchUrl.match('%20')) {
            searchUrl = searchUrl.replace('%20', ' ');
        }
        pageUrl = location.split('/')[5]
    }
    console.log(searchUrl, pageUrl)
    //GoToSearch(searchUrl, pageUrl)
}
export const goToSearchURL = () => {
    let location = window.location.href
    let search = 'x'
    let page = 'x'
    if (location.match('/s/')) {
        search = location.split('/')[4]
        page = location.split('/')[5]
    }
}