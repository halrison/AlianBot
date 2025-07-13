import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],
	build: {
		rollupOptions:{
			output: {		
				compact: true
			}
		},	
		chunkSizeWarningLimit: 3000
		
	}
});
