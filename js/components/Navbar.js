//custom elements

class Navbar extends HTMLElement {
    constructor () {
        super();
        this.innerHTML = `
        <nav class="navbar navbar-expand-lg navbar-light bg-light mb-5" dir="ltr">
            <div class="container">
            <a class="navbar-brand" href="/">
               
                <span class="navbar-text ms-3">
                    Dell<span style="color: #e67e22">Vento</span>
                </span>
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                <li class="nav-item">
                    <a class="nav-link active me-3" aria-current="page" href="/">Home</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link active me-3" href="#"> About DellVento </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link active me-3" href="/products.html">Products</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link active me-3" href="#">My account</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link active me-3" href="/shopping.html">
                    
                    <i class="fas fa-shopping-cart"></i> <span id="added-products">0</span> Card </a>
                </li>
                <li class="nav-item">
                    <a style="background-color: #e67e22; border-radius: 5%; color: white" role="button" id="login-logout-btn" class="nav-link active me-3" href="/login.html">Login </a>
                </li>
                </ul>
            </div>

            </div>
</nav>
        `
    }
}


window.customElements.define('nav-bar', Navbar)

