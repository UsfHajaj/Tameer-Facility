// Firebase Configuration (Compatible with script tags)
// This configuration works with Firebase compat libraries loaded via script tags

const firebaseConfig = {
  apiKey: "AIzaSyCi3lnrpyUxbyoqZYKjaJMIh23ICetkJrg",
  authDomain: "tammer-fm.firebaseapp.com",
  databaseURL: "https://tammer-fm-default-rtdb.firebaseio.com",
  projectId: "tammer-fm",
  storageBucket: "tammer-fm.firebasestorage.app",
  messagingSenderId: "371837746205",
  appId: "1:371837746205:web:3ace8ca4cb7e8124b51af4",
  measurementId: "G-0Q7R89RCT8"
};

// Initialize Firebase (requires Firebase compat libraries to be loaded first)
function initializeFirebase() {
  try {
    if (typeof firebase !== 'undefined') {
      // Check if already initialized
      if (firebase.apps.length === 0) {
        const app = firebase.initializeApp(firebaseConfig);
        console.log('✅ Firebase initialized successfully');
        return app;
      } else {
        console.log('✅ Firebase already initialized');
        return firebase.app();
      }
    } else {
      console.warn('⚠️ Firebase libraries not loaded. Please include Firebase compat scripts.');
      return null;
    }
  } catch (error) {
    console.error('❌ Error initializing Firebase:', error);
    return null;
  }
}

// Enhanced Firebase status check
function checkFirebaseStatus() {
  return {
    loaded: typeof firebase !== 'undefined',
    initialized: typeof firebase !== 'undefined' && firebase.apps.length > 0,
    config: firebaseConfig
  };
}

// Make configuration available globally
window.firebaseConfig = firebaseConfig;
window.initializeFirebase = initializeFirebase;
window.checkFirebaseStatus = checkFirebaseStatus;
