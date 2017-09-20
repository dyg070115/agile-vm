var webpack = require('webpack'),
    path = require('path'),
    packageJSON = require('./package.json');
//var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');

var commands = (function(){
    var commands = {
        has : function(cmd){
            return commands.hasOwnProperty(cmd);
        }
    };
    var args = process.argv.splice(2);
    for(var i=0;i<args.length;i++){
        var name = args[i];
        if(name==='browser'){
            commands['usein'] = name;
        }else if(name==='compress'){
            commands['compress'] = true;
        }
    }
    return commands;
})();

var usein = commands['usein']||'sprite';
var compress = commands.has('compress');
var version = packageJSON.version+'.'+new Date().getTime();
var fileName = 'agile.vm.'+usein+(compress?'.min':'');

var copyright = [
    '/*',
    ' *	Agile VM 移动前端MVVM框架',
    ' *	Version	:	'+version+' beta',
    ' *	Author	:	nandy007',
    ' *	License MIT @ https://github.com/nandy007/agile-vm',
    ' */'
].join('\r\n');

var plugins = (function(){
    var plugins = [];
    if(compress){
        plugins.push(new webpack.optimize.UglifyJsPlugin({//加密压缩
            beautify: false,
            mangle: {
                except: ['$', 'exports', 'require']
            },
            compress: {
                warnings: false
            }
        }));
    }

    plugins.push((function(){
        function SpriteModulePlugin(options) {
            // Setup the plugin instance with options...
        }

        SpriteModulePlugin.prototype.apply = function(compiler) {
            compiler.plugin('done', function() {
                var fs = require('fs'), filePath = './dist/'+fileName+'.js', encoding = 'utf-8';
                var file = fs.readFileSync(filePath, encoding);
                var content = [];
                content.push(copyright);
                if(usein==='sprite'){
                   content.push('var module$this = module;');  
                }
                content.push(file);
                fs.writeFile(filePath, content.join(''), {encoding:encoding}, function(err){
                    err?console.error('写入失败'):console.log('写入成功');
                });
            });
        };

        return new SpriteModulePlugin({options: true});
    })());

    return plugins;
})();


module.exports = {
    //插件项
    plugins: plugins,
    //页面入口文件配置
    entry: {
        index : './libs/index.js'
    },
    //入口文件输出配置
    output: {
        path: path.join(__dirname, './dist'),
        filename: fileName+'.js'
    },
    module: {
        //加载器配置
        loaders: [
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            //{ test: /\.js$/, loader: 'jsx-loader?harmony' },
            { test: /\.scss$/, loader: 'style!css!sass?sourceMap'},
            { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'}
        ]
    },
    externals: {
      "Document": "commonjs Document",
      "Window": "commonjs Window",
      "Console": "commonjs Console",
      "ListAdapter": "commonjs ListAdapter",
      "Http": "commonjs Http",
      "File": "commonjs File",
      "UI": "commonjs UI"
    },
    //其它解决方案配置
    resolve: {
        extensions: ['.js', '.json', '.scss'],
        alias: {
            "JQLite": path.join(__dirname, "./libs/JQLite."+usein+".js"),
            "diff": path.join(__dirname, "./libs/diff.js"),
            "Observer": path.join(__dirname, "./libs/Observer.js"),
            "Updater": path.join(__dirname, "./libs/Updater.js"),
            "Watcher": path.join(__dirname, "./libs/Watcher.js"),
            "Compiler": path.join(__dirname, "./libs/Compiler.js"),
            "rule": path.join(__dirname, "./libs/rule.js"),
            "Parser": path.join(__dirname, "./libs/Parser.js"),
            "MVVM": path.join(__dirname, "./libs/MVVM.js"),
            "template": path.join(__dirname, "./libs/template.js"),
            "jQuery": path.join(__dirname, "./libs/jQuery.js") //only browser
        }
    }
};