const socket = io("ws://localhost:3000");
const { RTCPeerConnection, RTCSessionDescription } = window;

const servers = {
  iceServers:[
    {
      urls:['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302']
    }
  ]
};

const peerConnection = new RTCPeerConnection(servers);

let isAlreadyCalling = false;
let getCalled = false;
let localStream;
let remoteStream;

socket.on('update-user-list', ({ users }) => {
  updateUserList(users);
});

socket.on('remove-user', ({ socketId }) => {
  removeUser(socketId);
});

socket.on('call-made', async (data) => {
  if (getCalled) {
    const confirmed = confirm(
      `User "Socket: ${data.socket}" wants to call you. Do accept this call?`
    );

    if (!confirmed) {
      socket.emit("reject-call", {
        from: data.socket
      });

      return;
    }
  }

  // set offer recieved from caller in remote session description.
  await peerConnection.setRemoteDescription(
    new RTCSessionDescription(data.offer)
  );

  const answer = await peerConnection.createAnswer();
  await peerConnection.setLocalDescription(
    new RTCSessionDescription(answer)
  );

  socket.emit('make-answer', {
    answer,
    to: data.socket
  });

  getCalled = true;
});

socket.on('answer-made', async (data) => {
  await peerConnection.setRemoteDescription(
    new RTCSessionDescription(data.answer)
  );

  if (!isAlreadyCalling) {
    callUser(data.socket);
    isAlreadyCalling = true;
  }
})

socket.on('call-rejected', data => {
  alert(`User: "Socket: ${data.socket}" rejected your call.`);
  unselectUsersFromList();
});

function updateUserList(socketIds) {
  const activeUserContainer = document.getElementById('active-user-container');

  socketIds.forEach(socketId => {
    const existingUser = document.getElementById(socketId);

    if (!existingUser) {
      const newUserContainer = createUserItemContainer(socketId);
      activeUserContainer.appendChild(newUserContainer);
    }
  })
}

function createUserItemContainer(socketId) {
  const userContainerEl = document.createElement("div");
  
  const usernameEl = document.createElement("p");
  
  userContainerEl.setAttribute("class", "active-user");
  userContainerEl.setAttribute("id", socketId);
  usernameEl.setAttribute("class", "username");
  usernameEl.innerHTML = `Socket: ${socketId}`;
  
  userContainerEl.appendChild(usernameEl);
  
  userContainerEl.addEventListener("click", () => {
    unselectUsersFromList();
    userContainerEl.setAttribute("class", "active-user active-user--selected");
    const talkingWithInfo = document.getElementById("talking-with-info");
    talkingWithInfo.innerHTML = `Talking with: "Socket: ${socketId}"`;
    callUser(socketId);
  }); 
  return userContainerEl;
}

/*
Here we create a local offer and send to the selected user.
The server listens to an event called call-user, intercepts the offer and forwards it to the selected user.
*/
async function callUser(socketId) {
  const offer = await peerConnection.createOffer();
  await peerConnection.setLocalDescription(new RTCSessionDescription(offer));

  socket.emit('call-user', {
    offer,
    to: socketId
  });
}

function removeUser(socketId) {
  const elementToRemove = document.getElementById(socketId);
  if (elementToRemove) {
    elementToRemove.remove();
  }
  socket.close();
}

function unselectUsersFromList() {
  const alreadySelectedUser = document.querySelectorAll(
    ".active-user.active-user--selected"
  );

  alreadySelectedUser.forEach(el => {
    el.setAttribute("class", "active-user");
  });
}

function captureSnapshot() {
	if (remoteStream) {
    const capture = document.getElementById('capture');
    const snapshot = document.getElementById('snapshot');
    const remoteVideo = document.getElementById('remote-video');
		const ctx = capture.getContext( '2d' );
		const img = new Image();
		ctx.drawImage( remoteVideo, 0, 0, capture.width, capture.height );
		img.src		= capture.toDataURL( "image/png" );
		img.width	= 240;
		snapshot.innerHTML = '';
		snapshot.appendChild( img );
	}
}

const toggleCamera = async () => {
  let videoTrack = localStream.getTracks().find(track => track.kind === 'video')

  if (videoTrack.enabled) {
      videoTrack.enabled = false
      document.getElementById('camera-btn').style.backgroundColor = 'rgb(255, 80, 80)'
  } else{
      videoTrack.enabled = true
      document.getElementById('camera-btn').style.backgroundColor = 'rgb(179, 102, 249, .9)'
  }
}

const toggleMic = async () => {
  let audioTrack = localStream.getTracks().find(track => track.kind === 'audio')

  if (audioTrack.enabled) {
      audioTrack.enabled = false
      document.getElementById('mic-btn').style.backgroundColor = 'rgb(255, 80, 80)'
  } else{
      audioTrack.enabled = true
      document.getElementById('mic-btn').style.backgroundColor = 'rgb(179, 102, 249, .9)'
  }
}

document.getElementById('camera-btn').addEventListener('click', toggleCamera)
document.getElementById('mic-btn').addEventListener('click', toggleMic)
document.getElementById('capture-btn').addEventListener('click', captureSnapshot)
document.getElementById('leave-btn').addEventListener('click', () => {
  const socketId = document.querySelector('.active-user').id;
  removeUser(socketId);
  unselectUsersFromList();
})

peerConnection.ontrack = function({ streams: [stream] }) {
  const remoteVideo = document.getElementById('remote-video');
  remoteStream = stream;
  if (remoteVideo) {
    remoteVideo.srcObject = stream;
  }
};

// navigator.mediaDevices.getUserMedia( { video: true } )
// 		.then( function( mediaStream ) {
//       const localVideo = document.getElementById('local-video');
// 			// cameraStream = mediaStream;

// 			localVideo.srcObject = mediaStream;

// 			localVideo.play();
// 		})

navigator.mozGetUserMedia(
  { 
    video: {
      width:{min:640, ideal:1920, max:1920},
      height:{min:480, ideal:1080, max:1080},
    },
    audio: true
  },
  stream => {
    localStream = stream;
    const localVideo = document.getElementById('local-video');
    console.log('local video', localVideo);
    if (localVideo) {
      console.log(stream);
      localVideo.srcObject = stream;
    }

    stream.getTracks().forEach(track => peerConnection.addTrack(track, stream));
  },
  error => {
    console.warn(error.message);
  }
);