$(window).keydown(function (e) {
    if (event.shiftKey && event.ctrlKey && e.keyCode == 13) {
        let comm = _ide.editorManager.$scope.editor.sharejs_doc.ace.getCopyText();
        if (comm == \'fig\') {
            _ide.editorManager.$scope.editor.sharejs_doc.ace.insert(\'\\\\' + 'begin{figure}[hbtp]\\n\t\\\\' + 'centering\\n\t\\\\' + 'includegraphics[keepaspectratio, width=8cm]{./}\\n\t\\\\' + 'caption{}\\n\t\\\\' + 'label{fig:}\\n\\\\' + 'end{figure}\');
        }else if(comm == \'tbl\'){
            _ide.editorManager.$scope.editor.sharejs_doc.ace.insert(\'\\\\' + 'begin{table}[hbtp]\\n\t\\\\' + 'caption{}\\n\t\\\\' + 'label{tbl:}\\n\t\\\\' + 'centering\\n\t\\\\' + 'begin{tabular}{ccc}\\n\t\t\\\\' + 'hline\\n\t\ta  & b  &  c  \\\\' + '\\\\' + '\\n\t\t\\\\' + 'hline\\\\' + 'hline\\n\t\t1  & 2  & 3 \\\\' + '\\\\' + '\\n\t\t\\\\' + 'hline\\n\t\\\\' + 'end{tabular}\\n\\\\' + 'end{table}\');
        }
        return false;
    }
});