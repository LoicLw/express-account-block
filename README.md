# express-account-block
[![npm version](https://badge.fury.io/js/express-admin-block.svg)](https://badge.fury.io/js/express-admin-block)


A simple to use module for Express that handles authentification (signup and login), sessions and provide an account page you can place in your app.

Requires JQuery and Bootstrap 4 (JS + CSS) on the client side.

## Features

- [X] Handles sessions and cookies
- [X] OAuth (Google and Github)
- [X] Drop-in login/signup page
- [X] Drop-in account management page
- [X] Forgot Password / reset link
- [ ] Auto redirecting after login/signup
- [X] Logged middleware
- [X] Ability to disable sign ups
- [X] Use Bootstrap
- [ ] Magic link login
- [ ] Store last logged date for users


## Who uses it?

<table>
<tr>
	<td align="center">
		<a href="https://nucleus.sh"><img src="https://nucleus.sh/logo_color.svg" height="64" /></a>
	</td>
	<td align="center">
		<a href="https://eliopay.com"><img src="https://eliopay.com/logo_black.svg" height="64" /></a>
	</td>
	<td align="center">
		<a href="https://backery.io"><img src="https://backery.io/logo_color.svg" height="64" /></a>
	</td>
	<td align="center">
		<a href="https://lttrfeed.com"><img src="https://lttrfeed.com/icon.svg" height="64" /></a>
	</td>
	<td align="center">
		<a href="https://musli.io"><img src="https://musli.io/icon.svg" height="64" /></a>
	</td>
</tr>
<tr>
	<td align="center">Nucleus</td>
	<td align="center">ElioPay</td>
	<td align="center">Backery</td>
	<td align="center">Lttrfeed</td>
	<td align="center">Musli.io</td>
</tr>
</table>

_👋 Want to be listed there? [Contact me](mailto:vince@lyser.io)._


## Usage

```bash
npm i express-account-block
```
Then in your express code

```javascript

// Init express
const express 		= require('express')
const app 			= express()

// Add your DB
const mongoose      = require('mongoose')
const mongoURI 		= process.env.MONGO_URL || 'mongodb://localhost:27017/myappdb'
mongoose.connect(mongoURI, { useNewUrlParser: true })

// Your db schmeas
const db 			= require('./helpers/db')

// Parse from html forms and post payload
app.use(express.json()) 
app.use(express.urlencoded({ extended: true }))

// For signup and login
require('express-account-block')(app, {
	siteName: 'My Web App',
	siteUrl: 'example.com',
	primaryColor: '#b90577',
	// background: 'red',
	// logoUrl: '/favicon.png',
	mongoose: mongoose,
	useAccessToken: true, // Access token management
	redirectLogin: '/account',
	redirectSignup: '/account',
	// disableSignup: true,
	// signupMailExtra: 'You can now create your first app.',
	mongoUser: db.User,
	connectors: {
		github: {
			clientId: "xxxxxxx",
			clientSecret: "xxxxxx",
			redirectUri: "https://my.app/auth/github/callback"
		},
		google: {
			clientId: 'xxxxxxx.apps.googleusercontent.com',
			clientSecret: 'xxxxxxxxx',
			redirectUri: 'https://my.app/auth/google/callback'
		}
	}
})

```

## Account page

Will require Bootstrap and jQuery.

In your express route:

```javascript
app.get("/account", (req, res, next) => {

	res.render("my_account_view", { // Where account is your page structure
		accountTemplate: require.resolve("express-account-block/account.ejs")
	})
})
```

Make sure to have Bootstrap.js and jQuery included.

Then, in your ejs:

```html
<body>
	<%- include(accountTemplate) %>
</body>

<script src="/account/account.js" defer></script>
```

## Oauth

Currently the module supports Github and Google oauth.

The redirect URIs are predefined paths:

- */auth/github/callback* for Github
- */auth/google/callback* for Google
