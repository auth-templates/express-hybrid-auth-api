import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
	test: {
		globals: true,
		environment: 'node',
		include: ['**/*.test.ts?(x)'],
		setupFiles: ['./setupTests.ts'],
		coverage: {
			provider: 'v8',
			reportsDirectory: './coverage',
			reporter: ['text', 'lcov'],
			include: ['src/**/*.{ts,tsx}'],
			exclude: [
				'src/**/*.d.ts',
				'src/**/index.{ts,tsx}',
				'src/swagger-config.ts',
				'src/swagger-generate.ts',
				'src/routes/**',
				'src/lib/logger/**',
				'main.ts',
				'index.ts',
				'node_modules/**',
				'dist/**',
			],
		},
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src'),
		},
	},
});
