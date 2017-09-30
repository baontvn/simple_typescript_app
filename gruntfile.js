module.exports = function(grunt) {
    "use strict";

    grunt.initConfig({
        // copy: {
        //     main: {
        //         files: [
        //             {
        //                 expand: true,
        //                 cwd: 'src/bin/locales',
        //                 src: "**",
        //                 dest: "dist/bin/locales"
        //             },
        //             {
        //                 expand: true,
        //                 cwd: 'src/bin/messages',
        //                 src: "**",
        //                 dest: "dist/bin/messages"
        //             },
        //             {
        //                 expand: true,
        //                 cwd: 'src/bin/resources',
        //                 src: "**",
        //                 dest: "dist/bin/resources"
        //             }
        //         ]
        //     }
        // },
        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/bin',
                        src: "*.json",
                        dest: "dist/bin"
                    },
                    {
                        expand: true,
                        cwd: 'src/bin',
                        src: "*.js",
                        dest: "dist/bin"
                    }
                ]
            }
        },
        ts: {
            app: {
                files: [{
                    src: ["src/\*\*/\*.ts", "!src/.baseDir.ts"],
                    dest: "./dist"
                }],
                options: {
                    module: "commonjs",
                    target: "es6",
                    sourceMap: false,
                    rootDir: "src"
                }
            }
        },
        
        watch: {
            ts: {
                files: ["src/\*\*/\*.ts"],
                tasks: ["ts"]
            }
        }
    });

    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-ts");
    grunt.loadNpmTasks("grunt-contrib-copy");

    grunt.registerTask("default", [  
        "ts",
        "copy"
    ]);
};