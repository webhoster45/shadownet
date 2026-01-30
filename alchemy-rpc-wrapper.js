import fetch from "node-fetch";

const originalFetch = globalThis.fetch || fetch;

export async function wrappedFetch(url, options) {
  // If this is an Alchemy RPC call, inject simulation_flags
  if (url && url.includes("alchemy") && options && options.body) {
    try {
      const body = JSON.parse(options.body);
      
      // Add simulation_flags to fee estimation requests
      if (body.method === "starknet_estimateFee") {
        // Ensure params exist
        if (!body.params) {
          body.params = {};
        }
        
        // Add simulation_flags if not present
        if (!body.params.simulation_flags) {
          body.params.simulation_flags = ["SKIP_VALIDATE"];
        }
      }
      
      options.body = JSON.stringify(body);
    } catch (e) {
      // If not JSON, just pass through
    }
  }
  
  return originalFetch(url, options);
}

// Monkey-patch global fetch
if (typeof globalThis !== 'undefined') {
  globalThis.fetch = wrappedFetch;
}
