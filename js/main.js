//Main Varibles
let theInput = document.querySelector(".get-repos input");
let getButton = document.querySelector(".get-button");
let reposData = document.querySelector(".show-data");

getButton.onclick = function () {
  getRepos();
};

//Get Repos Function
function getRepos() {
  if (theInput.value === "") {
    //if the value is empty

    reposData.innerHTML = `<span>Please write Github User name</span>`;
  } else {
    fetch(`https://api.github.com/users/${theInput.value}/repos`)
      .then((response) => response.json())
      .then((repositories) => {
        //Empty The Container
        reposData.innerHTML = "";

        repositories.forEach((repo) => {
          //create the main div element
          let mainDiv = document.createElement("div");

          //create repo name text

          let repoName = document.createTextNode(repo.name);
          //append the text to main div

          mainDiv.appendChild(repoName);

          //Create Repo Url Anchor
          let theUrl = document.createElement("a");

          //Create Repo Url Text
          let theUrlText = document.createTextNode("visit");

          //Append theUrlText To  Anchor Tag
          theUrl.appendChild(theUrlText);

          //Add The HyperText Referance "href"
          theUrl.href = `https://github.com/${theInput.value}/${repo.name}`;

          //Set Attribute Target Blank
          theUrl.setAttribute("target", "_blank");

          //Append theUrl Anchor To The Main Div
          mainDiv.appendChild(theUrl);

          //Create Start Count Span
          let startsSpan = document.createElement("span");

          //Create The Stars Count Text
          let starsText = document.createTextNode(
            `stars ${repo.stargazers_count}`
          );

          //Add Stars Count Text To Stars Span
          startsSpan.appendChild(starsText);

          //Append Stars Count Span To Main Div
          mainDiv.appendChild(startsSpan);

          //Add Class On mainDiv

          mainDiv.className = "repo-box";

          //Append the main div to container
          reposData.appendChild(mainDiv);
        });
      });
  }
}
