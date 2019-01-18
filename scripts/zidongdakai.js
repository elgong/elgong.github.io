
var spawn = require('child_process').exec;

// Hexo 2.x 用户复制这段
//hexo.on('new', function(path){
 // spawn('start  "C:\Users\Administrator\AppData\Local\Programs\MarkdownPad 2\MarkdownPad2.exe" ' + path);
//});

// Hexo 3 用户复制这段
hexo.on('new', function(data){
  spawn('start  "C:\Users\Administrator\AppData\Local\Programs\MarkdownPad 2\MarkdownPad2.exe" ' + data.path);
});