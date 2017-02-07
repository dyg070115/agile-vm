var webpack = require('webpack');
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
        if(name.indexOf('--')===0){
            name = name.replace('--','');
        }
        var value = args[i+1];
        if(value&&value.indexOf('--')!==0){
            i++;
        }else{
            value = '';
        }
        commands[name] = value;
    }
    return commands;
})();


var usein = commands['usein']||'sprite';
var compress = commands.has('compress');
var fileName = 'agile.vm.'+usein+(compress?'.min':'');

var copyright = [
    '/*',
    ' *	Agile VM 移动前端MVVM框架',
    ' *	Version	:	1.0.0 beta',
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
                var fs = require('fs'), filePath = '../dist/'+fileName+'.js', encoding = 'utf-8';
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
        index : './src/index.js'
    },
    //入口文件输出配置
    output: {
        path: '../dist',
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
        root: './src',
        extensions: ['', '.js', '.json', '.scss'],
        alias: {
            "JQLite": "JQLite."+usein+".js",
            "diff": "diff.js",
            "Observer": "Observer.js",
            "Updater": "Updater.js",
            "Watcher": "Watcher.js",
            "Compiler": "Compiler.js",
            "rule": "rule.js",
            "Parser": "Parser.js",
            "MVVM": "MVVM.js",
            "template": "template.js",
            "jQuery": "jQuery.js" //only browser
        }
    }
};