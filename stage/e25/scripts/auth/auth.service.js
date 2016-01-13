(function() {
	'use strict';

	angular
		.module('mystyle.auth')
		.factory('authService', authService);

	authService.$inject = ['$q', '$firebaseAuth', 'firebaseDb', 'localStorageService', '$rootScope'];

	/* @ngInject */
	function authService($q, $firebaseAuth, firebaseDb, localStorageService, $rootScope) {
		var auth = $firebaseAuth(firebaseDb);

		var service = {
			user: getStoredUser(),
			signIn: signIn,
			signUp: signUp,
			signOut: signOut,
			sessionExists: false
		};

		firebaseDb.onAuth(function(data) {
			if (!data) {
				setUser();
			} else {
				getUser(data.uid).then(function(user) {
					setUser(user);
				});
				if (service.user.isSignedIn) {
					$rootScope.$emit('loggedIn');
				}
			}
		});

		return service;

		// *******************************************************************

		function signOut() {
			setUser();
			auth.$unauth();
			$rootScope.$emit('loggedOut');
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

				return getUser(authData.uid).then(function(user) {
					setUser(user);
					$rootScope.$emit('loggedIn');
					return authData;
				});
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
			if (!user) {
				service.user.email = null;
				service.user.displayName = null;
				service.user.isSignedIn = false;
			} else {
				service.user.email = user.email;
				service.user.displayName = user.displayName;
				service.user.isSignedIn = true;
			}
			setStoredUser(service.user);
		}
		
		function getStoredUser() {
			return localStorageService.get('authUser') || { isSignedIn: false };
		}
		
		function setStoredUser(user) {
			localStorageService.set('authUser', user);
		}
	}
})();