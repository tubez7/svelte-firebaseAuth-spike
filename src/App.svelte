<script>
	import {auth, googleProvider} from "./firebase";
	import { signInWithPopup, GoogleAuthProvider, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signInAnonymously  } from "firebase/auth"
	import {authState} from "rxfire/auth";
	import Chatroom from "./Chatroom.svelte"

	let user;

	const unsubscribe = authState(auth).subscribe(usr => user = usr);

// 	// Initiate firebase auth
// function initFirebaseAuth() {
//   // Listen to auth state changes.
//   onAuthStateChanged(auth, authStateObserver);

let email = "anemail@email.com";

let password = "password";

console.log("in script", user)



	function googleLogin() {
		signInWithPopup(auth, googleProvider)
		.then((result) => {
			// This gives you a Google Access Token. You can use it to access Google APIs.
			const credential = GoogleAuthProvider.credentialFromResult(result);
			const token = credential.accessToken;
			console.log("access token", token)
			// The signed-in user info.
			user = result.user;
			console.log("user obj", user);
		})
		.catch((error) => {
			// Handle Errors here.
			const errorCode = error.code;
			const errorMessage = error.message;
			
			console.log(errorCode, errorMessage)
			// The email of the user's account used.
			const email = error.email;
			// The AuthCredential type that was used.
			const credential = GoogleAuthProvider.credentialFromError(error);
			// ...
		});
		;
	}

	function createUserEmail() {
		createUserWithEmailAndPassword(auth, email, password)
		.then((userCredential) => {
			// Signed in 
			user = userCredential.user;
			console.log("user obj", user)
			// ...
		})
		.catch((error) => {
			const errorCode = error.code;
			console.log("error code", errorCode);
			const errorMessage = error.message;
			console.log(errorMessage)
			// ..
		});
	}

	function signInEmail() {
		signInWithEmailAndPassword(auth, email, password)
		.then((userCredential) => {
			// Signed in 
			const user = userCredential.user;
			console.log("user obj", user)
			// ...
		})
		.catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
			console.log(errorMessage)
		});
	}

	function signInAnon() {
		signInAnonymously(auth)
		.then(() => {
			console.log("signed in anon")
			
		})
		.catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
			console.log(errorMessage)
			// ...
		});
	}









	function logout() {
		signOut(auth);
		console.log(user)
	}


</script>




<main>
	{#if user}
	<button on:click={logout}>SIGN OUT HERE</button>
	{:else}
	<div class="login-form">
		<button on:click={googleLogin}>
			<i class="fa fa-google"></i>
			Sign In with Google
		</button>

		<button on:click={createUserEmail}>
			<i class="fa fa-google"></i>
			Create Email Sign In
		</button>

		<button on:click={signInEmail}>
			<i class="fa fa-google"></i>
			Sign In Email
		</button>

		<button on:click={signInAnon}>
			<i class="fa fa-google"></i>
			Sign In Anon
		</button>

	</div>
	{/if}
</main>

<style>
	main {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
		width: 100%;
		height: 100%;
		max-width: 400px;
		max-height: 500px;
		background: #fff;
		border: 1px solid #eee;
		box-shadow: 0px 5px 10px rgba(0,0,0,0.05);
	}
	.login-form {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);	
	}
	.login-form button {
		padding: 10px;
		background: #fff;
		color: #111;
		font-size: 16px;
		cursor: pointer;
		outline: none;
		border: 1px solid #bbb;
	}
	.login-form button i.fa {
		padding-right: 10px;
		border-right: 1px solid #ddd;
		color: #555;
	}
</style>