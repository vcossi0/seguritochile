import { useEffect } from "react"

export default function useMetaPixel() {
  useEffect(() => {
    const initPixel = () => {
      const pixelId = localStorage.getItem("meta_pixel_id")
      
      // If no ID or already injected, do nothing
      if (!pixelId || document.getElementById("meta-pixel-script")) return

      // Facebook Pixel Base Code
      /* eslint-disable */
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.id = "meta-pixel-script";
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      /* eslint-enable */

      // Initialize and track PageView
      window.fbq('init', pixelId)
      window.fbq('track', 'PageView')
      
      console.log(`[Meta Pixel] Inicializado con ID: ${pixelId}`)
    }

    // Initialize on mount
    initPixel()

    // Listen to changes (if Admin updates it in the dashboard)
    const handleStorageChange = () => {
      // For simplicity, we just reload the page to cleanly re-inject the new pixel script
      // In a real advanced SPA you might remove the script tag and re-init, but a reload is safest.
      if (!document.getElementById("meta-pixel-script")) {
        initPixel()
      } else {
        // Pixel already exists, changing ID requires a hard reload to be safe
        console.log("[Meta Pixel] ID cambiado, se requiere recargar para aplicar.")
      }
    }

    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [])
}
