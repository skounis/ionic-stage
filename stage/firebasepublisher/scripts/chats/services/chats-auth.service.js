(function() {
	'use strict';

	angular
		.module('firebase-starter.chats')
		.factory('chatsAuthService', chatsAuthService);

	chatsAuthService.$inject = ['$q', '$firebaseAuth', 'firebaseDb', '$timeout'];

	/* @ngInject */
	function chatsAuthService($q, $firebaseAuth, firebaseDb, $timeout) {
		var auth = $firebaseAuth(firebaseDb);

		var service = {
			user: {
				isSignedIn: false
			},
			signIn: signIn,
			signUp: signUp,
			signOut: signOut,
		};

		firebaseDb.onAuth(function(data) {
			if (!data) {
				setUser();
			} else {
				getUser(data.uid).then(function(user) {
					setUser(user);
				});
			}
		});

		return service;

		// *******************************************************************

		function signOut() {
			setUser();
			auth.$unauth();
		}

		function signUp(user) {
			return auth.$createUser({
				email: user.email,
				password: user.password
			}).then(function(userData) {
				alert('User created successfully!');

				firebaseDb.child('users').child(userData.uid).set({
					email: user.email,
					displayName: user.displayname
				});

				return userData;
			});

		}

		function signIn(email, password) {
			return auth.$authWithPassword({
				email: email,
				password: password
			}).then(function(authData) {
				console.log('Logged in as:' + authData.uid);
				
				getUser(authData.uid).then(function(user) {
					setUser(user);
				});

				return authData;
			});
		}

		function getUser(uid) {
			var deferred = $q.defer();

			firebaseDb.child('users').child(uid).once('value', function(snapshot) {
				var val = snapshot.val();
				deferred.resolve(val);
			});

			return deferred.promise;
		}

		function setUser(user) {
			$timeout(function() {
				if (!user) {
					service.user.email = null;
					service.user.displayName = null;
					service.user.isSignedIn = false;
				} else {
					service.user.email = user.email;
					service.user.displayName = user.displayName;
					service.user.isSignedIn = true;
				}
			}, 200);
		}
	}
})();