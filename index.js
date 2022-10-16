const express = require("express");
const app = express();
const mpi = require("mc-player-api");

app.get("/", (req, res) => {
  res.send(`
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>MinecraftSkins</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">
        <style>
    body {
    position: fixed;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    }
    </style>
  </head>
  <body>
  <section class="section">
    <div class="container">
      <h1 class="title">
        MinecraftSkins
      </h1>
      <p class="subtitle">
        The <strong>Open Sourced</strong> alternative to NameMC.
      </p>
      <input name="username" class="input is-primary" id="username" type="text" placeholder="Enter a player username, and hit enter!">
    </div>
  </section>
  </body>
  <script>
    var input = document.getElementById("username");
    input.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        var value = document.getElementById("username").value;
        if(value === ""){
          window.location.href = "https://minecraftskins.ga/search/0";
        } else {
          window.location.href = "https://minecraftskins.ga/search/" + value;
        }
      }
    });
  </script>
</html>
  `)
});

app.get("/search/:uname", (req, res) => {
  if (req.params.uname === "0") {
    res.send(`
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>MinecraftSkins</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">
        <style>
    body {
    position: fixed;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    }
    </style>
  </head>
  <body>
  <section class="section">
    <div class="container">
      <h1 class="title">
        MinecraftSkins
      </h1>
      <p class="subtitle">
        <strong>Hey!</strong> You forgot to add the username of the player you are looking for!
      </p>
    </div>
  </section>
  </body>
  <script>
    
  </script>
</html>
  `)
  } else {
    var username = req.params.uname;
    const mpi = require("mc-player-api");

    mpi.getUser(username).then(user => {
      console.log(user) //For debugging only
      var head = user['skin_renders']['head_render'];
      var head2 = user['skin']['avatar'];
      var full = user['skin_renders']['body_render'];
      var skinfile = user['skin']['skin_url'];
      var uuid = user['uuid'];
      res.send(`
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>MinecraftSkins</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">
    <style>
    body {
    position: fixed;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    }
    </style>
  </head>
  <body>
  <section class="section">
    <div class="container">
      <h1 class="title">
        MinecraftSkins
      </h1>
      <p class="subtitle">
        Results for <strong>${req.params.uname}</strong>
      </p>

<div class="box">
  <article class="media">
    <div class="media-left">
      <figure class="image is-64x64">
        <img src="${head2}" alt="Head of player">
      </figure>
    </div>
    <div class="media-content">
      <div class="content">
        <p>
          <strong>${req.params.uname}</strong> <small>${uuid}</small>
          <br>
          <button class="button is-link is-rounded" onclick="location.href='${skinfile}';">Download Skin</button>
          <button class="button is-success is-rounded" onclick="navigator.clipboard.writeText('${uuid}')">Copy UUID</button>
          <br>
        </p>
      </div>
    </div>
  </article>
</div>
      
    </div>
  </section>
  </body>
  <script>
    
  </script>
</html>
  `)
    });
  }
})

app.listen(8080);