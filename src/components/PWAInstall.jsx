import { useState, useEffect } from 'react';
import { Download, X } from 'lucide-react';

const PWAInstall = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later
      setDeferredPrompt(e);
      // Update UI to notify the user they can add to home screen
      setShowInstallPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    // Check if app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setShowInstallPrompt(false);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      return;
    }

    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;

    // We've used the prompt, and can't use it again, clear it up
    setDeferredPrompt(null);
    setShowInstallPrompt(false);

    console.log(`User response to the install prompt: ${outcome}`);
  };

  const handleDismiss = () => {
    setShowInstallPrompt(false);
  };

  if (!showInstallPrompt) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-white rounded-lg shadow-xl border border-gray-200 p-4 max-w-sm">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          <img 
            src="/logo/logo.jpeg" 
            alt="Hawaiin Elevation" 
            className="w-12 h-12 rounded-lg object-contain"
          />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 text-sm">Install App</h3>
          <p className="text-xs text-gray-600 mt-1">
            Install Hawaiin Elevation on your device for quick access and offline support.
          </p>
          <div className="flex gap-2 mt-3">
            <button
              onClick={handleInstallClick}
              className="flex items-center gap-1 px-3 py-1.5 bg-teal-600 text-white text-xs font-medium rounded-md hover:bg-teal-700 transition-colors"
            >
              <Download className="w-3 h-3" />
              Install
            </button>
            <button
              onClick={handleDismiss}
              className="px-3 py-1.5 bg-gray-100 text-gray-700 text-xs font-medium rounded-md hover:bg-gray-200 transition-colors"
            >
              Later
            </button>
          </div>
        </div>
        <button
          onClick={handleDismiss}
          className="flex-shrink-0 p-1 hover:bg-gray-100 rounded-md transition-colors"
        >
          <X className="w-4 h-4 text-gray-500" />
        </button>
      </div>
    </div>
  );
};

export default PWAInstall;
