const socket = io()

socket.on("connect", () => {
  console.log("Connected to the server");
})

const appendMessage = msg => {

  let {email, date, message} = msg

  document.getElementById("chat").innerHTML += `
    <div class="card">
      <div class="card-header">
        ${email}
      </div>
      <div class="card-body">
        <p class="card-text">${date}: ${message} </p>
      </div>
    </div>
  `
}

socket.on("updateMessages", allMessages => {
  document.getElementById("chat").innerHTML=""

  allMessages
    .sort((a,b) => a.date - b.date)
    .map(msg => appendMessage(msg))
})

socket.on("newMessage", msg => appendMessage(msg))



const sendMsg = () => {
  const email = document.getElementById("email").innerHTML
  console.log({email});
  const msg = document.getElementById("message")
  console.log({msg: msg.value});

  socket.emit("postMessage", {
    email,
    message: msg.value,
    type: "CUSTOMER"
  })
  message.value=""
}

