import defaultConfig from './default.config';
import { defineConfig } from 'umi';
import { routerConfig } from './router.config';

export default defineConfig({
  routes: routerConfig,
  theme: { 'primary-color': defaultConfig.primaryColor },
  dva: { hmr: true },
  antd: { dark: false },
  locale: { default: 'zh-CN', antd: true, baseNavigator: true },
  dynamicImport: { loading: '@/components/PageLoading' },
  favicon: './favicon.svg',
  title: false,
  hash: true,
  ignoreMomentLocale: true,
  history: { type: 'hash' },
  outputPath: './dist'
});
