const socket = io()

socket.on("connect", () => {
  console.log("Connected to the server");
})

const appendMessage = msg => {

  let {email, createdAt, message} = msg

  const date = new Date(createdAt)
  const options = {
    dateStyle: "short",
    timeStyle: "short"
  }

  document.getElementById("chat").innerHTML += `
  <li><span><b>${email}:</b> ${message}</span> <span class="fw-light">${new Intl.DateTimeFormat("default", options).format(date)}</span> </li>
  `
}

socket.on("updateMessages", allMessages => {
  document.getElementById("chat").innerHTML=""
  
  // allMessages
    // .sort((a,b) => a.createdAt - b.createdAt)
    // .map(msg => appendMessage(msg))

  allMessages.map(msg => appendMessage(msg))

  

})

socket.on("newMessage", msg => appendMessage(msg))



const sendMsg = () => {
  const email = document.getElementById("email").innerHTML
  const msg = document.getElementById("message")

  socket.emit("postMessage", {
    email,
    message: msg.value,
    type: "CUSTOMER"
  })
  message.value=""
  window.location.reload()
}

