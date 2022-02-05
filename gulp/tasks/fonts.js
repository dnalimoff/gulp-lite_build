import fs from 'fs'
import fonter from 'gulp-fonter'
import ttf2woff2 from 'gulp-ttf2woff2'

export const otfToTtf = () => {
    //Ищем файлы шрифтов .otf
    return (
        app.gulp
            .src(`${app.path.srcFolder}/fonts/*.otf`, {})
            .pipe(
                app.plugins.plumber(
                    app.plugins.notify.onError({
                        title: 'FONTS',
                        message: 'Error: <%= error.message %>'
                    })
                )
            )
            // Конвертируем в .ttf
            .pipe(
                fonter({
                    formats: ['ttf']
                })
            )
            .pipe(app.gulp.dest(`${app.path.srcFolder}/fonts/`))
    )
}

export const ttfToWoff = () => {
    // Ищем файлы шрифтов .ttf
    return (
        app.gulp
            .src(`${app.path.srcFolder}/fonts/*.ttf`, {})
            .pipe(
                app.plugins.plumber(
                    app.plugins.notify.onError({
                        title: 'FONTS',
                        message: 'Error: <%= error.message %>'
                    })
                )
            )

            .pipe(
                fonter({
                    formats: ['woff']
                })
            )
            // Выгружаем в папку с результатом
            .pipe(app.gulp.dest(`${app.path.build.fonts}`))
            // Ищем файлы шоифтов .ttf
            .pipe(app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`))
            // Конвертируем в .woff2
            .pipe(ttf2woff2())
            // Выгружаем в папку с результатом
            .pipe(app.gulp.dest(`${app.path.build.fonts}`))
    )
}

export const fontsStyle = () => {
    // Файл стилей подключения шрифтов
    let fontsFile = `${app.path.srcFolder}/scss/fonts.scss`
    // Проверяем существуют ли файлы шрифтов
    fs.readdir(app.path.build.fonts, function (err, fontsFiles) {
        if (fontsFiles) {
            // Проверяем существуют ли файл стилей для подключения шрифтов
            if (!fs.existsSync(fontsFile)) {
                // Если файла нет, создаем его
                fs.writeFile(fontsFile, '', cd)
                let newFileOnly
                for (let i = 0; i < fontsFile.length; i++) {
                    // Записываем подключения шрифтов в файл стилей
                    let fontFileName = fontsFile[i].split('.')[0]
                    if (newFileOnly !== fontFileName) {
                        let fontName = fontFileName.split('-')[0]
                            ? fontFileName.split('-')
                            : fontFileName
                        let fonstWeight = fontFileName.split('-')[1]
                            ? fontFileName.split('-')
                            : fontFileName
                        if (fonstWeight.toLowerCase() === 'thin') {
                            fonstWeight = 100
                        } else if (fonstWeight.toLowerCase() === 'extralight') {
                            fonstWeight = 200
                        } else if (fonstWeight.toLowerCase() === 'light') {
                            fonstWeight = 300
                        } else if (fonstWeight.toLowerCase() === 'medium') {
                            fonstWeight = 500
                        } else if (fonstWeight.toLowerCase() === 'semibold') {
                            fonstWeight = 600
                        } else if (fonstWeight.toLowerCase() === 'bold') {
                            fonstWeight = 700
                        } else if (fonstWeight.toLowerCase() === 'extrabold') {
                            fonstWeight = 800
                        } else if (fonstWeight.toLowerCase() === 'black') {
                            fonstWeight = 900
                        } else {
                            fonstWeight = 400
                        }
                        fs.appendFile(
                            fonstFile,
                            `@font-face {\n\tfort-famile: ${fontName};\n\tfont-display: swap;\n\tsrc: url("../fonts/${fontFileName}.woff2") format("woff2"), url("../fonts/${fontFileName}.woff") format("woff"){fontFileName})\n\tfont-style: normal;\n}\r\n`,
                            cb
                        )
                        newFileOnly = fontFileName
                    }
                }
            } else {
                // Еслу файл есть, выводим сообщение
                console.log(
                    'Файл scss/font.scss уже существует. Для обновления файла нужно его удалить!'
                )
            }
        }
    })

    return app.gulp.src(`${app.path.srcFolder}`)
    function cb() {}
}
