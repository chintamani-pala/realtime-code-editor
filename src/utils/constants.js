export const languages = [
  "TypeScript",
  "JavaScript",
  "CSS",
  "LESS",
  "SCSS",
  "JSON",
  "HTML",
  "XML",
  "PHP",
  "C#",
  "C++",
  "Razor",
  "Markdown",
  "Diff",
  "Java",
  "VB",
  "CoffeeScript",
  "Handlebars",
  "Batch",
  "Pug",
  "F#",
  "Lua",
  "PowerShell",
  "Python",
  "Ruby",
  "SASS",
  "R",
  "Objective-C",
];

export const files = [
  {
    name: "javascript",
    value: 'console.log("Hello, JavaScript");\n',
  },
  {
    name: "typescript",
    value: 'let message: string = "Hello, TypeScript"; console.log(message);',
  },

  { name: "css", value: "body { background-color: #f0f0f0; }\n" },
  {
    name: "less",
    value: "@primary-color: #4d90fe; body { background: @primary-color; }\n",
  },
  {
    name: "scss",
    value: "$primary-color: #333; body { color: $primary-color; }\n",
  },
  { name: "json", value: '{ "name": "example", "version": "1.0.0" }\n' },
  {
    name: "html",
    value:
      "<!DOCTYPE html>\n<html>\n\t<head>\n\t\t<title>Hello, HTML</title>\n\t</head>\n\t<body>\n\t\t<h1>Hello, World!</h1>\n\t</body>\n</html>",
  },
  {
    name: "xml",
    value:
      "<note><to>Tove</to><from>Jani</from><heading>Reminder</heading><body>Don't forget me this weekend!</body></note>",
  },
  { name: "php", value: '<?php echo "Hello, PHP!"; ?>' },
  { name: "c#", value: 'Console.WriteLine("Hello, C#");' },
  {
    name: "c++",
    value:
      '#include <iostream>\nint main() { std::cout << "Hello, C++"; return 0; }',
  },
  {
    name: "razor",
    value: '@{ var message = "Hello, Razor!"; }<h1>@message</h1>',
  },
  {
    name: "markdown",
    value: "# Hello, Markdown\nThis is an example of a markdown file.",
  },
  {
    name: "diff",
    value:
      "diff --git a/file.txt b/file.txt\nindex 83db48f..bf26927 100644\n--- a/file.txt\n+++ b/file.txt\n@@ -1 +1 @@\n-Hello\n+Hello World",
  },
  {
    name: "java",
    value:
      'public class Main { public static void main(String[] args) { System.out.println("Hello, Java!"); } }',
  },
  { name: "vb", value: 'Console.WriteLine("Hello, VB")' },
  { name: "coffeescript", value: 'console.log "Hello, CoffeeScript"' },
  { name: "handlebars", value: "{{#each items}}<div>{{this}}</div>{{/each}}" },
  { name: "batch", value: "@echo off\necho Hello, Batch" },
  {
    name: "pug",
    value:
      "doctype html\nhtml\n  head\n    title Hello, Pug\n  body\n    h1 Hello, World!",
  },
  { name: "f#", value: 'printfn "Hello, F#"' },
  { name: "lua", value: 'print("Hello, Lua!")' },
  { name: "powershell", value: 'Write-Host "Hello, PowerShell"' },
  { name: "python", value: 'print("Hello, Python!")' },
  { name: "ruby", value: 'puts "Hello, Ruby!"' },
  {
    name: "sass",
    value: "$primary-color: #333; body { color: $primary-color; }",
  },
  { name: "r", value: 'print("Hello, R!")' },
  {
    name: "objective-c",
    value:
      '#import <Foundation/Foundation.h>\nint main() { @autoreleasepool { NSLog(@"Hello, Objective-C!"); } return 0; }',
  },
];

export const extension = {
  TypeScript: ".ts",
  JavaScript: ".js",
  CSS: ".css",
  LESS: ".less",
  SCSS: ".scss",
  JSON: ".json",
  HTML: ".html",
  XML: ".xml",
  PHP: ".php",
  "C#": ".cs",
  "C++": ".cpp",
  Razor: ".cshtml",
  Markdown: ".md",
  Diff: ".diff",
  Java: ".java",
  VB: ".vb",
  CoffeeScript: ".coffee",
  Handlebars: ".hbs",
  Batch: ".bat",
  Pug: ".pug",
  "F#": ".fs",
  Lua: ".lua",
  PowerShell: ".ps1",
  Python: ".py",
  Ruby: ".rb",
  SASS: ".sass",
  R: ".r",
  "Objective-C": ".m",
};
