/**
 * Utility function to get consistent PreviewProps for email templates
 * Uses environment variables with fallbacks for development
 */
export function getPreviewProps() {
	return {
		assetsUrl: process.env.CDN_URL || 'http://localhost:9000/public-assets',
		frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',
	};
}
