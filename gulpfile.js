// Основной модуль Gulp
import gulp from 'gulp'
// Импорт путей
import {path} from './gulp/config/path.js'
// Импорт общих плагинов
import {plugins} from './gulp/config/plugins.js'

// Передаём значения в глобальную переменную
global.app = {
    isBuild: process.argv.includes('--build'),
    isDev: !process.argv.includes('--build'),
    path: path,
    gulp: gulp,
    plugins: plugins
}

// Импорт задач
import {copy} from './gulp/tasks/copy.js'
import {reset} from './gulp/tasks/reset.js'
import {html} from './gulp/tasks/html.js'
import {server} from './gulp/tasks/server.js'
import {scss} from './gulp/tasks/scss.js'
import {js} from './gulp/tasks/js.js'
import {images} from './gulp/tasks/images.js'
import { fonts } from './gulp/tasks/copy.js'
import {svgSpriteTask} from './gulp/tasks/svg-sprite.js';

// Наблюдатель за изменениями в файлах
function watcher() {
    gulp.watch(path.watch.files, copy)
    gulp.watch(path.watch.html, html)
    gulp.watch(path.watch.scss, scss)
    gulp.watch(path.watch.js, js)
    gulp.watch(path.watch.images, images)
}



const mainTasks = gulp.series(fonts, gulp.parallel(copy, html, scss, js, images, svgSpriteTask))

// Построение сценариев выполнения задач
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));
const build = gulp.series(reset, mainTasks);

export { dev }
export { build }

// Выполнение сценария по умолчанию
gulp.task('default', dev)
