const searchBox = document.getElementById("search")
const mainContent = document.getElementById("main")

const API = "https://api.github.com/users/";

const getUser = async (username) => {
    const response = await fetch(API + username)
    const data = await response.json()
   const  card = `
     <div class="card">
            <div>
                <img class="avatar" src="${data.avatar_url}" alt="Florin Pop">
            </div>
            <div class="user-info">
                <h2>${data.name}</h2>
                <p>${data.bio}</p>

                <ul class="info">
                    <li>${data.followers}<strong>Followers</strong></li>
                    <li>${data.following}<strong>Following</strong></li>
                    <li>${data.public_repos}<strong>Repos</strong></li>
                </ul>

                <div id="repos">
                   
                </div>
            </div>
        </div>
    `
    mainContent.innerHTML = card
    getRepos(username)

}

const getRepos = async(username) => {
    const repos = document.getElementById("repos")
    const response = await fetch(API + username + "/repos")
    const data = await response.json()
    data.forEach((items)=>{
        const elem = document.createElement("a")
        elem.classList.add("repo")
        elem.href= items.html_url
        elem.innerText = items.name
        elem.target = "_blank"
        repos.appendChild(elem)
    })
    }
const formSubmit = () => {
    if(searchBox !== ""){
        getUser(searchBox.value)
        searchBox.value = ""
    }
    return false
}
searchBox.addEventListener(
    "focusout",
    function() {
        formSubmit()
    }
)