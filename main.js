const shortcut_key = 13;

// const title = 'beg';
// let content = '\begin\n\thello'; // '\\\\' + 'begin\\n\thello'
// content = content.replace('\b', '\\\\b').replace('\n', '\\n');

const title = 'fig';
// let content = '\begin{figure}[hbtp]\n\t\centering\n\t\includegraphics[keepaspectratio, width=8cm]{./}\n\t\caption{}\n\t\label{fig:}\n\end{figure}';
const content = '\\\\begin{figure}[hbtp]\\n\t\\\\centering\\n\t\\\\includegraphics[keepaspectratio, width=8cm]{./}\\n\t\\\\caption{}\\n\t\\\\label{fig:}\\n\\\\end{figure}';

const key_eve = '$(window).keydown(function (e) {';
const tri_con = 'if (event.shiftKey && event.ctrlKey && e.keyCode == ' + String(shortcut_key) + ') {';
const get_com =     'let comm = _ide.editorManager.$scope.editor.sharejs_doc.ace.getCopyText();';
const com_con =     'if (comm == \'' + title + '\') {';
const ins_fun =         '_ide.editorManager.$scope.editor.sharejs_doc.ace.insert(';
const con_bra =             '\'';
const ins_end = ');'
const com_end =     '}return false;';
const tri_end = '}';
const key_end = '});';

const script = document.createElement('script');
script.type = 'text/javascript';
script.innerHTML = key_eve + tri_con + get_com + com_con + ins_fun + con_bra + content + con_bra + ins_end + com_end + tri_end + key_end;
(document.head || document.documentElement).appendChild(script);

// table
// script.innerHTML = '$(window).keydown(function (e) {if (event.shiftKey && event.ctrlKey && e.keyCode == 13) {let comm = _ide.editorManager.$scope.editor.sharejs_doc.ace.getCopyText();if(comm == \'tbl\'){_ide.editorManager.$scope.editor.sharejs_doc.ace.insert(\'\\\\' + 'begin{table}[hbtp]\\n\t\\\\' + 'caption{}\\n\t\\\\' + 'label{tbl:}\\n\t\\\\' + 'centering\\n\t\\\\' + 'begin{tabular}{ccc}\\n\t\t\\\\' + 'hline\\n\t\ta  & b  &  c  \\\\' + '\\\\' + '\\n\t\t\\\\' + 'hline\\\\' + 'hline\\n\t\t1  & 2  & 3 \\\\' + '\\\\' + '\\n\t\t\\\\' + 'hline\\n\t\\\\' + 'end{tabular}\\n\\\\' + 'end{table}\');}return false;}});';

