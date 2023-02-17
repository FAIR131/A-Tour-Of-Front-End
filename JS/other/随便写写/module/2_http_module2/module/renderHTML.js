
function renderHTML(url) {
    switch (url) {
        case '/home':
            return `
    <html> 
    <div>home</div>
    </html>
    `
        case '/list':
            return `
    <html> 
    <div>list</div>
    </html>
    `

        default:
            return `
    <html> 
    <div>404</div>
    </html>
    `
    }

}

module.exports = {
    renderHTML
}